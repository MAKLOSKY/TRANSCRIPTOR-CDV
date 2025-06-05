const DEBUG = false;
const log = (...args) => { if (DEBUG) console.log(...args); };

log("Script cargado correctamente.");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const transcriptOutput = document.getElementById('transcriptOutput');
const toggleButton = document.getElementById('toggleButton');
const clearButton = document.getElementById('clearButton');
const copyButton = document.getElementById('copyButton');
const copyFeedback = document.getElementById('copyFeedback');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const messageArea = document.getElementById('messageArea');
const languageSelect = document.getElementById('languageSelect');
const themeToggle = document.getElementById('themeToggle');

// --- Manejo del tema claro/oscuro ---
if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggle.textContent = 'Modo Día';
  }

  themeToggle.addEventListener('click', () => {
    const htmlEl = document.documentElement;
    const isDark = htmlEl.classList.toggle('dark');
    themeToggle.textContent = isDark ? 'Modo Día' : 'Modo Oscuro';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

let recognition = null;
let isTranscribing = false;
let finalTranscript = '';

// Variables para el timer absoluto
let startTime = null;
let elapsedSeconds = 0;
let timerInterval = null;
// Bandera para identificar el primer resultado final
let firstResultRecorded = false;

// Función auxiliar para formatear tiempo en MM:SS
function formatTime(totalSeconds) {
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;
return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

if (SpeechRecognition) {
recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = languageSelect.value;

recognition.onstart = () => {
log("Reconocimiento iniciado (onstart).");
isTranscribing = true;
toggleButton.textContent = 'Detener Transcripción';
toggleButton.classList.remove('bg-blue-500', 'hover:bg-blue-700');
toggleButton.classList.add('bg-red-500', 'hover:bg-red-700');
statusIndicator.classList.remove('hidden');
statusText.textContent = 'Escuchando...';
messageArea.textContent = '';

// Iniciar timer absoluto desde el momento onstart
startTime = Date.now();
elapsedSeconds = 0;
firstResultRecorded = false;
timerInterval = setInterval(() => {
elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
log("Timer:", elapsedSeconds);
}, 1000);
};

recognition.onend = () => {
log("Reconocimiento finalizado (onend).");
isTranscribing = false;
toggleButton.textContent = 'Iniciar Transcripción';
toggleButton.classList.remove('bg-red-500', 'hover:bg-red-700');
toggleButton.classList.add('bg-blue-500', 'hover:bg-blue-700');
statusIndicator.classList.add('hidden');
clearInterval(timerInterval);
};

recognition.onresult = (event) => {
let interimTranscript = '';
for (let i = event.resultIndex; i < event.results.length; i++) {
const transcriptPart = event.results[i][0].transcript;
if (event.results[i].isFinal) {
// Si es el primer resultado final, forzamos la marca a 00:00
if (!firstResultRecorded) {
finalTranscript += `[00:00] ${transcriptPart.trim()}\n`;
firstResultRecorded = true;
log("Primer resultado final. Se marca 00:00.");
} else {
// Resultados siguientes usan el tiempo absoluto
let timestamp = formatTime(elapsedSeconds);
finalTranscript += `[${timestamp}] ${transcriptPart.trim()}\n`;
}
} else {
interimTranscript += transcriptPart;
}
}
transcriptOutput.value = finalTranscript + interimTranscript;
transcriptOutput.scrollTop = transcriptOutput.scrollHeight;
};

recognition.onerror = (event) => {
console.error("Error en reconocimiento:", event.error);
let errorMessage = "Ocurrió un error";
switch(event.error) {
case "no-speech":
errorMessage = "No se detectó voz. Intenta hablar más claro o acércate al micrófono.";
break;
case "audio-capture":
errorMessage = "Error al capturar el audio. Asegurate que el micrófono esté conectado y permitido.";
break;
case "not-allowed":
errorMessage = "Permiso para acceder al micrófono denegado. Habilitalo en la configuración del navegador.";
break;
case "network":
errorMessage = "Error de red. Algunas APIs requieren conexión a internet.";
break;
case "language-not-supported":
errorMessage = "El idioma seleccionado no es compatible.";
break;
}
messageArea.textContent = `Error: ${errorMessage}`;
if (isTranscribing) recognition.stop();
};

toggleButton.addEventListener('click', () => {
log("Botón 'Iniciar/Detener' clickeado.");
if (isTranscribing) {
recognition.stop();
log("Deteniendo reconocimiento manualmente.");
} else {
// Reiniciamos variables para una nueva sesión
finalTranscript = '';
transcriptOutput.value = '';
messageArea.textContent = '';
recognition.lang = languageSelect.value;
try {
log("Iniciando reconocimiento...");
recognition.start();
} catch (error) {
console.error("Error iniciando reconocimiento:", error);
messageArea.textContent = "No se pudo iniciar la transcripción. ¿Permitiste el acceso al micrófono?";
}
}
});

clearButton.addEventListener('click', () => {
log("Botón 'Limpiar' clickeado.");
finalTranscript = '';
transcriptOutput.value = '';
messageArea.textContent = '';
clearInterval(timerInterval);
elapsedSeconds = 0;
startTime = null;
firstResultRecorded = false;
if (isTranscribing) {
recognition.stop();
log("Deteniendo reconocimiento al limpiar.");
}
});

copyButton.addEventListener('click', () => {
log("Botón 'Copiar' clickeado.");
const textToCopy = transcriptOutput.value;
if (!textToCopy) {
messageArea.textContent = "No hay texto para copiar.";
setTimeout(() => messageArea.textContent = '', 2000);
return;
}
navigator.clipboard.writeText(textToCopy)
.then(() => {
log("Texto copiado al portapapeles.");
copyFeedback.style.opacity = 1;
setTimeout(() => { copyFeedback.style.opacity = 0; }, 1500);
})
.catch(err => {
console.error("Error al copiar texto:", err);
messageArea.textContent = "Error al copiar el texto.";
setTimeout(() => messageArea.textContent = '', 2000);
});
});

languageSelect.addEventListener('change', () => {
recognition.lang = languageSelect.value;
log(`Idioma cambiado a: ${recognition.lang}`);
if (isTranscribing) {
log("Idioma cambiado durante la transcripción. Detén e inicia para aplicar el cambio.");
}
});
} else {
toggleButton.disabled = true;
languageSelect.disabled = true;
clearButton.disabled = true;
copyButton.disabled = true;
messageArea.textContent = "Tu navegador no soporta la API Web Speech. Intenta con Chrome o Edge.";
console.warn("Web Speech API not supported in this browser.");
}

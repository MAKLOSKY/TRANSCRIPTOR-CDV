# Transcriptor de Audio (by AFandinoC ❤️CDV)

¡Hola! Bienvenido/a a este repositorio **Transcriptor de Audio**, una herramienta sencilla que convierte tu voz en texto con marcas de tiempo automáticas. Ideal para generar transcripciones limpias y puntuales, listas para procesar con tu agente favorito.

---

## 📖 Descripción

Este proyecto es un simple **transcriptor de audio en vivo** que:

- Detecta tu voz a través del micrófono usando la Web Speech API.
- Añade **timestamps absolutos** cada vez que se detecta un fragmento final de habla.
- Muestra el primer resultado siempre como `00:00`, y el resto según los segundos transcurridos (incluyendo pausas).
- Permite copiar y limpiar la transcripción con un clic.
- Está pensado para que puedas extraer los 8 timestamps más relevantes (u otros usos personalizados).

El archivo principal es un `index.html` que contiene toda la lógica JavaScript y los estilos con Tailwind CSS.

---

## 🚀 Funcionalidades

1. **Reconocimiento de voz en tiempo real**  
   - Usa la API Web Speech (Chrome/Edge) para transcribir mientras hablás.
2. **Timestamps absolutos**  
   - El primer fragmento final va en `00:00`.  
   - Luego, cada fragmento refleja el tiempo absoluto (en segundos) desde el inicio, considerando pausas.
3. **Interfaz minimalista**  
   - Botón para iniciar/detener la transcripción.  
   - Indicador visual de “Escuchando…”.  
   - Select para cambiar idioma (español, inglés, francés, alemán).  
   - Área de texto donde se ve la transcripción en vivo.  
   - Botón “Copiar texto” con feedback visual.  
   - Botón “Limpiar texto” que reinicia todo y detiene el micrófono.
4. **Portabilidad**  
   - Solo un archivo HTML (sin dependencias locales adicionales).  
   - Usa recursos externos (Tailwind CSS y Google Fonts) para agilizar el diseño.
   - Se puede servir sobre HTTP(s) local o remoto para que funcione la Web Speech API.

---

## 📂 Estructura del Repositorio


```
.
├── index.html     # Página principal
├── script.js      # Lógica de reconocimiento y controles
├── styles.css     # Estilos personalizados
├── README.md      # Documentación del proyecto
└── LICENSE        # Texto de la licencia MIT
```

## 🚀 Uso

1. Clona o descarga este repositorio.
2. Sirve los archivos desde un servidor HTTP/HTTPS para permitir el acceso al micrófono. Por ejemplo:
   ```bash
   python3 -m http.server
   ```
3. Abre `http://localhost:8000/` en un navegador compatible (Chrome o Edge).
4. Pulsa **Iniciar Transcripción** y empieza a hablar.
5. Puedes **copiar** o **limpiar** el texto generado con los botones correspondientes.

**Requisitos**
- Conexión a Internet para cargar Tailwind CSS y Google Fonts.
- Micrófono habilitado en tu equipo.

El archivo principal se llama `index.html`, por lo que se abre automáticamente al acceder al directorio raíz del servidor.

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia [MIT](LICENSE).

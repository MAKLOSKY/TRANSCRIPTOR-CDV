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


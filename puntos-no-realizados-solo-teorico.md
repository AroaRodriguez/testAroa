---
description: 'Puntos 27, 28 y 29:'
icon: book-open
---

# Puntos no realizados, solo teorico

### Step 27: Unit Testing (QUnit)

¿Qué es? Es la prueba de la "pieza suelta". Imagina que estás construyendo un coche. Antes de montarlo, pruebas el motor en un banco de pruebas, fuera del chasis. Eso es un Test Unitario.

* El objetivo: Probar funciones lógicas aisladas (como tu `formatter.js`).
* La herramienta: QUnit. Es el framework estándar para JavaScript.
* ¿Cómo funciona? Tú escribes un pequeño script que dice: _"Si le paso a mi función la letra 'A', espero que me devuelva el texto 'Nuevo'. Si me devuelve otra cosa, avísame con un error"_.
* En proyecto real: Se usa para cálculos complejos, validaciones de fechas o transformaciones de datos. Si cambias algo en el futuro, corres los tests y sabes en un segundo si has roto algo que antes funcionaba.

***

### Step 28: Integration Testing (OPA5)

¿Qué es? Es la prueba del "flujo del usuario". Siguiendo la analogía del coche: ya sabemos que el motor funciona (Unit Test), ahora vamos a probar que si pisas el pedal, el motor acelera.

* El objetivo: Simular que un usuario real interactúa con la pantalla.
* La herramienta: OPA5 (_One Page Acceptance tests for SAPUI5_).
* ¿Cómo funciona? El test "toma el control" de tu navegador y dice:
  1. Given: "Estoy en la página principal".
  2. When: "Busco el botón con ID 'btnHola' y hago clic".
  3. Then: "Espero ver un mensaje que diga 'Hola'".
* En proyecto real: Es vital. Evita que tengas que probar a mano cada botón de la app cada vez que haces un cambio pequeño. El test lo hace por ti automáticamente.

***

### Step 29: Debugging Tools

¿Qué es? Es el kit de "detective" para encontrar errores. En SAP Fiori, a veces la app no carga o un campo sale vacío. En lugar de adivinar, usamos herramientas profesionales.

* El objetivo: Ver las "tripas" de la aplicación mientras está corriendo.
* Las herramientas clave:
  1. Consola de Chrome (F12): Para ver errores de sintaxis y peticiones de red (Network).
  2. SAPUI5 Diagnostics (Ctrl+Alt+Shift+S): Es un menú secreto de SAP que se abre en tu navegador. Te permite cambiar el tema visual, ver la versión exacta de UI5 y ver el árbol de controles.
  3. SAPUI5 Inspector: Una extensión de Chrome que te permite pinchar en un botón de la pantalla y ver directamente su código, sus propiedades y sus modelos.

| **Paso** | **Nombre** | **¿Qué prueba?**               | **¿Cuándo se usa?**                    |
| -------- | ---------- | ------------------------------ | -------------------------------------- |
| 27       | Unit Test  | Funciones aisladas (Lógica).   | Al crear cálculos o formateadores.     |
| 28       | OPA5       | Historias de usuario (Clicks). | Al terminar una pantalla completa.     |
| 29       | Debugging  | El estado de la app (Errores). | ¡Todo el tiempo durante el desarrollo! |

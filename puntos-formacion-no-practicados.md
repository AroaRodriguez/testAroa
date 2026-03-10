---
description: 'Puntos no realizados, únicamente teórico y revisión 27, 28,29,33,34,35,36,37:'
icon: book-open
---

# Puntos 27-28-29-33-34-35-36-37

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
*   Las herramientas clave:

    1. Consola de Chrome (F12): Para ver errores de sintaxis y peticiones de red (Network).
    2. SAPUI5 Diagnostics (Ctrl+Alt+Shift+S): Es un menú secreto de SAP que se abre en tu navegador. Te permite cambiar el tema visual, ver la versión exacta de UI5 y ver el árbol de controles.
    3. SAPUI5 Inspector: Una extensión de Chrome que te permite pinchar en un botón de la pantalla y ver directamente su código, sus propiedades y sus modelos.


* En la web

```
Ctrl Shift Alt / Option S
```

<figure><img src=".gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

*   **Note**

    If you use the Google Chrome browser, you can install the UI5 Inspector plugin. With this plugin, you can easily debug your SAPUI5- or OpenUI5-based apps. For more information, see [UI5 Inspector](https://ui5.sap.com/topic/b24e72443eb34d0fb7bf6940f2d697eb).

| **Paso** | **Nombre** | **¿Qué prueba?**               | **¿Cuándo se usa?**                    |
| -------- | ---------- | ------------------------------ | -------------------------------------- |
| 27       | Unit Test  | Funciones aisladas (Lógica).   | Al crear cálculos o formateadores.     |
| 28       | OPA5       | Historias de usuario (Clicks). | Al terminar una pantalla completa.     |
| 29       | Debugging  | El estado de la app (Errores). | ¡Todo el tiempo durante el desarrollo! |

### 🏗 Step 33: Custom Controls

¿De qué va? A veces, los cientos de controles que trae SAPUI5 (`sap.m.Button`, `sap.m.List`, etc.) no son suficientes para lo que pide el cliente.

* El objetivo: Crear tu propio elemento visual desde cero.
* Cómo funciona: Creas un archivo `.js` donde defines las propiedades (el ADN del control) y el Renderer (el código HTML que pintará el navegador).
* Ejemplo del tutorial: Creas un control de Calificación de Producto (estrellitas) que no existía en la librería estándar.

***

### 📱 Step 34: Responsiveness

¿De qué va? Un consultor Fiori nunca sabe si el usuario usará la app en un monitor de 27 pulgadas o en un iPhone SE. La app debe "fluir".

* El objetivo: Que los elementos se reubiquen o se oculten según el tamaño de la pantalla.
* Clave técnica: Usar controles como `sap.m.Table` con la propiedad `demandPopin` para que las columnas menos importantes se conviertan en filas secundarias en móviles.

***

### 💻 Step 35: Device Adaptation

¿De qué va? No es solo el tamaño, es el hardware. Un PC tiene ratón (hover), un móvil no. Un móvil tiene GPS, un PC quizás no.

* El objetivo: Detectar el dispositivo para cambiar el comportamiento de la app.
* Clave técnica: Usar el modelo de dispositivo (`sap.ui.Device`). Por ejemplo: _"Si es un teléfono, no muestres este botón de impresión"_.

***

### 📏 Step 36: Content Density

¿De qué va? SAP Fiori tiene dos "modos" de visualización:

1. Cozy (Cómodo): Elementos grandes y espaciados, ideales para dedos en pantallas táctiles.
2. Compact (Compacto): Elementos pequeños y apretados, ideales para expertos que usan ratón y necesitan ver muchos datos a la vez.

* El objetivo: Aplicar una clase CSS al cuerpo de la app (`sapUiSizeCompact` o `sapUiSizeCozy`) detectando si el dispositivo es táctil o no.

***

### ♿ Step 37: Accessibility

¿De qué va? SAP se toma muy en serio que todo el mundo pueda usar sus apps, incluyendo personas con discapacidad visual que usan lectores de pantalla.

* El objetivo: Cumplir con los estándares ARIA.
* Clave técnica: Poner etiquetas (`label`) correctas a los inputs y asegurar que la navegación con el teclado (Tabulador) sea lógica. En consultoría para el sector público, esto es obligatorio por ley.


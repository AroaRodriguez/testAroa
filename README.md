---
description: Distribución de las carpetas del proyecto y tipos de fichero según su uso.
icon: folder
---

# Carpetas Proyecto SAPUI5

AppController.js : Lógica del programa.&#x20;

```javascript
sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("testaroa.controller.App", {
      onInit() {
      }
  });
});
```

AppView.xml: Diseño de la página.

```xml
<mvc:View controllerName="testaroa.controller.App"
    displayBlock="true"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">
    <App id="app">
    </App>
</mvc:View>
```

manifest.json: Fichero dónde se guardan todas las variables y que también se utiliza para modular nuestra App.

```json
   "title": "{{Hola este es mi program}}",
    "description": "{{¿Qué tal?}}",
    "resources": "resources.json",
    "sourceTemplate": {
      "id": "@sap/generator-fiori:basic",
      "version": "1.20.4",
      "toolsId": "aac2b913-c80f-42f3-a039-a6778006d841"
    }
```

&#x20;


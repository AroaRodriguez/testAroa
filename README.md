---
description: Distribución de las carpetas del proyecto y tipos de fichero según su uso.
icon: folder
---

# Carpetas Proyecto SAPUI5

## AppController.js : Lógica del programa.&#x20;

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

## AppView.xml: Diseño de la página.

```xml
<mvc:View controllerName="testaroa.controller.App"
    displayBlock="true"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m">
    <App id="app">
    </App>
</mvc:View>
```

## manifest.json: Fichero donde se especifican las propiedades de configuración del proyecto, enrutamiento, identificadores de la aplicación, modelos y fuente de datos.

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

## Estructuras de carpetas:&#x20;

<figure><img src=".gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

* Carpeta controller: Controlador de lógica de javascript.&#x20;
* Carpeta css: Contiene todas las hojas de estilos.&#x20;
* Carpeta fragment: Contiene todos los fragmentos, técnica de conectar un evento de control dentro de un fragmento (como press de un bóton) con una función que reside en el controlador de la vista.&#x20;

Vista: HelloDialog.fragment.xml

```
<Button
   text="{i18n>okButtonText}"
   press=".onCloseDialog"/>
```

Controlador: Main.controller.js

```
onCloseDialog : function () {
   // El controlador busca el fragmento por su ID y lo cierra
   this.byId("helloDialog").close();
}
```

* Carpeta i18n: Contiene todas las "propiedades" de las vistas. Se utiliza para modular todas las declaraciones = nombres asignados de botones, listas, etc... Para después poder modificar el idioma.&#x20;
* Carpeta model: Contiene todos los modelos de datos (JSON y javascript).
* Carpeta util: Contiene todas las funciones reutilizables como parsear un string que se recoge por el usuario a un int. (se llaman y se reutilizan en todos los controladores).
* Carpeta view: Contiene todas las vistas, ficheros xml.&#x20;

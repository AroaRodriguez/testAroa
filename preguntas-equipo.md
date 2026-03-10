---
description: 'Preguntas sobre el código:'
icon: comment-question
---

# Preguntas Equipo

1. Pregunta 1: ¿Porqué es de buena práctica modular y no crear todo en el App.view y dejarlo vacío?

```xml
<mvc:View
   controllerName="testaroa.controller.App"
   xmlns="sap.m"
   xmlns:mvc="sap.ui.core.mvc"
   displayBlock="true"> 

   <Shell id="shell">
      <App id="miApp">
         <Page id="pagePrueba" title="{i18n>appTitle}"> <!-- añadimos el fichero properties--><!--Prueba proyecto, barra superior-->   
            <content>
               <mvc:XMLView id="Panel" viewName="testaroa.view.HelloPanel"/> <!--Buenas prácticas modular la primera pagina APP, no generar el codigo aqui-->
               </content>
         </Page>
      </App>
   </Shell>
</mvc:View>

```

2. Pregunta 2:  ¿Que es la llamada al constructor JSONModel (OData), pasando el parametro data?

¿Es una clase de una librería, que hace para crear el oModel? ¿Es lo que comentabais el otro dia del modelo, verdad? -— Me cuesta entenderlo un poco.&#x20;

```javascript
    return Controller.extend("testaroa.controller.HelloPanel", {
        
        //     //El método onInit se ejecuta al arrancar la app.
        //     onInit: function () {
        //     // Creamos un objeto de datos de prueba
        //     var oData = {
        //         destinatario: {
        //             nombre: ""
        //         }
        //     };
            
        //     // Creamos el modelo y le metemos los datos
        //     var oModel = new JSONModel(oData); //¿donde se crea esta modelo? Se crea en la memoria RAM del navegador de tu ordenador en ese exacto milisegundo.
            
        //     // Asignamos el modelo a nuestra vista para que pueda "leerlo"
        //     this.getView().setModel(oModel); //oModel ¿donde? Esta línea es el pegamento.
        // },
```

3. Pregunta 3: Fichero Component.js, modular el INIT, ¿podéis explicarmelo? Porque no dejamos el metodo INIT y usamos este fichero en concreto, es para que todas las consultas que hacemos al OModel esten el mismo fichero?&#x20;

```javascript
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "testaroa/model/models",
    "sap/ui/model/json/JSONModel" // Añadimos la librería del JSONModel
],
//Esta función que me la expliquen más detalladamente --> entiendo que es para sustituir el init anterior, pero que beneficios finales tiene y si se usa. --> Paso 10 tutorial
function (UIComponent, Device, models, JSONModel) { //La recibimos como parámetro (¡orden estricto!)
    "use strict";

    return UIComponent.extend("testaroa.Component", {
        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // Llama a la función init base del framework (¡obligatorio!)
            UIComponent.prototype.init.apply(this, arguments);

            // --- INICIO DE NUESTROS DATOS GLOBALES ---
            // Creamos los datos
            var oData = {
                destinatario: {
                    nombre: "" //dejamos vacío para que se escriba
                }
            };
            
            // Creamos el modelo
            var oModel = new JSONModel(oData);
            
            // ¡ATENCIÓN! Aquí usamos this.setModel en lugar de this.getView().setModel
            // Al hacerlo en 'this' (el Componente), el modelo es global para toda la App.
            this.setModel(oModel);
            // --- FIN DE NUESTROS DATOS GLOBALES ---


            // Habilita el router (navegación entre pantallas)
            this.getRouter().initialize();

            // Configura el modelo de dispositivos (para saber si es móvil o PC)
            this.setModel(models.createDeviceModel(), "device");
        }
    });
}
);
```


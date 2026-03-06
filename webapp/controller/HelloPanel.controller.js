sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";


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
        
        
            onShowHello: function () {
            //leemos el nombre que hay guardado en el modelo JSON, "se escribe por usuario"
            var sRecipient = this.getView().getModel().getProperty("/destinatario/nombre");
            //Obtenemos el paquete de traducciones del modelo i18n
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            //Le pedimos el texto hola mensaje y le pasamos el nombre para rellenar el {0}
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            //Sustituimos el 'alert' por el método '.show()' del MessageToast
            MessageToast.show(sMsg);
        }

    });
});
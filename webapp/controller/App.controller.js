sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast" //Añadimos ruta modulo ¿libreria?
], function (Controller) {
    "use strict";

    return Controller.extend("testaroa.controller.App", {
        
            onShowHello: function () {
            //Sustituimos el 'alert' por el método '.show()' del MessageToast
            MessageToast.show("¡Hola Mundo! Ahora soy un mensaje profesional.");
        }

    });
});
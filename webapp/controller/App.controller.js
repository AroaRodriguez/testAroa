sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("testaroa.controller.App", {
        // Esta es la función que busca el botón del "mundo"
        onOpenDialog: function () {
            // Llamamos a la función que acabas de definir en el Component.js
            this.getOwnerComponent().openHelloDialog();
        }
    });
});
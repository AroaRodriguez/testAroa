sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "testaroa/model/models",
    "sap/ui/model/json/JSONModel",
    "testaroa/controller/HelloDialog" // <-- ¡FALTABA ESTA QUINTA RUTA!
],
function (UIComponent, Device, models, JSONModel, HelloDialog) { // <-- Ahora sí coincide con la 5ª posición
    "use strict";

    return UIComponent.extend("testaroa.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // Llama a la función init base (obligatorio)
            UIComponent.prototype.init.apply(this, arguments);

            // --- MODELO JSON GLOBAL ---
            var oData = { destinatario: { nombre: "" } };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            // --- DIÁLOGO GLOBAL ---
            // Ahora HelloDialog ya no es undefined, es el constructor real
            this._helloDialog = new HelloDialog(this.getRootControl());

            this.getRouter().initialize();
            this.setModel(models.createDeviceModel(), "device");
        }, 

        exit: function () {
            this._helloDialog.destroy();
            delete this._helloDialog;
        },

        openHelloDialog: function () {
            this._helloDialog.open(); //
        }
    });
});
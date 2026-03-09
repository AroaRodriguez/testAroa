sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
    "use strict";

    return ManagedObject.extend("testaroa.controller.HelloDialog", {
        constructor: function (oView) {
            this._oView = oView; // Guardamos la vista padre
        },

        exit: function () {
            delete this._oView;
        },

        open: function () {
            var oView = this._oView;

            // Creamos el diálogo solo si no existe
            if (!this.pDialog) {
                var oFragmentController = {
                    onCloseDialog: function () {
                        oView.byId("helloDialog").close();
                    }
                };
                
                // Cargamos el fragmento de forma asíncrona
                this.pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "testaroa.view.HelloDialog",
                    controller: oFragmentController
                }).then(function (oDialog) {
                    // Conectamos el diálogo al ciclo de vida de la vista
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this.pDialog.then(function (oDialog) {
                oDialog.open(); // Abrimos la ventana
            });
        }
    });
});
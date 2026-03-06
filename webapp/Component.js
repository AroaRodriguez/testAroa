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
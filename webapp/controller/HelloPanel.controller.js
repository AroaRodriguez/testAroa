sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";


    return Controller.extend("testaroa.controller.HelloPanel", {

            onShowHello: function () {
            //leemos el nombre que hay guardado en el modelo JSON, "se escribe por usuario"
            var sRecipient = this.getView().getModel().getProperty("/destinatario/nombre");
            //Obtenemos el paquete de traducciones del modelo i18n
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            //Le pedimos el texto hola mensaje y le pasamos el nombre para rellenar el {0}
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            //Sustituimos el 'alert' por el método '.show()' del MessageToast
            MessageToast.show(sMsg);
        },

        // --- NUEVA FUNCIÓN PARA ABRIR EL DIÁLOGO ---
        //async onOpenDialog() {
            // Cargamos el fragmento solo si no existe ya en la memoria
            //this.oDialog ??= await this.loadFragment({
                //name: "testaroa.view.HelloDialog"
            //});
            
            //this.oDialog.open(); // Abrimos la ventana
        //},

        // // --- NUEVA FUNCIÓN PARA CERRAR EL DIÁLOGO ---
        // onCloseDialog() {
        //     this.byId("helloDialog").close(); // Cerramos buscando el ID del fragmento
        // },

        onOpenDialog: function () {
        // Le pedimos al Componente que abra el diálogo por nosotros
        this.getOwnerComponent().openHelloDialog();
        },


        
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
        
    




    }); //Cierre return
    }); //Cierre clase controller

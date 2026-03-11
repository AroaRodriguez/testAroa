sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",         
    "sap/ui/model/FilterOperator"  
], function (Controller, MessageToast,JSONModel, Filter, FilterOperator) {
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

        onInit: function () {
            debugger
        // Creamos un modelo de vista para definir que la moneda es EUR
        var oViewModel = new JSONModel({
            currency: "EUR" //tipo de moneda, ventaja de modular para cuando se tenga que cambiar, solo se cambie esta linea. 
         });
        this.getView().setModel(oViewModel, "view");
        },

        // FUNCIÓN DE AGRUPACIÓN MODULARIZADA
        getGroupHeader: function (oContext) {
        // 1. Leemos el precio del contexto actual
        var fPrice = oContext.getProperty("ExtendedPrice");
        
        // 2. Definimos la lógica de "Bien" o "Mal"
        if (fPrice > 50) {
            return {
                key: "CRITICAL",
                text: "ESTADO: MAL (Facturas Críticas > 50€)"
            };
        } else {
            return {
                key: "OK",
                text: "ESTADO: BIEN (Facturas Correctas <= 50€)"
            };
        }
    },

        onFilterInvoices: function (oEvent) {
            // 3. Obtener el texto que ha escrito el usuario
            var sQuery = oEvent.getParameter("query");
            var aFilter = [];
            
            if (sQuery) {
                // Creamos un filtro que busque en 'ProductName'
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }

            // 4. Aplicar el filtro a la lista
            var oList = this.byId("listadoModelo");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        }, 

    onPress: function (oEvent) {
    var oItem = oEvent.getSource();
    var oRouter = this.getOwnerComponent().getRouter();
    
    // Obtenemos el path y nos quedamos solo con el número
    var sPath = oItem.getBindingContext("invoice").getPath();
    var sIndex = sPath.split("/").pop(); // Esto coge el último trozo después de la barra
    
    oRouter.navTo("detail", {
        invoicePath: window.encodeURIComponent(sIndex)
    });
}
        
        
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

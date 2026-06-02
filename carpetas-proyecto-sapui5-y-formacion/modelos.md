---
icon: question
---

# Modelos

```js
sap.ui.define([
    "request/controller/BaseController",
    "sap/ui/model/json/JSONModel" // <-- No olvides esto
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("request.controller.CreateNewRequest", {

        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            // El conmutador: escucha por qué pantalla entras
            oRouter.getRoute("CreateNewRequest").attachPatternMatched(this._onRouteCreateMatched, this);
            oRouter.getRoute("MyRequestDetail").attachPatternMatched(this._onRouteDetailMatched, this);
        },

        /******************************************************
         * ROUTING (EL CONMUTADOR DE MODELOS)
         ******************************************************/

        _onRouteCreateMatched: function (oEvent) {
            // 1. ALGORITMO/VARIABLES EN EL CONTROLADOR: 
            // Llamamos a una función que nos devuelve los datos vacíos
            const oInitialData = this._getEmptyWizardTemplate();
            
            // 2. Le damos la información al modelo
            const oModel = new JSONModel(oInitialData);
            
            // 3. Se lo pasamos a la vista con el nombre "wizardModel"
            this.getView().setModel(oModel, "wizardModel");
            
            // 4. Inicializamos el estado del Wizard al paso 1
            this._initializeWizardState();
        },

        _onRouteDetailMatched: function (oEvent) {
            const sRequestId = oEvent.getParameter("arguments").requestId;
            
            // 1. ALGORITMO/VARIABLES: 
            // Hasta que haya OData, llamamos a una función que nos devuelve datos falsos
            const oDetailData = this._getMockDetailData(sRequestId);
            
            // 2. Le damos la información al modelo
            const oModel = new JSONModel(oDetailData);
            
            // 3. Se lo pasamos a la vista con el mismo nombre "wizardModel"
            this.getView().setModel(oModel, "wizardModel");
            
            this._initializeWizardState();
        },

        /******************************************************
         * MÉTODOS DE DATOS (Lo que pidió tu compañero)
         ******************************************************/

        /**
         * Devuelve la estructura vacía para CREAR (Variables para el modelo)
         */
        _getEmptyWizardTemplate: function () {
            // Aquí es donde defines las "variables" (propiedades del JSON)
            return {
                data: {
                    GenericData: {
                        salesArea: "",
                        salesOrder: "",  
                        costCenter: "",
                        categoryRequest: "",
                        deliveryDate: "",
                        description: ""
                    },
                    Customers: { items: [] }
                },
                config: {
                    UI: { mode: "edit" },
                    navigation: {
                        currentStep: "GenericData",
                        steps: ["GenericData", "Customers", "Products", "Summary"],
                        btnPrevious: { visible: true, enabled: true },
                        btnNext: { visible: true, enabled: true }
                    },
                    GenericData: {
                        salesOrder: { required: true, valueState: "None" }
                        // ... (puedes añadir el resto de validaciones aquí)
                    }
                }
            };
        },

        /**
         * Devuelve la estructura llena para DETALLE (Variables para el modelo)
         */
        _getMockDetailData: function (sRequestId) {
            return {
                data: {
                    GenericData: {
                        salesArea: "Z001",
                        salesOrder: "ZLOV", // <-- Variable con dato para lectura
                        costCenter: "A0001",
                        categoryRequest: "01",
                        deliveryDate: "2026-12-31",
                        description: "Solicitud de prueba " + sRequestId
                    },
                    Customers: { items: [] }
                },
                config: {
                    UI: { mode: "view" },
                    navigation: {
                        currentStep: "GenericData",
                        steps: ["GenericData", "Customers", "Products", "Summary"],
                        btnPrevious: { visible: false, enabled: false },
                        btnNext: { visible: false, enabled: false }
                    },
                    GenericData: {
                        salesOrder: { required: false, valueState: "None" }
                    }
                }
            };
        },

        _initializeWizardState: function () {
            this._getWizardModel().setProperty('/config/navigation/currentStep', 'GenericData');
            const oWizard = this.byId("idWizard");
            if (oWizard) {
                const oFirstStep = oWizard.getSteps()[0];
                oWizard.discardProgress(oFirstStep);
                oWizard.goToStep(oFirstStep);
            }
            this._syncStepWithWizard('GenericData');
        }
    });
});
```

```xml
<Input value="{wizardModel>/data/GenericData/salesOrder}" />
```


---
description: Práctica para aprender a realizar correctamente el modulado de las carpetas
icon: laptop-code
---

# Practica con modulado

Home.view.xml:

```xml
<mvc:View controllerName="ecommerceproject.controller.Home"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:f="sap.f"
    xmlns:core="sap.ui.core">
 <f:DynamicPage
        id="homePage"
        showFooter="false"
    >
        <!-- Header -->
        <f:title>
            <f:DynamicPageTitle id="DynamicPage1" backgroundDesign="Transparent">
                <f:heading>
                    <Title id="DynamicTitle"
                        text="{i18n>product}"
                        level="H1"
                    />
                </f:heading>
            </f:DynamicPageTitle>
        </f:title>

        <!-- Content -->
        <f:content>
            <core:Fragment
               fragmentName="ecommerceproject.fragment.Card" //Fragmento para obtener cartas
                type="XML"
            />
        </f:content>
    </f:DynamicPage>
</mvc:View>

```

Card.fragment.xml:

```xml
core:FragmentDefinition
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
    xmlns:f="sap.f"
>
    <f:GridContainer id="Container1"
        containerQuery="true"
        width="100%"
        class="sapUiContentPadding sapUiSmallMarginTop"
        items="{
                path: 'configModel>/Home/cards' 
        }" 
    > 
        <f:items>
            <f:Card 
                class="cardStyle"
                press=".onCardPress"
                visible="{configModel>visible}"
            >
                <!-- Layout del grid -->
                <f:layoutData>
                    <f:GridContainerItemLayoutData id="containerLayout"
                        columns="3"
                        rows="9"
                    />
                </f:layoutData>

                <!-- Contenido de la card -->
                <f:content>
                    <VBox id="Box1">
                        <VBox id="Box2" class="sapUiSmallMargin" alignItems="Center">
                            <Image 
                                src="{configModel>imageSrc}"
                                width="100%"
                                height="200px"
                                
                                class="sapUiSmallMarginBottom productImgStyle"
                            />

                            <Title 
                                text="{
                                parts: [{ path: 'configModel>title' }]
                            }"
                                titleStyle="H5"
                                width="100%"
                                textAlign="Center"
                                class="sapUiSmallMarginTop productTitleStyle"
                            /> 
                        </VBox>

                        <Text 
                            text="{
                            parts: [{ path: 'configModel>description' }]
                        }"
                            textAlign="Center"
                            maxLines="2"
                            width="100%"
                            class="sapUiSmallMarginTop productDescriptionStyle"
                        />
                        <HBox id="Box3" alignItems="Center" justifyContent="Center" class="sapUiTinyMarginTop">
                            <RatingIndicator id="indicator" value="4.5" maxValue="5" editable="false" class="customRating" />
                            <Text id="rating" text="4.6" class="sapUiTinyMarginBegin ratingText" />
                        </HBox>
                        <HBox id="Box4" width="100%" justifyContent="Center" class="sapUiMediumMarginTop sapUiSmallMarginBottom">
                        <Text  text="{configModel>price} €" 
                            textAlign="Center"
                            class="sapUiMediumMarginTop productPrice" />
                        </HBox>
                        <HBox id="Box5" width="100%" justifyContent="Center"  class="sapUiMediumMarginTop sapUiSmallMarginBottom">
                            <Button id="addToCartBtn"
                                text="{i18n>add}"
                                type="Emphasized"
                                press=".onAddToCardPress"
                                class="btnAddStyle"
                            />
                        </HBox>
                        
                    </VBox>
                </f:content>
            </f:Card>
        </f:items>
    </f:GridContainer>
</core:FragmentDefinition>

```

Home.controller.js:

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "ecommerceproject/controller/BaseController", 
    "sap/m/MessageToast"
], function (Controller, BaseController, MessageToast) {
    "use strict";

    return BaseController.extend("ecommerceproject.controller.Home", {
        onInit() {
        }, 
        //Funcion para presionar la carta
        onCardPress: function (oEvent) {
            //Usamos función generica base controller para sacar el número de la carta.
           const sItemIndex = this.getIndexFromEvent(oEvent, "configModel");

            //Usamos nuestra función del BaseController para viajar a la siguiente pantalla
            this.navTo("RouteDetail", {
                productIndex: sItemIndex
            });
        }, 

        onAddToCardPress: function(oEvent) {
            //Llamamos la función generica para sacar el nombre del producto de la clase basecontroller
            const sProductName = this.getPropertyFromEvent(oEvent, "title", "configModel");
            /Llamamos la función generica para el properties
            const sFinalMessage = this.getResourceBundle().getText("AddCart", [sProductName]);

            MessageToast.show(sFinalMessage, {
                duration: 3000
            });
        }
    });
});
```

BaseController.js: (funciones genericas) --> (carpeta controller)

```javascript
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
    "use strict";

    return Controller.extend("ecommerceproject.controller.BaseController", {

        // --- 1. Atajo para obtener el Router ---
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        // --- 2. Atajo para obtener Modelos ---
        getModel: function (sName) {
            return this.getView().getModel(sName);
        },

        /**
         * Obtiene el índice de la ruta de un elemento pulsado (ej. de "/Home/cards/2" saca "2")
         * @param {sap.ui.base.Event} oEvent - El evento del clic (press)
         * @param {string} [sModelName] - El nombre del modelo (opcional, ej. "configModel")
         * @returns {string} El índice final de la ruta
         */
        getIndexFromEvent: function (oEvent, sModelName) {
            const oContext = oEvent.getSource().getBindingContext(sModelName);
            return oContext ? oContext.getPath().split("/").pop() : null;
        },

        /**
         * Obtiene el valor de una propiedad específica del elemento pulsado
         * @param {sap.ui.base.Event} oEvent - El evento del clic
         * @param {string} sProperty - El nombre del campo en el JSON (ej. "title")
         * @param {string} [sModelName] - El nombre del modelo (opcional)
         * @returns {any} El valor de esa propiedad
         */
        getPropertyFromEvent: function (oEvent, sProperty, sModelName) {
            const oContext = oEvent.getSource().getBindingContext(sModelName);
            return oContext ? oContext.getProperty(sProperty) : null;
        },

        // --- Atajo para obtener textos de traducción (i18n) ---
        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        // --- NUEVA FUNCIÓN GENÉRICA PARA NAVEGAR ---
        /**
         * Navega a una ruta específica.
         * @param {string} sName - El nombre de la ruta (ej. "RouteDetail")
         * @param {object} [oParameters] - Parámetros opcionales (ej. { productIndex: 1 })
         * @param {boolean} [bReplace] - Si es true, reemplaza el historial actual
         */
        navTo: function (sName, oParameters, bReplace) {
            this.getRouter().navTo(sName, oParameters, bReplace);
        }, 

        // --- GESTOR DE FRAGMENTOS GENÉRICO ---
        getDialog: async function (sFragmentName) {
            this._oDialogs = this._oDialogs || {};
            if (!this._oDialogs[sFragmentName]) {
                this._oDialogs[sFragmentName] = await this.loadFragment({
                    name: sFragmentName
                });
            }
            return this._oDialogs[sFragmentName];
        }

    });
});
```

Detail.view.xml: (detalle de la carta home)

```xml
<mvc:View
    controllerName="ecommerceproject.controller.Detail"
    xmlns:mvc="sap.ui.core.mvc"
    xmlns="sap.m"
    xmlns:layout="sap.ui.layout">

    <Page
        id="detailPage"
        title="{configModel>title}"
        backgroundDesign="Solid">
        <headerContent>
         <Button id="editBtnHeader"
                            text="{i18n>edit}"
                            icon = "sap-icon://edit"
                            press=".onOpenEditDialog"/>
        </headerContent>

        <content>
            <layout:Grid id="_IDGenGrid" containerQuery="true" defaultSpan="XL6 L6 M6 S12" class="sapUiMediumMarginTop">
                
                <VBox id="detailBox1" alignItems="Center" justifyContent="Center" class="sapUiMediumMargin">
                    <Image id="detailImg" src="{configModel>imageSrc}" 
                           width="100%" 
                           class="productImgDetailStyle"/>
                </VBox>

                <VBox id="detailBox2" class="sapUiMediumMargin">
                    
                    <Title id="detailTitle1" text="{configModel>title}" titleStyle="H1" class="sapUiSmallMarginBottom"/>
                    
                    <HBox id="detailBox3" alignItems="Center" class="sapUiSmallMarginBottom">
                        <RatingIndicator id="detailRating" value="4.6" maxValue="5" editable="false" class="customRating" />
                        <Text id="detailText1" text="4.6 (128 valoraciones)" class="sapUiTinyMarginBegin ratingText" />
                    </HBox>

                    <Text id="detailText2" text="{configModel>description}" class="sapUiMediumMarginBottom productDescriptionDetailStyle"/>
                    
                    <Title id="detailTitle2" text="{configModel>price} €" titleStyle="H2" class="sapUiSmallMarginBottom productPriceDetailStyle"/>
                    
                    <Text id="detailText3" text="{i18n>detailText3}" class="sapUiMediumMarginBottom infoTextDetail"/>

                    <Button id="addToCartBtnDetail"
                            text="{i18n>add}"
                            class="btnAddStyleDetail"
                            width="10%"/>
                </VBox>

            </layout:Grid>
        </content>
    </Page>
</mvc:View>
```

Detail.controller.js: (controlador del detalle) --> Operaciones CRUD únicamente editar

```js
sap.ui.define([
    "ecommerceproject/controller/BaseController",
    "ecommerceproject/util/Helpers", 
    "sap/ui/model/json/JSONModel", 
    "sap/m/MessageToast", 
    "ecommerceproject/util/Validator"

], function (BaseController, Helpers, JSONModel,MessageToast,Validator) {
    "use strict";

    return BaseController.extend("ecommerceproject.controller.Detail", {
        
        onInit: function () {
            this.getRouter().getRoute("RouteDetail").attachPatternMatched(this.onObjectMatched, this);
            this.getView().setModel(new JSONModel({}), "editModel");
            
        }, 

        onObjectMatched: function (oEvent){
            const sProductIndex = oEvent.getParameter("arguments").productIndex;
            this.sPath = "/Home/cards/" + sProductIndex;
            
            this.getView().bindElement({
                path: this.sPath,
                model: "configModel",
                events: {
                    change: function(oEvent){
                        const oContext = oEvent.getSource().getBoundContext()
                        if (!oContext){
                            console.error("¡No se ha encontrado los datos para la ruta!");
                        }
                    }
                }
            });
        }, 

        //Función para abrir el dialogo y editar. 
        onOpenEditDialog: async function() {
            const oCurrentData = this.getModel("configModel").getProperty(this.sPath);
            const oClonedData = Helpers.deepClone(oCurrentData);
            
            this.getModel("editModel").setData(oClonedData);

            const oDialog = await this.getDialog ("ecommerceproject.fragment.EditProduct");
            oDialog.open(); 
        }, 

        //Función guardar cambios nuevos

        onSaveEdit: function() {
            //relacionamos la constante con la vista. 
            const oInputName = this.byId("InptEdit1");
            const oInputPrice = this.byId("InptEdit2");
            //declaracion + llamada a metodo resource del base controller, para los mensajes sean en el properties
            const sMessageName = this.getResourceBundle().getText("nameEditFail");
            const sMessagePrice = this.getResourceBundle().getText("priceEditFail");
            const sMessageError = this.getResourceBundle().getText("ErrorMessage");
            const sMessageUpdate = this.getResourceBundle().getText("SucessUpdate");

            //declaramos y llamamos a la funcion de la clase validator
            const bIsNameValid = Validator.validateRequiredInput(oInputName, sMessageName);
            const bIsPriceValid = Validator.validatePrice(oInputPrice, sMessagePrice);
            //Si alguno de los dos no es valido, que muestre el mensaje. 
            if (!bIsNameValid|| !bIsPriceValid) {
                MessageToast.show(sMessageError);
                return;
            }
            
            const oEditedData = this.getModel("editModel").getData();
            this.getModel("configModel").setProperty(this.sPath, oEditedData);

            MessageToast.show(sMessageUpdate);
            this.onCloseEdit();

        }, 

        //Cerrar dialogo

        onCloseEdit: async function() {
            const oDialog = await this.getDialog("ecommerceproject.fragment.EditProduct");
            oDialog.close();
            
        }


    });
});
```

EditProduct.fragment.xml (Fragmento que aparece cuando pulsamos el boton editar en la logica de detail)

```xml
<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core">
    <Dialog id="editDialog" title="{i18n>edit}" contentWidth="400px">
        <content>
            <VBox id="BoxEdit1" class="sapUiSmallMargin">
                <Label id="LblEdit1" text="{i18n>nameProduct}" required="true"/>
                <Input id="InptEdit1" value="{editModel>/title}" />

                <Label id="LblEdit2" text="{i18n>descriptionProduct}" class="sapUiSmallMarginTop"/>
                <TextArea id="TxtEdit1" value="{editModel>/description}" rows="3" width="100%"/>

                <Label id="LblEdit3" text="{i18n>priceProduct}" required="true" class="sapUiSmallMarginTop"/>
                <Input id="InptEdit2" value="{editModel>/price}" type="Number" />
            </VBox>
        </content>
        <buttons>
            <Button id="BtnSave" text="{i18n>saveBtn}" type="Emphasized" press=".onSaveEdit" />
            <Button id="BtnCancel" text="{i18n>cancelBtn}" type="Transparent" press=".onCloseEdit" />
        </buttons>
    </Dialog>
</core:FragmentDefinition>
```

Validator.js --> (carpeta util): Funciones genericas para validar formularios

```js
sap.ui.define([], function () {
    "use strict";

    return {
        /**
         * Comprueba si un campo de texto está vacío.
         * Si está vacío, lo pinta de rojo y muestra un mensaje.
         * @param {sap.m.InputBase} oInput - El control a validar
         * @param {string} sErrorMessage - El mensaje de error a mostrar
         * @returns {boolean} true si es válido, false si hay error
         */
        validateRequiredInput: function (oInput, sErrorMessage) {
            const sValue = oInput.getValue();
            
            // Si no hay valor o son solo espacios en blanco...
            if (!sValue || sValue.trim() === "") {
                oInput.setValueState("Error");
                oInput.setValueStateText(sErrorMessage);
                return false;
            } else {
                oInput.setValueState("None"); // Lo devuelve a su estado normal
                return true;
            }
        },

        /**
         * Comprueba si el valor numérico es válido (mayor que 0)
         * @param {sap.m.Input} oInput - El control del precio
         * @returns {boolean}
         */
        validatePrice: function (oInput, sErrorMessage) {
            const sValue = oInput.getValue();
            
            if (!sValue || isNaN(sValue) || parseFloat(sValue) <= 0) {
                oInput.setValueState("Error");
                oInput.setValueStateText(sErrorMessage);
                return false;
            } else {
                oInput.setValueState("None");
                return true;
            }
        }
    };
});
```

Helpers.js: --> (carpeta util): Función generica para clonar el modelo JSON

```js
sap.ui.define([], function () {
    "use strict";
    return {
        deepClone: function (oData) {
            if (!oData) return null;
            return JSON.parse(JSON.stringify(oData));
        }
    };
});
```

i18nProperties:&#x20;

```properties
# This is the resource bundle for ecommerceproject

#Texts for manifest.json

#XTIT: Application name
appTitle=eCommerce

#YDES: Application description
appDescription=An SAP Fiori application.
#XTIT: Main view title
product = Products

#button txt:
add = Añadir al carrito

#detail text
detailText3 = Impuestos incluidos. Envío gratis en pedidos superiores a 50€.
edit = Editar

#function addToCard
AddCart={0} se ha añadido al carrito con éxito

#EditProduct.fragment
nameProduct = Nombre del producto
descriptionProduct = Descripción del producto
priceProduct = Precio €
saveBtn = Guardar
cancelBtn = Cancelar

#function saveEdit
nameEditFail = El nombre es obligatorio
priceEditFail = El precio es obligatorio
ErrorMessage = Por favor, corrige los errores en rojo
SucessUpdate = Producto actualizado
```

\#styless.css: (estilos tanto de Home + Detail)

```css
/* --- Contenedor de la carta --- */
.sapFCard.cardStyle {
    border: none !important;
    border-radius: 12px !important;
    box-shadow: none !important; /* Quitamos la sombra para hacerla plana */
    overflow: hidden !important;
    background-color: transparent;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Efecto hover: solo aparece la sombra al pasar el ratón */
.sapFCard.cardStyle:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08) !important;
    background-color: #fff;
    border-radius: 12px !important;
}

/* --- Etiqueta 'Nuevo' --- */
.badgeNuevo {
    background-color: #e8f5e9;
    color: #27ae60;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: bold;
    position: absolute; /* La pone encima de la imagen */
    margin-top: 10px;
    margin-left: 10px;
}

/* --- Imagen --- */
.productImgStyle {
    object-fit: contain;
    background-color: #f8f9fa; /* Fondo gris muy clarito como en ISDIN */
    padding: 15px;
}

/* --- Textos --- */
.productTitleStyle {
    font-weight: 400 !important; /* Letra más fina y elegante */
    color: #333 !important;
}

.productDescriptionStyle {
    color: #555 !important;
    font-size: 0.85rem !important;
    line-height: 1.2rem;
}

.ratingText {
    font-size: 0.8rem !important;
    color: #666 !important;
}

.productPrice {
    font-weight: bold !important;
    font-size: 1.5rem !important;
    color: #000000 !important;
}

.pointsLink {
    font-size: 0.8rem;
    color: #666 !important;
    text-decoration: underline;
}

/* --- Botón Oscuro --- */
.btnAddStyle {
    width: 100% !important;
}
.btnAddStyle .sapMBtnInner {
    background-color: #acacac !important; /* Gris muy oscuro */
    color: rgb(255, 255, 255) !important;
    border: none !important;
    border-radius: 10px !important; /* Bordes casi cuadrados */
    text-shadow: none !important;
    background-image: none !important;
    height: 1.5rem !important; 
}

.btnAddStyle .sapMBtnInner:hover {
    background-color: #222222 !important; /* Más negro al pasar el ratón */
}

/* Detail style*/


/* Detail imagenes*/
.productImgDetailStyle {
    height: 400px !important; /* Fijamos una altura exacta para todos los productos */
    max-height: 400px !important;
    width: 100% !important;
    object-fit: contain !important; /* La imagen se adapta sin deformarse jamás */
    background-color: #ffffff; /* Fondo blanco puro */
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); /* Sombra súper sutil de "estudio" */
}

/* Detail textos*/

.productDescriptionDetailStyle {
    font-size: 1.1rem !important;
    color: #555555 !important;
    line-height: 1.6 !important; /* Mejor legibilidad */
}
.productPriceDetailStyle {
    font-size: 2rem !important;
    font-weight: 800 !important; /* Muy negrita */
    color: #111111 !important;
}
.infoTextDetail {
    font-size: 0.85rem !important;
    color: #888888 !important;
}

/* Detail botón añadir al carrito*/
.btnAddStyleDetail {
    margin-top: 1rem;
}
.btnAddStyleDetail .sapMBtnInner {
   background-color: #acacac !important; /* Gris muy oscuro */
    color: rgb(255, 255, 255) !important;
    border: none !important;
    border-radius: 10px !important; /* Bordes casi cuadrados */
    text-shadow: none !important;
    background-image: none !important;
    height: 1.5rem !important; 
}
.btnAddStyleDetail .sapMBtnInner:hover {
    background-color: #222222 !important; /* Más negro al pasar el ratón */
}
```

Resultado:&#x20;

<figure><img src=".gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

<figure><img src=".gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

<figure><img src=".gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

<figure><img src=".gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

<figure><img src=".gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

<figure><img src=".gitbook/assets/image (11).png" alt=""><figcaption></figcaption></figure>

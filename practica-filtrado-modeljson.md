# Práctica filtrado modelJSON

App:

<figure><img src=".gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

Fichero List.json:

<figure><img src=".gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

Cambio en la Home.view.xml para enfocar el modelo filtradoModel:

```xml
                    <fb:FilterGroupItem id="CategoryFilter" name="Category" label="{i18n>category}" groupName="G1" visibleInFilterBar="true">
                        <fb:control>
                            <ComboBox id="cbCategorizacion" items="{filtradoModel>/CategoriasSet}"> <!-- Combo box de categorización-->
                                <core:Item id="categoryFilter" key="{filtradoModel>categoria}" text="{filtradoModel>categoria}"/>
                            </ComboBox>
                        </fb:control>
                    </fb:FilterGroupItem>

                </fb:filterGroupItems>
            </fb:FilterBar>
```

Declarado en el manifest:

```json
      "listModel": {
        "type": "sap.ui.model.json.JSONModel",
        "uri": "model/List.json"
      }, 
      "filtradoModel": {
        "type": "sap.ui.model.json.JSONModel", 
        "settings": {}
      }
    },
```

Home.controller.js:

Añadir la ruta para disparar el evento, cuando se disparé el evento me ejecute la función:

```javascript
function (Controller, MessageToast, JSONModel, Filter, FilterOperator, MessageBox, Fragment, File) {
    "use strict";

    return Controller.extend("retosproyecto.controller.Home", {

        onInit: function () {  

            //Indicamos la ruta y funcion loadDynamicCategory
            const oRoute = this.getOwnerComponent().getRouter();
            oRoute.getRoute("RouteHome").attachPatternMatched(this.loadDynamicCategory, this); //Busca la ruta en el manifest y dispara el evento --> cuando salte el evento que ejecute la función
            
        },

```

Función para añadir categoria en el modelo filtradoModel desde el modelo listModel dentro del Home.controller.js, justo debajo del onInit().

```javascript
        //Function new modelJSON to add category values from List.Json
         loadDynamicCategory: function () {
            //Recuperamos el modelo listModel
            const oListModel = this.getOwnerComponent().getModel("listModel");
            const aData = oListModel.getProperty("/SolicitudesSet");

            if (aData.length > 0) {
                //Extraer y limpiar duplicados con Set
                const aUniqueCategory = [...new Set(aData.map(item => item.categoria))]; //Spread (concatenar arrays)+ funcion mapeo
                
                //Mapear a formato Objeto para el ComboBox
                const aFilterData = aUniqueCategory.map(cat => ({ 
                    categoria: cat 
                }));
                //Recuperamos el modelo filtrado
                const oFilterModel = this.getOwnerComponent().getModel("filtradoModel");
                // Añadimos los datos al modelo.
                if (oFilterModel) {
                    oFilterModel.setProperty("/CategoriasSet", aFilterData);
                }  
            }
        },
```

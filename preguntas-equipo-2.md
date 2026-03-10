---
description: 'Parte 20 al 32:'
icon: comment-question
---

# Preguntas Equipo 2

* Esta manera de tratar los datos es unica, de SAP. ¿Qué ventajas tiene respecto a como se tratan los datos en java? Porque se centra mucho en negocio?

```xml
<!--Único de SAP Fiori, esta pensado para datos complejos de negocio, permite separar visual ente el nombre del objeto de su valor númerico y su unidad. -->
               <ObjectListItem id="Objeto"
                  title="{invoice>ProductName}"
                  number="{
                     parts: [
                        {path: 'invoice>ExtendedPrice'},
                        'view>/currency'
                           ],
                        type: 'sap.ui.model.type.Currency',
                        formatOptions: {
                        showMeasure: false
                        }
                        }"
                        numberUnit="{view>/currency}" 
                        numberState="{= ${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }" /> <!--mostrar un error cuando sea mayor que 50-->
```

* Ficheros JSON entendidos, pero me gustaría que me explicarán que métodos tiene OModel (JSON), como se crea el modelo y que consulta: (me cuesta entenderlo, es una libreria que llamamos, pero se utiliza para consultar...): Modelo vista..., únicamente es una forma de modular?

```javascript
     onInit: function () {
        // Creamos un modelo de vista para definir que la moneda es EUR
        var oViewModel = new JSONModel({
            currency: "EUR" //tipo de moneda, ventaja de modular para cuando se tenga que cambiar, solo se cambie esta linea. 
         });
        this.getView().setModel(oViewModel, "view");
        }
```

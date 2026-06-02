---
description: >-
  Queremos realizar el sumatorio de precio de venta, se realiza una
  investigación para saber como realizar el sumatorio en SAPUI5:
icon: function
---

# Funcionalidad Sumatorio

Sumatorio en XML:&#x20;

```xml
<Table items="{path: '/customers'}">
    <columns>
      <Column><Text text="Name" /></Column>
      <Column>
        <Text text="Amount" />
         <!-- Función sumAmount-->
        <footer><Text text="{path: '/customers', formatter: '.sumAmount'}" /></footer>
      </Column>
    </columns>
    <items>
      <ColumnListItem>        
        <cells>
          <Text text="{name}" />
          <Text text="{amount}" />
        </cells>
      </ColumnListItem>        
    </items>
  </Table>
```

Controlador sumatorio:&#x20;



```
       onInit: function () {
            // Obtener nuestro modelo swtich, esto ya está creado:
            var oModel = new JSONModel(oSwitch);
            this.getView().setModel(oModel);
        },
           //Función nueva de sumatorio
           onCalculateTotal: function () {
        try {
            var oTable = this.byId("idTable");
            var aItems = oTable.getItems();
            var nTotal = 0;

            aItems.forEach(function (oItem) {
                var oContext = oItem.getBindingContext();
                var nValue = parseFloat(oContext.getProperty("price"));
                if (!isNaN(nValue)) {
                    nTotal += nValue;
                }
            });

            // Mostrar en el footer
            this.byId("idTotalFooter").setText(nTotal.toFixed(2));

            // También mostrar un mensaje
            MessageToast.show("Total calculado: " + nTotal.toFixed(2));
        } catch (e) {
            console.error("Error calculando total:", e);
            MessageToast.show("Error al calcular el total");
        }
    }
});
```

---
description: 'Documentación para link: https://ui5.sap.com/#/api/sap.m.Link%23overview'
icon: link-simple
---

# Link SAPUI5 Tracking

XML (Objeto Link):

```xml
<Link 
    text="{TrackingNumber}" 
    target="_blank" 
    href="{ parts: ['Carrier', 'TrackingNumber'], formatter: '.formatter.getTrackingUrl' }" 
/>
```

formatter.js: (Lógica para el link del tracking)

```js
//Nueva función para los enlaces de seguimiento
        getTrackingUrl: function (sCarrier, sTrackingNumber) {
            // Si falta algún dato, devolvemos un enlace vacío para que no pete
            if (!sCarrier || !sTrackingNumber) {
                return "#";
            }

            // Pasamos a mayúsculas por si en el JSON un día viene "Correos" y otro "CORREOS"
            switch (sCarrier.toUpperCase()) {
                case "CORREOS":
                    return "https://www.correos.es/es/es/herramientas/localizador/envios/detalle?codigo=" + sTrackingNumber;
                case "NACEX":
                    return "https://www.nacex.es/seguimiento?codigo=" + sTrackingNumber;
                case "UPS":
                    return "https://www.ups.com/track?tracknum=" + sTrackingNumber;
                case "SEUR":
                    return "https://www.seur.com/es/seguimiento?guia=" + sTrackingNumber;
                default:
                    // Si es un transportista que no conocemos, que al menos lo busque en Google
                    return "https://www.google.com/search?q=" + sTrackingNumber;
            }
        }
```


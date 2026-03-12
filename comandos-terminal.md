---
description: 'Comandos que se utilizan en la terminal para diferentes tareas:'
icon: rectangle-code
---

# Comandos Terminal

Comando instalar la CLI UI5: La UI5 CLI es una interfaz de línea de comandos basada en Node.js que se utiliza para automatizar tareas durante el ciclo de vida de una aplicación SAPUI5. En lugar de hacer clic en menús, escribes comandos cortos para que el ordenador trabaje por ti.

```
npm i -D @ui5/cli
```

Comando Libreria SAP sap.m:

```
ui5 add sap.ui.core sap.m themelib_sap_horizon
```

Comando descargar las librerías desde los repositorios de OpenUI5:

```
 ui5 use OpenUI5
```

Comando para ejecutar app:

```
npm run start
```

Comando para que servidor local pueda hablar con el servidor de SAP (Northwind):

```
npm install ui5-middleware-simpleproxy --save-dev
```

Configurar ui5-yaml:&#x20;

```
- name: ui5-middleware-simpleproxy
  afterMiddleware: compression
  configuration:
    baseUri: https://services.odata.org
    httpHeaders:
      AnyHeader: AnyValue
    excludePatterns:
      - /test-resources/**
```

Configurar dataSource:&#x20;

```
"dataSources": {
  "invoiceRemote": {
    "uri": "V2/Northwind/Northwind.svc/",
    "type": "OData",
    "settings": {
      "odataVersion": "2.0"
    }
  }
}
```

Cambiar el modelo invoice.json:&#x20;

```
"invoice": {
  "dataSource": "invoiceRemote",
  "type": "sap.ui.model.odata.v2.ODataModel",
  "settings": {
    "useBatch": false
  }
}
```

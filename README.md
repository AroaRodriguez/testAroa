---
icon: display-code
---

# Crear instancia

Crear proyecto con documento app.js.

Paso 1: El package.json (Fijando versiones estables)

Vamos a volver a traer passport a la vida y vamos a "clavar" la versión de @sap/xssec en la rama 3.x, que es la que soporta JWTStrategy de forma nativa e impecable.

Sustituye todo tu package.json por este:

```json
{
  "name": "user-info",
  "version": "1.0.0",
  "description": "BTP User Information Service",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "@sap/xsenv": "^4.0.0",
    "@sap/xssec": "^3.6.0",
    "express": "^4.19.0",
    "passport": "^0.6.0"
  }
}
```

Paso 2: El app.js

```
const express = require('express');
const passport = require('passport');
const xssec = require('@sap/xssec'); 
const xsenv = require('@sap/xsenv'); 
//Ojo, no utilizar la librería JWTStrategy --> USAR xssec

const app = express();


// 1. Cargamos el entorno
xsenv.loadEnv();


// 2. Buscamos el servicio de seguridad XSUAA
let uaaCredentials;
try {
    const services = xsenv.getServices({ uaa: { tag: 'xsuaa' } });
    uaaCredentials = services.uaa;
    console.log("✅ Servicio XSUAA enlazado correctamente.");
} catch (error) {
    console.error("🚨 Error crítico: No se ha encontrado el servicio XSUAA.", error.message);
    uaaCredentials = {}; 
}


// 3. Inicializamos Passport pasándole las credenciales a JWTStrategy
passport.use(new xssec.JWTStrategy(uaaCredentials));


app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));


// 4. Tu endpoint
app.get('/jwtdecode', function (req, res) {
    const authInfo = req.authInfo; 
    
    // Protección adicional por si falla el token
    if (!authInfo) {
        return res.status(401).json({ error: "No autorizado" });
    }
    
    res.json({
        logonName: authInfo.getLogonName(),
        email: authInfo.getEmail(),
        givenName: authInfo.getGivenName(),
        familyName: authInfo.getFamilyName(),
        roles: authInfo.getScopes() 
    });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`🚀 User-info service started on port ${port}`);
});
```

Paso 3: Despliegue

Comandos:

Instalar.

```
user: cf-user-info-main_security $ npm i
```

Desplegar:

```
user: cf-user-info-main_security $ mbt build 
```

```
user: cf-user-info-main_security $ cf push
```

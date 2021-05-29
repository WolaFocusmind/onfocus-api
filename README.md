# WOLA Backend
## Información importante. Leer antes.

El siguiente repositorio contiene todo el Backend para la app WOLA de Focus Mind.

## información sobre directorios

## Directorio Principal:
- .env con variables de entorno. Debe crearse basandose en el archivo example.env
- package.json
- Procfile para cuando se hace deploy en Heroku
- eslintrc.js que contiene la config de ES-LINT
- header.md Header para documentación
- apidoc.json con configuración para apidoc

## /postman
Contiene las colecciones de postman que pueden ser usadas con la API. Adicionalmente los entornos necesarios con las variables que se usan en la API.

## /doc
Contiene la documentación actual del backend.

## /src:
Es el directorio que contiene toda la logica del backend y la API.

### /db
Contiene la conexión y configuración a la base de datos. Si se configuran,
las variables de entorno, no debería ser necesario tocar este archivo.

La base de datos corre en MongoAtlas y el ODM usado es Mongoose.

### /logs
Aquí se almacenan los logs generados por la api

### /middlewares
Aqui se almacenan los middlewares que controlan las request de las rutas de la api

#### /controllers
Contiene todos los controladores de las distintas operaciones que vienen desde las rutas y
van a los servicios. Está dividido segun la entidad a donde van.

#### /errors
Aqui se encuentran todos los manejos de errores de la API

#### /mask
Antes de enviar el request al cliente, la API ordena los campos y la respuesta con una
máscara. Aqui se guardan las mascaras.

#### /validations
Aquí de encuentra la logica de validaciones que se han cuando se hacen requests a la
api

### /models.
Aquí están todos los modelos de los documentos de MongoDB creados hasta ahora.

### public.
Aquí se encuentran los assets y archivos públicos que se sirven cuando intentas acceder a
la URL de la API

### routes.
Aqui están las rutas de los endpoints de la API

### tools.
Aqui se encuentram funciones varias como logger y las definiciones de constantes 
usadas en el Backend, entre otras cosas.

### views
Aqui se encuentran las vistas que probablemente irian en la API.

### index.js
Archivo principal que gestiona toda la API Backend.

## Información sobre documentación de la API

El siguiente enlace contiene toda la información sobre la documentacion de la API
https://focusminddoc.s3.amazonaws.com/index.html

Este archivo puede ser generado con el comando "npm run docs"

## PM2

Este Backend usa PM2 el cual es un administrador de procesos. Cuando se ejecuta el comando
"npm start" la app inicializa el PM2 y aunque existan errores en la API se reinicia automáticamente.

Para más información sobre PM2: https://pm2.keymetrics.io/

## Para inicializar...

- Clonar repositorio
- "npm install"
- Crea el archivo .env
- Configura las variables de entorno
- Si se trabaja en entorno de producción debe ejecutar "npm start"
- Si se trabaja en entorno de desarrollo debe ejecutar "npm run dev"

## Sobre las variables de entorno
Es recomendable configurar todas las variables de entorno incluye los sanbox para las pasarelas de pago.

Adicionalmente hay que tener en cuenta que el caso de MERCADOPAGO_ACCESS_TOKEN para agregar un TOKEN Key de otro país en el que opere MercadoPago solamente hay que agregar un underscore seguido del código ISO del país, ejemplo:

MERCADOPAGO_ACCESS_TOKEN_MX

## Sobre Node y NVM
Esta API contiene un archivo .nvmrc. Antes de instalar cualquier modulo de node se recomienda ejectuar el comando "nvm install" para usar la version recomendada de nodeJS con la API. Aunque la version de NodeJS recomendada es la 12.0.0, la API trabaja perfectamente con la 14.x

## Sobre MongoDB

Se debe configurar una base de datos MongoDB ya sea en MongoAtlas, MongoLab o cualquier otro servicio.

## Sobre AWS S3 Bucket

Se debe configurar un bucket en AWS S3 para poder subir imagenes y otros que se guardaran en la plataforma.

## Sobre SMTP

Se debe configurar un servidor SMTP para enviar correos con nodemailer.

# Sobre Stripe, Paypal y Mercado Pago

Se debe configurar claves API para Paypal, Stripe y MercadoPago para poder hacer funcionar dichas pasarelas de pago. Se debe configurar las URL de Pending, Approve and Declined, tambien la de Notifications de mercado pago.

# Sobre el deploy en heroku y otras plataformas

Para deployar esta API en heroku se provee un archivo llamado "Procfile" que contiene un comando para iniciarlizar la API una vez es deployada




## :book: Informacion sobre el login 

`Es un sistema de registro e inicio de usuario y ruta protegida donde al hacer inicio te llegara un token en cual tendras que colocar en la ruta privada para validar que si es el usuario que se registro. `
_____________________________________________________________________
- ## Pasos para hacer la instalacion
 
 1|clonar el repositorio de GitHub.
 
 2|hacer `npm i` para que se instalen todas las dependencias.
 
 3|scripts para correr la aplicacion: `npm run dev`.
 
    
  > la base de datos esta en `mongoDB atlas`.

______________________________________________________________________________________________________________________
  `Variables de entorno: .env`  
  
  
PORT=

URL_MONGO=

TOKEN=


## Endpoint para el registro e inicio de sesion

- `post` http://localhost:8000/api/auth


- `post` http://localhost:8000/api/login


## Endpoint para verificar que si es el usuario registrado
> Ruta protegida con token
- `get` http://localhost:8000/api/perfil

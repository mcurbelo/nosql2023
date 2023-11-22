# Proyecto Taller de Bases de Datos NoSQL 2023

# Instrucciones de Instalación

```
  git clone https://github.com/mcurbelo/nosql2023
  cd nosql2023
  docker compose up
```
Luego de esto, el servidor estará disponible en la dirección local en el puerto 3000 (`http://127.0.0.1:3000`)

# Lenguaje
El lenguaje utilizado para desarrollar la aplicación es TypeScript sobre el runtime NodeJS. Se utilizó la base de datos MongoDB.

## Modelo logico 
El modelo logico elegido para relacionar las direcciones y los usuarios es la relación por referencia, en la cual cada dirección contiene un atributo referenciando el usuario al que pertenece. Esto es debido a que se deben realizar operaciones de filtrado directamente sobre las direcciones, y mantener todas las direcciones en una única colección permite una ventaja de performance frente a una relación embebida.

<img width="600" alt="Screenshot 2023-11-22 at 20 06 32" src="https://github.com/mcurbelo/nosql2023/assets/60516595/03f1c083-e089-49f9-b1da-b282a942c8b0">

### Endpoints y descripción de sus parametros

* **PUT /agregar-usuario**: Endpoint que agrega un usuario a la base de datos.
```
  Request Body
  {
    "ci: "12345678", // String, Obligatorio
    "nombre":"Mauro", // String, Opcional
    "apellido":"Curbelo", // String, Opcional,
    "edad" : 29 // Integer, opcional
  }
```
* **PUT /agregar-domicilio**: Endpoint para agregar un domicilio a la base de datos

```
  Request Body
  {
    "ciUsuario":"12345678", // String, Obligatorio
    "address": { // Objecto, Obligatorio
      "departamento": "Montevideo", // String, Opcional
      "localidad": "Montevideo", // String, Opcional
      "calle": "18 de Julio", // String, Opcional
      "numero": 2204, // Integer, Opcional
      "padron": "A6745", // String, Opcional
      "ruta": "63B", // String, Opcional
      "letra": "B", // String, Opcional
      "barrio": "Centro", // String, Opcional
      "apartamento": "311C", // String, Opcional
      "kilometro": 86, // Integer, Opcional
    }
  }
```
* **POST /direcciones-ordenadas**: Endpoint para obtener direcciones que cumplan con _cualquiera_ de los criterios enviados
  ```
    {
      "barrio" :"Centro", // String, Opcional
      "localidad:"Montevideo", // String, Opcional
      "departamento": "San José" // String, opcional
    }
  ```

* **GET /direcciones-usuario**: Endpoint para obtener todas las direcciones asociadas con un usuario
  ```
    GET /direcciones-usuario?ciUsuario=12345678&page=2&results=4
    ciUsuario: Obligatorio. Cédula del usuario del cual solicitamos las direcciones. Obligatorio
    page: Opcional. Numero de página cuyos resultados queremos. Por defecto se tomará 1
    results: Opcional. Numero de resultados (Direcciones) por página. Por defecto se tomará 20
  ```

# Colección de Postman
https://www.postman.com/flight-meteorologist-49339592/workspace/nosql-2023

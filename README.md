# Proyecto Taller de Bases de Datos NoSQL 2023

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

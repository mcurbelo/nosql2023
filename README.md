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

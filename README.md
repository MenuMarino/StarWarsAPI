# Star Wars API

## Requisitos

- Node.js v21.0.5
- Serverless instalado
- Credenciales de AWS configuradas para despliegue

## Instalación y Despliegue

Sigue los siguientes pasos para ejecutar el proyecto:

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Despliega el proyecto utilizando Serverless:
   ```bash
   serverless deploy
   ```

## Documentación

La documentación del API se encuentra disponible en [Swagger](https://petstore.swagger.io/?url=https://menumarino.github.io/StarWarsAPI/openapi.yml#/default/createResource)

## Rutas de la API

### 1. `/create-resource` (POST)

Esta ruta permite crear un nuevo recurso en DynamoDB.

- **Body**:

  ```json
  {
    "resource": "people",
    "id": 1
  }
  ```

- **Respuesta exitosa** (`201 Created`):
  ```json
  {
    "message": "Resource saved successfully"
  }
  ```

### 2. `/get-resource` (GET)

Esta ruta obtiene uno o varios recursos almacenados en la base de datos.

- **Query Params**:

  - `resource`: Tipo de recurso a buscar (e.g., `people`, `films`).
  - `id` (opcional): El ID del recurso que se desea obtener. Si no se proporciona, se devuelven todos los recursos en la base de datos.

- **Respuesta sin ID** (`200 OK`):

  ```json
  {
    "message": "Recursos obtenidos exitosamente",
    "data": [
      {
        "id": 1,
        "resourceType": "people",
        "data": {
          "nombre": "Luke Skywalker",
          "año_de_nacimiento": "19BBY",
          "género": "male",
          "naves_estelares": [
            "https://swapi.py4e.com/api/starships/12/",
            "https://swapi.py4e.com/api/starships/22/"
          ]
          // etc...
        }
      },
      {
        "id": 2,
        "resourceType": "people",
        "data": {
          "nombre": "C-3PO",
          "año_de_nacimiento": "112BBY",
          "género": "n/a",
          "naves_estelares": []
          // etc...
        }
      }
    ]
  }
  ```

- **Respuesta con ID** (`200 OK`):
  ```json
  {
    "message": "Recurso obtenido exitosamente",
    "data": {
      "id": 1,
      "resourceType": "people",
      "data": {
        "nombre": "Luke Skywalker",
        "año_de_nacimiento": "19BBY",
        "género": "male",
        "naves_estelares": [
          "https://swapi.py4e.com/api/starships/12/",
          "https://swapi.py4e.com/api/starships/22/"
        ]
        // etc...
      }
    }
  }
  ```

## Testing

Para ejecutar las pruebas unitarias se ejecuta el siguiente comando

```bash
npx jest
```

Las pruebas se encuentras definidas en `./__tests__`

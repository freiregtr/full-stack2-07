# Documento 4: Testing con Postman

En este documento aprenderás a probar tu API REST usando **Postman**, una herramienta profesional para testing de APIs. Probaremos todos los endpoints CRUD y validaremos las respuestas.

---

## Tabla de Contenidos

1. [¿Qué es Postman?](#qué-es-postman)
2. [Instalación de Postman](#instalación-de-postman)
3. [Crear una Colección](#crear-una-colección)
4. [Probar Endpoints CRUD](#probar-endpoints-crud)
5. [Variables de Entorno](#variables-de-entorno)
6. [Exportar Colección](#exportar-colección)
7. [Alternativa: Curl](#alternativa-curl)
8. [Código Final](#código-final)

---

## ¿Qué es Postman?

**Postman** es una plataforma de colaboración para el desarrollo de APIs. Permite enviar peticiones HTTP, ver respuestas, automatizar pruebas, y documentar APIs.

### Ventajas de Postman

- **Interfaz gráfica:** No necesitas escribir código para probar APIs
- **Colecciones:** Organiza tus peticiones en carpetas
- **Variables:** Reutiliza valores como URLs y tokens
- **Tests automáticos:** Escribe scripts para validar respuestas
- **Documentación:** Genera documentación automática de tu API
- **Compartir:** Exporta colecciones para compartir con tu equipo

### Alternativas a Postman

| Herramienta | Tipo | Ventaja |
|-------------|------|---------|
| **Postman** | GUI | Más popular, fácil de usar |
| **Insomnia** | GUI | Más ligero, open source |
| **curl** | CLI | Línea de comandos, instalado por defecto |
| **HTTPie** | CLI | Más amigable que curl |
| **REST Client (VS Code)** | Extensión | Integrado en VS Code |

Para este tutorial usaremos **Postman** por su popularidad y facilidad de uso.

---

## Instalación de Postman

### Opción 1: Aplicación de Escritorio (Recomendada)

#### Windows / Mac / Linux

1. **Descargar Postman:**
   - Ve a: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
   - Selecciona tu sistema operativo
   - Descarga el instalador

2. **Instalar:**
   - **Windows:** Ejecuta el archivo `.exe` descargado
   - **Mac:** Arrastra Postman.app a la carpeta Aplicaciones
   - **Linux:** Extrae el archivo `.tar.gz` y ejecuta `Postman`

3. **Crear cuenta (opcional):**
   - Puedes usar Postman sin cuenta (modo offline)
   - O crear una cuenta gratis para sincronizar colecciones

### Opción 2: Postman Web (Sin instalación)

Si no quieres instalar la aplicación:

1. Ve a: [https://web.postman.co/](https://web.postman.co/)
2. Inicia sesión o crea una cuenta
3. Usa Postman directamente en el navegador

**Nota:** La versión web tiene algunas limitaciones (no puede acceder a `localhost` sin extensión).

---

## Crear una Colección

Una **colección** es un grupo de peticiones organizadas. Crearemos una colección llamada "Productos API".

### Paso 1: Crear la Colección

1. Abre Postman
2. En el panel izquierdo, clic en **"Collections"**
3. Clic en **"+"** o **"Create a collection"**
4. Nombra la colección: `Productos API`
5. (Opcional) Agrega una descripción: `API REST para gestionar productos con Spring Boot`

### Paso 2: Crear la Primera Petición

1. Hover sobre la colección "Productos API"
2. Clic en **"..."** (tres puntos)
3. Clic en **"Add request"**
4. Nombra la petición: `Listar todos los productos`

---

## Probar Endpoints CRUD

Ahora probaremos TODOS los endpoints de nuestra API. Asegúrate de que la aplicación Spring Boot esté corriendo:

```bash
./mvnw spring-boot:run    # Linux/Mac/WSL2
mvnw.cmd spring-boot:run  # Windows
```

**Base URL:** `http://localhost:8080`

**NOTA sobre fechas:** En los ejemplos JSON de este documento, las fechas aparecen simplificadas como `"2025-11-06T10:30:00"` para facilitar la lectura. En la realidad, Spring Boot serializa las fechas con microsegundos: `"2025-11-06T10:30:00.123456"`. Esto es completamente normal.

---

### 1. Listar Todos los Productos

**GET** `/api/productos`

#### Configuración en Postman:

1. **Método:** GET
2. **URL:** `http://localhost:8080/api/productos`
3. Clic en **"Send"**

#### Respuesta Esperada (HTTP 200):

```json
[]
```

(Vacío si no hay productos en la BD)

Si insertaste datos de prueba en el documento anterior, verás:

```json
[
  {
    "id": 1,
    "nombre": "Laptop Dell XPS 15",
    "descripcion": "Laptop de alto rendimiento con procesador Intel i9",
    "precio": 1500.00,
    "stock": 10,
    "fechaCreacion": "2025-11-06T10:30:00",
    "fechaActualizacion": "2025-11-06T10:30:00"
  },
  {
    "id": 2,
    "nombre": "Mouse Logitech MX Master 3",
    "descripcion": "Mouse ergonómico inalámbrico",
    "precio": 99.99,
    "stock": 50,
    "fechaCreacion": "2025-11-06T10:30:00",
    "fechaActualizacion": "2025-11-06T10:30:00"
  }
]
```

---

### 2. Crear un Producto

**POST** `/api/productos`

#### Configuración en Postman:

1. **Método:** POST
2. **URL:** `http://localhost:8080/api/productos`
3. **Headers:**
   - Clic en la pestaña **"Headers"**
   - Agrega: `Content-Type: application/json`
4. **Body:**
   - Clic en la pestaña **"Body"**
   - Selecciona **"raw"**
   - Selecciona **"JSON"** en el dropdown
   - Pega este JSON:

```json
{
  "nombre": "iPhone 15 Pro Max",
  "descripcion": "Smartphone Apple con chip A17 Pro y cámara de 48MP",
  "precio": 1199.99,
  "stock": 25
}
```

5. Clic en **"Send"**

#### Respuesta Esperada (HTTP 201 Created):

```json
{
  "id": 1,
  "nombre": "iPhone 15 Pro Max",
  "descripcion": "Smartphone Apple con chip A17 Pro y cámara de 48MP",
  "precio": 1199.99,
  "stock": 25,
  "fechaCreacion": "2025-11-06T10:35:00",
  "fechaActualizacion": "2025-11-06T10:35:00"
}
```

**Nota:** El `id`, `fechaCreacion` y `fechaActualizacion` son generados automáticamente.

---

### 3. Obtener un Producto por ID

**GET** `/api/productos/{id}`

#### Configuración en Postman:

1. **Método:** GET
2. **URL:** `http://localhost:8080/api/productos/1`
   (Reemplaza `1` con el ID del producto que creaste)
3. Clic en **"Send"**

#### Respuesta Esperada (HTTP 200):

```json
{
  "id": 1,
  "nombre": "iPhone 15 Pro Max",
  "descripcion": "Smartphone Apple con chip A17 Pro y cámara de 48MP",
  "precio": 1199.99,
  "stock": 25,
  "fechaCreacion": "2025-11-06T10:35:00",
  "fechaActualizacion": "2025-11-06T10:35:00"
}
```

#### Error: Producto No Encontrado (HTTP 404):

Si intentas obtener un producto que no existe:

**URL:** `http://localhost:8080/api/productos/999`

**Respuesta:**

```json
{
  "timestamp": "2025-11-06T10:40:00",
  "status": 404,
  "error": "Not Found",
  "mensaje": "Producto no encontrado con id: 999"
}
```

---

### 4. Actualizar un Producto

**PUT** `/api/productos/{id}`

#### Configuración en Postman:

1. **Método:** PUT
2. **URL:** `http://localhost:8080/api/productos/1`
3. **Headers:**
   - `Content-Type: application/json`
4. **Body (JSON):**

```json
{
  "nombre": "iPhone 15 Pro Max 256GB",
  "descripcion": "Smartphone Apple con chip A17 Pro, cámara de 48MP y 256GB de almacenamiento",
  "precio": 1299.99,
  "stock": 20
}
```

5. Clic en **"Send"**

#### Respuesta Esperada (HTTP 200):

```json
{
  "id": 1,
  "nombre": "iPhone 15 Pro Max 256GB",
  "descripcion": "Smartphone Apple con chip A17 Pro, cámara de 48MP y 256GB de almacenamiento",
  "precio": 1299.99,
  "stock": 20,
  "fechaCreacion": "2025-11-06T10:35:00",
  "fechaActualizacion": "2025-11-06T10:45:00"
}
```

**Nota:** La `fechaActualizacion` cambió automáticamente.

---

### 5. Eliminar un Producto

**DELETE** `/api/productos/{id}`

#### Configuración en Postman:

1. **Método:** DELETE
2. **URL:** `http://localhost:8080/api/productos/1`
3. Clic en **"Send"**

#### Respuesta Esperada (HTTP 200):

```json
{
  "mensaje": "Producto eliminado exitosamente",
  "id": "1"
}
```

Si intentas obtener el producto eliminado:

**GET** `http://localhost:8080/api/productos/1`

**Respuesta (HTTP 404):**

```json
{
  "timestamp": "2025-11-06T10:50:00",
  "status": 404,
  "error": "Not Found",
  "mensaje": "Producto no encontrado con id: 1"
}
```

---

### 6. Buscar Productos por Nombre

**GET** `/api/productos/search?nombre={texto}`

#### Configuración en Postman:

1. **Método:** GET
2. **URL:** `http://localhost:8080/api/productos/search?nombre=laptop`
3. Clic en **"Send"**

#### Respuesta Esperada (HTTP 200):

```json
[
  {
    "id": 2,
    "nombre": "Laptop Dell XPS 15",
    "descripcion": "Laptop de alto rendimiento",
    "precio": 1500.00,
    "stock": 10,
    "fechaCreacion": "2025-11-06T10:30:00",
    "fechaActualizacion": "2025-11-06T10:30:00"
  }
]
```

**Nota:** La búsqueda ignora mayúsculas/minúsculas (`laptop`, `Laptop`, `LAPTOP` dan el mismo resultado).

---

### 7. Pruebas de Validación

Vamos a probar que las validaciones funcionan correctamente.

#### Test 1: Nombre Muy Corto

**POST** `/api/productos`

**Body:**

```json
{
  "nombre": "AB",
  "precio": 100.00,
  "stock": 10
}
```

**Respuesta Esperada (HTTP 400):**

```json
{
  "timestamp": "2025-11-06T11:00:00",
  "status": 400,
  "error": "Validation Failed",
  "errores": {
    "nombre": "El nombre debe tener entre 3 y 100 caracteres"
  }
}
```

#### Test 2: Precio Negativo

**POST** `/api/productos`

**Body:**

```json
{
  "nombre": "Producto de prueba",
  "precio": -50.00,
  "stock": 10
}
```

**Respuesta Esperada (HTTP 400):**

```json
{
  "timestamp": "2025-11-06T11:05:00",
  "status": 400,
  "error": "Validation Failed",
  "errores": {
    "precio": "El precio debe ser mayor a 0"
  }
}
```

#### Test 3: Campos Vacíos

**POST** `/api/productos`

**Body:**

```json
{
  "nombre": "",
  "precio": null,
  "stock": -5
}
```

**Respuesta Esperada (HTTP 400):**

```json
{
  "timestamp": "2025-11-06T11:10:00",
  "status": 400,
  "error": "Validation Failed",
  "errores": {
    "nombre": "El nombre es obligatorio",
    "precio": "El precio es obligatorio",
    "stock": "El stock no puede ser negativo"
  }
}
```

---

## Variables de Entorno

Las **variables de entorno** en Postman permiten reutilizar valores como la base URL.

### Paso 1: Crear un Environment

1. En Postman, clic en el icono de **"Environments"** (arriba a la derecha)
2. Clic en **"+"** para crear un nuevo environment
3. Nombra el environment: `Local`

### Paso 2: Agregar Variables

Agrega estas variables:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `base_url` | `http://localhost:8080` | `http://localhost:8080` |
| `api_path` | `/api/productos` | `/api/productos` |

Clic en **"Save"**

### Paso 3: Usar Variables en las Peticiones

Ahora, en lugar de escribir `http://localhost:8080/api/productos`, usa:

```
{{base_url}}{{api_path}}
```

**Ejemplo:**

- **Antes:** `http://localhost:8080/api/productos/1`
- **Ahora:** `{{base_url}}{{api_path}}/1`

**Ventaja:** Si cambias el puerto o despliegas a producción, solo cambias la variable `base_url`.

### Paso 4: Seleccionar el Environment

En la esquina superior derecha de Postman, selecciona **"Local"** en el dropdown de environments.

---

## Exportar Colección

Para compartir tu colección con compañeros o subirla a GitHub:

### Paso 1: Exportar la Colección

1. Hover sobre la colección **"Productos API"**
2. Clic en **"..."** (tres puntos)
3. Clic en **"Export"**
4. Selecciona **"Collection v2.1"** (recomendado)
5. Clic en **"Export"**
6. Guarda el archivo JSON (ej: `Productos-API.postman_collection.json`)

### Paso 2: Exportar el Environment (Opcional)

1. Clic en **"Environments"**
2. Hover sobre **"Local"**
3. Clic en **"..."** → **"Export"**
4. Guarda el archivo JSON (ej: `Local.postman_environment.json`)

### Paso 3: Importar la Colección

Para importar una colección:

1. Clic en **"Import"** (arriba a la izquierda)
2. Arrastra el archivo JSON o clic en **"Choose Files"**
3. La colección aparecerá en el panel izquierdo

---

## Alternativa: Curl

Si prefieres la línea de comandos, puedes usar **curl**. Aquí están todos los comandos:

### 1. Listar Todos los Productos

```bash
curl http://localhost:8080/api/productos
```

### 2. Crear un Producto

```bash
curl -X POST http://localhost:8080/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "iPhone 15 Pro Max",
    "descripcion": "Smartphone Apple con chip A17 Pro",
    "precio": 1199.99,
    "stock": 25
  }'
```

**Windows CMD (sin saltos de línea):**

```cmd
curl -X POST http://localhost:8080/api/productos -H "Content-Type: application/json" -d "{\"nombre\": \"iPhone 15 Pro Max\", \"descripcion\": \"Smartphone Apple\", \"precio\": 1199.99, \"stock\": 25}"
```

### 3. Obtener un Producto por ID

```bash
curl http://localhost:8080/api/productos/1
```

### 4. Actualizar un Producto

```bash
curl -X PUT http://localhost:8080/api/productos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "iPhone 15 Pro Max 256GB",
    "descripcion": "Smartphone Apple actualizado",
    "precio": 1299.99,
    "stock": 20
  }'
```

### 5. Eliminar un Producto

```bash
curl -X DELETE http://localhost:8080/api/productos/1
```

### 6. Buscar por Nombre

```bash
curl "http://localhost:8080/api/productos/search?nombre=laptop"
```

**Nota:** Las comillas alrededor de la URL son necesarias cuando hay parámetros de query.

---

## Código Final

### Colección Postman Completa (JSON)

Guarda este archivo como `Productos-API.postman_collection.json`:

```json
{
  "info": {
    "name": "Productos API",
    "description": "API REST para gestionar productos con Spring Boot 3.5 + PostgreSQL",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "1. Listar Todos los Productos",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}{{api_path}}",
          "host": ["{{base_url}}"],
          "path": ["api", "productos"]
        }
      }
    },
    {
      "name": "2. Crear un Producto",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"nombre\": \"iPhone 15 Pro Max\",\n  \"descripcion\": \"Smartphone Apple con chip A17 Pro y cámara de 48MP\",\n  \"precio\": 1199.99,\n  \"stock\": 25\n}"
        },
        "url": {
          "raw": "{{base_url}}{{api_path}}",
          "host": ["{{base_url}}"],
          "path": ["api", "productos"]
        }
      }
    },
    {
      "name": "3. Obtener Producto por ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}{{api_path}}/1",
          "host": ["{{base_url}}"],
          "path": ["api", "productos", "1"]
        }
      }
    },
    {
      "name": "4. Actualizar un Producto",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"nombre\": \"iPhone 15 Pro Max 256GB\",\n  \"descripcion\": \"Smartphone Apple actualizado con 256GB\",\n  \"precio\": 1299.99,\n  \"stock\": 20\n}"
        },
        "url": {
          "raw": "{{base_url}}{{api_path}}/1",
          "host": ["{{base_url}}"],
          "path": ["api", "productos", "1"]
        }
      }
    },
    {
      "name": "5. Eliminar un Producto",
      "request": {
        "method": "DELETE",
        "header": [],
        "url": {
          "raw": "{{base_url}}{{api_path}}/1",
          "host": ["{{base_url}}"],
          "path": ["api", "productos", "1"]
        }
      }
    },
    {
      "name": "6. Buscar por Nombre",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}{{api_path}}/search?nombre=laptop",
          "host": ["{{base_url}}"],
          "path": ["api", "productos", "search"],
          "query": [
            {
              "key": "nombre",
              "value": "laptop"
            }
          ]
        }
      }
    },
    {
      "name": "7. Test Validación - Nombre Corto",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"nombre\": \"AB\",\n  \"precio\": 100.00,\n  \"stock\": 10\n}"
        },
        "url": {
          "raw": "{{base_url}}{{api_path}}",
          "host": ["{{base_url}}"],
          "path": ["api", "productos"]
        }
      }
    },
    {
      "name": "8. Test Validación - Precio Negativo",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"nombre\": \"Producto de prueba\",\n  \"precio\": -50.00,\n  \"stock\": 10\n}"
        },
        "url": {
          "raw": "{{base_url}}{{api_path}}",
          "host": ["{{base_url}}"],
          "path": ["api", "productos"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8080"
    },
    {
      "key": "api_path",
      "value": "/api/productos"
    }
  ]
}
```

### Environment Postman (JSON)

Guarda este archivo como `Local.postman_environment.json`:

```json
{
  "name": "Local",
  "values": [
    {
      "key": "base_url",
      "value": "http://localhost:8080",
      "enabled": true
    },
    {
      "key": "api_path",
      "value": "/api/productos",
      "enabled": true
    }
  ]
}
```

### Script Bash con Todos los Comandos Curl

Guarda este archivo como `test-api.sh`:

```bash
#!/bin/bash

# ==============================================================
# SCRIPT PARA PROBAR LA API REST CON CURL
# ==============================================================
# Uso: chmod +x test-api.sh && ./test-api.sh

BASE_URL="http://localhost:8080/api/productos"

echo "=========================================="
echo "PROBANDO API REST - PRODUCTOS"
echo "=========================================="
echo ""

# 1. Listar todos los productos
echo "1. Listar todos los productos (GET /api/productos)"
curl -s $BASE_URL | jq .
echo ""

# 2. Crear un producto
echo "2. Crear un producto (POST /api/productos)"
curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Laptop HP Pavilion",
    "descripcion": "Laptop gaming con RTX 3060",
    "precio": 1299.99,
    "stock": 15
  }' | jq .
echo ""

# 3. Obtener producto por ID
echo "3. Obtener producto por ID (GET /api/productos/1)"
curl -s $BASE_URL/1 | jq .
echo ""

# 4. Actualizar producto
echo "4. Actualizar producto (PUT /api/productos/1)"
curl -s -X PUT $BASE_URL/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Laptop HP Pavilion Gaming",
    "descripcion": "Laptop gaming actualizada con RTX 3060 Ti",
    "precio": 1499.99,
    "stock": 12
  }' | jq .
echo ""

# 5. Buscar por nombre
echo "5. Buscar por nombre (GET /api/productos/search?nombre=laptop)"
curl -s "$BASE_URL/search?nombre=laptop" | jq .
echo ""

# 6. Eliminar producto
echo "6. Eliminar producto (DELETE /api/productos/1)"
curl -s -X DELETE $BASE_URL/1 | jq .
echo ""

# 7. Verificar que fue eliminado
echo "7. Verificar eliminación (GET /api/productos/1) - Esperamos 404"
curl -s $BASE_URL/1 | jq .
echo ""

echo "=========================================="
echo "PRUEBAS COMPLETADAS"
echo "=========================================="
```

Dar permisos y ejecutar:

```bash
chmod +x test-api.sh
./test-api.sh
```

**Nota:** Requiere `jq` para formatear JSON. Instalar con:

```bash
# Ubuntu/WSL2
sudo apt install jq

# Mac
brew install jq
```

### Script PowerShell para Windows

Guarda este archivo como `test-api.ps1`:

```powershell
# ==============================================================
# SCRIPT PARA PROBAR LA API REST CON POWERSHELL
# ==============================================================
# Uso: .\test-api.ps1

$BASE_URL = "http://localhost:8080/api/productos"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "PROBANDO API REST - PRODUCTOS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Listar todos los productos
Write-Host "1. Listar todos los productos" -ForegroundColor Green
Invoke-RestMethod -Uri $BASE_URL -Method Get | ConvertTo-Json
Write-Host ""

# 2. Crear un producto
Write-Host "2. Crear un producto" -ForegroundColor Green
$body = @{
    nombre = "Laptop HP Pavilion"
    descripcion = "Laptop gaming con RTX 3060"
    precio = 1299.99
    stock = 15
} | ConvertTo-Json

Invoke-RestMethod -Uri $BASE_URL -Method Post -Body $body -ContentType "application/json" | ConvertTo-Json
Write-Host ""

# 3. Obtener producto por ID
Write-Host "3. Obtener producto por ID" -ForegroundColor Green
Invoke-RestMethod -Uri "$BASE_URL/1" -Method Get | ConvertTo-Json
Write-Host ""

# 4. Actualizar producto
Write-Host "4. Actualizar producto" -ForegroundColor Green
$bodyUpdate = @{
    nombre = "Laptop HP Pavilion Gaming"
    descripcion = "Laptop gaming actualizada"
    precio = 1499.99
    stock = 12
} | ConvertTo-Json

Invoke-RestMethod -Uri "$BASE_URL/1" -Method Put -Body $bodyUpdate -ContentType "application/json" | ConvertTo-Json
Write-Host ""

# 5. Eliminar producto
Write-Host "5. Eliminar producto" -ForegroundColor Green
Invoke-RestMethod -Uri "$BASE_URL/1" -Method Delete | ConvertTo-Json
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "PRUEBAS COMPLETADAS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
```

Ejecutar:

```powershell
.\test-api.ps1
```

---

## Resumen

En este documento has:

- Instalado Postman
- Creado una colección de pruebas "Productos API"
- Probado TODOS los endpoints CRUD:
  - GET listar productos
  - POST crear producto
  - GET obtener por ID
  - PUT actualizar producto
  - DELETE eliminar producto
  - GET buscar por nombre
- Validado respuestas HTTP (200, 201, 404, 400)
- Probado validaciones de datos
- Configurado variables de entorno
- Exportado la colección para compartir
- Aprendido comandos curl equivalentes

---

## Checklist Final del Tutorial Completo

- [ ] Instalé Java 21 JDK
- [ ] Instalé PostgreSQL
- [ ] Creé el proyecto Spring Boot con Spring Initializr
- [ ] Creé la entidad `Producto`
- [ ] Creé el repository `ProductoRepository`
- [ ] Creé el service `ProductoService` y `ProductoServiceImpl`
- [ ] Creé el controller `ProductoController`
- [ ] Creé las clases de manejo de excepciones
- [ ] Configuré `application.properties` con PostgreSQL
- [ ] Verifiqué que Hibernate crea la tabla automáticamente
- [ ] Instalé Postman
- [ ] Probé todos los endpoints CRUD exitosamente
- [ ] Validé las respuestas HTTP correctas
- [ ] Exporté la colección de Postman

---

## Próximos Pasos

Una vez domines este tutorial, puedes avanzar a:

### 1. Seguridad con Spring Security

- Autenticación con JWT (JSON Web Tokens)
- Proteger endpoints con roles (ADMIN, USER)
- Login y registro de usuarios

### 2. Documentación con Swagger/OpenAPI

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
```

Acceder a: `http://localhost:8080/swagger-ui.html`

### 3. Paginación y Ordenamiento

```java
@GetMapping
public Page<Producto> getAllProductos(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "id") String sortBy) {

    Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
    return productoRepository.findAll(pageable);
}
```

### 4. Relaciones entre Entidades

- **OneToMany:** Un producto pertenece a una categoría
- **ManyToMany:** Un producto puede tener múltiples etiquetas

### 5. Deploy en la Nube

- **Render:** Deploy gratuito con PostgreSQL
- **Railway:** Fácil deployment con CLI
- **AWS Elastic Beanstalk:** Producción empresarial

### 6. Frontend con React

Consumir esta API desde un frontend React con Axios:

```javascript
const getProductos = async () => {
  const response = await axios.get('http://localhost:8080/api/productos');
  return response.data;
};
```



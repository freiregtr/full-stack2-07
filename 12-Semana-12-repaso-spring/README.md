# Semana 12: API REST con Spring Boot 3.5 + PostgreSQL + CRUD

Este módulo te enseña a crear una **API REST completa** usando **Spring Boot 3.5**, **Spring Data JPA**, **Hibernate 6.6**, y **PostgreSQL** como base de datos. Aprenderás a construir operaciones CRUD (Create, Read, Update, Delete) profesionales y probarlas con Postman.

## Proyecto: Sistema de Gestión de Productos

Crearemos una API REST completa para gestionar productos con todas las operaciones CRUD, validaciones, manejo de errores y persistencia en PostgreSQL.

---

## Estructura del Módulo

```
12-Semana-12-repaso-spring/
├── README.md                           ← Estás aquí
├── 01-introduccion-spring-boot.md      ← Setup y conceptos básicos
├── 02-creacion-api-rest.md             ← Entidades, Repos, Services, Controllers
├── 03-configuracion-postgresql.md      ← Configuración de PostgreSQL
├── 04-testing-postman.md               ← Pruebas con Postman
└── productos-api/                      ← Proyecto Spring Boot (a crear)
    ├── src/
    │   └── main/
    │       ├── java/com/universidad/productosapi/
    │       │   ├── ProductosApiApplication.java
    │       │   ├── model/
    │       │   │   └── Producto.java
    │       │   ├── repository/
    │       │   │   └── ProductoRepository.java
    │       │   ├── service/
    │       │   │   ├── ProductoService.java
    │       │   │   └── ProductoServiceImpl.java
    │       │   ├── controller/
    │       │   │   └── ProductoController.java
    │       │   └── exception/
    │       │       ├── ResourceNotFoundException.java
    │       │       └── GlobalExceptionHandler.java
    │       └── resources/
    │           └── application.properties
    ├── pom.xml
    └── mvnw (Maven Wrapper)
```

---

## Orden de Estudio

### Documento 1: Introducción a Spring Boot

**Archivo:** `01-introduccion-spring-boot.md`

**Aprenderás:**
- ¿Qué es Spring Boot 3.5?
- Arquitectura de una API REST
- Instalación de Java 21 (LTS)
- Instalación de Maven
- Crear proyecto con Spring Initializr
- Estructura de carpetas de Spring Boot
- Ejecutar tu primera aplicación
- Dependencias Maven (pom.xml)

**Tiempo estimado:** 45 minutos

---

### Documento 2: Creación de la API REST

**Archivo:** `02-creacion-api-rest.md`

**Aprenderás:**
- Patrón de arquitectura: Model-Repository-Service-Controller
- Crear entidad Producto con JPA
- Anotaciones Jakarta Persistence (@Entity, @Table, @Id)
- Crear Repository con Spring Data JPA
- Crear Service e implementación
- Crear Controller REST con endpoints CRUD
- Validaciones con Bean Validation
- Manejo de excepciones global

**Tiempo estimado:** 90 minutos

---

### Documento 3: Configuración de PostgreSQL

**Archivo:** `03-configuracion-postgresql.md`

**Aprenderás:**
- Instalación de PostgreSQL 16/17 (Windows + WSL2)
- Crear base de datos desde psql
- Configurar application.properties
- Propiedades de Hibernate (ddl-auto, show-sql)
- Conectar Spring Boot con PostgreSQL
- Verificar creación automática de tablas
- Insertar datos de prueba con SQL

**Tiempo estimado:** 45 minutos

---

### Documento 4: Testing con Postman

**Archivo:** `04-testing-postman.md`

**Aprenderás:**
- Instalación de Postman
- Crear colección de pruebas
- Probar todos los endpoints CRUD:
  - POST crear producto
  - GET listar todos los productos
  - GET obtener producto por ID
  - PUT actualizar producto
  - DELETE eliminar producto
  - GET buscar productos por nombre
- Validar respuestas HTTP (200, 201, 404, 400)
- Variables de entorno en Postman
- Exportar colección para compartir
- Ejemplos con curl

**Tiempo estimado:** 60 minutos

---

## Inicio Rápido

### 1. Requisitos Previos

Antes de comenzar, asegúrate de tener:

```bash
# Java 21 (verificar)
java -version
# Debe mostrar: java version "21.x.x"

# Maven (opcional, el proyecto incluye Maven Wrapper)
mvn -version

# PostgreSQL (verificar si está instalado)
psql --version
```

### 2. Crear el Proyecto

Sigue el **Documento 1** para crear el proyecto desde [Spring Initializr](https://start.spring.io/)

### 3. Configurar PostgreSQL

Sigue el **Documento 3** para instalar y configurar PostgreSQL

### 4. Desarrollar la API

Sigue el **Documento 2** para crear todas las clases Java

### 5. Probar con Postman

Sigue el **Documento 4** para probar todos los endpoints

---

## Objetivos de Aprendizaje

Al completar este módulo, serás capaz de:

- Explicar qué es Spring Boot y su arquitectura
- Crear proyectos Spring Boot desde cero
- Diseñar APIs REST siguiendo mejores prácticas
- Usar Spring Data JPA para persistencia
- Conectar Spring Boot con PostgreSQL
- Implementar operaciones CRUD completas
- Aplicar validaciones con Bean Validation
- Manejar excepciones de forma global
- Probar APIs REST con Postman
- Interpretar códigos de respuesta HTTP
- Usar anotaciones de Spring correctamente

---

## Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Spring Boot | 3.5.7 | Framework principal |
| Java | 21 (LTS) | Lenguaje de programación |
| Spring Data JPA | 3.5.0 | Persistencia de datos |
| Hibernate | 6.6.33 | ORM (Object-Relational Mapping) |
| PostgreSQL | 16.x / 17.x | Base de datos relacional |
| Maven | 3.6.3+ | Gestor de dependencias |
| Postman | Última | Pruebas de API |

---

## Comandos Útiles

```bash
# Crear proyecto desde Spring Initializr (ver Documento 1)
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,postgresql,validation \
  -d bootVersion=3.5.7 \
  -d javaVersion=21 \
  -o productos-api.zip

# Dar permisos al Maven Wrapper (Linux/Mac/WSL)
chmod +x mvnw

# Compilar el proyecto
./mvnw compile        # Linux/Mac/WSL
mvnw.cmd compile      # Windows CMD

# Ejecutar la aplicación
./mvnw spring-boot:run        # Linux/Mac/WSL
mvnw.cmd spring-boot:run      # Windows CMD

# Ejecutar tests
./mvnw test

# Crear JAR ejecutable
./mvnw package

# Limpiar y compilar
./mvnw clean install

# Ver dependencias
./mvnw dependency:tree
```

---

## Endpoints de la API

Una vez completado el tutorial, tu API tendrá estos endpoints:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Listar todos los productos |
| GET | `/api/productos/{id}` | Obtener producto por ID |
| POST | `/api/productos` | Crear nuevo producto |
| PUT | `/api/productos/{id}` | Actualizar producto |
| DELETE | `/api/productos/{id}` | Eliminar producto |
| GET | `/api/productos/search?nombre=xxx` | Buscar por nombre |

**Base URL:** `http://localhost:8080`

---

## Estructura de Datos - Producto

```json
{
  "id": 1,
  "nombre": "Laptop Dell XPS 15",
  "descripcion": "Laptop de alto rendimiento con procesador Intel i9",
  "precio": 1500.00,
  "stock": 10,
  "fechaCreacion": "2025-11-06T10:30:00",
  "fechaActualizacion": "2025-11-06T10:30:00"
}
```

---

## Recursos Adicionales

### Documentación Oficial

- [Spring Boot Reference](https://docs.spring.io/spring-boot/reference/) - Documentación oficial de Spring Boot
- [Spring Data JPA](https://docs.spring.io/spring-data/jpa/reference/) - Guía de Spring Data JPA
- [Hibernate 6.6 Docs](https://hibernate.org/orm/documentation/6.6/) - Documentación de Hibernate
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Documentación oficial de PostgreSQL
- [Spring Initializr](https://start.spring.io/) - Generador de proyectos Spring Boot

### Tutoriales Complementarios

- [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
- [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
- [Accessing data with PostgreSQL](https://spring.io/guides/gs/accessing-data-postgresql/)

### Herramientas

- [Postman](https://www.postman.com/downloads/) - Cliente REST para pruebas
- [DBeaver](https://dbeaver.io/) - Cliente universal de bases de datos
- [pgAdmin](https://www.pgadmin.org/) - Cliente oficial de PostgreSQL

---

## FAQ

### ¿Necesito experiencia previa con Spring?

No es necesario. Este tutorial asume conocimientos básicos de Java (clases, métodos, anotaciones) pero explica Spring Boot desde cero.

### ¿Por qué Java 21 y no Java 17?

Java 21 es la versión LTS más reciente (soporte a largo plazo). Spring Boot 3.5 funciona con Java 17+, pero recomendamos Java 21 para aprovechar las últimas características del lenguaje.

### ¿Puedo usar MySQL en lugar de PostgreSQL?

Sí, solo necesitas cambiar la dependencia en `pom.xml` y las propiedades en `application.properties`. El código Java es el mismo.

### ¿Qué es Maven Wrapper (mvnw)?

Es un script que descarga y ejecuta Maven automáticamente. No necesitas instalar Maven en tu sistema si usas `./mvnw` en lugar de `mvn`.

### ¿Necesito instalar Tomcat?

No. Spring Boot incluye Tomcat embebido. La aplicación se ejecuta directamente con `./mvnw spring-boot:run`.

### ¿Qué significa CRUD?

CRUD son las operaciones básicas de persistencia:
- **C**reate (Crear)
- **R**ead (Leer)
- **U**pdate (Actualizar)
- **D**elete (Eliminar)

### ¿Qué es una API REST?

REST (Representational State Transfer) es un estilo de arquitectura para APIs web que usa:
- HTTP como protocolo
- URLs para identificar recursos
- Métodos HTTP (GET, POST, PUT, DELETE)
- JSON como formato de intercambio

### ¿Hibernate crea las tablas automáticamente?

Sí, con `spring.jpa.hibernate.ddl-auto=update`, Hibernate crea y actualiza las tablas basándose en tus entidades Java. Útil para desarrollo, NO para producción.

---



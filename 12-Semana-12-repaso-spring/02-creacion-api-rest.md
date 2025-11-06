# Documento 2: Creación de la API REST

En este documento crearemos todas las clases Java necesarias para implementar una API REST completa con operaciones CRUD (Create, Read, Update, Delete) para gestionar productos.

---

## Tabla de Contenidos

1. [Arquitectura de Capas](#arquitectura-de-capas)
2. [Crear Entidad Producto](#crear-entidad-producto)
3. [Crear Repository](#crear-repository)
4. [Crear Service](#crear-service)
5. [Crear Controller](#crear-controller)
6. [Crear Manejo de Excepciones](#crear-manejo-de-excepciones)
7. [Resumen de Anotaciones](#resumen-de-anotaciones)
8. [Código Final](#código-final)

---

## Arquitectura de Capas

Spring Boot recomienda el patrón de arquitectura en capas. Cada capa tiene una responsabilidad específica:

```
┌──────────────────────────────────────────────┐
│  CONTROLLER LAYER (@RestController)          │
│  - Recibe peticiones HTTP                    │
│  - Valida datos de entrada                   │
│  - Llama al Service                          │
│  - Devuelve respuestas JSON                  │
└───────────────────┬──────────────────────────┘
                    │
┌───────────────────▼──────────────────────────┐
│  SERVICE LAYER (@Service)                    │
│  - Lógica de negocio                         │
│  - Transacciones                             │
│  - Validaciones complejas                    │
│  - Llama al Repository                       │
└───────────────────┬──────────────────────────┘
                    │
┌───────────────────▼──────────────────────────┐
│  REPOSITORY LAYER (@Repository)              │
│  - Interfaz que extiende JpaRepository       │
│  - Spring genera automáticamente queries     │
│  - CRUD básico ya implementado               │
└───────────────────┬──────────────────────────┘
                    │
┌───────────────────▼──────────────────────────┐
│  MODEL LAYER (@Entity)                       │
│  - Representa una tabla en la BD             │
│  - Define estructura de datos                │
└──────────────────────────────────────────────┘
```

### Flujo Completo de una Petición

**Ejemplo:** Cliente envía `POST /api/productos` con JSON

```
1. ProductoController recibe POST
2. @Valid valida los datos del JSON
3. Controller llama a service.createProducto(producto)
4. Service aplica lógica de negocio (si hay)
5. Service llama a repository.save(producto)
6. Repository ejecuta INSERT en PostgreSQL
7. PostgreSQL devuelve el registro insertado
8. Repository convierte a objeto Producto
9. Service devuelve el Producto al Controller
10. Controller serializa a JSON y devuelve HTTP 201
```

---

## Crear Entidad Producto

La **entidad** es una clase Java que representa una tabla en la base de datos. Cada instancia de la clase es una fila en la tabla.

### Paso 1: Crear el paquete `model`

Dentro de `src/main/java/com/universidad/productosapi/`, crea una carpeta llamada `model`.

### Paso 2: Crear la clase `Producto.java`

**Ruta completa:** `src/main/java/com/universidad/productosapi/model/Producto.java`

```java
package com.universidad.productosapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

// @Entity: Marca esta clase como una entidad JPA (tabla en la BD)
@Entity
// @Table: Especifica el nombre de la tabla (opcional si es igual al nombre de la clase)
@Table(name = "productos")
public class Producto {

    // @Id: Marca este campo como la clave primaria
    @Id
    // @GeneratedValue: El valor se genera automáticamente
    // IDENTITY es simple y funciona perfecto con PostgreSQL
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @NotBlank: No puede ser null, vacío o solo espacios
    @NotBlank(message = "El nombre es obligatorio")
    // @Size: Define longitud mínima y máxima
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    // @Column: Configura la columna en la BD
    @Column(nullable = false, length = 100)
    private String nombre;

    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    @Column(length = 500)
    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    // @DecimalMin: El precio debe ser mayor a 0
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    // precision = 10: Total de dígitos
    // scale = 2: Dígitos decimales (ejemplo: 12345678.90)
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    @Column(nullable = false)
    private Integer stock = 0;

    // updatable = false: No se puede modificar después de crearse
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    // Constructor por defecto (OBLIGATORIO para JPA)
    public Producto() {
    }

    // Constructor con parámetros (opcional, para facilitar la creación)
    public Producto(String nombre, String descripcion, BigDecimal precio, Integer stock) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }

    // @PrePersist: Se ejecuta ANTES de insertar en la BD
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }

    // @PreUpdate: Se ejecuta ANTES de actualizar en la BD
    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }

    // Getters y Setters (OBLIGATORIOS para JPA)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    // toString() para debugging
    @Override
    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", precio=" + precio +
                ", stock=" + stock +
                ", fechaCreacion=" + fechaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                '}';
    }
}
```

### Explicación de Anotaciones JPA

| Anotación | Descripción |
|-----------|-------------|
| `@Entity` | Marca la clase como entidad JPA (tabla) |
| `@Table(name = "productos")` | Nombre de la tabla en PostgreSQL |
| `@Id` | Define la clave primaria |
| `@GeneratedValue` | Genera el ID automáticamente |
| `@Column` | Configura la columna (nullable, length, etc.) |
| `@PrePersist` | Se ejecuta antes de INSERT |
| `@PreUpdate` | Se ejecuta antes de UPDATE |

### Explicación de Validaciones

| Anotación | Descripción |
|-----------|-------------|
| `@NotNull` | No puede ser null |
| `@NotBlank` | No puede ser null, vacío o solo espacios |
| `@Size(min, max)` | Longitud mínima y máxima |
| `@Min(value)` | Valor mínimo |
| `@DecimalMin(value)` | Valor decimal mínimo |

---

## Crear Repository

El **Repository** es una interfaz que extiende `JpaRepository`. Spring Data JPA implementa automáticamente todos los métodos CRUD.

### Paso 1: Crear el paquete `repository`

Dentro de `src/main/java/com/universidad/productosapi/`, crea una carpeta llamada `repository`.

### Paso 2: Crear la interfaz `ProductoRepository.java`

**Ruta completa:** `src/main/java/com/universidad/productosapi/repository/ProductoRepository.java`

```java
package com.universidad.productosapi.repository;

import com.universidad.productosapi.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

// @Repository: Marca esta interfaz como un componente de Spring (capa de persistencia)
@Repository
// JpaRepository<Producto, Long>
// - Producto: La entidad que gestiona
// - Long: El tipo de dato del ID
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // ============================================================
    // MÉTODOS AUTOMÁTICOS HEREDADOS DE JpaRepository
    // ============================================================
    // Ya tienes disponibles (NO necesitas escribirlos):
    //
    // - save(producto)              → INSERT o UPDATE
    // - findById(id)                → SELECT por ID
    // - findAll()                   → SELECT * (todos)
    // - deleteById(id)              → DELETE por ID
    // - count()                     → COUNT(*)
    // - existsById(id)              → Verifica si existe
    //
    // ¡Spring genera el código SQL automáticamente!
    // ============================================================

    // ============================================================
    // MÉTODOS DE CONSULTA DERIVADOS (Query Methods)
    // ============================================================
    // Spring genera automáticamente la consulta basándose en el nombre del método

    // Buscar productos cuyo nombre contenga un texto (ignora mayúsculas/minúsculas)
    // SQL generado: SELECT * FROM productos WHERE LOWER(nombre) LIKE LOWER('%texto%')
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    // Buscar productos en un rango de precios
    // SQL generado: SELECT * FROM productos WHERE precio BETWEEN ? AND ?
    List<Producto> findByPrecioBetween(BigDecimal precioMin, BigDecimal precioMax);

    // Buscar productos con stock mayor a un valor
    // SQL generado: SELECT * FROM productos WHERE stock > ?
    List<Producto> findByStockGreaterThan(Integer stock);

    // Buscar un producto por nombre exacto
    // SQL generado: SELECT * FROM productos WHERE nombre = ?
    Optional<Producto> findByNombre(String nombre);

    // ============================================================
    // CONSULTAS JPQL PERSONALIZADAS
    // ============================================================
    // JPQL (Java Persistence Query Language) usa nombres de clases y atributos Java,
    // NO nombres de tablas SQL

    // Buscar productos baratos con stock disponible
    @Query("SELECT p FROM Producto p WHERE p.precio < :precio AND p.stock > 0")
    List<Producto> findProductosDisponiblesBaratos(@Param("precio") BigDecimal precio);

    // ============================================================
    // CONSULTAS SQL NATIVAS
    // ============================================================
    // Cuando necesitas SQL específico de PostgreSQL

    // Buscar productos sin stock
    @Query(value = "SELECT * FROM productos WHERE stock = 0", nativeQuery = true)
    List<Producto> findProductosSinStock();

    // Consulta nativa con parámetros
    @Query(value = "SELECT * FROM productos WHERE precio > :precioMin ORDER BY precio DESC LIMIT :limite",
           nativeQuery = true)
    List<Producto> findProductosCaros(@Param("precioMin") BigDecimal precioMin,
                                      @Param("limite") int limite);
}
```

### Convención de Nombres de Query Methods

Spring Data JPA convierte nombres de métodos en consultas SQL:

| Método | SQL Generado |
|--------|--------------|
| `findByNombre(String)` | `WHERE nombre = ?` |
| `findByNombreContaining(String)` | `WHERE nombre LIKE '%?%'` |
| `findByNombreIgnoreCase(String)` | `WHERE LOWER(nombre) = LOWER(?)` |
| `findByPrecioLessThan(BigDecimal)` | `WHERE precio < ?` |
| `findByStockGreaterThanEqual(Integer)` | `WHERE stock >= ?` |
| `findByNombreAndPrecio(String, BigDecimal)` | `WHERE nombre = ? AND precio = ?` |
| `findByNombreOrDescripcion(String, String)` | `WHERE nombre = ? OR descripcion = ?` |
| `findByOrderByPrecioAsc()` | `ORDER BY precio ASC` |
| `countByStock(Integer)` | `SELECT COUNT(*) WHERE stock = ?` |
| `deleteByNombre(String)` | `DELETE WHERE nombre = ?` |

**Documentación oficial:** [Spring Data JPA Query Methods](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html)

---

## Crear Service

El **Service** contiene la lógica de negocio. Es una capa intermedia entre el Controller y el Repository.

### ¿Por qué usar Service?

- **Separación de responsabilidades:** El Controller no debe acceder directamente al Repository
- **Lógica de negocio:** Validaciones complejas, cálculos, transformaciones
- **Transacciones:** Control de transacciones con `@Transactional`
- **Reutilización:** Múltiples Controllers pueden usar el mismo Service

### Paso 1: Crear el paquete `service`

Dentro de `src/main/java/com/universidad/productosapi/`, crea una carpeta llamada `service`.

### Paso 2: Crear la interfaz `ProductoService.java`

**Ruta completa:** `src/main/java/com/universidad/productosapi/service/ProductoService.java`

```java
package com.universidad.productosapi.service;

import com.universidad.productosapi.model.Producto;
import java.util.List;

// Interfaz que define el contrato del servicio
public interface ProductoService {

    // Obtener todos los productos
    List<Producto> getAllProductos();

    // Obtener un producto por ID (lanza excepción si no existe)
    Producto getProductoById(Long id);

    // Crear un nuevo producto
    Producto createProducto(Producto producto);

    // Actualizar un producto existente
    Producto updateProducto(Long id, Producto producto);

    // Eliminar un producto
    void deleteProducto(Long id);

    // Buscar productos por nombre
    List<Producto> searchProductosByNombre(String nombre);
}
```

### Paso 3: Crear la implementación `ProductoServiceImpl.java`

**Ruta completa:** `src/main/java/com/universidad/productosapi/service/ProductoServiceImpl.java`

```java
package com.universidad.productosapi.service;

import com.universidad.productosapi.exception.ResourceNotFoundException;
import com.universidad.productosapi.model.Producto;
import com.universidad.productosapi.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// @Service: Marca esta clase como un componente de Spring (capa de servicio)
@Service
// @Transactional: Todos los métodos públicos se ejecutan en una transacción
// Si hay un error, se hace rollback automáticamente
@Transactional
public class ProductoServiceImpl implements ProductoService {

    // Inyección de dependencias del Repository
    private final ProductoRepository productoRepository;

    // @Autowired: Spring inyecta automáticamente el ProductoRepository
    // (Opcional desde Spring 4.3 si solo hay un constructor)
    @Autowired
    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // @Transactional(readOnly = true): Optimización para operaciones de solo lectura
    @Override
    @Transactional(readOnly = true)
    public List<Producto> getAllProductos() {
        // findAll() es un método de JpaRepository
        return productoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Producto getProductoById(Long id) {
        // findById() devuelve Optional<Producto>
        // .orElseThrow() lanza excepción si no existe
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto no encontrado con id: " + id
                ));
    }

    @Override
    public Producto createProducto(Producto producto) {
        // save() hace INSERT si el ID es null, o UPDATE si existe
        return productoRepository.save(producto);
    }

    @Override
    public Producto updateProducto(Long id, Producto productoDetails) {
        // 1. Verificar que el producto existe
        Producto producto = getProductoById(id);

        // 2. Actualizar los campos
        producto.setNombre(productoDetails.getNombre());
        producto.setDescripcion(productoDetails.getDescripcion());
        producto.setPrecio(productoDetails.getPrecio());
        producto.setStock(productoDetails.getStock());

        // 3. Guardar (hace UPDATE porque el ID ya existe)
        return productoRepository.save(producto);
    }

    @Override
    public void deleteProducto(Long id) {
        // 1. Verificar que el producto existe
        Producto producto = getProductoById(id);

        // 2. Eliminar
        productoRepository.delete(producto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> searchProductosByNombre(String nombre) {
        // Llamar al método personalizado del Repository
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
```

### Explicación de `@Transactional`

```java
@Transactional
public void updateProducto(Long id) {
    // Todo lo que pasa aquí está en una transacción
    Producto p = repository.findById(id).get();
    p.setPrecio(100.00);
    repository.save(p);

    // Si ocurre una excepción aquí, se hace ROLLBACK
    // y los cambios NO se guardan en la BD
}
```

---

## Crear Controller

El **Controller** es la capa que expone los endpoints HTTP. Recibe las peticiones y devuelve respuestas JSON.

### Paso 1: Crear el paquete `controller`

Dentro de `src/main/java/com/universidad/productosapi/`, crea una carpeta llamada `controller`.

### Paso 2: Crear la clase `ProductoController.java`

**Ruta completa:** `src/main/java/com/universidad/productosapi/controller/ProductoController.java`

```java
package com.universidad.productosapi.controller;

import com.universidad.productosapi.model.Producto;
import com.universidad.productosapi.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// @RestController: Marca esta clase como controlador REST
// Combina @Controller + @ResponseBody (devuelve JSON automáticamente)
@RestController
// @RequestMapping: Define la ruta base para todos los endpoints de este controller
@RequestMapping("/api/productos")
// @CrossOrigin: Permite peticiones desde cualquier origen (para desarrollo)
@CrossOrigin(origins = "*")
public class ProductoController {

    // Inyección del Service
    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // ============================================================
    // GET /api/productos - Listar todos los productos
    // ============================================================
    @GetMapping
    public ResponseEntity<List<Producto>> getAllProductos() {
        List<Producto> productos = productoService.getAllProductos();
        return ResponseEntity.ok(productos); // HTTP 200 OK
    }

    // ============================================================
    // GET /api/productos/{id} - Obtener producto por ID
    // ============================================================
    // @PathVariable: Captura el valor de {id} de la URL
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        Producto producto = productoService.getProductoById(id);
        return ResponseEntity.ok(producto); // HTTP 200 OK
    }

    // ============================================================
    // POST /api/productos - Crear nuevo producto
    // ============================================================
    // @RequestBody: Convierte el JSON del body a objeto Producto
    // @Valid: Valida el objeto usando las anotaciones de jakarta.validation
    @PostMapping
    public ResponseEntity<Producto> createProducto(@Valid @RequestBody Producto producto) {
        Producto nuevoProducto = productoService.createProducto(producto);
        // HTTP 201 CREATED (indica que se creó un recurso)
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }

    // ============================================================
    // PUT /api/productos/{id} - Actualizar producto
    // ============================================================
    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(
            @PathVariable Long id,
            @Valid @RequestBody Producto productoDetails) {

        Producto productoActualizado = productoService.updateProducto(id, productoDetails);
        return ResponseEntity.ok(productoActualizado); // HTTP 200 OK
    }

    // ============================================================
    // DELETE /api/productos/{id} - Eliminar producto
    // ============================================================
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);

        // Crear respuesta con mensaje de éxito
        Map<String, String> response = new HashMap<>();
        response.put("mensaje", "Producto eliminado exitosamente");
        response.put("id", id.toString());

        return ResponseEntity.ok(response); // HTTP 200 OK
    }

    // ============================================================
    // GET /api/productos/search?nombre=xxx - Buscar por nombre
    // ============================================================
    // @RequestParam: Captura parámetros de query string (?nombre=xxx)
    @GetMapping("/search")
    public ResponseEntity<List<Producto>> searchProductos(
            @RequestParam String nombre) {

        List<Producto> productos = productoService.searchProductosByNombre(nombre);
        return ResponseEntity.ok(productos); // HTTP 200 OK
    }

    // ============================================================
    // EJEMPLO ADICIONAL: Endpoint con múltiples parámetros opcionales
    // ============================================================
    // GET /api/productos/filtrar?nombre=xxx&precioMin=10&precioMax=100
    @GetMapping("/filtrar")
    public ResponseEntity<List<Producto>> filtrarProductos(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Double precioMin,
            @RequestParam(required = false) Double precioMax) {

        // Aquí implementarías la lógica de filtrado
        // Por ahora devolvemos todos los productos
        List<Producto> productos = productoService.getAllProductos();
        return ResponseEntity.ok(productos);
    }
}
```

### Códigos de Respuesta HTTP

| Código | Nombre | Uso en nuestra API |
|--------|--------|---------------------|
| 200 | OK | GET, PUT, DELETE exitosos |
| 201 | Created | POST exitoso (recurso creado) |
| 204 | No Content | DELETE sin body de respuesta |
| 400 | Bad Request | Validación fallida |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

### Métodos HTTP y Endpoints

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| GET | `/api/productos` | Listar todos | No |
| GET | `/api/productos/1` | Obtener producto 1 | No |
| POST | `/api/productos` | Crear producto | Sí (JSON) |
| PUT | `/api/productos/1` | Actualizar producto 1 | Sí (JSON) |
| DELETE | `/api/productos/1` | Eliminar producto 1 | No |
| GET | `/api/productos/search?nombre=laptop` | Buscar por nombre | No |

---

## Crear Manejo de Excepciones

Necesitamos manejar errores de forma global para devolver respuestas JSON consistentes.

### Paso 1: Crear el paquete `exception`

Dentro de `src/main/java/com/universidad/productosapi/`, crea una carpeta llamada `exception`.

### Paso 2: Crear `ResourceNotFoundException.java`

**Ruta completa:** `src/main/java/com/universidad/productosapi/exception/ResourceNotFoundException.java`

```java
package com.universidad.productosapi.exception;

// Excepción personalizada para cuando no se encuentra un recurso
public class ResourceNotFoundException extends RuntimeException {

    // Constructor con mensaje
    public ResourceNotFoundException(String message) {
        super(message);
    }

    // Constructor con mensaje y causa
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

### Paso 3: Crear `GlobalExceptionHandler.java`

**Ruta completa:** `src/main/java/com/universidad/productosapi/exception/GlobalExceptionHandler.java`

```java
package com.universidad.productosapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

// @RestControllerAdvice: Maneja excepciones globalmente para todos los @RestController
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ============================================================
    // Manejo de ResourceNotFoundException (404 Not Found)
    // ============================================================
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Map<String, Object>> handleResourceNotFound(
            ResourceNotFoundException ex) {

        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.NOT_FOUND.value());
        errorResponse.put("error", "Not Found");
        errorResponse.put("mensaje", ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    // ============================================================
    // Manejo de errores de validación (400 Bad Request)
    // ============================================================
    // Se dispara cuando @Valid falla en el Controller
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {

        // Extraer todos los errores de validación
        Map<String, String> errores = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errores.put(fieldName, errorMessage);
        });

        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.BAD_REQUEST.value());
        errorResponse.put("error", "Validation Failed");
        errorResponse.put("errores", errores);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    // ============================================================
    // Manejo de excepciones generales (500 Internal Server Error)
    // ============================================================
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<Map<String, Object>> handleGlobalException(Exception ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorResponse.put("error", "Internal Server Error");
        errorResponse.put("mensaje", ex.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}
```

### Ejemplo de Respuesta de Error

**Si intentas obtener un producto que no existe:**

```http
GET /api/productos/999
```

**Respuesta (404):**
```json
{
  "timestamp": "2025-11-06T10:30:00.123",
  "status": 404,
  "error": "Not Found",
  "mensaje": "Producto no encontrado con id: 999"
}
```

**Si envías datos inválidos:**

```http
POST /api/productos
Content-Type: application/json

{
  "nombre": "AB",
  "precio": -10
}
```

**Respuesta (400):**
```json
{
  "timestamp": "2025-11-06T10:30:00.456",
  "status": 400,
  "error": "Validation Failed",
  "errores": {
    "nombre": "El nombre debe tener entre 3 y 100 caracteres",
    "precio": "El precio debe ser mayor a 0"
  }
}
```

---

## Resumen de Anotaciones

### Anotaciones de Spring

| Anotación | Capa | Descripción |
|-----------|------|-------------|
| `@SpringBootApplication` | Main | Habilita auto-configuración y component scanning |
| `@Entity` | Model | Marca la clase como entidad JPA |
| `@Table` | Model | Define el nombre de la tabla |
| `@Id` | Model | Define la clave primaria |
| `@GeneratedValue` | Model | Generación automática de ID |
| `@Column` | Model | Configura la columna de la BD |
| `@Repository` | Repository | Marca la interfaz como repository |
| `@Service` | Service | Marca la clase como service |
| `@Transactional` | Service | Define transacciones |
| `@RestController` | Controller | Marca la clase como controller REST |
| `@RequestMapping` | Controller | Define la ruta base |
| `@GetMapping` | Controller | Endpoint HTTP GET |
| `@PostMapping` | Controller | Endpoint HTTP POST |
| `@PutMapping` | Controller | Endpoint HTTP PUT |
| `@DeleteMapping` | Controller | Endpoint HTTP DELETE |
| `@PathVariable` | Controller | Captura variables de la URL |
| `@RequestParam` | Controller | Captura parámetros de query string |
| `@RequestBody` | Controller | Convierte JSON a objeto Java |
| `@Valid` | Controller | Valida el objeto |
| `@RestControllerAdvice` | Exception | Manejo global de excepciones |
| `@ExceptionHandler` | Exception | Maneja una excepción específica |

### Anotaciones de Validación

| Anotación | Descripción | Ejemplo |
|-----------|-------------|---------|
| `@NotNull` | No puede ser null | `@NotNull Integer stock` |
| `@NotBlank` | No null, vacío o espacios | `@NotBlank String nombre` |
| `@NotEmpty` | No null o vacío | `@NotEmpty List<String> tags` |
| `@Size(min, max)` | Longitud min/max | `@Size(min=3, max=100)` |
| `@Min(value)` | Valor mínimo | `@Min(0) Integer stock` |
| `@Max(value)` | Valor máximo | `@Max(1000) Integer cantidad` |
| `@DecimalMin(value)` | Decimal mínimo | `@DecimalMin("0.0")` |
| `@DecimalMax(value)` | Decimal máximo | `@DecimalMax("9999.99")` |
| `@Email` | Formato de email | `@Email String email` |
| `@Pattern(regexp)` | Expresión regular | `@Pattern(regexp="[0-9]+")` |

---

## Código Final

A continuación, el código completo de todas las clases creadas en este documento:

### Producto.java (Model)

**Ruta:** `src/main/java/com/universidad/productosapi/model/Producto.java`

```java
package com.universidad.productosapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    @Column(nullable = false, length = 100)
    private String nombre;

    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    @Column(length = 500)
    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    @Column(nullable = false)
    private Integer stock = 0;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    public Producto() {
    }

    public Producto(String nombre, String descripcion, BigDecimal precio, Integer stock) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", precio=" + precio +
                ", stock=" + stock +
                ", fechaCreacion=" + fechaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                '}';
    }
}
```

### ProductoRepository.java (Repository)

**Ruta:** `src/main/java/com/universidad/productosapi/repository/ProductoRepository.java`

```java
package com.universidad.productosapi.repository;

import com.universidad.productosapi.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    List<Producto> findByPrecioBetween(BigDecimal precioMin, BigDecimal precioMax);

    List<Producto> findByStockGreaterThan(Integer stock);

    Optional<Producto> findByNombre(String nombre);

    @Query("SELECT p FROM Producto p WHERE p.precio < :precio AND p.stock > 0")
    List<Producto> findProductosDisponiblesBaratos(@Param("precio") BigDecimal precio);

    @Query(value = "SELECT * FROM productos WHERE stock = 0", nativeQuery = true)
    List<Producto> findProductosSinStock();
}
```

### ProductoService.java (Service Interface)

**Ruta:** `src/main/java/com/universidad/productosapi/service/ProductoService.java`

```java
package com.universidad.productosapi.service;

import com.universidad.productosapi.model.Producto;
import java.util.List;

public interface ProductoService {

    List<Producto> getAllProductos();

    Producto getProductoById(Long id);

    Producto createProducto(Producto producto);

    Producto updateProducto(Long id, Producto producto);

    void deleteProducto(Long id);

    List<Producto> searchProductosByNombre(String nombre);
}
```

### ProductoServiceImpl.java (Service Implementation)

**Ruta:** `src/main/java/com/universidad/productosapi/service/ProductoServiceImpl.java`

```java
package com.universidad.productosapi.service;

import com.universidad.productosapi.exception.ResourceNotFoundException;
import com.universidad.productosapi.model.Producto;
import com.universidad.productosapi.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Producto getProductoById(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto no encontrado con id: " + id
                ));
    }

    @Override
    public Producto createProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Producto updateProducto(Long id, Producto productoDetails) {
        Producto producto = getProductoById(id);

        producto.setNombre(productoDetails.getNombre());
        producto.setDescripcion(productoDetails.getDescripcion());
        producto.setPrecio(productoDetails.getPrecio());
        producto.setStock(productoDetails.getStock());

        return productoRepository.save(producto);
    }

    @Override
    public void deleteProducto(Long id) {
        Producto producto = getProductoById(id);
        productoRepository.delete(producto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> searchProductosByNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
```

### ProductoController.java (Controller)

**Ruta:** `src/main/java/com/universidad/productosapi/controller/ProductoController.java`

```java
package com.universidad.productosapi.controller;

import com.universidad.productosapi.model.Producto;
import com.universidad.productosapi.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public ResponseEntity<List<Producto>> getAllProductos() {
        List<Producto> productos = productoService.getAllProductos();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        Producto producto = productoService.getProductoById(id);
        return ResponseEntity.ok(producto);
    }

    @PostMapping
    public ResponseEntity<Producto> createProducto(@Valid @RequestBody Producto producto) {
        Producto nuevoProducto = productoService.createProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(
            @PathVariable Long id,
            @Valid @RequestBody Producto productoDetails) {

        Producto productoActualizado = productoService.updateProducto(id, productoDetails);
        return ResponseEntity.ok(productoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);

        Map<String, String> response = new HashMap<>();
        response.put("mensaje", "Producto eliminado exitosamente");
        response.put("id", id.toString());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Producto>> searchProductos(@RequestParam String nombre) {
        List<Producto> productos = productoService.searchProductosByNombre(nombre);
        return ResponseEntity.ok(productos);
    }
}
```

### ResourceNotFoundException.java (Exception)

**Ruta:** `src/main/java/com/universidad/productosapi/exception/ResourceNotFoundException.java`

```java
package com.universidad.productosapi.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

### GlobalExceptionHandler.java (Exception Handler)

**Ruta:** `src/main/java/com/universidad/productosapi/exception/GlobalExceptionHandler.java`

```java
package com.universidad.productosapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Map<String, Object>> handleResourceNotFound(
            ResourceNotFoundException ex) {

        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.NOT_FOUND.value());
        errorResponse.put("error", "Not Found");
        errorResponse.put("mensaje", ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {

        Map<String, String> errores = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errores.put(fieldName, errorMessage);
        });

        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.BAD_REQUEST.value());
        errorResponse.put("error", "Validation Failed");
        errorResponse.put("errores", errores);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<Map<String, Object>> handleGlobalException(Exception ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorResponse.put("error", "Internal Server Error");
        errorResponse.put("mensaje", ex.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}
```

---


# Documento 1: Introducción a Spring Boot 3.5

Este documento te guía paso a paso en la instalación de las herramientas necesarias y la creación de tu primer proyecto Spring Boot 3.5 con PostgreSQL.

---

## Tabla de Contenidos

1. [¿Qué es Spring Boot?](#qué-es-spring-boot)
2. [Arquitectura de una API REST](#arquitectura-de-una-api-rest)
3. [Instalación de Java 21](#instalación-de-java-21)
4. [Instalación de Maven (Opcional)](#instalación-de-maven-opcional)
5. [Crear Proyecto con Spring Initializr](#crear-proyecto-con-spring-initializr)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Ejecutar la Aplicación](#ejecutar-la-aplicación)
8. [Troubleshooting](#troubleshooting)
9. [Código Final](#código-final)

---

## ¿Qué es Spring Boot?

**Spring Boot** es un framework de Java que simplifica la creación de aplicaciones web y APIs REST. Está construido sobre el Spring Framework y elimina gran parte de la configuración manual.

### Ventajas de Spring Boot

- **Auto-configuración:** Configura automáticamente tu aplicación basándose en las dependencias
- **Servidor embebido:** Incluye Tomcat, no necesitas instalarlo por separado
- **Sin XML:** Toda la configuración es mediante anotaciones Java o archivos `.properties`
- **Producción-ready:** Incluye métricas, health checks y monitoreo
- **Gran ecosistema:** Miles de librerías y extensiones disponibles

### Spring Boot vs Spring Framework

| Característica | Spring Framework | Spring Boot |
|----------------|------------------|-------------|
| Configuración | Manual (XML o Java) | Auto-configuración |
| Servidor web | Debes instalarlo | Incluye Tomcat embebido |
| Dependencias | Gestionas versiones | Gestión automática |
| Tiempo de setup | Horas | Minutos |
| Curva de aprendizaje | Alta | Moderada |

---

## Arquitectura de una API REST

### ¿Qué es REST?

**REST** (Representational State Transfer) es un estilo de arquitectura para APIs web que usa HTTP como protocolo de comunicación.

### Principios REST

1. **Cliente-Servidor:** Separación entre frontend y backend
2. **Stateless:** Cada petición es independiente
3. **Recursos:** Todo es un recurso identificado por una URL
4. **Métodos HTTP:** GET, POST, PUT, DELETE

### Arquitectura en Capas (Spring Boot)

```
┌─────────────────────────────────────────┐
│           CLIENTE (Postman)             │
│         Frontend / Mobile App            │
└────────────────┬────────────────────────┘
                 │ HTTP Requests
                 │ (JSON)
┌────────────────▼────────────────────────┐
│         CONTROLLER LAYER                 │
│   @RestController                        │
│   - Recibe peticiones HTTP               │
│   - Valida datos de entrada              │
│   - Devuelve respuestas JSON             │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         SERVICE LAYER                    │
│   @Service                               │
│   - Lógica de negocio                    │
│   - Validaciones complejas               │
│   - Transacciones                        │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         REPOSITORY LAYER                 │
│   @Repository (Spring Data JPA)          │
│   - Acceso a base de datos               │
│   - Queries automáticas                  │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         DATABASE (PostgreSQL)            │
│   - Almacenamiento persistente           │
│   - Tablas, relaciones, índices          │
└─────────────────────────────────────────┘
```

### Flujo de una Petición HTTP

```
1. Cliente envía: GET /api/productos/1
2. Controller recibe la petición
3. Controller llama a: service.getProductoById(1)
4. Service llama a: repository.findById(1)
5. Repository consulta PostgreSQL
6. PostgreSQL devuelve fila de la tabla
7. Repository convierte a objeto Producto
8. Service procesa (si es necesario)
9. Controller convierte a JSON
10. Cliente recibe: { "id": 1, "nombre": "Laptop", ... }
```

---

## Instalación de Java 21

Spring Boot 3.5 requiere **Java 17 como mínimo**, pero recomendamos **Java 21 (LTS)** para aprovechar las últimas características.

### Verificar si ya tienes Java

```bash
java -version
```

**Salida esperada:**
```
java version "21.0.x"
Java(TM) SE Runtime Environment (build 21.0.x+x)
Java HotSpot(TM) 64-Bit Server VM (build 21.0.x+x, mixed mode)
```

### Opción A: Instalación en Windows

1. **Descargar Java 21 JDK:**
   - Ve a: [https://adoptium.net/](https://adoptium.net/)
   - Selecciona: **Temurin 21 (LTS)**
   - Sistema operativo: **Windows**
   - Arquitectura: **x64**
   - Tipo de paquete: **JDK**
   - Descarga el instalador `.msi`

2. **Ejecutar el instalador:**
   - Doble clic en el archivo `.msi` descargado
   - Acepta los términos de licencia
   - **IMPORTANTE:** Marca la opción **"Add to PATH"**
   - Clic en "Next" hasta completar la instalación

3. **Verificar instalación:**
   - Abre **PowerShell** (búscalo en el menú Inicio)
   - Ejecuta:
   ```powershell
   java -version
   javac -version
   ```

4. **Si no aparece el comando:**
   - Busca "Variables de entorno" en el menú Inicio
   - Clic en "Variables de entorno..."
   - En "Variables del sistema", busca `Path`
   - Clic en "Editar"
   - Verifica que existe una entrada como: `C:\Program Files\Eclipse Adoptium\jdk-21.x.x\bin`
   - Si no existe, agrégala manualmente

### Opción B: Instalación en WSL2/Ubuntu

1. **Actualizar repositorios:**
```bash
sudo apt update
```

2. **Instalar OpenJDK 21:**
```bash
sudo apt install openjdk-21-jdk -y
```

3. **Verificar instalación:**
```bash
java -version
javac -version
```

4. **Configurar JAVA_HOME (opcional pero recomendado):**
```bash
# Añadir al final de ~/.bashrc
echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc

# Recargar configuración
source ~/.bashrc
```

### Opción C: Instalación con SDKMAN (Recomendado para WSL2)

```bash
# Instalar SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Listar versiones de Java disponibles
sdk list java

# Instalar Java 21 (Temurin)
sdk install java 21.0.5-tem

# Verificar
java -version
```

---

## Instalación de Maven (Opcional)

**Maven** es el gestor de dependencias de Java. Sin embargo, Spring Boot incluye **Maven Wrapper** (`mvnw`), por lo que NO es obligatorio instalarlo.

### ¿Necesito instalar Maven?

- **NO**, si usas `./mvnw` (Maven Wrapper) - Recomendado
- **SÍ**, si prefieres usar `mvn` directamente

### Opción A: Usar Maven Wrapper (Recomendado)

No hagas nada. Spring Boot incluye los scripts `mvnw` (Linux/Mac) y `mvnw.cmd` (Windows).

### Opción B: Instalar Maven en Windows

1. **Descargar Maven:**
   - Ve a: [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)
   - Descarga: `apache-maven-3.9.x-bin.zip`

2. **Extraer:**
   - Extrae en: `C:\Program Files\Apache\maven`

3. **Configurar PATH:**
   - Variables de entorno → Path → Agregar: `C:\Program Files\Apache\maven\bin`

4. **Verificar:**
```powershell
mvn -version
```

### Opción C: Instalar Maven en WSL2/Ubuntu

```bash
sudo apt install maven -y
mvn -version
```

---

## Crear Proyecto con Spring Initializr

**Spring Initializr** es una herramienta web oficial para generar proyectos Spring Boot con las dependencias que necesites.

### Método 1: Interfaz Web (Recomendado para principiantes)

1. **Abrir Spring Initializr:**
   - Ve a: [https://start.spring.io/](https://start.spring.io/)

2. **Configurar el proyecto:**

   **Project:**
   - Selecciona: **Maven**

   **Language:**
   - Selecciona: **Java**

   **Spring Boot:**
   - Selecciona: **3.5.7** (o la última versión 3.5.x disponible)

   **Project Metadata:**
   ```
   Group: com.universidad
   Artifact: productos-api
   Name: productos-api
   Description: API REST para gestionar productos
   Package name: com.universidad.productosapi
   Packaging: Jar
   Java: 21
   ```

3. **Añadir dependencias:**

   Haz clic en **"ADD DEPENDENCIES"** y busca/añade las siguientes:

   - **Spring Web** - Para crear APIs REST
   - **Spring Data JPA** - Para persistencia con JPA/Hibernate
   - **PostgreSQL Driver** - Driver JDBC de PostgreSQL
   - **Validation** - Para validaciones con Bean Validation

   Deberías ver estas 4 dependencias en la lista de la derecha.

4. **Generar el proyecto:**
   - Clic en el botón **"GENERATE"** (abajo a la izquierda)
   - Se descargará un archivo `productos-api.zip`

5. **Extraer el proyecto:**

   **Windows:**
   - Extrae el ZIP en tu carpeta de trabajo, por ejemplo:
   - `C:\Users\TuUsuario\dev\productos-api`

   **WSL2:**
   ```bash
   # Navegar a tu carpeta de proyectos
   cd ~/dev/personal/full-stack-2/12-Semana-12-repaso-spring

   # Mover el ZIP descargado (ajusta la ruta)
   mv /mnt/c/Users/TuUsuario/Downloads/productos-api.zip .

   # Extraer
   unzip productos-api.zip

   # Entrar al proyecto
   cd productos-api
   ```

### Método 2: Línea de Comandos (Avanzado)

```bash
# Generar proyecto directamente desde la terminal
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,postgresql,validation \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.5.7 \
  -d baseDir=productos-api \
  -d groupId=com.universidad \
  -d artifactId=productos-api \
  -d name=productos-api \
  -d description="API REST para gestionar productos" \
  -d packageName=com.universidad.productosapi \
  -d packaging=jar \
  -d javaVersion=21 \
  -o productos-api.zip

# Extraer
unzip productos-api.zip

# Entrar
cd productos-api
```

---

## Estructura del Proyecto

Después de extraer el proyecto, verás esta estructura:

```
productos-api/
├── .mvn/                       # Maven Wrapper (no tocar)
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/universidad/productosapi/
│   │   │       └── ProductosApiApplication.java    ← Clase principal
│   │   └── resources/
│   │       ├── application.properties              ← Configuración
│   │       ├── static/                             ← Archivos estáticos (HTML, CSS, JS)
│   │       └── templates/                          ← Plantillas (Thymeleaf)
│   └── test/
│       └── java/
│           └── com/universidad/productosapi/
│               └── ProductosApiApplicationTests.java
├── .gitignore                  # Archivos ignorados por Git
├── mvnw                        # Maven Wrapper para Linux/Mac
├── mvnw.cmd                    # Maven Wrapper para Windows
├── pom.xml                     # Configuración de Maven (dependencias)
└── HELP.md                     # Ayuda generada por Spring Initializr
```

### Archivos Importantes

| Archivo | Descripción |
|---------|-------------|
| `pom.xml` | Define dependencias, plugins y configuración de Maven |
| `application.properties` | Configuración de la aplicación (DB, puerto, etc.) |
| `ProductosApiApplication.java` | Clase principal con el método `main()` |
| `mvnw` / `mvnw.cmd` | Maven Wrapper para ejecutar Maven sin instalarlo |

### Carpetas que Crearemos

En el siguiente documento (`02-creacion-api-rest.md`) crearemos estas carpetas dentro de `src/main/java/com/universidad/productosapi/`:

```
com/universidad/productosapi/
├── ProductosApiApplication.java  (ya existe)
├── model/                         (a crear)
│   └── Producto.java
├── repository/                    (a crear)
│   └── ProductoRepository.java
├── service/                       (a crear)
│   ├── ProductoService.java
│   └── ProductoServiceImpl.java
├── controller/                    (a crear)
│   └── ProductoController.java
└── exception/                     (a crear)
    ├── ResourceNotFoundException.java
    └── GlobalExceptionHandler.java
```

---

## Ejecutar la Aplicación

Vamos a ejecutar la aplicación por primera vez para verificar que todo funciona.

### Paso 1: Abrir Terminal

**Windows:**
- Abre PowerShell o Command Prompt
- Navega a la carpeta del proyecto:
```powershell
cd C:\ruta\a\tu\proyecto\productos-api
```

**WSL2:**
```bash
cd ~/dev/personal/full-stack-2/12-Semana-12-repaso-spring/productos-api
```

### Paso 2: Dar permisos (Solo Linux/Mac/WSL2)

```bash
chmod +x mvnw
```

### Paso 3: Ejecutar la aplicación

**Linux/Mac/WSL2:**
```bash
./mvnw spring-boot:run
```

**Windows CMD:**
```cmd
mvnw.cmd spring-boot:run
```

**Windows PowerShell:**
```powershell
.\mvnw.cmd spring-boot:run
```

### Paso 4: Ver la Salida

Deberías ver algo como esto:

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: Spring Boot ::                (v3.5.7)

2025-11-06T10:30:00.123-05:00  INFO 12345 --- [  restartedMain] c.u.p.ProductosApiApplication           : Starting ProductosApiApplication
2025-11-06T10:30:01.456-05:00  INFO 12345 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2025-11-06T10:30:02.789-05:00  INFO 12345 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http)
2025-11-06T10:30:03.012-05:00  INFO 12345 --- [  restartedMain] c.u.p.ProductosApiApplication           : Started ProductosApiApplication in 3.456 seconds
```

**¡IMPORTANTE!** Si ves este mensaje, significa que la aplicación está corriendo correctamente:

```
Tomcat started on port 8080 (http)
```

### Paso 5: Probar en el Navegador

Abre tu navegador y ve a:

```
http://localhost:8080
```

**Verás un error 404 o Whitelabel Error Page.** Esto es NORMAL porque aún no hemos creado ningún endpoint. Lo haremos en el siguiente documento.

### Paso 6: Detener la Aplicación

Para detener la aplicación, presiona:

```
CTRL + C
```

En la terminal donde está corriendo.

---

## Troubleshooting

### Error: "java: invalid target release: 21"

**Causa:** No tienes Java 21 instalado o tu IDE está usando otra versión.

**Solución:**
```bash
# Verificar versión de Java
java -version

# Si no es 21, instala Java 21 (ver sección anterior)
```

### Error: "Port 8080 was already in use"

**Causa:** Otra aplicación está usando el puerto 8080.

**Solución 1:** Cambiar el puerto en `application.properties`:
```properties
server.port=8081
```

**Solución 2:** Matar el proceso que usa el puerto:

**Windows PowerShell:**
```powershell
# Encontrar el proceso
Get-NetTCPConnection -LocalPort 8080

# Matar el proceso (reemplaza PID con el número de proceso)
Stop-Process -Id PID -Force
```

**Linux/WSL2:**
```bash
# Encontrar y matar el proceso
kill $(lsof -t -i:8080)
```

### Error: "Could not resolve dependencies"

**Causa:** Maven no puede descargar las dependencias (problema de red).

**Solución:**
```bash
# Limpiar caché de Maven
./mvnw clean

# Forzar descarga de dependencias
./mvnw dependency:resolve

# Intentar nuevamente
./mvnw spring-boot:run
```

### Error: "JAVA_HOME is not set"

**Causa:** La variable de entorno `JAVA_HOME` no está configurada.

**Solución Windows:**
1. Busca "Variables de entorno" en el menú Inicio
2. Clic en "Variables de entorno..."
3. En "Variables del sistema", clic en "Nueva"
4. Nombre: `JAVA_HOME`
5. Valor: `C:\Program Files\Eclipse Adoptium\jdk-21.x.x`
6. Clic en "Aceptar"
7. Reinicia PowerShell

**Solución Linux/WSL2:**
```bash
# Añadir a ~/.bashrc
echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64' >> ~/.bashrc
source ~/.bashrc
```

### Error: "mvnw: Permission denied"

**Causa:** El archivo `mvnw` no tiene permisos de ejecución (solo Linux/Mac/WSL2).

**Solución:**
```bash
chmod +x mvnw
```

### La aplicación compila pero no inicia

**Verifica:**
1. Que no hay errores de sintaxis en `application.properties`
2. Que el puerto 8080 esté libre
3. Revisa los logs completos para ver el error específico

---

## Código Final

### pom.xml

Este archivo es generado automáticamente por Spring Initializr. Aquí está el código completo:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- Parent: Spring Boot Starter Parent -->
    <!-- Gestiona automáticamente las versiones de todas las dependencias de Spring -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.7</version>
        <relativePath/>
    </parent>

    <!-- Información del Proyecto -->
    <groupId>com.universidad</groupId>
    <artifactId>productos-api</artifactId>
    <version>1.0.0</version>
    <name>productos-api</name>
    <description>API REST para gestionar productos</description>

    <!-- Propiedades -->
    <properties>
        <java.version>21</java.version>
    </properties>

    <!-- Dependencias -->
    <dependencies>
        <!-- Spring Web: Para crear APIs REST -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA: Para persistencia con JPA/Hibernate -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- PostgreSQL Driver: Driver JDBC para conectar con PostgreSQL -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Validation: Para validaciones con Bean Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Spring Boot Test: Para testing (ya viene incluido) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <!-- Plugin de Maven para empaquetar la aplicación -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### ProductosApiApplication.java

Esta es la clase principal generada automáticamente:

```java
package com.universidad.productosapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication es una anotación compuesta que incluye:
// - @Configuration: Marca la clase como fuente de definiciones de beans
// - @EnableAutoConfiguration: Habilita la auto-configuración de Spring Boot
// - @ComponentScan: Escanea componentes en este paquete y sub-paquetes
@SpringBootApplication
public class ProductosApiApplication {

    // Método main: Punto de entrada de la aplicación
    public static void main(String[] args) {
        // SpringApplication.run() inicia la aplicación Spring Boot
        SpringApplication.run(ProductosApiApplication.class, args);
    }
}
```

### application.properties (Vacío por ahora)

Por ahora, este archivo está vacío. Lo configuraremos en el **Documento 3** cuando conectemos con PostgreSQL.

**Archivo:** `src/main/resources/application.properties`

```properties
# Este archivo está vacío por ahora
# Lo configuraremos en el Documento 3
```

---



# Documento 3: Configuración de PostgreSQL

En este documento aprenderás a instalar PostgreSQL, crear la base de datos, y conectar Spring Boot con ella para persistir los productos.

---

## Tabla de Contenidos

1. [¿Qué es PostgreSQL?](#qué-es-postgresql)
2. [Instalación de PostgreSQL](#instalación-de-postgresql)
3. [Crear Base de Datos](#crear-base-de-datos)
4. [Configurar Spring Boot](#configurar-spring-boot)
5. [Verificar Conexión](#verificar-conexión)
6. [Insertar Datos de Prueba](#insertar-datos-de-prueba)
7. [Troubleshooting](#troubleshooting)
8. [Código Final](#código-final)

---

## ¿Qué es PostgreSQL?

**PostgreSQL** es un sistema de gestión de bases de datos relacional (RDBMS) de código abierto, reconocido por su robustez, escalabilidad y cumplimiento de estándares SQL.

### ¿Por qué PostgreSQL?

- **Open Source y Gratis:** Sin costos de licencia
- **ACID compliant:** Garantiza transacciones seguras
- **Extensible:** Soporta JSON, arrays, tipos personalizados
- **Gran rendimiento:** Optimizado para lectura y escritura
- **Amplia adopción:** Usado por Instagram, Spotify, Reddit

### PostgreSQL vs MySQL

| Característica | PostgreSQL | MySQL |
|----------------|------------|-------|
| Licencia | PostgreSQL License (libre) | GPL / Comercial |
| Conformidad SQL | Muy alta | Moderada |
| JSON/JSONB | Sí (nativo) | Sí (limitado) |
| Tipos de datos | Muy extenso | Estándar |
| Rendimiento complejo | Excelente | Bueno |
| Windows / Linux | Ambos | Ambos |

**Para este tutorial:** Usaremos PostgreSQL 16 o 17 (últimas versiones estables).

---

## Instalación de PostgreSQL

### Opción A: Instalación en Windows

#### Paso 1: Descargar PostgreSQL

1. Ve a la página oficial: [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Clic en **"Download the installer"**
3. Te redirige a EDB: [https://www.enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
4. Descarga **PostgreSQL 16.x o 17.x** para Windows x86-64

#### Paso 2: Ejecutar el Instalador

1. Doble clic en el archivo `.exe` descargado
2. Clic en **"Next"**
3. **Installation Directory:** Dejar por defecto (`C:\Program Files\PostgreSQL\16`)
4. **Select Components:** Marcar todos:
   - PostgreSQL Server
   - pgAdmin 4 (interfaz gráfica)
   - Stack Builder
   - Command Line Tools
5. **Data Directory:** Dejar por defecto (`C:\Program Files\PostgreSQL\16\data`)
6. **Password:** Ingresa una contraseña para el usuario `postgres`
   - **IMPORTANTE:** Anota esta contraseña, la necesitarás después
   - Ejemplo: `postgres` (para desarrollo local)
7. **Port:** Dejar `5432` (puerto por defecto)
8. **Locale:** Dejar por defecto
9. Clic en **"Next"** hasta completar la instalación

#### Paso 3: Verificar Instalación

**Opción 1: Command Line**

1. Abre **Command Prompt** o **PowerShell**
2. Ejecuta:

```powershell
# Verificar versión
psql --version

# Si no funciona, navega a la carpeta bin:
cd "C:\Program Files\PostgreSQL\16\bin"
.\psql --version
```

**Opción 2: pgAdmin 4**

1. Busca **pgAdmin 4** en el menú Inicio
2. Ábrelo
3. Conéctate al servidor local (contraseña: la que configuraste)

#### Paso 4: Agregar PostgreSQL al PATH (Opcional)

Para usar `psql` desde cualquier ubicación:

1. Busca **"Variables de entorno"** en el menú Inicio
2. Clic en **"Variables de entorno..."**
3. En **"Variables del sistema"**, selecciona `Path` y clic en **"Editar"**
4. Clic en **"Nuevo"** y agrega: `C:\Program Files\PostgreSQL\16\bin`
5. Clic en **"Aceptar"** en todas las ventanas
6. **Reinicia PowerShell**
7. Verifica:

```powershell
psql --version
```

---

### Opción B: Instalación en WSL2/Ubuntu

#### Paso 1: Actualizar Repositorios

```bash
sudo apt update
sudo apt upgrade -y
```

#### Paso 2: Instalar PostgreSQL

```bash
# Instalar PostgreSQL y herramientas adicionales
sudo apt install postgresql postgresql-contrib libpq-dev -y
```

#### Paso 3: Verificar Instalación

```bash
# Verificar versión
psql --version

# Debería mostrar: psql (PostgreSQL) 16.x
```

#### Paso 4: Iniciar el Servicio

**IMPORTANTE:** En WSL2, PostgreSQL NO se inicia automáticamente. Debes iniciarlo manualmente cada vez que reinicies WSL.

```bash
# Verificar estado
sudo service postgresql status

# Iniciar servicio
sudo service postgresql start

# Verificar nuevamente
sudo service postgresql status
# Debería mostrar: "online"
```

#### Paso 5: Configurar Contraseña del Usuario `postgres`

```bash
# Cambiar contraseña del usuario postgres del sistema
sudo passwd postgres
# Ingresa contraseña nueva (ej: postgres)

# Acceder a PostgreSQL como usuario postgres
sudo -u postgres psql

# Dentro de psql, cambiar contraseña del usuario de la BD:
ALTER USER postgres WITH PASSWORD 'postgres';

# Salir
\q
```

#### Paso 6 (Opcional): Auto-iniciar PostgreSQL en WSL2

Para no tener que iniciar manualmente PostgreSQL cada vez:

```bash
# Editar archivo sudoers
sudo visudo

# Agregar al final:
%sudo ALL=(ALL) NOPASSWD: /usr/sbin/service postgresql *

# Agregar a ~/.bashrc
echo 'sudo service postgresql start > /dev/null 2>&1' >> ~/.bashrc

# Recargar configuración
source ~/.bashrc
```

---

## Crear Base de Datos

Ahora crearemos la base de datos que usará nuestra API Spring Boot.

### Método 1: Desde la Terminal con `psql`

#### Windows (Command Prompt o PowerShell)

```powershell
# Conectar a PostgreSQL como usuario postgres
psql -U postgres

# Si no funciona, usa la ruta completa:
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres

# Te pedirá la contraseña que configuraste
```

#### WSL2/Ubuntu

```bash
# Conectar a PostgreSQL como usuario postgres
sudo -u postgres psql
```

#### Dentro de `psql`:

```sql
-- Crear la base de datos
CREATE DATABASE productosdb;

-- Crear un usuario específico (opcional)
CREATE USER productosuser WITH PASSWORD 'productos123';

-- Dar todos los permisos sobre la base de datos
GRANT ALL PRIVILEGES ON DATABASE productosdb TO productosuser;

-- Listar todas las bases de datos (para verificar)
\l

-- Conectar a la base de datos recién creada
\c productosdb

-- Listar tablas (aún no hay ninguna)
\dt

-- Salir de psql
\q
```

**Salida esperada de `\l`:**

```
                                      List of databases
    Name     |  Owner   | Encoding | Locale Provider | Collate | Ctype | ICU Locale |   Access privileges
-------------+----------+----------+-----------------+---------+-------+------------+-----------------------
 postgres    | postgres | UTF8     | libc            | ...     | ...   |            |
 productosdb | postgres | UTF8     | libc            | ...     | ...   |            | =Tc/postgres         +
             |          |          |                 |         |       |            | postgres=CTc/postgres+
             |          |          |                 |         |       |            | productosuser=CTc/postgres
 template0   | postgres | UTF8     | libc            | ...     | ...   |            | =c/postgres          +
 template1   | postgres | UTF8     | libc            | ...     | ...   |            | =c/postgres          +
```

---

### Método 2: Desde pgAdmin 4 (Solo Windows)

1. Abre **pgAdmin 4**
2. En el panel izquierdo, expande **Servers**
3. Clic derecho en **PostgreSQL 16** → **Connect** (ingresa tu contraseña)
4. Clic derecho en **Databases** → **Create** → **Database...**
5. En **Database:** escribe `productosdb`
6. Clic en **Save**

---

## Configurar Spring Boot

Ahora configuraremos Spring Boot para conectarse a PostgreSQL.

### Paso 1: Abrir `application.properties`

**Ruta:** `src/main/resources/application.properties`

### Paso 2: Agregar Configuración de PostgreSQL

Reemplaza el contenido del archivo con:

```properties
# ============================================================
# CONFIGURACIÓN DE LA BASE DE DATOS POSTGRESQL
# ============================================================

# URL de conexión a PostgreSQL
# Formato: jdbc:postgresql://[host]:[puerto]/[nombre_bd]
spring.datasource.url=jdbc:postgresql://localhost:5432/productosdb

# Usuario de PostgreSQL
spring.datasource.username=postgres

# Contraseña de PostgreSQL
spring.datasource.password=postgres

# Driver JDBC de PostgreSQL (se detecta automáticamente)
spring.datasource.driver-class-name=org.postgresql.Driver

# ============================================================
# CONFIGURACIÓN DE JPA/HIBERNATE
# ============================================================

# Dialecto de PostgreSQL para Hibernate (OPCIONAL - Spring Boot lo detecta automáticamente)
# Puedes comentar esta línea, Spring Boot 3.5 detecta el dialecto basándose en el driver
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Estrategia de generación/actualización del esquema de BD
# - none: No hace nada (para producción)
# - validate: Solo valida que el esquema coincida
# - update: Actualiza el esquema automáticamente (RECOMENDADO para desarrollo)
# - create: Crea el esquema desde cero (destruye datos existentes)
# - create-drop: Crea al iniciar, destruye al cerrar
spring.jpa.hibernate.ddl-auto=update

# Mostrar las consultas SQL en la consola (útil para debugging)
spring.jpa.show-sql=true

# Formatear las consultas SQL para mejor legibilidad
spring.jpa.properties.hibernate.format_sql=true

# ============================================================
# CONFIGURACIÓN DEL SERVIDOR
# ============================================================

# Puerto del servidor (por defecto es 8080)
server.port=8080

# ============================================================
# CONFIGURACIÓN DE LOGGING
# ============================================================

# Nivel de logging para SQL (DEBUG para ver queries, INFO para producción)
logging.level.org.hibernate.SQL=DEBUG

# Mostrar los valores de los parámetros en las consultas SQL
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

# Nivel de logging para tu aplicación
logging.level.com.universidad.productosapi=DEBUG
```

### Explicación de Propiedades Importantes

#### Conexión a la Base de Datos

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/productosdb
```

- `localhost`: El servidor de PostgreSQL está en tu máquina
- `5432`: Puerto por defecto de PostgreSQL
- `productosdb`: Nombre de la base de datos que creamos

#### Estrategia `ddl-auto`

| Valor | Comportamiento |
|-------|----------------|
| `none` | No hace nada. Debes crear las tablas manualmente |
| `validate` | Solo valida que las entidades coincidan con las tablas |
| `update` | **Recomendado para desarrollo.** Crea o actualiza tablas automáticamente sin destruir datos |
| `create` | Crea el esquema desde cero cada vez. **Destruye datos existentes** |
| `create-drop` | Crea al iniciar, destruye al cerrar |

**Para desarrollo:** Usa `update`
**Para producción:** Usa `none` o `validate` + migraciones con Flyway/Liquibase

---

## Verificar Conexión

### Paso 1: Ejecutar la Aplicación

```bash
# Linux/Mac/WSL2
./mvnw spring-boot:run

# Windows CMD
mvnw.cmd spring-boot:run
```

### Paso 2: Ver los Logs

Deberías ver en la consola:

```
...
2025-11-06T10:30:00.123  INFO 12345 --- [  restartedMain] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-11-06T10:30:00.456  INFO 12345 --- [  restartedMain] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.6.33.Final
2025-11-06T10:30:01.789  INFO 12345 --- [  restartedMain] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-11-06T10:30:02.012  INFO 12345 --- [  restartedMain] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-11-06T10:30:02.345  INFO 12345 --- [  restartedMain] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2025-11-06T10:30:02.678  INFO 12345 --- [  restartedMain] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@12345678
2025-11-06T10:30:02.901  INFO 12345 --- [  restartedMain] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2025-11-06T10:30:03.234  INFO 12345 --- [  restartedMain] org.hibernate.dialect.Dialect            : HHH000400: Using dialect: org.hibernate.dialect.PostgreSQLDialect
2025-11-06T10:30:04.567  INFO 12345 --- [  restartedMain] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)

Hibernate: create sequence producto_sequence start with 1 increment by 1

Hibernate: create table productos (
    id bigint not null,
    descripcion varchar(500),
    fecha_actualizacion timestamp(6),
    fecha_creacion timestamp(6) not null,
    nombre varchar(100) not null,
    precio numeric(10,2) not null,
    stock integer not null,
    primary key (id)
)

2025-11-06T10:30:05.890  INFO 12345 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http)
2025-11-06T10:30:06.123  INFO 12345 --- [  restartedMain] c.u.p.ProductosApiApplication           : Started ProductosApiApplication in 6.789 seconds
```

### Indicadores de Éxito

**"HikariPool-1 - Start completed"** → Pool de conexiones iniciado
**"Using dialect: org.hibernate.dialect.PostgreSQLDialect"** → Hibernate detectó PostgreSQL
**"create sequence producto_sequence"** → Hibernate creó la secuencia para los IDs
**"create table productos"** → Hibernate creó la tabla automáticamente
**"Tomcat started on port 8080"** → Servidor web iniciado correctamente

### Paso 3: Verificar la Tabla en PostgreSQL

**Desde `psql`:**

```bash
# Conectar a PostgreSQL
psql -U postgres -d productosdb

# O en WSL2:
sudo -u postgres psql -d productosdb
```

**Dentro de `psql`:**

```sql
-- Listar todas las tablas
\dt

-- Deberías ver:
--         List of relations
--  Schema |   Name    | Type  |  Owner
-- --------+-----------+-------+----------
--  public | productos | table | postgres

-- Describir la estructura de la tabla
\d productos

-- Deberías ver:
--                        Table "public.productos"
--       Column        |          Type          | Collation | Nullable | Default
-- --------------------+------------------------+-----------+----------+---------
--  id                 | bigint                 |           | not null |
--  descripcion        | character varying(500) |           |          |
--  fecha_actualizacion| timestamp(6)           |           |          |
--  fecha_creacion     | timestamp(6)           |           | not null |
--  nombre             | character varying(100) |           | not null |
--  precio             | numeric(10,2)          |           | not null |
--  stock              | integer                |           | not null |
-- Indexes:
--     "productos_pkey" PRIMARY KEY, btree (id)

-- Verificar que la tabla está vacía
SELECT * FROM productos;
-- (0 rows)

-- Salir
\q
```

---

## Insertar Datos de Prueba

### Método 1: Desde Postman (Recomendado)

En el siguiente documento (`04-testing-postman.md`) aprenderás a insertar productos usando la API REST.

### Método 2: Desde SQL Directamente

Si quieres insertar datos de prueba directamente en la base de datos:

```bash
# Conectar a PostgreSQL
psql -U postgres -d productosdb
```

```sql
-- Insertar productos de prueba
-- Nota: No incluimos 'id' porque PostgreSQL lo genera automáticamente con IDENTITY
INSERT INTO productos (nombre, descripcion, precio, stock, fecha_creacion, fecha_actualizacion)
VALUES
  ('Laptop Dell XPS 15', 'Laptop de alto rendimiento con procesador Intel i9', 1500.00, 10, NOW(), NOW()),
  ('Mouse Logitech MX Master 3', 'Mouse ergonómico inalámbrico', 99.99, 50, NOW(), NOW()),
  ('Teclado Mecánico Keychron K2', 'Teclado mecánico compacto con switches Gateron', 89.00, 30, NOW(), NOW()),
  ('Monitor LG UltraWide 34"', 'Monitor curvo 21:9 para productividad', 499.99, 15, NOW(), NOW()),
  ('Webcam Logitech C920', 'Webcam Full HD 1080p con micrófono', 79.99, 25, NOW(), NOW());

-- Verificar
SELECT id, nombre, precio, stock FROM productos;

-- Salir
\q
```

### Método 3: Usar un Script SQL

Crea un archivo `datos-prueba.sql`:

```sql
-- Archivo: datos-prueba.sql
-- Insertar productos de prueba

-- Nota: No incluimos 'id' porque PostgreSQL lo genera automáticamente con IDENTITY
INSERT INTO productos (nombre, descripcion, precio, stock, fecha_creacion, fecha_actualizacion)
VALUES
  ('Laptop Dell XPS 15', 'Laptop de alto rendimiento con procesador Intel i9', 1500.00, 10, NOW(), NOW()),
  ('Mouse Logitech MX Master 3', 'Mouse ergonómico inalámbrico', 99.99, 50, NOW(), NOW()),
  ('Teclado Mecánico Keychron K2', 'Teclado mecánico compacto con switches Gateron', 89.00, 30, NOW(), NOW()),
  ('Monitor LG UltraWide 34"', 'Monitor curvo 21:9 para productividad', 499.99, 15, NOW(), NOW()),
  ('Webcam Logitech C920', 'Webcam Full HD 1080p con micrófono', 79.99, 25, NOW(), NOW()),
  ('Auriculares Sony WH-1000XM4', 'Auriculares con cancelación de ruido activa', 349.99, 20, NOW(), NOW()),
  ('SSD Samsung 970 EVO 1TB', 'SSD NVMe M.2 de alta velocidad', 129.99, 40, NOW(), NOW()),
  ('RAM Corsair Vengeance 32GB', 'Memoria RAM DDR4 3200MHz (2x16GB)', 149.99, 35, NOW(), NOW());
```

Ejecutar el script:

```bash
# Windows
psql -U postgres -d productosdb -f datos-prueba.sql

# WSL2
sudo -u postgres psql -d productosdb -f datos-prueba.sql
```

---

## Troubleshooting

### Error: "FATAL: password authentication failed for user postgres"

**Causa:** Contraseña incorrecta.

**Solución:**

1. Verifica que la contraseña en `application.properties` sea la correcta
2. Si olvidaste la contraseña, puedes cambiarla:

```bash
# WSL2
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'nueva_contraseña';
\q

# Windows: Usa pgAdmin 4 o reinstala PostgreSQL
```

### Error: "Connection to localhost:5432 refused"

**Causa:** PostgreSQL no está corriendo.

**Solución:**

**Windows:**
1. Abre **Servicios** (busca `services.msc` en el menú Inicio)
2. Busca **"postgresql-x64-16"**
3. Clic derecho → **Iniciar**

**WSL2:**
```bash
sudo service postgresql start
sudo service postgresql status
```

### Error: "database productosdb does not exist"

**Causa:** No creaste la base de datos.

**Solución:**

```bash
# Conectar a PostgreSQL
psql -U postgres  # o: sudo -u postgres psql

# Crear la base de datos
CREATE DATABASE productosdb;
\q
```

### Error: "Hibernate: create table productos" no aparece

**Causa:** La tabla ya existe o `ddl-auto` está en `none`.

**Solución:**

1. Verifica `application.properties`:
```properties
spring.jpa.hibernate.ddl-auto=update
```

2. Si quieres recrear la tabla desde cero:
```sql
-- Conectar a psql
psql -U postgres -d productosdb

-- Eliminar la tabla
DROP TABLE IF EXISTS productos CASCADE;
DROP SEQUENCE IF EXISTS producto_sequence CASCADE;
\q

-- Reiniciar la aplicación Spring Boot
```

### Error: "Port 5432 is already in use"

**Causa:** Ya hay una instancia de PostgreSQL corriendo.

**Solución:**

**Windows:**
```powershell
# Ver qué está usando el puerto
netstat -ano | findstr :5432

# Matar el proceso (reemplaza PID)
taskkill /PID <PID> /F
```

**WSL2:**
```bash
# Ver qué está usando el puerto
sudo lsof -i :5432

# Matar el proceso
sudo kill <PID>
```

### Logs muestran "HHH90000025: PostgreSQLDialect does not need to be specified"

**Causa:** Warning normal de Hibernate. Spring Boot detecta automáticamente el dialecto.

**Solución:** Puedes ignorarlo o quitar la línea del `application.properties`:
```properties
# Esta línea es opcional (Hibernate la detecta automáticamente)
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

---

## Código Final

### application.properties (Configuración Completa)

**Ruta:** `src/main/resources/application.properties`

```properties
# ============================================================
# CONFIGURACIÓN DE LA BASE DE DATOS POSTGRESQL
# ============================================================

# URL de conexión a PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/productosdb

# Usuario de PostgreSQL
spring.datasource.username=postgres

# Contraseña de PostgreSQL
spring.datasource.password=postgres

# Driver JDBC de PostgreSQL
spring.datasource.driver-class-name=org.postgresql.Driver

# ============================================================
# CONFIGURACIÓN DE JPA/HIBERNATE
# ============================================================

# Dialecto de PostgreSQL (OPCIONAL - detectado automáticamente)
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Estrategia de generación del esquema
# update: Actualiza el esquema automáticamente (DESARROLLO)
# none: No hace nada (PRODUCCIÓN)
spring.jpa.hibernate.ddl-auto=update

# Mostrar las consultas SQL en la consola
spring.jpa.show-sql=true

# Formatear las consultas SQL
spring.jpa.properties.hibernate.format_sql=true

# ============================================================
# CONFIGURACIÓN DEL SERVIDOR
# ============================================================

# Puerto del servidor
server.port=8080

# ============================================================
# CONFIGURACIÓN DE LOGGING
# ============================================================

# Nivel de logging para SQL
logging.level.org.hibernate.SQL=DEBUG

# Mostrar valores de parámetros en SQL
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

# Nivel de logging de la aplicación
logging.level.com.universidad.productosapi=DEBUG
```

### datos-prueba.sql (Script de Datos de Prueba)

**Ruta:** Crea este archivo en la raíz del proyecto

```sql
-- ============================================================
-- SCRIPT DE DATOS DE PRUEBA PARA LA TABLA PRODUCTOS
-- ============================================================
-- Ejecutar con: psql -U postgres -d productosdb -f datos-prueba.sql

-- Limpiar datos existentes (opcional)
TRUNCATE TABLE productos RESTART IDENTITY CASCADE;

-- Insertar productos de prueba
-- Nota: No incluimos 'id' porque PostgreSQL lo genera automáticamente con IDENTITY
INSERT INTO productos (nombre, descripcion, precio, stock, fecha_creacion, fecha_actualizacion)
VALUES
  ('Laptop Dell XPS 15', 'Laptop de alto rendimiento con procesador Intel i9 y 32GB RAM', 1500.00, 10, NOW(), NOW()),
  ('Mouse Logitech MX Master 3', 'Mouse ergonómico inalámbrico con tecnología Darkfield', 99.99, 50, NOW(), NOW()),
  ('Teclado Mecánico Keychron K2', 'Teclado mecánico compacto 75% con switches Gateron', 89.00, 30, NOW(), NOW()),
  ('Monitor LG UltraWide 34"', 'Monitor curvo 21:9 WQHD para productividad', 499.99, 15, NOW(), NOW()),
  ('Webcam Logitech C920', 'Webcam Full HD 1080p con micrófono estéreo', 79.99, 25, NOW(), NOW()),
  ('Auriculares Sony WH-1000XM4', 'Auriculares bluetooth con cancelación de ruido activa', 349.99, 20, NOW(), NOW()),
  ('SSD Samsung 970 EVO 1TB', 'SSD NVMe M.2 de alta velocidad 3500 MB/s', 129.99, 40, NOW(), NOW()),
  ('RAM Corsair Vengeance 32GB', 'Memoria RAM DDR4 3200MHz Kit (2x16GB)', 149.99, 35, NOW(), NOW()),
  ('Silla Ergonómica Herman Miller Aeron', 'Silla de oficina ergonómica con soporte lumbar', 1299.00, 8, NOW(), NOW()),
  ('Hub USB-C Anker 7 en 1', 'Hub USB-C con HDMI, USB 3.0 y lector SD', 49.99, 60, NOW(), NOW());

-- Verificar inserción
SELECT COUNT(*) as total_productos FROM productos;
SELECT id, nombre, precio, stock FROM productos ORDER BY id;
```

### Comandos Útiles de PostgreSQL

```sql
-- COMANDOS BÁSICOS DE PSQL

-- Listar todas las bases de datos
\l

-- Conectar a una base de datos
\c productosdb

-- Listar todas las tablas
\dt

-- Describir estructura de una tabla
\d productos

-- Listar todas las secuencias
\ds

-- Ver usuarios
\du

-- Ver tamaño de la base de datos
SELECT pg_size_pretty(pg_database_size('productosdb'));

-- Ver número de filas en la tabla
SELECT COUNT(*) FROM productos;

-- Salir de psql
\q

-- QUERIES ÚTILES

-- Listar todos los productos
SELECT * FROM productos;

-- Buscar por nombre
SELECT * FROM productos WHERE nombre LIKE '%Laptop%';

-- Ordenar por precio descendente
SELECT * FROM productos ORDER BY precio DESC;

-- Top 5 productos más caros
SELECT nombre, precio FROM productos ORDER BY precio DESC LIMIT 5;

-- Productos con poco stock (< 20)
SELECT nombre, stock FROM productos WHERE stock < 20;

-- Actualizar stock de un producto
UPDATE productos SET stock = 100 WHERE id = 1;

-- Eliminar un producto
DELETE FROM productos WHERE id = 1;

-- Resetear secuencia
ALTER SEQUENCE producto_sequence RESTART WITH 1;
```

---


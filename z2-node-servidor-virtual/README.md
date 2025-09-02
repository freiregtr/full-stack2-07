# Tutorial Rapido: Como Levantar un Servidor Virtual con Node.js

Guia super simple para levantar tu primer servidor web con Node.js en Windows (PowerShell) o Linux (WSL2). Sin complicaciones, paso a paso.

## Lo que vas a lograr

Despues de seguir esta guia tendras:
- Un servidor Node.js corriendo en tu maquina  
- Express configurado para manejar rutas
- Todo funcionando en menos de 15 minutos
- Base solida para cualquier proyecto web

## Lo que necesitas antes de empezar

- Una computadora con Windows 10/11
- Conexion a internet
- 15 minutos de tiempo libre
- Ganas de aprender algo nuevo

---

## Opcion 1: Windows con PowerShell

### PASO 1: Instalar Node.js

1. **Verificar si ya tienes Node.js instalado:**
```powershell
node --version
npm --version
```

Si ves numeros de version, ya lo tienes. Si no, continua:

2. **Descargar e instalar Node.js:**
- Ve a https://nodejs.org/
- Descarga la version LTS (Long Term Support)
- Ejecuta el archivo .msi que se descargo
- Sigue el wizard de instalacion (todo por defecto esta bien)
- **IMPORTANTE:** Reinicia PowerShell completamente

3. **Verificar que funcione:**
```powershell
node --version
npm --version
```

Deberias ver algo conmo:
```
v20.10.0
10.2.3
```

### PASO 2: Crear tu primer servidor

1. **Crear carpeta para el proyecto:**
```powershell
# Ir al escritorio (o donde quieras)
cd Desktop

# Crear carpeta
mkdir mi-servidor-node
cd mi-servidor-node
```

2. **Inicializar proyecto Node.js:**
```powershell
npm init -y
```

Esto crea un archivo `package.json` con la configuracion basica.

3. **Instalar Express (framework web):**
```powershell
npm install express
npm install --save-dev nodemon
```

Express es el framework mas popular para crear servidores web en Node.js. Nodemon reinicia automaticamente el servidor cuando cambias el codigo.

4. **Crear archivo del servidor:**

Crea un archivo llamado `server.js`:

```javascript
// Mi primer servidor con Express
const express = require('express');
const app = express();
const PORT = 3000;

// Ruta principal
app.get('/', (req, res) => {
    res.send(`
        <h1>Mi Servidor Node.js Funciona!</h1>
        <p>Hola desde tu servidor virtual</p>
        <p>Puerto: ${PORT}</p>
    `);
});

// Ruta de prueba
app.get('/api/saludo', (req, res) => {
    res.json({
        mensaje: 'Hola desde tu API!',
        fecha: new Date(),
        servidor: 'Node.js + Express'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`=== SERVIDOR INICIADO ===`);
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Presiona CTRL+C para detener`);
    console.log(`========================`);
});
```

5. **Modificar package.json para scripts:**

Abre `package.json` y agrega estos scripts:

```json
{
  "name": "mi-servidor-node",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

6. **Levantar el servidor:**
```powershell
# Modo desarrollo (se reinicia solo cuando cambias codigo)
npm run dev

# O modo produccion
npm start
```

7. **Probar que funciona:**
- Abre tu navegador
- Ve a http://localhost:3000
- Deberias ver "Mi Servidor Node.js Funciona!"
- Tambien prueba http://localhost:3000/api/saludo

---

## Opcion 2: WSL2 Ubuntu (Linux en Windows)

### PASO 1: Configurar WSL2

1. **Habilitar WSL2 si no lo tienes:**
```powershell
# En PowerShell como administrador:
wsl --install
```

Reinicia Windows despues de esto.

2. **Entrar a WSL2:**
```powershell
wsl
```

Ahora estas en Linux dentro de Windows.

### PASO 2: Instalar Node.js en Linux

1. **Instalar NVM (Node Version Manager) - RECOMENDADO:**
```bash
# Descargar e instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recargar terminal
source ~/.bashrc
```

2. **Instalar Node.js LTS:**
```bash
# Instalar version estable
nvm install --lts
nvm use --lts

# Verificar
node --version
npm --version
```

### PASO 3: Crear servidor en WSL2

1. **Navegar a tu carpeta de proyectos:**
```bash
# Crear carpeta en tu home
cd ~
mkdir proyectos
cd proyectos

# Crear proyecto
mkdir mi-servidor-node
cd mi-servidor-node
```

2. **Mismo proceso que en Windows:**
```bash
# Inicializar proyecto
npm init -y

# Instalar dependencias  
npm install express
npm install --save-dev nodemon
```

3. **Crear server.js con el mismo contenido de arriba**

4. **Modificar package.json igual que antes**

5. **Levantar servidor:**
```bash
npm run dev
```

6. **Acceder desde Windows:**
- Abre navegador en Windows
- Ve a http://localhost:3000
- Funciona igual que en PowerShell!

---

## Comandos Utiles

### PowerShell:
```powershell
# Ver procesos en puerto 3000
netstat -ano | findstr :3000

# Matar proceso si el puerto esta ocupado
taskkill /PID <numero_pid> /F

# Ver version de Node
node --version
```

### WSL2/Linux:
```bash
# Ver procesos en puerto 3000  
lsof -i :3000

# Matar proceso
kill -9 <pid>

# Ver puertos ocupados
netstat -tulpn | grep :3000
```

---

## Solucion de Problemas Comunes

### ERROR: "node no se reconoce como comando"
**Solucion:** Node.js no esta instalado o no esta en el PATH
- Reinstala Node.js desde nodejs.org
- Reinicia completamente PowerShell/CMD

### ERROR: "Puerto 3000 ya esta en uso" 
**Solucion:** Hay otro proceso usando ese puerto
```powershell
# Windows
netstat -ano | findstr :3000
taskkill /PID <numero> /F

# Linux/WSL2
lsof -i :3000
kill -9 <pid>
```

### ERROR: "Cannot find module 'express'"
**Solucion:** Express no esta instalado
```bash
npm install express
```

### WSL2 no conecta desde navegador Windows
**Solucion:** WSL2 deberia funcionar automaticamente. Si no:
- Usa la IP de WSL2: `ip addr show eth0`
- O configura port forwarding

---

## Siguientes Pasos

Una vez que tengas tu servidor basico funcionando:

1. **Agregar mas rutas:**
```javascript
app.get('/api/usuarios', (req, res) => {
    res.json([
        { id: 1, nombre: 'Juan' },
        { id: 2, nombre: 'Maria' }
    ]);
});
```

2. **Servir archivos estaticos:**
```javascript
app.use(express.static('public'));
```

3. **Manejar datos POST:**
```javascript
app.use(express.json());

app.post('/api/datos', (req, res) => {
    console.log(req.body);
    res.json({ mensaje: 'Datos recibidos' });
});
```

4. **Conectar con base de datos (MongoDB, MySQL, etc)**

5. **Deploy a un servidor real (Heroku, Railway, Render)**

---

## Resumen

Felicitaciones! Ya tienes un servidor Node.js funcionando. Esto es la base para:
- APIs REST
- Aplicaciones web completas
- Microservicios
- Y mucho mas

La combinacion Node.js + Express es una de las mas populares del mundo para desarrollo web. Con esta base ya puedes construir practicamente cualquier aplicacion web.

**Siguente nivel:** Agrega una base de datos y tienes un backend completo listo para produccion.
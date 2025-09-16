# Configuracion Inicial - React con Bootstrap

## Paso 1: Verificar node.js

Antes de empezar, necesitas tener Node.js instalado. Para verificar que lo tienes:

```bash
node --version
npm --version
```

Deberias ver algo como:
```
v18.17.0
9.6.7
```

Si no tienes node.js instalado, descargalo desde [nodejs.org](https://nodejs.org/)

**Importante**: Recomendamos usar node.js version 16 o superior para evitar problemas de compatibilidad

## Paso 2: Crear el proyecto react

Abre la terminal y navega hasta la carpeta donde quieres crear tu proyecto. luego ejecuta:

```bash
npx create-react-app my-ecommerce-app
```

Este comando va a:
- Descargar todas las dependencias necesarias
- Crear la estructura basica del proyecto
- Configurar herramientas de desarrollo

**Nota**: Puede tomar varios minutos dependiendo de la conexion a internet de duoc o de tu casa

## Paso 3: Navegar al proyecto

Una vez que termine la instalacion:

```bash
cd my-ecommerce-app
```

## Paso 4: Instalar react bootstrap

Ahora vamos a instalar las dependencias que necesitamos para usar bootstrap:

```bash
npm install react-bootstrap bootstrap
```

Esto instala:
- **react-bootstrap**: Componentes Bootstrap específicos para React
- **bootstrap**: Los estilos CSS de Bootstrap

## Paso 5: Configurar bootstrap

Necesitamos importar los estilos de Bootstrap en nuestro proyecto. Abre el archivo `src/index.js` y agrega esta linea **al principio del archivo**:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

El archivo `src/index.js` deberia verse asi:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```

## Paso 6: Probar que todo funciona

Vamos a probar que la instalacion funciona correctamente:

```bash
npm start
```

Esto deberia:
1. Iniciar el servidor de desarrollo
2. Abrir automaticamente tu navegador en http://localhost:3000
3. Mostrar la pagina de bienvenida de react

Si ves el logo de react girando, todo esta funcionando como debe ser

Para detener el servidor, presiona `Ctrl + C` en la terminal

## Paso 7: Crear estructura de carpetas o directorios

Ahora vamos a organizar nuestro proyecto creando una carpeta para los componentes:

```bash
mkdir src/components
```

También vamos a crear los archivos vacios para nuestros componentes:

```bash
touch src/components/Navbar.js
touch src/components/ProductList.js
touch src/components/ShoppingCart.js
touch src/components/RegistrationForm.js
```

Si estás en Windows y no tienes `touch`, puedes crear los archivos vacios manualmente desde tu editor de codigo.

## Paso 8: Verificar la estructura

Tu proyecto deberia tener esta estructura:

```
my-ecommerce-app/
├── node_modules/          (carpeta con las dependencias)
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/        (nueva carpeta)
│   │   ├── Navbar.js      (archivo vacio)
│   │   ├── ProductList.js (archivo vacio)
│   │   ├── ShoppingCart.js (archivo vacio)
│   │   └── RegistrationForm.js (archivo vacio)
│   ├── App.js
│   ├── index.js          (con Bootstrap importado)
│   └── ...
├── package.json
└── README.md
```

## Troubleshooting comun

### Error: "command not found: npx"
Si obtienes este error, significa que tu version de npm es muy antigua. actualiza npm:
```bash
npm install -g npm@latest
```

### Error: Puerto 3000 ocupado
Si el puerto 3000 esta ocupado, puedes usar otro puerto:
```bash
PORT=3001 npm start
```

### Error: permission denied (en WSL2/Linux)
Si tienes problemas de permisos, puedes necesitar usar sudo:
```bash
sudo npm install -g create-react-app
```

### npm install toma mucho tiempo
Esto es normal la primera vez. Si se cuelga, prueba:
```bash
npm clear cache --force
npm install
```

## Proximos pasos

Ahora que tienes todo configurado, puedes continuar a [03-COMPONENTS.md](./03-COMPONENTS.md) para empezar a crear los componentes de la aplicacion de ejemplo

## Tips Adicionales

- **Guarda todo**: Siempre guarda tu trabajo antes de continuar
- **Un paso a la vez**: No te apresures, cada paso es importante
- **Lee los errores**: Los mensajes de error te dicen que está mal
- **Usa Git**: Considera inicializar un repositorio git para tu proyecto como lo hemos visto en clases
  ```bash
  git init
  git add .
  git commit -m "Configuracion inicial del proyecto React"
  ```
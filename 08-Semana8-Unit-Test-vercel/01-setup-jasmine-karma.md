# Setup: Jasmine y Karma para Testing en React

**Basado en documentación oficial y patrones verificados:**
- [Karma Official Documentation](http://karma-runner.github.io/6.4/intro/installation.html)
- [karma-webpack npm package](https://www.npmjs.com/package/karma-webpack)
---

## Introducción

### ¿Qué es Jasmine?

**Jasmine** es un **framework de testing** para JavaScript. Te permite escribir tests con una sintaxis clara.

```javascript
describe('Calculadora', () => {
  it('debe sumar dos números correctamente', () => {
    const resultado = 2 + 3;
    expect(resultado).toBe(5);
  });
});
```

### ¿Qué es Karma?

**Karma** es un **test runner**. Ejecuta tus tests en navegadores reales como Chrome.

### ¿Por qué van juntos?

| Herramienta | Función |
|-------------|---------|
| **Jasmine** | Framework (escribes los tests) |
| **Karma** | Test runner (ejecuta los tests) |

**Flujo:**
```
1. Escribes tests con Jasmine → Login.spec.jsx
2. Karma ejecuta en Chrome → Muestra resultados
```

---

## Setup Paso a Paso

### Paso 1: Crear proyecto React

**En Git Bash (Windows Desktop):**

```bash
# Ir al Desktop
cd ~/Desktop

# Crear proyecto React
npx create-react-app login-app

# Entrar al proyecto
cd login-app
```

---

### Paso 2: Instalar dependencias

**A) Dependencias oficiales de Karma**

```bash
npm install karma --save-dev
npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
```

**B) Dependencias adicionales para React**

Las dependencias oficiales solo funcionan con JavaScript puro. Para React (JSX), necesitas:

```bash
npm install --save-dev karma-webpack babel-loader style-loader css-loader
```

**Resumen de lo que instalamos:**

| Paquete | Para qué |
|---------|----------|
| `karma` | Test runner |
| `jasmine-core` | Framework de testing |
| `karma-jasmine` | Conecta Jasmine con Karma |
| `karma-chrome-launcher` | Ejecuta tests en Chrome |
| `karma-webpack` | Procesa archivos JSX con Webpack |
| `babel-loader` | Transpila JSX a JavaScript |
| `style-loader` | Inyecta CSS en el DOM |
| `css-loader` | Procesa imports de CSS |

**¿Qué NO instalamos?**

Create React App ya incluye:
- `webpack`
- `@babel/core`
- `@babel/preset-env`
- `@babel/preset-react`

---

## Cómo Crear Archivos y Carpetas
### Opción 1: Git Bash

```bash
# Crear archivo vacío
touch nombre-archivo.js

# Crear carpeta
mkdir nombre-carpeta

# Abrir archivo en vs code
code nombre-archivo.js
```

---

### Paso 3: Configurar Babel

**En Git Bash:**

```bash
# Crear archivo .babelrc
touch .babelrc

# Abrir en VS Code para editarlo
code .babelrc
```

**Copiar este contenido en el archivo `.babelrc`:**

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

**Guardar el archivo**

**¿Para qué?** Babel convierte JSX a JavaScript que los navegadores entienden.

---

### Paso 4: Crear archivo de tests bundle

**En Git Bash:**

```bash
# Crear archivo tests.bundle.js
touch tests.bundle.js

# Abrir en VS Code
code tests.bundle.js
```

**Copiar este contenido en `tests.bundle.js`:**

```javascript
// Este archivo carga todos los tests automáticamente
var context = require.context('./src', true, /\.spec\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
```

**Guardar el archivo**

**¿Para que?**

Este patrón es la forma recomendada de cargar tests con Karma + Webpack. En lugar de listar manualmente cada archivo de test en karma.conf.js, este archivo usa `require.context` de Webpack para:

1. Buscar automáticamente todos los archivos `.spec.js` y `.spec.jsx` en la carpeta `src/`
2. Cargarlos dinámicamente
3. Evitar conflictos con otros archivos (como `App.test.js` de Jest)

---

### Paso 5: Configurar Karma

**En Git Bash:**

```bash
# Crear archivo karma.conf.js
touch karma.conf.js
```

**Copiar este contenido en `karma.conf.js`:**

```javascript
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'tests.bundle.js'
    ],

    // Solo procesa tests.bundle.js con webpack
    preprocessors: {
      'tests.bundle.js': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: { loader: 'babel-loader' }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      devtool: 'inline-source-map'
    },

    browsers: ['Chrome'],
    singleRun: false,
    autoWatch: true,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
```

**Guardar el archivo**

---

### Paso 6: Agregar scripts en package.json

Abrir el archivo `package.json` y buscar la sección `"scripts"`.

Agregar estas DOS líneas **después de** `"test": "react-scripts test",`:

```json
"test:karma": "karma start",
"test:karma-ci": "karma start --single-run",
```

**Resultado final:**

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "test:karma": "karma start",
    "test:karma-ci": "karma start --single-run",
    "eject": "react-scripts eject"
  }
}
```

**Explicación:**
- `test:karma`: Ejecuta Karma en modo watch (detecta cambios)
- `test:karma-ci`: Ejecuta una vez y termina (para CI/CD)

---

## Verificar que Funciona

### 1. Crear un test de ejemplo

**¿Qué hace este test?**

Este test verifica que Jasmine y Karma están funcionando correctamente. No testea código real de la aplicación, solo confirma que el entorno de testing está bien configurado haciendo dos pruebas simples: una verificación básica (true es true) y una operación matemática (2 + 2 = 4).

**En Git Bash:**

```bash
# Crear carpeta __tests__
mkdir src/__tests__

# Crear archivo example.spec.js
touch src/__tests__/example.spec.js

# Abrir en VS Code
code src/__tests__/example.spec.js
```

**Copiar este contenido en `src/__tests__/example.spec.js`:**

```javascript
describe('Test básico de Jasmine', () => {
  it('debe pasar este test simple', () => {
    expect(true).toBe(true);
  });

  it('debe sumar correctamente', () => {
    const suma = 2 + 2;
    expect(suma).toBe(4);
  });
});
```

**Guardar el archivo** (Ctrl+S).

**Explicación de las funciones:**

- **`describe()`**: Agrupa tests relacionados. Recibe dos parámetros: el nombre del grupo (string) y una función que contiene todos los tests.

- **`it()`**: Define un test individual. Recibe dos parámetros: la descripción de qué debe hacer el test (string) y una función con el código del test.

- **`expect()`**: Crea una expectativa sobre un valor. Le pasas el valor que quieres verificar.

- **`toBe()`**: Es un "matcher" que verifica igualdad estricta (===). Compara si el valor de `expect()` es igual al valor dentro de `toBe()`.

### 2. Ejecutar tests

```bash
npm run test:karma
```

**Salida esperada:**
```
Chrome 120.0.0.0 (Linux): Executed 2 of 2 SUCCESS (0.045 secs / 0.002 secs)
```

Si ves esto, el setup está completo.

---

## Estructura Final del Proyecto

```
login-app/
├── node_modules/
├── public/
├── src/
│   ├── components/  
│   │   ├── Login.jsx
│   │   └── Login.css
│   ├── __tests__/
│   │   └── example.spec.js 
│   ├── App.jsx
│   └── index.jsx
├── .babelrc           
├── tests.bundle.js    
├── karma.conf.js      
├── package.json              
└── README.md
```

**Nota**: El archivo `tests.bundle.js` es crítico. Sin él, Karma no encontrará tus tests.

---
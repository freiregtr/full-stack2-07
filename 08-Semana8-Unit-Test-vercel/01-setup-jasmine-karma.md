# Setup: Jasmine y Karma para Testing en React

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
1. Escribes tests con Jasmine → Login.spec.js
2. Karma ejecuta en Chrome → Muestra resultados
```

---

## Setup Paso a Paso

### Paso 1: Crear proyecto React

```bash
cd 08-Semana8-Unit-Test-vercel
npx create-react-app login-app
cd login-app
```

---

### Paso 2: Instalar dependencias

**A) Dependencias oficiales de Karma**

Según la [documentación oficial de Karma](http://karma-runner.github.io/6.4/intro/installation.html):

```bash
npm install karma --save-dev
npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
```

**B) Dependencias adicionales para React**

Las dependencias oficiales solo funcionan con JavaScript puro. Para React (JSX), necesitas:

```bash
npm install --save-dev karma-webpack babel-loader @testing-library/react @testing-library/jest-dom
```

**Resumen de lo que instalamos:**

| Paquete | Para qué |
|---------|----------|
| `karma` | Test runner |
| `jasmine-core` | Framework de testing |
| `karma-jasmine` | Conecta Jasmine con Karma |
| `karma-chrome-launcher` | Ejecuta tests en Chrome |
| `karma-webpack` | Procesa archivos JSX |
| `babel-loader` | Transpila JSX a JavaScript |
| `@testing-library/react` | Testea componentes React |
| `@testing-library/jest-dom` | Matchers adicionales |

**¿Qué NO instalamos?**

Create React App ya incluye:
- `webpack`
- `@babel/core`
- `@babel/preset-env`
- `@babel/preset-react`

---

### Paso 3: Configurar Babel

Crear archivo `.babelrc` en la raíz del proyecto:

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

**¿Para qué?** Babel convierte JSX a JavaScript que los navegadores entienden.

---

### Paso 4: Configurar Karma

Crear archivo `karma.conf.js` en la raíz del proyecto:

```javascript
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'src/**/*.spec.js',
      'src/**/*.spec.jsx',
      'src/**/*.js',
      'src/**/*.jsx'
    ],

    preprocessors: {
      'src/**/*.js': ['webpack'],
      'src/**/*.jsx': ['webpack']
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

---

### Paso 5: Agregar scripts en package.json

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

Crear carpeta y archivo: `src/__tests__/example.spec.js`

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
│   ├── components/           (crearemos después)
│   │   ├── Login.jsx
│   │   └── Login.css
│   ├── __tests__/
│   │   └── example.spec.js   (✓ creado)
│   ├── App.jsx
│   └── index.jsx
├── .babelrc                  (✓ creado)
├── karma.conf.js             (✓ creado)
├── package.json              (✓ modificado)
└── README.md
```

---

## Comandos Útiles

```bash
# Iniciar app React
npm start

# Ejecutar tests (watch mode)
npm run test:karma

# Ejecutar tests una vez
npm run test:karma-ci

# Ver versiones instaladas
npm list karma jasmine-core
```

---

## Troubleshooting

### Error: "Chrome not found"

```bash
# Ubuntu/Debian
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

### Error: "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Karma timeout"

Editar `karma.conf.js` y agregar dentro de `config.set({...})`:

```javascript
browserNoActivityTimeout: 60000,
captureTimeout: 60000
```

---

## Apéndice: Conceptos Técnicos

### ¿Qué es Babel?

**Babel** es un transpilador. Convierte código moderno (JSX, ES6+) a JavaScript compatible.

**Ejemplo:**

```javascript
// Lo que escribes (JSX):
const elemento = <div>Hola Mundo</div>;

// Lo que el navegador ejecuta (JavaScript):
const elemento = React.createElement('div', null, 'Hola Mundo');
```

### ¿Por qué necesitamos Babel?

Los navegadores no entienden JSX porque no es parte del lenguaje JavaScript oficial. JSX fue creado por React.

**Flujo:**
```
Tu código JSX → Babel transpila → JavaScript puro → Chrome ejecuta → Tests corren
```

### ¿Qué son los presets de Babel?

Los presets son conjuntos de plugins:

- `@babel/preset-env`: Transpila JavaScript moderno (ES6+) a ES5
- `@babel/preset-react`: Transpila JSX a JavaScript

### package.json resultante

Después de los pasos anteriores, tu `package.json` debe verse así:

```json
{
  "name": "login-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "karma": "^6.4.2",
    "jasmine-core": "^5.1.0",
    "karma-jasmine": "^5.1.0",
    "karma-chrome-launcher": "^3.2.0",
    "karma-webpack": "^5.0.0",
    "babel-loader": "^9.1.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0"
  },
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

---

## Resumen

En este documento aprendiste:

1. Qué es Jasmine y Karma
2. Por qué van juntos
3. Cómo crear un proyecto React con testing
4. Cómo instalar y configurar todo
5. Cómo verificar que funciona

**Siguiente paso:** En `02-componente-login.md` crearemos el componente de Login responsivo estilo Google.

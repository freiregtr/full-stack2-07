# Semana 8: Testing Unitario con Jasmine y Karma en React

Este módulo te enseña a implementar testing unitario en aplicaciones React usando **Jasmine** (framework de testing) y **Karma** (test runner).

## Proyecto: Login con Testing Completo

Crearemos un componente de Login responsivo estilo Google y escribiremos tests unitarios completos para validar su funcionalidad.

---

## Estructura del Módulo

```
08-Semana8-Unit-Test-vercel/
├── README.md                       ← Estás aquí
├── 01-setup-jasmine-karma.md       ← Configuración inicial
├── 02-componente-login.md          ← Desarrollo del componente
├── 03-pruebas-unitarias.md         ← Tests con Jasmine/Karma
└── login-app/                      ← Proyecto React (a crear)
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   └── Login.css
    │   └── __tests__/
    │       └── Login.spec.js
    ├── karma.conf.js
    └── package.json
```

---

## Orden de Estudio

### 📚 Documento 1: Setup de Jasmine y Karma

**Archivo:** `01-setup-jasmine-karma.md`

**Aprenderás:**
- ¿Qué es Jasmine? (framework de testing)
- ¿Qué es Karma? (test runner)
- ¿Por qué van juntos?
- Crear proyecto React desde cero
- Instalar y configurar todas las dependencias
- Configurar Karma (karma.conf.js)
- Verificar que funciona correctamente

**Tiempo estimado:** 45 minutos

---

### 📚 Documento 2: Componente Login

**Archivo:** `02-componente-login.md`

**Aprenderás:**
- **Parte A**: Crear HTML + CSS puro (estructura del login)
- **Parte B**: Convertir a React JSX con interactividad
- Manejo de estados con useState
- Validaciones en tiempo real
- Diseño responsivo estilo Google
- Diferencias entre HTML y JSX

**Tiempo estimado:** 60 minutos

---

### 📚 Documento 3: Pruebas Unitarias

**Archivo:** `03-pruebas-unitarias.md`

**Aprenderás:**
- Anatomía de un test (describe, it, expect)
- Matchers de Jasmine (toBe, toEqual, toContain, etc.)
- Spies y mocks
- 25 tests completos para el Login
- Ejecutar tests con Karma
- Interpretar resultados
- Medir cobertura de código (coverage)
- Mejores prácticas de testing

**Tiempo estimado:** 90 minutos

---

## Inicio Rápido

### 1. Leer los documentos en orden

```bash
# Empezar aquí
01-setup-jasmine-karma.md
02-componente-login.md
03-pruebas-unitarias.md
```

### 2. Crear el proyecto (siguiendo documento 1)

```bash
cd 08-Semana8-Unit-Test-vercel
npx create-react-app login-app
cd login-app
npm install --save-dev jasmine-core karma karma-jasmine karma-chrome-launcher karma-webpack webpack karma-sourcemap-loader @babel/core @babel/preset-env @babel/preset-react babel-loader style-loader css-loader @testing-library/react @testing-library/jest-dom
```

### 3. Ejecutar la aplicación

```bash
npm start
```

### 4. Ejecutar los tests

```bash
npm run test:karma
```

---

## Objetivos de Aprendizaje

Al completar este módulo, serás capaz de:

- ✅ Explicar qué son Jasmine y Karma
- ✅ Configurar un proyecto React con testing
- ✅ Crear componentes React con validaciones
- ✅ Escribir tests unitarios descriptivos
- ✅ Usar matchers de Jasmine correctamente
- ✅ Implementar spies y mocks
- ✅ Ejecutar tests en watch mode
- ✅ Interpretar resultados de tests
- ✅ Medir cobertura de código
- ✅ Aplicar mejores prácticas de testing

---

## Herramientas Utilizadas

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| React | 18.x | Framework UI |
| Jasmine | 5.x | Framework de testing |
| Karma | 6.x | Test runner |
| Webpack | 5.x | Module bundler |
| Babel | 7.x | Transpilador JSX/ES6+ |
| React Testing Library | 14.x | Utilidades de testing |

---

## Comandos Útiles

```bash
# Crear proyecto React
npx create-react-app login-app

# Instalar dependencias de testing
npm install --save-dev jasmine-core karma karma-jasmine karma-chrome-launcher karma-webpack

# Ejecutar app en desarrollo
npm start

# Ejecutar tests (watch mode)
npm run test:karma

# Ejecutar tests una vez (CI)
npm run test:karma-ci

# Ver cobertura de código
npm run test:karma-ci && xdg-open coverage/index.html
```

---

## Recursos Adicionales

### Documentación Oficial
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)
- [React Testing Library](https://testing-library.com/react)
- [React Documentation](https://react.dev/)

### Testing Guides
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [AAA Pattern (Arrange-Act-Assert)](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/)

---

## FAQ

### ¿Por qué Jasmine y Karma en lugar de Jest?

**Jasmine + Karma** es una combinación tradicional muy usada en Angular y proyectos enterprise. Te enseña los fundamentos de testing y cómo funcionan los test runners. Jest es más moderno y simple, pero entender Jasmine/Karma te da una base sólida.

### ¿Puedo usar Jest en su lugar?

Sí, Jest es excelente y viene por defecto en Create React App. Sin embargo, este módulo está diseñado para enseñar Jasmine/Karma específicamente. Puedes aplicar los mismos conceptos en Jest.

### ¿Qué pasa si no tengo Chrome?

Karma puede usar otros navegadores. Edita `karma.conf.js` y cambia:
```javascript
browsers: ['Chrome'],  // a
browsers: ['Firefox'], // o
browsers: ['ChromeHeadless'], // para CI sin GUI
```

### ¿Cuánto coverage (cobertura) es suficiente?

La industria busca **80% o más** de cobertura. Sin embargo, no te obsesiones con el número. Es mejor tener 70% de tests de calidad que 100% de tests malos.

---

## Checklist de Progreso

- [ ] Leí `01-setup-jasmine-karma.md`
- [ ] Creé el proyecto React
- [ ] Instalé dependencias de Jasmine/Karma
- [ ] Configuré `karma.conf.js`
- [ ] Verifiqué que Karma funciona
- [ ] Leí `02-componente-login.md`
- [ ] Creé HTML + CSS del Login
- [ ] Convertí a React con estados
- [ ] Probé el componente manualmente
- [ ] Leí `03-pruebas-unitarias.md`
- [ ] Creé `Login.spec.js` con tests
- [ ] Ejecuté los tests con Karma
- [ ] Todos los tests pasaron (25/25)
- [ ] Medí cobertura de código

---

## Soporte y Ayuda

Si tienes problemas:

1. **Revisa la sección Troubleshooting** en cada documento
2. **Verifica las versiones** de las dependencias
3. **Consulta los logs** de Karma en la terminal
4. **Busca el error específico** en Google/Stack Overflow

---

## Licencia

Material educativo de uso libre para fines de aprendizaje.

---

¡Éxito en tu aprendizaje de testing! 🚀

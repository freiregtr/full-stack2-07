# Evaluación Parcial 2 - Desarrollo Fullstack II
## DSY1104 - Migración a React con Testing

---

## TABLA DE CONTENIDOS

1. [INFORMACIÓN GENERAL](#1-información-general)
2. [EL TRABAJO: MIGRACIÓN A REACT](#2-el-trabajo-migración-a-react)
3. [DOCUMENTO SRS](#3-documento-srs-especificación-de-requisitos-de-software)
4. [PRESENTACIÓN INDIVIDUAL](#4-presentación-individual)
5. [ENTREGA Y RÚBRICA](#5-entrega-y-rúbrica)

---

# 1. INFORMACIÓN GENERAL

## 1.1 Modalidad de Trabajo

- **Fecha de entrega:** 28-10-25
- **Trabajo en equipo:** Máximo 4 estudiantes
- **Lugar:** Taller de alto cómputo

## 1.2 Distribución de Evaluación

- **Situación Evaluativa 1** - Entrega de Encargo (Grupal): 40%
- **Situación Evaluativa 2** - Presentación (Individual): 60%
- **Total:** 30% de la nota final de la asignatura (EVA2)

## 1.3 Contexto

Continuarán trabajando en el proyecto semestral iniciado en la Evaluación Parcial 1. Migrarán su proyecto web desarrollado en HTML/CSS/JavaScript vanilla a **React**, integrando:
- Componentes React con props y states
- Validación de formularios
- Diseño responsivo con Bootstrap
- Pruebas unitarias

## 1.4 Entregables Obligatorios

1. **Enlace GitHub público** del proyecto
2. **Proyecto desplegado en Vercel** (URL activa)
3. **Proyecto comprimido (.zip)** - sin node_modules (usar .gitignore)
4. **Documento SRS en Word** (incluye sección de Testing)
   - Tabla de cobertura de testing en Excel (embebida o como anexo)

---

# 2. EL TRABAJO: MIGRACIÓN A REACT

## 2.1 Qué deben hacer

Migrar **TODO** su proyecto del Trabajo 1 (HTML/CSS/JS vanilla) a React.

### Requisitos Obligatorios según Rúbrica:

1. **Componentes React** con gestión de props y states
2. **Bootstrap** para diseño responsivo
3. **Formularios** con validación en JavaScript
4. **5-10 pruebas unitarias** con Jasmine/Karma
5. **Cobertura de testing ≥ 80%**

### Requisitos Opcionales:

- React Router (pueden tener páginas separadas o SPA)
- Redux/Context API (pueden usar props drilling)
- Custom Hooks

## 2.2 Stack Tecnológico Mínimo

| Tecnología | Versión | Propósito | Obligatorio |
|------------|---------|-----------|-------------|
| React | 18.x | Framework frontend | SÍ (rúbrica) |
| Bootstrap | 5.x | CSS responsivo | SÍ (rúbrica) |
| Jasmine | 4.x | Framework de testing | SÍ (rúbrica) |
| Karma | 6.x | Test runner | SÍ (rúbrica) |
| React Router | 6.x | Navegación (opcional) | NO |

## 2.3 Estructura de Carpetas Sugerida

```
mi-proyecto-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/          # Componentes reutilizables
│   │   ├── [modulo-1]/      # Componentes de una funcionalidad
│   │   └── [modulo-2]/      # Componentes de otra funcionalidad
│   ├── pages/ (si usan React Router)
│   ├── tests/
│   │   └── *.spec.js
│   ├── App.jsx
│   └── index.js
├── karma.conf.js
└── package.json
```

**IMPORTANTE:** Adapten la estructura de carpetas según las funcionalidades de su proyecto.

## 2.4 Componentes Mínimos Requeridos

Deben crear al menos **5-8 componentes React**. Ejemplos genéricos:

1. **App** - Componente raíz que maneja estado global
2. **Componente de Lista** - Muestra colección de items
3. **Componente de Item** - Representa un item individual
4. **Componente de Formulario** - Con validación
5. **Componente de Navegación** - Header/Navbar
6. **[Otros componentes específicos de su proyecto]**

**Nota:** Los nombres dependen de su proyecto (ProductList, TaskList, EventList, etc.)

---

# 3. DOCUMENTO SRS (ESPECIFICACIÓN DE REQUISITOS DE SOFTWARE)

**IMPORTANTE:** Este documento debe crearse en **Microsoft Word** siguiendo la estructura indicada a continuación.

## 3.1 Introducción

### 3.1.1 Propósito

Describan qué documenta este SRS y para qué sirve.

**Plantilla:**
```
Este documento especifica los requisitos de software para [NOMBRE DE SU PROYECTO],
una aplicación web desarrollada con React.

El propósito de este SRS es:
- Definir los requisitos funcionales y no funcionales del sistema
- Establecer las bases para el diseño e implementación
- Servir como referencia durante el desarrollo y testing
- Facilitar la evaluación del proyecto

[ADAPTAR A SU PROYECTO ESPECÍFICO]
```

### 3.1.2 Alcance del Producto

**Nombre del producto:** [COMPLETAR]

**Descripción breve:**
```
[COMPLETAR - Ejemplo genérico:]
Este proyecto es una aplicación web que permite a los usuarios [FUNCIONALIDAD PRINCIPAL].
La migración a React mejora la mantenibilidad mediante componentes reutilizables
y proporciona mejor experiencia de usuario con validación en tiempo real.
```

**Funcionalidades incluidas:**
- [ ] [Funcionalidad 1 de su proyecto]
- [ ] [Funcionalidad 2 de su proyecto]
- [ ] Formulario con validación
- [ ] Diseño responsivo
- [ ] [Otras funcionalidades]

**Funcionalidades NO incluidas (fuera de alcance):**
- [ ] Backend con base de datos persistente
- [ ] [Otras limitaciones específicas]

### 3.1.3 Definiciones, Acrónimos y Abreviaciones

| Término | Definición |
|---------|------------|
| SPA | Single Page Application |
| Props | Propiedades pasadas a un componente React |
| State | Estado interno de un componente React |
| Hook | Función especial de React (useState, useEffect, etc.) |
| RF | Requisito Funcional |
| RNF | Requisito No Funcional |
| [OTROS] | [Definir términos específicos de su proyecto] |

### 3.1.4 Audiencia del Documento

- Equipo de desarrollo (estudiantes)
- Docente evaluador
- Futuros mantenedores del código

---

## 3.2 Descripción General

### 3.2.1 Perspectiva del Producto

```
[COMPLETAR - Plantilla:]

[NOMBRE DEL PROYECTO] es una aplicación web frontend desarrollada con React 18 que:
- Opera como aplicación cliente [con/sin] backend
- Utiliza [descripción de almacenamiento de datos]
- Se integra con Bootstrap 5 para diseño responsivo
- Implementa validación de formularios en el lado del cliente

Contexto: Este proyecto es una migración del Trabajo 1 (HTML/CSS/JS vanilla) a React.
```

### 3.2.2 Funciones del Producto (Resumen)

Liste las funciones principales en alto nivel:

1. **[Función Principal 1]:** [Descripción breve]
2. **[Función Principal 2]:** [Descripción breve]
3. **Validación de Formularios:** [Descripción]
4. **Diseño Responsivo:** Adaptación a mobile (360-414px) y desktop (1920x1080)

### 3.2.3 Características de Usuario

**Perfil de usuario típico:**
- Edad: [Rango]
- Experiencia técnica: [Básica/Intermedia]
- Dispositivos: Smartphone y/o PC Desktop
- Necesidades: [Listar necesidades del usuario]

### 3.2.4 Restricciones

- **Tecnológicas:** Navegadores modernos (Chrome 90+, Firefox 88+, Safari 14+)
- **De desarrollo:** Tiempo limitado (1 semana), equipo de máximo 4 personas
- **De alcance:** Solo frontend (sin backend real - opcional según proyecto)

### 3.2.5 Suposiciones y Dependencias

**Suposiciones:**
- Los usuarios tienen conexión a internet
- Los navegadores tienen JavaScript habilitado
- [Otras suposiciones específicas]

**Dependencias:**
- React 18.x
- Bootstrap 5.x
- Node.js para desarrollo

---

## 3.3 Requisitos Funcionales (RF)

**IMPORTANTE:** Documenten los requisitos funcionales principales de su proyecto. Adapten los ejemplos a su caso específico.

### 3.3.1 RF-001: [Funcionalidad Principal del Sistema]

**Descripción:** [Describan la funcionalidad principal de su proyecto]

**Prioridad:** Alta

**Entrada:** [Qué recibe]

**Proceso:**
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

**Salida:** [Qué produce]

**Componentes React involucrados:**
- `[NombreComponente1].jsx`
- `[NombreComponente2].jsx`

**Props del componente [NombreComponente1]:**

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| [propName] | [type] | Sí/No | [Descripción] |
| [propName2] | [type] | Sí/No | [Descripción] |

**State del componente:**

| Variable | Tipo | Inicial | Descripción |
|----------|------|---------|-------------|
| [stateVar] | [type] | [value] | [Descripción] |

**Ejemplo de código:**
```jsx
// [NombreComponente].jsx
function [NombreComponente]({ [props] }) {
  const [state, setState] = useState([inicial]);

  // [Lógica del componente]

  return (
    // [JSX]
  );
}
```

---

### 3.3.2 RF-002: Gestión de Datos

**Descripción:** [Cómo se gestionan los datos en su aplicación]

**Prioridad:** Alta

**Componentes involucrados:**
- `[ComponentePrincipal].jsx` (maneja estado)
- `[ComponenteHijo].jsx` (recibe datos via props)

**State principal:**

| Variable | Tipo | Inicial | Descripción |
|----------|------|---------|-------------|
| [datos] | Array | [] | [Descripción de los datos] |

**Funciones de gestión:**
```jsx
// Ejemplo genérico - Adaptar a su proyecto
const [datos, setDatos] = useState([]);

const agregarDato = (nuevoDato) => {
  setDatos([...datos, nuevoDato]);
};

const eliminarDato = (id) => {
  setDatos(datos.filter(item => item.id !== id));
};

const actualizarDato = (id, nuevoValor) => {
  setDatos(datos.map(item =>
    item.id === id ? { ...item, ...nuevoValor } : item
  ));
};
```

---

### 3.3.3 RF-003: Formulario con Validación

**Descripción:** El sistema debe proporcionar un formulario con validación de datos.

**Prioridad:** Alta (OBLIGATORIO según rúbrica)

**Campos del formulario:** [Adaptar según su proyecto]

| Campo | Tipo | Validaciones | Mensaje de Error |
|-------|------|--------------|------------------|
| [Campo1] | text | Requerido, min X caracteres | "[Mensaje]" |
| [Campo2] | email | Requerido, formato válido | "[Mensaje]" |
| [Campo3] | [type] | [Reglas] | "[Mensaje]" |

**Validaciones implementadas:**

```javascript
// Ejemplo genérico de validación
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateField = (fieldName, value) => {
  switch(fieldName) {
    case 'campo1':
      if (!value || value.length < X) {
        return "Error: campo1";
      }
      return "";

    case 'campo2':
      if (!validateEmail(value)) {
        return "Error: email inválido";
      }
      return "";

    // [Agregar otros campos]
    default:
      return "";
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  // Validar todos los campos
  const errors = {};
  Object.keys(formData).forEach(field => {
    const error = validateField(field, formData[field]);
    if (error) errors[field] = error;
  });

  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }

  // Procesar formulario válido
  console.log("Formulario válido:", formData);
};
```

**Componente involucrado:**
- `[FormularioComponente].jsx`

---

### 3.3.4 RF-004: Navegación entre Vistas

**Descripción:** El sistema permite navegar entre diferentes secciones.

**Opciones de implementación:**
- [ ] React Router (SPA con rutas)
- [ ] Renderizado condicional (useState)
- [ ] Páginas HTML separadas

**Si usan React Router, especificar rutas:**

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `[HomePage]` | [Descripción] |
| `/[ruta2]` | `[Componente2]` | [Descripción] |
| `/[ruta3]` | `[Componente3]` | [Descripción] |

---

### 3.3.5 Otros Requisitos Funcionales

**RF-005:** [Otro requisito de su proyecto]

**RF-006:** [Otro requisito de su proyecto]

[AGREGAR tantos RF como necesiten - mínimo 4-6 requisitos]

---

## 3.4 Requisitos No Funcionales (RNF)

### 3.4.1 RNF-USA-01: Diseño Responsivo

**Descripción:** La aplicación debe adaptarse a diferentes tamaños de pantalla.

**Criterio de aceptación:**

| Dispositivo | Resolución | Breakpoint Bootstrap | Adaptaciones |
|-------------|------------|---------------------|--------------|
| **Mobile** | 360x640 - 414x896 | < 768px | 1 columna, menú adaptado, elementos táctiles ≥ 44px |
| **Desktop** | 1920x1080 | ≥ 992px | Múltiples columnas, menú completo, uso eficiente del espacio |

**Implementación:** Bootstrap 5 con clases responsivas

**Clases de Bootstrap utilizadas:**

Layout:
- [ ] container, container-fluid
- [ ] row
- [ ] col, col-md-*, col-lg-*

Componentes:
- [ ] [Listar componentes Bootstrap usados]

Utilidades:
- [ ] [Listar utilidades Bootstrap usadas]

### 3.4.2 RNF-USA-02: Feedback Visual

**Descripción:** El usuario debe recibir feedback inmediato de sus acciones.

**Criterios:**
- Botones muestran estado hover/active
- Formularios muestran errores en tiempo real
- Acciones muestran confirmación visual
- Tiempo de respuesta < 200ms para interacciones locales

### 3.4.3 RNF-PER-01: Rendimiento

**Descripción:** La aplicación debe cargar y ejecutarse eficientemente.

**Criterios:**
- Tiempo de carga inicial < 3 segundos
- Re-renders optimizados (uso correcto de useState/useEffect)
- Bundle size razonable

### 3.4.4 RNF-COM-01: Compatibilidad de Navegadores

**Navegadores soportados:**
- Chrome/Edge ≥ 90
- Firefox ≥ 88
- Safari ≥ 14

**No soportado:** Internet Explorer

### 3.4.5 RNF-MAN-01: Mantenibilidad del Código

**Criterios:**
- Componentes pequeños con responsabilidad única
- Nombres descriptivos
- Código comentado en lógica compleja
- Estructura de carpetas organizada

---

## 3.5 Arquitectura de Componentes React

**IMPORTANTE:** Documenten TODOS sus componentes principales (mínimo 5-8).

### 3.5.1 Jerarquía de Componentes

Dibujen o describan su árbol de componentes:

```
[COMPLETAR - Ejemplo genérico:]

App (raíz)
├── [ComponenteNavegacion]
│   └── [ComponenteBadge] (opcional)
├── [ComponentePrincipal1]
│   └── [ComponenteHijo1] (múltiples instancias)
├── [ComponentePrincipal2]
│   └── [ComponenteHijo2] (múltiples instancias)
└── [ComponenteFormulario]

[ADAPTAR A SU PROYECTO REAL]
```

### 3.5.2 Lista de Componentes del Sistema

**IMPORTANTE:** Listen todos los componentes React de su proyecto (mínimo 5-8).

| Componente | Ruta | Descripción | Props principales | State |
|------------|------|-------------|-------------------|-------|
| App | src/App.jsx | Componente raíz | - | [Listar states] |
| [Componente1] | src/components/... | [Descripción] | [Listar props] | [Listar states] |
| [Componente2] | src/components/... | [Descripción] | [Listar props] | [Listar states] |
| [Componente3] | src/components/... | [Descripción] | [Listar props] | [Listar states] |
| [ComponenteN] | src/components/... | [Descripción] | [Listar props] | [Listar states] |

**Nota:** Para cada componente, documentar brevemente su propósito, props que recibe y states que maneja. El detalle completo del código está en los Requisitos Funcionales (sección 3.3).

---

## 3.6 TESTING (Parte del SRS)

**IMPORTANTE:** Esta sección documenta las pruebas unitarias del proyecto.

### 3.6.1 Objetivo de Testing

**Meta de cobertura:**
- Statements ≥ 80%
- Branches ≥ 80%
- Functions ≥ 80%
- Lines ≥ 80%

**Cantidad de pruebas:** Mínimo 5 pruebas unitarias (recomendado 10)

**Herramientas:**
- Jasmine (framework de testing)
- Karma (test runner)

### 3.6.2 Las 5 Pruebas Mínimas Obligatorias

---

**PRUEBA 1: Renderizado Inicial**

**Componente testeado:** `[NombreComponente]`

**Qué verifica:**
- El componente se renderiza sin errores
- Los elementos principales están en el DOM

**Código:**
```javascript
describe('[NombreComponente] Component', () => {
  it('debe renderizar correctamente', () => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    root.render(<[NombreComponente] />);

    // Verificaciones específicas
    const elemento = container.querySelector('[selector]');
    expect(elemento).toBeDefined();
    expect(elemento.textContent).toBe('[texto esperado]');
  });
});
```

[COMPLETAR CON SU CÓDIGO REAL]

---

**PRUEBA 2: Validación de Formulario - Email**

**Componente testeado:** `[FormularioComponente]`

**Qué verifica:**
- Email sin @ muestra error
- Clase CSS de error se aplica

**Código:**
```javascript
describe('[FormularioComponente] - Validación Email', () => {
  it('debe mostrar error con email inválido', () => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    root.render(<[FormularioComponente] />);

    const emailInput = container.querySelector('[data-testid="email-input"]');
    emailInput.value = 'emailinvalido';
    emailInput.dispatchEvent(new Event('change', { bubbles: true }));

    const form = container.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    const formGroup = emailInput.closest('.form-group');
    expect(formGroup.classList.contains('error')).toBe(true);
  });
});
```

[COMPLETAR CON SU CÓDIGO REAL]

---

**PRUEBA 3: Validación - Campo Requerido**

**Componente testeado:** `[FormularioComponente]`

**Qué verifica:**
- Campo vacío muestra error al hacer submit

**Código:**
```javascript
describe('[FormularioComponente] - Campo Requerido', () => {
  it('debe mostrar error cuando campo está vacío', () => {
    // [COMPLETAR CON SU CÓDIGO]
  });
});
```

[COMPLETAR]

---

**PRUEBA 4: Interacción de Usuario**

**Componente testeado:** `[ComponenteConBoton]`

**Qué verifica:**
- El botón ejecuta la función correcta

**Código:**
```javascript
describe('[ComponenteConBoton] - Interacción', () => {
  it('debe llamar a la función al hacer clic', () => {
    const mockFuncion = jasmine.createSpy('funcionMock');

    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);
    root.render(<[ComponenteConBoton] onAction={mockFuncion} />);

    const button = container.querySelector('[data-testid="boton"]');
    button.click();

    expect(mockFuncion).toHaveBeenCalled();
  });
});
```

[COMPLETAR]

---

**PRUEBA 5: Actualización de State**

**Componente testeado:** `App` o `[ComponenteConState]`

**Qué verifica:**
- El state se actualiza correctamente
- Los componentes re-renderizan

**Código:**
```javascript
describe('[ComponenteConState] - State', () => {
  it('debe actualizar el state correctamente', () => {
    // [COMPLETAR CON SU CÓDIGO]
  });
});
```

[COMPLETAR]

---

### 3.6.3 Estructura de Archivos de Tests

```javascript
// [NombreComponente].spec.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import [NombreComponente] from '../components/[NombreComponente].jsx';

describe('[NombreComponente] Component', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
    root.render(<[NombreComponente] />);
  });

  afterEach(() => {
    root.unmount();
    document.body.removeChild(container);
    container = null;
    root = null;
  });

  // Tests aquí
  it('test 1', () => { /* ... */ });
  it('test 2', () => { /* ... */ });
});
```

### 3.6.4 Tabla de Cobertura de Testing

**IMPORTANTE:** Crear esta tabla en **Excel** y embedirla en el documento Word o adjuntarla como anexo.

**Estructura de la tabla Excel:**

| Métrica | Porcentaje | Cumple (≥80%) |
|---------|------------|---------------|
| Statements | ___% | SÍ / NO |
| Branches | ___% | SÍ / NO |
| Functions | ___% | SÍ / NO |
| Lines | ___% | SÍ / NO |

**Cobertura por Componente:**

| Componente | Statements | Branches | Functions | Lines | Estado |
|------------|------------|----------|-----------|-------|--------|
| [Componente1].jsx | ___% | ___% | ___% | ___% | ✓ / X |
| [Componente2].jsx | ___% | ___% | ___% | ___% | ✓ / X |
| [ComponenteN].jsx | ___% | ___% | ___% | ___% | ✓ / X |

**Comandos para generar reporte:**
```bash
npm test -- --coverage
```

### 3.6.5 Evidencias de Testing

Insertar screenshots de:
1. Terminal mostrando tests pasando
2. Reporte HTML de cobertura
3. Detalle de un componente testeado

---

## 3.7 Apéndices

### 3.7.1 Matriz de Trazabilidad

Relación entre Requisitos y Componentes:

| Requisito | Componente(s) | Prioridad | Estado |
|-----------|---------------|-----------|--------|
| RF-001 | [Componentes] | Alta | [✓/En progreso/Pendiente] |
| RF-002 | [Componentes] | Alta | [Estado] |
| RF-003 | [Componentes] | Alta | [Estado] |
| RNF-USA-01 | Todos | Alta | [Estado] |

### 3.7.2 Glosario

Ver sección 3.1.3

### 3.7.3 Referencias

- Documentación React: https://react.dev/
- Documentación Bootstrap: https://getbootstrap.com/docs/5.3/
- Documentación Jasmine: https://jasmine.github.io/
- [Otras referencias usadas]

---

## CHECKLIST DEL SRS

Antes de entregar el documento Word, verificar:

- [ ] Sección 3.1: Introducción completa
- [ ] Sección 3.2: Descripción general completa
- [ ] Sección 3.3: Mínimo 4-6 requisitos funcionales documentados
- [ ] Sección 3.4: Requisitos no funcionales especificados
- [ ] Sección 3.5: Mínimo 5-8 componentes React documentados con props/state
- [ ] Sección 3.6: 5 pruebas unitarias especificadas con código
- [ ] Sección 3.6.4: Tabla Excel de cobertura embebida o anexa
- [ ] Sección 3.7: Apéndices completados
- [ ] Todos los ejemplos genéricos reemplazados con su proyecto específico
- [ ] Formato Word profesional (índice, numeración, etc.)

**Extensión esperada:** 15-25 páginas

---

# 4. PRESENTACIÓN INDIVIDUAL

## 4.1 Estructura de la Presentación (10-15 minutos)

### Parte 1: Introducción (2 min)
- Nombre del proyecto
- Tecnologías usadas
- Principales desafíos

### Parte 2: Demostración en Vivo (3-4 min)
- Mostrar sitio en Vercel
- Navegar por funcionalidades
- Demostrar responsividad (DevTools)
- Flujo completo de uso

### Parte 3: Explicación de Arquitectura React (3-4 min)
- Mostrar diagrama de componentes
- Explicar flujo de state/props
- Explicar 2-3 componentes clave CON CÓDIGO
- Justificar decisiones de diseño

### Parte 4: Diseño Responsivo (2 min)
- Mostrar clases Bootstrap usadas
- Explicar adaptaciones mobile/desktop
- Mostrar CSS personalizado (si aplica)

### Parte 5: Testing (2-3 min)
- Mostrar reporte de cobertura
- Ejecutar 1-2 tests en vivo
- Explicar una prueba en detalle

### Parte 6: Preguntas del Docente (variable)

## 4.2 Preguntas Frecuentes del Docente

Preparen respuestas para:

### Sobre React:
1. ¿Qué es un prop y qué es un state?
2. ¿Cómo se comunican componentes en tu aplicación?
3. Explica el Hook useState
4. ¿Por qué usaste React?

### Sobre Bootstrap:
1. ¿Qué significa "mobile-first"?
2. ¿Qué son los breakpoints?
3. Explica el sistema de grillas (row/col)

### Sobre Testing:
1. ¿Qué es un mock/spy?
2. ¿Por qué 80% de cobertura?
3. Explica una de tus pruebas

### Sobre Validación:
1. ¿Cómo validaste el formulario?
2. ¿Qué es una expresión regular?

## 4.3 Checklist de Preparación

**Antes del día:**
- [ ] Proyecto desplegado en Vercel funcionando
- [ ] GitHub con README actualizado
- [ ] SRS Word completo
- [ ] Respuestas preparadas
- [ ] Ensayar presentación
- [ ] Código abierto en editor
- [ ] Terminal lista para tests

**Durante:**
- [ ] Hablar con confianza
- [ ] Usar terminología técnica
- [ ] Explicar, no leer
- [ ] Demostrar comprensión

---

# 5. ENTREGA Y RÚBRICA

## 5.1 Cómo Entregar en AVA

Subir:
1. **Archivo ZIP** del proyecto (sin node_modules)
2. **Documento SRS en Word**
3. **Archivo de texto (.txt)** con:
   - URL GitHub
   - URL Vercel
   - Nombres de integrantes

## 5.2 Contenido del ZIP

**Incluir:**
- Carpeta `src/` completa
- `public/`
- `package.json`, `package-lock.json`
- `karma.conf.js`
- `.gitignore`
- `README.md`

**NO incluir:**
- `node_modules/`
- `build/`
- `.git/`

**Comando para crear ZIP:**
```bash
# Windows
Compress-Archive -Path * -DestinationPath proyecto.zip

# Linux/Mac
zip -r proyecto.zip . -x "node_modules/*" "build/*" ".git/*"
```

## 5.3 README.md en GitHub

```markdown
# [NOMBRE DEL PROYECTO]

Descripción breve.

## Demo
- Vercel: [URL]
- GitHub: [URL]

## Tecnologías
- React 18
- Bootstrap 5
- Jasmine + Karma

## Instalación
```bash
npm install
npm start
npm test
```

## Funcionalidades
- [Listar funcionalidades]

## Testing
Cobertura: XX%

## Autores
- [Nombre 1]
- [Nombre N...]


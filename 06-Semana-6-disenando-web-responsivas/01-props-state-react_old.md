# 01 - Props y State en React

**Tiempo estimado:** 20-25 minutos
**Prerequisitos:** Node.js instalado, Git Bash

---

## Objetivo

Entender la diferencia entre **Props** (datos inmutables) y **State** (datos mutables) mediante ejemplos prácticos y funcionales.

---

## Setup del Proyecto

### 1. Abrir Git Bash y crear proyecto React

```bash
# Crear aplicación React
npx create-react-app props-state-ejemplo

# Entrar al directorio
cd props-state-ejemplo

# Instalar dependencias (ya incluidas por create-react-app)
npm install

# Levantar servidor de desarrollo
npm start
```

El navegador abrirá automáticamente en `http://localhost:3000`

---

## Ejemplo 1: Props - Tarjeta de Usuario

### Concepto
**Props** son datos que un componente **padre** pasa a un componente **hijo**. Son **inmutables** (no se pueden modificar dentro del hijo).

### Contexto: ¿Por qué necesitamos Props?

Imagina que tienes un sitio web de empleados y necesitas mostrar 50 tarjetas con información de cada persona. Sin props, tendrías dos opciones malas:

**Opción 1 - Código duplicado:**
```jsx
// Crear 50 componentes diferentes
function UserCard1() { return <div><h2>Juan</h2>...</div> }
function UserCard2() { return <div><h2>María</h2>...</div> }
function UserCard3() { return <div><h2>Carlos</h2>...</div> }
// ... 47 componentes más
```
Problema: Si cambias el diseño, tienes que modificar 50 archivos.

**Opción 2 - HTML estático:**
```jsx
function App() {
  return (
    <div>
      <div className="card"><h2>Juan</h2><p>28 años</p></div>
      <div className="card"><h2>María</h2><p>32 años</p></div>
      <div className="card"><h2>Carlos</h2><p>25 años</p></div>
      {/* Repetir 47 veces más... */}
    </div>
  );
}
```
Problema: Código repetitivo, difícil de mantener, no escalable.

**Solución con Props:**
Creamos **UN SOLO componente** reutilizable que recibe datos diferentes mediante props. Es como una plantilla que se rellena con información distinta cada vez.

### Pasos de lo que vamos a hacer

1. Crear el componente hijo `UserCard.js` que recibe props
2. Usar ese componente en `App.js` pasándole diferentes datos
3. Demostrar cómo el mismo componente muestra información diferente según los props
4. Ver la ventaja: cambiar el diseño en un solo lugar

### Código

#### Paso 1: Crear el componente hijo `src/components/UserCard.js`

**¿Qué vamos a hacer?**
Crear un componente que funcione como plantilla. Recibirá datos (props) y los mostrará en formato de tarjeta.

```jsx
import React from 'react';

// Este componente RECIBE props del padre
// props es un objeto que contiene: { nombre, edad, profesion, email }
function UserCard(props) {
  // El return define cómo se VE el componente
  return (
    <div style={{
      border: '2px solid #007bff',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      maxWidth: '300px'
    }}>
      {/* props.nombre viene del componente padre */}
      <h2>{props.nombre}</h2>

      {/* Las llaves {} permiten insertar variables JavaScript en JSX */}
      <p><strong>Edad:</strong> {props.edad} años</p>
      <p><strong>Profesión:</strong> {props.profesion}</p>
      <p><strong>Email:</strong> {props.email}</p>
    </div>
  );
}

// Exportamos para poder usarlo en otros archivos
export default UserCard;
```

**Explicación:**
- `function UserCard(props)`: El componente recibe un parámetro llamado `props`
- `props` es un **objeto** que contiene todos los datos que le pase el padre
- `{props.nombre}`: Accedemos a la propiedad `nombre` del objeto props
- El componente **no modifica** los props, solo los muestra (inmutables)

#### Paso 2: Usar el componente en `src/App.js`

**¿Qué vamos a hacer?**
Importar el componente `UserCard` y usarlo 3 veces con datos diferentes. Cada vez que lo usemos, le pasaremos props distintos.

```jsx
import React from 'react';
// Importamos el componente UserCard que creamos
import UserCard from './components/UserCard';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Ejemplo 1: Props - Tarjetas de Usuarios</h1>

      {/* PRIMERA tarjeta: Le pasamos props de Juan */}
      {/* Nota: nombre va entre comillas (string), edad va entre llaves (número) */}
      <UserCard
        nombre="Juan Pérez"
        edad={28}
        profesion="Desarrollador Frontend"
        email="juan@example.com"
      />

      {/* SEGUNDA tarjeta: MISMO componente, DIFERENTES props */}
      <UserCard
        nombre="María González"
        edad={32}
        profesion="Diseñadora UX"
        email="maria@example.com"
      />

      {/* TERCERA tarjeta: MISMO componente, DIFERENTES props */}
      <UserCard
        nombre="Carlos Ramírez"
        edad={25}
        profesion="Backend Developer"
        email="carlos@example.com"
      />
    </div>
  );
}

export default App;
```

**Explicación:**
- `import UserCard`: Traemos el componente hijo para poder usarlo
- `<UserCard nombre="..." edad={...} />`: Así pasamos props al componente hijo
- Strings van entre comillas: `nombre="Juan Pérez"`
- Números/expresiones van entre llaves: `edad={28}`
- El componente `UserCard` se **reutiliza 3 veces** con datos diferentes
- React automáticamente pasa estos atributos como un objeto `props` al componente hijo

**Resultado:**
Verás 3 tarjetas idénticas en diseño pero con información diferente. Si cambias el estilo en `UserCard.js`, las 3 tarjetas se actualizan automáticamente.

### Comparación: ANTES vs DESPUÉS (Para ver la diferencia)

**Vamos a ver el mismo resultado de dos formas diferentes para entender la ventaja de usar props.**

#### ANTES: Sin Props (Código repetitivo)

Primero, veamos cómo se haría **sin componentes reutilizables**. Reemplaza temporalmente tu `App.js` con esto:

```jsx
import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ANTES: Sin usar Props (Código Duplicado)</h1>

      {/* Primera tarjeta - código completo */}
      <div style={{
        border: '2px solid #007bff',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        maxWidth: '300px'
      }}>
        <h2>Juan Pérez</h2>
        <p><strong>Edad:</strong> 28 años</p>
        <p><strong>Profesión:</strong> Desarrollador Frontend</p>
        <p><strong>Email:</strong> juan@example.com</p>
      </div>

      {/* Segunda tarjeta - mismo código, solo cambian los datos */}
      <div style={{
        border: '2px solid #007bff',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        maxWidth: '300px'
      }}>
        <h2>María González</h2>
        <p><strong>Edad:</strong> 32 años</p>
        <p><strong>Profesión:</strong> Diseñadora UX</p>
        <p><strong>Email:</strong> maria@example.com</p>
      </div>

      {/* Tercera tarjeta - otra vez el mismo código */}
      <div style={{
        border: '2px solid #007bff',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        maxWidth: '300px'
      }}>
        <h2>Carlos Ramírez</h2>
        <p><strong>Edad:</strong> 25 años</p>
        <p><strong>Profesión:</strong> Backend Developer</p>
        <p><strong>Email:</strong> carlos@example.com</p>
      </div>
    </div>
  );
}

export default App;
```

**Problemas visibles:**
- Repetimos el `<div style={{...}}>` 3 veces (16 líneas cada uno)
- Si queremos cambiar el color del borde, tenemos que cambiar 3 lugares
- Si son 50 usuarios, tenemos que copiar/pegar 50 veces
- Total de líneas: aproximadamente 48 líneas de código repetitivo

#### DESPUÉS: Con Props (Código reutilizable)

Ahora reemplaza tu `App.js` con la versión que usa props:

```jsx
import React from 'react';
import UserCard from './components/UserCard';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>DESPUÉS: Usando Props (Código Reutilizable)</h1>

      {/* Mismo componente, diferentes datos */}
      <UserCard
        nombre="Juan Pérez"
        edad={28}
        profesion="Desarrollador Frontend"
        email="juan@example.com"
      />

      <UserCard
        nombre="María González"
        edad={32}
        profesion="Diseñadora UX"
        email="maria@example.com"
      />

      <UserCard
        nombre="Carlos Ramírez"
        edad={25}
        profesion="Backend Developer"
        email="carlos@example.com"
      />
    </div>
  );
}

export default App;
```

**Ventajas visibles:**
- Solo 5 líneas por tarjeta (vs 16 líneas antes)
- El diseño está en UN SOLO lugar (UserCard.js)
- Cambiar el color del borde: 1 modificación en UserCard.js
- Si son 50 usuarios, solo agregamos 5 líneas más por cada uno
- Total de líneas: 27 líneas (vs 48 antes)

#### Experimento práctico

**Prueba esto para ver la diferencia:**

1. Con la versión SIN props:
   - Cambia el color del borde de `#007bff` a `#dc3545` (rojo)
   - Tienes que cambiar 3 lugares diferentes
   - Cuenta cuántas veces das Ctrl+F y Ctrl+H

2. Con la versión CON props:
   - Cambia el color solo en `UserCard.js` (línea 96)
   - Automáticamente las 3 tarjetas cambian
   - Solo 1 modificación

**Conclusión:**
Props permiten crear componentes como "plantillas reutilizables". Defines el diseño una vez y lo usas muchas veces con datos diferentes.

---

### Paso 3 (Opcional): Versión con Destructuring (Recomendada)

**Contexto:**
Escribir `props.nombre`, `props.edad`, `props.profesion` es repetitivo. JavaScript permite "desempacar" el objeto props directamente en los parámetros de la función.

**¿Qué vamos a hacer?**
Reescribir `UserCard.js` usando destructuring para hacer el código más limpio y legible.

```jsx
// En lugar de: function UserCard(props)
// Usamos: function UserCard({ nombre, edad, profesion, email })
// Esto "extrae" las propiedades del objeto props automáticamente

function UserCard({ nombre, edad, profesion, email }) {
  return (
    <div style={{ border: '2px solid #007bff', padding: '20px' }}>
      {/* Ahora usamos directamente: nombre en vez de props.nombre */}
      <h2>{nombre}</h2>
      <p><strong>Edad:</strong> {edad} años</p>
      <p><strong>Profesión:</strong> {profesion}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
}
```

**Comparación:**

```jsx
// ANTES (con props)
function UserCard(props) {
  return <h2>{props.nombre}</h2>;
}

// DESPUÉS (con destructuring)
function UserCard({ nombre }) {
  return <h2>{nombre}</h2>;
}
```

**Ventajas:**
- Código más limpio y fácil de leer
- Se ve inmediatamente qué props espera el componente
- Menos repetición de la palabra "props"
- Es el estándar en React moderno

---

## Ejemplo 2: State - Contador Simple

### Concepto
**State** son datos internos del componente que **pueden cambiar**. Cuando el state cambia, el componente se **re-renderiza** automáticamente.

### Contexto: ¿Por qué necesitamos State?

Imagina que quieres crear un contador con un botón que incremente un número cada vez que lo presionas. Sin React y sin state, tendrías que hacer esto:

**Problema: ¿Cómo hacemos que un botón cambie un número en la pantalla?**

En HTML/JavaScript tradicional tendrías dos opciones malas:

**Opción 1 - Manipular el DOM manualmente:**
```html
<div id="contador">0</div>
<button onclick="incrementar()">Incrementar</button>

<script>
  let count = 0;

  function incrementar() {
    count++;
    // Manipular el DOM manualmente
    document.getElementById('contador').innerText = count;
  }
</script>
```

Problemas:
- Tienes que buscar elementos del DOM con `getElementById`
- Mezclas lógica con manipulación del DOM
- Difícil de mantener y testear
- No es declarativo (dices "cómo hacerlo" en vez de "qué quieres")

**Opción 2 - Sin interactividad (datos estáticos):**
```jsx
function Counter() {
  // Este valor NUNCA cambia
  const count = 0;

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => count++}>Incrementar</button>
    </div>
  );
}
```

Problemas:
- El botón NO hace nada (count++ no actualiza la pantalla)
- React no sabe que count cambió
- La interfaz se queda congelada en 0

**Solución con State:**
State permite que React "observe" los datos y actualice la UI automáticamente cuando cambian. Es como decirle a React: "este dato es especial, cuando cambie, vuelve a dibujar el componente".

### Comparación: ANTES vs DESPUÉS

### Pasos de lo que vamos a hacer

1. Crear `CounterBroken.js` - Un contador que NO funciona (sin state)
2. Crear `Counter.js` - Un contador que SÍ funciona (con state)
3. Actualizar `App.js` para mostrar ambos contadores lado a lado
4. Comparar el comportamiento de ambos en el navegador

#### ANTES: Sin State (NO funciona correctamente)

**Paso 1:** Crea `src/components/CounterBroken.js` para ver qué pasa SIN state:

```jsx
import React from 'react';

// Este contador NO funciona porque no usa state
function CounterBroken() {
  // Variable normal de JavaScript
  let count = 0;

  // Función que intenta incrementar
  const incrementar = () => {
    count = count + 1;
    console.log('Valor de count:', count); // Verás que SÍ cambia en consola
    // PERO la pantalla NO se actualiza
  };

  return (
    <div style={{
      border: '2px solid #dc3545',
      borderRadius: '8px',
      padding: '30px',
      textAlign: 'center',
      maxWidth: '400px',
      margin: '20px auto',
      backgroundColor: '#ffe6e6'
    }}>
      <h2>Contador Roto: {count}</h2>
      <p style={{ color: '#721c24', fontSize: '14px' }}>
        (Este contador NO funciona - el número no cambia)
      </p>

      <button
        onClick={incrementar}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '16px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Intentar Incrementar
      </button>

      <p style={{ fontSize: '12px', marginTop: '10px' }}>
        Abre la consola del navegador (F12) y presiona el botón.
        Verás que count cambia en consola pero NO en pantalla.
      </p>
    </div>
  );
}

export default CounterBroken;
```

#### Ahora vamos a verlo en acción

Para poder ver este contador roto funcionando, actualiza temporalmente tu `src/App.js`:

```jsx
import React from 'react';
import CounterBroken from './components/CounterBroken';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Probando el Contador SIN State</h1>
      <CounterBroken />
    </div>
  );
}

export default App;
```

**Guarda el archivo (Ctrl+S) y observa en el navegador:**

1. Verás el contador con fondo rosado
2. Presiona el botón "Intentar Incrementar" varias veces
3. Observa que el número **NO cambia** (se queda en 0)
4. Abre la consola del navegador (F12)
5. Presiona el botón de nuevo
6. En la consola verás: "Valor de count: 1", "Valor de count: 2", etc.
7. **Conclusión**: El valor SÍ cambia en JavaScript, pero la pantalla NO se actualiza

**¿Por qué NO funciona?**
- `count` es una variable normal de JavaScript
- Cuando cambias `count++`, JavaScript lo actualiza en memoria
- PERO React no sabe que cambió, entonces no re-renderiza el componente
- La pantalla se queda mostrando el valor inicial (0)

**Ahora que viste el problema, continuemos con la solución...**

#### DESPUÉS: Con State (Funciona correctamente)

**Paso 2:** Ahora crea `src/components/Counter.js` con state:

**¿Qué vamos a hacer?**
Crear un contador funcional usando `useState` para que React sepa cuándo actualizar la pantalla.

```jsx
import React, { useState } from 'react';
// Importamos useState - es un "hook" de React para manejar estado
// Un hook es una función especial que "engancha" funcionalidades de React
// Todos los hooks empiezan con "use" (useState, useEffect, useParams, etc.)

function Counter() {
  // ESTO ES LA MAGIA DEL STATE
  // useState(0) crea una variable especial que React "observa"
  // Retorna un array con 2 elementos:
  // - count: el valor actual (empieza en 0)
  // - setCount: función para cambiar el valor
  const [count, setCount] = useState(0);

  // Función para incrementar (igual que CounterBroken pero usando setCount)
  const incrementar = () => {
    setCount(count + 1);
    console.log('Valor de count (con state):', count + 1); // Verás el cambio en consola Y en pantalla
  };

  const decrementar = () => {
    setCount(count - 1);
    console.log('Valor de count (con state):', count - 1);
  };

  const reiniciar = () => {
    setCount(0);
    console.log('Valor de count (con state): 0');
  };

  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: '8px',
      padding: '30px',
      textAlign: 'center',
      maxWidth: '400px',
      margin: '20px auto',
      backgroundColor: '#e6ffe6'
    }}>
      {/* count se actualiza automáticamente cuando usamos setCount */}
      <h2>Contador: {count}</h2>
      <p style={{ color: '#155724', fontSize: '14px' }}>
        (Este contador SÍ funciona - usa state)
      </p>

      {/* Botón Incrementar */}
      {/* onClick ejecuta incrementar() que llama setCount y console.log */}
      {/* setCount le dice a React: "count cambió, re-dibuja el componente" */}
      <button
        onClick={incrementar}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Incrementar
      </button>

      {/* Botón Decrementar */}
      <button
        onClick={decrementar}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '16px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Decrementar
      </button>

      {/* Botón Reiniciar */}
      <button
        onClick={reiniciar}
        style={{
          padding: '10px 20px',
          margin: '5px',
          fontSize: '16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Reiniciar
      </button>

      <p style={{ fontSize: '12px', marginTop: '10px' }}>
        Abre la consola del navegador (F12) y presiona los botones.
        Verás que count cambia en consola Y en pantalla.
      </p>
    </div>
  );
}

export default Counter;
```

**Explicación paso a paso:**

1. **`import { useState }`**: Importamos el hook useState de React
   - **¿Qué es un hook?** Un hook es una función especial de React que te permite "enganchar" (hook) funcionalidades de React en componentes funcionales
   - Antes de los hooks (React < 16.8), solo los componentes de clase podían tener state
   - `useState` es el hook más básico y te permite agregar state a componentes funcionales
   - Los hooks siempre empiezan con la palabra "use" (`useState`, `useEffect`, `useParams`, etc.)
2. **`const [count, setCount] = useState(0)`**:
   - Crea una variable de estado llamada `count` con valor inicial `0`
   - `setCount` es la función que usamos para cambiar `count`
   - Cuando llamamos `setCount()`, React automáticamente re-renderiza el componente
3. **`onClick={() => setCount(count + 1)}`**:
   - Cuando presionas el botón, ejecuta `setCount(count + 1)`
   - React actualiza `count` y vuelve a dibujar el componente
   - El nuevo valor aparece en pantalla
4. **Re-renderizado automático**: No necesitas `document.getElementById` ni manipular el DOM manualmente

**¿Por qué SÍ funciona?**
- `useState` le dice a React: "este valor es especial, obsérvalo"
- Cuando usas `setCount()`, React sabe que debe actualizar la UI
- React re-ejecuta la función `Counter()` con el nuevo valor
- La pantalla muestra el número actualizado

#### Ahora vamos a verlo en acción

Actualiza tu `src/App.js` para probar este contador funcional:

```jsx
import React from 'react';
import Counter from './components/Counter';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Probando el Contador CON State</h1>
      <Counter />
    </div>
  );
}

export default App;
```

**Guarda el archivo (Ctrl+S) y observa en el navegador:**

1. Verás el contador con fondo verde
2. **Abre la consola del navegador (F12)** - igual que en CounterBroken
3. Presiona el botón "Incrementar" varias veces
4. Observa que el número **SÍ cambia en PANTALLA**: 0 → 1 → 2 → 3...
5. Observa en **CONSOLA**: "Valor de count (con state): 1", "Valor de count (con state): 2"...
6. Presiona "Decrementar"
7. El número baja en pantalla Y en consola: 3 → 2 → 1 → 0
8. Presiona "Reiniciar"
9. El número vuelve a 0 en pantalla Y en consola
10. **Conclusión**: Con state, el valor cambia EN MEMORIA (consola) Y EN PANTALLA

**Ahora comparemos ambos lado a lado...**

---

#### Paso 3: Comparar ambos contadores lado a lado

**¿Qué vamos a hacer?**
Mostrar los dos contadores lado a lado: el que NO funciona (sin state) y el que SÍ funciona (con state), para ver la diferencia.

```jsx
import React from 'react';
import CounterBroken from './components/CounterBroken';
import Counter from './components/Counter';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Ejemplo 2: State - Comparación</h1>

      <h2 style={{ color: '#dc3545' }}>ANTES: Sin State (No funciona)</h2>
      <CounterBroken />

      <h2 style={{ color: '#28a745', marginTop: '40px' }}>DESPUÉS: Con State (Funciona)</h2>
      <Counter />
    </div>
  );
}

export default App;
```

**¿Cómo ver esto funcionando?**

1. Asegúrate de haber creado los 3 archivos:
   - `src/components/CounterBroken.js` (contador roto)
   - `src/components/Counter.js` (contador funcional)
   - `src/App.js` (actualizado con el código de arriba)

2. Guarda todos los archivos con **Ctrl+S**

3. Si tu servidor está corriendo (`npm start`), el navegador se actualizará automáticamente

4. Deberías ver:
   - Un título "ANTES: Sin State (No funciona)" en rojo
   - Un contador con fondo rosado que NO funciona
   - Un título "DESPUÉS: Con State (Funciona)" en verde
   - Un contador con fondo verde que SÍ funciona

**Observa en el navegador:**
- El contador rojo NO cambia cuando presionas el botón
- El contador verde SÍ cambia cuando presionas el botón
- Abre la consola (F12) en el contador rojo y verás que el valor cambia en memoria, pero no en pantalla

### Experimento Práctico

**Prueba esto para entender la diferencia:**

1. **Contador sin state (rojo):**
   - Presiona el botón "Intentar Incrementar" 5 veces
   - El número en pantalla sigue siendo 0
   - Abre la consola del navegador (F12)
   - Presiona el botón de nuevo
   - Verás en consola: "Valor de count: 6"
   - CONCLUSIÓN: El valor cambia en JavaScript, pero React no actualiza la UI

2. **Contador con state (verde):**
   - Presiona "Incrementar" 5 veces
   - El número cambia: 0 → 1 → 2 → 3 → 4 → 5
   - Presiona "Decrementar"
   - El número baja: 5 → 4
   - Presiona "Reiniciar"
   - El número vuelve a 0
   - CONCLUSIÓN: State le avisa a React cuando cambiar la UI

### Resumen de la diferencia

| Aspecto | Sin State (CounterBroken) | Con State (Counter) |
|---------|---------------------------|---------------------|
| **Declaración** | `let count = 0` | `const [count, setCount] = useState(0)` |
| **Actualización** | `count++` | `setCount(count + 1)` |
| **Consola (F12)** | Cambia: "Valor de count: 1, 2, 3..." | Cambia: "Valor de count (con state): 1, 2, 3..." |
| **Pantalla** | NO cambia (se queda en 0) | SÍ cambia (0 → 1 → 2 → 3...) |
| **React se entera** | NO | SÍ |
| **Re-renderizado** | NO ocurre | SÍ ocurre automáticamente |
| **Código necesario** | Más simple pero NO funciona | Ligeramente más código pero FUNCIONA |

**Conclusión:**
State es necesario para crear interfaces interactivas en React. Sin state, los cambios en variables no se reflejan en la pantalla porque React no sabe que debe actualizar el componente.

---

## Ejemplo 3: Combinando Props y State - Lista de Tareas

### Concepto
Un componente padre gestiona el **state**, y pasa datos via **props** a componentes hijos. Este patrón permite crear interfaces complejas manteniendo el código organizado y reutilizable.

### Contexto: ¿Por qué necesitamos combinar Props y State?

Imagina que quieres crear una lista de tareas donde puedas agregar y eliminar items. Tienes dos opciones:

**Opción 1 - Todo en un solo componente:**
```jsx
function TaskList() {
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      {tasks.map((task, index) => (
        // Repetir todo este HTML por cada tarea
        <div style={{...estilos largos...}}>
          <span>{task}</span>
          <button style={{...más estilos...}}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
```

Problemas:
- El componente crece demasiado (100+ líneas)
- El HTML de cada tarea se repite en el `.map()`
- Difícil de leer y mantener
- No puedes reutilizar el diseño de una tarea en otro lugar

**Opción 2 - Separar en componentes (Props + State):**
- **Padre (TaskList)**: Maneja el state (lista de tareas)
- **Hijo (TaskItem)**: Recibe props (una tarea) y se encarga solo de mostrarla
- Resultado: Código organizado, reutilizable y fácil de mantener

**Solución con Props + State:**
Separamos responsabilidades: el padre gestiona los datos (state), el hijo se encarga de la presentación (props).

### Comparación: ANTES vs DESPUÉS

### Pasos de lo que vamos a hacer

1. Crear `TaskListMonolithic.js` - TODO en un solo componente (ANTES)
2. Ejecutarlo y ver que funciona pero es difícil de leer
3. Crear `TaskItem.js` - Componente hijo que recibe props
4. Crear `TaskList.js` - Componente padre que usa state
5. Comparar ambos enfoques lado a lado

#### ANTES: Todo en un solo componente (Difícil de mantener)

**Paso 1:** Crea `src/components/TaskListMonolithic.js` (todo junto):

**¿Qué vamos a hacer?**
Crear una lista de tareas completa en UN SOLO componente para ver cómo crece el código y se vuelve difícil de manejar.

```jsx
import React, { useState } from 'react';

// TODO en un solo componente - sin separación
function TaskListMonolithic() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue('');
      console.log('Tarea agregada (monolítico):', inputValue);
    }
  };

  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    console.log('Tarea eliminada (monolítico):', taskToDelete);
  };

  return (
    <div style={{
      border: '2px solid #ffc107',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '500px',
      margin: '20px auto',
      backgroundColor: '#fff3cd'
    }}>
      <h2>Lista Monolítica (Todo Junto)</h2>
      <p style={{ color: '#856404', fontSize: '14px' }}>
        (Todo el código en un solo componente - Difícil de mantener)
      </p>

      {/* Input y botón */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Escribe una tarea..."
          style={{
            padding: '10px',
            width: '70%',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px',
            backgroundColor: '#ffc107',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Agregar
        </button>
      </div>

      {/* Lista de tareas - HTML REPETIDO en el .map() */}
      {tasks.length === 0 ? (
        <p style={{ color: '#999' }}>No hay tareas. ¡Agrega una!</p>
      ) : (
        tasks.map((task, index) => (
          // ESTE BLOQUE SE REPITE POR CADA TAREA
          // Sería mejor extraerlo a un componente separado
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#f8f9fa',
              borderRadius: '5px'
            }}
          >
            <span>{task}</span>
            <button
              onClick={() => deleteTask(index)}
              style={{
                padding: '5px 15px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Eliminar
            </button>
          </div>
        ))
      )}

      <p style={{ marginTop: '20px', color: '#666' }}>
        Total de tareas: {tasks.length}
      </p>

      <p style={{ fontSize: '12px', marginTop: '10px', color: '#856404' }}>
        Nota: Este componente tiene {'>'}100 líneas. Es funcional pero difícil de mantener.
        Si quieres cambiar el diseño de una tarea, tienes que modificar el .map() que está
        mezclado con la lógica.
      </p>
    </div>
  );
}

export default TaskListMonolithic;
```

**Problemas visibles:**
- El componente tiene más de 100 líneas
- El HTML de cada tarea (div + span + button) está mezclado en el `.map()`
- Si quieres reutilizar el diseño de una tarea, no puedes
- La lógica y la presentación están juntas

#### Ahora vamos a verlo en acción

Actualiza tu `src/App.js` para probar este componente monolítico:

```jsx
import React from 'react';
import TaskListMonolithic from './components/TaskListMonolithic';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Probando Lista de Tareas Monolítica</h1>
      <TaskListMonolithic />
    </div>
  );
}

export default App;
```

**Guarda el archivo (Ctrl+S) y observa en el navegador:**

1. Verás la lista con fondo amarillo
2. Agrega 3 tareas: "Comprar pan", "Estudiar React", "Hacer ejercicio"
3. Abre la consola del navegador (F12)
4. Las tareas se agregan y se pueden eliminar
5. **Funciona perfectamente**, PERO...
6. Abre el archivo `TaskListMonolithic.js` en tu editor
7. **Observa**: El archivo tiene más de 100 líneas
8. El HTML de cada tarea está mezclado en el `.map()`
9. **Conclusión**: Funciona, pero es difícil de leer y mantener

**Ahora veamos la solución: separar en componentes...**

---

#### DESPUÉS: Separado en componentes (Fácil de mantener)

**Paso 2:** Crea `src/components/TaskItem.js` (componente hijo con props)

**¿Qué vamos a hacer?**
Extraer el HTML de una tarea individual a un componente separado. Este componente solo recibe props y no tiene state.

```jsx
import React from 'react';

// Componente HIJO: Solo recibe props, NO tiene state
// Su única responsabilidad es MOSTRAR una tarea
function TaskItem({ task, onDelete }) {
  // task: string con el texto de la tarea (viene del padre)
  // onDelete: función para eliminar (viene del padre)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      margin: '5px 0',
      backgroundColor: '#f8f9fa',
      borderRadius: '5px'
    }}>
      {/* Mostramos la tarea que recibimos por props */}
      <span>{task}</span>

      {/* Cuando hacen clic, ejecutamos la función onDelete que vino por props */}
      {/* Esto le avisa al PADRE que elimine esta tarea */}
      <button
        onClick={onDelete}
        style={{
          padding: '5px 15px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        Eliminar
      </button>
    </div>
  );
}

export default TaskItem;
```

**Explicación:**
- **Props recibidos**: `task` (string) y `onDelete` (función)
- **No tiene state**: TaskItem no gestiona datos, solo los muestra
- **Responsabilidad única**: Mostrar el diseño de UNA tarea
- **Reutilizable**: Podemos usar este componente en cualquier lista
- **onClick={onDelete}**: Cuando hacen clic, ejecuta la función del padre

---

**Paso 3:** Crea `src/components/TaskList.js` (componente padre con state)

**¿Qué vamos a hacer?**
Crear el componente padre que gestiona el state y usa TaskItem para cada tarea.

```jsx
import React, { useState } from 'react';
// Importamos el componente hijo que acabamos de crear
import TaskItem from './TaskItem';

// Componente PADRE: Tiene state y gestiona la lista de tareas
function TaskList() {
  // State 1: Array de tareas
  const [tasks, setTasks] = useState([]);

  // State 2: Valor del input
  const [inputValue, setInputValue] = useState('');

  // Función para agregar tarea
  const addTask = () => {
    if (inputValue.trim() !== '') {
      // Agregamos la nueva tarea al array
      setTasks([...tasks, inputValue]);
      // Limpiamos el input
      setInputValue('');
      console.log('Tarea agregada (separado):', inputValue);
    }
  };

  // Función para eliminar tarea
  // Esta función se PASA por props a TaskItem
  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    // Filtramos el array para excluir la tarea en ese índice
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    console.log('Tarea eliminada (separado):', taskToDelete);
  };

  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '500px',
      margin: '20px auto',
      backgroundColor: '#d4edda'
    }}>
      <h2>Lista Modular (Separada en Componentes)</h2>
      <p style={{ color: '#155724', fontSize: '14px' }}>
        (Código separado en 2 componentes - Fácil de mantener)
      </p>

      {/* Input y botón */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          // Cuando el input cambia, actualizamos el state
          onChange={(e) => setInputValue(e.target.value)}
          // Cuando presionan Enter, agregamos la tarea
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Escribe una tarea..."
          style={{
            padding: '10px',
            width: '70%',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Agregar
        </button>
      </div>

      {/* Lista de tareas - Ahora usamos el componente TaskItem */}
      {tasks.length === 0 ? (
        <p style={{ color: '#999' }}>No hay tareas. Agrega una</p>
      ) : (
        tasks.map((task, index) => (
          // Por cada tarea, renderizamos un componente TaskItem
          // Le pasamos la tarea y la función para eliminar por PROPS
          <TaskItem
            key={index}
            task={task}
            onDelete={() => deleteTask(index)}
          />
        ))
      )}

      <p style={{ marginTop: '20px', color: '#666' }}>
        Total de tareas: {tasks.length}
      </p>

      <p style={{ fontSize: '12px', marginTop: '10px', color: '#155724' }}>
        Nota: TaskList.js tiene aproximadamente 80 líneas, TaskItem.js tiene aproximadamente 30 líneas.
        Total: aproximadamente 110 líneas pero SEPARADAS y ORGANIZADAS. Fácil de modificar.
      </p>
    </div>
  );
}

export default TaskList;
```

**Explicación paso a paso:**

1. **`import TaskItem`**: Importamos el componente hijo
2. **`const [tasks, setTasks] = useState([])`**: State para el array de tareas
3. **`const [inputValue, setInputValue] = useState('')`**: State para el input
4. **`addTask()`**: Agrega una tarea al array usando spread operator `[...tasks, inputValue]`
5. **`deleteTask(index)`**: Filtra el array para excluir la tarea en ese índice
6. **`tasks.map((task, index) => ...)`**: Por cada tarea, renderizamos un `<TaskItem>`
7. **`<TaskItem task={task} onDelete={() => deleteTask(index)} />`**:
   - Pasamos `task` por props (string)
   - Pasamos `onDelete` por props (función)
   - TaskItem ejecutará `onDelete` cuando hagan clic en "Eliminar"

**Flujo de datos:**
```
Padre (TaskList)                    Hijo (TaskItem)
    |                                    |
    |-- task="Comprar pan" -----------> |
    |-- onDelete={función} ------------> |
    |                                    |
    |                                    |
    | <--- onClick ejecuta onDelete ---- |
    |                                    |
Padre actualiza el state
```

---

#### Ahora vamos a verlo en acción

Actualiza tu `src/App.js` para probar la versión separada:

```jsx
import React from 'react';
import TaskList from './components/TaskList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Probando Lista de Tareas Modular</h1>
      <TaskList />
    </div>
  );
}

export default App;
```

**Guarda todos los archivos (Ctrl+S) y observa en el navegador:**

1. Verás la lista con fondo verde
2. Agrega las mismas 3 tareas: "Comprar pan", "Estudiar React", "Hacer ejercicio"
3. Abre la consola del navegador (F12)
4. Las tareas se agregan y eliminan igual que antes
5. **Funciona igual**, PERO...
6. Abre los archivos `TaskList.js` y `TaskItem.js` en tu editor
7. **Observa**: El código está separado y es más fácil de leer
8. TaskItem.js tiene solo 30 líneas y UNA responsabilidad
9. **Conclusión**: Funciona igual pero el código es más mantenible

---

#### Paso 4: Comparar ambos lado a lado

Actualiza `src/App.js` para mostrar ambas listas:

```jsx
import React from 'react';
import TaskListMonolithic from './components/TaskListMonolithic';
import TaskList from './components/TaskList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Ejemplo 3: Props + State - Comparación</h1>

      <h2 style={{ color: '#ffc107' }}>ANTES: Todo en un componente</h2>
      <TaskListMonolithic />

      <h2 style={{ color: '#28a745', marginTop: '40px' }}>DESPUÉS: Separado en componentes</h2>
      <TaskList />
    </div>
  );
}

export default App;
```

**Guarda (Ctrl+S) y observa:**
- Ambas listas funcionan exactamente igual
- La diferencia está en la **organización del código**
- Abre ambos archivos en tu editor y compara

---

### Experimento Práctico

**Prueba esto para ver la ventaja de separar componentes:**

1. **Cambia el diseño de TaskItem.js**:
   - Cambia el `backgroundColor` de `'#f8f9fa'` a `'#e3f2fd'` (azul claro)
   - Cambia el texto del botón de "Eliminar" a "Borrar"
   - Guarda y observa

2. **Resultado**:
   - En la lista verde (modular): TODAS las tareas se actualizan automáticamente
   - Solo modificaste TaskItem.js (30 líneas)
   - Cambio rápido y localizado

3. **Ahora intenta lo mismo en TaskListMonolithic.js**:
   - Busca el `backgroundColor` en el `.map()` (línea aproximada 940)
   - Está mezclado con toda la lógica
   - Más difícil de encontrar y modificar

---

### Resumen de la diferencia

| Aspecto | Monolítico (ANTES) | Modular (DESPUÉS) |
|---------|-------------------|-------------------|
| **Archivos** | 1 archivo (TaskListMonolithic.js) | 2 archivos (TaskList.js + TaskItem.js) |
| **Líneas por archivo** | aproximadamente 110 líneas en un solo archivo | aproximadamente 80 líneas + aproximadamente 30 líneas |
| **State** | Todo en un componente | Solo en el padre (TaskList) |
| **Props** | No se usan | TaskItem recibe task y onDelete |
| **HTML de tarea** | Mezclado en el `.map()` | Separado en TaskItem.js |
| **Reutilización** | No puedes reutilizar el diseño | TaskItem es reutilizable |
| **Modificar diseño** | Buscar en 110 líneas | Abrir TaskItem.js (30 líneas) |
| **Legibilidad** | Difícil (todo junto) | Fácil (separado por responsabilidad) |
| **Mantenibilidad** | Baja (crece sin control) | Alta (cada componente tiene 1 tarea) |

**Conclusión:**
Separar componentes usando Props y State permite crear aplicaciones escalables. El padre gestiona los datos (state), los hijos se encargan de la presentación (props). Este patrón se usa en TODAS las aplicaciones React profesionales.

---

## Estructura Final del Proyecto

```
props-state-ejemplo/
├── src/
│   ├── components/
│   │   ├── UserCard.js      (Ejemplo 1: Props)
│   │   ├── Counter.js        (Ejemplo 2: State)
│   │   ├── TaskItem.js       (Ejemplo 3: Props)
│   │   └── TaskList.js       (Ejemplo 3: State + Props)
│   ├── App.js
│   └── index.js
├── package.json
└── node_modules/
```

---

## Diferencias Clave: Props vs State

| Característica | Props | State |
|----------------|-------|-------|
| **Origen** | Vienen del componente padre | Se definen en el componente |
| **Mutabilidad** | Inmutables (solo lectura) | Mutables (con `setState`) |
| **Cambios** | Padre re-renderiza con nuevos props | `setState()` causa re-render |
| **Uso típico** | Configuración, datos estáticos | Datos dinámicos, interactividad |

---

## Comandos Útiles

```bash
# Levantar servidor de desarrollo
npm start

# Detener servidor
Ctrl + C

# Instalar dependencias (si clonaste el proyecto)
npm install

# Build para producción
npm run build
```

---

## Ejercicio Propuesto

Modifica `TaskList.js` para:
1. Agregar un checkbox que marque tareas como "completadas"
2. Mostrar tareas completadas con texto tachado
3. Agregar un botón "Limpiar completadas"

**Pista:** Cambia el state de un array de strings a un array de objetos:
```jsx
const [tasks, setTasks] = useState([
  { text: 'Tarea 1', completed: false }
]);
```

---


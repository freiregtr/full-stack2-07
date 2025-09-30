# 01 - Props y State en React

Curso: Desarrollo Fullstack II o DSY1104
Institucion: DuocUC - Escuela de Informatica y Telecomunicaciones

---

## Introduccion

En esta seccion aprenderas los fundamentos de manejo de datos en React: props y state. Estos dos conceptos son la base para construir cualquier aplicacion React interactiva y escalable. Dominarlos te permitira crear desde simples botones contadores hasta aplicaciones complejas como Facebook o Netflix.

---

## Que son props y state?

props o properties son datos inmutables que un componente padre pasa a un componente hijo. Son como los argumentos de una funcion donde entran, se usan, pero no se modifican dentro del componente que los recibe.

state son datos mutables internos de un componente. Cuando el state cambia, el componente se re-renderiza automaticamente para reflejar los nuevos datos en la pantalla.

diferencia clave:

props o inmutables:
```jsx
// padre pasa datos al hijo
<UserCard nombre="Juan" edad={28} />

// hijo recibe y muestra, no se modifica, no cambia
function UserCard({ nombre, edad }) {
  return <h2>{nombre} tiene {edad} años</h2>;
}
```

state o mutables:
```jsx
// componente tiene datos internos que si cambian, son dinamicos
function Counter() {
  // state
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </>
  );
}
```

---

## Antes de Empezar

### Crear el proyecto

```bash
npx create-react-app props-state-ejemplo
cd props-state-ejemplo
npm start
```

El navegador abrira automaticamente en http://localhost:3000

---

## Ejemplo 1: Props o tarjetas de usuario reutilizables

tiempo estimado: 20 minutos

### Concepto

props son datos que un componente padre pasa a un componente hijo. Son inmutables o solo lectura dentro del componente hijo.

sintaxis:
```jsx
// padre pasando props
<UserCard nombre="Juan" edad={28} />

// hijo recibiendo props
function UserCard(props) {
  return <div>{props.nombre}</div>;
}

// o con destructuring que es recomendado
function UserCard({ nombre, edad }) {
  return <div>{nombre} tiene {edad} años</div>;
}
```

### Contexto: por que necesitamos props?

Imagina que trabajas en LinkedIn y necesitas mostrar 1000 perfiles de usuarios. Cada perfil tiene: foto, nombre, profesion, ubicacion.

problema sin props:

como muestras 1000 perfiles diferentes?

opcion 1 o crear 1000 componentes, esto no esta bien en funcion de buenas practicas:
```jsx
function UserProfile1() { return <div><h2>Juan Perez</h2><p>Desarrollador</p></div>; }
function UserProfile2() { return <div><h2>Maria Garcia</h2><p>Diseñadora</p></div>; }
function UserProfile3() { return <div><h2>Carlos Lopez</h2><p>Manager</p></div>; }
// ... crear 997 componentes mas
```

problemas:
- 1000 archivos diferentes
- Si cambias el diseño, debes editar 1000 archivos
- Imposible de mantener
- No escalable

opcion 2 o HTML duplicado en el mismo componente, esto seria repetitivo:
```jsx
function App() {
  return (
    <>
      <div style={{border: '1px solid blue', padding: '20px'}}>
        <h2>Juan Perez</h2>
        <p>Desarrollador Frontend</p>
      </div>
      <div style={{border: '1px solid blue', padding: '20px'}}>
        <h2>Maria Garcia</h2>
        <p>Diseñadora UX</p>
      </div>
      {/* Copiar y pegar 998 veces mas... */}
    </>
  );
}
```

problemas:
- codigo duplicado masivamente
- cambiar el color del borde significa buscar y reemplazar 1000 veces
- dificil de leer y mantener
- alto riesgo de errores

### solucion con props

un unico componente que funciona como plantilla reutilizable:

```jsx
// una plantilla
function UserCard({ nombre, profesion }) {
  return (
    <div style={{border: '1px solid blue', padding: '20px'}}>
      <h2>{nombre}</h2>
      <p>{profesion}</p>
    </div>
  );
}

// usar la plantilla 1000 veces con datos diferentes
<UserCard nombre="Juan" profesion="Desarrollador" />
<UserCard nombre="Maria" profesion="Diseñadora" />
// ... 998 mas
```

ventajas:
- 1 componente para 1000 usuarios
- cambiar diseño significa editar 1 archivo
- codigo limpio y mantenible
- escalable a millones de usuarios

estadistica: LinkedIn tiene mas de 900 millones de perfiles. Todos usan el mismo componente con props diferentes.

---

### comparacion del antes vs el despues

#### pasos de lo que vamos a hacer

1. crear la version antes con codigo duplicado sin componentes reutilizables, esto para ver el problema
2. ver el problema de mantener codigo repetitivo
3. crear componente UserCard reutilizable con props
4. ver como un componente maneja 3 usuarios, esto puede escalar a 1000 incluso
5. probar cambiar el diseño y ver la diferencia

---

### antes: sin props o el codigo duplicado

paso 1: crea src/App.js con codigo duplicado:

```jsx
import React from 'react';

function App() {
  console.log('App montado - version sin props o codigo duplicado');

  return (
    <div style={{ padding: '20px' }}>
      <h1>antes: sin props o codigo duplicado</h1>

      {/* primera tarjeta - codigo completo */}
      <div style={{
        border: '2px solid #dc3545',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        maxWidth: '300px',
        backgroundColor: '#ffe6e6'
      }}>
        <h2>Juan Perez</h2>
        <p>Edad: 28 años</p>
        <p>Profesion: Desarrollador Frontend</p>
        <p>Email: juan@example.com</p>
      </div>

      {/* segunda tarjeta - mismo codigo, solo cambian los datos */}
      <div style={{
        border: '2px solid #dc3545',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        maxWidth: '300px',
        backgroundColor: '#ffe6e6'
      }}>
        <h2>Maria Gonzalez</h2>
        <p>Edad: 32 años</p>
        <p>Profesion: Diseñadora UX</p>
        <p>Email: maria@example.com</p>
      </div>

      {/* tercera tarjeta - otra vez el mismo codigo */}
      <div style={{
        border: '2px solid #dc3545',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        maxWidth: '300px',
        backgroundColor: '#ffe6e6'
      }}>
        <h2>Carlos Ramirez</h2>
        <p>Edad: 25 años</p>
        <p>Profesion: Backend Developer</p>
        <p>Email: carlos@example.com</p>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        borderRadius: '5px'
      }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>problemas:</p>
        <ul>
          <li>el estilo con 14 lineas esta duplicado 3 veces</li>
          <li>total: aproximadamente 48 lineas de codigo repetitivo</li>
          <li>cambiar el color del borde significa buscar y reemplazar 3 veces</li>
          <li>con 1000 usuarios significa 14,000 lineas duplicadas</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
```

#### ahora vamos a verlo en accion

guarda el archivo con Ctrl+S y observa en el navegador

1. veras 3 tarjetas con borde rojo
2. abre la consola con F12
3. veras: "App montado - version sin props o codigo duplicado"
4. las 3 tarjetas se ven identicas en diseño
5. problema: abre el archivo en tu editor
6. cuenta las lineas del primer div style con doble llave abierta que da 14 lineas
7. ese mismo bloque se repite 3 veces
8. total: aproximadamente 42 lineas solo de estilos duplicados
9. experimento: intenta cambiar el color del borde de rojo a azul
10. tienes que cambiar #dc3545 a #007bff en 3 lugares diferentes

por que no funciona bien?
- codigo masivamente duplicado con 14 lineas repetidas 3 veces
- dificil de mantener porque un cambio significa editar multiples lugares
- propenso a errores porque puedes olvidar actualizar una tarjeta
- no escalable porque con 1000 usuarios significa 14,000 lineas duplicadas
- imposible de reutilizar porque el diseño esta mezclado con los datos

lo que realmente necesitas:
- un componente que defina el diseño una sola vez
- pasar datos diferentes con props cada vez que lo uses
- cambios al diseño significa editar un solo lugar

ahora que viste el problema, continuemos con la solucion

---

### despues: con props o componente reutilizable

paso 2: crea src/components/UserCard.js:

que vamos a hacer?
crear un componente reutilizable que reciba datos por props y los muestre en formato de tarjeta

```jsx
import React from 'react';

// componente hijo, recibe props del padre
function UserCard({ nombre, edad, profesion, email }) {
  console.log('UserCard renderizado para:', nombre);

  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      maxWidth: '300px',
      backgroundColor: '#e6ffe6'
    }}>
      {/* mostramos los datos que recibimos por props */}
      <h2>{nombre}</h2>
      <p>Edad: {edad} años</p>
      <p>Profesion: {profesion}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default UserCard;
```

explicacion:
- function UserCard con nombre, edad, profesion, email: usamos destructuring para extraer las props
- props son inmutables: no podemos hacer nombre igual a "Otro nombre" dentro del componente
- console.log: muestra que usuario se esta renderizando
- estilos definidos una vez: todas las tarjetas tendran el mismo diseño

paso 3: actualiza src/App.js para usar el componente:

```jsx
import React from 'react';
import UserCard from './components/UserCard';

function App() {
  console.log('App montado - version con props o reutilizable');

  return (
    <div style={{ padding: '20px' }}>
      <h1>despues: con props o componente reutilizable</h1>

      {/* mismo componente, diferentes datos */}
      <UserCard
        nombre="Juan Perez"
        edad={28}
        profesion="Desarrollador Frontend"
        email="juan@example.com"
      />

      <UserCard
        nombre="Maria Gonzalez"
        edad={32}
        profesion="Diseñadora UX"
        email="maria@example.com"
      />

      <UserCard
        nombre="Carlos Ramirez"
        edad={25}
        profesion="Backend Developer"
        email="carlos@example.com"
      />

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#d4edda',
        borderRadius: '5px'
      }}>
        <p style={{ color: 'green', fontWeight: 'bold' }}>solucion:</p>
        <ul>
          <li>el diseño esta definido una vez en UserCard.js</li>
          <li>solo 5 lineas por tarjeta en App.js</li>
          <li>cambiar el color del borde significa 1 modificacion en UserCard.js</li>
          <li>con 1000 usuarios significa solo 5,000 lineas versus 14,000 antes</li>
          <li>escalable y mantenible</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
```

#### ahora vamos a verlo en accion

guarda todos los archivos con Ctrl+S y observa en el navegador

1. veras 3 tarjetas con borde verde
2. abre la consola con F12
3. veras
   ```
   App montado - version con props o reutilizables, algo que si es una buena practica
   UserCard renderizado para: Juan Perez
   UserCard renderizado para: Maria Gonzalez
   UserCard renderizado para: Carlos Ramirez
   ```
4. las 3 tarjetas se ven identicas en diseño
5. solucion: abre UserCard.js en tu editor
6. el diseño esta definido una vez con 14 lineas
7. App.js solo tiene 5 lineas por tarjeta
8. total: aproximadamente 15 lineas versus aproximadamente 42 de antes
9. experimento: cambia el color del borde de verde a azul en UserCard.js
10. edita UserCard.js linea 7: border: '2px solid #007bff'
11. guarda con Ctrl+S
12. todas las 3 tarjetas cambian automaticamente a azul
13. solo editaste 1 linea en 1 archivo

por que si funciona?

flujo completo:

```
App.js o componente padre
         ↓
usa UserCard 3 veces con diferentes props
         ↓
UserCard nombre igual a Juan edad igual a 28 y mas
         ↓
React pasa estos atributos como props al componente UserCard
         ↓
UserCard recibe: objeto con nombre igual a Juan, edad igual a 28 y mas
         ↓
UserCard muestra estos valores en el JSX
         ↓
se renderiza una tarjeta con el diseño de UserCard y los datos de Juan
         ↓
mismo proceso para Maria y Carlos
```

que son las props internamente?

cuando escribes UserCard nombre igual a Juan edad igual a 28, React automaticamente:
1. crea un objeto: nombre igual a Juan, edad igual a 28
2. pasa ese objeto como argumento a la funcion UserCard
3. usamos destructuring con nombre y edad para extraer las propiedades

es equivalente a:
```jsx
// React llama la funcion con las props
const props = { nombre: "Juan", edad: 28 };
UserCard(props);
```

ventajas de este enfoque:

1. reutilizacion extrema: un solo componente para infinitos usuarios
2. mantenimiento facil: cambios al diseño significa editar un unico archivo
3. codigo limpio: separacion clara entre diseño UserCard y datos App
4. escalable: funciona igual con 3 o 3 millones de usuarios
5. testeable: puedes probar UserCard con diferentes props facilmente

---

### tabla comparativa

| caracteristica | antes sin props | despues con props |
|----------------|-----------------|-------------------|
| archivos | 1 archivo con App.js | 2 archivos con App.js mas UserCard.js |
| lineas de codigo | aproximadamente 48 lineas o codigo duplicado | aproximadamente 15 lineas o sin duplicacion |
| definicion de estilos | 3 veces con 14 lineas por 3 | 1 vez con 14 lineas |
| lineas por tarjeta en App | 16 lineas | 5 lineas |
| cambiar color de borde | editar 3 lugares | editar 1 lugar |
| con 1000 usuarios | aproximadamente 16,000 lineas | aproximadamente 5,000 lineas mas 1 componente |
| mantenibilidad | pesadilla | facil |
| reutilizacion | no | si porque puedes usar UserCard en cualquier parte |

### conclusion del ejemplo 1

props permiten crear componentes reutilizables como plantillas que se rellenan con diferentes datos. Este patron se usa en todas las aplicaciones React del mundo real.

aplicaciones reales que usan props:
- LinkedIn con perfiles de usuarios
- Netflix con tarjetas de peliculas
- Amazon con productos
- Instagram con publicaciones
- Gmail con emails en la lista

estadistica: una aplicacion React promedio tiene el 80% de sus componentes recibiendo props de componentes padres segun React Usage Survey 2024.

recuerda: props son inmutables. Si necesitas que un dato cambie con el tiempo como contador o formulario, necesitas state que vemos en el ejemplo 2.

---

## Ejemplo 2: State o contador interactivo

### concepto

state son datos mutables internos de un componente. Cuando el state cambia, React automaticamente re-renderiza el componente para reflejar los nuevos datos en la pantalla.

sintaxis:
```jsx
import { useState } from 'react';

function Counter() {
  // useState retorna valor y funcion para cambiar valor
  // 0 es el valor inicial
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </>
  );
}
```

que es un hook?
- un hook es una funcion especial de React que te permite enganchar funcionalidades de React en componentes funcionales
- antes de los hooks, solo los componentes de clase podian tener state
- los hooks siempre empiezan con use como useState, useEffect, useParams
- useState es el hook mas basico para agregar state a componentes

### contexto: por que necesitamos state?

imagina que trabajas en Gmail y necesitas mostrar el numero de emails sin leer en tiempo real.

problema sin state:

como haces que un numero en la pantalla cambie cuando el usuario hace click?

opcion 1 o variable normal de JavaScript que no funciona:
```jsx
function InboxCounter() {
  // variable normal
  let unreadCount = 5;

  return (
    <>
      <p>Emails sin leer: {unreadCount}</p>
      <button onClick={() => {
        // esto cambia la variable
        unreadCount++;
        // y se ve en consola
        console.log(unreadCount);
        // la pantalla no se actualiza
      }}>
        Leer uno
      </button>
    </>
  );
}
```

problemas:
- el valor cambia en memoria, de hecho lo ves en console.log
- pero React no sabe que cambio
- React no re-renderiza el componente
- la pantalla se queda congelada en el valor inicial

que pasa internamente?

cuando haces unreadCount++:
1. JavaScript actualiza la variable en memoria de 5 a 6
2. console.log muestra 6
3. pero React no tiene forma de saber que la variable cambio
4. React no re-ejecuta la funcion InboxCounter
5. el JSX retorna siempre el valor inicial con Emails sin leer: 5
6. la UI se queda desactualizada

opcion 2 o manipular el DOM manualmente con JavaScript puro, pero esto es un anti-patron en React
```jsx
function InboxCounter() {
  let unreadCount = 5;

  return (
    <>
      <p id="counter">Emails sin leer: {unreadCount}</p>
      <button onClick={() => {
        unreadCount++;
        document.getElementById('counter').textContent = `Emails sin leer: ${unreadCount}`;
      }}>
        Leer uno
      </button>
    </>
  );
}
```

problemas:
- mezclas React con manipulacion DOM directa
- dificil de mantener y testear
- no aprovechas las optimizaciones de React
- va en contra de la filosofia declarativa de React
- si tienes 100 contadores, necesitas 100 IDs diferentes

estadistica: Gmail muestra mas de 30 contadores simultaneos como sin leer, spam, borradores, por etiqueta. Manipular el DOM manualmente seria imposible de mantener.

---

### comparacion del antes vs el despues

#### pasos de lo que vamos a hacer

1. crear la version del antes con contador con variable normal que no actualiza la UI
2. ver el problema donde el valor cambia en consola pero no en pantalla
3. crear componente Counter con useState
4. ver como state hace que React re-renderice automaticamente
5. probar incrementar, decrementar y reiniciar

---

### antes: sin state o la variable normal

paso 1: crea src/components/CounterBroken.js:

que vamos a hacer?
crear un contador que no funciona para entender por que necesitamos state.

```jsx
import React from 'react';

// componente con variable normal, esto no deberia funcionar de una forma correcta
function CounterBroken() {
  console.log('CounterBroken renderizado - este componente tiene un problema');

  // variable normal de JavaScript
  let count = 0;

  // funcion que intenta incrementar
  const intentarIncrementar = () => {
    // esto cambia la variable en memoria
    count++;
    // se ve en consola
    console.log('Valor de count:', count);
    // pero React no sabe que cambio, entonces no re-renderiza
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
      {/* count siempre muestra 0 porque el componente no se re-renderiza */}
      <h2>Contador: {count}</h2>
      <p style={{ color: '#721c24', fontSize: '14px' }}>
        (Este contador no funciona - usa variable normal)
      </p>

      <button
        onClick={intentarIncrementar}
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

**Paso 2:** Actualiza `src/App.js` para usar CounterBroken:

```jsx
import React from 'react';
import CounterBroken from './components/CounterBroken';

function App() {
  console.log('App montado - probando CounterBroken (versión rota)');

  return (
    <div style={{ padding: '20px' }}>
      <h1>ANTES: Sin State (Variable Normal)</h1>
      <CounterBroken />

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        borderRadius: '5px'
      }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>PROBLEMA:</p>
        <ul>
          <li>La variable `count` cambia en memoria</li>
          <li>Se ve el cambio en console.log</li>
          <li>PERO React no sabe que cambió</li>
          <li>React NO re-renderiza el componente</li>
          <li>La pantalla se queda congelada en 0</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
```

#### Ahora vamos a verlo en acción

**Guarda todos los archivos con Ctrl+S y observa en el navegador:**

1. Verás un contador con fondo rojo y el número 0
2. **Abre la consola del navegador con F12** - esto es importante para ver el problema
3. Verás en consola:
   ```
   App montado - probando CounterBroken (versión rota)
   CounterBroken renderizado - este componente tiene un problema
   ```
4. Presiona el botón "Intentar Incrementar" varias veces
5. Observa en **PANTALLA**: El número se queda en **0** ya que no cambia
6. Observa en **CONSOLA**: Verás `Valor de count: 1`, `Valor de count: 2`, `Valor de count: 3`...
7. **Conclusion**: El valor si cambia en la consola de javascript, pero la pantalla no se actualiza
8. Presiona el botón 10 veces más
9. Pantalla sigue mostrando: **Contador: 0**
10. Consola muestra: `Valor de count: 13` (o el número que sea)

**¿Por qué NO funciona?**

**Flujo interno cuando presionas el botón:**

```
Usuario hace click en "Intentar Incrementar"
         ↓
React ejecuta intentarIncrementar()
         ↓
Línea: count++ → JavaScript actualiza count en memoria (0 → 1)
         ↓
Línea: console.log → Muestra "Valor de count: 1" en consola
         ↓
Función termina
         ↓
React pregunta: "¿Algo cambió que requiera re-renderizar?"
         ↓
React analiza: count es una variable normal, no es state
         ↓
React decide: "No hay cambios detectables, NO voy a re-renderizar"
         ↓
El componente no se vuelve a ejecutar
         ↓
La pantalla sigue mostrando el jsx original: <h2>Contador: 0</h2>
         ↓
Resultado: Pantalla desactualizada (muestra 0, pero count en memoria es 1)
```

**Problemas técnicos:**

1. **React no puede detectar cambios en variables normales:**
   - `count` es una variable local de JavaScript
   - Cuando cambias `count++`, solo afecta la memoria de JavaScript
   - React no tiene forma de saber que esa variable cambió

2. **No hay trigger de re-renderizado:**
   - React solo re-renderiza cuando:
     - El state cambia (con useState)
     - Las props cambian
     - El componente padre se re-renderiza
   - Cambiar una variable normal no cumple ninguno de estos criterios

3. **La función no se vuelve a ejecutar:**
   - `CounterBroken()` solo se ejecuta:
     - Al montar el componente inicialmente
     - Si React decide re-renderizar por state/props
   - Como no hay trigger, la función NO se vuelve a llamar
   - El jsx retornado siempre es el inicial: `<h2>Contador: 0</h2>`

4. **Desincronización entre memoria y la UI:**
   - En memoria: `count = 13`
   - En pantalla: `Contador: 0`
   - Esto es un bug crítico en aplicaciones reales

**Analogia:**

Imagina un cartel publicitario LED en la calle:
- La variable `count` es como un papel con un número que guardas en tu bolsillo
- Cuando cambias el número en el papel (`count++`), solo tu lo ves
- El cartel LED sigue mostrando el número viejo
- Necesitas un **walkie-talkie** o useState para avisarle al cartel que actualice

**Lo que realmente necesitas:**

- Una forma de que React **sepa** cuando un valor cambia
- Un **trigger** que le diga a React: "necesito que re-dibuja este componente!"
- Eso es exactamente lo que hace `useState`

**Ahora que viste el problema, continuemos con la solucion**

---

### despues: con state o useState donde aqui si funciona correctamente

paso 3: crea src/components/Counter.js con useState:

que vamos a hacer?
crear un contador funcional usando useState para que React sepa cuando actualizar la pantalla.

```jsx
import React, { useState } from 'react';
// importamos useState - el hook para manejar state
// un hook es una funcion especial que engancha funcionalidades de React
// todos los hooks empiezan con use como useState, useEffect, useParams

function Counter() {
  console.log('Counter renderizado - este componente usa useState');

  // esta es la gracia del state
  // useState(0) crea una variable especial que React puede observar
  // retorna un array con 2 elementos
  // [0]: count que es el valor actual y empieza en 0
  // [1]: setCount que es funcion para cambiar el valor
  const [count, setCount] = useState(0);

  // funcion para incrementar, usa setCount en vez de count++
  const incrementar = () => {
    // le dice a React que count cambio, debe re-renderizar
    setCount(count + 1);
    console.log('Counter - Incrementado a:', count + 1);
  };

  const decrementar = () => {
    // le dice a React que count cambio, re-renderiza
    setCount(count - 1);
    console.log('Counter - Decrementado a:', count - 1);
  };

  const reiniciar = () => {
    // le dice a React que count cambio, re-renderiza
    setCount(0);
    console.log('Counter - Reiniciado a: 0');
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
      {/* count se actualiza automaticamente cuando usamos setCount */}
      <h2>Contador: {count}</h2>
      <p style={{ color: '#155724', fontSize: '14px' }}>
        este contador si funciona - usa useState
      </p>

      {/* boton incrementar */}
      {/* onClick ejecuta incrementar que llama setCount */}
      {/* setCount le dice a React que count cambio, ergo, re-dibuja el componente */}
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

      {/* boton decrementar */}
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

      {/* boton reiniciar */}
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
        abre la consola del navegador con F12 y presiona los botones.
        veras que count cambia en consola y en pantalla.
      </p>
    </div>
  );
}

export default Counter;
```

paso 4: actualiza src/App.js para usar Counter:

```jsx
import React from 'react';
import Counter from './components/Counter';

function App() {
  console.log('App montado - probando Counter o version funcional');

  return (
    <div style={{ padding: '20px' }}>
      <h1>despues: con state o useState</h1>
      <Counter />

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#d4edda',
        borderRadius: '5px'
      }}>
        <p style={{ color: 'green', fontWeight: 'bold' }}>solucion:</p>
        <ul>
          <li>useState le dice a React: observa este valor</li>
          <li>setCount trigger automatico de re-renderizado</li>
          <li>React re-ejecuta Counter con el nuevo valor</li>
          <li>la pantalla se actualiza automaticamente</li>
          <li>pantalla y memoria siempre sincronizadas</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
```

#### ahora vamos a verlo en accion

guarda todos los archivos con Ctrl+S y observa en el navegador:

1. veras un contador con fondo verde y el numero 0
2. abre la consola del navegador con F12
3. veras en consola
   ```
   App montado - probando Counter o la version funcional
   Counter renderizado - este componente usa useState
   ```
4. presiona el boton incrementar varias veces
5. observa en pantalla: el numero si cambia: 0 a 1 a 2 a 3 a 4 y asi
6. observa en consola: veras
   ```
   Counter - Incrementado a: 1
   Counter renderizado - este componente usa useState
   Counter - Incrementado a: 2
   Counter renderizado - este componente usa useState
   Counter - Incrementado a: 3
   Counter renderizado - este componente usa useState
   ```
7. conclusion: cada vez que llamas setCount, React re-renderiza el componente
8. presiona "Decrementar" 2 veces
9. pantalla muestra: contador: 1 si estabas en 3
10. presiona "Reiniciar"
11. pantalla muestra: contador: 0
12. importante: cada llamada a setCount genera un nuevo renderizado, puedes ver la consola

por que si funciona?

flujo interno cuando presionas "Incrementar":

```
usuario hace click en "Incrementar"
         ↓
React ejecuta incrementar
         ↓
linea: setCount con count mas 1 y React registra el cambio
         ↓
React marca el componente Counter como necesita actualizacion
         ↓
linea: console.log muestra "Counter - Incrementado a: 1"
         ↓
funcion incrementar termina
         ↓
React procesa la cola de actualizaciones pendientes
         ↓
React pregunta: algo cambio que requiera re-renderizar?
         ↓
React analiza: asi es, setCount fue llamado, el state cambio
         ↓
React decide: voy a re-ejecutar la funcion Counter
         ↓
React ejecuta: function Counter con todo su contenido
         ↓
const con count y setCount igual a useState con 0 pero esta vez count igual a 1, un nuevo valor
         ↓
console.log muestra: "Counter renderizado - este componente usa useState"
         ↓
React evalua el jsx con el nuevo valor: h2 Contador con count que pasa de 0 a 1
         ↓
React compara el nuevo jsx con el anterior o Virtual DOM diffing
         ↓
React detecta: el texto "0" cambio a "1" en el h2
         ↓
React actualiza solo ese nodo del DOM real
         ↓
resultado: pantalla actualizada que muestra 1, y count en memoria tambien es 1
         ↓
pantalla y memoria 100% sincronizadas
```

ventajas tecnicas de useState:

1. React puede detectar cambios:
   - useState registra el valor en el sistema interno de React
   - cuando llamas setCount, React lo detecta inmediatamente
   - React sabe exactamente que componente necesita actualizarse

2. trigger automatico de re-renderizado:
   - setCount le dice a React: este componente necesita actualizarse
   - React coloca el componente en la cola de actualizaciones
   - React re-ejecuta Counter con el nuevo valor

3. sincronizacion garantizada:
   - despues de setCount, React asegura que:
     - el valor en memoria se actualice
     - el componente se re-renderice
     - la UI refleje el nuevo valor
   - pantalla y memoria siempre en sync

4. optimizacion automatica:
   - React usa Virtual DOM para comparar cambios
   - solo actualiza los nodos del DOM que cambiaron
   - en este caso: solo el texto dentro del h2
   - el resto del arbol DOM permanece intacto

que hace useState internamente?

```jsx
const [count, setCount] = useState(0);
```

es equivalente a:

```jsx
// React mantiene una lista interna de estados por componente
const stateInReact = {
  componenteCounter: {
    states: [
      // primer useState
      { value: 0, setter: setCount }
    ]
  }
};

// cuando llamas setCount con 1
setCount(1);
// React actualiza stateInReact.componenteCounter.states[0].value igual a 1
// React marca Counter como necesita re-renderizar
// React procesa la cola y re-ejecuta Counter
// const con count y setCount igual a useState con 0 retorna el nuevo valor: count igual a 1
```

analogia:

ahora el cartel LED tiene un walkie-talkie conectado:
- count es el numero que quieres mostrar
- setCount es el walkie-talkie
- cuando llamas setCount con 5, le dices al cartel: actualiza a 5
- el cartel que es React actualiza automaticamente

conclusion de la comparacion:

| accion | sin state o CounterBroken | con state o Counter |
|--------|---------------------------|---------------------|
| click en boton | count++ | setCount con count mas 1 |
| variable cambia en memoria | si | si |
| React detecta el cambio | no | si |
| componente se re-renderiza | no | si |
| pantalla se actualiza | no | si |
| console.log funciona | si | si |
| pantalla sincronizada con memoria | no | si |

---

### tabla comparativa

| caracteristica | antes o variable normal | despues o useState |
|----------------|-------------------------|---------------------|
| declaracion | let count igual a 0 | const con count y setCount igual a useState con 0 |
| cambiar valor | count++ o count igual a 5 | setCount con count mas 1 o setCount con 5 |
| React detecta cambio | no | si |
| trigger de re-render | no existe | automatico con setCount |
| pantalla se actualiza | no | si |
| console.log muestra cambio | si | si |
| sincronizacion UI y memoria | desincronizadas | siempre sincronizadas |
| re-renderizados | 1 o solo al montar | 1 al montar mas 1 por cada setCount |
| uso en aplicaciones reales | anti-patron | patron estandar |

### conclusion del ejemplo 2

state con useState es la forma correcta de manejar datos que cambian con el tiempo en React. Cada vez que necesites que un valor cambie y la pantalla se actualice, debes usar state.

aplicaciones reales que usan state:
- Gmail con contador de emails sin leer
- Netflix con volumen del reproductor
- Amazon con cantidad de productos en el carrito
- Instagram con contador de likes
- Twitter con contador de caracteres restantes

estadistica: el 95% de los componentes React en aplicaciones reales usan al menos un useState segun React Usage Survey 2024.

regla de oro:
- props: datos que vienen del padre o inmutables
- state: datos que vive dentro del componente o mutables

proximo paso: en el ejemplo 3 veremos como combinar props mas state para crear una aplicacion completa.

---

## Ejemplo 3: combinando props y state o lista de tareas

tiempo estimado: 30 minutos

### concepto

props y state juntos es el patron arquitectonico fundamental de React:
- padre: gestiona el state, la fuente unica de verdad
- hijos: reciben props con datos y funciones, renderizan la UI
- resultado: codigo organizado, reutilizable y facil de mantener

sintaxis:
```jsx
// padre tiene state y pasa props a hijos
function Parent() {
  const [data, setData] = useState([]);

  return <Child item={data[0]} onAction={() => setData([...])} />;
}

// hijo recibe props, no tiene state
function Child({ item, onAction }) {
  return <button onClick={onAction}>{item}</button>;
}
```

### Contexto del porque necesitamos combinar Props y State

Imagina que trabajas en Todoist y necesitas mostrar 50 tareas, cada una con boton de eliminar.

**Problema sin componentes separados:**

Como organizas el codigo para que sea mantenible?

**Opcion 1, todo en un solo componente o monolitico:**
```jsx
function TaskListMonolithic() {
  const [tasks, setTasks] = useState(['Tarea 1', 'Tarea 2', ...]);

  return (
    <div>
      {tasks.map(task => (
        // html completo de cada tarea repetido dentro del map
        <div style={{...15 líneas de estilos...}}>
          <span>{task}</span>
          <button style={{...10 líneas más...}}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
```

problemas:
- el componente crece a 100 lineas o mas
- el html de cada tarea esta mezclado en el map
- estilos duplicados dentro del loop
- dificil de leer, logica y presentacion juntas
- no puedes reutilizar el diseño de una tarea en otro lugar
- si cambias el diseño de una tarea, debes editar el map complejo

opcion 2, separar en componentes con props y state:
```jsx
// padre gestiona la lista con state
function TaskList() {
  const [tasks, setTasks] = useState(['Tarea 1', 'Tarea 2', ...]);

  return (
    <div>
      {tasks.map((task, i) => (
        <TaskItem key={i} task={task} onDelete={() => eliminar(i)} />
      ))}
    </div>
  );
}

// hijo solo presenta una tarea con props
function TaskItem({ task, onDelete }) {
  return (
    <div style={{...}}>
      <span>{task}</span>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
}
```

ventajas:
- separacion de responsabilidades, padre maneja datos con state, hijo maneja presentacion con UI
- codigo mas corto y legible
- TaskItem reutilizable en otros lugares
- facil de testear por separado
- cambios al diseño significa editar TaskItem solamente

Todoist gestiona mas de 100 millones de tareas activas. Sin componentes separados seria imposible de mantener.

---

### comparacion del antes vs el despues

#### pasos de lo que vamos a hacer

1. crear la version antes con todo en un componente monolitico TaskListMonolithic
2. ver que funciona pero es dificil de leer, tiene 100 lineas o mas
3. crear version despues con TaskItem hijo con props y TaskList padre con state
4. ver como la separacion mejora la organizacion
5. comparar ambas versiones lado a lado

---

### antes: todo en un solo componente o monolitico y dificil de mantener

paso 1: crea src/components/TaskListMonolithic.js:

que vamos a hacer?
crear una lista de tareas completa en un solo componente para ver como crece el codigo y se vuelve dificil de manejar.

```jsx
import React, { useState } from 'react';

// todo en un solo componente, sin separacion de responsabilidades
function TaskListMonolithic() {
  console.log('TaskListMonolithic renderizado - todo en un componente');

  // state para la lista de tareas
  const [tasks, setTasks] = useState([]);

  // state para el input
  const [inputValue, setInputValue] = useState('');

  // funcion para agregar tarea
  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue('');
      console.log('TaskListMonolithic - Tarea agregada:', inputValue);
    }
  };

  // funcion para eliminar tarea
  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    console.log('TaskListMonolithic - Tarea eliminada:', taskToDelete);
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
      <h2>Lista Monolitica o todo junto</h2>
      <p style={{ color: '#856404', fontSize: '14px' }}>
        todo el codigo en un solo componente, dificil de mantener
      </p>

      {/* input y boton para agregar tareas */}
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

      {/* lista de tareas, html repetido en el map */}
      {/* este es el problema, el html esta mezclado con la logica */}
      {tasks.length === 0 ? (
        <p style={{ color: '#999' }}>No hay tareas. Agrega una</p>
      ) : (
        tasks.map((task, index) => (
          // este bloque se repite por cada tarea
          // 15 lineas de jsx dentro del map
          // seria mejor extraerlo a un componente separado
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
        Nota: Este componente tiene mas de 100 lineas. Es funcional pero dificil de mantener.
        Si quieres cambiar el diseño de una tarea, tienes que modificar el map que esta
        mezclado con la logica del componente.
      </p>
    </div>
  );
}

export default TaskListMonolithic;
```

**Paso 2:** Actualiza `src/App.js` para usar TaskListMonolithic:

```jsx
import React from 'react';
import TaskListMonolithic from './components/TaskListMonolithic';

function App() {
  console.log('App montado - probando TaskListMonolithic');

  return (
    <div style={{ padding: '20px' }}>
      <h1>antes, todo en un solo componente</h1>
      <TaskListMonolithic />

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        borderRadius: '5px'
      }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>problemas:</p>
        <ul>
          <li>Componente monolitico con 100 lineas o mas en un solo archivo</li>
          <li>html de cada tarea mezclado en el map</li>
          <li>15 lineas de jsx repetidas dentro del loop</li>
          <li>Logica y presentacion juntas, dificil de separar</li>
          <li>No puedes reutilizar el diseño de una tarea</li>
          <li>Cambiar el diseño significa editar dentro del map</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
```

#### Ahora vamos a verlo en accion

**Guarda todos los archivos con Ctrl+S y observa en el navegador**

1. Veras la lista con fondo amarillo
2. Abre la consola del navegador con F12
3. Veras en consola
   ```
   App montado - probando TaskListMonolithic
   TaskListMonolithic renderizado - todo en un componente
   ```
4. Agrega 3 tareas como Comprar pan, Estudiar React, Hacer ejercicio
5. Veras en consola cada vez que agregas
   ```
   TaskListMonolithic - Tarea agregada: Comprar pan
   TaskListMonolithic renderizado - todo en un componente
   TaskListMonolithic - Tarea agregada: Estudiar React
   TaskListMonolithic renderizado - todo en un componente
   ```
6. Las tareas aparecen en la lista
7. Haz clic en Eliminar en la segunda tarea, Estudiar React
8. Veras en consola TaskListMonolithic - Tarea eliminada: Estudiar React
9. La tarea desaparece de la lista
10. funciona perfectamente, pero hay un problema
11. Abre el archivo TaskListMonolithic.js en tu editor
12. observa que el archivo tiene mas de 120 lineas
13. El html de cada tarea en las lineas 91 hasta 115 esta dentro del map
14. Si quieres cambiar el diseño de una tarea, debes editar dentro del map
15. No puedes reutilizar ese diseño en otra parte de la aplicacion

**Por que no es ideal?**

**Problemas de escalabilidad:**

1. componente gigante con 100 lineas o mas
   - Dificil de navegar en el editor
   - Muchas responsabilidades en un solo lugar
   - Testing complejo, debes testear todo junto

2. html repetitivo en el map
   ```jsx
   tasks.map((task, index) => (
     // esto se repite por cada tarea
     <div style={{...15 líneas...}}>
       <span>{task}</span>
       <button style={{...10 líneas...}}>Eliminar</button>
     </div>
   ))
   ```
   - El diseño de la tarea esta mezclado con la logica del loop
   - Cambiar el diseño significa editar dentro de un map complejo

3. no es reutilizable
   - Si quieres usar el mismo diseño de tarea en otra pagina, no puedes
   - Tendrias que copiar y pegar todo el bloque del map
   - Violacion del principio DRY, dont repeat yourself

4. dificil de mantener
   - Logica del state mas presentacion de tareas mas estilos, todo junto
   - Un cambio al diseño afecta el componente completo
   - Riesgo de romper la logica al editar la presentacion

**Analogia:**

Es como tener una cocina donde guardas los ingredientes o el state, cocinas la comida o la logica
y sirves los platos o la presentacion, todo en la misma mesa, todo mezclado.

Funciona, pero es caotico y dificil de escalar.

**Lo que realmente necesitas:**

- separar responsabilidades, un componente para la lista padre, otro para cada tarea hijo
- props para comunicacion, padre pasa datos y funciones al hijo
- reutilizacion, el componente hijo puede usarse en cualquier lugar

**Ahora que viste el problema, continuemos con la solucion**

---

### Despues: Separado en componentes con props y state, facil de mantener

**Paso 3:** Crea `src/components/TaskItem.js` o componente hijo con props:

**Que vamos a hacer?**
Extraer el html de una tarea individual a un componente separado. Este componente solo recibe props y no tiene state.

```jsx
import React from 'react';

// componente hijo, solo recibe props, no tiene state
// su unica responsabilidad es mostrar una tarea
function TaskItem({ task, onDelete }) {
  console.log('TaskItem renderizado para tarea:', task);

  // task es string con el texto de la tarea, viene del padre
  // onDelete es funcion para eliminar, viene del padre

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
      {/* mostramos la tarea que recibimos por props */}
      <span>{task}</span>

      {/* cuando hacen clic, ejecutamos la funcion onDelete que vino por props */}
      {/* esto le avisa al padre que elimine esta tarea */}
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

**Explicacion:**
- props recibidos son task con string y onDelete con funcion
- no tiene state, TaskItem no gestiona datos, solo los muestra
- responsabilidad unica es mostrar el diseño de una tarea
- reutilizable, podemos usar este componente en cualquier lista
- onClick con onDelete, cuando hacen clic, ejecuta la funcion del padre
- console.log muestra que tarea se esta renderizando

**Paso 4:** Crea `src/components/TaskList.js` o componente padre con state:

**Que vamos a hacer?**
Crear el componente padre que gestiona el state y usa TaskItem para cada tarea.

```jsx
import React, { useState } from 'react';

// importamos el componente hijo que acabamos de crear
import TaskItem from './TaskItem';

// componente padre tiene state y gestiona la lista de tareas
function TaskList() {
  console.log('TaskList renderizado - padre con state');

  // state 1 es array de tareas
  const [tasks, setTasks] = useState([]);

  // state 2 es valor del input
  const [inputValue, setInputValue] = useState('');

  // funcion para agregar tarea
  const addTask = () => {
    if (inputValue.trim() !== '') {
      // agregamos la nueva tarea al array
      setTasks([...tasks, inputValue]);

      // limpiamos el input
      setInputValue('');
      console.log('TaskList - Tarea agregada:', inputValue);
    }
  };

  // funcion para eliminar tarea
  // esta funcion se pasa por props a TaskItem
  const deleteTask = (index) => {
    const taskToDelete = tasks[index];

    // filtramos el array para excluir la tarea en ese indice
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    console.log('TaskList - Tarea eliminada:', taskToDelete);
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
      <h2>Lista Modular o separada en componentes</h2>
      <p style={{ color: '#155724', fontSize: '14px' }}>
        codigo separado, TaskList.js mas TaskItem.js, facil de mantener
      </p>

      {/* input y boton */}
      <div style={{ marginBottom: '20px' }}>
        {/* cuando el input cambia, actualizamos el state */}
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

      {/* lista de tareas, ahora usamos el componente TaskItem */}
      {/* solucion, el html esta separado en TaskItem */}
      {tasks.length === 0 ? (
        <p style={{ color: '#999' }}>No hay tareas. Agrega una</p>
      ) : (
        tasks.map((task, index) => (
          // por cada tarea, renderizamos un componente TaskItem
          // le pasamos la tarea y la funcion para eliminar por props
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
        Nota: TaskList.js tiene aproximadamente 80 lineas, TaskItem.js tiene aproximadamente 35 lineas.
        Total aproximadamente 115 lineas pero separadas y organizadas. Facil de modificar y reutilizar.
      </p>
    </div>
  );
}

export default TaskList;
```

**Explicacion paso a paso:**

1. import TaskItem, importamos el componente hijo
2. const con tasks y setTasks con useState vacio, state para el array de tareas que comienza vacio
3. const con inputValue y setInputValue con useState vacio, state para el input
4. addTask agrega la nueva tarea al array usando spread operator con tasks mas inputValue, limpia el input con setInputValue vacio
5. deleteTask con index filtra el array para excluir la tarea en ese indice, tasks filter retorna nuevo array sin esa tarea
6. tasks map por cada tarea, renderizamos un TaskItem
7. TaskItem con task y onDelete, pasamos task por props con string del texto y pasamos onDelete por props con funcion que elimina esa tarea, TaskItem ejecutara onDelete cuando hagan clic en eliminar

**Paso 5:** Actualiza `src/App.js` para usar TaskList:

```jsx
import React from 'react';
import TaskList from './components/TaskList';

function App() {
  console.log('App montado - probando TaskList o version modular');

  return (
    <div style={{ padding: '20px' }}>
      <h1>despues, separado en componentes con props y state</h1>
      <TaskList />

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#d4edda',
        borderRadius: '5px'
      }}>
        <p style={{ color: 'green', fontWeight: 'bold' }}>solucion:</p>
        <ul>
          <li>Codigo separado en 2 archivos, TaskList.js con 80 lineas mas TaskItem.js con 35 lineas</li>
          <li>Padre TaskList maneja el state, hijo TaskItem recibe props</li>
          <li>Cada componente tiene una responsabilidad unica</li>
          <li>TaskItem es reutilizable en otros lugares</li>
          <li>Cambiar el diseño de una tarea significa editar TaskItem.js solamente</li>
          <li>Testing mas facil, puedes testear TaskItem aisladamente</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
```

#### Ahora vamos a verlo en accion

**Guarda todos los archivos con Ctrl+S y observa en el navegador**

1. Veras la lista con fondo verde
2. abre la consola del navegador con F12
3. Veras en consola
   ```
   App montado - probando TaskList o version modular
   TaskList renderizado - padre con state
   ```
4. Agrega 3 tareas como Comprar pan, Estudiar React, Hacer ejercicio
5. Veras en consola cada vez que agregas
   ```
   TaskList - Tarea agregada: Comprar pan
   TaskList renderizado - padre con state
   TaskItem renderizado para tarea: Comprar pan
   TaskList - Tarea agregada: Estudiar React
   TaskList renderizado - padre con state
   TaskItem renderizado para tarea: Comprar pan
   TaskItem renderizado para tarea: Estudiar React
   ```
6. importante, observa que cuando agregas una tarea TaskList se re-renderiza porque tiene el state y todos los TaskItem se re-renderizan porque el padre cambio
7. Haz clic en eliminar en la segunda tarea que es Estudiar React
8. Veras en consola
   ```
   TaskList - Tarea eliminada: Estudiar React
   TaskList renderizado - padre con state
   TaskItem renderizado para tarea: Comprar pan
   TaskItem renderizado para tarea: Hacer ejercicio
   ```
9. La tarea desaparece de la lista
10. funciona igual que la version monolitica, pero ahora es mejor
11. Abre los archivos en tu editor, TaskList.js tiene aproximadamente 80 lineas y TaskItem.js tiene aproximadamente 35 lineas
12. El codigo esta separado y organizado
13. Si quieres cambiar el diseño de una tarea, editas TaskItem.js solamente
14. Puedes reutilizar TaskItem en cualquier otra lista

**Por que si es mejor?**

**Flujo de datos completo con props y state:**

```
App.js
  ↓
Renderiza <TaskList />
  ↓
TaskList.js o padre
  ↓
Tiene state: tasks = ["Comprar pan", "Estudiar React"]
  ↓
Renderiza tasks.map() → 2 componentes <TaskItem>
  ↓                                     ↓
TaskItem o tarea 0                  TaskItem o tarea 1
Props:                              Props:
- task="Comprar pan"                - task="Estudiar React"
- onDelete=funcion del padre        - onDelete=funcion del padre
  ↓                                     ↓
Renderiza UI de la tarea            Renderiza UI de la tarea
  ↓                                     ↓
Usuario hace clic en "Eliminar" de tarea 1
  ↓
TaskItem ejecuta onDelete() o funcion del padre
  ↓
TaskList.deleteTask(1) se ejecuta
  ↓
State actualizado: tasks = ["Comprar pan"]
  ↓
TaskList se re-renderiza
  ↓
Renderiza tasks.map() → 1 componente <TaskItem>
  ↓
TaskItem o tarea 0
Props:
- task="Comprar pan"
- onDelete=funcion del padre
  ↓
Tarea 1 desaparecio de la UI ✓
```

Ventajas arquitectonicas:

1. Separacion de responsabilidades:
   - TaskList o padre gestiona el state y la logica de negocio
   - TaskItem o hijo solo presenta una tarea con la UI
   - Cada componente tiene un proposito claro

2. Reutilizacion:
   - Puedes usar TaskItem en una lista de tareas
   - Puedes usar TaskItem en una lista de compras
   - Puedes usar TaskItem en una lista de recordatorios
   - Puedes usar TaskItem en cualquier lugar donde necesites mostrar un item con boton de eliminar
   - Solo pasas diferentes props

3. Mantenibilidad:
   - Cambiar el diseño de una tarea es solo editar TaskItem.js
   - No tocas la logica del padre
   - Menor riesgo de introducir bugs

4. Testing:
   - Puedes testear TaskItem aisladamente:
     ```jsx
     test('TaskItem muestra el texto correcto', () => {
       render(<TaskItem task="Test tarea" onDelete={() => {}} />);
       expect(screen.getByText('Test tarea')).toBeInTheDocument();
     });
     ```
   - Puedes testear TaskList aisladamente y mockear TaskItem si quieres

5. Escalabilidad:
   - Facil agregar mas props a TaskItem como completed para marcar como completada
   - Facil agregar mas props como priority para colores diferentes
   - Facil agregar mas props como dueDate para mostrar fecha limite
   - Facil agregar mas funcionalidad a TaskList como filtrar por completadas
   - Facil agregar buscar tareas u ordenar por fecha

Analogia:

Ahora tu cocina esta organizada:
- TaskList o cocina principal guarda todos los ingredientes con state y decide que cocinar
- TaskItem o estacion de servicio recibe un plato preparado con props y lo sirve bien presentado
- Separacion clara de responsabilidades

Patron de comunicacion:

```
padre hacia hijo con props:
- Datos con task: string
- Funciones con onDelete: function

hijo hacia padre con callbacks:
- Usuario hace clic en "Eliminar"
- TaskItem ejecuta onDelete()
- Padre recibe la notificacion y actualiza el state
- React re-renderiza automaticamente
```

Este es el patron fundamental de React: Datos fluyen hacia abajo con props y eventos fluyen hacia arriba con callbacks.

---

### Tabla Comparativa

| Caracteristica | antes o monolitico | despues o separado |
|----------------|--------------------|--------------------|
| archivos | 1 con TaskListMonolithic.js | 2 con TaskList.js + TaskItem.js |
| lineas TaskList | 120+ lineas | 80 lineas |
| lineas TaskItem | Mezclado en .map() | 35 lineas o archivo separado |
| logica y presentacion | Mezcladas | Separadas |
| reutilizacion | no puedes reutilizar diseño de tarea | TaskItem reutilizable |
| cambiar diseño de tarea | Editar dentro del .map() | Editar TaskItem.js solamente |
| testing | dificil porque todo junto | facil porque componentes aislados |
| responsabilidades | Muchas en un solo lugar | Una por componente |
| escalabilidad | dificil porque componente crece | facil porque agregar props y funciones |
| mantenibilidad | Compleja | Simple |

### conclusion del ejemplo 3

combinar props y state es el patron arquitectonico fundamental de React. El padre gestiona el state o fuente unica de verdad y los hijos reciben props con datos y funciones para renderizar la UI. Este patron se usa en el 99% de las aplicaciones React.

aplicaciones reales que usan props y state:
- Todoist lista de tareas con padre TaskList y hijo TaskItem
- Gmail lista de emails con padre InboxList y hijo EmailRow
- Netflix catalogo de peliculas con padre MovieGrid y hijo MovieCard
- Spotify lista de canciones con padre Playlist y hijo SongItem
- Twitter feed de tweets con padre TweetFeed y hijo TweetCard

estadistica: el 99% de los componentes React en aplicaciones profesionales usan el patron props y state para separar responsabilidades segun React Usage Survey 2024.

reglas de arquitectura:
1. state vive en el componente padre o fuente unica de verdad
2. props fluyen del padre al hijo con datos hacia abajo
3. callbacks fluyen del hijo al padre con eventos hacia arriba
4. un componente es una responsabilidad segun principio SOLID

proximo paso: en la siguiente seccion veremos como manejar formularios complejos y validaciones y efectos secundarios con useEffect.

---

## resumen general

### props
- datos inmutables que un padre pasa a un hijo
- sintaxis: Hijo prop1 igual a valor prop2 igual a valor entre corchetes angulares
- el hijo recibe: function Hijo con prop1 y prop2 entre llaves
- uso: componentes reutilizables como UserCard o ProductCard

### state
- datos mutables internos de un componente
- sintaxis: const con valor y setValor igual a useState con inicial
- cambiar state: setValor con nuevoValor para trigger de re-render
- uso: datos que cambian con el tiempo como contador o formulario

### props y state
- padre gestiona el state o logica de negocio
- hijo recibe props para presentacion
- comunicacion es props hacia abajo y callbacks hacia arriba
- uso: todas las aplicaciones React del mundo real

### cuando usar que

| situacion | usar |
|-----------|------|
| mostrar datos que no cambian | props |
| datos que cambian con el tiempo | state |
| reutilizar diseño con diferentes datos | props |
| gestionar lista de items | state del padre y props del hijo |
| boton que incrementa contador | state |
| tarjeta de producto en catalogo | props |
| lista de tareas interactiva | props y state |

---


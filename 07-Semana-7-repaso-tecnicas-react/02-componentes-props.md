# 02 - Componentes y Props

**Curso:** Desarrollo Fullstack II o DSY1104
**Institucion:** DuocUC - Escuela de Informatica y Telecomunicaciones
**Tiempo estimado:** 20 minutos

---

## que vamos a hacer en esta fase

en esta fase vamos a crear nuestros primeros componentes reutilizables:
- componente StickyNote para mostrar una nota individual
- componente NotesGrid para mostrar la lista completa
- conectarlos en App.js
- usar CSS Modules desde el inicio
- agregar estilos CSS tipo post-it

al terminar veras 5 notas tipo adhesivo en el navegador.

---

## paso 4: entender CSS Modules

antes de crear componentes, hablemos de **mejores practicas de CSS en React**.

**el problema con CSS global tradicional:**

cuando usas CSS normal, todas las clases son globales:
- si dos componentes usan `.button` puede haber conflictos
- dificil saber que estilos afectan que componentes
- los estilos pueden "filtrarse" entre componentes
- necesitas inventar nombres unicos como `.header-button`, `.modal-button`

**la solucion: CSS Modules**

CSS Modules es una funcionalidad que viene incluida en create-react-app:
- cada componente tiene su propio archivo `.module.css`
- las clases se transforman automaticamente en nombres unicos
- no hay conflictos entre componentes
- React sabe exactamente que estilos pertenecen a cada componente

**como funciona:**

archivo: `StickyNote.module.css`
```css
.stickyNote {
  background: yellow;
}
```

archivo: `StickyNote.jsx`
```javascript
import styles from './StickyNote.module.css'

function StickyNote() {
  return <div className={styles.stickyNote}>nota</div>
}
```

React convierte esto en:
```html
<div class="StickyNote_stickyNote__xyz123">nota</div>
```

el nombre se genera automaticamente y es unico!

**que va en CSS Modules vs CSS global:**

CSS Modules (scoped):
- estilos de componentes reutilizables
- cada componente tiene su `.module.css`
- ejemplo: StickyNote, AddNoteForm, FilterBar

CSS global (App.css):
- reset y estilos base
- layout general de la app
- estilos de pagina que no son componentes
- ejemplo: .app, .container, .app-header

**colores dinamicos con CSS Variables:**

en vez de inline styles usaremos CSS Variables:

mal (inline styles):
```javascript
<div style={{ backgroundColor: color }}>
```

bien (CSS Variables):
```javascript
<div style={{ '--note-color': color }}>
```

```css
.stickyNote {
  background-color: var(--note-color);
}
```

esto separa los estilos (CSS) de los valores dinamicos (JavaScript).

---

## paso 5: crear componente StickyNote con CSS Module

este componente va a recibir los datos de una nota por props y mostrarlos.

vamos a crear una tarjeta tipo post-it que tenga:
- un header con la categoria y dos botones (favorito y eliminar)
- el titulo de la nota
- el contenido de la nota

crea el archivo src/components/StickyNote.jsx:

```javascript
import React from 'react';
import styles from './StickyNote.module.css';

// este componente recibe datos por props y los muestra
// recibe: id, title, content, category, color, isFavorite, onDelete, onToggleFavorite
function StickyNote({ id, title, content, category, color, isFavorite, onDelete, onToggleFavorite }) {
  return (
    <div
      className={styles.stickyNote}
      style={{ '--note-color': color }}
    >
      <div className={styles.stickyNoteHeader}>
        <span className={styles.category}>{category}</span>
        <div className={styles.actions}>
          <button
            onClick={() => onToggleFavorite(id)}
            className={styles.btnIcon}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <button
            onClick={() => onDelete(id)}
            className={styles.btnIcon}
          >
            ×
          </button>
        </div>
      </div>

      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default StickyNote;
```

guarda el archivo.

**refuerzo: que son props**

props son datos que un componente padre pasa a un componente hijo.
- son inmutables, el hijo no puede modificarlas
- se pasan como atributos: `<StickyNote title="hola" />`
- se reciben con destructuring: `function StickyNote({ title }) {}`

**por que usamos destructuring**

en vez de escribir props.title, props.content cada vez, escribimos solo title, content.

sin destructuring:
```javascript
function StickyNote(props) {
  return <h3>{props.title}</h3>;
}
```

con destructuring:
```javascript
function StickyNote({ title }) {
  return <h3>{title}</h3>;
}
```

es mas limpio y sabes exactamente que props espera el componente.

**que son onDelete y onToggleFavorite**

son funciones que vienen del padre como props.
- cuando el usuario hace click ejecutamos la funcion
- esto le avisa al padre que haga algo
- patron: datos bajan con props, eventos suben con callbacks

**que es (id) => en las funciones**

esta es una arrow function (funcion flecha). es una forma moderna de escribir funciones en JavaScript.

sintaxis:
```javascript
const nombreFuncion = (parametro) => {
  // codigo aqui
};
```

en nuestro caso:
- `(id)` es el parametro que recibe la funcion
- `=>` indica que es una arrow function
- el id nos dice cual nota eliminar o marcar como favorita

ejemplo completo del flujo:
1. usuario hace click en boton X de la nota con id '3'
2. se ejecuta `onClick={() => onDelete(id)}`
3. esto llama a `handleDelete('3')`
4. la funcion recibe el id '3' como parametro
5. hace console.log con ese id

---

## paso 6: crear estilos para StickyNote

ahora creamos el CSS Module para el componente.

crea el archivo src/components/StickyNote.module.css:

```css
/* estilos de la nota tipo post-it */
.stickyNote {
  /* usamos CSS Variable para el color dinamico */
  background: var(--note-color, #FFE17B);
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  min-height: 180px;
}

/* efecto hover: levanta y rota la nota */
.stickyNote:hover {
  transform: translateY(-4px) rotate(1deg);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

/* organiza categoria y botones en linea */
.stickyNoteHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

/* formato de la categoria */
.category {
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(0,0,0,0.5);
  letter-spacing: 0.5px;
}

/* organiza los botones en linea */
.actions {
  display: flex;
  gap: 8px;
}

/* botones circulares */
.btnIcon {
  background: rgba(255,255,255,0.7);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

/* efecto hover en botones */
.btnIcon:hover {
  background: white;
  transform: scale(1.1);
}

/* titulo de la nota */
.stickyNote h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 700;
}

/* contenido de la nota */
.stickyNote p {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}
```

guarda el archivo.

**nota sobre nombres de clases:**

en CSS Modules usamos camelCase para las clases:
- CSS: `.stickyNote` (no `.sticky-note`)
- JavaScript: `styles.stickyNote`

esto hace que sea mas facil usarlas en JavaScript sin comillas.

---

## paso 7: crear componente NotesGrid

este componente va a renderizar una lista de notas usando map.

este componente espera recibir un array de notas por props, pero aun no le pasamos datos reales. eso lo haremos en el siguiente paso cuando conectemos todo en App.js. por ahora solo armamos la estructura que renderiza una lista.

crea el archivo src/components/NotesGrid.jsx:

```javascript
import React from 'react';
import StickyNote from './StickyNote';

// este componente renderiza una lista de notas
// recibe notes (un array), onDelete (una funcion), onToggleFavorite (otra funcion)
function NotesGrid({ notes, onDelete, onToggleFavorite }) {
  // primero, si no hay notas mostramos un mensaje que no hay notas
  if (notes.length === 0) {
    return <p className="empty-state">no hay notas todavia. crea una!</p>;
  }

  // recorremos el array de notas con map y por cada una creamos un componente StickyNote
  return (
    <div className="notes-grid">
      {notes.map(note => (
        <StickyNote
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          category={note.category}
          color={note.color}
          isFavorite={note.isFavorite}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default NotesGrid;
```

guarda el archivo.

**refuerzo: map y key**

notes.map recorre el array notes y por cada nota crea un componente StickyNote.

**por que necesitamos key**

React usa key para identificar cada elemento de la lista
- debe ser un valor unico y estable
- nuca uses el index del array como key
- usa el id de cada nota

sin key React muestra un warning en consola y puede haber bugs al reordenar o eliminar elementos.

**que pasa internamente**

cuando agregas o eliminas una nota:
- React compara el nuevo array con el anterior
- usa key para saber que elementos cambiaron
- actualiza solo lo que cambio, no toda la lista
- esto hace que React sea rapido

---

## paso 8: actualizar App.js

ahora vamos a conectar todo en App.js.

aqui es donde finalmente pasamos los datos reales (mockNotes) al componente NotesGrid. tambien creamos las funciones handleDelete y handleToggleFavorite que por ahora solo hacen console.log, pero en la siguiente fase las vamos a mejorar con state.

reemplaza TODO el contenido de src/App.js:

```javascript
import React from 'react';
import NotesGrid from './components/NotesGrid';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  // funciones temporales => por ahora solo hacen console.log
  // en la proxima fase las vamos a mejorar con state

  // esta funcion se ejecuta cuando hacemos click en el boton X de eliminar
  // recibe el id de la nota como parametro para saber cual eliminar
  const handleDelete = (id) => {
    console.log('eliminar nota:', id);
  };

  // esta funcion se ejecuta cuando hacemos click en la estrella de favorito
  // recibe el id de la nota como parametro para saber cual marcar
  const handleToggleFavorite = (id) => {
    console.log('toggle favorito:', id);
  };

  // retornamos la estructura principal: un div que contiene un header con el titulo y un container con el grid de notas
  return (
    <div className="app">
      {/* header con el titulo de la app */}
      <header className="app-header">
        <h1>StickyNotes</h1>
      </header>

      {/* container que envuelve el grid de notas */}
      <div className="container">
        <NotesGrid
          notes={mockNotes}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}

export default App;
```

guarda el archivo.

---

## paso 9: agregar estilos CSS globales

ahora creamos los estilos globales para el layout general de la app.

reemplaza TODO el contenido de src/App.css:

```css
/* ========================================
   ESTILOS GLOBALES
   estos estilos son globales porque afectan
   el layout general de la app, no componentes
   ======================================== */

/* reset para quitar margenes por defecto */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* fuente de toda la app */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

/* fondo degradado de la app */
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* barra superior blanca */
.app-header {
  background: white;
  padding: 20px 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* titulo en el header */
.app-header h1 {
  color: #333;
  font-size: 32px;
}

/* centra el contenido */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* grid para organizar las notas en columnas */
.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

/* mensaje cuando no hay notas */
.empty-state {
  text-align: center;
  color: white;
  font-size: 18px;
  margin-top: 40px;
}
```

guarda el archivo.

**nota importante:**

fijate que en App.css NO estan los estilos de `.stickyNote`, `.btnIcon`, etc.
esos estan en `StickyNote.module.css` porque son especificos del componente.

App.css solo tiene:
- reset de estilos
- layout general (.app, .container)
- grid de notas (.notes-grid)
- mensaje vacio (.empty-state)

esto es **separation of concerns**: cada componente maneja sus propios estilos.

---

## prueba en el navegador

ve a tu navegador en http://localhost:3000

**que deberias ver:**
- 5 notas tipo post-it con colores diferentes
- cada nota tiene titulo, contenido y categoria
- al pasar el mouse sobre una nota se levanta un poco
- boton de estrella para favoritos
- boton X para eliminar

**prueba hacer click:**
- abre la consola del navegador con F12
- haz click en la estrella de una nota
- veras en consola: "toggle favorito: 1"
- haz click en la X de una nota
- veras en consola: "eliminar nota: 2"

todavia no se eliminan ni cambian porque estamos usando console.log temporal. en la proxima fase vamos a agregar state para que funcione de verdad.

---

## resumen de esta fase

has creado los componentes base con props y CSS Modules:
- componente StickyNote que muestra una nota
- componente NotesGrid que renderiza la lista
- App.js que conecta todo
- estilos con CSS Modules y CSS global

conceptos cubiertos:
- props para pasar datos del padre al hijo
- destructuring para acceder a props
- map para renderizar listas
- key prop obligatoria en listas
- funciones como props para callbacks
- CSS Modules para estilos scoped
- CSS Variables para colores dinamicos

---

## codigo fuente completo hasta aqui

### archivo: src/data/mockNotes.js

```javascript
// array con 5 notas de ejemplo
// cada nota tiene: id, title, content, category, color, isFavorite, createdAt
const mockNotes = [
  {
    id: '1',
    title: 'compras del super',
    content: 'pan integral, leche descremada, huevos, yogurt griego',
    category: 'personal',
    color: '#FFE17B',
    isFavorite: true,
    createdAt: '2025-01-15T09:00:00'
  },
  {
    id: '2',
    title: 'reunion con cliente',
    content: 'presentar propuesta de proyecto nuevo',
    category: 'trabajo',
    color: '#A7C7E7',
    isFavorite: false,
    createdAt: '2025-01-15T10:30:00'
  },
  {
    id: '3',
    title: 'idea: app de habitos',
    content: 'app para trackear habitos diarios con gamificacion',
    category: 'ideas',
    color: '#FFB6D9',
    isFavorite: true,
    createdAt: '2025-01-15T14:20:00'
  },
  {
    id: '4',
    title: 'estudiar React Router',
    content: 'repasar useParams y useLocation para el examen',
    category: 'estudio',
    color: '#B4E7CE',
    isFavorite: false,
    createdAt: '2025-01-16T08:00:00'
  },
  {
    id: '5',
    title: 'llamar al dentista',
    content: 'agendar limpieza dental para febrero',
    category: 'personal',
    color: '#FFE17B',
    isFavorite: false,
    createdAt: '2025-01-16T11:15:00'
  }
];

export default mockNotes;
```

### archivo: src/components/StickyNote.jsx

```javascript
import React from 'react';
import styles from './StickyNote.module.css';

// este componente recibe datos por props y los muestra
// recibe: id, title, content, category, color, isFavorite, onDelete, onToggleFavorite
function StickyNote({ id, title, content, category, color, isFavorite, onDelete, onToggleFavorite }) {
  return (
    <div
      className={styles.stickyNote}
      style={{ '--note-color': color }}
    >
      <div className={styles.stickyNoteHeader}>
        <span className={styles.category}>{category}</span>
        <div className={styles.actions}>
          <button
            onClick={() => onToggleFavorite(id)}
            className={styles.btnIcon}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <button
            onClick={() => onDelete(id)}
            className={styles.btnIcon}
          >
            ×
          </button>
        </div>
      </div>

      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default StickyNote;
```

### archivo: src/components/StickyNote.module.css

```css
/* estilos de la nota tipo post-it */
.stickyNote {
  background: var(--note-color, #FFE17B);
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  min-height: 180px;
}

.stickyNote:hover {
  transform: translateY(-4px) rotate(1deg);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.stickyNoteHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.category {
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(0,0,0,0.5);
  letter-spacing: 0.5px;
}

.actions {
  display: flex;
  gap: 8px;
}

.btnIcon {
  background: rgba(255,255,255,0.7);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btnIcon:hover {
  background: white;
  transform: scale(1.1);
}

.stickyNote h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 700;
}

.stickyNote p {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}
```

### archivo: src/components/NotesGrid.jsx

```javascript
import React from 'react';
import StickyNote from './StickyNote';

// este componente renderiza una lista de notas
// recibe: notes (array), onDelete (funcion), onToggleFavorite (funcion)
function NotesGrid({ notes, onDelete, onToggleFavorite }) {
  // si no hay notas mostramos un mensaje
  if (notes.length === 0) {
    return <p className="empty-state">no hay notas todavia. crea una!</p>;
  }

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <StickyNote
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          category={note.category}
          color={note.color}
          isFavorite={note.isFavorite}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default NotesGrid;
```

### archivo: src/App.js

```javascript
import React from 'react';
import NotesGrid from './components/NotesGrid';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  // funciones temporales por ahora solo hacen console.log
  // en la proxima fase las vamos a mejorar con state
  const handleDelete = (id) => {
    console.log('eliminar nota:', id);
  };

  const handleToggleFavorite = (id) => {
    console.log('toggle favorito:', id);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>StickyNotes</h1>
      </header>

      <div className="container">
        <NotesGrid
          notes={mockNotes}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}

export default App;
```

### archivo: src/App.css

```css
/* ========================================
   ESTILOS GLOBALES
   solo layout general, no componentes
   ======================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-header {
  background: white;
  padding: 20px 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.app-header h1 {
  color: #333;
  font-size: 32px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.empty-state {
  text-align: center;
  color: white;
  font-size: 18px;
  margin-top: 40px;
}
```

---

## proximo paso

en el siguiente archivo vamos a agregar state para que las acciones funcionen de verdad:
- eliminar notas
- marcar favoritos
- agregar notas nuevas con un formulario modal

**archivo siguiente:** 03-state-formularios.md

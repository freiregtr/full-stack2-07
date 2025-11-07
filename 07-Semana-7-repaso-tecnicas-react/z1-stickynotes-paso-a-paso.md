# StickyNotes - Tutorial Paso a Paso

**Curso:** Desarrollo Fullstack II o DSY1104
**Institucion:** DuocUC - Escuela de Informatica y Telecomunicaciones
**Tiempo total:** 2 horas

---

## que vamos a construir

una app de notas rapidas estilo post-it que cubre todos los conceptos de la semana 6:
- componentes reutilizables con **props**
- manejo de datos con **state**
- persistencia con **localStorage**
- navegacion SPA con **React Router**
- rutas dinamicas con **useParams**
- filtros con **useLocation** y query strings

al final tendras una app funcional donde puedes crear, ver, filtrar y eliminar notas que se guardan en el navegador.

---

## fase 1: setup inicial

### paso 1: crear el proyecto

abre tu terminal y ejecuta:

```bash
npx create-react-app stickynotes
cd stickynotes
npm start
```

el navegador se abrira automaticamente en http://localhost:3000

---

### paso 2: crear estructura de carpetas

dentro de `src/` crea estas carpetas:

```bash
src/
├── components/
├── pages/
├── data/
└── App.js
```

puedes hacerlo desde la terminal:

```bash
cd src
mkdir components pages data
```

---

### paso 3: crear datos de ejemplo

crea el archivo `src/data/mockNotes.js`:

```javascript
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

guarda el archivo con Ctrl+S.

---

## fase 2: componentes con props

### paso 4: crear componente StickyNote

crea el archivo `src/components/StickyNote.jsx`:

```javascript
import React from 'react';

// este componente recibe datos por props y los muestra
function StickyNote({ id, title, content, category, color, isFavorite, onDelete, onToggleFavorite }) {
  return (
    <div
      className="sticky-note"
      style={{ backgroundColor: color }}
    >
      <div className="sticky-note-header">
        <span className="category">{category}</span>
        <div className="actions">
          <button
            onClick={() => onToggleFavorite(id)}
            className="btn-icon"
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <button
            onClick={() => onDelete(id)}
            className="btn-icon"
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

**refuerzo de props:**

que son props?
- datos que un padre pasa a un hijo
- son inmutables, el hijo no puede cambiarlas
- se pasan como atributos: `<StickyNote title="hola" />`
- se reciben con destructuring: `function StickyNote({ title }) {}`

por que usamos destructuring?
- en vez de `props.title` escribimos solo `title`
- codigo mas limpio y corto
- sabes exactamente que props espera el componente

que son onDelete y onToggleFavorite?
- son funciones que vienen del padre
- cuando haces click el hijo ejecuta la funcion
- esto le avisa al padre que haga algo
- patron: datos bajan con props, eventos suben con callbacks

guarda el archivo.

---

### paso 5: crear componente NotesGrid

crea el archivo `src/components/NotesGrid.jsx`:

```javascript
import React from 'react';
import StickyNote from './StickyNote';

// este componente renderiza una lista de notas
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

**refuerzo de map y key:**

que hace notes.map?
- recorre el array notes
- por cada nota ejecuta la funcion
- retorna un nuevo array con componentes StickyNote
- React renderiza todos esos componentes

por que necesitamos key?
- React usa key para identificar cada elemento
- debe ser un valor unico y estable
- NUNCA uses el index del array como key
- usa el id de cada nota

que pasa si no pongo key?
- React muestra un warning en consola
- puede haber bugs al reordenar o eliminar
- React re-renderiza todo en vez de solo lo que cambio

guarda el archivo.

---

### paso 6: actualizar App.js

reemplaza todo el contenido de `src/App.js`:

```javascript
import React from 'react';
import NotesGrid from './components/NotesGrid';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  // funciones temporales por ahora solo hacen console.log
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

ahora reemplaza todo el contenido de `src/App.css`:

```css
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

.sticky-note {
  background: #FFE17B;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  min-height: 180px;
}

.sticky-note:hover {
  transform: translateY(-4px) rotate(1deg);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.sticky-note-header {
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

.btn-icon {
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

.btn-icon:hover {
  background: white;
  transform: scale(1.1);
}

.sticky-note h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 700;
}

.sticky-note p {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

.empty-state {
  text-align: center;
  color: white;
  font-size: 18px;
  margin-top: 40px;
}
```

guarda ambos archivos y ve al navegador.

**que deberias ver:**
- 5 notas tipo post-it con colores diferentes
- al pasar el mouse se levantan un poco
- al hacer click en estrella o X ves console.log

abre la consola con F12 y prueba hacer click en las estrellas y en la X. veras los mensajes.

---

## fase 3: state y formularios

### paso 7: convertir mockData a state

ahora vamos a hacer que las notas sean dinamicas con state.

actualiza `src/App.js`:

```javascript
import React, { useState } from 'react';
import NotesGrid from './components/NotesGrid';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  // state para las notas - empieza con mockNotes
  const [notes, setNotes] = useState(mockNotes);

  const handleDelete = (id) => {
    // filtrar el array para excluir la nota con ese id
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
    console.log('nota eliminada:', id);
  };

  const handleToggleFavorite = (id) => {
    // mapear el array y cambiar isFavorite de la nota con ese id
    const newNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, isFavorite: !note.isFavorite };
      }
      return note;
    });
    setNotes(newNotes);
    console.log('toggle favorito:', id);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>StickyNotes</h1>
      </header>

      <div className="container">
        <NotesGrid
          notes={notes}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}

export default App;
```

**refuerzo de state:**

que es state?
- datos mutables internos de un componente
- cuando cambian React re-renderiza automaticamente
- se crea con useState: `const [valor, setValor] = useState(inicial)`

por que necesitamos state?
- variables normales no disparan re-render
- si cambias `let x = 5` a `x = 10` la pantalla no se actualiza
- con state React sabe cuando actualizar la UI

como actualizar arrays en state?
- NUNCA hagas `notes.push()` o `notes[0] = ...`
- siempre crea un nuevo array
- usa filter para eliminar: `notes.filter(n => n.id !== id)`
- usa map para actualizar: `notes.map(n => n.id === id ? {...n, prop: nuevo} : n)`

que hace setNotes?
- le dice a React que notes cambio
- React re-ejecuta App() con el nuevo valor
- React compara el nuevo JSX con el anterior
- React actualiza solo lo que cambio en el DOM

guarda el archivo y prueba en el navegador.

**que deberias ver:**
- al hacer click en X la nota desaparece
- al hacer click en estrella cambia de vacia a llena
- todo funciona porque state dispara re-render

---

### paso 8: crear formulario para agregar notas

crea el archivo `src/components/AddNoteForm.jsx`:

```javascript
import React, { useState } from 'react';

function AddNoteForm({ onAdd }) {
  // state para cada campo del formulario
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('personal');

  const handleSubmit = (e) => {
    // prevenir que el form recargue la pagina
    e.preventDefault();

    // validar que haya titulo
    if (!title.trim()) {
      alert('el titulo es obligatorio');
      return;
    }

    // crear objeto de nueva nota
    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      color: getCategoryColor(category),
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    // llamar la funcion del padre
    onAdd(newNote);

    // limpiar el formulario
    setTitle('');
    setContent('');
    setCategory('personal');
  };

  const getCategoryColor = (cat) => {
    const colors = {
      personal: '#FFE17B',
      trabajo: '#A7C7E7',
      ideas: '#FFB6D9',
      estudio: '#B4E7CE'
    };
    return colors[cat] || '#FFE17B';
  };

  return (
    <form className="add-note-form" onSubmit={handleSubmit}>
      <h2>crear nueva nota</h2>

      <div className="form-group">
        <label>titulo</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="titulo de la nota..."
          maxLength={50}
        />
      </div>

      <div className="form-group">
        <label>contenido</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="escribe aqui..."
          rows={4}
          maxLength={200}
        />
      </div>

      <div className="form-group">
        <label>categoria</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="personal">personal</option>
          <option value="trabajo">trabajo</option>
          <option value="ideas">ideas</option>
          <option value="estudio">estudio</option>
        </select>
      </div>

      <button type="submit" className="btn-primary">
        agregar nota
      </button>
    </form>
  );
}

export default AddNoteForm;
```

**refuerzo de formularios y controlled components:**

que es un controlled component?
- el valor del input viene del state
- cuando el usuario escribe onChange actualiza el state
- React controla completamente el valor del input

por que value={title} y onChange?
- value={title}: el input muestra lo que hay en state
- onChange: cuando el usuario escribe actualizamos state
- esto crea un flujo: usuario escribe → onChange → setTitle → state cambia → React re-renderiza → input se actualiza

que hace e.preventDefault?
- por defecto los forms recargan la pagina al hacer submit
- e.preventDefault() cancela ese comportamiento
- asi manejamos el submit con JavaScript

como generar un id unico?
- usamos Date.now() que retorna timestamp actual en milisegundos
- es suficiente para esta app simple
- en apps reales usarias UUID o id del backend

ahora agrega los estilos al final de `src/App.css`:

```css
.add-note-form {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  margin-bottom: 32px;
}

.add-note-form h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.btn-primary {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #5568d3;
}
```

ahora actualiza `src/App.js` para usar el formulario:

```javascript
import React, { useState } from 'react';
import NotesGrid from './components/NotesGrid';
import AddNoteForm from './components/AddNoteForm';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  const [notes, setNotes] = useState(mockNotes);

  // funcion para agregar una nota nueva
  const handleAdd = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const handleDelete = (id) => {
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
  };

  const handleToggleFavorite = (id) => {
    const newNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, isFavorite: !note.isFavorite };
      }
      return note;
    });
    setNotes(newNotes);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>StickyNotes</h1>
      </header>

      <div className="container">
        <AddNoteForm onAdd={handleAdd} />

        <NotesGrid
          notes={notes}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}

export default App;
```

guarda y prueba en el navegador.

**que deberias ver:**
- un formulario arriba para crear notas
- al llenar y hacer submit aparece una nota nueva
- la nota nueva aparece al principio de la lista

**importante:**
- fijate que usamos `[newNote, ...notes]` no `[...notes, newNote]`
- esto pone la nota nueva al principio
- el spread operator `...notes` expande todas las notas existentes

---

## fase 4: persistencia con localStorage

### paso 9: agregar localStorage

ahora vamos a hacer que las notas persistan al recargar la pagina.

actualiza `src/App.js`:

```javascript
import React, { useState, useEffect } from 'react';
import NotesGrid from './components/NotesGrid';
import AddNoteForm from './components/AddNoteForm';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  // leer de localStorage al iniciar
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('stickynotes');
    if (saved) {
      return JSON.parse(saved);
    }
    return mockNotes;
  });

  // guardar en localStorage cada vez que notes cambie
  useEffect(() => {
    localStorage.setItem('stickynotes', JSON.stringify(notes));
  }, [notes]);

  const handleAdd = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const handleDelete = (id) => {
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
  };

  const handleToggleFavorite = (id) => {
    const newNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, isFavorite: !note.isFavorite };
      }
      return note;
    });
    setNotes(newNotes);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>StickyNotes</h1>
        <button
          className="btn-clear"
          onClick={() => {
            if (window.confirm('borrar todas las notas?')) {
              setNotes([]);
              localStorage.removeItem('stickynotes');
            }
          }}
        >
          limpiar todo
        </button>
      </header>

      <div className="container">
        <AddNoteForm onAdd={handleAdd} />

        <NotesGrid
          notes={notes}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}

export default App;
```

agrega estos estilos al final de `src/App.css`:

```css
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-clear {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.btn-clear:hover {
  background: #c82333;
}
```

**refuerzo de localStorage y useEffect:**

que es localStorage?
- API del navegador para guardar datos
- los datos persisten para siempre hasta que el usuario los borre
- solo guarda strings, no objetos ni arrays

como guardar objetos en localStorage?
- usa JSON.stringify para convertir objeto a string
- `localStorage.setItem('key', JSON.stringify(objeto))`
- usa JSON.parse para convertir string a objeto
- `const objeto = JSON.parse(localStorage.getItem('key'))`

que es useEffect?
- hook para ejecutar codigo en momentos especificos
- se ejecuta despues de cada render
- el array de dependencias controla cuando se ejecuta
- `useEffect(() => { ... }, [notes])` se ejecuta cuando notes cambia

por que usamos funcion en useState?
- `useState(() => { ... })` se llama lazy initialization
- la funcion solo se ejecuta la primera vez
- lee localStorage una sola vez al montar
- mas eficiente que leer en cada render

como funciona el flujo completo?
1. primera vez: useState lee localStorage, si no hay nada usa mockNotes
2. usuario agrega nota: setNotes actualiza state
3. useEffect detecta que notes cambio y guarda en localStorage
4. usuario recarga pagina: useState lee localStorage y recupera las notas

diferencia localStorage vs sessionStorage?
- localStorage: persiste para siempre
- sessionStorage: solo persiste mientras la pestaña esta abierta
- misma API: setItem, getItem, removeItem
- usa localStorage para datos que quieres conservar
- usa sessionStorage para datos temporales

guarda y prueba en el navegador.

**que deberias ver:**
- crea una nota nueva
- recarga la pagina con F5
- la nota sigue ahi porque se guardo en localStorage

abre DevTools con F12, ve a Application → Storage → Local Storage → http://localhost:3000 y veras tus notas guardadas como JSON.

---

## fase 5: navegacion con React Router

### paso 10: instalar react-router-dom

detén el servidor con Ctrl+C en la terminal y ejecuta:

```bash
npm install react-router-dom
```

espera que se instale y vuelve a iniciar:

```bash
npm start
```

---

### paso 11: crear pagina Home

crea el archivo `src/pages/Home.jsx`:

```javascript
import React from 'react';
import NotesGrid from '../components/NotesGrid';
import AddNoteForm from '../components/AddNoteForm';

function Home({ notes, onAdd, onDelete, onToggleFavorite }) {
  return (
    <div className="container">
      <AddNoteForm onAdd={onAdd} />
      <NotesGrid
        notes={notes}
        onDelete={onDelete}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}

export default Home;
```

---

### paso 12: crear pagina Favorites

crea el archivo `src/pages/Favorites.jsx`:

```javascript
import React from 'react';
import NotesGrid from '../components/NotesGrid';
import { Link } from 'react-router-dom';

function Favorites({ notes, onDelete, onToggleFavorite }) {
  // filtrar solo las favoritas
  const favoriteNotes = notes.filter(note => note.isFavorite);

  return (
    <div className="container">
      <div className="page-header">
        <h2>notas favoritas</h2>
        <Link to="/" className="btn-back">volver a todas</Link>
      </div>

      {favoriteNotes.length === 0 ? (
        <p className="empty-state">no tienes notas favoritas todavia</p>
      ) : (
        <NotesGrid
          notes={favoriteNotes}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
}

export default Favorites;
```

---

### paso 13: crear pagina NoteDetail

crea el archivo `src/pages/NoteDetail.jsx`:

```javascript
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function NoteDetail({ notes }) {
  // useParams captura el id de la URL
  const { id } = useParams();
  const navigate = useNavigate();

  // buscar la nota con ese id
  const note = notes.find(n => n.id === id);

  // si no existe la nota mostrar error
  if (!note) {
    return (
      <div className="container">
        <div className="note-not-found">
          <h2>nota no encontrada</h2>
          <Link to="/" className="btn-back">volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="note-detail">
        <button
          onClick={() => navigate(-1)}
          className="btn-back"
        >
          ← volver
        </button>

        <div
          className="note-detail-card"
          style={{ backgroundColor: note.color }}
        >
          <div className="note-detail-header">
            <span className="category">{note.category}</span>
            {note.isFavorite && <span className="favorite-badge">★ favorita</span>}
          </div>

          <h1>{note.title}</h1>
          <p className="note-content">{note.content}</p>

          <div className="note-meta">
            <small>
              creada: {new Date(note.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetail;
```

**refuerzo de useParams:**

que es useParams?
- hook de react-router-dom
- captura parametros dinamicos de la URL
- si tu ruta es `/note/:id` y visitas `/note/123`
- entonces `useParams()` retorna `{ id: '123' }`

como se define una ruta con parametro?
- en Route usas `:` para marcar parametros dinamicos
- `<Route path="/note/:id" element={<NoteDetail />} />`
- el nombre despues de `:` es el que usas en useParams
- puedes tener multiples: `/user/:userId/post/:postId`

que es useNavigate?
- hook para navegar programaticamente
- `navigate('/ruta')` va a esa ruta
- `navigate(-1)` vuelve atras como boton back del navegador
- `navigate(1)` va adelante

---

### paso 14: configurar rutas en App.js

actualiza `src/App.js` completamente:

```javascript
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NoteDetail from './pages/NoteDetail';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('stickynotes');
    if (saved) {
      return JSON.parse(saved);
    }
    return mockNotes;
  });

  useEffect(() => {
    localStorage.setItem('stickynotes', JSON.stringify(notes));
  }, [notes]);

  const handleAdd = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    ));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <Link to="/" className="app-title">
            <h1>StickyNotes</h1>
          </Link>

          <nav className="nav-links">
            <Link to="/" className="nav-link">todas</Link>
            <Link to="/favorites" className="nav-link">favoritas</Link>
          </nav>

          <button
            className="btn-clear"
            onClick={() => {
              if (window.confirm('borrar todas las notas?')) {
                setNotes([]);
                localStorage.removeItem('stickynotes');
              }
            }}
          >
            limpiar todo
          </button>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                notes={notes}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                notes={notes}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/note/:id"
            element={<NoteDetail notes={notes} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

**refuerzo de React Router:**

que es React Router?
- libreria para manejar navegacion en React
- permite crear SPA con multiples vistas
- sin recargar la pagina como sitios tradicionales

que es SPA vs MPA?
- SPA: Single Page Application, una sola pagina HTML
- navegacion cambia el contenido sin recargar
- mas rapido porque no pide HTML nuevo al servidor
- MPA: Multiple Page Application, cada ruta es un HTML diferente
- navegacion recarga toda la pagina

componentes principales de React Router:
- BrowserRouter: envuelve toda la app, maneja el historial
- Routes: contenedor de rutas
- Route: define una ruta, tiene path y element
- Link: reemplaza tag `<a>`, navega sin recargar

diferencia entre Link y tag a?
- `<a href="/ruta">` recarga la pagina completa
- `<Link to="/ruta">` cambia la URL sin recargar
- Link es mas rapido y mantiene el state

que hace element en Route?
- define que componente renderizar para esa ruta
- puedes pasar props directamente
- `element={<Home notes={notes} />}`

ahora actualiza los estilos, agrega al final de `src/App.css`:

```css
.app-title {
  text-decoration: none;
  color: inherit;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #f0f0f0;
  color: #333;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-header h2 {
  color: white;
  font-size: 28px;
}

.btn-back {
  background: white;
  color: #333;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-back:hover {
  background: #f0f0f0;
}

.note-detail {
  max-width: 800px;
  margin: 0 auto;
}

.note-detail-card {
  background: #FFE17B;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  margin-top: 24px;
}

.note-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.favorite-badge {
  background: rgba(255,255,255,0.9);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.note-detail-card h1 {
  font-size: 32px;
  margin-bottom: 16px;
  color: #333;
}

.note-content {
  font-size: 18px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 32px;
}

.note-meta {
  border-top: 2px solid rgba(0,0,0,0.1);
  padding-top: 16px;
}

.note-meta small {
  color: rgba(0,0,0,0.6);
  font-size: 14px;
}

.note-not-found {
  text-align: center;
  color: white;
  padding: 60px 20px;
}

.note-not-found h2 {
  font-size: 32px;
  margin-bottom: 24px;
}
```

guarda todo y prueba en el navegador.

**que deberias ver:**
- navegacion arriba: todas y favoritas
- al hacer click en favoritas ves solo las marcadas
- al hacer click en una nota NO funciona todavia

---

### paso 15: agregar click a las notas

actualiza `src/components/StickyNote.jsx`:

```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StickyNote({ id, title, content, category, color, isFavorite, onDelete, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/note/${id}`);
  };

  const handleActionClick = (e, callback) => {
    // detener la propagacion para que no se dispare handleCardClick
    e.stopPropagation();
    callback(id);
  };

  return (
    <div
      className="sticky-note"
      style={{ backgroundColor: color }}
      onClick={handleCardClick}
    >
      <div className="sticky-note-header">
        <span className="category">{category}</span>
        <div className="actions">
          <button
            onClick={(e) => handleActionClick(e, onToggleFavorite)}
            className="btn-icon"
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <button
            onClick={(e) => handleActionClick(e, onDelete)}
            className="btn-icon"
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

guarda y prueba.

**que deberias ver:**
- al hacer click en una nota te lleva a su vista detallada
- boton volver atras funciona
- botones estrella y X siguen funcionando

**que hace e.stopPropagation?**
- cuando haces click en un boton dentro de la nota
- el click se propaga al div padre
- esto dispara ambos eventos: boton y nota
- stopPropagation detiene la propagacion
- asi solo se ejecuta el boton, no la navegacion

---

### paso 16: agregar filtros con useLocation

crea el archivo `src/components/FilterBar.jsx`:

```javascript
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function FilterBar() {
  const location = useLocation();

  // extraer el parametro category de la URL
  const params = new URLSearchParams(location.search);
  const activeCategory = params.get('category') || 'todas';

  const categories = [
    { name: 'todas', label: 'todas', color: '#E5E5E5' },
    { name: 'personal', label: 'personal', color: '#FFE17B' },
    { name: 'trabajo', label: 'trabajo', color: '#A7C7E7' },
    { name: 'ideas', label: 'ideas', color: '#FFB6D9' },
    { name: 'estudio', label: 'estudio', color: '#B4E7CE' }
  ];

  return (
    <div className="filter-bar">
      <span className="filter-label">filtrar:</span>
      <div className="filter-buttons">
        {categories.map(cat => (
          <Link
            key={cat.name}
            to={cat.name === 'todas' ? '/' : `/?category=${cat.name}`}
            className={`filter-btn ${activeCategory === cat.name ? 'active' : ''}`}
            style={{
              backgroundColor: activeCategory === cat.name ? cat.color : '#F5F5F5'
            }}
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
```

**refuerzo de useLocation y query strings:**

que es useLocation?
- hook de react-router-dom
- retorna objeto con info de la URL actual
- propiedades: pathname, search, hash, state

que es location.search?
- la parte de la URL despues de `?`
- ejemplo: `/productos?category=electronicos&sort=precio`
- location.search retorna `?category=electronicos&sort=precio`

que es URLSearchParams?
- API nativa de JavaScript para parsear query strings
- `new URLSearchParams('?category=trabajo')` crea objeto
- `params.get('category')` retorna `'trabajo'`
- `params.getAll('tags')` retorna array con todos los valores

diferencia entre useParams y useLocation?
- useParams: captura parametros de la ruta `/note/:id`
- useLocation: lee query strings `/?category=trabajo`
- useParams para identificadores unicos
- useLocation para filtros, busqueda, paginacion

como hacer filtros con query strings?
- Link to `/?category=trabajo` agrega query string
- lees con useLocation y URLSearchParams
- filtras el array notes segun el parametro
- usuario puede copiar URL y compartir filtros

ahora actualiza `src/pages/Home.jsx`:

```javascript
import React from 'react';
import { useLocation } from 'react-router-dom';
import NotesGrid from '../components/NotesGrid';
import AddNoteForm from '../components/AddNoteForm';
import FilterBar from '../components/FilterBar';

function Home({ notes, onAdd, onDelete, onToggleFavorite }) {
  const location = useLocation();

  // leer el filtro de categoria de la URL
  const params = new URLSearchParams(location.search);
  const categoryFilter = params.get('category');

  // filtrar notas si hay categoria seleccionada
  const filteredNotes = categoryFilter
    ? notes.filter(note => note.category === categoryFilter)
    : notes;

  return (
    <div className="container">
      <AddNoteForm onAdd={onAdd} />
      <FilterBar />

      {categoryFilter && (
        <p className="filter-info">
          mostrando {filteredNotes.length} notas de categoria: {categoryFilter}
        </p>
      )}

      <NotesGrid
        notes={filteredNotes}
        onDelete={onDelete}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}

export default Home;
```

agrega estos estilos al final de `src/App.css`:

```css
.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-label {
  font-weight: 600;
  color: white;
  font-size: 16px;
}

.filter-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid transparent;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: #333;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.filter-btn.active {
  border-color: #333;
}

.filter-info {
  background: rgba(255,255,255,0.9);
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 600;
  color: #333;
}
```

guarda y prueba.

**que deberias ver:**
- botones de filtro arriba de las notas
- al hacer click en personal solo ves notas personales
- la URL cambia a `/?category=personal`
- al hacer click en todas vuelves a ver todo

---

## fase 6: toques finales

### paso 17: agregar busqueda

crea el archivo `src/components/SearchBar.jsx`:

```javascript
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="buscar notas..."
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
```

actualiza `src/pages/Home.jsx`:

```javascript
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotesGrid from '../components/NotesGrid';
import AddNoteForm from '../components/AddNoteForm';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';

function Home({ notes, onAdd, onDelete, onToggleFavorite }) {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const params = new URLSearchParams(location.search);
  const categoryFilter = params.get('category');

  // filtrar por categoria
  let filteredNotes = categoryFilter
    ? notes.filter(note => note.category === categoryFilter)
    : notes;

  // filtrar por busqueda
  if (searchTerm) {
    filteredNotes = filteredNotes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="container">
      <AddNoteForm onAdd={onAdd} />

      <div className="controls">
        <SearchBar onSearch={setSearchTerm} />
        <FilterBar />
      </div>

      {(categoryFilter || searchTerm) && (
        <p className="filter-info">
          mostrando {filteredNotes.length} notas
          {categoryFilter && ` de categoria: ${categoryFilter}`}
          {searchTerm && ` con busqueda: "${searchTerm}"`}
        </p>
      )}

      <NotesGrid
        notes={filteredNotes}
        onDelete={onDelete}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

export default Home;
```

agrega al final de `src/App.css`:

```css
.controls {
  margin-bottom: 24px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 14px 20px;
  font-size: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.9);
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: white;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.search-input::placeholder {
  color: #999;
}
```

---

### paso 18: hacer responsive

agrega al final de `src/App.css`:

```css
@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    gap: 16px;
    padding: 16px 20px;
  }

  .app-header h1 {
    font-size: 24px;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }

  .btn-clear {
    width: 100%;
  }

  .container {
    padding: 20px 16px;
  }

  .notes-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .add-note-form {
    padding: 20px;
  }

  .filter-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-buttons {
    width: 100%;
  }

  .filter-btn {
    flex: 1;
    text-align: center;
  }

  .note-detail-card {
    padding: 24px;
  }

  .note-detail-card h1 {
    font-size: 24px;
  }

  .note-content {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .notes-grid {
    grid-template-columns: 1fr;
  }

  .sticky-note {
    min-height: 150px;
  }
}
```

---

## resumen final

### que construimos

una app completa de notas tipo post-it con:
- ✅ componentes reutilizables
- ✅ state management
- ✅ persistencia con localStorage
- ✅ navegacion SPA con React Router
- ✅ rutas dinamicas con useParams
- ✅ filtros con useLocation
- ✅ busqueda en tiempo real
- ✅ diseño responsive

### conceptos cubiertos

**props:**
- pasar datos del padre al hijo
- destructuring para codigo limpio
- funciones como props para callbacks

**state:**
- useState para datos mutables
- actualizar arrays con filter y map
- controlled components en formularios

**persistencia:**
- localStorage para guardar datos
- JSON.stringify y JSON.parse
- useEffect para sincronizar

**React Router:**
- BrowserRouter, Routes, Route, Link
- navegacion sin recargar pagina
- useParams para rutas dinamicas
- useLocation para query strings
- URLSearchParams para parsear filtros

### estructura final del proyecto

```
stickynotes/
├── public/
├── src/
│   ├── components/
│   │   ├── StickyNote.jsx
│   │   ├── NotesGrid.jsx
│   │   ├── AddNoteForm.jsx
│   │   ├── FilterBar.jsx
│   │   └── SearchBar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Favorites.jsx
│   │   └── NoteDetail.jsx
│   ├── data/
│   │   └── mockNotes.js
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
```

### proximos pasos

para mejorar la app puedes:
- agregar edicion de notas
- implementar drag and drop
- agregar categorias personalizadas
- exportar notas a JSON
- agregar modo oscuro
- implementar backend con Node.js
- agregar autenticacion de usuarios

---

**felicitaciones!** acabas de construir una app completa repasando todos los conceptos de React de la semana 6.

---

**tiempo total:** 120 minutos
**ultima actualizacion:** enero 2025

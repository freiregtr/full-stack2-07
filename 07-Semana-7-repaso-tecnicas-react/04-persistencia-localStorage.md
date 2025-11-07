# 04 - Persistencia con localStorage

**Curso:** Desarrollo Fullstack II o DSY1104
**Institucion:** DuocUC - Escuela de Informatica y Telecomunicaciones
**Tiempo estimado:** 15 minutos

---

## que vamos a hacer en esta fase

en esta fase vamos a hacer que las notas persistan al recargar la pagina:
- guardar notas en localStorage
- cargar notas al iniciar la app
- usar useEffect para sincronizar

al terminar tus notas se guardaran automaticamente y no se perderan al refrescar.

---

## paso 12: agregar localStorage

vamos a modificar App.js para guardar y cargar las notas.

actualiza src/App.js:

```javascript
import React, { useState, useEffect } from 'react';
import NotesGrid from './components/NotesGrid';
import AddNoteForm from './components/AddNoteForm';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  // leer de localStorage al iniciar
  // si hay datos guardados los usamos, si no usamos mockNotes
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

guarda el archivo.

**refuerzo: localStorage**

localStorage es una API del navegador para guardar datos.
- los datos persisten para siempre hasta que el usuario los borre
- solo guarda strings, no objetos ni arrays
- capacidad aproximada: 5-10MB por dominio

**como guardar objetos en localStorage**

localStorage solo guarda strings, entonces:

para guardar usamos JSON.stringify:
```javascript
const notes = [{id: 1, title: 'hola'}];
localStorage.setItem('notes', JSON.stringify(notes));
// guarda: '[{"id":1,"title":"hola"}]'
```

para leer usamos JSON.parse:
```javascript
const saved = localStorage.getItem('notes');
const notes = JSON.parse(saved);
// obtiene: [{id: 1, title: 'hola'}]
```

**refuerzo: useEffect**

useEffect ejecuta codigo en momentos especificos del ciclo de vida.

sintaxis:
```javascript
useEffect(() => {
  // codigo a ejecutar
}, [dependencias]);
```

el array de dependencias controla cuando se ejecuta:
- [] vacio: solo al montar el componente
- [notes]: cada vez que notes cambie
- sin array: en cada render

en nuestro caso:
```javascript
useEffect(() => {
  localStorage.setItem('stickynotes', JSON.stringify(notes));
}, [notes]);
```

esto se ejecuta cada vez que notes cambia:
- cuando agregas una nota
- cuando eliminas una nota
- cuando marcas favoritos

**lazy initialization de useState**

cuando usamos una funcion en useState:
```javascript
const [notes, setNotes] = useState(() => {
  const saved = localStorage.getItem('stickynotes');
  if (saved) return JSON.parse(saved);
  return mockNotes;
});
```

la funcion solo se ejecuta una vez al montar.
es mas eficiente que leer localStorage en cada render.

**flujo completo de persistencia**

1. primera vez:
   - useState intenta leer localStorage
   - no encuentra nada, usa mockNotes
   - useEffect guarda mockNotes en localStorage

2. usuario agrega nota:
   - setNotes actualiza state
   - useEffect detecta que notes cambio
   - guarda en localStorage

3. usuario recarga pagina:
   - useState lee localStorage
   - encuentra las notas guardadas
   - inicia con esos datos

---

## paso 13: agregar estilos del boton

agrega estos estilos al FINAL de src/App.css:

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

guarda el archivo.

---

## prueba en el navegador

ve a http://localhost:3000

**prueba la persistencia:**
1. crea una nota nueva: "comprar libro de React"
2. marca otra nota como favorita
3. elimina una nota cualquiera
4. ahora recarga la pagina con F5
5. todas tus modificaciones siguen ahi!

**ver los datos en DevTools:**
- abre DevTools con F12
- ve a pestaña Application
- en el menu izquierdo ve a Storage → Local Storage
- haz click en http://localhost:3000
- veras una clave stickynotes con todas tus notas en formato JSON

**prueba el boton limpiar todo:**
- haz click en "limpiar todo"
- confirma el alert
- todas las notas desaparecen
- recarga la pagina
- siguen vacias porque tambien se borro de localStorage
- crea una nota nueva
- las notas vuelven a guardarse

---

## localStorage vs sessionStorage

JavaScript tiene dos APIs similares para guardar datos:

**localStorage:**
- persiste para siempre
- compartido entre pestañas del mismo dominio
- se mantiene al cerrar el navegador
- uso: preferencias, favoritos, carrito

**sessionStorage:**
- persiste solo en la sesion actual
- cada pestaña tiene su propia copia
- se borra al cerrar la pestaña
- uso: datos temporales, formularios multi-paso

la API es identica:
```javascript
// localStorage
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');

// sessionStorage
sessionStorage.setItem('key', 'value');
const value = sessionStorage.getItem('key');
```

para esta app usamos localStorage porque queremos que las notas persistan.

---

## resumen de esta fase

has agregado persistencia a la app:
- notas se guardan automaticamente en localStorage
- notas se recuperan al recargar
- useEffect sincroniza state con localStorage
- boton para limpiar todo

conceptos cubiertos:
- localStorage.setItem y getItem
- JSON.stringify para convertir a string
- JSON.parse para convertir de string
- useEffect para efectos secundarios
- lazy initialization con useState

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

### archivo: src/components/AddNoteForm.jsx

```javascript
import React, { useState } from 'react';
import styles from './AddNoteForm.module.css';

// formulario para crear notas nuevas
// recibe: onAdd (funcion que se ejecuta al crear una nota)
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

    // llamar la funcion del padre para agregar la nota
    onAdd(newNote);

    // limpiar el formulario
    setTitle('');
    setContent('');
    setCategory('personal');
  };

  // funcion helper para obtener color segun categoria
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
    <form className={styles.addNoteForm} onSubmit={handleSubmit}>
      <h2>crear nueva nota</h2>

      <div className={styles.formGroup}>
        <label>titulo</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="titulo de la nota..."
          maxLength={50}
        />
      </div>

      <div className={styles.formGroup}>
        <label>contenido</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="escribe aqui..."
          rows={4}
          maxLength={200}
        />
      </div>

      <div className={styles.formGroup}>
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

      <button type="submit" className={styles.btnPrimary}>
        agregar nota
      </button>
    </form>
  );
}

export default AddNoteForm;
```

### archivo: src/components/AddNoteForm.module.css

```css
.addNoteForm {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  margin-bottom: 32px;
}

.addNoteForm h2 {
  margin-bottom: 20px;
  color: #333;
}

.formGroup {
  margin-bottom: 16px;
}

.formGroup label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.formGroup input,
.formGroup textarea,
.formGroup select {
  width: 100%;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.formGroup input:focus,
.formGroup textarea:focus,
.formGroup select:focus {
  outline: none;
  border-color: #667eea;
}

.btnPrimary {
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

.btnPrimary:hover {
  background: #5568d3;
}
```

### archivo: src/App.js

```javascript
import React, { useState, useEffect } from 'react';
import NotesGrid from './components/NotesGrid';
import AddNoteForm from './components/AddNoteForm';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  // leer de localStorage al iniciar
  // si hay datos guardados los usamos, si no usamos mockNotes
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  color: #333;
  font-size: 32px;
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

en el siguiente archivo vamos a agregar React Router para navegar entre diferentes vistas sin recargar la pagina.

**archivo siguiente:** 05-react-router.md

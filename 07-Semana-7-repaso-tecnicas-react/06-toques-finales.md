# 06 - Toques Finales

**Curso:** Desarrollo Fullstack II o DSY1104
**Institucion:** DuocUC - Escuela de Informatica y Telecomunicaciones
**Tiempo estimado:** 15 minutos

---

## que vamos a hacer en esta fase

en esta ultima fase vamos a pulir la app:
- agregar busqueda en tiempo real
- hacer el diseño responsive para moviles
- revisar el codigo completo

al terminar tendras una app completa y profesional.

---

## paso 23: crear componente SearchBar

vamos a agregar busqueda para filtrar notas por titulo o contenido.

crea el archivo src/components/SearchBar.jsx:

```javascript
import React, { useState } from 'react';

// barra de busqueda en tiempo real
// recibe: onSearch (funcion que se ejecuta al escribir)
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

guarda el archivo.

---

## paso 24: integrar busqueda en Home

actualiza src/pages/Home.jsx:

```javascript
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotesGrid from '../components/NotesGrid';
import AddNoteForm from '../components/AddNoteForm';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';

// pagina principal con formulario, busqueda, filtros y lista de notas
// recibe: notes, onAdd, onDelete, onToggleFavorite
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
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}

export default Home;
```

guarda el archivo.

---

## paso 25: agregar estilos de busqueda

agrega estos estilos al FINAL de src/App.css:

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

guarda el archivo.

---

## paso 26: hacer diseño responsive

agrega estos estilos al FINAL de src/App.css:

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
}
```

guarda el archivo.

---

## prueba final

ve a http://localhost:3000

**prueba la busqueda:**
1. escribe "super" en el buscador
2. ves solo notas que contienen "super"
3. borra el texto
4. vuelves a ver todas

**prueba busqueda + filtros:**
1. escribe "react" en el buscador
2. haz click en "estudio"
3. ves notas de estudio que contienen "react"
4. combina ambos filtros

**prueba responsive:**
1. abre DevTools con F12
2. activa el modo device toolbar
3. cambia a iPhone o Android
4. ve como se adapta el diseño
5. notas en una columna en movil
6. filtros uno debajo del otro

---

## resumen final

felicitaciones! has completado la app StickyNotes cubriendo todos los conceptos de React:

**conceptos cubiertos:**
- props para pasar datos entre componentes
- state con useState para datos mutables
- formularios con controlled components
- localStorage para persistencia
- useEffect para sincronizar
- React Router para navegacion SPA
- useParams para rutas dinamicas
- useLocation para query strings
- busqueda y filtros combinados
- diseño responsive
- CSS Modules para estilos con scoping

**estructura del proyecto:**
```
stickynotes/
├── src/
│   ├── components/
│   │   ├── StickyNote.jsx
│   │   ├── StickyNote.module.css
│   │   ├── NotesGrid.jsx
│   │   ├── AddNoteForm.jsx
│   │   ├── AddNoteForm.module.css
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

**funcionalidades:**
- crear notas con formulario
- eliminar notas
- marcar favoritos
- buscar notas
- filtrar por categoria
- ver detalle de nota
- pagina de favoritas
- persistencia automatica
- responsive movil y desktop

---

## codigo fuente completo final

a continuacion esta el codigo completo de TODOS los archivos del proyecto para referencia.

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
import { useNavigate } from 'react-router-dom';
import styles from './StickyNote.module.css';

// este componente recibe datos por props y los muestra
// recibe: id, title, content, category, color, isFavorite, onDelete, onToggleFavorite
function StickyNote({ id, title, content, category, color, isFavorite, onDelete, onToggleFavorite }) {
  const navigate = useNavigate();

  // navegar al detalle al hacer click en la nota
  const handleCardClick = () => {
    navigate(`/note/${id}`);
  };

  // ejecutar accion sin disparar handleCardClick
  // e.stopPropagation detiene la propagacion del evento
  const handleActionClick = (e, callback) => {
    e.stopPropagation();
    callback(id);
  };

  return (
    <div
      className={styles.stickyNote}
      style={{ '--note-color': color }}
      onClick={handleCardClick}
    >
      <div className={styles.stickyNoteHeader}>
        <span className={styles.category}>{category}</span>
        <div className={styles.actions}>
          <button
            onClick={(e) => handleActionClick(e, onToggleFavorite)}
            className={styles.btnIcon}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <button
            onClick={(e) => handleActionClick(e, onDelete)}
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
/* estilos del componente StickyNote usando CSS Modules */
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
/* estilos del componente AddNoteForm usando CSS Modules */
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

### archivo: src/components/FilterBar.jsx

```javascript
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// barra de filtros por categoria usando query strings
function FilterBar() {
  const location = useLocation();

  // extraer el parametro category de la URL
  // si URL es /?category=trabajo entonces category = 'trabajo'
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
              '--filter-color': activeCategory === cat.name ? cat.color : '#F5F5F5'
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

### archivo: src/components/SearchBar.jsx

```javascript
import React, { useState } from 'react';

// barra de busqueda en tiempo real
// recibe: onSearch (funcion que se ejecuta al escribir)
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

### archivo: src/pages/Home.jsx

```javascript
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotesGrid from '../components/NotesGrid';
import AddNoteForm from '../components/AddNoteForm';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';

// pagina principal con formulario, busqueda, filtros y lista de notas
// recibe: notes, onAdd, onDelete, onToggleFavorite
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
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}

export default Home;
```

### archivo: src/pages/Favorites.jsx

```javascript
import React from 'react';
import NotesGrid from '../components/NotesGrid';
import { Link } from 'react-router-dom';

// pagina que muestra solo las notas favoritas
// recibe: notes, onDelete, onToggleFavorite
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

### archivo: src/pages/NoteDetail.jsx

```javascript
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// pagina de detalle de una nota usando useParams
// recibe: notes (para buscar la nota por id)
function NoteDetail({ notes }) {
  // useParams captura el id de la URL
  // si la URL es /note/123 entonces id = '123'
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
          volver atras
        </button>

        <div
          className="note-detail-card"
          style={{ '--note-color': note.color }}
        >
          <div className="note-detail-header">
            <span className="category">{note.category}</span>
            {note.isFavorite && <span className="favorite-badge">favorita</span>}
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

### archivo: src/App.js

```javascript
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NoteDetail from './pages/NoteDetail';
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

### archivo: src/App.css

```css
/* ========================================
   ESTILOS GLOBALES
   Solo layout general, no componentes
   Los componentes tienen sus propios CSS Modules
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

/* ========================================
   HEADER
   ======================================== */

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

/* ========================================
   LAYOUT
   ======================================== */

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

/* ========================================
   PAGES
   ======================================== */

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

/* ========================================
   NOTE DETAIL PAGE
   ======================================== */

.note-detail {
  max-width: 800px;
  margin: 0 auto;
}

.note-detail-card {
  background: var(--note-color, #FFE17B);
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

.category {
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(0,0,0,0.5);
  letter-spacing: 0.5px;
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

/* ========================================
   SEARCH AND FILTERS
   ======================================== */

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
  background-color: var(--filter-color, #F5F5F5);
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

/* ========================================
   RESPONSIVE
   ======================================== */

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
}
```

---

## proximos pasos para mejorar la app

ideas para extender el proyecto:
- agregar edicion de notas
- implementar tags multiples por nota
- agregar fechas de vencimiento
- implementar drag and drop para reordenar
- exportar notas a JSON o PDF
- agregar modo oscuro
- implementar backend con Node.js y Express
- agregar autenticacion de usuarios
- sincronizar entre dispositivos

---

**felicitaciones! has completado el proyecto StickyNotes cubriendo todos los conceptos de React de la semana 6**

**tiempo total:** 120 minutos
**ultima actualizacion:** enero 2025

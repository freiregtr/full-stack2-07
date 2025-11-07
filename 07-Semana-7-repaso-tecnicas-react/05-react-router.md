# 05 - React Router y Navegacion

**Curso:** Desarrollo Fullstack II o DSY1104
**Institucion:** DuocUC - Escuela de Informatica y Telecomunicaciones
**Tiempo estimado:** 40 minutos

---

## que vamos a hacer en esta fase

en esta fase vamos a agregar navegacion SPA con React Router:
- instalar react-router-dom
- configurar rutas para diferentes vistas
- crear pagina de detalle con useParams
- crear pagina de favoritos
- agregar filtros con useLocation
- hacer notas clickeables

al terminar tendras navegacion completa sin recargar la pagina.

---

## paso 14: instalar react-router-dom

detén el servidor con Ctrl+C en la terminal y ejecuta:

```bash
npm install react-router-dom
```

espera que termine de instalar y vuelve a iniciar:

```bash
npm start
```

el navegador volvera a http://localhost:3000

---

## paso 15: crear pagina Home

vamos a mover el contenido principal a una pagina separada.

crea el archivo src/pages/Home.jsx:

```javascript
import React from 'react';
import NotesGrid from '../components/NotesGrid';
import AddNoteForm from '../components/AddNoteForm';

// pagina principal con el formulario y la lista de notas
// recibe: notes, onAdd, onDelete, onToggleFavorite
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

guarda el archivo.

---

## paso 16: crear pagina Favorites

esta pagina va a mostrar solo las notas favoritas.

crea el archivo src/pages/Favorites.jsx:

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

guarda el archivo.

---

## paso 17: crear pagina NoteDetail

esta pagina va a mostrar una nota individual en detalle usando useParams.

crea el archivo src/pages/NoteDetail.jsx:

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

guarda el archivo.

**refuerzo: useParams**

useParams es un hook de react-router-dom que captura parametros dinamicos de la URL.

como funciona:
- defines ruta con parametro: `/note/:id`
- usuario visita: `/note/123`
- useParams retorna: `{ id: '123' }`

ejemplo:
```javascript
// en App.js defines la ruta
<Route path="/note/:id" element={<NoteDetail />} />

// en NoteDetail.jsx lees el parametro
const { id } = useParams();
console.log(id);
// si URL es /note/123 entonces id es '123'
```

para que sirve:
- mostrar detalle de un item especifico
- editar un usuario por id
- ver un producto en ecommerce
- cualquier ruta que necesite un identificador

**useNavigate**

useNavigate es otro hook para navegar programaticamente.

```javascript
const navigate = useNavigate();

// ir a una ruta
navigate('/home');

// ir atras como boton back del navegador
navigate(-1);

// ir adelante
navigate(1);
```

---

## paso 18: configurar rutas en App.js

ahora vamos a juntar todo con React Router.

actualiza TODO src/App.js:

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

guarda el archivo.

**refuerzo: React Router**

React Router permite crear SPA con multiples vistas sin recargar la pagina.

**componentes principales:**

BrowserRouter:
- envuelve toda la app
- maneja el historial del navegador
- debe estar en la raiz

Routes:
- contenedor de rutas
- renderiza la primera ruta que coincida

Route:
- define una ruta especifica
- path: la URL
- element: que componente renderizar

Link:
- reemplaza tag a
- navega sin recargar la pagina
- mas rapido porque no pide HTML al servidor

**SPA vs MPA:**

MPA - Multiple Page Application:
- cada ruta es un HTML diferente
- navegacion recarga toda la pagina
- servidor genera HTML cada vez
- ejemplo: sitios tradicionales

SPA - Single Page Application:
- una sola pagina HTML
- navegacion cambia el contenido sin recargar
- JavaScript maneja las vistas
- mas rapido y fluido
- ejemplo: Gmail, Facebook, Twitter

**diferencia entre Link y tag a:**

```javascript
// tag a recarga toda la pagina
<a href="/about">About</a>

// Link cambia la URL sin recargar
<Link to="/about">About</Link>
```

Link es mas rapido porque:
- no pide HTML al servidor
- no descarga CSS y JS de nuevo
- mantiene el state de React
- solo cambia el contenido necesario

---

## paso 19: hacer notas clickeables

ahora vamos a hacer que al hacer click en una nota te lleve a su detalle.

actualiza src/components/StickyNote.jsx:

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

guarda el archivo.

**que hace e.stopPropagation:**

cuando haces click en un elemento hijo, el evento se propaga al padre:

```
Click en boton
    ↓
evento boton onClick
    ↓
evento sube al div padre onClick
    ↓
ambos se ejecutan
```

stopPropagation detiene la propagacion:

```
Click en boton
    ↓
evento boton onClick
    ↓
e.stopPropagation()
    ↓
evento NO sube al padre
    ↓
solo se ejecuta el boton
```

sin stopPropagation:
- click en estrella ejecuta onToggleFavorite Y navega al detalle
- no queremos eso

con stopPropagation:
- click en estrella solo ejecuta onToggleFavorite
- click en la nota navega al detalle

---

## paso 20: crear componente FilterBar

vamos a agregar filtros por categoria usando useLocation.

crea el archivo src/components/FilterBar.jsx:

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

guarda el archivo.

**refuerzo: useLocation y query strings**

useLocation retorna informacion de la URL actual.

propiedades:
- pathname: /products
- search: ?category=electronics&sort=price
- hash: #section1
- state: datos pasados con navigate

**query strings:**

son parametros en la URL despues de ?:
```
/?category=trabajo
/?search=react&sort=date
/?page=2&limit=10
```

se usan para:
- filtros
- busquedas
- paginacion
- ordenamiento

**URLSearchParams:**

API nativa de JavaScript para parsear query strings:

```javascript
// URL: /?category=trabajo&sort=date
const params = new URLSearchParams(location.search);

params.get('category');
// retorna: 'trabajo'

params.get('sort');
// retorna: 'date'

params.get('notexist');
// retorna: null
```

**diferencia useParams vs useLocation:**

useParams:
- captura parametros de la ruta: /note/:id
- para identificadores unicos
- ejemplo: /user/123, /product/abc

useLocation:
- lee query strings: /?category=trabajo
- para filtros, busqueda, ordenamiento
- usuario puede copiar URL y compartir filtros

---

## paso 21: integrar filtros en Home

actualiza src/pages/Home.jsx:

```javascript
import React from 'react';
import { useLocation } from 'react-router-dom';
import NotesGrid from '../components/NotesGrid';
import AddNoteForm from '../components/AddNoteForm';
import FilterBar from '../components/FilterBar';

// pagina principal con formulario, filtros y lista de notas
// recibe: notes, onAdd, onDelete, onToggleFavorite
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

guarda el archivo.

---

## paso 22: agregar estilos

agrega estos estilos al FINAL de src/App.css:

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

guarda el archivo.

---

## prueba en el navegador

ve a http://localhost:3000

**prueba la navegacion:**
1. haz click en "favoritas" arriba
2. ves solo las notas favoritas
3. URL cambio a /favorites
4. haz click en "todas"
5. vuelves a ver todas las notas

**prueba el detalle:**
1. haz click en cualquier nota
2. ves la nota en grande con toda la info
3. URL cambio a /note/1
4. haz click en "volver atras"
5. vuelves a la lista

**prueba los filtros:**
1. haz click en "personal"
2. ves solo notas personales
3. URL cambio a /?category=personal
4. haz click en "trabajo"
5. ves solo notas de trabajo
6. URL cambio a /?category=trabajo
7. haz click en "todas"
8. vuelves a ver todo

**prueba los botones dentro de notas:**
1. haz click en la estrella de una nota
2. cambia a favorita pero NO navega al detalle
3. haz click en la X de una nota
4. se elimina pero NO navega

todo funciona porque usamos stopPropagation correctamente.

---

## resumen de esta fase

has agregado navegacion completa con React Router:
- multiples paginas sin recargar
- ruta de detalle con useParams
- filtros con useLocation y query strings
- navegacion programatica con useNavigate
- Link para navegacion sin recargar

conceptos cubiertos:
- BrowserRouter, Routes, Route, Link
- SPA vs MPA
- useParams para parametros de ruta
- useLocation para query strings
- URLSearchParams para parsear filtros
- useNavigate para navegar programaticamente
- e.stopPropagation para eventos

---

## codigo fuente completo hasta aqui

debido a la extension, el codigo completo de todos los archivos esta en el siguiente archivo 06-toques-finales.md donde tambien encontraras el codigo fuente final y completo de toda la aplicacion.

---

## proximo paso

en el siguiente archivo vamos a agregar los toques finales:
- busqueda en tiempo real
- diseño responsive
- codigo fuente final completo

**archivo siguiente:** 06-toques-finales.md

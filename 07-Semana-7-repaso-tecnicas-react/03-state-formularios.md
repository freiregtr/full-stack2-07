# 03 - State y Formularios con Modal

**Curso:** Desarrollo Fullstack II o DSY1104
**Institucion:** DuocUC - Escuela de Informatica y Telecomunicaciones
**Tiempo estimado:** 30 minutos

---

## que vamos a hacer en esta fase

**el problema:**
ahora mismo la app solo muestra notas estaticas. los botones de eliminar y favorito no funcionan de verdad, solo hacen console.log. no podemos crear notas nuevas. necesitamos que la app sea interactiva y dinamica.

**la solucion:**
usar state de react para manejar los datos. cuando cambiemos el state react automaticamente actualizara la pantalla.

**lo que vamos a hacer:**
- convertir mockData a state
- hacer funcionar los botones de eliminar y favoritos
- crear formulario modal para agregar notas nuevas
- manejar controlled components
- aprender que es un modal y como implementarlo

al terminar podras crear, eliminar y marcar notas como favoritas de verdad.

---

## paso 8: agregar state en App.js

**por que necesitamos esto:**
ahora mismo las notas son estaticas o mockData, por lo que no podemos crear, eliminar o modificarlas. para hacer la app dinamica necesitamos state. con state react sabra cuando volver a renderizar la pantalla cada vez que cambiemos las notas

vamos a convertir las notas de datos estaticos a state para poder modificarlas

actualiza src/App.js:

```javascript
// importamos useState para crear state y que react detecte cambios
import React, { useState } from 'react';
import NotesGrid from './components/NotesGrid';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  // creamos state para que cuando agreguemos o eliminemos notas react actualice la pantalla
  // useState retorna un array con [valorActual, funcionParaCambiarlo]
  // los corchetes en const [notes, setNotes] extraen esos dos valores y los nombran
  // le pasamos mockNotes como valor inicial
  const [notes, setNotes] = useState(mockNotes);

  // funcion que recibe el id de la nota a eliminar
  const handleDelete = (id) => {
    // creamos un nuevo array sin la nota que tenga ese id
    // si modificamos notes directamente React no se da cuenta del cambio
    // por eso creamos uno nuevo para que React vea que cambio y actualice la pantalla
    const newNotes = notes.filter(note => note.id !== id);
    // setNotes reemplaza el array viejo por el nuevo (no se duplica)
    setNotes(newNotes);
    console.log('nota eliminada:', id);
  };

  // funcion que recibe el id de la nota para marcar o desmarcar como favorita
  const handleToggleFavorite = (id) => {
    // map recorre todas las notas y crea un nuevo array
    const newNotes = notes.map(note => {
      // si es la nota que buscamos cambiamos su isFavorite
      if (note.id === id) {
        // copiamos toda la nota pero cambiamos isFavorite a lo contrario
        // si era true pasa a false, si era false pasa a true
        return { ...note, isFavorite: !note.isFavorite };
      }
      // si no es la nota que buscamos la dejamos igual
      return note;
    });
    // reemplazamos el array viejo por el nuevo
    setNotes(newNotes);
    console.log('toggle favorito:', id);
  };

  // retornamos la estructura de la app
  return (
    <div className="app">
      {/* header con el titulo */}
      <header className="app-header">
        <h1>StickyNotes</h1>
      </header>

      {/* container que contiene el grid de notas */}
      <div className="container">
        {/* pasamos el state y las funciones al componente NotesGrid */}
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

**refuerzo: que es state**

state son datos mutables internos de un componente.
- cuando cambian React re-renderiza automaticamente
- se crea con useState: `const [valor, setValor] = useState(inicial)`

**por que necesitamos state**

variables normales no disparan re-render:
```javascript
let x = 5;
x = 10;
// la pantalla NO se actualiza
```

con state React sabe cuando actualizar la UI:
```javascript
const [x, setX] = useState(5);
setX(10);
// React re-renderiza y la pantalla SI se actualiza
```

**como actualizar arrays en state**

NUNCA modifiques el array directamente:
```javascript
notes.push(nueva);
// MAL, React no detecta el cambio
```

siempre crea un nuevo array:
```javascript
setNotes([...notes, nueva]);
// BIEN, React detecta que notes cambio
```

**metodos para actualizar arrays**

para eliminar usa filter:
```javascript
const newNotes = notes.filter(note => note.id !== id);
setNotes(newNotes);
```

para actualizar usa map:
```javascript
const newNotes = notes.map(note => {
  if (note.id === id) {
    return { ...note, isFavorite: true };
  }
  return note;
});
setNotes(newNotes);
```

**prueba en el navegador**

ve a http://localhost:3000 y:
- haz click en la X de una nota, se eliminara de verdad
- haz click en la estrella, cambiara de vacia a llena
- todo funciona porque state dispara re-render

---

## paso 9: entender que es un modal

antes de crear el formulario, necesitamos entender **que es un modal** y por que es mejor que un formulario siempre visible.

**el problema con formularios siempre visibles:**

si dejamos el formulario siempre en pantalla:
- ocupa espacio permanentemente
- distrae cuando solo quieres ver las notas
- hace scroll innecesario en pantallas pequeñas
- no es el patron que los usuarios esperan

**la solucion: modal (ventana emergente)**

un modal es una ventana que aparece sobre el contenido principal:
- solo se muestra cuando el usuario lo necesita
- oscurece el fondo (overlay) para enfocar la atencion
- se cierra haciendo click fuera o en un boton X
- patron muy comun: Google Keep, Trello, Gmail, etc.

**componentes de un modal:**

1. **overlay**: fondo oscuro semitransparente que cubre toda la pantalla
2. **modal content**: caja blanca centrada con el contenido
3. **boton cerrar**: X en la esquina para cerrar
4. **boton trigger**: boton flotante "+" que abre el modal

**como funciona tecnicamente:**

```javascript
// 1. state controla si esta abierto o cerrado
const [isOpen, setIsOpen] = useState(false);

// 2. boton para abrir
<button onClick={() => setIsOpen(true)}>+</button>

// 3. modal recibe isOpen como prop
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>

// 4. modal decide si renderiza o no
if (!isOpen) return null;
```

**renderizado condicional:**

esto es MUY importante en React:
- si isOpen es false, el modal retorna null (no renderiza nada)
- si isOpen es true, el modal renderiza su contenido
- React automati camente muestra/oculta el componente

---

## paso 10: crear modal para agregar notas

**por que necesitamos esto:**
ya podemos eliminar y marcar favoritas, pero no podemos crear notas nuevas. vamos a crear un formulario modal donde el usuario escriba titulo, contenido y categoria. usaremos controlled components para que react controle los valores del form.

**que son controlled components:**
son inputs donde react controla su valor a traves de state. cada vez que escribes, el state se actualiza y el input muestra ese state. asi react siempre sabe que hay en el formulario

**nota:** en kotlin compose, useState es muy parecido a remember + mutableStateOf. ambos guardan valores que persisten entre re-renders/recomposiciones

ahora vamos a crear un componente modal para agregar notas nuevas.

crea el archivo src/components/AddNoteForm.jsx:

```javascript
import React, { useState } from 'react';
import styles from './AddNoteForm.module.css';

// modal para crear notas nuevas
// recibe: isOpen (boolean), onClose (funcion para cerrar), onAdd (funcion al crear nota)
function AddNoteForm({ isOpen, onClose, onAdd }) {
  // creamos un state para cada campo del formulario
  // title es el titulo, content es el contenido, category es la categoria
  // title y content empiezan vacios
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // category empieza con personal por defecto, despues se puede cambiar
  const [category, setCategory] = useState('personal');

  // funcion que se ejecuta cuando el usuario envia el formulario
  // recibe 'e' o un evento que contiene informacion sobre el submit
  const handleSubmit = (e) => {
    // evitamos que el navegador recargue la pagina (comportamiento default de forms)
    e.preventDefault();

    // validacion: el titulo no puede estar vacio, trim() quita espacios al inicio y final
    // si el usuario solo escribio espacios, trim() devuelve vacio y la validacion falla
    if (!title.trim()) {
      alert('el titulo es obligatorio');
      return;
    }

    // ahora creamos un objeto nota desde cero con los datos del formulario
    // no lo traemos de ningun lado, lo armamos aqui desde cero
    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      color: getCategoryColor(category),
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    // llamamos a onAdd que viene como prop desde App.js
    // esto envia la nota al padre para que la agregue al state
    onAdd(newNote);

    // una vez terminado, limpiamos todos los campos para que el usuario pueda crear otra nota
    setTitle('');
    setContent('');
    setCategory('personal');

    // cerramos el modal automaticamente despues de crear la nota
    onClose();
  };

  // funcion auxiliar que recibe una categoria y retorna su color
  // cat es la categoria: personal, trabajo, ideas o estudio
  // las mismas categorias que definimos en el state de arriba
  // personal es amarillo #FFE17B, trabajo es azul #A7C7E7, ideas es rosa #FFB6D9, estudio es verde #B4E7CE
  const getCategoryColor = (cat) => {
    const colors = {
      personal: '#FFE17B',
      trabajo: '#A7C7E7',
      ideas: '#FFB6D9',
      estudio: '#B4E7CE'
    };
    // si la categoria no existe retorna amarillo por defecto
    return colors[cat] || '#FFE17B';
  };

  // si no esta abierto no renderizamos nada (renderizado condicional)
  // esto es clave: si isOpen es false el componente retorna null y React no renderiza nada
  if (!isOpen) return null;

  // retornamos el modal con overlay y contenido
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* modal content: caja blanca centrada */}
      {/* e.stopPropagation evita que click en la caja cierre el modal */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* boton X para cerrar */}
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {/* formulario con controlled components */}
        {/* onSubmit se ejecuta cuando el usuario hace click en el boton o presiona enter */}
        <form className={styles.addNoteForm} onSubmit={handleSubmit}>
          <h2>crear nueva nota</h2>

          {/* campo titulo: input de una linea para textos cortos */}
          {/* value muestra lo que hay en el state */}
          {/* onChange actualiza el state cada vez que el usuario escribe */}
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

          {/* campo contenido: textarea permite multiples lineas para textos largos */}
          {/* value muestra lo que hay en el state */}
          {/* onChange actualiza el state cada vez que el usuario escribe */}
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

          {/* campo categoria: select muestra opciones para elegir */}
          {/* value muestra la categoria actual del state */}
          {/* onChange actualiza el state cuando el usuario selecciona otra opcion */}
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

          {/* boton tipo submit dispara el onSubmit del form */}
          <button type="submit" className={styles.btnPrimary}>
            agregar nota
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNoteForm;
```

guarda el archivo.

**refuerzo: controlled components**

un controlled component es un input cuyo valor esta controlado por React state.

```javascript
// el valor del input viene del state
<input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
```

flujo de datos:
1. usuario escribe en el input
2. onChange se ejecuta con el nuevo valor
3. setTitle actualiza el state
4. React re-renderiza con el nuevo valor
5. el input muestra el nuevo valor

**por que value y onChange juntos**

value sin onChange: el input queda congelado, no puedes escribir
onChange sin value: el input no esta sincronizado con el state

**que hace e.preventDefault**

por defecto los formularios recargan la pagina al hacer submit.
e.preventDefault cancela ese comportamiento para manejarlo con JavaScript.

**que hace e.stopPropagation**

evita que el evento se propague al elemento padre.
cuando haces click en la caja blanca del modal, el evento NO llega al overlay, por lo que el modal no se cierra.

**renderizado condicional con if**

```javascript
if (!isOpen) return null;
```

esto es renderizado condicional: si isOpen es false, el componente retorna null y React no renderiza nada. es la forma mas simple y eficiente de mostrar/ocultar componentes.

**como generar id unico**

Date.now retorna el timestamp actual en milisegundos.
es suficiente para esta app simple porque cada nota se crea en un momento diferente.

en apps reales usarias:
- UUID library
- id generado por el backend
- auto-increment del database

---

## paso 11: crear estilos del modal

ahora creamos el CSS Module para el modal con overlay, contenido centrado y animaciones.

crea el archivo src/components/AddNoteForm.module.css:

```css
/* overlay oscuro que cubre toda la pantalla */
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* caja blanca del modal centrada */
.modalContent {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: fadeIn 0.2s ease-out;
}

/* animacion de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* boton X para cerrar */
.closeButton {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 32px;
  color: #999;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.closeButton:hover {
  color: #333;
}

/* estilos del formulario dentro del modal */
.addNoteForm {
  padding: 24px;
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
  width: 100%;
}

.btnPrimary:hover {
  background: #5568d3;
}
```

guarda el archivo.

**nota sobre estilos del modal:**

- `.modalOverlay`: position fixed cubre toda la pantalla, z-index alto para estar encima
- `.modalContent`: centrado con flexbox del padre, animacion fadeIn suave
- `.closeButton`: position absolute en esquina, sin fondo para verse limpio
- animacion fadeIn: aparece suavemente desde 90% de tamaño hasta 100%

---

## paso 12: agregar modal a App.js

ahora vamos a integrar el modal en la app. necesitamos:
- state para controlar si esta abierto o cerrado
- funciones para abrir y cerrar
- boton flotante "+" para abrir
- pasar props al modal

actualiza src/App.js:

```javascript
import React, { useState } from 'react';
import NotesGrid from './components/NotesGrid';
import AddNoteForm from './components/AddNoteForm';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  const [notes, setNotes] = useState(mockNotes);

  // state para controlar si el modal esta abierto o cerrado
  // empieza en false (cerrado)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // funcion para agregar una nota nueva
  // recibe la nota completa desde AddNoteForm y la agrega al inicio del array
  // [newNote, ...notes] pone la nueva al principio, ...notes expande las existentes
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

  // funciones para abrir y cerrar el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1>StickyNotes</h1>
      </header>

      {/* boton flotante para abrir modal */}
      <button className="btn-add-note" onClick={openModal}>
        +
      </button>

      {/* modal para crear notas */}
      {/* le pasamos isOpen para que sepa si debe renderizar */}
      {/* le pasamos onClose para que pueda cerrarse */}
      {/* le pasamos onAdd para que pueda agregar notas */}
      <AddNoteForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAdd}
      />

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

guarda el archivo.

**por que [newNote, ...notes] y no [...notes, newNote]**

queremos que la nota nueva aparezca al principio de la lista.
- [newNote, ...notes]: nota nueva primero, luego las demas
- [...notes, newNote]: todas las notas, luego la nueva al final

el spread operator ...notes expande todas las notas existentes.

---

## paso 13: agregar estilos del boton flotante

ahora agregamos los estilos globales para el boton flotante "+" que abre el modal.

agrega estos estilos al final de src/App.css:

```css
/* boton flotante para abrir modal */
.btn-add-note {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  border: none;
  font-size: 32px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  transition: all 0.3s;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.btn-add-note:hover {
  background: #5568d3;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.btn-add-note:active {
  transform: scale(0.95);
}
```

guarda el archivo.

**por que va en App.css y no en un CSS Module:**

el boton flotante es parte del layout global de la app, no un componente reutilizable. ademas, necesita position fixed que debe estar en el contexto global, no scoped a un componente.

---

## prueba en el navegador

ve a http://localhost:3000

**que deberias ver:**
- tus notas de ejemplo
- boton flotante "+" morado en la esquina inferior derecha

**prueba el modal:**
1. haz click en el boton "+"
2. se abre un modal con fondo oscuro
3. escribe titulo: "ir al gym"
4. escribe contenido: "entrenar piernas y cardio"
5. selecciona categoria: "personal"
6. haz click en agregar nota
7. el modal se cierra automaticamente
8. la nueva nota aparece al principio con color amarillo

**prueba cerrar el modal:**
- haz click en el boton "+"
- haz click en la X del modal, se cierra
- haz click en el boton "+" de nuevo
- haz click fuera del modal (en el fondo oscuro), se cierra

**prueba eliminar:**
- haz click en X de cualquier nota
- desaparece inmediatamente

**prueba favoritos:**
- haz click en estrella vacia
- se llena inmediatamente
- haz click de nuevo
- se vacia

todo funciona porque estamos usando state correctamente y renderizado condicional para el modal.

---

## resumen de esta fase

has agregado state, formularios y modal a la app:
- state con useState para manejar notas
- funciones para agregar, eliminar y actualizar
- modal con overlay y animaciones
- formulario con controlled components
- validacion basica
- boton flotante para UX moderna

conceptos cubiertos:
- useState para datos mutables
- actualizar arrays con filter y map
- spread operator para inmutabilidad
- controlled components en formularios
- e.preventDefault en forms
- e.stopPropagation para eventos
- renderizado condicional con if/null
- callback functions entre padre e hijo
- modals y overlays
- position fixed y z-index

---

## codigo fuente completo hasta aqui

### archivo: src/components/AddNoteForm.jsx

```javascript
import React, { useState } from 'react';
import styles from './AddNoteForm.module.css';

function AddNoteForm({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('personal');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('el titulo es obligatorio');
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      color: getCategoryColor(category),
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    onAdd(newNote);
    setTitle('');
    setContent('');
    setCategory('personal');
    onClose();
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

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

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
      </div>
    </div>
  );
}

export default AddNoteForm;
```

### archivo: src/components/AddNoteForm.module.css

```css
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modalContent {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.closeButton {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 32px;
  color: #999;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.closeButton:hover {
  color: #333;
}

.addNoteForm {
  padding: 24px;
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
  width: 100%;
}

.btnPrimary:hover {
  background: #5568d3;
}
```

### archivo: src/App.js

```javascript
import React, { useState } from 'react';
import NotesGrid from './components/NotesGrid';
import AddNoteForm from './components/AddNoteForm';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  const [notes, setNotes] = useState(mockNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1>StickyNotes</h1>
      </header>

      <button className="btn-add-note" onClick={openModal}>
        +
      </button>

      <AddNoteForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAdd}
      />

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

### archivo: src/App.css (agregar al final)

```css
/* boton flotante para abrir modal */
.btn-add-note {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  border: none;
  font-size: 32px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  transition: all 0.3s;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.btn-add-note:hover {
  background: #5568d3;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.btn-add-note:active {
  transform: scale(0.95);
}
```

---

## proximo paso

en el siguiente archivo vamos a agregar localStorage para que las notas persistan al recargar la pagina.

**archivo siguiente:** 04-persistencia-localStorage.md

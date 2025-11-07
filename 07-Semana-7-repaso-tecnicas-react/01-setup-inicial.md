# 01 - Setup Inicial del Proyecto StickyNotes

**Curso:** Desarrollo Fullstack II o DSY1104
**Institucion:** DuocUC - Escuela de Informatica y Telecomunicaciones
**Tiempo estimado:** 15 minutos

---

## que vamos a hacer en esta fase

en esta primera fase vamos a preparar el proyecto base:
- crear el proyecto React
- organizar la estructura de carpetas
- crear datos de ejemplo para trabajar

al terminar tendras un proyecto limpio listo para empezar a construir componentes.

---

## paso 1: crear el proyecto React

abre tu terminal y ejecuta estos comandos:

```bash
npx create-react-app stickynotes
cd stickynotes
npm start   
```

el navegador se abrira automaticamente en http://localhost:3000 y veras la pagina de inicio de React.

---

## paso 2: crear estructura de carpetas

vamos a organizar el proyecto creando carpetas para diferentes tipos de archivos.

dentro de la carpeta src crea estas tres carpetas:

**opcion 1: desde el explorador de archivos**
- abre la carpeta del proyecto en tu explorador
- ve a src
- crea las carpetas: components, pages, data

**opcion 2: desde la terminal**

```bash
cd src
mkdir components pages data
```

**cual es la finalidad de cada carpeta:**
- components: componentes reutilizables como StickyNote, NotesGrid, formularios
- pages: paginas completas como Home, Favorites, NoteDetail
- data: archivos con datos como mockNotes

**estructura final de src**

```
src/
├── components/
├── pages/
├── data/
├── App.js
├── App.css
├── index.js
└── otros archivos de create-react-app
```

---

## paso 3: crear datos de ejemplo

ahora vamos a crear un archivo con notas de ejemplo para trabajar.

crea el archivo src/data/mockNotes.js y copia este codigo:

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

guarda el archivo con Ctrl+S.

**estructura de cada nota:**
- id: string unico para identificar la nota
- title: titulo corto de la nota
- content: contenido o descripcion mas larga
- category: categoria para organizar, puede ser personal, trabajo, ideas o estudio
- color: codigo hexadecimal del color tipo post-it
- isFavorite: boolean para marcar si es favorita
- createdAt: timestamp de cuando se creo la nota

**colores por categoria:**
- personal: amarillo #FFE17B
- trabajo: azul #A7C7E7
- ideas: rosa #FFB6D9
- estudio: verde #B4E7CE

estos datos nos van a servir para probar los componentes sin necesidad de crearlos manualmente cada vez.

---

## resumen de esta fase

has completado el setup inicial del proyecto:
- proyecto React creado con create-react-app
- estructura de carpetas organizada
- datos de ejemplo listos para usar

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

---

## proximo paso

en el siguiente archivo vamos a crear los primeros componentes con props:
- componente StickyNote para mostrar una nota
- componente NotesGrid para mostrar la lista completa

**archivo siguiente:** 02-componentes-props.md

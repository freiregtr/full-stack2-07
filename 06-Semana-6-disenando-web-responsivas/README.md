# Semana 6 - disenando web responsivas con React

curso: Desarrollo Fullstack II o DSY1104
institucion: DuocUC - Escuela de Informatica y Telecomunicaciones

---

## descripcion

esta semana profundizamos en React avanzado, explorando conceptos esenciales para construir aplicaciones web modernas, escalables y responsivas. El contenido se basa en la metodologia Atomic Design y practicas profesionales de desarrollo frontend.

los 3 archivos principales que veremos son:
1. `01-props-state-react.md` - fundamentos de props y state
2. `02-persistencia-javascript.md` - localStorage y sessionStorage
3. `03-navegacion-react-router.md` - navegacion SPA con React Router

---

## contenido detallado

### archivo 1: props y state en React

**que aprenderas:**
- diferencia entre props y state
- cuando usar cada uno
- hook useState para manejar state
- patron padre-hijo con props
- flujo de datos unidireccional

**ejemplos practicos incluidos:**
- ejemplo 1: tarjetas de usuario reutilizables con props
- ejemplo 2: contador interactivo con useState
- ejemplo 3: lista de tareas combinando props y state

**tiempo estimado:** 90 minutos

**conceptos clave:**
- props son inmutables, vienen del padre
- state es mutable, vive dentro del componente
- useState retorna array con valor y funcion setter
- setCount trigger re-render automatico
- patron arquitectonico: padre maneja state, hijo recibe props

---

### archivo 2: persistencia en JavaScript

**que aprenderas:**
- diferencia entre localStorage y sessionStorage
- como guardar y recuperar datos del navegador
- JSON.stringify y JSON.parse para objetos
- casos de uso reales: carrito, preferencias, tokens
- manejo de errores con try-catch

**ejemplos practicos incluidos:**
- ejemplo 1: contador persistente con localStorage
- ejemplo 2: formulario de registro con validaciones
- ejemplo 3: carrito de compras completo

**tiempo estimado:** 75 minutos

**conceptos clave:**
- localStorage persiste entre sesiones del navegador
- sessionStorage solo dura mientras esta abierta la pestana
- capacidad: aproximadamente 5-10MB por dominio
- datos se guardan como strings, usar JSON para objetos
- siempre validar datos antes de usar

---

### archivo 3: navegacion con React Router

**que aprenderas:**
- diferencia entre SPA y MPA
- instalacion y configuracion de react-router-dom
- componentes: BrowserRouter, Routes, Route, Link
- hooks: useParams, useLocation, useNavigate
- rutas dinamicas y query strings

**ejemplos practicos incluidos:**
- ejemplo 1: migracion de MPA a SPA
- ejemplo 2: perfiles de usuario con useParams
- ejemplo 3: pagina de busqueda con filtros usando useLocation

**tiempo estimado:** 90 minutos

**conceptos clave:**
- SPA no recarga la pagina, solo cambia contenido
- Link reemplaza tag a de HTML
- useParams captura parametros de ruta como /user/:id
- useLocation lee URL completa con query strings
- URLSearchParams extrae valores de query strings

---

## metodologia Atomic Design

el curso aplica la metodologia de Brad Frost que descompone interfaces en 5 niveles:

```
atomos → moleculas → organismos → plantillas → paginas
```

**atomos:**
- elementos basicos: botones, inputs, labels, iconos
- no se pueden dividir mas
- ejemplo: Button, Input, Icon

**moleculas:**
- combinacion de atomos
- ejemplo: SearchBar con Input mas Button

**organismos:**
- grupos de moleculas
- ejemplo: Header con Logo, SearchBar, Navigation

**plantillas:**
- estructura de pagina sin contenido real
- wireframe con componentes

**paginas:**
- plantilla con datos reales
- instancia concreta

**ventajas:**
- consistencia en el diseño
- reutilizacion de componentes
- facilita colaboracion entre disenadores y desarrolladores
- sistema de diseño escalable
- testing mas facil por componente

---

## requisitos previos

**conocimientos necesarios:**
- JavaScript basico: variables, funciones, arrays
- ES6+: arrow functions, destructuring, spread operator
- React basico: JSX, componentes funcionales
- HTML y CSS basico

**herramientas necesarias:**
- Node.js 18+ instalado
- npm o yarn como gestor de paquetes
- editor de codigo: VS Code recomendado
- navegador moderno: Chrome o Firefox con DevTools

**extensiones recomendadas para VS Code:**
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier - Code formatter
- Auto Rename Tag
- Simple React Snippets

---

## setup inicial del proyecto

```bash
# crear proyecto React
npx create-react-app mi-proyecto
cd mi-proyecto

# instalar React Router
npm install react-router-dom

# iniciar servidor de desarrollo
npm start
```

el navegador abrira automaticamente en http://localhost:3000

**estructura basica del proyecto:**
```
mi-proyecto/
├── public/
│   └── index.html
├── src/
│   ├── components/      # componentes reutilizables
│   ├── pages/          # paginas principales
│   ├── App.js          # componente raiz
│   └── index.js        # punto de entrada
├── package.json
└── README.md
```

---

## comandos utiles

```bash
# desarrollo
npm start                # inicia servidor local

# produccion
npm run build           # genera build optimizado

# testing
npm test                # ejecuta tests

# linting
npm run lint            # revisa codigo con ESLint
```

---

## patron de desarrollo recomendado

**1. componentes funcionales con hooks:**
```javascript
// buena practica
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**2. separar logica de presentacion:**
```javascript
// componente padre maneja state
function TaskList() {
  const [tasks, setTasks] = useState([]);
  return <TaskItem task={tasks[0]} onDelete={() => {}} />;
}

// componente hijo solo presenta
function TaskItem({ task, onDelete }) {
  return <div>{task} <button onClick={onDelete}>X</button></div>;
}
```

**3. usar destructuring en props:**
```javascript
// buena practica
function UserCard({ nombre, edad }) {
  return <div>{nombre}, {edad} años</div>;
}

// evitar
function UserCard(props) {
  return <div>{props.nombre}, {props.edad} años</div>;
}
```

---

## errores comunes y soluciones

**error 1: el componente no se actualiza**
- problema: usas variable normal en vez de state
- solucion: usa useState para datos que cambian

**error 2: props undefined**
- problema: componente padre no pasa la prop
- solucion: verifica que el padre pase todas las props necesarias

**error 3: routing no funciona**
- problema: falta BrowserRouter en la raiz
- solucion: envuelve App con BrowserRouter en index.js

**error 4: localStorage no persiste**
- problema: datos no se guardan en formato correcto
- solucion: usa JSON.stringify al guardar, JSON.parse al leer

**error 5: key warning en listas**
- problema: falta prop key en elementos del map
- solucion: agrega key unica: `<Item key={id} />`

---

## recursos complementarios

**documentacion oficial:**
- React Docs: https://react.dev/
- React Router v6: https://reactrouter.com/
- MDN Web Storage: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

**tutoriales en español:**
- Codigo Facilito - Curso React: https://codigofacilito.com/programas/react-g3
- Midudev React desde cero: https://midu.dev/
- FreeCodeCamp React: https://www.freecodecamp.org/espanol/

**videos recomendados:**
- React en 100 segundos - Fireship
- Full React Course - freeCodeCamp
- React Router Tutorial - Web Dev Simplified

**herramientas online:**
- CodeSandbox: https://codesandbox.io/ para probar codigo rapido
- StackBlitz: https://stackblitz.com/ entorno React en navegador
- React DevTools: extension para Chrome y Firefox

---

## actividades practicas

**actividad 2.2.2: creacion de sitios web responsivos**
consultar guia detallada en el AVA del curso.

**proyecto sugerido para practicar:**
crear una aplicacion de gestion de tareas con:
- lista de tareas con state
- agregar y eliminar tareas
- persistir con localStorage
- navegacion entre vistas con React Router
- filtros con query strings

**criterios de evaluacion:**
- uso correcto de props y state
- componentes reutilizables
- navegacion funcional sin recargas
- datos persisten en localStorage
- codigo limpio y comentado

---

## notas de desarrollo

- todos los ejemplos utilizan componentes funcionales con hooks o React moderno
- se evitan componentes de clase porque son legacy
- codigo compatible con React 18+
- enfoque en mejores practicas y patrones escalables
- todos los comentarios en codigo estan en minusculas
- estilo conversacional para facilitar aprendizaje

---

## diferencias clave: React vs JavaScript vanilla

**React:**
- virtual DOM para optimizacion
- componentes reutilizables
- state management automatico
- ecosistema de librerias grande

**JavaScript vanilla:**
- manipulacion directa del DOM
- codigo mas verboso
- sin re-render automatico
- mas control pero mas complejo

**cuando usar React:**
- aplicaciones con muchas interacciones
- necesitas reutilizar componentes
- equipo grande necesita estructura
- proyecto va a escalar

**cuando usar JavaScript vanilla:**
- sitio simple sin mucha interaccion
- landing page estatica
- proyecto muy pequeno
- necesitas performance maxima en casos especificos

---

## proximos pasos

despues de dominar esta semana:
1. explorar useEffect para efectos secundarios
2. aprender Context API para state global
3. estudiar custom hooks para logica reutilizable
4. investigar React Query para manejo de datos
5. profundizar en testing con Jest y React Testing Library

---

**ultima actualizacion:** Semana 6 - 2025
**material basado en:** 2.2.1 Diseño Responsivo.pdf
**archivos ajustados con estilo conversacional:** enero 2025

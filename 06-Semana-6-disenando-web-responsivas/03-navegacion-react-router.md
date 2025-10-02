# 03 - Navegación con React Router

**Curso:** Desarrollo Fullstack II (DSY1104)
**Institución:** DuocUC - Escuela de Informática y Telecomunicaciones

---

## Introduccion

En esta seccion aprenderas a crear aplicaciones de una sola pagina SPA con navegacion fluida y sin recargas usando React Router. Esto es fundamental para construir aplicaciones web modernas que se sientan rapidas e instantaneas como Gmail, Instagram o Twitter.

---

## Que es React Router?

React Router es una biblioteca de enrutamiento para aplicaciones React que facilita la creacion de aplicaciones de una sola pagina SPA con multiples rutas. Permite la navegacion dinamica sin recargar la pagina completa, proporcionando una experiencia de usuario fluida y rapida.

Diferencia clave:

MPA o Multi-Page Application o aplicacion tradicional:
- Cada clic en un link recarga toda la pagina
- El navegador hace una nueva peticion al servidor
- Se pierde el estado, scroll position, datos en memoria
- Experiencia lenta de 2-5 segundos por navegacion

SPA o Single Page Application o aplicacion moderna:
- Solo se carga la pagina una vez al inicio
- Los clicks cambian el contenido sin recargar
- El estado, datos, scroll se mantienen
- Experiencia instantanea de menos de 100ms

---

## Antes de Empezar

### Crear el proyecto

```bash
npx create-react-app router-ejemplos
cd router-ejemplos
npm start
```

El navegador abrira automaticamente en `http://localhost:3000`

---

## Ejemplo 1: Aplicacion Multi-Pagina o sin React Router

Tiempo estimado: 20 minutos

### Concepto

Una aplicacion tradicional usa links HTML normales con `<a href="">`. Cada click recarga completamente la pagina desde el servidor.

### Contexto: Por que esto es un problema?

Imagina una aplicacion como Gmail si funcionara con recargas completas.

Problema sin SPA:
1. Escribes un email por 10 minutos
2. Haces clic en "Enviados" para verificar algo
3. recarga completa: Pierdes el email que estabas escribiendo
4. Vuelves con el boton "Atras"
5. otra recarga: La pagina vuelve a cargar desde cero
6. Usuario frustrado abandona la aplicacion

Estadisticas reales:
- 3 segundos de carga es igual a 50% de usuarios abandonan
- Amazon pierde $1.6 billones por segundo de carga adicional
- Google encontro que 500ms mas lento es igual a 20% menos busquedas

Comparacion real:
- Gmail con SPA: Click en "Enviados" es instantaneo de menos de 100ms
- Email antiguo tipo Hotmail 2005 con MPA: Click tarda 3 segundos recargando

Por que pasa esto?

Cada `<a href="">` hace que el navegador:
1. Cancele todo JavaScript en ejecucion
2. Borre toda la memoria con estado, datos, formularios
3. Haga una peticion HTTP completa al servidor
4. Descargue HTML, CSS, JavaScript de nuevo
5. Vuelva a montar todos los componentes desde cero

### Comparacion: antes vs despues

### Pasos de lo que vamos a hacer

1. Crear aplicacion tradicional con `<a href="">` o MPA
2. Ver como se recarga y pierde datos al navegar
3. Instalar React Router
4. Crear aplicacion moderna con `<Link>` o SPA
5. Ver como no se recarga y mantiene datos
6. Comparar ambos enfoques lado a lado

#### antes: aplicacion multi-pagina o se recarga todo

Paso 1: Crea src/components/MultiPageApp.js para ver el problema de las recargas:

```jsx
import React, { useState } from 'react';

// pagina Home o aplicacion tradicional
function HomePage() {
  const [counter, setCounter] = useState(0);

  console.log('HomePage montado - recarga completa');

  return (
    <div style={{
      padding: '20px',
      border: '3px solid red',
      margin: '20px',
      backgroundColor: '#ffe6e6'
    }}>
      <h2>Home - Aplicacion Tradicional o MPA</h2>
      <p style={{color: 'red', fontWeight: 'bold'}}>
        problema: Los links recargan toda la pagina
      </p>

      <div style={{ margin: '20px 0' }}>
        <p>Contador de clicks: {counter}</p>
        <button
          onClick={() => setCounter(counter + 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Incrementar: {counter}
        </button>
      </div>

      <nav style={{ marginTop: '20px' }}>
        <a href="/about" style={{
          marginRight: '15px',
          padding: '10px 20px',
          backgroundColor: '#666',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Ir a About con recarga
        </a>
        <a href="/contact" style={{
          padding: '10px 20px',
          backgroundColor: '#666',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Ir a Contact con recarga
        </a>
      </nav>

      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        Abre la consola con F12 y observa como se monta el componente cada vez
      </p>
    </div>
  );
}

// pagina About o aplicacion tradicional
function AboutPage() {
  console.log('AboutPage montado - recarga completa');

  return (
    <div style={{
      padding: '20px',
      border: '3px solid red',
      margin: '20px',
      backgroundColor: '#ffe6e6'
    }}>
      <h2>About - Aplicacion Tradicional o MPA</h2>
      <p>Esta es la pagina About. Nota como la pagina entera se recargo.</p>
      
      <nav style={{ marginTop: '20px' }}>
        <a href="/" style={{
          marginRight: '15px',
          padding: '10px 20px',
          backgroundColor: '#666',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Ir a Home (recarga)
        </a>
        <a href="/contact" style={{
          padding: '10px 20px',
          backgroundColor: '#666',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Ir a Contact (recarga)
        </a>
      </nav>
    </div>
  );
}

// Página Contact - Aplicación tradicional
function ContactPage() {
  console.log('ContactPage montado - RECARGA COMPLETA');
  
  return (
    <div style={{
      padding: '20px',
      border: '3px solid red',
      margin: '20px',
      backgroundColor: '#ffe6e6'
    }}>
      <h2>Contact - Aplicación Tradicional (MPA)</h2>
      <p>Esta es la página Contact. La página se recargó completamente.</p>
      
      <nav style={{ marginTop: '20px' }}>
        <a href="/" style={{
          marginRight: '15px',
          padding: '10px 20px',
          backgroundColor: '#666',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Ir a Home (recarga)
        </a>
        <a href="/about" style={{
          padding: '10px 20px',
          backgroundColor: '#666',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Ir a About (recarga)
        </a>
      </nav>
    </div>
  );
}

// Componente principal que muestra según la URL
function MultiPageApp() {
  // En una app real, el servidor determinaría qué página mostrar
  // Aquí simulamos leyendo window.location.pathname
  const path = window.location.pathname;
  
  return (
    <div>
      <h1>Aplicación Multi-Página (MPA) - Sin React Router</h1>
      {path === '/' && <HomePage />}
      {path === '/about' && <AboutPage />}
      {path === '/contact' && <ContactPage />}
    </div>
  );
}

export default MultiPageApp;
```

#### Ahora vamos a verlo en acción

Actualiza tu `src/App.js`:

```jsx
import React from 'react';
import MultiPageApp from './components/MultiPageApp';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <MultiPageApp />
    </div>
  );
}

export default App;
```

Guarda el archivo con Ctrl+S y observa en el navegador:

1. Veras la pagina Home con un contador
2. Abre la consola del navegador con F12
3. Haz clic en "Incrementar" varias veces hasta llegar a 5
4. El contador muestra 5
5. Ahora haz clic en "Ir a About con recarga"
6. problema 1: La pagina entera parpadea con recarga completa
7. En consola veras: "AboutPage montado - recarga completa"
8. Haz clic en "Ir a Home con recarga"
9. problema 2: El contador volvio a 0 porque se perdio el estado
10. En consola veras: "HomePage montado - recarga completa"

Por que no funciona bien?
- Los links `<a href="">` causan recargas completas del navegador
- Cada recarga borra toda la memoria JavaScript
- El state del contador con valor 5 se pierde
- Todos los componentes se desmontan y remontan desde cero
- Experiencia lenta y frustrante

Ahora que viste el problema continuemos con la solucion...

#### despues: aplicacion de una sola pagina o sin recargas

Paso 2: Primero instala React Router:

```bash
npm install react-router-dom
```

Espera a que termine la instalacion y veras "added X packages".

Paso 3: Ahora crea src/components/SPAWithRouter.js con React Router:

Que vamos a hacer?
Usar React Router para cambiar el contenido sin recargar la pagina.

```jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// importamos componentes de React Router
// BrowserRouter envuelve toda la aplicacion y habilita el routing
// Routes es contenedor de rutas y reemplaza Switch en v5
// Route define una ruta especifica
// Link es reemplazo de <a href=""> que no recarga la pagina
// que es un hook? es una funcion especial que engancha funcionalidades de React
// React Router tambien tiene hooks: useNavigate, useParams, useLocation

// navbar compartida aparece en todas las paginas
function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#28a745',
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '5px'
    }}>
      <Link to="/" style={{
        marginRight: '15px',
        padding: '10px 20px',
        backgroundColor: 'white',
        color: '#28a745',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold'
      }}>
        Home
      </Link>
      <Link to="/about" style={{
        marginRight: '15px',
        padding: '10px 20px',
        backgroundColor: 'white',
        color: '#28a745',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold'
      }}>
        About
      </Link>
      <Link to="/contact" style={{
        padding: '10px 20px',
        backgroundColor: 'white',
        color: '#28a745',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold'
      }}>
        Contact
      </Link>
    </nav>
  );
}

// pagina Home o SPA recibe counter como prop
function Home({ counter, setCounter }) {
  console.log('Home renderizado - contador actual:', counter);

  return (
    <div style={{
      padding: '20px',
      border: '3px solid green',
      margin: '20px',
      backgroundColor: '#e6ffe6'
    }}>
      <h2>Home - SPA con React Router</h2>
      <p style={{color: 'green', fontWeight: 'bold'}}>
        solucion: Los links no recargan la pagina
      </p>

      <div style={{ margin: '20px 0' }}>
        <p>Contador de clicks: {counter}</p>
        <button
          onClick={() => {
            setCounter(counter + 1);
            console.log('Contador incrementado a:', counter + 1);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Incrementar: {counter}
        </button>
      </div>

      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        Incrementa el contador y navega. El contador se mantiene.
      </p>
    </div>
  );
}

// pagina About o SPA
function About() {
  console.log('About renderizado - sin recarga solo cambio el contenido');

  return (
    <div style={{
      padding: '20px',
      border: '3px solid green',
      margin: '20px',
      backgroundColor: '#e6ffe6'
    }}>
      <h2>About - SPA con React Router</h2>
      <p>Esta es la página About. Nota cómo NO hubo recarga.</p>
      <p style={{color: 'green'}}>
        El cambio fue instantáneo, como Instagram o Gmail.
      </p>
    </div>
  );
}

// Página Contact - SPA
function Contact() {
  console.log('Contact renderizado - SIN recarga, solo cambió el contenido');
  
  return (
    <div style={{
      padding: '20px',
      border: '3px solid green',
      margin: '20px',
      backgroundColor: '#e6ffe6'
    }}>
      <h2>Contact - SPA con React Router</h2>
      <p>Esta es la página Contact. Navegación instantánea.</p>
      <p style={{color: 'green'}}>
        Toda la aplicación se siente rápida y fluida.
      </p>
    </div>
  );
}

// Página 404 - Para rutas que no existen
function NotFound() {
  console.log('Página 404 - ruta no encontrada');
  
  return (
    <div style={{
      padding: '20px',
      border: '3px solid orange',
      margin: '20px',
      backgroundColor: '#fff3cd'
    }}>
      <h2>404 - Página No Encontrada</h2>
      <p>La ruta que buscas no existe.</p>
      <Link to="/" style={{
        padding: '10px 20px',
        backgroundColor: '#ff9800',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Volver al Home
      </Link>
    </div>
  );
}

// Componente principal con React Router
function SPAWithRouter() {
  // Estado del contador en el componente PADRE para que persista al navegar
  const [counter, setCounter] = useState(0);

  console.log('SPAWithRouter montado - Estado del contador vive aquí:', counter);

  return (
    <BrowserRouter>
      <div>
        <h1>Aplicación de Una Sola Página (SPA) - Con React Router</h1>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home counter={counter} setCounter={setCounter} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default SPAWithRouter;
```

#### Ahora vamos a verlo en acción

Actualiza `src/App.js`:

```jsx
import React from 'react';
import SPAWithRouter from './components/SPAWithRouter';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <SPAWithRouter />
    </div>
  );
}

export default App;
```

Guarda el archivo con Ctrl+S y observa en el navegador:

1. Veras la pagina Home con navbar verde arriba
2. Abre la consola con F12
3. Veras:
   ```
   SPAWithRouter montado - Estado del contador vive aqui: 0
   Home renderizado - contador actual: 0
   ```
4. Incrementa el contador hasta 5
5. En consola: "Contador incrementado a: 5"
6. Ahora haz clic en "About" en la navbar
7. solucion 1: no hubo recarga y fue instantaneo
8. En consola veras: "About renderizado - sin recarga solo cambio el contenido"
9. La navbar verde sigue ahi porque no se recargo
10. Haz clic en "Home"
11. solucion 2: El contador sigue en 5 porque no se perdio el estado
12. En consola veras: "Home renderizado - contador actual: 5"
13. El componente Home se re-renderiza pero recibe el mismo contador con valor 5 desde el padre

Por que si funciona bien?
- Los componentes `<Link>` no causan recargas
- React Router cambia el contenido dinamicamente con JavaScript
- El state del contador vive en SPAWithRouter o componente padre que no se desmonta
- Aunque Home se desmonte y monte recibe el counter como prop desde el padre
- Solo se renderiza el componente que cambio no toda la pagina
- Experiencia instantanea y fluida como aplicaciones modernas

Flujo completo:
```
1. Primera carga → SPAWithRouter se monta con counter = 0 → Renderiza Home con counter=0
2. Usuario incrementa contador a 5 → SPAWithRouter actualiza su estado con counter = 5
3. Click en About → React Router previene recarga →
   Home se desmonta pero counter sigue en SPAWithRouter →
   About se renderiza → SPAWithRouter sigue montado con counter = 5 en memoria
4. Click en Home → React Router renderiza Home de nuevo →
   Home recibe counter=5 como prop desde SPAWithRouter →
   Estado persiste porque vive en el componente padre
```

#### Comparacion lado a lado

Paso 4: Actualiza src/App.js para mostrar ambos enfoques:

```jsx
import React, { useState } from 'react';
import SPAWithRouter from './components/SPAWithRouter';

function App() {
  const [showSPA, setShowSPA] = useState(true);
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <h1>Comparación: MPA vs SPA</h1>
        <button
          onClick={() => setShowSPA(!showSPA)}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: showSPA ? '#28a745' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Mostrando: {showSPA ? 'SPA (Con Router)' : 'MPA (Sin Router)'}
        </button>
        <p style={{marginTop: '15px'}}>
          Haz clic para cambiar entre las dos versiones y compara la experiencia.
        </p>
      </div>

      {showSPA ? <SPAWithRouter /> : (
        <div>
          <h2 style={{color: 'red'}}>Aplicación MPA (Sin Router)</h2>
          <p style={{color: 'red'}}>
            Los links normales causan recargas. Esto ya NO se usa en aplicaciones modernas.
          </p>
        </div>
      )}

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <h3>Experimento:</h3>
        <ol>
          <li>En la versión SPA: Incrementa el contador a 10</li>
          <li>Navega entre páginas (Home → About → Contact → Home)</li>
          <li>Observa: El contador sigue en 10, navegación instantánea</li>
          <li>Abre la consola (F12) y ve los logs</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
```

**Guarda (Ctrl+S) y realiza el experimento.**

### Tabla Comparativa

| Característica | MPA (Sin Router) | SPA (Con Router) |
|----------------|------------------|------------------|
| Recarga página | Sí, cada click | No, nunca |
| Velocidad navegación | 2-5 segundos | <100 milisegundos |
| Pierde estado | Sí, siempre | No, se mantiene |
| Experiencia | Año 2000 | Moderna (2025) |
| Parpadeo | Sí, molesto | No, suave |
| Consumo datos | Alto (todo de nuevo) | Bajo (solo lo nuevo) |
| Ejemplos | Sitios antiguos | Gmail, Instagram, Twitter |

### Conclusión del Ejemplo 1

React Router es esencial para aplicaciones modernas. Sin él, cada navegación recarga toda la página, perdiendo datos y frustrando usuarios.

**Aplicaciones reales que usan SPA:**
- Gmail (Google)
- Instagram, Facebook, WhatsApp Web (Meta)
- Twitter
- YouTube
- Netflix
- Spotify Web

---

## Ejemplo 2: Navegación con Parámetros (useParams)

**Tiempo estimado:** 20 minutos

### Concepto

`useParams` es un hook de React Router que permite capturar parámetros dinámicos de la URL.

**Sintaxis de ruta dinámica:**
```jsx
<Route path="/user/:id" element={<UserProfile />} />
```

El `:id` es un parámetro que puede ser cualquier valor: `/user/1`, `/user/42`, `/user/999`.

**¿Qué es un hook?** Un hook es una función especial que "engancha" funcionalidades de React o librerías. `useParams` es un hook de React Router que extrae los parámetros de la URL.

### Contexto: ¿Por qué necesitamos parámetros en las rutas?

Imagina que estás construyendo una red social como Instagram.

**Problema sin parámetros:**

¿Cómo muestras el perfil de cada usuario?

**Opción 1 - Crear un componente por usuario (IMPOSIBLE):**
```
UserProfile1.js → muestra perfil de usuario 1
UserProfile2.js → muestra perfil de usuario 2
UserProfile3.js → muestra perfil de usuario 3
...
UserProfile1000000.js → muestra perfil de usuario 1,000,000
```

Problemas:
- 1 millon de usuarios es igual a 1 millon de archivos
- Imposible de mantener
- No escalable

Opcion 2 usar query strings sin Router:
```
/profile?user=1
/profile?user=2
```

Problemas:
- URLs feas y no amigables
- No son SEO-friendly
- Dificiles de compartir
- No siguen convenciones modernas

Solucion con useParams:

Un solo componente dinamico:
```jsx
// una sola ruta:
<Route path="/user/:id" element={<UserProfile />} />

// funciona para todos los usuarios:
/user/1        → muestra perfil de usuario 1
/user/42       → muestra perfil de usuario 42
/user/123456   → muestra perfil de usuario 123456
```

Ejemplos reales:
- Instagram: `instagram.com/@username`
- YouTube: `youtube.com/watch?v=VIDEO_ID`
- Amazon: `amazon.com/product/PRODUCT_ID`
- LinkedIn: `linkedin.com/in/NOMBRE`

### Comparacion: antes vs despues

### Pasos de lo que vamos a hacer

1. Crear componentes estaticos para cada usuario con codigo duplicado
2. Ver el problema de mantener multiples archivos
3. Crear un componente dinamico con useParams
4. Ver como un componente maneja todos los usuarios
5. Agregar lista de usuarios para navegar entre perfiles

#### antes: perfiles estaticos o codigo duplicado

Paso 1: Crea src/components/StaticProfiles.js para ver el problema:

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// componente para usuario 1
function UserProfile1() {
  console.log('UserProfile1 montado');

  return (
    <div style={{
      padding: '20px',
      border: '3px solid red',
      margin: '20px',
      backgroundColor: '#ffe6e6'
    }}>
      <h2>Perfil del Usuario 1</h2>
      <p>Nombre: Juan Perez</p>
      <p>Email: juan@email.com</p>
      <p>Edad: 25 años</p>
      <p style={{color: 'red', fontWeight: 'bold'}}>
        problema: Este codigo esta duplicado para cada usuario
      </p>
    </div>
  );
}

// componente para usuario 2 o codigo duplicado
function UserProfile2() {
  console.log('UserProfile2 montado');

  return (
    <div style={{
      padding: '20px',
      border: '3px solid red',
      margin: '20px',
      backgroundColor: '#ffe6e6'
    }}>
      <h2>Perfil del Usuario 2</h2>
      <p>Nombre: Maria Garcia</p>
      <p>Email: maria@email.com</p>
      <p>Edad: 30 años</p>
      <p style={{color: 'red', fontWeight: 'bold'}}>
        problema: Este codigo esta duplicado para cada usuario
      </p>
    </div>
  );
}

// Componente para usuario 3 (MÁS CÓDIGO DUPLICADO)
function UserProfile3() {
  console.log('UserProfile3 montado');
  
  return (
    <div style={{
      padding: '20px',
      border: '3px solid red',
      margin: '20px',
      backgroundColor: '#ffe6e6'
    }}>
      <h2>Perfil del Usuario 3</h2>
      <p>Nombre: Carlos López</p>
      <p>Email: carlos@email.com</p>
      <p>Edad: 28 años</p>
      <p style={{color: 'red', fontWeight: 'bold'}}>
        PROBLEMA: Imagina hacer esto para 1000 usuarios...
      </p>
    </div>
  );
}

// Lista de usuarios
function UserList() {
  return (
    <div style={{
      padding: '20px',
      border: '2px solid #666',
      margin: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <h3>Lista de Usuarios (Perfiles Estáticos)</h3>
      <nav>
        <Link to="/user1" style={{
          display: 'block',
          marginBottom: '10px',
          padding: '10px',
          backgroundColor: '#dc3545',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Ver Usuario 1
        </Link>
        <Link to="/user2" style={{
          display: 'block',
          marginBottom: '10px',
          padding: '10px',
          backgroundColor: '#dc3545',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Ver Usuario 2
        </Link>
        <Link to="/user3" style={{
          display: 'block',
          marginBottom: '10px',
          padding: '10px',
          backgroundColor: '#dc3545',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Ver Usuario 3
        </Link>
      </nav>
    </div>
  );
}

function StaticProfiles() {
  return (
    <BrowserRouter>
      <div>
        <h1>Perfiles Estáticos (Sin useParams)</h1>
        <UserList />
        
        <Routes>
          <Route path="/user1" element={<UserProfile1 />} />
          <Route path="/user2" element={<UserProfile2 />} />
          <Route path="/user3" element={<UserProfile3 />} />
        </Routes>
        
        <div style={{
          padding: '20px',
          margin: '20px',
          backgroundColor: '#fff3cd',
          borderRadius: '5px'
        }}>
          <p style={{color: 'red', fontWeight: 'bold'}}>
            Problemas con este enfoque:
          </p>
          <ul>
            <li>3 componentes casi idénticos (código duplicado)</li>
            <li>3 rutas separadas que hacer</li>
            <li>Para 100 usuarios = 100 componentes + 100 rutas</li>
            <li>Difícil de mantener y actualizar</li>
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default StaticProfiles;
```

#### Ahora vamos a verlo en acción

Actualiza `src/App.js`:

```jsx
import React from 'react';
import StaticProfiles from './components/StaticProfiles';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <StaticProfiles />
    </div>
  );
}

export default App;
```

**Guarda (Ctrl+S) y observa en el navegador:**

1. Verás la lista de 3 usuarios
2. Abre la consola (F12)
3. Haz clic en "Ver Usuario 1"
4. Verás el perfil con borde rojo
5. En consola: "UserProfile1 montado"
6. Haz clic en "Ver Usuario 2"
7. En consola: "UserProfile2 montado"
8. **PROBLEMA**: Mira el código, son 3 componentes casi idénticos
9. Imagina hacer esto para 100, 1000, o 1 millón de usuarios

**¿Por qué NO es buena práctica?**
- Código duplicado (DRY principle violado)
- No escalable (imposible con muchos usuarios)
- Difícil de mantener (cambio = editar todos los archivos)
- URLs no siguen un patrón (`/user1`, `/user2` en vez de `/user/:id`)

**Ahora que viste el problema, continuemos con la solución...**

#### despues: perfil dinamico con useParams

Paso 2: Crea src/components/DynamicProfiles.js con useParams:

Que vamos a hacer?
Crear un solo componente que funcione para todos los usuarios usando useParams.

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// un solo componente para todos los usuarios
function UserProfile() {
  // useParams() extrae los parametros de la URL
  const { id } = useParams();
  console.log('UserProfile montado con ID:', id);

  // simulamos una base de datos de usuarios
  const users = {
    '1': { nombre: 'Juan Perez', email: 'juan@email.com', edad: 25 },
    '2': { nombre: 'Maria Garcia', email: 'maria@email.com', edad: 30 },
    '3': { nombre: 'Carlos Lopez', email: 'carlos@email.com', edad: 28 },
    '4': { nombre: 'Ana Martinez', email: 'ana@email.com', edad: 22 },
    '5': { nombre: 'Pedro Sanchez', email: 'pedro@email.com', edad: 35 }
  };

  // buscar el usuario segun el ID de la URL
  const user = users[id];

  // si el usuario no existe
  if (!user) {
    return (
      <div style={{
        padding: '20px',
        border: '3px solid orange',
        margin: '20px',
        backgroundColor: '#fff3cd'
      }}>
        <h2>Usuario no encontrado</h2>
        <p>No existe un usuario con ID: {id}</p>
        <Link to="/" style={{
          padding: '10px 20px',
          backgroundColor: '#ff9800',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      border: '3px solid green',
      margin: '20px',
      backgroundColor: '#e6ffe6'
    }}>
      <h2>Perfil del Usuario {id}</h2>
      <p style={{color: 'green', fontWeight: 'bold'}}>
        solucion: un componente para todos los usuarios
      </p>
      <div style={{ marginTop: '20px' }}>
        <p>ID: {id}</p>
        <p>Nombre: {user.nombre}</p>
        <p>Email: {user.email}</p>
        <p>Edad: {user.edad} años</p>
      </div>

      <Link to="/" style={{
        display: 'inline-block',
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Volver a la lista
      </Link>
    </div>
  );
}

// lista de usuarios
function UserList() {
  const users = [
    { id: '1', nombre: 'Juan Perez' },
    { id: '2', nombre: 'Maria Garcia' },
    { id: '3', nombre: 'Carlos Lopez' },
    { id: '4', nombre: 'Ana Martinez' },
    { id: '5', nombre: 'Pedro Sanchez' }
  ];

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #28a745',
      margin: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <h3>Lista de Usuarios (Perfiles Dinámicos)</h3>
      <p style={{color: 'green'}}>Haz clic en cualquier usuario:</p>
      <nav>
        {users.map(user => (
          <Link
            key={user.id}
            to={`/user/${user.id}`}
            style={{
              display: 'block',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            Ver perfil de {user.nombre} (ID: {user.id})
          </Link>
        ))}
      </nav>
      
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#d4edda',
        borderRadius: '5px'
      }}>
        <p style={{fontWeight: 'bold', color: '#155724'}}>Prueba también:</p>
        <p>Escribe manualmente en la URL: /user/999</p>
        <p>El componente maneja usuarios que no existen.</p>
      </div>
    </div>
  );
}

// Componente Home
function Home() {
  return (
    <div>
      <h1>Perfiles Dinámicos (Con useParams)</h1>
      <UserList />
    </div>
  );
}

function DynamicProfiles() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default DynamicProfiles;
```

#### Ahora vamos a verlo en acción

Actualiza `src/App.js`:

```jsx
import React from 'react';
import DynamicProfiles from './components/DynamicProfiles';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <DynamicProfiles />
    </div>
  );
}

export default App;
```

Guarda con Ctrl+S y observa en el navegador:

1. Veras la lista de 5 usuarios
2. Abre la consola con F12
3. Haz clic en "Ver perfil de Juan Perez con ID: 1"
4. La URL cambia a `/user/1`
5. En consola: "UserProfile montado con ID: 1"
6. Ves el perfil de Juan con borde verde
7. Haz clic en "Volver a la lista"
8. Haz clic en "Ver perfil de Maria Garcia con ID: 2"
9. La URL cambia a `/user/2`
10. En consola: "UserProfile montado con ID: 2"
11. solucion: Es el mismo componente pero muestra datos diferentes
12. Prueba escribir en la URL: `http://localhost:3000/user/999`
13. Veras el mensaje "Usuario no encontrado"

Por que si funciona bien?
- un solo componente con UserProfile
- una sola ruta con /user/:id
- useParams() extrae el id de la URL
- Funciona para cualquier numero de usuarios
- Escalable y facil de mantener

Flujo completo:
```
1. Usuario hace clic → Link to="/user/3"
2. URL cambia a /user/3
3. React Router monta UserProfile
4. useParams() lee la URL → { id: '3' }
5. Componente busca usuario con ID 3
6. Muestra datos del usuario 3
```

### Tabla Comparativa

| Caracteristica | Perfiles Estaticos | Perfiles Dinamicos con useParams |
|----------------|-------------------|-------------------------------|
| Componentes necesarios | 1 por usuario | 1 para todos |
| Rutas necesarias | 1 por usuario | 1 para todos |
| Para 1000 usuarios | 1000 archivos | 1 archivo |
| Mantenimiento | Pesadilla | Facil |
| Escalabilidad | No escalable | Totalmente escalable |
| Patron de URL | /user1, /user2 inconsistente | /user/:id consistente |
| Usado en | Ninguna app moderna | Instagram, LinkedIn, Amazon |

### Conclusion del Ejemplo 2

useParams es esencial para crear aplicaciones escalables con contenido dinamico. Permite que un componente maneje infinitos casos basandose en la URL.

Casos de uso reales:
- Perfiles de usuario como Instagram, LinkedIn, Twitter
- Detalles de producto como Amazon, MercadoLibre
- Videos como YouTube, Netflix
- Articulos de blog como Medium, Dev.to

---

## Ejemplo 3: Query Strings con useLocation

Tiempo estimado: 15 minutos

### Concepto

useLocation es un hook de React Router que permite acceder a informacion completa de la URL actual incluyendo query strings o parametros de busqueda.

Query strings son parametros que van despues del `?` en la URL:
```
/search?category=laptops&minPrice=500&maxPrice=1000&sort=price
```

Que es un hook? useLocation es un hook que engancha la ubicacion actual o URL completa del navegador.

Para extraer los valores usamos URLSearchParams:
```javascript
const location = useLocation();
const queryParams = new URLSearchParams(location.search);

// 'laptops'
const category = queryParams.get('category');

// '500'
const minPrice = queryParams.get('minPrice');
```

### Contexto: Por que necesitamos query strings?

Imagina que estas construyendo un e-commerce como Amazon.

Problema sin query strings:

Como implementas filtros de busqueda?

Opcion 1 rutas diferentes para cada combinacion es imposible:
```
/search/laptops
/search/laptops/cheap
/search/laptops/cheap/dell
/search/laptops/cheap/dell/15inch
/search/laptops/cheap/dell/15inch/16gb
... millones de combinaciones
```

Problemas:
- Infinitas combinaciones posibles
- No puedes predefinir todas las rutas
- URLs súper largas e ilegibles

**Opción 2 - Sin persistir filtros (MALA EXPERIENCIA):**
- Usuario aplica 10 filtros
- Usuario comparte link con un amigo
- Amigo abre el link → NO tiene los filtros aplicados
- Usuario presiona F5 → Pierde todos los filtros

**Solución con query strings:**

UNA sola ruta con parámetros flexibles:
```
/search?category=laptops&brand=dell&minPrice=500&maxPrice=1000
```

Ventajas:
- URL describe exactamente lo que el usuario está viendo
- Se puede compartir (amigo ve los mismos resultados)
- Botón "Atrás" funciona correctamente
- F5 mantiene los filtros

**Ejemplos reales:**
- Amazon: `amazon.com/s?k=laptop&rh=p_36:50000-100000` (búsqueda con rango de precio)
- YouTube: `youtube.com/results?search_query=react+tutorial`
- Google: `google.com/search?q=react+router&hl=es`
- Airbnb: `airbnb.com/s?checkin=2025-06-01&checkout=2025-06-07&adults=2`

### Pasos de lo que vamos a hacer

1. Crear página de búsqueda básica sin query strings
2. Ver cómo los filtros NO se reflejan en la URL
3. Crear página de búsqueda CON query strings
4. Ver cómo los filtros se guardan en la URL
5. Probar compartir la URL y recargar

#### Componente: SearchPage.js

**Paso 1:** Crea `src/components/SearchPage.js`:

```jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

// Página de búsqueda con filtros
function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extraer query params de la URL
  const queryParams = new URLSearchParams(location.search);
  
  // Leer filtros desde la URL (o valores por defecto)
  const [category, setCategory] = useState(queryParams.get('category') || 'all');
  const [minPrice, setMinPrice] = useState(queryParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(queryParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || 'relevance');
  
  console.log('SearchPage renderizado con query params:', {
    category: queryParams.get('category'),
    minPrice: queryParams.get('minPrice'),
    maxPrice: queryParams.get('maxPrice'),
    sortBy: queryParams.get('sortBy')
  });
  
  // Cuando cambian los filtros, actualizar la URL
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sortBy !== 'relevance') params.set('sortBy', sortBy);
    
    const newUrl = `/search?${params.toString()}`;
    console.log('Aplicando filtros, nueva URL:', newUrl);
    navigate(newUrl);
  };
  
  // Simulamos productos filtrados
  const getFilteredProducts = () => {
    console.log('Filtrando productos con:', { category, minPrice, maxPrice, sortBy });
    
    const allProducts = [
      { id: 1, name: 'Laptop Dell', category: 'laptops', price: 800 },
      { id: 2, name: 'Mouse Logitech', category: 'accessories', price: 25 },
      { id: 3, name: 'Teclado Mecánico', category: 'accessories', price: 120 },
      { id: 4, name: 'Monitor Samsung', category: 'monitors', price: 350 },
      { id: 5, name: 'Laptop HP', category: 'laptops', price: 600 }
    ];
    
    return allProducts.filter(product => {
      if (category !== 'all' && product.category !== category) return false;
      if (minPrice && product.price < parseInt(minPrice)) return false;
      if (maxPrice && product.price > parseInt(maxPrice)) return false;
      return true;
    });
  };
  
  const products = getFilteredProducts();
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Búsqueda de Productos con Query Strings</h1>
      
      <div style={{
        padding: '20px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p style={{fontWeight: 'bold', color: '#1976d2'}}>
          URL actual: {location.pathname}{location.search}
        </p>
        <p style={{fontSize: '14px', color: '#666'}}>
          Los filtros están en la URL. Puedes compartir este link y tendrá los mismos resultados.
        </p>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Panel de filtros */}
        <div style={{
          flex: '0 0 300px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h3>Filtros</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Categoría:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="all">Todas</option>
              <option value="laptops">Laptops</option>
              <option value="accessories">Accesorios</option>
              <option value="monitors">Monitores</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Precio mínimo:
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Ej: 100"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Precio máximo:
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Ej: 1000"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Ordenar por:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="relevance">Relevancia</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </div>
          
          <button
            onClick={applyFilters}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Aplicar Filtros
          </button>
        </div>
        
        {/* Resultados */}
        <div style={{ flex: 1 }}>
          <h3>Resultados ({products.length} productos)</h3>
          
          {products.length === 0 ? (
            <p style={{
              padding: '20px',
              backgroundColor: '#fff3cd',
              borderRadius: '5px'
            }}>
              No se encontraron productos con estos filtros.
            </p>
          ) : (
            products.map(product => (
              <div
                key={product.id}
                style={{
                  padding: '15px',
                  marginBottom: '10px',
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0' }}>{product.name}</h4>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  Categoría: {product.category}
                </p>
                <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#2196f3', fontSize: '18px' }}>
                  ${product.price}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <h3>Experimento:</h3>
        <ol>
          <li>Selecciona "Laptops" en categoria</li>
          <li>Pon precio minimo: 500</li>
          <li>Haz clic en "Aplicar Filtros"</li>
          <li>Observa como la URL cambia: /search?category=laptops&minPrice=500</li>
          <li>Copia la URL completa</li>
          <li>Recarga la pagina con F5 y los filtros se mantienen</li>
          <li>Abre una nueva pestaña pega la URL y los filtros se mantienen</li>
        </ol>
      </div>
    </div>
  );
}

// pagina Home
function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Home</h1>
      <Link to="/search" style={{
        padding: '15px 30px',
        backgroundColor: '#2196f3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        display: 'inline-block'
      }}>
        Ir a Busqueda
      </Link>
    </div>
  );
}

function SearchPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SearchPage;
```

#### Ahora vamos a verlo en accion

Actualiza src/App.js:

```jsx
import React from 'react';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <div>
      <SearchPage />
    </div>
  );
}

export default App;
```

Guarda con Ctrl+S y observa en el navegador:

1. Veras el Home haz clic en "Ir a Busqueda"
2. Veras 5 productos sin filtrar
3. Abre la consola con F12
4. Selecciona "Laptops" en categoria
5. Pon precio minimo: 500
6. Haz clic en "Aplicar Filtros"
7. solucion 1: La URL cambia a `/search?category=laptops&minPrice=500`
8. En consola veras: "Aplicando filtros, nueva URL: /search?category=laptops&minPrice=500"
9. Solo se muestran 2 laptops con precio mayor o igual a $500
10. Ahora recarga la pagina con F5
11. solucion 2: Los filtros se mantienen porque se leen desde la URL
12. Copia la URL completa y abrela en nueva pestaña
13. solucion 3: Los filtros persisten porque URL es compartible

Por que funciona bien?
- Los filtros se guardan en la URL como query strings
- useLocation() lee la URL completa
- URLSearchParams extrae los valores individuales
- Al recargar o compartir los filtros se restauran desde la URL
- Boton "Atras" funciona correctamente y vuelve a filtros anteriores

### Tabla Comparativa

| Caracteristica | Sin Query Strings | Con Query Strings |
|----------------|-------------------|-------------------|
| Recarga con F5 | Pierde filtros | Mantiene filtros |
| Compartir URL | Link sin filtros | Link con filtros |
| Boton atras | No funciona bien | Funciona perfectamente |
| Marcadores | Inutil | Guarda busqueda exacta |
| SEO | Malo | Bueno |
| Usabilidad | Frustrante | Profesional |

### Conclusion del Ejemplo 3

Query strings con useLocation son esenciales para filtros, busquedas y cualquier estado que quieras reflejar en la URL. Hacen que las URLs sean compartibles y recargables.

casos de uso reales:
- Filtros de busqueda como Amazon o MercadoLibre
- Resultados de busqueda como Google o YouTube
- Paginacion con page igual a 5
- Tabs o pestanas con tab igual a settings

---

## Resumen General: Navegacion con React Router

### Conceptos Clave Aprendidos

1. SPA vs MPA: Aplicaciones de una pagina vs multi-pagina
2. React Router: Biblioteca para navegacion sin recargas
3. Componentes principales:
   - BrowserRouter: Envuelve la aplicacion
   - Routes: Contenedor de rutas
   - Route: Define una ruta
   - Link: Navegacion sin recarga
4. useParams: Captura parametros de ruta como /user/:id
5. useLocation: Lee URL completa y query strings
6. useNavigate: Navega programaticamente

### Flujo Tipico con React Router

```javascript
// 1. setup
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 2. envolver aplicacion
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/user/:id" element={<UserProfile />} />
  </Routes>
</BrowserRouter>

// 3. navegacion
<Link to="/user/123">Ver Usuario 123</Link>

// 4. en UserProfile
// '123'
const { id } = useParams();
```

---

## Recursos Adicionales

### Documentacion Oficial
- React Router v6: https://reactrouter.com/
- React Router Tutorial: https://reactrouter.com/en/main/start/tutorial
- Migrating from v5 to v6: https://reactrouter.com/en/main/upgrading/v5

### Diferencias v5 vs v6
- Switch cambia a Routes
- Route component igual a Home cambia a Route element igual a Home entre corchetes angulares
- useHistory cambia a useNavigate

---

## Proximos Pasos

En los siguientes archivos exploraremos:
- 04-parametros-url.md: Profundizar en useParams, useLocation, useSearchParams
- `05-config-router.md`: Rutas anidadas, protegidas, layouts compartidos

---

**Última actualización:** Semana 6 - 2025
**Material basado en:** 2.2.1 Diseño Responsivo.pdf - Sección Navegación con React Router

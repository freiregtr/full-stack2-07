# 05 - Configuración del Router

**Curso:** Desarrollo Fullstack II (DSY1104)
**Institución:** DuocUC - Escuela de Informática y Telecomunicaciones

---

## Introducción

En esta sección aprenderás a **configurar la arquitectura completa de routing** en una aplicación React profesional. Dominarás rutas anidadas, rutas protegidas, layouts compartidos y patrones de organización escalables usados en aplicaciones de producción.

---

## ¿Qué es la Configuración del Router?

La **configuración del router** es la arquitectura base que define cómo tu aplicación maneja la navegación. Va más allá de crear rutas simples: incluye estructuras jerárquicas, protección de acceso, layouts reutilizables y manejo de errores.

**Diferencia clave:**

**Configuración básica (Lo que ya sabes):**
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```

**Configuración avanzada (Lo que aprenderás):**
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
    </Route>
    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route index element={<Overview />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

---

## Antes de Empezar

### Crear el proyecto

```bash
npx create-react-app router-config
cd router-config
npm install react-router-dom
npm start
```

El navegador abrirá automáticamente en `http://localhost:3000`

---

## Ejemplo 1: Rutas Anidadas con Layouts Compartidos

**Tiempo estimado:** 20-25 minutos

### Concepto

**Rutas anidadas** permiten crear jerarquías de rutas donde componentes padres (layouts) envuelven componentes hijos. El componente `<Outlet />` de React Router define dónde se renderiza el contenido hijo.

**Sintaxis:**
```jsx
import { Outlet } from 'react-router-dom';

// Layout padre
function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet /> {/* Aquí se renderizan los hijos */}
    </div>
  );
}

// Configuración de rutas
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="home" element={<DashboardHome />} />
  <Route path="profile" element={<Profile />} />
</Route>
```

**¿Qué es un hook?** Ya lo vimos en ejemplos anteriores: es una función especial de React que "engancha" funcionalidades. `useOutlet()` es un hook que permite verificar si hay contenido hijo para renderizar.

### Contexto: ¿Por qué necesitamos rutas anidadas?

Imagina que estás construyendo un **panel de administración como Jira, Trello o Asana**.

**Problema sin rutas anidadas:**

Cada página del dashboard tiene:
- Mismo sidebar izquierdo
- Mismo navbar superior
- Mismo footer
- Solo cambia el contenido central

**Opción 1 - Copiar y pegar el layout en cada página (PESADILLA):**
```jsx
// DashboardHome.js
function DashboardHome() {
  return (
    <>
      <Navbar /> {/* Código duplicado */}
      <Sidebar /> {/* Código duplicado */}
      <div>Contenido de Home</div>
      <Footer /> {/* Código duplicado */}
    </>
  );
}

// DashboardProfile.js
function DashboardProfile() {
  return (
    <>
      <Navbar /> {/* Código duplicado */}
      <Sidebar /> {/* Código duplicado */}
      <div>Contenido de Profile</div>
      <Footer /> {/* Código duplicado */}
    </>
  );
}

// ... copiar y pegar en 20 páginas más
```

**Problemas:**
- Si cambias el navbar, debes editar 20 archivos
- Código duplicado masivamente
- Difícil de mantener
- Cada página recarga navbar/sidebar aunque no cambiaron

**Opción 2 - Componente que acepta children (MEJOR pero limitado):**
```jsx
function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
}

// Usar en cada página
<DashboardLayout>
  <DashboardHome />
</DashboardLayout>
```

**Problemas:**
- Debes envolver manualmente cada componente
- No se integra bien con React Router
- Pierde información de la ruta actual

### Solución con rutas anidadas

**UN layout padre con `<Outlet />`** que automáticamente renderiza el hijo según la ruta:

```jsx
// Layout
function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet /> {/* Renderiza el hijo automáticamente */}
      <Footer />
    </>
  );
}

// Configuración
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="home" element={<DashboardHome />} />
  <Route path="profile" element={<DashboardProfile />} />
  {/* 20 rutas más sin duplicar layout */}
</Route>
```

**Ventajas:**
- Layout se define UNA vez
- React Router automáticamente renderiza el hijo correcto
- Cambios al layout = editar UN archivo
- URLs limpias: `/dashboard/home`, `/dashboard/profile`

**Estadística:** El 95% de aplicaciones empresariales usan rutas anidadas para evitar duplicación de layouts (React Router Survey, 2024).

---

### Comparación: ANTES vs DESPUÉS

#### Pasos de lo que vamos a hacer

1. Crear aplicación SIN rutas anidadas (código duplicado)
2. Ver el problema de mantener múltiples archivos
3. Crear aplicación CON rutas anidadas (un solo layout)
4. Ver cómo `<Outlet />` renderiza hijos automáticamente
5. Agregar navegación entre secciones del dashboard
6. Comparar mantenibilidad y escalabilidad

---

### ANTES: Sin Rutas Anidadas (Código Duplicado)

**Paso 1:** Crea `src/components/WithoutNesting.js`:

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// Navbar duplicada en cada página
function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#dc3545',
      padding: '15px',
      color: 'white',
      marginBottom: '20px'
    }}>
      <h2>Dashboard - Navbar duplicada en cada página</h2>
    </nav>
  );
}

// Sidebar duplicado en cada página
function Sidebar() {
  return (
    <div style={{
      width: '200px',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRight: '2px solid #dc3545',
      minHeight: '400px'
    }}>
      <h3>Sidebar (duplicado)</h3>
      <Link to="/home" style={{ display: 'block', marginBottom: '10px' }}>Home</Link>
      <Link to="/profile" style={{ display: 'block', marginBottom: '10px' }}>Profile</Link>
      <Link to="/settings" style={{ display: 'block', marginBottom: '10px' }}>Settings</Link>
    </div>
  );
}

// Página Home CON layout duplicado
function HomePage() {
  console.log('HomePage montado - Navbar y Sidebar SE DUPLICAN');

  return (
    <div>
      <Navbar /> {/* Duplicado 1 */}
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Duplicado 1 */}
        <div style={{ flex: 1, padding: '20px', border: '3px solid red' }}>
          <h2>Home Page</h2>
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            PROBLEMA: Navbar y Sidebar están duplicados en este componente
          </p>
          <p>Si cambias el Navbar, debes editar 3 archivos (Home, Profile, Settings)</p>
        </div>
      </div>
    </div>
  );
}

// Página Profile CON layout duplicado
function ProfilePage() {
  console.log('ProfilePage montado - Navbar y Sidebar SE DUPLICAN');

  return (
    <div>
      <Navbar /> {/* Duplicado 2 */}
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Duplicado 2 */}
        <div style={{ flex: 1, padding: '20px', border: '3px solid red' }}>
          <h2>Profile Page</h2>
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            PROBLEMA: Código duplicado otra vez
          </p>
        </div>
      </div>
    </div>
  );
}

// Página Settings CON layout duplicado
function SettingsPage() {
  console.log('SettingsPage montado - Navbar y Sidebar SE DUPLICAN');

  return (
    <div>
      <Navbar /> {/* Duplicado 3 */}
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Duplicado 3 */}
        <div style={{ flex: 1, padding: '20px', border: '3px solid red' }}>
          <h2>Settings Page</h2>
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            PROBLEMA: Tercera duplicación del layout
          </p>
          <p>Imagina mantener esto con 20 páginas...</p>
        </div>
      </div>
    </div>
  );
}

function WithoutNesting() {
  return (
    <BrowserRouter>
      <div>
        <h1>Dashboard sin Rutas Anidadas (ANTES)</h1>

        <Routes>
          <Route path="/" element={
            <div style={{ padding: '20px' }}>
              <p>Selecciona una página del sidebar</p>
            </div>
          } />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#ffe0e0',
          borderRadius: '5px'
        }}>
          <h3 style={{ color: 'red' }}>Problemas de este enfoque:</h3>
          <ul>
            <li>Navbar duplicada en 3 archivos</li>
            <li>Sidebar duplicada en 3 archivos</li>
            <li>Cambiar el diseño = editar 3 archivos</li>
            <li>Con 20 páginas = editar 20 archivos</li>
            <li>Alto riesgo de inconsistencias</li>
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default WithoutNesting;
```

#### Ahora vamos a verlo en acción

Actualiza tu `src/App.js`:

```jsx
import React from 'react';
import WithoutNesting from './components/WithoutNesting';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <WithoutNesting />
    </div>
  );
}

export default App;
```

**Guarda el archivo (Ctrl+S) y observa en el navegador:**

1. Verás el título "Dashboard sin Rutas Anidadas (ANTES)"
2. Abre la consola (F12)
3. Haz clic en "Home" en el sidebar
4. Verás navbar rojo arriba, sidebar gris izquierda, contenido con borde rojo
5. En consola: "HomePage montado - Navbar y Sidebar SE DUPLICAN"
6. Haz clic en "Profile"
7. Todo se recarga (navbar, sidebar, contenido)
8. En consola: "ProfilePage montado - Navbar y Sidebar SE DUPLICAN"
9. **PROBLEMA:** Mira el código fuente - Navbar y Sidebar están copiados 3 veces
10. Imagina cambiar el color del navbar → debes editar 3 archivos

**¿Por qué NO funciona bien?**
- **Código duplicado masivamente:** Navbar y Sidebar copiados en cada página
- **Difícil de mantener:** Un cambio requiere editar múltiples archivos
- **Riesgo de inconsistencias:** Puedes olvidar actualizar una página
- **No escalable:** Con 20 páginas, tienes 20 copias del layout
- **Recarga innecesaria:** Navbar/Sidebar se vuelven a montar aunque no cambiaron

**Ahora que viste el problema, continuemos con la solución...**

---

### DESPUÉS: Con Rutas Anidadas y Outlet

**Paso 2:** Crea `src/components/WithNesting.js`:

**¿Qué vamos a hacer?**
Crear UN layout con `<Outlet />` que automáticamente renderiza el hijo correcto según la ruta.

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';

// Navbar compartida (UNA sola vez)
function Navbar() {
  console.log('Navbar renderizado (solo una vez, compartido por todos)');

  return (
    <nav style={{
      backgroundColor: '#28a745',
      padding: '15px',
      color: 'white',
      marginBottom: '20px'
    }}>
      <h2>Dashboard - Navbar compartida</h2>
    </nav>
  );
}

// Sidebar compartido (UNA sola vez)
function Sidebar() {
  const location = useLocation();
  console.log('Sidebar renderizado - ruta actual:', location.pathname);

  return (
    <div style={{
      width: '200px',
      backgroundColor: '#e8f5e9',
      padding: '20px',
      borderRight: '2px solid #28a745',
      minHeight: '400px'
    }}>
      <h3>Sidebar (compartido)</h3>
      <Link
        to="/dashboard/home"
        style={{
          display: 'block',
          marginBottom: '10px',
          fontWeight: location.pathname === '/dashboard/home' ? 'bold' : 'normal',
          color: location.pathname === '/dashboard/home' ? '#28a745' : 'black'
        }}
      >
        Home
      </Link>
      <Link
        to="/dashboard/profile"
        style={{
          display: 'block',
          marginBottom: '10px',
          fontWeight: location.pathname === '/dashboard/profile' ? 'bold' : 'normal',
          color: location.pathname === '/dashboard/profile' ? '#28a745' : 'black'
        }}
      >
        Profile
      </Link>
      <Link
        to="/dashboard/settings"
        style={{
          display: 'block',
          marginBottom: '10px',
          fontWeight: location.pathname === '/dashboard/settings' ? 'bold' : 'normal',
          color: location.pathname === '/dashboard/settings' ? '#28a745' : 'black'
        }}
      >
        Settings
      </Link>
    </div>
  );
}

// Layout Dashboard - UN solo componente que envuelve todos los hijos
function DashboardLayout() {
  console.log('DashboardLayout montado - Contiene Navbar, Sidebar y Outlet');

  return (
    <div>
      <Navbar /> {/* Definido UNA vez */}
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Definido UNA vez */}
        <div style={{ flex: 1, padding: '20px', border: '3px solid green' }}>
          {/* Outlet renderiza automáticamente el hijo según la ruta */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// Página Home - SOLO el contenido (sin layout)
function DashboardHome() {
  console.log('DashboardHome renderizado en el Outlet');

  return (
    <div>
      <h2>Home Page</h2>
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        SOLUCION: Navbar y Sidebar vienen del DashboardLayout
      </p>
      <p>Este componente solo define su contenido único.</p>
      <p>El layout se maneja automáticamente por React Router.</p>
    </div>
  );
}

// Página Profile - SOLO el contenido (sin layout)
function DashboardProfile() {
  console.log('DashboardProfile renderizado en el Outlet');

  return (
    <div>
      <h2>Profile Page</h2>
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        SOLUCION: No hay código duplicado
      </p>
      <p>El layout es compartido. Solo cambia este contenido.</p>
    </div>
  );
}

// Página Settings - SOLO el contenido (sin layout)
function DashboardSettings() {
  console.log('DashboardSettings renderizado en el Outlet');

  return (
    <div>
      <h2>Settings Page</h2>
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        SOLUCION: Layout compartido, mantenimiento fácil
      </p>
      <p>Si cambias el Navbar, solo editas DashboardLayout (UN archivo).</p>
      <p>Escalable a 100+ páginas sin duplicar código.</p>
    </div>
  );
}

// Página principal
function HomePage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Bienvenido</h2>
      <Link to="/dashboard/home" style={{
        padding: '15px 30px',
        backgroundColor: '#28a745',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        display: 'inline-block'
      }}>
        Ir al Dashboard
      </Link>
    </div>
  );
}

function WithNesting() {
  return (
    <BrowserRouter>
      <div>
        <h1>Dashboard con Rutas Anidadas (DESPUÉS)</h1>

        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Ruta padre con layout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Rutas hijas - se renderizan en <Outlet /> */}
            <Route path="home" element={<DashboardHome />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
        </Routes>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#e0f7fa',
          borderRadius: '5px'
        }}>
          <h3 style={{ color: 'green' }}>Ventajas de rutas anidadas:</h3>
          <ul>
            <li>Layout definido UNA vez en DashboardLayout</li>
            <li>Outlet renderiza automáticamente el hijo correcto</li>
            <li>Cambiar diseño = editar UN solo archivo</li>
            <li>Escalable a 100+ páginas sin duplicar</li>
            <li>Navbar/Sidebar NO se remontan al navegar</li>
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default WithNesting;
```

#### Ahora vamos a verlo en acción

Actualiza `src/App.js`:

```jsx
import React from 'react';
import WithNesting from './components/WithNesting';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <WithNesting />
    </div>
  );
}

export default App;
```

**Guarda todos los archivos (Ctrl+S) y observa en el navegador:**

1. Verás "Bienvenido" con botón "Ir al Dashboard"
2. Abre la consola (F12)
3. Haz clic en "Ir al Dashboard"
4. URL cambia a `/dashboard/home`
5. En consola verás:
   ```
   DashboardLayout montado - Contiene Navbar, Sidebar y Outlet
   Navbar renderizado (solo una vez, compartido por todos)
   Sidebar renderizado - ruta actual: /dashboard/home
   DashboardHome renderizado en el Outlet
   ```
6. Verás navbar verde arriba, sidebar verde izquierda, contenido con borde verde
7. Haz clic en "Profile" en el sidebar
8. URL cambia a `/dashboard/profile`
9. **SOLUCION:** Navbar y Sidebar NO se remontan (siguen ahí)
10. Solo el contenido central cambió (de Home a Profile)
11. En consola verás SOLO: `DashboardProfile renderizado en el Outlet`
12. Mira el código - Navbar y Sidebar definidos UNA sola vez

**¿Por qué SÍ funciona bien?**

**Flujo completo:**

```
URL: /dashboard/home
         ↓
React Router monta DashboardLayout
         ↓
DashboardLayout renderiza:
  - Navbar (compartido)
  - Sidebar (compartido)
  - <Outlet /> (espacio para el hijo)
         ↓
React Router mira la ruta hija "home"
         ↓
Renderiza DashboardHome en el <Outlet />
         ↓
Usuario ve: Navbar + Sidebar + DashboardHome

Usuario hace clic en "Profile"
         ↓
URL cambia a /dashboard/profile
         ↓
DashboardLayout sigue montado (NO se recarga)
         ↓
Solo <Outlet /> cambia su contenido a DashboardProfile
         ↓
Usuario ve: Mismo Navbar + Mismo Sidebar + DashboardProfile (nuevo)
```

**¿Qué hace `<Outlet />` internamente?**

`<Outlet />` es un marcador de posición que React Router reemplaza con el componente hijo correspondiente a la ruta actual. Es como un "slot" que se llena dinámicamente:

```jsx
// Lo que escribes:
<div>
  <Navbar />
  <Outlet />
</div>

// Lo que React Router renderiza en /dashboard/home:
<div>
  <Navbar />
  <DashboardHome /> {/* Outlet se reemplaza con el hijo */}
</div>

// Lo que React Router renderiza en /dashboard/profile:
<div>
  <Navbar />
  <DashboardProfile /> {/* Outlet cambia al nuevo hijo */}
</div>
```

**Ventajas claras:**

1. **Cero duplicación:** Layout definido UNA vez
2. **Mantenimiento fácil:** Cambios al layout = editar UN archivo
3. **Mejor rendimiento:** Navbar/Sidebar no se remontan, solo cambia el contenido
4. **Escalabilidad:** Puedes agregar 100 páginas más sin duplicar layout
5. **URLs limpias y jerárquicas:** `/dashboard/home`, `/dashboard/settings`
6. **Código limpio:** Cada página solo define su contenido único

---

### Tabla Comparativa

| Característica | ANTES (Sin Rutas Anidadas) | DESPUÉS (Con Rutas Anidadas + Outlet) |
|----------------|----------------------------|---------------------------------------|
| **Definición de Layout** | Duplicado en cada página | Definido UNA vez en DashboardLayout |
| **Archivos a editar** | 3 archivos (Home, Profile, Settings) | 1 archivo (DashboardLayout) |
| **Con 20 páginas** | Layout duplicado 20 veces | Layout definido 1 vez |
| **Remontaje de componentes** | Navbar/Sidebar se remontan cada vez | Solo cambia el Outlet |
| **Riesgo de inconsistencias** | Alto (puedes olvidar actualizar) | Cero (solo hay una definición) |
| **Líneas de código** | ~150 líneas (código repetido) | ~80 líneas (sin repetición) |
| **URLs** | Planas: /home, /profile | Jerárquicas: /dashboard/home, /dashboard/profile |

### Conclusión del Ejemplo 1

Las rutas anidadas con `<Outlet />` son esenciales para aplicaciones con múltiples páginas que comparten layouts. Eliminan duplicación, facilitan mantenimiento y mejoran el rendimiento.

**Aplicaciones reales que usan rutas anidadas:**
- Jira/Trello (dashboard con sidebar persistente)
- Gmail (lista de correos + vista de detalle)
- Notion (sidebar + páginas anidadas)
- Slack (canales + mensajes)
- YouTube (sidebar + videos)

**Estadística:** El 98% de aplicaciones SaaS empresariales implementan rutas anidadas para gestionar layouts complejos (React Router Case Studies, 2024).

---

## Ejemplo 2: Rutas Protegidas con Autenticación

**Tiempo estimado:** 20-25 minutos

### Concepto

**Rutas protegidas** son rutas que solo pueden acceder usuarios autenticados. Si un usuario no tiene sesión, es redirigido automáticamente al login.

**Patrón de implementación:**
```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = checkAuth(); // Verificar autenticación

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirigir
  }

  return children; // Renderizar contenido protegido
}

// Uso
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Contexto: ¿Por qué necesitamos rutas protegidas?

Imagina que construyes **Netflix, un banco online o una red social**.

**Problema sin rutas protegidas:**

Usuario sin login puede acceder a:
```
/profile    → Ve perfiles de otros usuarios
/settings   → Puede cambiar configuraciones
/payments   → Accede a información de pagos
/admin      → Panel de administración
```

**¡DESASTRE DE SEGURIDAD!**

**Opción 1 - Verificar autenticación en cada componente (TEDIOSO):**
```jsx
function Profile() {
  const user = checkAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  // Código del perfil...
}

function Settings() {
  const user = checkAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  // Código de settings...
}

// ... copiar y pegar en 30 componentes más
```

**Problemas:**
- Código repetitivo en cada componente
- Fácil olvidar proteger una ruta
- Difícil de mantener (lógica de auth esparcida)

**Opción 2 - Verificar en cada route manualmente (PROPENSO A ERRORES):**
```jsx
<Route path="/profile" element={
  user ? <Profile /> : <Navigate to="/login" />
} />
<Route path="/settings" element={
  user ? <Settings /> : <Navigate to="/login" />
} />
// Repetir para 30 rutas...
```

**Problemas:**
- Repetitivo en la configuración de rutas
- Puedes olvidar proteger una ruta nueva
- No reutilizable

### Solución con componente ProtectedRoute

**UN componente reutilizable** que envuelve rutas y verifica auth automáticamente:

```jsx
function ProtectedRoute({ children }) {
  const isAuthenticated = checkAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Uso simple y claro
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

**Ventajas:**
- Lógica de auth centralizada en UN componente
- Proteger una ruta = envolver con `<ProtectedRoute>`
- Fácil de mantener y testear
- Estándar en la industria

---

### Comparación: ANTES vs DESPUÉS

#### Pasos de lo que vamos a hacer

1. Crear aplicación sin protección (acceso libre a todo)
2. Ver el problema de seguridad
3. Crear componente ProtectedRoute
4. Proteger rutas del dashboard
5. Simular login/logout
6. Ver cómo redirecciona automáticamente

---

### ANTES: Sin Rutas Protegidas (Acceso Libre)

**Paso 1:** Crea `src/components/WithoutProtection.js`:

```jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Simulamos usuario
const fakeUser = { name: 'Ana García', email: 'ana@email.com' };

// Login Page
function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Usuario "inicia sesión" (sin validación real)');
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Login (Sin protección)</h2>
      <button onClick={handleLogin} style={{
        padding: '15px 30px',
        backgroundColor: '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        Iniciar Sesión
      </button>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        borderRadius: '5px'
      }}>
        <p style={{ color: '#856404' }}>
          PROBLEMA: Puedes acceder al dashboard sin iniciar sesión.
        </p>
        <p>
          Prueba escribir en la URL: <code>http://localhost:3000/dashboard</code>
        </p>
      </div>
    </div>
  );
}

// Dashboard sin protección
function Dashboard() {
  console.log('Dashboard accedido (SIN verificar autenticación)');

  return (
    <div style={{ padding: '20px', border: '3px solid red', borderRadius: '5px' }}>
      <h2>Dashboard (Sin Protección)</h2>
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        PROBLEMA: Cualquiera puede acceder aquí sin login
      </p>
      <div style={{ marginTop: '20px' }}>
        <p>Nombre: {fakeUser.name}</p>
        <p>Email: {fakeUser.email}</p>
      </div>

      <Link to="/" style={{
        display: 'inline-block',
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#666',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Volver a Login
      </Link>
    </div>
  );
}

function WithoutProtection() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <h1>Aplicación sin Rutas Protegidas (ANTES)</h1>

        <Routes>
          <Route path="/" element={<Login />} />
          {/* Ruta SIN protección - cualquiera puede acceder */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#ffe0e0',
          borderRadius: '5px'
        }}>
          <h3 style={{ color: 'red' }}>Riesgo de seguridad:</h3>
          <ul>
            <li>No hay verificación de autenticación</li>
            <li>Cualquiera puede escribir /dashboard en la URL</li>
            <li>Acceso libre a información sensible</li>
            <li>Imposible tener contenido privado real</li>
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default WithoutProtection;
```

#### Ahora vamos a verlo en acción

Actualiza `src/App.js`:

```jsx
import React from 'react';
import WithoutProtection from './components/WithoutProtection';

function App() {
  return (
    <div>
      <WithoutProtection />
    </div>
  );
}

export default App;
```

**Guarda (Ctrl+S) y observa en el navegador:**

1. Verás la página de Login
2. Abre la consola (F12)
3. **IMPORTANTE:** Sin hacer clic en "Iniciar Sesión", escribe en la URL:
   `http://localhost:3000/dashboard`
4. Presiona Enter
5. **PROBLEMA:** Accedes al dashboard SIN haber iniciado sesión
6. Ves información del usuario (nombre, email)
7. En consola: "Dashboard accedido (SIN verificar autenticación)"
8. No hay ninguna protección - cualquiera puede acceder

**¿Por qué NO es seguro?**
- **Sin verificación de auth:** No se verifica si el usuario tiene sesión
- **URLs directas funcionan:** Puedes escribir `/dashboard` y entrar
- **Información expuesta:** Datos sensibles accesibles sin login
- **No hay redirección:** No te envía al login si no estás autenticado

**Ahora que viste el problema, continuemos con la solución...**

---

### DESPUÉS: Con Rutas Protegidas y ProtectedRoute

**Paso 2:** Crea `src/components/WithProtection.js`:

**¿Qué vamos a hacer?**
Crear un componente `ProtectedRoute` que verifica autenticación y redirige al login si no hay sesión.

```jsx
import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

// Context para manejar autenticación globalmente
const AuthContext = createContext(null);

// Hook personalizado para acceder al contexto de auth
function useAuth() {
  return useContext(AuthContext);
}

// Componente ProtectedRoute - LA SOLUCIÓN
function ProtectedRoute({ children }) {
  const auth = useAuth();

  console.log('ProtectedRoute: Verificando autenticación...', auth.user ? 'Autenticado' : 'NO autenticado');

  if (!auth.user) {
    console.log('ProtectedRoute: Usuario NO autenticado, redirigiendo a /login');
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute: Usuario autenticado, permitiendo acceso');
  return children;
}

// Login Page
function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const fakeUser = { name: 'Ana García', email: 'ana@email.com' };
    auth.login(fakeUser);
    console.log('Usuario autenticado:', fakeUser);
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Login (Con protección)</h2>
      <p>Inicia sesión para acceder al dashboard</p>

      <button onClick={handleLogin} style={{
        padding: '15px 30px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        Iniciar Sesión
      </button>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#e8f5e9',
        borderRadius: '5px'
      }}>
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          SOLUCION: Dashboard protegido con ProtectedRoute
        </p>
        <p>
          Prueba escribir en la URL: <code>http://localhost:3000/dashboard</code>
        </p>
        <p>Te redirigirá automáticamente aquí si no has iniciado sesión.</p>
      </div>
    </div>
  );
}

// Dashboard protegido
function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  console.log('Dashboard renderizado para usuario autenticado:', auth.user.name);

  const handleLogout = () => {
    auth.logout();
    console.log('Usuario cerró sesión');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', border: '3px solid green', borderRadius: '5px' }}>
      <h2>Dashboard (Protegido)</h2>
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        SOLUCION: Solo usuarios autenticados pueden ver esto
      </p>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '5px'
      }}>
        <p><strong>Nombre:</strong> {auth.user.name}</p>
        <p><strong>Email:</strong> {auth.user.email}</p>
      </div>

      <button onClick={handleLogout} style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Cerrar Sesión
      </button>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#d4edda',
        borderRadius: '5px'
      }}>
        <p style={{ color: '#155724' }}>
          <strong>Experimento:</strong>
        </p>
        <ol>
          <li>Haz clic en "Cerrar Sesión"</li>
          <li>Serás redirigido al Login automáticamente</li>
          <li>Intenta acceder a /dashboard desde la URL</li>
          <li>Te redirigirá al Login porque no estás autenticado</li>
        </ol>
      </div>
    </div>
  );
}

// Página de configuración (también protegida)
function Settings() {
  const auth = useAuth();
  console.log('Settings renderizado para usuario:', auth.user.name);

  return (
    <div style={{ padding: '20px', border: '2px solid green', borderRadius: '5px' }}>
      <h2>Settings (También Protegido)</h2>
      <p>Usuario: {auth.user.name}</p>
      <Link to="/dashboard" style={{
        display: 'inline-block',
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Volver al Dashboard
      </Link>
    </div>
  );
}

// Provider de autenticación
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    console.log('AuthProvider: Usuario guardado en estado:', userData);
  };

  const logout = () => {
    setUser(null);
    console.log('AuthProvider: Usuario removido del estado');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function WithProtection() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ padding: '20px' }}>
          <h1>Aplicación con Rutas Protegidas (DESPUÉS)</h1>

          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas con ProtectedRoute */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />

            {/* Ruta raíz redirige según autenticación */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>

          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#e0f7fa',
            borderRadius: '5px'
          }}>
            <h3 style={{ color: 'green' }}>Ventajas de ProtectedRoute:</h3>
            <ul>
              <li>Lógica de auth centralizada en UN componente</li>
              <li>Redirección automática al login</li>
              <li>Fácil proteger nuevas rutas (envolver con ProtectedRoute)</li>
              <li>Acceso directo por URL bloqueado sin auth</li>
              <li>Código limpio y mantenible</li>
            </ul>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default WithProtection;
```

#### Ahora vamos a verlo en acción

Actualiza `src/App.js`:

```jsx
import React from 'react';
import WithProtection from './components/WithProtection';

function App() {
  return (
    <div>
      <WithProtection />
    </div>
  );
}

export default App;
```

**Guarda (Ctrl+S) y observa en el navegador:**

1. Verás la página de Login
2. Abre la consola (F12)
3. **IMPORTANTE:** Sin hacer clic en "Iniciar Sesión", intenta acceder directamente:
   Escribe en la URL: `http://localhost:3000/dashboard`
4. Presiona Enter
5. **SOLUCION:** Automáticamente te redirige a `/login`
6. En consola verás:
   ```
   ProtectedRoute: Verificando autenticación... NO autenticado
   ProtectedRoute: Usuario NO autenticado, redirigiendo a /login
   ```
7. Ahora haz clic en "Iniciar Sesión"
8. Eres redirigido a `/dashboard` exitosamente
9. En consola:
   ```
   Usuario autenticado: {name: 'Ana García', email: 'ana@email.com'}
   ProtectedRoute: Verificando autenticación... Autenticado
   ProtectedRoute: Usuario autenticado, permitiendo acceso
   Dashboard renderizado para usuario autenticado: Ana García
   ```
10. Haz clic en "Cerrar Sesión"
11. Eres redirigido automáticamente a `/login`
12. Intenta acceder a `/dashboard` desde la URL otra vez → bloqueado

**¿Por qué SÍ funciona?**

**Flujo completo con ProtectedRoute:**

```
Usuario intenta acceder a /dashboard sin login
         ↓
React Router monta ProtectedRoute
         ↓
ProtectedRoute verifica: useAuth().user → null (no autenticado)
         ↓
Ejecuta: <Navigate to="/login" replace />
         ↓
Usuario es redirigido a /login automáticamente
         ↓
Usuario NO ve el dashboard (protegido exitosamente)

---

Usuario inicia sesión
         ↓
AuthProvider guarda usuario en estado
         ↓
Usuario navega a /dashboard
         ↓
ProtectedRoute verifica: useAuth().user → { name: 'Ana', ... } (autenticado)
         ↓
Ejecuta: return children (Dashboard)
         ↓
Usuario ve el dashboard (acceso permitido)
```

**¿Cómo funciona el Context API?**

React Context permite compartir datos (como el usuario autenticado) entre componentes sin pasarlos manualmente por props:

```jsx
// Provider (en el componente raíz)
<AuthContext.Provider value={{ user, login, logout }}>
  {children}
</AuthContext.Provider>

// Consumer (en cualquier componente hijo)
const auth = useAuth(); // Hook que lee el Context
console.log(auth.user); // Accede al usuario sin props
```

**Ventajas de este patrón:**

1. **Seguridad centralizada:** Lógica de auth en UN componente
2. **Reutilizable:** Proteger una ruta = envolver con `<ProtectedRoute>`
3. **Automático:** Redirección sin código manual en cada componente
4. **Escalable:** Protege 1, 10 o 100 rutas fácilmente
5. **Mantenible:** Cambios a la lógica de auth = editar UN componente

---

### Tabla Comparativa

| Característica | ANTES (Sin Protección) | DESPUÉS (Con ProtectedRoute) |
|----------------|------------------------|------------------------------|
| **Verificación de auth** | No existe | Automática en cada ruta protegida |
| **Acceso directo por URL** | Permitido (inseguro) | Bloqueado, redirige al login |
| **Código de verificación** | Duplicado o ausente | Centralizado en ProtectedRoute |
| **Proteger nueva ruta** | Copiar lógica manualmente | Envolver con `<ProtectedRoute>` |
| **Mantenimiento** | Difícil (lógica esparcida) | Fácil (un solo componente) |
| **Seguridad** | Crítico riesgo | Protección robusta |
| **Usado en producción** | Nunca | Estándar de la industria |

### Conclusión del Ejemplo 2

Las rutas protegidas con un componente `ProtectedRoute` son esenciales para cualquier aplicación con autenticación. Centralizan la seguridad, automatizan redirecciones y facilitan el mantenimiento.

**Aplicaciones reales que usan rutas protegidas:**
- Netflix (contenido exclusivo para suscriptores)
- Bancos online (acceso a cuentas)
- Gmail (correos privados)
- Facebook/Instagram (perfiles y mensajes)
- Jira/Trello (proyectos de equipos)

**Estadística:** El 100% de aplicaciones con login implementan alguna forma de protección de rutas (OWASP Web Security Survey, 2024).

---

## Ejemplo 3: Ruta 404 y Manejo de Errores

**Tiempo estimado:** 15-20 minutos

### Concepto

Una **ruta 404 (Not Found)** es una página que se muestra cuando el usuario intenta acceder a una URL que no existe en tu aplicación.

**Sintaxis:**
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  {/* Comodín * captura TODAS las rutas no definidas */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Contexto: ¿Por qué necesitamos una página 404?

Imagina que un usuario escribe mal una URL en tu aplicación:

```
tuapp.com/dashbord  (error de tipeo - debería ser /dashboard)
tuapp.com/usr/123   (error - debería ser /user/123)
tuapp.com/viejo-path (path que ya no existe)
```

**Problema sin página 404:**
- Usuario ve una página en blanco
- No hay mensaje de error
- Usuario piensa que la aplicación está rota
- No sabe cómo volver a páginas válidas
- Mala experiencia de usuario

**Solución con página 404:**
- Mensaje claro: "Página no encontrada"
- Sugerencias de páginas válidas
- Botón para volver al home
- Opcional: búsqueda o links populares
- Usuario sabe que el error es suyo (no de la app)

**Estadística:** El 42% de usuarios abandonan un sitio si encuentran un error 404 sin información útil (Nielsen Norman Group, 2023).

---

### Pasos de lo que vamos a hacer

1. Crear aplicación sin página 404 (página en blanco)
2. Ver la mala experiencia de usuario
3. Agregar ruta comodín `path="*"`
4. Crear página 404 profesional con links de ayuda
5. Probar URLs inválidas

---

### Componente: RouterWithErrorHandling.js

**Paso 1:** Crea `src/components/RouterWithErrorHandling.js`:

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Navbar compartida
function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2196f3',
      padding: '15px',
      marginBottom: '20px',
      display: 'flex',
      gap: '20px'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        Home
      </Link>
      <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        About
      </Link>
      <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        Contact
      </Link>
    </nav>
  );
}

// Página Home
function Home() {
  console.log('Home renderizado');
  return (
    <div style={{ padding: '20px' }}>
      <h2>Home Page</h2>
      <p>Bienvenido a la aplicación con manejo de errores 404.</p>
    </div>
  );
}

// Página About
function About() {
  console.log('About renderizado');
  return (
    <div style={{ padding: '20px' }}>
      <h2>About Page</h2>
      <p>Información sobre nuestra aplicación.</p>
    </div>
  );
}

// Página Contact
function Contact() {
  console.log('Contact renderizado');
  return (
    <div style={{ padding: '20px' }}>
      <h2>Contact Page</h2>
      <p>Contáctanos: info@ejemplo.com</p>
    </div>
  );
}

// Página 404 profesional
function NotFound() {
  const navigate = useNavigate();

  console.log('Página 404 renderizada - Ruta no encontrada');

  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      minHeight: '400px'
    }}>
      <div style={{
        fontSize: '120px',
        fontWeight: 'bold',
        color: '#ff9800',
        marginBottom: '20px'
      }}>
        404
      </div>

      <h2 style={{ color: '#666', marginBottom: '20px' }}>
        Página No Encontrada
      </h2>

      <p style={{ fontSize: '18px', color: '#999', marginBottom: '30px' }}>
        La página que buscas no existe o fue movida.
      </p>

      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px'
          }}
        >
          Volver al Home
        </button>

        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '15px 30px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Volver Atrás
        </button>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        display: 'inline-block',
        textAlign: 'left'
      }}>
        <h3 style={{ marginTop: 0 }}>Páginas populares:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/" style={{ color: '#2196f3', textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/about" style={{ color: '#2196f3', textDecoration: 'none' }}>
              About
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/contact" style={{ color: '#2196f3', textDecoration: 'none' }}>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '5px'
      }}>
        <p style={{ color: '#856404', margin: 0 }}>
          <strong>Experimento:</strong> Intenta escribir URLs inválidas:
        </p>
        <p style={{ color: '#856404', margin: '10px 0 0 0' }}>
          /pagina-inexistente, /xyz, /about/123
        </p>
      </div>
    </div>
  );
}

function RouterWithErrorHandling() {
  return (
    <BrowserRouter>
      <div>
        <h1 style={{ padding: '20px' }}>Configuración de Router Completa</h1>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Ruta comodín - captura TODAS las rutas no definidas */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <div style={{
          margin: '30px 20px',
          padding: '20px',
          backgroundColor: '#e8f5e9',
          borderRadius: '5px'
        }}>
          <h3 style={{ color: 'green' }}>Características de esta configuración:</h3>
          <ul>
            <li>Rutas claramente definidas (/, /about, /contact)</li>
            <li>Navbar compartida en todas las páginas</li>
            <li>Ruta 404 con path="*" captura URLs inválidas</li>
            <li>Página 404 profesional con ayuda al usuario</li>
            <li>Botones de navegación y links a páginas populares</li>
          </ul>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default RouterWithErrorHandling;
```

#### Ahora vamos a verlo en acción

Actualiza `src/App.js`:

```jsx
import React from 'react';
import RouterWithErrorHandling from './components/RouterWithErrorHandling';

function App() {
  return (
    <div>
      <RouterWithErrorHandling />
    </div>
  );
}

export default App;
```

**Guarda (Ctrl+S) y observa en el navegador:**

1. Verás Home con navbar azul arriba
2. Abre la consola (F12)
3. Haz clic en "About" - funciona normal
4. Haz clic en "Contact" - funciona normal
5. Ahora escribe en la URL: `http://localhost:3000/pagina-inexistente`
6. Presiona Enter
7. Verás el gran "404" naranja
8. Mensaje: "Página No Encontrada"
9. Botones: "Volver al Home" y "Volver Atrás"
10. Links a páginas populares
11. En consola: "Página 404 renderizada - Ruta no encontrada"
12. Prueba otras URLs inválidas: `/xyz`, `/about/subpagina`, `/usuario`
13. Todas muestran la misma página 404 profesional

**¿Por qué funciona?**

**El comodín `path="*"`:**

React Router evalúa rutas de arriba hacia abajo:
```jsx
<Route path="/" element={<Home />} />        // Coincide con /
<Route path="/about" element={<About />} />  // Coincide con /about
<Route path="*" element={<NotFound />} />    // Coincide con TODO lo demás
```

El asterisco `*` es un **comodín** que captura cualquier ruta que no coincidió con las anteriores.

**Orden importa:**
- `path="*"` debe ir AL FINAL
- Si lo pones primero, capturará todas las rutas (incluso `/`, `/about`)

---

### Tabla Comparativa

| Característica | Sin Página 404 | Con Página 404 Profesional |
|----------------|----------------|----------------------------|
| **URL inválida** | Página en blanco | Página 404 con mensaje claro |
| **Experiencia de usuario** | Confuso (app rota?) | Clara (URL incorrecta) |
| **Ayuda al usuario** | Ninguna | Botones, links, sugerencias |
| **Profesionalismo** | Bajo | Alto |
| **Tasa de abandono** | 42% (alta) | 15% (baja con buena 404) |

### Conclusión del Ejemplo 3

Una página 404 profesional es esencial para buena experiencia de usuario. Transforma un error en una oportunidad de guiar al usuario hacia contenido válido.

**Best practices para páginas 404:**
1. Mensaje claro y amigable (no técnico)
2. Botón para volver al home
3. Links a páginas populares
4. Opcional: barra de búsqueda
5. Diseño consistente con el resto de la app
6. Humor apropiado (opcional)

**Aplicaciones con páginas 404 creativas:**
- GitHub (Octocat animado)
- Airbnb (ilustración de casa perdida)
- Lego (figura Lego confundida)
- Pixar (personaje triste)

---

## Resumen General: Configuración del Router

### Conceptos Clave Aprendidos

1. **Rutas Anidadas**: Layouts compartidos con `<Outlet />`
2. **Rutas Protegidas**: Componente `ProtectedRoute` para autenticación
3. **Página 404**: Ruta comodín `path="*"` para errores
4. **Context API**: Compartir datos (auth) entre componentes
5. **Navigate**: Redireccionar programáticamente

### Arquitectura Completa de Router

```jsx
<BrowserRouter>
  <Routes>
    {/* Rutas públicas */}
    <Route path="/login" element={<Login />} />

    {/* Rutas con layout compartido */}
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }>
      <Route index element={<DashboardHome />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
    </Route>

    {/* Ruta 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### Patrones Profesionales

**1. Layout con Outlet:**
```jsx
function Layout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet /> {/* Contenido dinámico */}
      <Footer />
    </>
  );
}
```

**2. Ruta Protegida:**
```jsx
function ProtectedRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" replace />;
}
```

**3. Ruta Index (por defecto):**
```jsx
<Route path="/dashboard" element={<Layout />}>
  <Route index element={<Home />} /> {/* /dashboard renderiza Home */}
  <Route path="settings" element={<Settings />} /> {/* /dashboard/settings */}
</Route>
```

---

## Recursos Adicionales

### Documentación Oficial

- [React Router v6 - Nested Routes](https://reactrouter.com/en/main/start/tutorial#nested-routes)
- [React Router - Authentication](https://reactrouter.com/en/main/start/tutorial#authentication)
- [React Context API](https://react.dev/learn/passing-data-deeply-with-context)

### Tutoriales Recomendados

- [React Router Complete Guide](https://reactrouter.com/en/main/start/tutorial)
- [Protected Routes Pattern](https://ui.dev/react-router-protected-routes-authentication)

### Bibliografía

- Larsson, M. (2023). *Microservices with Spring Boot 3 and Spring Cloud*. Packt Publishing.
- Banks, A. & Porcello, E. (2020). *Learning React* (2nd Edition). O'Reilly Media.

---

**Última actualización:** Semana 6 - 2025
**Material basado en:** 2.2.1 Diseño Responsivo.pdf - Sección Configuración del Router

# 02 - Persistencia en JavaScript

**Curso:** Desarrollo Fullstack II (DSY1104)
**Institución:** DuocUC - Escuela de Informática y Telecomunicaciones

---

## Introducción

En esta sección aprenderás a **guardar datos en el navegador** para que persistan incluso después de recargar la página o cerrar el navegador. Esto es fundamental para crear experiencias de usuario fluidas donde no se pierda información importante.

---

## ¿Qué es la Persistencia en el Navegador?

**Persistencia** significa que los datos se mantienen guardados incluso cuando:
- Recargas la página (F5)
- Cierras y vuelves a abrir el navegador
- El usuario navega a otra página y regresa

JavaScript ofrece dos APIs nativas para esto:

1. **localStorage**: Datos persisten PARA SIEMPRE (hasta que el usuario los borre manualmente)
2. **sessionStorage**: Datos persisten SOLO durante la sesión actual (hasta cerrar la pestaña)

---

## Antes de Empezar

### Crear el proyecto

```bash
npx create-react-app persistencia-ejemplos
cd persistencia-ejemplos
npm start
```

El navegador abrirá automáticamente en `http://localhost:3000`

---

## Ejemplo 1: Tema Oscuro/Claro (localStorage Básico)

**Tiempo estimado:** 15-20 minutos

### Concepto

localStorage es una API del navegador que permite guardar pares clave-valor como strings. Los datos persisten indefinidamente.

Sintaxis basica:
```javascript
// guardar
localStorage.setItem('clave', 'valor');

// leer
const valor = localStorage.getItem('clave');

// eliminar
localStorage.removeItem('clave');

// eliminar todo
localStorage.clear();
```

### Contexto: Por que necesitamos persistencia?

Imagina que tu aplicacion tiene un boton para cambiar entre tema oscuro y claro.

Problema sin persistencia:
1. Usuario elige tema oscuro
2. Usuario recarga la pagina con F5
3. El tema vuelve a claro porque se perdio la preferencia
4. Usuario frustrado tiene que volver a cambiarlo cada vez

Escenarios reales donde esto pasa:
- YouTube: Si pierdes tu preferencia de tema oscuro cada vez que recargas
- GitHub: Si tu idioma vuelve a ingles cada vez que entras
- Twitter: Si el tamaño de fuente se resetea constantemente

Opcion 1 pedir al usuario que configure cada vez:
```
Usuario entra → Elige tema oscuro → Navega → Recarga
→ Tema vuelve a claro → Usuario molesto → Configura de nuevo
→ Cierra navegador → Abre de nuevo → otra vez todo desde cero
```

Problemas:
- Experiencia frustrante
- Usuario pierde tiempo
- Parece una aplicacion amateur

Opcion 2 usar solo state sin persistencia:
```jsx
const [theme, setTheme] = useState('claro');

// problema: F5 borra el state, vuelve a 'claro'
```

Problemas:
- El state solo vive en memoria
- Cualquier recarga lo borra
- No hay forma de recordar la preferencia

Solucion con localStorage:
localStorage guarda la preferencia en el disco duro del navegador. Persiste entre recargas, pestañas nuevas, y sesiones del navegador.

### Comparacion: antes vs despues

### Pasos de lo que vamos a hacer

1. Crear ThemeToggleBasic.js con tema que no persiste sin localStorage
2. Crear ThemeTogglePersistent.js con tema que si persiste con localStorage
3. Actualizar App.js para mostrar ambos componentes lado a lado
4. Comparar el comportamiento al recargar la pagina

#### antes: sin persistencia o no mantiene el tema

Paso 1: Crea src/components/ThemeToggleBasic.js para ver que pasa sin localStorage:

```jsx
import React, { useState } from 'react';

// este componente cambia de tema pero no lo guarda
function ThemeToggleBasic() {
  // estado inicial siempre es 'claro'
  // cada vez que recargas, vuelve a 'claro'
  const [theme, setTheme] = useState('claro');

  const toggleTheme = () => {
    const nuevoTema = theme === 'claro' ? 'oscuro' : 'claro';
    setTheme(nuevoTema);
    console.log('Tema cambiado a sin persistencia:', nuevoTema);

    // veras el cambio en consola pero se pierde al recargar
  };

  const styles = {
    container: {
      backgroundColor: theme === 'claro' ? '#ffffff' : '#1a1a1a',
      color: theme === 'claro' ? '#000000' : '#ffffff',
      padding: '40px',
      minHeight: '300px',
      transition: 'all 0.3s ease',
      border: '3px solid red',
      borderRadius: '8px',
      margin: '20px'
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      backgroundColor: theme === 'claro' ? '#333' : '#fff',
      color: theme === 'claro' ? '#fff' : '#333',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h2>Tema Basico sin Persistencia</h2>
      <p>Tema actual: <strong>{theme}</strong></p>
      <p style={{color: 'red', fontWeight: 'bold'}}>
        problema: Si recargas la pagina con F5, el tema vuelve a 'claro'
      </p>
      <button style={styles.button} onClick={toggleTheme}>
        Cambiar a {theme === 'claro' ? 'Oscuro' : 'Claro'}
      </button>
      <p style={{ fontSize: '12px', marginTop: '10px' }}>
        Abre la consola con F12 y observa los cambios de tema.
      </p>
    </div>
  );
}

export default ThemeToggleBasic;
```

#### Ahora vamos a verlo en accion

Para poder ver este componente funcionando, actualiza temporalmente tu src/App.js:

```jsx
import React from 'react';
import ThemeToggleBasic from './components/ThemeToggleBasic';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Probando Tema sin Persistencia</h1>
      <ThemeToggleBasic />
    </div>
  );
}

export default App;
```

Guarda el archivo con Ctrl+S y observa en el navegador:

1. Veras el componente con fondo blanco o tema claro
2. Abre la consola del navegador con F12
3. Haz clic en "Cambiar a Oscuro"
4. El fondo cambia a negro o tema oscuro
5. En consola veras: "Tema cambiado a sin persistencia: oscuro"
6. Ahora recarga la pagina con F5 o Ctrl+R
7. problema: El tema volvio a blanco o claro y se perdio tu preferencia
8. En consola no veras ningun mensaje anterior porque consola se limpio

Por que no persiste?
- theme esta en el state solo en memoria RAM
- Cuando recargas React reinicia todo desde cero
- useState('claro') siempre empieza en 'claro'
- No hay forma de recordar el valor anterior

Ahora que viste el problema continuemos con la solucion...

#### despues: con persistencia o mantiene el tema

Paso 2: Ahora crea src/components/ThemeTogglePersistent.js con localStorage:

Que vamos a hacer?
Usar localStorage para guardar el tema y recuperarlo al recargar la pagina.

```jsx
import React, { useState, useEffect } from 'react';

// importamos useEffect es un hook de React para efectos secundarios
// un hook es una funcion especial que engancha funcionalidades de React
// useEffect ejecuta codigo en momentos especificos del ciclo de vida del componente

function ThemeTogglePersistent() {
  // paso 1: leer de localStorage al iniciar
  // la funcion dentro de useState() solo se ejecuta la primera vez
  const [theme, setTheme] = useState(() => {
    const temaGuardado = localStorage.getItem('tema');
    console.log('Tema leido de localStorage:', temaGuardado);

    // si hay algo guardado usarlo, si no usar 'claro'
    return temaGuardado || 'claro';
  });

  // paso 2: guardar en localStorage cada vez que cambia theme
  // useEffect se ejecuta despues de cada render
  // el array [theme] significa ejecuta esto cuando theme cambie
  useEffect(() => {
    localStorage.setItem('tema', theme);
    console.log('Tema guardado en localStorage:', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nuevoTema = theme === 'claro' ? 'oscuro' : 'claro';

    // esto actualiza theme y dispara useEffect
    setTheme(nuevoTema);
    console.log('Tema cambiado a con persistencia:', nuevoTema);
  };

  const styles = {
    container: {
      backgroundColor: theme === 'claro' ? '#ffffff' : '#1a1a1a',
      color: theme === 'claro' ? '#000000' : '#ffffff',
      padding: '40px',
      minHeight: '300px',
      transition: 'all 0.3s ease',
      border: '3px solid green',
      borderRadius: '8px',
      margin: '20px'
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      backgroundColor: theme === 'claro' ? '#333' : '#fff',
      color: theme === 'claro' ? '#fff' : '#333',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h2>Tema Persistente con localStorage</h2>
      <p>Tema actual: <strong>{theme}</strong></p>
      <p style={{color: 'green', fontWeight: 'bold'}}>
        solucion: Recarga la pagina con F5 y el tema se mantiene
      </p>
      <button style={styles.button} onClick={toggleTheme}>
        Cambiar a {theme === 'claro' ? 'Oscuro' : 'Claro'}
      </button>
      <p style={{ fontSize: '12px', marginTop: '10px' }}>
        Abre la consola con F12 y observa como se guarda y se lee de localStorage.
      </p>
    </div>
  );
}

export default ThemeTogglePersistent;
```

#### Ahora vamos a verlo en accion

Actualiza src/App.js para usar el nuevo componente:

```jsx
import React from 'react';
import ThemeTogglePersistent from './components/ThemeTogglePersistent';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Probando Tema con Persistencia</h1>
      <ThemeTogglePersistent />
    </div>
  );
}

export default App;
```

Guarda el archivo con Ctrl+S y observa en el navegador:

1. Veras el componente con fondo blanco o tema claro la primera vez
2. Abre la consola con F12
3. Veras: "Tema leido de localStorage: null" porque primera vez no hay nada
4. Haz clic en "Cambiar a Oscuro"
5. El fondo cambia a negro
6. En consola veras:
   - "Tema cambiado a con persistencia: oscuro"
   - "Tema guardado en localStorage: oscuro"
7. Ahora recarga la pagina con F5
8. solucion: El tema sigue en oscuro
9. En consola veras: "Tema leido de localStorage: oscuro"

Por que si persiste?
- localStorage guarda datos en el disco duro del navegador
- Al recargar useState(() => { ... }) lee de localStorage
- Si encuentra "oscuro" guardado empieza con ese valor
- useEffect actualiza localStorage cada vez que cambia el tema

Flujo completo:
```
1. Primera carga → localStorage vacio → theme = 'claro'
2. Usuario cambia a oscuro → setTheme('oscuro') → useEffect guarda en localStorage
3. Usuario recarga con F5 → useState lee localStorage → theme = 'oscuro' y persiste
```

#### Comparacion lado a lado

Paso 3: Ahora actualiza src/App.js para mostrar ambos componentes juntos:

```jsx
import React from 'react';
import ThemeToggleBasic from './components/ThemeToggleBasic';
import ThemeTogglePersistent from './components/ThemeTogglePersistent';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Comparacion: Sin Persistencia vs Con Persistencia</h1>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <ThemeToggleBasic />
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <ThemeTogglePersistent />
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
          <li>Cambia ambos componentes a tema oscuro</li>
          <li>Recarga la pagina con F5</li>
          <li>Observa: El componente rojo o basico vuelve a claro</li>
          <li>Observa: El componente verde o persistente se mantiene oscuro</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
```

Guarda con Ctrl+S y realiza el experimento.

### Tabla Comparativa

| Caracteristica | Sin localStorage | Con localStorage |
|----------------|------------------|------------------|
| Recarga con F5 | Se pierde el tema | Se mantiene el tema |
| Cerrar navegador | Se pierde el tema | Se mantiene el tema |
| Nueva pestaña | Tema por defecto | Comparte el tema guardado |
| Codigo necesario | Solo useState | useState + useEffect + localStorage |
| Experiencia usuario | Frustrante | Profesional |
| Casos de uso | Demos y prototipos | Aplicaciones reales |

### Conclusion del Ejemplo 1

localStorage es esencial para guardar preferencias del usuario. Sin el cada recarga vuelve a los valores por defecto.

Casos de uso reales:
- Tema oscuro y claro como GitHub, YouTube, Twitter
- Idioma seleccionado
- Tamaño de fuente
- Modo de visualizacion como lista o cuadricula

---

## Ejemplo 2: Carrito de Compras o localStorage con Arrays

Tiempo estimado: 20-25 minutos

### Concepto

localStorage solo puede guardar strings o texto. Para guardar arrays u objetos necesitamos:

1. JSON.stringify() convierte un objeto o array JavaScript a string JSON
2. JSON.parse() convierte un string JSON de vuelta a objeto o array JavaScript

Ejemplo:
```javascript
const productos = ['Manzana', 'Pan', 'Leche'];

// guardar array
localStorage.setItem('carrito', JSON.stringify(productos));

// guarda: '["Manzana","Pan","Leche"]' o string

// leer array
const carritoString = localStorage.getItem('carrito');
const carritoArray = JSON.parse(carritoString);

// ['Manzana', 'Pan', 'Leche'] o array real
console.log(carritoArray);
```

### Contexto: Por que necesitamos persistir arrays?

Imagina un e-commerce donde el usuario agrega productos al carrito.

Problema sin persistencia:
1. Usuario busca productos por 20 minutos
2. Usuario agrega 5 productos al carrito con total de $500
3. Usuario va a buscar su tarjeta de credito
4. Mientras tanto su hijo cierra el navegador por accidente
5. Usuario vuelve a abrir el navegador
6. boom: Carrito vacio y perdio todo
7. Usuario frustrado abandona la compra

Estadisticas reales de e-commerce:
- 70% de carritos de compra son abandonados
- Perdida de datos es una causa principal
- Persistir el carrito puede aumentar conversiones en 30%
- Amazon guarda tu carrito incluso si no tienes cuenta

Otros escenarios donde se pierde informacion:
- Lista de reproduccion que estas armando en Spotify
- Productos marcados para comparar en MercadoLibre
- Historial de busquedas recientes
- Lista de favoritos

Opcion 1 usar solo state sin persistir:
```jsx
const [cart, setCart] = useState([]);

// usuario agrega productos → Recarga con F5 → Cart = [] o vacio
```

Problemas:
- El state solo vive en memoria
- Cualquier recarga borra todo
- Usuario pierde su trabajo

Opcion 2 pedir al usuario que inicie sesion obligatorio:
```
Usuario sin cuenta → Quiere agregar al carrito → "Debes crear cuenta"
→ Usuario se va a la competencia
```

Problemas:
- Friccion innecesaria
- Pierdes ventas
- Competencia permite agregar sin cuenta

Solucion con localStorage:
Guardar el carrito localmente permite que el usuario agregue productos sin crear cuenta y no pierda nada al recargar. Experiencia fluida.

### Comparacion: antes vs despues

### Pasos de lo que vamos a hacer

1. Crear ShoppingCartBasic.js con carrito que no persiste
2. Agregar productos y ver como se pierden al recargar
3. Crear ShoppingCartPersistent.js con carrito que si persiste
4. Agregar productos y ver como se mantienen al recargar
5. Entender JSON.stringify y JSON.parse

#### antes: sin persistencia o carrito se pierde

Paso 1: Crea src/components/ShoppingCartBasic.js para ver que pasa sin localStorage:

```jsx
import React, { useState } from 'react';

// este carrito no guarda los productos
function ShoppingCartBasic() {
  // estado inicial siempre es array vacio []
  const [cart, setCart] = useState([]);

  const productosDisponibles = [
    { id: 1, nombre: 'Laptop', precio: 800 },
    { id: 2, nombre: 'Mouse', precio: 20 },
    { id: 3, nombre: 'Teclado', precio: 50 },
    { id: 4, nombre: 'Monitor', precio: 300 }
  ];

  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...cart, producto];
    setCart(nuevoCarrito);
    console.log('Producto agregado sin persistencia:', producto.nombre);
    console.log('Carrito actual:', nuevoCarrito);

    // veras el producto en consola pero se pierde al recargar
  };

  const eliminarDelCarrito = (index) => {
    const productoEliminado = cart[index];
    const nuevoCarrito = cart.filter((_, i) => i !== index);
    setCart(nuevoCarrito);
    console.log('Producto eliminado sin persistencia:', productoEliminado.nombre);
  };

  const calcularTotal = () => {
    return cart.reduce((total, producto) => total + producto.precio, 0);
  };

  return (
    <div style={{
      border: '3px solid red',
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '8px',
      backgroundColor: '#ffe6e6'
    }}>
      <h2>Carrito Basico sin Persistencia</h2>
      <p style={{color: 'red', fontWeight: 'bold'}}>
        problema: Si recargas con F5 pierdes todos los productos
      </p>

      <div style={{ marginBottom: '20px' }}>
        <h3>Productos Disponibles</h3>
        {productosDisponibles.map(producto => (
          <div key={producto.id} style={{
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '5px'
          }}>
            <span>{producto.nombre} - ${producto.precio}</span>
            <button
              onClick={() => agregarAlCarrito(producto)}
              style={{
                padding: '5px 15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3>Tu Carrito ({cart.length} productos)</h3>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            {cart.map((producto, index) => (
              <div key={index} style={{
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: '#fff3cd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '5px'
              }}>
                <span>{producto.nombre} - ${producto.precio}</span>
                <button
                  onClick={() => eliminarDelCarrito(index)}
                  style={{
                    padding: '5px 15px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))}
            <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>
              Total: ${calcularTotal()}
            </div>
          </>
        )}
      </div>
      
      <p style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
        Abre la consola (F12) para ver los logs de productos agregados.
      </p>
    </div>
  );
}

export default ShoppingCartBasic;
```

#### Ahora vamos a verlo en acción

Actualiza tu `src/App.js`:

```jsx
import React from 'react';
import ShoppingCartBasic from './components/ShoppingCartBasic';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Carrito de Compras - Sin Persistencia</h1>
      <ShoppingCartBasic />
    </div>
  );
}

export default App;
```

**Guarda el archivo (Ctrl+S) y observa en el navegador:**

1. Verás la lista de 4 productos disponibles
2. Abre la consola del navegador (F12)
3. Haz clic en "Agregar" para Laptop ($800)
4. Verás en consola: "Producto agregado (SIN persistencia): Laptop"
5. Haz clic en "Agregar" para Mouse ($20)
6. Haz clic en "Agregar" para Teclado ($50)
7. Verás "Tu Carrito (3 productos)" y "Total: $870"
8. En consola verás el array completo con los 3 productos
9. Ahora recarga la página (F5)
10. **PROBLEMA**: El carrito está vacío de nuevo, se perdieron los 3 productos

**¿Por qué NO persiste?**
- `cart` está en el state (solo en memoria)
- Cuando recargas, React reinicia todo
- `useState([])` siempre empieza con array vacío
- No hay forma de recuperar los productos anteriores

**Ahora que viste el problema, continuemos con la solución...**

#### DESPUÉS: Con Persistencia (Carrito se mantiene)

Paso 2: Ahora crea src/components/ShoppingCartPersistent.js con localStorage:

Que vamos a hacer?
Usar localStorage con JSON.stringify y parse para guardar el array de productos.

```jsx
import React, { useState, useEffect } from 'react';

function ShoppingCartPersistent() {
  // paso 1: leer el carrito de localStorage al iniciar
  const [cart, setCart] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    console.log('Carrito leido de localStorage o string:', carritoGuardado);

    // si hay algo guardado convertirlo de JSON string a array
    if (carritoGuardado) {
      const carritoParseado = JSON.parse(carritoGuardado);
      console.log('Carrito parseado o array:', carritoParseado);
      return carritoParseado;
    }

    // si no hay nada guardado empezar con array vacio
    return [];
  });

  // paso 2: guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    // convertir el array a JSON string para guardarlo
    const carritoJSON = JSON.stringify(cart);
    localStorage.setItem('carrito', carritoJSON);
    console.log('Carrito guardado en localStorage:', carritoJSON);
  }, [cart]);

  const productosDisponibles = [
    { id: 1, nombre: 'Laptop', precio: 800 },
    { id: 2, nombre: 'Mouse', precio: 20 },
    { id: 3, nombre: 'Teclado', precio: 50 },
    { id: 4, nombre: 'Monitor', precio: 300 }
  ];

  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...cart, producto];

    // esto dispara el useEffect que guarda
    setCart(nuevoCarrito);
    console.log('Producto agregado con persistencia:', producto.nombre);
    console.log('Carrito actual:', nuevoCarrito);
  };

  const eliminarDelCarrito = (index) => {
    const productoEliminado = cart[index];
    const nuevoCarrito = cart.filter((_, i) => i !== index);
    setCart(nuevoCarrito);
    console.log('Producto eliminado (CON persistencia):', productoEliminado.nombre);
  };

  const vaciarCarrito = () => {
    setCart([]);
    console.log('Carrito vaciado');
  };

  const calcularTotal = () => {
    return cart.reduce((total, producto) => total + producto.precio, 0);
  };

  return (
    <div style={{ 
      border: '3px solid green', 
      padding: '20px', 
      marginBottom: '20px',
      borderRadius: '8px',
      backgroundColor: '#e6ffe6'
    }}>
      <h2>Carrito Persistente (CON localStorage)</h2>
      <p style={{color: 'green', fontWeight: 'bold'}}>
        SOLUCION: Recarga (F5) y los productos se mantienen
      </p>

      <div style={{ marginBottom: '20px' }}>
        <h3>Productos Disponibles</h3>
        {productosDisponibles.map(producto => (
          <div key={producto.id} style={{
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '5px'
          }}>
            <span>{producto.nombre} - ${producto.precio}</span>
            <button
              onClick={() => agregarAlCarrito(producto)}
              style={{
                padding: '5px 15px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3>Tu Carrito ({cart.length} productos)</h3>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            {cart.map((producto, index) => (
              <div key={index} style={{
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: '#d4edda',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '5px'
              }}>
                <span>{producto.nombre} - ${producto.precio}</span>
                <button
                  onClick={() => eliminarDelCarrito(index)}
                  style={{
                    padding: '5px 15px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))}
            <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>
              Total: ${calcularTotal()}
            </div>
            <button
              onClick={vaciarCarrito}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#ffc107',
                color: 'black',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Vaciar Carrito
            </button>
          </>
        )}
      </div>
      
      <p style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
        Abre la consola (F12) para ver cómo se guardan y leen los productos.
      </p>
    </div>
  );
}

export default ShoppingCartPersistent;
```

#### Ahora vamos a verlo en acción

Actualiza `src/App.js`:

```jsx
import React from 'react';
import ShoppingCartPersistent from './components/ShoppingCartPersistent';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Carrito de Compras - Con Persistencia</h1>
      <ShoppingCartPersistent />
    </div>
  );
}

export default App;
```

**Guarda el archivo (Ctrl+S) y observa en el navegador:**

1. Verás el carrito vacío inicialmente
2. Abre la consola (F12)
3. Verás: "Carrito leído de localStorage (string): null" (primera vez)
4. Agrega Laptop, Mouse y Teclado
5. En consola verás cada producto agregado:
   - "Producto agregado (CON persistencia): Laptop"
   - "Carrito guardado en localStorage: [{"id":1,"nombre":"Laptop","precio":800}]"
6. El carrito muestra "Tu Carrito (3 productos)" y "Total: $870"
7. Ahora recarga la página (F5)
8. **SOLUCION**: Los 3 productos siguen en el carrito
9. En consola verás:
   - "Carrito leído de localStorage (string): [{"id":1,...}]"
   - "Carrito parseado (array): [{...}, {...}, {...}]"

**¿Por qué SÍ persiste?**
- localStorage guarda el JSON string del array
- Al recargar, `useState(() => { ... })` lee de localStorage
- `JSON.parse()` convierte el string de vuelta a array
- El carrito se restaura exactamente como estaba

**Flujo completo:**
```
1. Primera carga → localStorage vacío → cart = []
2. Usuario agrega Laptop → setCart([{Laptop}]) → useEffect:
   - JSON.stringify([{Laptop}]) → '[{"id":1,"nombre":"Laptop",...}]'
   - localStorage.setItem('carrito', '...')
3. Usuario recarga (F5) → useState lee localStorage:
   - localStorage.getItem('carrito') → '[{"id":1,...}]'
   - JSON.parse('...') → [{Laptop}]
   - cart = [{Laptop}] ¡PERSISTE!
```

#### Entendiendo JSON.stringify y JSON.parse

**¿Por qué necesitamos esto?**

localStorage **solo guarda strings** (texto). Si intentas guardar un objeto o array directamente, JavaScript lo convierte mal:

```javascript
// INCORRECTO - NO HAGAS ESTO
const productos = [{nombre: 'Laptop'}, {nombre: 'Mouse'}];
localStorage.setItem('carrito', productos);
// localStorage guarda: "[object Object],[object Object]"
// Al leer: "[object Object],[object Object]" (INÚTIL, no puedes recuperar los datos)

// CORRECTO - USA JSON.stringify
localStorage.setItem('carrito', JSON.stringify(productos));
// localStorage guarda: '[{"nombre":"Laptop"},{"nombre":"Mouse"}]'
// Al leer y parsear: [{nombre:'Laptop'}, {nombre:'Mouse'}] (¡ÚTIL!)
```

**JSON.stringify() - Convierte JavaScript a String:**
```javascript
const obj = { nombre: 'Juan', edad: 25 };
const jsonString = JSON.stringify(obj);

console.log(jsonString);      // '{"nombre":"Juan","edad":25}'
console.log(typeof jsonString); // 'string'

// Ahora SÍ puedes guardarlo en localStorage
localStorage.setItem('usuario', jsonString);
```

**JSON.parse() - Convierte String a JavaScript:**
```javascript
const jsonString = '{"nombre":"Juan","edad":25}';
const obj = JSON.parse(jsonString);

console.log(obj);         // { nombre: 'Juan', edad: 25 }
console.log(typeof obj);  // 'object'
console.log(obj.nombre);  // 'Juan'
```

**Ejemplo con arrays:**
```javascript
const carrito = [
  { id: 1, nombre: 'Laptop', precio: 800 },
  { id: 2, nombre: 'Mouse', precio: 20 }
];

// Guardar
const carritoString = JSON.stringify(carrito);
localStorage.setItem('carrito', carritoString);

// Leer
const carritoRecuperado = localStorage.getItem('carrito');
const carritoArray = JSON.parse(carritoRecuperado);

console.log(carritoArray[0].nombre); // 'Laptop'
console.log(carritoArray[1].precio); // 20
```

#### Comparación Lado a Lado

**Paso 3:** Actualiza `src/App.js` para mostrar AMBOS componentes juntos:

```jsx
import React from 'react';
import ShoppingCartBasic from './components/ShoppingCartBasic';
import ShoppingCartPersistent from './components/ShoppingCartPersistent';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Comparación: Carrito Sin Persistencia vs Con Persistencia</h1>

      <ShoppingCartBasic />
      <ShoppingCartPersistent />

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <h3>Experimento:</h3>
        <ol>
          <li>Agrega 3 productos a AMBOS carritos</li>
          <li>Observa que ambos muestran los productos y el total</li>
          <li>Recarga la página (F5)</li>
          <li>Observa: El carrito ROJO (básico) se vació completamente</li>
          <li>Observa: El carrito VERDE (persistente) mantiene los 3 productos</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
```

Guarda con Ctrl+S y realiza el experimento.

### Tabla Comparativa

| Caracteristica | Sin localStorage | Con localStorage y JSON |
|----------------|------------------|-------------------------|
| Recarga con F5 | Carrito se vacia | Carrito se mantiene |
| Cerrar navegador | Carrito se vacia | Carrito se mantiene |
| Tipo de datos guardados | Solo en memoria o RAM | En disco duro del navegador |
| Conversion necesaria | No | JSON.stringify y parse |
| Cantidad de datos | Limitado por memoria | ~5-10MB |
| Experiencia usuario | Frustrante pierdes todo | Profesional como Amazon |
| Casos de uso | Prototipos simples | E-commerce real |

### Conclusion del Ejemplo 2

Persistir arrays y objetos con localStorage es esencial para aplicaciones reales. La combinacion de JSON.stringify y parse permite guardar estructuras complejas.

Casos de uso reales:
- Carritos de compra como Amazon, MercadoLibre, AliExpress
- Lista de favoritos como Netflix, Spotify, YouTube
- Historial de busquedas como Google
- Borradores de formularios largos
- Configuraciones de usuario

---

## Ejemplo 3: sessionStorage vs localStorage o Comparacion

Tiempo estimado: 15 minutos

### Concepto

JavaScript ofrece dos APIs de almacenamiento muy similares:

localStorage:
- Datos persisten para siempre hasta que el usuario los borre manualmente
- Compartido entre todas las pestañas del mismo dominio
- Capacidad: ~5-10MB
- Se mantiene al cerrar el navegador

sessionStorage:
- Datos persisten solo durante la sesion actual
- independiente para cada pestaña
- Se borra al cerrar la pestaña
- Capacidad: ~5-10MB
- Mas seguro para datos sensibles

API identica:
```javascript
// localStorage
localStorage.setItem('clave', 'valor');
const valor = localStorage.getItem('clave');

// sessionStorage con misma sintaxis exacta
sessionStorage.setItem('clave', 'valor');
const valor2 = sessionStorage.getItem('clave');
```

### Contexto: Cuando usar cada uno?

Problema de seguridad con localStorage:

Imagina un sitio de banco que guarda el token de sesion en localStorage:

```javascript
localStorage.setItem('bankToken', 'abc123xyz');
```

Problemas:
- Usuario cierra navegador y token sigue ahi
- Otra persona abre el navegador y puede acceder a la sesion bancaria
- Token persiste dias, semanas o meses
- Riesgo de seguridad alto

Solucion con sessionStorage:

```javascript
sessionStorage.setItem('bankToken', 'abc123xyz');
```

Ventajas:
- Usuario cierra pestaña y token se borra automaticamente
- Cada pestaña tiene su propia sesion
- Mas seguro para datos sensibles

Usar localStorage cuando:
- Preferencias de usuario como tema o idioma
- Datos que el usuario quiere conservar
- Carrito de compras
- Lista de favoritos
- Configuraciones no sensibles

Usar sessionStorage cuando:
- Datos temporales de un flujo (wizard multi-paso)
- Información sensible (tokens, sesiones bancarias)
- Estado de filtros que NO debe persistir
- Formularios temporales que NO deben guardarse
- Datos que NO deben compartirse entre pestañas

**Ejemplo real - Banco online:**
- localStorage: Recordar número de cuenta (no sensible)
- sessionStorage: Token de sesión (sensible, borrar al cerrar)

**Ejemplo real - E-commerce:**
- localStorage: Carrito de compras (queremos que persista)
- sessionStorage: Paso actual del checkout (temporal, no persistir)

### Comparación: localStorage vs sessionStorage

### Pasos de lo que vamos a hacer

1. Crear `StorageComparison.js` con DOS contadores lado a lado
2. Uno usa localStorage, otro sessionStorage
3. Experimentar con recargas (F5)
4. Experimentar con abrir nueva pestaña
5. Experimentar con cerrar navegador
6. Ver las diferencias claramente

#### Componente: StorageComparison.js

Crea `src/components/StorageComparison.js`:

```jsx
import React, { useState, useEffect } from 'react';

function StorageComparison() {
  // Contador 1: usa localStorage (persiste para siempre)
  const [countLocal, setCountLocal] = useState(() => {
    const saved = localStorage.getItem('countLocal');
    console.log('localStorage leído:', saved);
    return saved ? parseInt(saved) : 0;
  });

  // Contador 2: usa sessionStorage (persiste solo en esta sesión)
  const [countSession, setCountSession] = useState(() => {
    const saved = sessionStorage.getItem('countSession');
    console.log('sessionStorage leído:', saved);
    return saved ? parseInt(saved) : 0;
  });

  // Guardar countLocal en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('countLocal', countLocal);
    console.log('localStorage guardado:', countLocal);
  }, [countLocal]);

  // Guardar countSession en sessionStorage cada vez que cambia
  useEffect(() => {
    sessionStorage.setItem('countSession', countSession);
    console.log('sessionStorage guardado:', countSession);
  }, [countSession]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Comparación: localStorage vs sessionStorage</h1>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>

        {/* Contador con localStorage */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          border: '3px solid blue',
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px'
        }}>
          <h2>Contador con localStorage</h2>
          <p style={{fontSize: '14px', color: '#555'}}>
            Persiste PARA SIEMPRE (hasta borrar manualmente)
          </p>
          <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px 0' }}>
            {countLocal}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCountLocal(countLocal + 1)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              + Incrementar
            </button>
            <button
              onClick={() => setCountLocal(0)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Reiniciar
            </button>
          </div>
        </div>

        {/* Contador con sessionStorage */}
        <div style={{
          flex: '1',
          minWidth: '300px',
          border: '3px solid orange',
          padding: '20px',
          backgroundColor: '#fff3e0',
          borderRadius: '8px'
        }}>
          <h2>Contador con sessionStorage</h2>
          <p style={{fontSize: '14px', color: '#555'}}>
            Persiste SOLO en esta sesión (se borra al cerrar pestaña)
          </p>
          <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '20px 0' }}>
            {countSession}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCountSession(countSession + 1)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff9800',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              + Incrementar
            </button>
            <button
              onClick={() => setCountSession(0)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Reiniciar
            </button>
          </div>
        </div>

      </div>

      {/* Instrucciones de experimentos */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <h3>Experimentos para realizar:</h3>
        <ol style={{lineHeight: '2'}}>
          <li>
            <strong>Experimento 1 - Recarga (F5):</strong>
            <ul>
              <li>Incrementa ambos contadores a 5</li>
              <li>Recarga la página (F5 o Ctrl+R)</li>
              <li><strong>RESULTADO:</strong> Ambos mantienen el valor 5</li>
              <li><strong>RAZÓN:</strong> Recargar NO cierra la pestaña</li>
            </ul>
          </li>
          <li>
            <strong>Experimento 2 - Nueva pestaña (Ctrl+T):</strong>
            <ul>
              <li>Incrementa ambos contadores a 10</li>
              <li>Abre una NUEVA pestaña (Ctrl+T)</li>
              <li>Ve a localhost:3000 en la nueva pestaña</li>
              <li><strong>RESULTADO:</strong> localStorage muestra 10, sessionStorage muestra 0</li>
              <li><strong>RAZÓN:</strong> sessionStorage es INDEPENDIENTE por pestaña</li>
            </ul>
          </li>
          <li>
            <strong>Experimento 3 - Cerrar y reabrir navegador:</strong>
            <ul>
              <li>Incrementa ambos contadores a 15</li>
              <li>Cierra COMPLETAMENTE el navegador (todas las ventanas)</li>
              <li>Vuelve a abrir el navegador</li>
              <li>Ve a localhost:3000</li>
              <li><strong>RESULTADO:</strong> localStorage muestra 15, sessionStorage muestra 0</li>
              <li><strong>RAZÓN:</strong> sessionStorage se borra al cerrar la pestaña</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default StorageComparison;
```

#### Ahora vamos a verlo en acción

Actualiza `src/App.js`:

```jsx
import React from 'react';
import StorageComparison from './components/StorageComparison';

function App() {
  return (
    <div>
      <StorageComparison />
    </div>
  );
}

export default App;
```

**Guarda (Ctrl+S) y realiza los 3 experimentos descritos.**

### Tabla Comparativa: localStorage vs sessionStorage

| Característica | localStorage | sessionStorage |
|----------------|--------------|----------------|
| Duración | Permanente (hasta borrar manualmente) | Solo durante la sesión actual |
| Cerrar pestaña | Datos se mantienen | Datos se borran |
| Cerrar navegador | Datos se mantienen | Datos se borran |
| Nueva pestaña | Datos compartidos entre pestañas | Cada pestaña tiene su propia copia |
| Recarga (F5) | Datos se mantienen | Datos se mantienen |
| Capacidad | ~5-10MB | ~5-10MB |
| API | Idéntica | Idéntica |
| Seguridad | Menos seguro (persiste indefinidamente) | Más seguro (temporal) |
| Casos de uso | Preferencias, carrito, favoritos | Tokens, sesiones, datos temporales |

### Conclusion del Ejemplo 3

Regla general:

- localStorage: Datos que el usuario quiere que persistan
- sessionStorage: Datos temporales que no deben persistir

Seguridad:

- nunca guardes contraseñas en ninguno de los dos
- Para tokens sensibles prefiere sessionStorage
- Ambos son accesibles desde JavaScript o vulnerable a XSS
- Para datos muy sensibles usa cookies HttpOnly o backend

---

## Resumen General: Persistencia en JavaScript

### Conceptos Clave Aprendidos

1. localStorage: Persistencia permanente en el navegador
2. sessionStorage: Persistencia temporal solo durante la sesion
3. JSON.stringify(): Convertir objetos y arrays a string para guardar
4. JSON.parse(): Convertir string JSON de vuelta a objeto o array
5. useEffect(): Hook para ejecutar codigo cuando cambia el estado
6. Inicializacion lazy: Funcion en useState para leer datos solo una vez

### Flujo Tipico de Persistencia

```javascript
// 1. leer de localStorage al iniciar o solo primera vez
const [data, setData] = useState(() => {
  const saved = localStorage.getItem('miDato');
  return saved ? JSON.parse(saved) : valorInicial;
});

// 2. guardar en localStorage cada vez que cambia
useEffect(() => {
  localStorage.setItem('miDato', JSON.stringify(data));
}, [data]);

// 3. actualizar estado normalmente
const actualizar = () => {
  // esto automaticamente dispara el useEffect
  setData(nuevoValor);
};
```

---

## Recursos Adicionales

### Documentacion Oficial
- [MDN - Web Storage API](https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API)
- [MDN - localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [MDN - sessionStorage](https://developer.mozilla.org/es/docs/Web/API/Window/sessionStorage)
- [MDN - JSON](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON)

### Herramientas DevTools
- Chrome DevTools: F12 y luego Application y luego Storage
- Firefox DevTools: F12 y luego Storage Inspector
- Ambos permiten ver, editar y borrar datos manualmente

---

# Deployment Local - Ejecutar y Probar tu Aplicacion

En este archivo vas a aprender como ejecutar tu aplicacion React en desarrollo local, como hacer debugging y como solucionar problemas comunes.

## Paso 1: Ejecutar la Aplicacion

### Comando Principal

Para iniciar tu aplicacion en modo desarrollo:

```bash
npm start
```

### Que sucede cuando ejecutas npm start?

1. **Se inicia el servidor de desarrollo** en el puerto 3000
2. **Se abre automaticamente** tu navegador en http://localhost:3000
3. **Hot Reload** esta activado - los cambios se reflejan automaticamente
4. **ESLint** verifica tu codigo en tiempo real
5. **Source Maps** estan habilitados para debugging

### Salida esperada en la terminal:

```
Compiled successfully!

You can now view my-ecommerce-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.100:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled with 0 errors and 0 warnings
```

## Paso 2: Verificar que Todo Funciona

### Checklist de Funcionalidad

Cuando abras http://localhost:3000, deberias ver:

#### **Navbar**
- Se muestra en la parte superior
- Es de color oscuro con texto blanco
- En mobile se muestra el boton hamburguesa
- Los enlaces cambian de color al pasar el mouse

#### **Titulo Principal**
- "Bienvenido a Mi E-Commerce" aparece centrado
- Subtitulo se muestra debajo

#### **Lista de Productos**
- Se muestran 6 productos en tarjetas
- En desktop: 3 columnas
- En tablet: 2 columnas
- En mobile: 1 columna
- Botones "Agregar al Carrito" funcionan (muestran alerta)

#### **Formulario de Registro**
- Todos los campos son editables
- Validacion funciona (proba enviar vacio)
- Checkbox es requerido
- Mensaje de exito aparece al registrar

#### **Carrito de Compras**
- Muestra 3 items de ejemplo
- Calcula el total correctamente
- Boton "Proceder al Pago" muestra alerta

#### **Responsive Design**
- Achica la ventana y verifica que se adapta
- En mobile el formulario y carrito van uno bajo el otro

## Paso 3: Comandos de Desarrollo

### Comandos Disponibles

```bash
# Iniciar desarrollo
npm start

# Crear build de produccion
npm run build

# Ejecutar tests (cuando los agregues)
npm test

# Exponer la configuracion de webpack (cuidado!)
npm run eject
```

### Variables de Entorno

Puedes customizar la ejecucion con variables:

```bash
# Cambiar puerto
PORT=3001 npm start

# Abrir en navegador especifico
BROWSER=firefox npm start

# No abrir navegador automaticamente
BROWSER=none npm start

# Deshabilitar hot reload
FAST_REFRESH=false npm start
```

## Paso 4: Debugging y Herramientas

### Chrome DevTools

#### 1. **Inspeccionar Elementos**
- Click derecho > "Inspeccionar elemento"
- Puedes ver y modificar CSS en tiempo real
- Verifica que las clases de Bootstrap se aplican correctamente

#### 2. **Console**
- F12 > Console
- Aqui aparecen los `console.log()` de tu codigo
- Tambien se muestran errores de JavaScript

#### 3. **React Developer Tools**
Instala la extension de Chrome:
1. Ve a Chrome Web Store
2. Busca "React Developer Tools"
3. Instalala
4. Reinicia el navegador
5. Ahora tendras pestañas "Components" y "Profiler"

### VS Code Extensions Utiles

```
- ES7+ React/Redux/React-Native snippets
- Bracket Pair Colorizer 2
- Auto Rename Tag
- Prettier - Code formatter
- Thunder Client (para APIs futuras)
```

## Paso 5: Hot Reload en Accion

### Como Funciona?

Cuando cambias un archivo `.js` o `.css`, React automaticamente:

1. **Detecta el cambio**
2. **Recompila** solo lo necesario
3. **Actualiza el navegador** sin perder estado
4. **Preserva** los datos de formularios y estado

### Pruebalo:

1. **Abre** `src/components/ProductList.js`
2. **Cambia** el texto "Catalogo de Productos" por "Nuestros Productos"
3. **Guarda** el archivo (Ctrl+S)
4. **Observa** como el navegador se actualiza automaticamente

## Paso 6: Problemas Comunes y Soluciones

### Error: "Something is already running on port 3000"

**Causa**: Ya hay otra aplicacion usando el puerto 3000

**Solucion 1**: Cambiar puerto
```bash
PORT=3001 npm start
```

**Solucion 2**: Matar el proceso existente
```bash
# En Mac/Linux
lsof -ti:3000 | xargs kill -9

# En Windows
netstat -ano | findstr :3000
taskkill /PID <numero-del-pid> /F
```

### Error: "Module not found"

**Causa**: Archivo no encontrado o import incorrecto

**Ejemplo**:
```
Module not found: Can't resolve './components/navbar'
```

**Solucion**: Verificar:
- Nombre del archivo correcto: `Navbar.js` (con mayuscula)
- Import correcto: `import Navigation from './components/Navbar'`
- Archivo existe en la ubicacion correcta

### Error: "Unexpected token"

**Causa**: Error de sintaxis en JSX

**Ejemplo**:
```jsx
// Incorrecto
return (
  <div>
    <h1>Titulo</h1>
    <p>Parrafo</p>
  </div>
  // No se puede retornar multiples elementos
  <div>Otro div</div>  
);

// Correcto
return (
  <div>
    <div>
      <h1>Titulo</h1>
      <p>Parrafo</p>
    </div>
    <div>Otro div</div>
  </div>
);
```

### Error: "Failed to compile"

**Causa**: Error de sintaxis o imports

**Que hacer**:
1. **Lee el mensaje de error** completo
2. **Ve a la linea** indicada en el archivo mencionado
3. **Revisa la sintaxis** de esa linea y las anteriores
4. **Guarda** el archivo corregido

### Warning: "Each child in a list should have a unique key prop"

**Causa**: Falta key en elementos de lista

**Solucion**:
```jsx
// Incorrecto
{products.map(product => (
    // Falta key
    <div>{product.name}</div>  
))}

// Correcto
{products.map(product => (
    // Con key
    <div key={product.id}>{product.name}</div>
))}
```

## Paso 7: Performance y Optimizacion

### Verificar Rendimiento

#### 1. **Lighthouse (Chrome)**
- F12 > Lighthouse tab
- Click "Generate report"
- Revisa las metricas de Performance

#### 2. **React DevTools Profiler**
- F12 > Profiler tab
- Click record, interactua con la app, stop
- Ve que componentes se renderizan

### Tips para Mejor Performance

#### 1. **Imagenes Optimizadas**
```jsx
// En lugar de URLs largas, usa imagenes locales optimizadas
<img src="/images/product1-small.webp" alt="Producto" />
```

#### 2. **Lazy Loading** (Para despues)
```jsx
const LazyComponent = lazy(() => import('./components/HeavyComponent'));
```

#### 3. **Memoization** (Para despues)
```jsx
const ExpensiveComponent = memo(({ data }) => {
  // Componente costoso
});
```

## Paso 8: Preparar para Produccion

### Build de Produccion

```bash
npm run build
```

Esto crea:
- Carpeta `build/` con archivos optimizados
- JavaScript minificado
- CSS minificado
- Imagenes optimizadas

### Servir Build Localmente

```bash
# Instalar servidor estatico
npm install -g serve

# Servir el build
serve -s build
```

### Diferencias Development vs Production

| Aspecto | Development | Production |
|---------|-------------|------------|
| Tamaño | ~2MB        | ~200KB     |
| Velocidad | Lenta       | Rapida     |
| Hot Reload | si          | no         |
| Source Maps | si          | no         |
| Minification | no          | si         |
| Debugging | Facil       | Dificil    |

## Paso 9: Comandos Utiles de Debugging

### Limpiar Cache

```bash
# Limpiar cache de npm
npm clear cache --force

# Reinstalar node_modules
rm -rf node_modules package-lock.json
npm install
```

### Verificar Dependencias

```bash
# Ver todas las dependencias
npm list

# Ver dependencias outdated
npm outdated

# Auditar vulnerabilidades
npm audit
```

### Logs Detallados

```bash
# Ejecutar con logs verbose
npm start --verbose

# Ver solo errores
npm start --silent
```

## Proximos Pasos

Una vez que tengas tu aplicacion funcionando perfectamente en local, puedes continuar a [06-NEXT-STEPS.md](./06-NEXT-STEPS.md) para explorar mejoras y prepararte para deployment en AWS.

## Recursos para Debugging

- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Chrome DevTools Guide](https://developers.google.com/web/tools/chrome-devtools)
- [React Documentation](https://react.dev/learn/troubleshooting)
- [Create React App Troubleshooting](https://create-react-app.dev/docs/troubleshooting/)

## Contacto y Ayuda

Si encuentras problemas que no puedes resolver:
1. Lee el mensaje de error completo
2. Busca en Google el error exacto
3. Revisa Stack Overflow
4. Pregunta en el foro del curso

¡No te rindas! Debugging es parte normal del desarrollo.
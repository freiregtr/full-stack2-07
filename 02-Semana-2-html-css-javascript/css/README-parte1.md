# Tutorial Paso a Paso: Construye tu Portafolio Web Profesional - PARTE 1

Aprende css moderno construyendo un portafolio profesional desde cero. Esta es la primera parte donde crearemos la estructura basica y la navegacion.

## Lo que vas a construir en esta parte

En esta primera seccion construiremos:
- Estructura html basica
- Archivo css vinculado
- Header con navegacion profesional
- Logo y menu responsive

## Como usar este tutorial

1. Sigue los pasos en orden
2. Copia y pega el codigo cuando se indique
3. Prueba el resultado en tu navegador
4. Lee solo las explicacines de cada paso
5. No te adelantes, cada paso construye sobre el anterior

---

## PASO 1: Crear la estructura html basica

### Lo que vamos a hacer:
Crear un archivo html con la estructura minima necesaria para comenzar.

### Codigo html:
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Portafolio</title>
</head>
<body>
    <h1>¡Hola! Mi portafolio esta en construccion</h1>
</body>
</html>
```

### Explicacion:
- `<!DOCTYPE html>`: Le dice al navegador que estamos usando html5
- `<html lang="es">`: Elemento raiz, `lang="es"` indica que el contenido esta en espanol
- `<meta charset="UTF-8">`: Permite usar caracteres especiales como n, acentos
- `<meta name="viewport"...>`: Hace que el sitio se vea bien en moviles
- `<title>`: Lo que aparece en la pestana del navegador

### Resultado:
Una pagina web basica con un titulo simple.

---

## PASO 2: Vincular css al html

### Lo que vamos a hacer:
Crear un archivo css y conectarlo con nuestro html.

### Por que el css va en el `<head>`?

El archivo css debe ir en el `<head>` por estas razones importantes:

- **El `<head>` es la seccion de configuracion**: Contiene metadatos que el navegador necesita **antes** de mostrar la pagina
- **Carga temprana**: El navegador descarga el css **antes** de renderizar el html visible
- **Evita FOUC** (Flash of Unstyled Content): Sin css en `<head>`, verias un destello de pagina sin estilos
- **Mejor experiencia**: La pagina aparece ya estilizada desde el primer momento

Si pones el css en el `<body>`, la pagina se veria fea por unos segundos hasta que se carguen los estilos. En el `<head>` se carga primero y todo se ve perfecto desde el inicio.

### Codigo html (agregar en el `<head>`):
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Portafolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
```

### Codigo css (crear archivo `styles.css`):
```css
/* BLOQUE 1: Reset Universal - Eliminamos estilos por defecto del navegador
   - Usamos el selector universal (*) que afecta a TODOS los elementos de la pagina
   - Este selector tiene especificidad baja (0,0,0,1) pero afecta todo el documento
   - margin: 0 y padding: 0 eliminan los margenes y rellenos por defecto
   - box-sizing: border-box hace que el padding y border se incluyan en el ancho total */
* {
    margin: 0;          /* Elimina margenes por defecto de todos los elementos */
    padding: 0;         /* Elimina rellenos por defecto de todos los elementos */
    box-sizing: border-box;  /* Cambia el modelo de caja: width incluye padding y border */
}

/* BLOQUE 2: Estilos base del elemento body - Configuracion general de toda la pagina
   - El body es el contenedor principal de todo el contenido visible
   - Estos estilos se heredan por la mayoria de elementos hijos
   - Es el lugar ideal para definir fuentes, colores y espaciado base */
body {
    font-family: Arial, sans-serif;  /* Fuente: Arial, si no existe usa cualquier sans-serif */
    line-height: 1.6;                /* Espaciado entre lineas: 1.6 veces el tamano de fuente */
    color: #333;                      /* Color de texto: gris oscuro (#333) mas suave que negro */
    background-color: #f4f4f4;        /* Fondo: gris muy claro para contraste suave */
}

/* BLOQUE 3: Estilos para elementos h1 - Titulos principales
   - Selector de elemento: afecta a todos los h1 del documento
   - Centramos y damos color distintivo para crear jerarquia visual */
h1 {
    color: #2563eb;        /* Azul distintivo para destacar del texto normal */
    text-align: center;    /* Centrado horizontal del texto */
    padding: 50px 20px;    /* Espaciado: 50px arriba/abajo, 20px izquierda/derecha */
}
```

### Resultado:
Un titulo azul centrado sobre fondo gris claro.

---

## PASO 3: Crear el header y navegacion html

### Lo que vamos a hacer:
Agregar un header con logo y menu de navegacion.

### Codigo html (reemplazar el contenido del `<body>`):
```html
<body>
    <header class="header">
        <nav class="navigation">
            <div class="nav-container">
                <div class="logo">
                    <h1>Mi Portafolio</h1>
                </div>
                <ul class="nav-menu">
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#acerca">Acerca de</a></li>
                    <li><a href="#proyectos">Proyectos</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </div>
        </nav>
    </header>
    
    <main>
        <p>Aqui ira el contenido principal...</p>
    </main>
</body>
```

### Explicacion:
- `<header>`: Elemento semantico para el encabezado
- `<nav>`: Elemento semantico para navegacion
- `class="navigation"`: Clase css para aplicar estilos
- `<ul>` y `<li>`: Lista no ordenada para el menu
- `href="#inicio"`: Enlaces internos que apuntan a secciones de la pagina
- `<main>`: Elemento semantico para contenido principal

### Resultado:
Un header con logo y menu, pero sin estilos todavia.

---

## PASO 4: Estilos css para el header

### Lo que vamos a hacer:
Dar estilos profesionales al header usando flexbox.

### Por que usamos `rem` en lugar de `px`?

**px (pixeles)** = Tamano fijo
- `font-size: 18px` siempre sera 18 pixeles, sin importar nada

**rem** = Tamano relativo al tamano base del navegador
- `font-size: 1.8rem` = 1.8 veces el tamano base (normalmente 16px = 28.8px)
- Si el usuario hace zoom o cambia el tamano de fuente, se adapta automaticamente
- Mejor para accesibilidad y responsive design


### Codigo css (agregar al final de `styles.css`):
```css
/* BLOQUE 4: header y Navegacion - Barra fija en la parte superior
   - Usamos position: fixed para que se mantenga visible al hacer scroll
   - z-index alto (1000) para que aparezca sobre otros elementos
   - flexbox para organizar logo y menu horizontalmente */
.header {
    background-color: #ffffff;                 /* Fondo blanco limpio */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil para separar del contenido */
    position: fixed;    /* Se mantiene fijo al hacer scroll */
    top: 0;            /* Pegado a la parte superior */
    left: 0;           /* Pegado al lado izquierdo */
    right: 0;          /* Pegado al lado derecho (ancho completo) */
    z-index: 1000;     /* Aparece sobre otros elementos (mayor valor = mas al frente) */
}

/* BLOQUE 5: Contenedor de navegacion - Organiza logo y menu con flexbox
   - flexbox es ideal para alinear elementos horizontalmente
   - justify-content: space-between pone logo a la izquierda, menu a la derecha */
.nav-container {
    max-width: 1200px;              /* Ancho maximo para mantener legibilidad */
    margin: 0 auto;                 /* 0 = sin margen arriba/abajo, auto = centra horizontalmente */
    padding: 0 20px;                /* 0 = sin relleno arriba/abajo, 20px = espacio lateral */
    display: flex;                  /* Activa flexbox para layout horizontal */
    justify-content: space-between; /* Logo izquierda, menu derecha */
    align-items: center;            /* Centra verticalmente logo y menu */
    height: 70px;                   /* Altura fija del header */
}

/* LOGO DEL SITIO: Marca principal destacada */
.logo h1 {
    color: #2563eb;      /* Azul marca - color caracteristico del sitio */
    font-size: 1.8rem;   /* 1.8rem = 1.8 veces el tamano base - se adapta si usuario cambia zoom */
    margin: 0;           /* Sin margenes - control total del espaciado */
}

/* MENu DE NAVEGACIoN: Lista horizontal de enlaces principales */
.nav-menu {
    display: flex;       /* flexbox - convierte lista vertical en horizontal */
    list-style: none;    /* Sin bullets - diseno limpio sin puntos */
    gap: 30px;          /* 30px entre enlaces - espacio comodo para clickear */
    margin: 0;          /* Sin margenes - control total */
    padding: 0;         /* Sin rellenos - elimina espacios por defecto */
}

/* ENLACES DE NAVEGACIoN: Estado normal de los enlaces (antes del hover) */
.nav-menu a {
    text-decoration: none;        /* Sin subrayado - diseno limpio */
    color: #333;                  /* ESTADO NORMAL: gris oscuro para lectura comoda */
    font-weight: 500;             /* Semi-negrita - destaca pero no domina */
    transition: color 0.3s ease;  /* Transicion suave para cuando cambie a hover */
}

/* HOVER EN NAVEGACIoN: Feedback visual al pasar mouse */
.nav-menu a:hover {
    color: #2563eb;  /* Azul marca - consistente con color del logo */
}

/* AJUSTE ADICIONAL AL BODY: Como el header es fijo, agregamos padding para que no tape el contenido
   - Esto se SUMA al body ya definido en el PASO 2 (fuente, color, fondo)
   - CSS combina ambas definiciones automáticamente */
body {
    padding-top: 70px;              /* 70px = altura del header - evita que tape el contenido */
}

/* ESPACIADO DEL CONTENIDO PRINCIPAL: El main necesita respiro interno para que no se vea pegado a los bordes */
main {
    padding: 20px;  /* 20px en todos los lados - contenido comodo sin tocar bordes */
}
```

### Resultado:
Un header profesional fijo con logo y menu alineados horiozntalmente.

---

## Perfecto! Ya terminaste la parte 1

En esta primera parte has aprendido:

**Estructura HTML basica** - La base de toda pagina web
**Vinculacion de CSS** - Como conectar estilos con HTML
**Navegacion profesional** - Header fijo con logo y menu
**Flexbox basics** - Para alinear elementos horiozntalmente
**Selectores CSS** - Universal (*), elemento (h1), clase (.header)
**Box model** - Como funcionan margin, padding y box-sizing
**Responsive basics** - rem vs px para acesibilidad

## Que viene ahora

En la **PARTE 2** vamos a hacer:
- Crear la seccion hero con gradiente atractivo
- Agregar botones de llamada a la accion
- Hacer el diseno responsive para moviles
- Agregar la seccion "Acerca de" con estadisticas

**[Continuar con PARTE 2 →](README-parte2.md)**

---

## Codigo completo hasta este punto

### HTML completo (index.html):
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Portafolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <nav class="navigation">
            <div class="nav-container">
                <div class="logo">
                    <h1>Mi Portafolio</h1>
                </div>
                <ul class="nav-menu">
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#acerca">Acerca de</a></li>
                    <li><a href="#proyectos">Proyectos</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                </ul>
            </div>
        </nav>
    </header>
    
    <main>
        <p>Aqui ira el contenido principal...</p>
    </main>
</body>
</html>
```

### CSS completo (styles.css):
```css
/* BLOQUE 1: Reset Universal */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* BLOQUE 2: Estilos base del body */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

/* BLOQUE 3: Titulos h1 */
h1 {
    color: #2563eb;
    text-align: center;
    padding: 50px 20px;
}

/* BLOQUE 4: Header y navegacion */
.header {
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

/* BLOQUE 5: Contenedor de navegacion */
.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.logo h1 {
    color: #2563eb;
    font-size: 1.8rem;
    margin: 0;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 30px;
    margin: 0;
    padding: 0;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-menu a:hover {
    color: #2563eb;
}

body {
    padding-top: 70px;
}

main {
    padding: 20px;
}
```
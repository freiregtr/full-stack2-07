# Tutorial Paso a Paso: Construye tu Portafolio Web Profesional - PARTE 2

En esta segunda parte vamos a agregar la seccion hero con gradiente atractivo, hacer el diseno responsive y crear la seccion "Acerca de" con estadisticas.

## Codigo base que necesitas

Si ya hiciste la parte 1, perfecto, podes continuar. Si no, aca esta el codigo que necesitas para empezar esta seccion:

### HTML base (index.html):
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

### CSS base (styles.css):
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

---

## PASO 5: Crear la seccion hero html

### Lo que vamos a hacer:
Agregar una seccion principal (hero) con presentacion personal.

### Codigo html (reemplazar el `<main>`):
```html
<main>
    <section id="inicio" class="hero">
        <div class="hero-container">
            <h2 class="hero-title">Soy Desarrollador Web</h2>
            <p class="hero-subtitle">
                Creo sitios web modernos y funcionales que ayudan 
                a las empresas a crecer en el mundo digital.
            </p>
            <div class="hero-buttons">
                <a href="#proyectos" class="btn btn-primary">Ver Proyectos</a>
                <a href="#contacto" class="btn btn-secondary">Contactar</a>
            </div>
        </div>
    </section>
    
    <section id="acerca">
        <p>Aqui ira la seccion "Acerca de"...</p>
    </section>
</main>
```

### Explicacion:
- `id="inicio"`: Permite que el enlace del menu nos lleve aqui
- `class="hero"`: Clase para estilos de la seccion principal
- `<h2>`: Usamos h2 porque h1 ya esta en el logo
- `.hero-buttons`: Contenedor para botones de llamada a la accion
- `.btn`: Clases para estilos de botones

### Resultado:
Una seccion con titulo, descripcion y botones (sin estilos todavia).

---

## PASO 6: css para la seccion hero

### Lo que vamos a hacer:
Crear una seccion hero atractiva con gradiente y botones profesionales.

### IMPORTANTE: Copia todo el bloque completo
No copies selector por selector, copia TODO el bloque css de una vez. Si solo copias `.hero` y despues `.hero-container`, se va a perder el fondo porque trabajan juntos.

### Codigo css (agregar al final de `styles.css`):
```css
/* BLOQUE 6: Seccion hero - Esta es la primera impresion del sitio, debe capturar atencion inmediatamente y comunicar quien eres. Vamos a crear un fondo con gradiente atractivo, centrar todo el contenido perfectamente y hacer botones profesionales que inviten a la accion */

.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Gradiente diagonal azul a morado - crea impacto visual moderno */
    color: white;              /* Texto blanco - contrasta perfectamente con fondo oscuro del gradiente */
    min-height: 80vh;          /* 80% altura pantalla - sensacion de grandeza sin ocupar todo */
    display: flex;             /* flexbox - forma mas facil de centrar contenido vertical y horizontal */
    align-items: center;       /* Centra verticalmente - contenido en medio de la pantalla */
    justify-content: center;   /* Centra horizontalmente - contenido en el centro */
    text-align: center;        /* Centra texto dentro de elementos - armonia visual */
}

.hero-container {
    max-width: 1200px;  /* Limita ancho - lineas muy largas son dificiles de leer */
    padding: 0 20px;    /* Espacios laterales - no toca bordes en moviles */
}

.hero-title {
    font-size: 3rem;      /* 48px - grande para impactar sin abrumar */
    font-weight: 700;     /* Extra negrita - destaca sobre todo lo demas */
    margin-bottom: 20px;  /* Espacio calculado - separa de subtitulo sin romper unidad visual */
    line-height: 1.2;     /* Lineas juntas - en titulos grandes el espacio se ve excesivo */
}

.hero-subtitle {
    font-size: 1.3rem;     /* 20.8px - mas grande que normal para importancia */
    margin-bottom: 30px;   /* Espacio suficiente - separa de botones */
    opacity: 0.9;          /* Ligeramente transparente - jerarquia: titulo mas importante */
    max-width: 600px;      /* Limita ancho - lineas largas dificiles de leer */
    margin-left: auto;     /* Combinado con margin-right hace centrado automatico */
    margin-right: auto;    /* Combinado con margin-left hace centrado automatico */
}

.hero-buttons {
    display: flex;             /* flexbox - alinea botones horizontalmente */
    gap: 20px;                 /* 20px separacion - no se ven pegados */
    justify-content: center;   /* Centrados - posicion mas equilibrada visualmente */
    flex-wrap: wrap;          /* En moviles se apilan automaticamente */
}

/* SISTEMA DE BOTONES - Botones profesionales y usables para las acciones mas importantes */
.btn {
    display: inline-block;           /* Se comporta como boton pero puede ser enlace */
    padding: 12px 30px;             /* Padding calculado - facil de clickear (minimo 44px altura) */
    border-radius: 5px;             /* Esquinas redondeadas - look moderno sin exagerar */
    text-decoration: none;          /* Sin subrayado - botones no deben verse como enlaces */
    font-weight: 600;               /* Semi-negrita - texto destaca y es legible */
    transition: all 0.3s ease;      /* Transicion suave - cambios se ven profesionales */
    border: 2px solid transparent;  /* Borde transparente - lo usaremos en efectos hover */
}

.btn-primary {
    background-color: #ffffff;  /* Fondo blanco - destaca perfectamente sobre gradiente */
    color: #2563eb;            /* Azul marca - consistencia con color principal */
}

.btn-primary:hover {
    background-color: transparent;  /* Se vuelve transparente - muestra gradiente */
    color: #ffffff;                /* Texto blanco - contrasta con gradiente */
    border-color: #ffffff;         /* Borde blanco - mantiene forma del boton */
}

.btn-secondary {
    background-color: transparent;  /* Sin fondo - menos prominencia visual */
    color: #ffffff;                /* Texto blanco - contrasta con fondo oscuro */
    border-color: #ffffff;         /* Borde blanco - define limites del boton */
}

.btn-secondary:hover {
    background-color: #ffffff;  /* Se llena blanco - feedback visual de interaccion */
    color: #2563eb;            /* Texto azul - mantiene contraste */
}

```

### Resultado:
Una seccion hero impactante con fondo degradado y botones interactivos.

---

## PASO 7: Hacer el diseno responsive

### Lo que vamos a hacer:
Ajustar los estilos para que se vean bien en moviles y tablets.

### Codigo css (agregar al final de `styles.css`):
```css
/* BLOQUE 9: responsive Design - Adaptacion a pantallas moviles y tablets
   - @media query se activa cuando la pantalla es menor a 768px
   - Cambiamos layouts de horizontal a vertical para mejor usabilidad en moviles
   - Reducimos tamanos de fuente para que el contenido quepa mejor */
@media (max-width: 768px) {
    /* NAVEGACIoN MoVIL: Cambiamos de layout horizontal a vertical */
    .nav-container {
        flex-direction: column;  /* Logo arriba, menu abajo (en lugar de lado a lado) */
        height: auto;           /* Altura automatica (no fija) para acomodar contenido vertical */
        padding: 15px 20px;     /* Menos espaciado interno para ahorrar espacio */
    }
    
    /* MENu MoVIL: Centramos y ajustamos espaciado */
    .nav-menu {
        margin-top: 15px;         /* Espacio entre logo y menu */
        flex-wrap: wrap;          /* Permite que los enlaces se acomoden en varias lineas */
        justify-content: center;  /* Centra los enlaces del menu */
        gap: 20px;               /* Reduce el espacio entre enlaces (era 30px en desktop) */
    }
    
    /* TiTULO HERO MoVIL: Reducimos tamano para que no sea abrumador en pantallas pequenas */
    .hero-title {
        font-size: 2.2rem;  /* Mas pequeno que desktop (3rem) pero aun impactante */
    }
    
    .hero-subtitle {
        font-size: 1.1rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 200px;
        text-align: center;
    }
    
    body {
        padding-top: 120px;
    }
}

@media (max-width: 480px) {
    .nav-container {
        padding: 10px 15px;
    }
    
    .hero-title {
        font-size: 1.8rem;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .hero-container {
        padding: 0 15px;
    }
}
```

### Explicacion:
- `@media (max-width: 768px)`: Estilos que se aplican en pantallas menores a 768px (tablets y moviles)
- `flex-direction: column`: Cambia el menu de horizontal a vertical
- `flex-wrap: wrap`: Permite que elementos salten de linea
- `width: 200px` en botones: Los hace del mismo ancho en movil
- Reducimos tamanos de fuente para moviles
- Ajustamos el padding del body por el header mas alto en movil

### Resultado:
Un diseno que se adapta perfectamnte a diferentes tamanos de pantalla.

---

## PASO 8: Agregar seccion "Acerca de"

### Lo que vamos a hacer:
Crear una seccion con informacion personal y estadisticas.

### Codigo html (reemplazar la seccion `#acerca`):
```html
<section id="acerca" class="about">
    <div class="container">
        <h2 class="section-title">Acerca de Mi</h2>
        <div class="about-content">
            <div class="about-text">
                <p>Soy desarrollador web con 3+ anos de experiencia creando 
                sitios modernos y funcionales. Me especializo en html, css, 
                javascript y React.</p>
                <p>Mi pasion es crear experiencias digitales que no solo 
                se vean bien, sino que tambien resuelvan problemas reales 
                de usuarios y empresas.</p>
            </div>
            <div class="about-stats">
                <div class="stat">
                    <h3>25+</h3>
                    <p>Proyectos Completados</p>
                </div>
                <div class="stat">
                    <h3>3+</h3>
                    <p>Anos de Experiencia</p>
                </div>
                <div class="stat">
                    <h3>15+</h3>
                    <p>Clientes Felices</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

### Codigo css (agregar al final):
```css
/* BLOQUE 10: Estilos generales para secciones - Clases reutilizables para consistencia
   - .container: Patron comun para centrar y limitar ancho del contenido
   - .section-title: Estilo consistente para todos los titulos de seccion */
.container {
    max-width: 1200px;  /* Ancho maximo para mantener legibilidad en pantallas grandes */
    margin: 0 auto;     /* Centra horizontalmente (auto calcula margenes iguales) */
    padding: 0 20px;    /* Espacios laterales para que no toque bordes en moviles */
}

/* TiTULO DE SECCIoN: Estilo consistente para h2 principales de cada seccion */
.section-title {
    text-align: center;    /* Centrado para dar importancia y equilibrio visual */
    font-size: 2.5rem;     /* Grande para jerarquia, pero menos que el hero title (3rem) */
    margin-bottom: 50px;
    color: #2563eb;
}

/* Seccion Acerca de */
.about {
    padding: 80px 0;
    background-color: #f8f9fa;
}

.about-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 50px;
    align-items: center;
}

.about-text {
    font-size: 1.1rem;
    line-height: 1.8;
}

.about-text p {
    margin-bottom: 20px;
}

.about-stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
}

.stat {
    text-align: center;
    padding: 30px 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.stat h3 {
    font-size: 2.5rem;
    color: #2563eb;
    margin-bottom: 10px;
}

.stat p {
    color: #666;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .about-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    
    .about-stats {
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
    
    .stat {
        padding: 20px 10px;
    }
}
```

### Resultado:
Seccion "Acerca de" con texto informativo y estadisticas visualmente atractivas.

---

## Listo! Terminaste la parte 2

En esta seccion aprendiste:

**Seccion Hero con gradiente** - Impacto visual inmdiato
**Sistema de botones** - Llamadas a la accion profesionales
**Responsive design** - Adaptacion a moviles y tablets
**CSS Grid** - Layouts bidimensionales para contenido complejo
**Seccion "Acerca de"** - Estadisticas y credibilidad profesional
**Clases reutilizables** - .container y .section-title para consistencia
**Efectos hover** - Interactividad y feedback visual

## Que viene ahora

En la **PARTE 3** vamos a hacer:
- Galeria de proyectos con efectos hover
- Formulario de contacto funcional y atractibo
- Footer con enlaces
- Animaciones suaves y scroll behavior
- Toques finales

**[Continuar con PARTE 3](README-parte3.md)**

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
        <section id="inicio" class="hero">
            <div class="hero-container">
                <h2 class="hero-title">Soy Desarrollador Web</h2>
                <p class="hero-subtitle">
                    Creo sitios web modernos y funcionales que ayudan 
                    a las empresas a crecer en el mundo digital.
                </p>
                <div class="hero-buttons">
                    <a href="#proyectos" class="btn btn-primary">Ver Proyectos</a>
                    <a href="#contacto" class="btn btn-secondary">Contactar</a>
                </div>
            </div>
        </section>
        
        <section id="acerca" class="about">
            <div class="container">
                <h2 class="section-title">Acerca de Mi</h2>
                <div class="about-content">
                    <div class="about-text">
                        <p>Soy desarrollador web con 3+ anos de experiencia creando 
                        sitios modernos y funcionales. Me especializo en html, css, 
                        javascript y React.</p>
                        <p>Mi pasion es crear experiencias digitales que no solo 
                        se vean bien, sino que tambien resuelvan problemas reales 
                        de usuarios y empresas.</p>
                    </div>
                    <div class="about-stats">
                        <div class="stat">
                            <h3>25+</h3>
                            <p>Proyectos Completados</p>
                        </div>
                        <div class="stat">
                            <h3>3+</h3>
                            <p>Anos de Experiencia</p>
                        </div>
                        <div class="stat">
                            <h3>15+</h3>
                            <p>Clientes Felices</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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

/* BLOQUE 6: Seccion hero */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.hero-container {
    max-width: 1200px;
    padding: 0 20px;
}

.hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
}

.hero-subtitle {
    font-size: 1.3rem;
    margin-bottom: 30px;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

/* Sistema de botones */
.btn {
    display: inline-block;
    padding: 12px 30px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.btn-primary {
    background-color: #ffffff;
    color: #2563eb;
}

.btn-primary:hover {
    background-color: transparent;
    color: #ffffff;
    border-color: #ffffff;
}

.btn-secondary {
    background-color: transparent;
    color: #ffffff;
    border-color: #ffffff;
}

.btn-secondary:hover {
    background-color: #ffffff;
    color: #2563eb;
}

/* BLOQUE 9: Responsive Design */
@media (max-width: 768px) {
    .nav-container {
        flex-direction: column;
        height: auto;
        padding: 15px 20px;
    }
    
    .nav-menu {
        margin-top: 15px;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }
    
    .hero-title {
        font-size: 2.2rem;
    }
    
    .hero-subtitle {
        font-size: 1.1rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 200px;
        text-align: center;
    }
    
    body {
        padding-top: 120px;
    }
}

@media (max-width: 480px) {
    .nav-container {
        padding: 10px 15px;
    }
    
    .hero-title {
        font-size: 1.8rem;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .hero-container {
        padding: 0 15px;
    }
}

/* BLOQUE 10: Estilos generales para secciones */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 50px;
    color: #2563eb;
}

/* Seccion Acerca de */
.about {
    padding: 80px 0;
    background-color: #f8f9fa;
}

.about-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 50px;
    align-items: center;
}

.about-text {
    font-size: 1.1rem;
    line-height: 1.8;
}

.about-text p {
    margin-bottom: 20px;
}

.about-stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
}

.stat {
    text-align: center;
    padding: 30px 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.stat h3 {
    font-size: 2.5rem;
    color: #2563eb;
    margin-bottom: 10px;
}

.stat p {
    color: #666;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .about-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    
    .about-stats {
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
    
    .stat {
        padding: 20px 10px;
    }
}
```
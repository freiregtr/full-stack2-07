# Semana 5: React con Bootstrap - Proyecto E-commerce

## Bienvenido al Modulo de React

En esta semana vas a aprender a crear una aplicacion completa de e-commerce usando React y Bootstrap. Este proyecto te permitira entender los conceptos fundamentales de React mientras construyes una interfaz moderna y funcional.

## Que vamos a construir?

Una aplicacion de tienda online con:
- Navegacion responsiva
- Catalogo de productos
- Carrito de compras funcional
- Formulario de registro de usuarios
- Diseño completamente responsive

## Estructura de la documentacion

Esta guia esta organizada en varios archivos para que sea mas facil de seguir:

### 1. [02-SETUP.md](./02-SETUP.md) - Configuracion Inicial
Comienza aqui para:
- Instalar todas las herramientas necesarias
- Crear tu proyecto React
- Configurar React Bootstrap
- Preparar la estructura de carpetas

### 2. [03-COMPONENTS.md](./03-COMPONENTS.md) - Componentes React
Aprende a crear cada componente paso a paso:
- **Navbar** - Barra de navegacion responsive
- **ProductList** - Catalogo de productos con cards
- **ShoppingCart** - Carrito con calculos automaticos
- **RegistrationForm** - Formulario con validacion

### 3. [04-INTEGRATION.md](./04-INTEGRATION.md) - Integracion y Layout
Como unir todo:
- Configurar App.js principal
- Usar el sistema de Grid de Bootstrap
- Manejar el flujo de datos entre componentes

### 4. [05-DEPLOYMENT-LOCAL.md](./05-DEPLOYMENT-LOCAL.md) - Ejecutar Localmente
Para probar tu aplicacion:
- Comandos de desarrollo
- Solucion de problemas comunes
- Tips para debugging

### 5. [06-NEXT-STEPS.md](./06-NEXT-STEPS.md) - Proximos Pasos
Que hacer despues:
- Mejoras sugeridas para el proyecto
- Preparacion para deployment en AWS
- Introduccion a testing

## Objetivos de Aprendizaje

Al finalizar este modulo deberas ser capaz de:

- Crear una aplicacion React desde cero
- Implementar componentes reutilizables
- Usar React Bootstrap para diseño responsive
- Manejar estado local con useState
- Trabajar con props y eventos
- Estructurar un proyecto React profesionalmente

## Requisitos Previos

Antes de empezar asegurate de tener:
- Conocimientos basicos de JavaScript
- HTML y CSS fundamentales
- Node.js instalado en tu computadora
- Un editor de codigo (recomendamos VS Code)

## Tiempo Estimado

- Configuracion inicial: 30 minutos
- Desarrollo de componentes: 2-3 horas
- Integracion y pruebas: 1 hora
- **Total: 3-4 horas aprox**

## Como usar esta guia

1. **Lee primero** cada archivo completo antes de empezar a codificar
2. **Sigue el orden** recomendado para evitar problemas
3. **Prueba cada paso** antes de continuar al siguiente
4. **No te saltes** la configuracion inicial
5. **Haz preguntas** si algo no queda claro

## Tecnologias que usaremos

- **React 18** - Biblioteca para interfaces de usuario
- **React Bootstrap** - Componentes Bootstrap para React
- **Bootstrap 5** - Framework CSS para diseño responsive
- **Create React App** - Herramienta para crear proyectos React
- **Node.js & npm** - Entorno de desarrollo y gestor de paquetes

## Estructura final del proyecto

```
my-ecommerce-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ProductList.js
│   │   ├── ShoppingCart.js
│   │   └── RegistrationForm.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Empezar

Para comenzar, ve al archivo [02-SETUP.md](./02-SETUP.md) y sigue las instrucciones paso a paso.

## Recursos de Apoyo

- [Documentacion React](https://react.dev/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap CSS](https://getbootstrap.com/)
- [Create React App](https://create-react-app.dev/)

## Notas importantes

- Este proyecto funciona completamente en **desarrollo local**
- Para deployment en AWS EC2 tendremos un modulo separado
- Los Unit Tests los veremos en la siguiente seccion
- Mantén siempre una copia de respaldo de tu codigo

Ve a [02-SETUP.md](./02-SETUP.md) para empezar con la configuracion
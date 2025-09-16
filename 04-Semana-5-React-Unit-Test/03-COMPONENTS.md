# Componentes react - guia detallada

En este archivo vas a aprender a crear cada uno de los componentes que forman nuestra aplicacion de e-commerce. Vamos a construir 4 componentes principales, cada uno con su funcionalidad especifica

## Componente 1: Navbar (barra de navegacion)

### Que hace este componente?
- Crea una barra de navegacion en la parte superior
- Es responsive (se adapta a diferentes tamaños de pantalla)
- Incluye enlaces a las diferentes secciones

### Codigo para src/components/Navbar.js

```jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Mi Tienda Online</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#products">Productos</Nav.Link>
            <Nav.Link href="#cart">Carrito</Nav.Link>
            <Nav.Link href="#register">Registro</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
```

### Explicacion del codigo:

**import**: Importamos React y los componentes que necesitamos de react-bootstrap
```jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
```

---

**Navbar**: El componente principal de navegacion con propiedades de estilo
```jsx
<Navbar bg="dark" variant="dark" expand="lg">
```

**bg="dark"**: Le da un fondo oscuro
```jsx
bg="dark"
```

---

**variant="dark"**: Hace que el texto sea blanco para contrastar
```jsx
variant="dark"
```

---

**expand="lg"**: Se colapsa en pantallas pequeñas y muestra el botón hamburguesa
```jsx
expand="lg"
```
Esto significa que:
- En pantallas grandes (lg): Se muestran todos los enlaces
- En tablets y móviles: Solo se ve el logo y el botón hamburguesa
- Al hacer click en hamburguesa: Se despliegan los enlaces

---

**Container**: Mantiene el contenido centrado y con margenes
```jsx
<Container>
  {/* Todo el contenido del navbar */}
</Container>
```

---

**Navbar.Brand**: El nombre/logo de la tienda
```jsx
<Navbar.Brand href="#home">Mi Tienda Online</Navbar.Brand>
```

---

**Navbar.Toggle**: El boton hamburguesa para moviles
```jsx
<Navbar.Toggle aria-controls="basic-navbar-nav" />
```

---

**Nav className="ms-auto"**: Los enlaces alineados a la derecha usando margin-start automático
```jsx
<Nav className="ms-auto">
  <Nav.Link href="#home">Inicio</Nav.Link>
  <Nav.Link href="#products">Productos</Nav.Link>
</Nav>
```
**ms-auto** significa "margin-start: auto" que empuja el contenido hacia la derecha:
- **ms**: margin-start (margen izquierdo)
- **auto**: automático (usa todo el espacio disponible)
- Resultado: Los enlaces se van hasta la derecha del navbar

Otras opciones disponibles:
- **me-auto**: margin-end auto, alinea a la izquierda
- **mx-auto**: margin horizontal auto, centra el contenido
- Sin clase: Por defecto se alinea a la izquierda

## Componente 2: ProductList (lista de productos)

### Que hace este componente?
- Muestra una lista de productos en formato de tarjetas
- Cada producto tiene nombre, descripcion y precio
- Usa el sistema de grillas de Bootstrap

### Codigo para src/components/ProductList.js

```jsx
import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const ProductList = () => {
  // Datos de ejemplo para los productos
  const products = [
    {
      id: 1,
      name: 'Laptop Gaming',
      price: 999.99,
      description: 'Potente laptop para gaming con tarjeta grafica dedicada'
    },
    {
      id: 2,
      name: 'Mouse Inalambrico',
      price: 29.99,
      description: 'Mouse ergonomico sin cables con sensor optico'
    },
    {
      id: 3,
      name: 'Teclado Mecanico',
      price: 89.99,
      description: 'Teclado RGB mecanico con switches azules'
    },
    {
      id: 4,
      name: 'Monitor 4K',
      price: 459.99,
      description: 'Monitor 27 pulgadas con resolucion 4K Ultra HD'
    },
    {
      id: 5,
      name: 'Auriculares Gaming',
      price: 79.99,
      description: 'Auriculares con microfono y sonido envolvente'
    },
    {
      id: 6,
      name: 'Webcam HD',
      price: 49.99,
      description: 'Camara web Full HD con enfoque automatico'
    }
  ];

  const handleAddToCart = (product) => {
    console.log('Agregando al carrito:', product.name);
    // Aqui iria la logica para agregar al carrito
    alert(`${product.name} agregado al carrito!`);
  };

  return (
    <div className="my-4">
      <h2 className="text-center mb-4">Catalogo de Productos</h2>
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {product.description}
                </Card.Text>
                <div className="mt-auto">
                  <h5 className="text-primary">${product.price}</h5>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar al Carrito
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
```

### Explicacion del codigo:

**products array**: Datos hardcodeados de productos (en un proyecto real vendria de una API)
```jsx
const products = [
  {
    id: 1,
    name: 'Laptop Gaming',
    price: 999.99,
    description: 'Potente laptop para gaming con tarjeta grafica dedicada'
  }
];
```

---

**.map()**: Recorre el array y crea una tarjeta para cada producto
```jsx
{products.map(product => (
  <Col key={product.id}>
    <Card>/* contenido */</Card>
  </Col>
))}
```

---

**key={product.id}**: Identificador único para cada producto (React lo necesita para rastrear cambios)
```jsx
<Col key={product.id} sm={12} md={6} lg={4}>
```
Sin esto React no sabe cuál producto cambio y puede mostrar datos incorrectos
Es como ponerle una etiqueta con nombre a cada producto para no confundirlos

---

**Col sm={12} md={6} lg={4}**: Sistema responsive de Bootstrap (el grid tiene 12 columnas totales)
```jsx
<Col sm={12} md={6} lg={4} className="mb-4">
```
- **sm={12}**: En móviles cada producto ocupa las 12 columnas = 1 producto por fila
- **md={6}**: En tablets cada producto ocupa 6 columnas = 2 productos por fila (12÷6=2)
- **lg={4}**: En desktop cada producto ocupa 4 columnas = 3 productos por fila (12÷4=3)

---

**Card className="h-100"**: Todas las tarjetas tienen la misma altura
```jsx
<Card className="h-100">
  <Card.Body className="d-flex flex-column">
```

---

**handleAddToCart**: Funcion que maneja el click del boton
```jsx
const handleAddToCart = (product) => {
  console.log('Agregando al carrito:', product.name);
  alert(`${product.name} agregado al carrito!`);
};
```

## Componente 3: ShoppingCart (carrito de compras)

### Que hace este componente?
- Muestra los productos que estan en el carrito
- Calcula automaticamente el total
- Permite proceder al pago

### Codigo para src/components/ShoppingCart.js

```jsx
import React, { useState } from 'react';
import { Card, ListGroup, Button, Badge, Row, Col } from 'react-bootstrap';

const ShoppingCart = () => {
  // Estado inicial del carrito con algunos productos de ejemplo
  const [cartItems] = useState([
    {
      id: 1,
      name: 'Laptop Gaming',
      quantity: 1,
      price: 999.99
    },
    {
      id: 2,
      name: 'Mouse Inalambrico',
      quantity: 2,
      price: 29.99
    },
    {
      id: 3,
      name: 'Teclado Mecanico',
      quantity: 1,
      price: 89.99
    }
  ]);

  // Funcion para calcular el total del carrito
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0).toFixed(2);
  };

  // Funcion para contar items totales
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    alert(`Total a pagar: $${calculateTotal()}`);
    console.log('Procesando compra...', cartItems);
  };

  return (
    <Card className="my-4">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">
          Carrito de Compras
          <Badge bg="light" text="dark" className="ms-2">
            {getTotalItems()} items
          </Badge>
        </h4>
      </Card.Header>
      <Card.Body>
        {cartItems.length === 0 ? (
          <p className="text-center text-muted">Tu carrito esta vacio</p>
        ) : (
          <>
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col>
                      <strong>{item.name}</strong>
                      <br />
                      <small className="text-muted">
                        Cantidad: {item.quantity} × ${item.price}
                      </small>
                    </Col>
                    <Col xs="auto">
                      <Badge bg="success" pill>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Badge>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <hr />

            <Row className="align-items-center">
              <Col>
                <strong>Total:</strong>
              </Col>
              <Col xs="auto">
                <h4 className="text-primary mb-0">
                  ${calculateTotal()}
                </h4>
              </Col>
            </Row>

            <Button
              variant="success"
              size="lg"
              className="w-100 mt-3"
              onClick={handleCheckout}
            >
              Proceder al Pago
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ShoppingCart;
```

### Explicacion del codigo:

**useState**: Guarda información que puede cambiar (como una variable que React recuerda)
```jsx
const [cartItems] = useState([
  {
    id: 1,
    name: 'Laptop Gaming',
    quantity: 1,
    price: 999.99
  }
]);
```
- **cartItems**: La lista de productos en el carrito
- **useState([...])**: Empieza con 3 productos de ejemplo
- React actualiza la pantalla automáticamente cuando cambian los datos

---

**calculateTotal()**: Calcula el precio total del carrito recorriendo cada producto
```jsx
const calculateTotal = () => {
  return cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0).toFixed(2);
};
```
- **reduce()**: Recorre todos los productos y los suma
- **total + (item.price * item.quantity)**: Precio × cantidad de cada producto
- **.toFixed(2)**: Redondea a 2 decimales (ej: 29.99)

---

**getTotalItems()**: Cuenta el total de items en el carrito
```jsx
const getTotalItems = () => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};
```

---

**Conditional rendering**: Muestra mensaje diferente si el carrito esta vacio
```jsx
{cartItems.length === 0 ? (
  <p className="text-center text-muted">Tu carrito esta vacio</p>
) : (
  // Contenido del carrito
)}
```

---

**.toFixed(2)**: Formatea los precios a 2 decimales
```jsx
${(item.price * item.quantity).toFixed(2)}
```

## Componente 4: RegistrationForm (Formulario de Registro)

### Que hace este componente?
- Permite a los usuarios registrarse
- Incluye validacion basica
- Maneja el estado del formulario

### Codigo para src/components/RegistrationForm.js

```jsx
import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';

const RegistrationForm = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false
  });

  // Estado para manejar errores y mensajes
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validacion del formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es valido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Debes aceptar los terminos y condiciones';
    }

    return newErrors;
  };

  // Maneja el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Si llegamos aqui, el formulario es valido
    console.log('Datos del formulario:', formData);
    setShowSuccess(true);

    // Resetear formulario
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      agreeTerms: false
    });
    setErrors({});

    // Ocultar mensaje de exito despues de 3 segundos
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <Card className="my-4">
      <Card.Body>
        <h3 className="text-center mb-4">Registro de Usuario</h3>

        {showSuccess && (
          <Alert variant="success">
            ¡Registro exitoso! Bienvenido a nuestra tienda.
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Apellido *</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+56 9 1234 5678"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimo 6 caracteres"
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirmar Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              label="Acepto los terminos y condiciones *"
              isInvalid={!!errors.agreeTerms}
              feedback={errors.agreeTerms}
              feedbackType="invalid"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            size="lg"
            className="w-100"
          >
            Registrarse
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Los campos marcados con * son obligatorios
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RegistrationForm;
```

### Explicacion del codigo:

**Multiples useState**: Uno para datos del form, otro para errores, otro para exito
```jsx
const [formData, setFormData] = useState({
  firstName: '', lastName: '', email: '', password: ''
});
const [errors, setErrors] = useState({});
const [showSuccess, setShowSuccess] = useState(false);
```

---

**handleChange**: Maneja todos los inputs (text, email, password, checkbox)
```jsx
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData({
    ...formData,
    [name]: type === 'checkbox' ? checked : value
  });
};
```

---

**validateForm**: Valida cada campo y retorna objetos con errores
```jsx
const validateForm = () => {
  const newErrors = {};
  if (!formData.firstName.trim()) {
    newErrors.firstName = 'El nombre es requerido';
  }
  return newErrors;
};
```

---

**isInvalid**: Propiedad de Bootstrap que muestra errores visualmente
```jsx
<Form.Control
  type="text"
  isInvalid={!!errors.firstName}
/>
```

---

**Form.Control.Feedback**: Muestra mensajes de error especificos
```jsx
<Form.Control.Feedback type="invalid">
  {errors.firstName}
</Form.Control.Feedback>
```

---

**Spread operator**: `...formData` mantiene los valores existentes
```jsx
setFormData({
  ...formData,
  [name]: value
});
```

---

**setTimeout**: Para ocultar mensaje de exito automaticamente
```jsx
setTimeout(() => {
  setShowSuccess(false);
}, 3000);
```

## Conceptos de React Aplicados

### 1. Componentes Funcionales
Todos nuestros componentes son funciones que retornan JSX.

### 2. Hooks
- **useState**: Para manejar estado local
- Cada componente maneja su propio estado

### 3. Props
- Aunque no las usamos aun, estos componentes estan preparados para recibir props

### 4. Event Handling
- onClick, onChange, onSubmit
- Siempre usamos arrow functions para mantener el contexto

### 5. Conditional Rendering
- Mostrar contenido diferente basado en condiciones
- Operador ternario y && logico

## Proximos Pasos

Ahora que tienes todos los componentes creados, puedes continuar a [04-INTEGRATION.md](./04-INTEGRATION.md) para aprender como integrarlos en la aplicacion principal.
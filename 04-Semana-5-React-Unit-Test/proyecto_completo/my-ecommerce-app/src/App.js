import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './components/Navbar';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import RegistrationForm from './components/RegistrationForm';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Barra de navegacion en la parte superior */}
      <Navigation />

      {/* Contenido principal con Container de Bootstrap */}
      <Container className="mt-4">
        {/* Titulo principal */}
        <div className="text-center mb-5">
          <h1 className="display-4 text-primary">Bienvenido a Mi E-Commerce</h1>
          <p className="lead text-muted">
            Descubre los mejores productos de tecnologia
          </p>
        </div>

        {/* Seccion de productos */}
        <ProductList />

        {/* Seccion inferior: Formulario y Carrito */}
        <Row className="mt-5">
          <Col lg={8}>
            <RegistrationForm />
          </Col>
          <Col lg={4}>
            <ShoppingCart />
          </Col>
        </Row>

        {/* Footer simple */}
        <footer className="text-center mt-5 py-4 border-top">
          <p className="text-muted mb-0">
            © 2024 Mi E-Commerce. Todos los derechos reservados.
          </p>
        </footer>
      </Container>
    </div>
  );
}

export default App;
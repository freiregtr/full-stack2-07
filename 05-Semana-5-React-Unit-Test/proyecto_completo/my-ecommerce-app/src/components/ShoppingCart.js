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
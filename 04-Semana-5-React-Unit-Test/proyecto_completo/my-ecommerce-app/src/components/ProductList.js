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
# Proximos Pasos - Mejoras y Expansion

¡Felicidades! Ya tienes una aplicacion React funcionando con Bootstrap. Ahora es momento de pensar en como mejorarla y prepararla para el siguiente nivel. Este archivo te guia en las proximas etapas de aprendizaje.

## Nivel 1: Mejoras Inmediatas (Para Esta Semana)

### 1.1 Funcionalidad del Carrito Real

Actualmente el carrito tiene datos hardcodeados. Vamos a conectarlo con ProductList:

#### Estado Compartido con Context API
```jsx
// src/context/CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

### 1.2 Notificaciones Toast

Agregar feedback visual cuando se agregan productos:

```bash
npm install react-toastify
```

```jsx
// En App.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// En ProductList.js
const handleAddToCart = (product) => {
  addToCart(product);
  toast.success(`${product.name} agregado al carrito!`);
};
```

### 1.3 Loading States

Simular carga de datos:

```jsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Simular llamada a API
  setTimeout(() => {
    setLoading(false);
  }, 1500);
}, []);

if (loading) {
  return (
    <div className="text-center my-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  );
}
```

## Nivel 2: Testing (Siguiente Modulo)

### 2.1 Unit Tests con Jest

Ejemplos de tests que vas a escribir:

```jsx
// ProductList.test.js
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';

test('renders product list', () => {
  render(<ProductList />);
  expect(screen.getByText('Catalogo de Productos')).toBeInTheDocument();
});

test('renders correct number of products', () => {
  render(<ProductList />);
  const productCards = screen.getAllByRole('button', { name: /agregar al carrito/i });
  expect(productCards).toHaveLength(6);
});
```

### 2.2 Integration Tests

```jsx
// App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('can add product to cart', () => {
  render(<App />);

  const addButton = screen.getAllByText('Agregar al Carrito')[0];
  fireEvent.click(addButton);

  // Verificar que el contador del carrito aumenta
  expect(screen.getByText(/items/)).toBeInTheDocument();
});
```

### 2.3 E2E Tests con Cypress

```javascript
// cypress/integration/ecommerce.spec.js
describe('E-commerce App', () => {
  it('should allow user to browse and add products', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Catalogo de Productos').should('be.visible');
    cy.get('[data-testid="product-card"]').should('have.length', 6);

    cy.get('[data-testid="add-to-cart-btn"]').first().click();
    cy.contains('agregado al carrito').should('be.visible');
  });
});
```

## Nivel 3: AWS Deployment (Modulo Siguiente)

### 3.1 Preparacion para AWS EC2

Ya tienes los comandos en el archivo `actividades/2.1.4`, pero aqui hay mejoras:

#### Dockerfile para Containerizacion
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Script de Deployment Automatico
```bash
#!/bin/bash
# deploy.sh

echo "Building React app..."
npm run build

echo "Creating deployment package..."
tar -czf build.tar.gz build/

echo "Uploading to EC2..."
scp -i "your-key.pem" build.tar.gz ec2-user@your-ip:/tmp/

echo "Deploying on server..."
ssh -i "your-key.pem" ec2-user@your-ip << 'EOF'
  cd /var/www/html
  sudo rm -rf *
  sudo tar -xzf /tmp/build.tar.gz --strip-components=1
  sudo systemctl restart nginx
EOF

echo "Deployment complete!"
```

### 3.2 CI/CD con GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to EC2

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test -- --coverage --watchAll=false

    - name: Build app
      run: npm run build

    - name: Deploy to EC2
      run: |
        # Tu script de deployment aqui
```

## Nivel 4: Funcionalidades Avanzadas

### 4.1 Autenticacion con JWT

```jsx
// src/context/AuthContext.js
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar token con backend
      verifyToken(token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 4.2 API Integration

```jsx
// src/api/products.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const productAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/api/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE}/api/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  },

  create: async (product) => {
    const response = await fetch(`${API_BASE}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(product)
    });

    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  }
};
```

### 4.3 State Management con Redux Toolkit

```jsx
// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  }
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
```

## Nivel 5: Optimizacion y Performance

### 5.1 Code Splitting

```jsx
// Lazy loading de componentes
const ProductList = lazy(() => import('./components/ProductList'));
const ShoppingCart = lazy(() => import('./components/ShoppingCart'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductList />
      <ShoppingCart />
    </Suspense>
  );
}
```

### 5.2 Memoization

```jsx
// Optimizar re-renders
const ProductCard = memo(({ product, onAddToCart }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
});

// Memoizar callbacks
const ProductList = () => {
  const addToCart = useCallback((product) => {
    dispatch(addItem(product));
  }, [dispatch]);

  return (
    <div>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
};
```

### 5.3 PWA (Progressive Web App)

```json
// public/manifest.json
{
  "short_name": "Mi E-Commerce",
  "name": "Mi Tienda Online",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

## Tecnologias para Explorar

### Frontend
- **TypeScript**: Para mejor type safety
- **Styled Components**: CSS-in-JS avanzado
- **Framer Motion**: Animaciones
- **React Query**: Data fetching
- **React Hook Form**: Formularios avanzados

### Backend
- **Node.js + Express**: API REST
- **GraphQL**: API mas flexible
- **PostgreSQL/MongoDB**: Bases de datos
- **Redis**: Cache
- **Socket.io**: Real-time features

### DevOps
- **Docker**: Containerizacion
- **AWS S3**: Hosting estatico
- **CloudFront**: CDN
- **Lambda**: Serverless functions
- **RDS**: Base de datos en la nube

## Roadmap Sugerido

### Semana 1-2: Fundamentos
- [x] React basics
- [x] Components y JSX
- [x] State y Props
- [x] Bootstrap integration

### Semana 3-4: Testing
- [ ] Unit tests con Jest
- [ ] Integration tests
- [ ] E2E tests con Cypress
- [ ] Test coverage al 80%+

### Semana 5-6: Backend
- [ ] Node.js + Express API
- [ ] Database integration
- [ ] Authentication JWT
- [ ] API documentation

### Semana 7-8: Production
- [ ] AWS EC2 deployment
- [ ] CI/CD pipeline
- [ ] Monitoring y logs
- [ ] Performance optimization

### Semana 9-10: Advanced
- [ ] TypeScript migration
- [ ] PWA features
- [ ] Real-time features
- [ ] Advanced state management

## Recursos de Aprendizaje

### Documentacion Oficial
- [React Docs](https://react.dev/)
- [Testing Library](https://testing-library.com/)
- [Bootstrap](https://getbootstrap.com/)
- [AWS EC2](https://docs.aws.amazon.com/ec2/)

### Cursos Recomendados
- React Testing Masterclass
- AWS Solutions Architect
- TypeScript Deep Dive
- Node.js Complete Guide

### Blogs y Comunidades
- [Dev.to React Tag](https://dev.to/t/react)
- [React Subreddit](https://reddit.com/r/reactjs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)

## Proyectos de Practica

### Beginner
1. **Todo List**: CRUD basico con localStorage
2. **Weather App**: Consumir API externa
3. **Calculator**: Manejo de estado complejo

### Intermediate
1. **Blog Platform**: CRUD con backend
2. **Chat App**: WebSockets y real-time
3. **Dashboard**: Graficos y data visualization

### Advanced
1. **E-commerce Completo**: Pagos, inventario, admin
2. **Social Network**: Posts, comments, likes
3. **SaaS Application**: Multi-tenant, subscriptions

## Conclusion

Has construido una base solida con React y Bootstrap. El proximo paso mas importante es agregar testing a tu aplicacion, seguido por deployment en aws

a tienes las herramientas para construir aplicaciones web modernas y escalables.
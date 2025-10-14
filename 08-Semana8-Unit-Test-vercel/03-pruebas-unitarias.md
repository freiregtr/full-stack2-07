# Pruebas Unitarias con Jasmine y Karma

En este documento aprenderás a escribir tests unitarios para el componente Login usando Jasmine y ejecutarlos con Karma.

---

## ¿Qué es Testing Unitario?

El **testing unitario** consiste en probar unidades individuales de código (funciones, componentes) de forma aislada para verificar que funcionan correctamente.

### Beneficios:
- Detecta errores temprano
- Facilita refactorización
- Documenta el comportamiento esperado
- Aumenta la confianza en el código
- Reduce bugs en producción

---

## Anatomía de un Test en Jasmine

Jasmine usa una sintaxis BDD (Behavior-Driven Development) muy legible:

### Estructura básica

```javascript
describe('Descripción del grupo de tests', () => {
  it('debe hacer algo específico', () => {
    // Arrange (preparar)
    const valor = 5;

    // Act (actuar)
    const resultado = valor * 2;

    // Assert (verificar)
    expect(resultado).toBe(10);
  });
});
```

### Bloques principales

| Bloque | Propósito | Ejemplo |
|--------|-----------|---------|
| `describe()` | Agrupa tests relacionados | `describe('Login Component', ...)` |
| `it()` | Define un test individual | `it('debe validar email', ...)` |
| `expect()` | Crea una expectativa | `expect(value).toBe(5)` |

---

## Matchers de Jasmine

Los **matchers** son funciones para comparar valores:

### Matchers comunes

```javascript
// Igualdad estricta (===)
expect(5).toBe(5);
expect('hola').toBe('hola');

// Igualdad profunda (compara objetos/arrays)
expect({ a: 1 }).toEqual({ a: 1 });
expect([1, 2, 3]).toEqual([1, 2, 3]);

// Truthiness
expect(true).toBeTruthy();
expect(false).toBeFalsy();
expect(null).toBeFalsy();
expect(undefined).toBeFalsy();

// Nullish
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect(5).toBeDefined();

// Comparaciones numéricas
expect(10).toBeGreaterThan(5);
expect(3).toBeLessThan(10);
expect(5).toBeCloseTo(5.01, 1); // precisión decimal

// Strings
expect('Hello World').toContain('World');
expect('test@email.com').toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

// Arrays
expect([1, 2, 3]).toContain(2);
expect(['a', 'b', 'c']).toHaveSize(3);

// Funciones
expect(() => { throw new Error('fail'); }).toThrow();
expect(myFunction).toHaveBeenCalled(); // con spies

// Negación
expect(5).not.toBe(10);
```

---

## Spies y Mocks en Jasmine

Los **spies** permiten simular funciones y verificar cómo fueron llamadas.

### Spy básico

```javascript
describe('Spies', () => {
  it('debe verificar que una función fue llamada', () => {
    const obj = {
      metodo: () => 'original'
    };

    // Crear spy
    spyOn(obj, 'metodo');

    // Llamar
    obj.metodo();

    // Verificar
    expect(obj.metodo).toHaveBeenCalled();
  });
});
```

### Spy con valor de retorno

```javascript
it('debe retornar un valor simulado', () => {
  const obj = { getData: () => 'real' };

  spyOn(obj, 'getData').and.returnValue('fake data');

  expect(obj.getData()).toBe('fake data');
  expect(obj.getData).toHaveBeenCalled();
});
```

### Spy con argumentos

```javascript
it('debe verificar argumentos', () => {
  const obj = { login: (email, pass) => {} };

  spyOn(obj, 'login');

  obj.login('test@email.com', '123456');

  expect(obj.login).toHaveBeenCalledWith('test@email.com', '123456');
  expect(obj.login).toHaveBeenCalledTimes(1);
});
```

---

## Tests para el Componente Login

Ahora vamos a crear tests completos para nuestro componente Login.

### Crear archivo de tests

Crear archivo: `src/__tests__/Login.spec.jsx`

```javascript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login.jsx';

describe('Login Component', () => {
  // Setup: se ejecuta antes de cada test
  beforeEach(() => {
    render(<Login />);
  });

  describe('Renderizado inicial', () => {
    it('debe renderizar el título "Iniciar sesión"', () => {
      const title = screen.getByText('Iniciar sesión');
      expect(title).toBeInTheDocument();
    });

    it('debe renderizar el logo "MyApp"', () => {
      const logo = screen.getByText('MyApp');
      expect(logo).toBeInTheDocument();
    });

    it('debe renderizar el input de email', () => {
      const emailInput = screen.getByTestId('email-input');
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('debe renderizar el input de password', () => {
      const passwordInput = screen.getByTestId('password-input');
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('debe renderizar el botón de submit', () => {
      const submitBtn = screen.getByTestId('submit-btn');
      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toHaveTextContent('Siguiente');
    });

    it('debe renderizar el botón de crear cuenta', () => {
      const createBtn = screen.getByTestId('create-account-btn');
      expect(createBtn).toBeInTheDocument();
      expect(createBtn).toHaveTextContent('Crear cuenta');
    });

    it('NO debe mostrar el spinner de carga inicialmente', () => {
      const spinner = screen.queryByTestId('loading-spinner');
      expect(spinner).not.toBeInTheDocument();
    });

    it('NO debe mostrar el mensaje de éxito inicialmente', () => {
      const success = screen.queryByTestId('success-message');
      expect(success).not.toBeInTheDocument();
    });
  });

  describe('Validación de email', () => {
    it('debe aceptar un email válido', () => {
      const emailInput = screen.getByTestId('email-input');

      fireEvent.change(emailInput, { target: { value: 'test@email.com' } });

      expect(emailInput.value).toBe('test@email.com');
    });

    it('debe mostrar error con email vacío al hacer submit', () => {
      const submitBtn = screen.getByTestId('submit-btn');

      fireEvent.click(submitBtn);

      const errorMessage = screen.getByText('Ingresa un correo válido');
      expect(errorMessage).toBeVisible();
    });

    it('debe mostrar error con email inválido al hacer submit', () => {
      const emailInput = screen.getByTestId('email-input');
      const submitBtn = screen.getByTestId('submit-btn');

      // Emails inválidos
      const invalidEmails = [
        'test',
        'test@',
        '@email.com',
        'test@email',
        'test email@test.com'
      ];

      invalidEmails.forEach(email => {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.click(submitBtn);

        const errorMessage = screen.getByText('Ingresa un correo válido');
        expect(errorMessage).toBeVisible();
      });
    });

    it('debe validar formato de email con regex', () => {
      const emailInput = screen.getByTestId('email-input');
      const submitBtn = screen.getByTestId('submit-btn');
      const passwordInput = screen.getByTestId('password-input');

      // Llenar password válido para aislar el test de email
      fireEvent.change(passwordInput, { target: { value: '123456' } });

      // Email válido
      fireEvent.change(emailInput, { target: { value: 'user@domain.com' } });
      fireEvent.click(submitBtn);

      // No debe haber error
      const formGroup = emailInput.closest('.form-group');
      expect(formGroup).not.toHaveClass('error');
    });
  });

  describe('Validación de password', () => {
    it('debe aceptar un password válido', () => {
      const passwordInput = screen.getByTestId('password-input');

      fireEvent.change(passwordInput, { target: { value: '123456' } });

      expect(passwordInput.value).toBe('123456');
    });

    it('debe mostrar error con password vacío al hacer submit', () => {
      const submitBtn = screen.getByTestId('submit-btn');

      fireEvent.click(submitBtn);

      const errorMessage = screen.getByText('La contraseña debe tener al menos 6 caracteres');
      expect(errorMessage).toBeVisible();
    });

    it('debe rechazar passwords menores a 6 caracteres', () => {
      const passwordInput = screen.getByTestId('password-input');
      const submitBtn = screen.getByTestId('submit-btn');

      // Passwords inválidos
      const invalidPasswords = ['1', '12', '123', '1234', '12345'];

      invalidPasswords.forEach(password => {
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.click(submitBtn);

        const errorMessage = screen.getByText('La contraseña debe tener al menos 6 caracteres');
        expect(errorMessage).toBeVisible();
      });
    });

    it('debe aceptar passwords de 6 o más caracteres', () => {
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitBtn = screen.getByTestId('submit-btn');

      // Llenar email válido
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } });

      // Passwords válidos
      const validPasswords = ['123456', '1234567', 'password123'];

      validPasswords.forEach(password => {
        fireEvent.change(passwordInput, { target: { value: password } });
        fireEvent.click(submitBtn);

        const formGroup = passwordInput.closest('.form-group');
        expect(formGroup).not.toHaveClass('error');
      });
    });
  });

  describe('Comportamiento del formulario', () => {
    it('debe limpiar errores al escribir en email', () => {
      const emailInput = screen.getByTestId('email-input');
      const submitBtn = screen.getByTestId('submit-btn');

      // Generar error
      fireEvent.click(submitBtn);
      let formGroup = emailInput.closest('.form-group');
      expect(formGroup).toHaveClass('error');

      // Escribir en input
      fireEvent.change(emailInput, { target: { value: 't' } });

      // Error debe desaparecer
      formGroup = emailInput.closest('.form-group');
      expect(formGroup).not.toHaveClass('error');
    });

    it('debe limpiar errores al escribir en password', () => {
      const passwordInput = screen.getByTestId('password-input');
      const submitBtn = screen.getByTestId('submit-btn');

      // Generar error
      fireEvent.click(submitBtn);
      let formGroup = passwordInput.closest('.form-group');
      expect(formGroup).toHaveClass('error');

      // Escribir en input
      fireEvent.change(passwordInput, { target: { value: '1' } });

      // Error debe desaparecer
      formGroup = passwordInput.closest('.form-group');
      expect(formGroup).not.toHaveClass('error');
    });

    it('debe prevenir submit si hay errores de validación', () => {
      const submitBtn = screen.getByTestId('submit-btn');

      fireEvent.click(submitBtn);

      // No debe mostrar spinner (porque no pasó validación)
      const spinner = screen.queryByTestId('loading-spinner');
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('Flujo de login exitoso', () => {
    it('debe mostrar spinner al hacer submit con datos válidos', async () => {
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitBtn = screen.getByTestId('submit-btn');

      // Llenar formulario correctamente
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });

      // Submit
      fireEvent.click(submitBtn);

      // Debe mostrar spinner
      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveTextContent('Iniciando sesión...');
    });

    it('debe ocultar formulario cuando está loading', async () => {
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitBtn = screen.getByTestId('submit-btn');

      fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(submitBtn);

      // Formulario no debe estar visible
      expect(screen.queryByTestId('email-input')).not.toBeInTheDocument();
      expect(screen.queryByTestId('password-input')).not.toBeInTheDocument();
    });

    it('debe mostrar mensaje de éxito después de 2 segundos', async () => {
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitBtn = screen.getByTestId('submit-btn');

      fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(submitBtn);

      // Esperar 2 segundos (simulación de API)
      await waitFor(
        () => {
          const success = screen.getByTestId('success-message');
          expect(success).toBeInTheDocument();
          expect(success).toHaveTextContent('¡Inicio de sesión exitoso!');
        },
        { timeout: 3000 }
      );
    });

    it('debe resetear el formulario después de éxito', async () => {
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitBtn = screen.getByTestId('submit-btn');

      fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
      fireEvent.change(passwordInput, { target: { value: '123456' } });
      fireEvent.click(submitBtn);

      // Esperar 4 segundos (2 loading + 2 success)
      await waitFor(
        () => {
          const newEmailInput = screen.getByTestId('email-input');
          const newPasswordInput = screen.getByTestId('password-input');
          expect(newEmailInput.value).toBe('');
          expect(newPasswordInput.value).toBe('');
        },
        { timeout: 5000 }
      );
    });
  });

  describe('Botón crear cuenta', () => {
    it('debe ejecutar función al hacer click', () => {
      // Spy en window.alert
      spyOn(window, 'alert');

      const createBtn = screen.getByTestId('create-account-btn');
      fireEvent.click(createBtn);

      expect(window.alert).toHaveBeenCalledWith('Redirigiendo a página de registro...');
    });
  });

  describe('Accesibilidad', () => {
    it('debe tener labels asociados a inputs', () => {
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');

      expect(emailInput).toHaveAttribute('id', 'email');
      expect(passwordInput).toHaveAttribute('id', 'password');

      const emailLabel = screen.getByLabelText('Correo electrónico');
      const passwordLabel = screen.getByLabelText('Contraseña');

      expect(emailLabel).toBe(emailInput);
      expect(passwordLabel).toBe(passwordInput);
    });

    it('debe tener placeholders descriptivos', () => {
      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');

      expect(emailInput).toHaveAttribute('placeholder', 'tu@email.com');
      expect(passwordInput).toHaveAttribute('placeholder', 'Ingresa tu contraseña');
    });
  });
});
```

---

## React Testing Library

React Testing Library ya fue instalada en el documento 1 (Setup). Si por alguna razón no la tienes, ejecuta:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

Estas dependencias permiten renderizar componentes React en tests y usar matchers adicionales como `toBeInTheDocument()`.

---

## Ejecutar los Tests con Karma

### Comando para ejecutar tests

```bash
# Watch mode (detecta cambios)
npm run test:karma

# Single run (ejecuta una vez)
npm run test:karma-ci
```

### Salida esperada

```
Chrome 120.0.0.0 (Linux): Executed 25 of 25 SUCCESS (2.145 secs / 2.002 secs)

TOTAL: 25 SUCCESS
```

---

## Interpretación de Resultados

### Test pasó (SUCCESS)
```
debe renderizar el título "Iniciar sesión" - SUCCESS
```
El test ejecutó correctamente y todas las expectativas se cumplieron.

### Test falló (FAILED)
```
debe validar email correctamente - FAILED
  Expected 'test@email' to match /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```
El test falló. Muestra qué expectativa no se cumplió.

### Estadísticas
```
Executed 25 of 25 SUCCESS (2.145 secs / 2.002 secs)
```
- **25 of 25**: 25 tests ejecutados de 25 totales
- **SUCCESS**: Todos pasaron
- **2.145 secs**: Tiempo total
- **2.002 secs**: Tiempo neto de tests

---

## Cobertura de Tests (Coverage)

Para medir qué porcentaje del código está cubierto por tests:

### Instalar karma-coverage

```bash
npm install --save-dev karma-coverage
```

### Actualizar karma.conf.js

```javascript
module.exports = function(config) {
  config.set({
    // ... configuración existente

    // Agregar preprocessor de coverage
    preprocessors: {
      'src/**/*.js': ['webpack'],
      'src/**/*.jsx': ['webpack'],
      'src/components/**/*.js': ['coverage'], // archivos a medir
      'src/components/**/*.jsx': ['coverage'] // archivos JSX a medir
    },

    // Agregar reporter de coverage
    reporters: ['progress', 'coverage'],

    // Configuración de coverage
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};
```

### Ver reporte de cobertura

```bash
npm run test:karma-ci

# Abrir reporte en navegador
xdg-open coverage/index.html  # Linux
open coverage/index.html      # Mac
start coverage/index.html     # Windows
```

El reporte muestra:
- **Statements**: % de líneas ejecutadas
- **Branches**: % de ramas (if/else) ejecutadas
- **Functions**: % de funciones ejecutadas
- **Lines**: % de líneas totales cubiertas

Meta ideal: **80% o más** de cobertura.

---

## Mejores Prácticas de Testing

### 1. Tests descriptivos
```javascript
// Mal:
it('test 1', () => { ... });

// Bien:
it('debe validar formato de email correctamente', () => { ... });
```

### 2. Arrange-Act-Assert (AAA)
```javascript
it('debe sumar dos números', () => {
  // Arrange (preparar)
  const a = 2;
  const b = 3;

  // Act (actuar)
  const resultado = a + b;

  // Assert (verificar)
  expect(resultado).toBe(5);
});
```

### 3. Un concepto por test
```javascript
// Mal: muchas cosas en un test
it('debe funcionar el login', () => {
  // valida email
  // valida password
  // hace submit
  // muestra éxito
});

// Bien: tests separados
it('debe validar email', () => { ... });
it('debe validar password', () => { ... });
it('debe hacer submit correctamente', () => { ... });
```

### 4. Tests independientes
Cada test debe poder ejecutarse solo, sin depender de otros.

### 5. Usar data-testid
```javascript
// Mejor que buscar por texto o clases CSS
<input data-testid="email-input" />

const input = screen.getByTestId('email-input');
```

---

## Depuración de Tests

### Ver más detalle en errores

```javascript
// Agregar .only para ejecutar solo un test
it.only('debe validar email', () => {
  // este test se ejecutará solo
});

// Agregar .skip para saltar un test
it.skip('debe validar password', () => {
  // este test se saltará
});
```

### Console.log en tests

```javascript
it('debe hacer algo', () => {
  const value = getSomeValue();
  console.log('Valor:', value); // Se verá en terminal
  expect(value).toBe(5);
});
```

### Debug en Chrome DevTools

1. Ejecutar Karma
2. Click en "Debug" en la ventana de Chrome que se abre
3. Abrir DevTools (F12)
4. Agregar breakpoints en tu código
5. Recargar página

---

## Resumen

En este documento aprendiste:

1. ✓ Qué es testing unitario y sus beneficios
2. ✓ Anatomía de un test en Jasmine (describe, it, expect)
3. ✓ Matchers comunes de Jasmine
4. ✓ Spies y mocks para simular funciones
5. ✓ Tests completos para el componente Login (25 tests)
6. ✓ Cómo ejecutar tests con Karma
7. ✓ Interpretar resultados de tests
8. ✓ Medir cobertura de código (coverage)
9. ✓ Mejores prácticas de testing
10. ✓ Depuración de tests

---

## Checklist de Tests para Login

- [x] Renderizado de elementos (título, inputs, botones)
- [x] Validación de email (formato, vacío, inválido)
- [x] Validación de password (longitud mínima)
- [x] Limpieza de errores al escribir
- [x] Prevención de submit con datos inválidos
- [x] Flujo completo de login (loading → success)
- [x] Reset de formulario después de éxito
- [x] Botón de crear cuenta
- [x] Accesibilidad (labels, placeholders)

---

## Próximos Pasos

1. Ejecuta los tests: `npm run test:karma`
2. Verifica que todos pasen (25/25 SUCCESS)
3. Revisa la cobertura de código
4. Experimenta modificando el código y viendo cómo fallan los tests
5. Agrega tus propios tests personalizados

¡Felicidades! Ahora sabes crear componentes React con tests unitarios usando Jasmine y Karma.

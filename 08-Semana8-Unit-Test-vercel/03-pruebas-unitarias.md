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

Los **matchers** son funciones que Jasmine usa para comparar valores. Aquí están los que usamos en nuestros 31 tests:

### Ejemplo del TEST 10: Validar email sin @

```javascript
it('debe mostrar error con email sin @', () => {
  const emailInput = container.querySelector('[data-testid="email-input"]');
  fillInput(emailInput, 'testemail.com');
  submitForm();
  const formGroup = emailInput.closest('.form-group');

  // toBe() - Compara con igualdad estricta (===)
  expect(formGroup.classList.contains('error')).toBe(true);
});
```

### Matchers que usamos en los tests

```javascript
// toBe() - Igualdad estricta (===)
expect(title.textContent).toBe('Iniciar sesión'); // TEST 1

// toBeDefined() - Verifica que el elemento existe
expect(emailInput).toBeDefined(); // TEST 3

// toBeNull() - Verifica que NO existe (null)
expect(spinner).toBeNull(); // TEST 7

// not.toBeNull() - Verifica que SÍ existe (no es null)
expect(spinner).not.toBeNull(); // TEST 23

// toContain() - Verifica que un string contiene otro
expect(spinner.textContent).toContain('Iniciando sesión...'); // TEST 23

// toHaveBeenCalledWith() - Verifica argumentos de un spy
expect(console.log).toHaveBeenCalledWith('Login exitoso:', {...}); // TEST 25
```

---

## Spies y Mocks en Jasmine

Los **spies** permiten simular funciones y verificar que fueron llamadas correctamente.

### Ejemplo del TEST 25: Spy en console.log

En este test usamos un spy para verificar que `console.log` fue llamado con los datos correctos:

```javascript
it('debe llamar console.log con los datos correctos durante el login', async () => {
  // 1. Crear el spy ANTES de ejecutar el código
  spyOn(console, 'log');

  const emailInput = container.querySelector('[data-testid="email-input"]');
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  fillInput(emailInput, 'spy@test.com');
  fillInput(passwordInput, 'secret123');

  // 2. Ejecutar la acción que llamará a console.log
  submitForm();
  await sleep(2100);

  // 3. Verificar que console.log fue llamado con los argumentos correctos
  expect(console.log).toHaveBeenCalledWith('Login exitoso:', {
    email: 'spy@test.com',
    password: 'secret123'
  });
}, 10000);
```

### Ejemplo del TEST 29: Spy en window.alert

Este test verifica que el botón "Crear cuenta" ejecuta `window.alert`:

```javascript
it('debe ejecutar función al hacer click', () => {
  // 1. Crear spy en window.alert
  spyOn(window, 'alert');

  const createBtn = container.querySelector('[data-testid="create-account-btn"]');

  // 2. Hacer click en el botón
  syncDispatchEvent(createBtn, new MouseEvent('click', { bubbles: true }));

  // 3. Verificar que alert fue llamado con el mensaje correcto
  expect(window.alert).toHaveBeenCalledWith('Redirigiendo a página de registro...');
});
```

**Resumen:** Los spies te permiten "espiar" funciones para verificar que fueron llamadas con los argumentos correctos, sin ejecutar el código real de la función.

---

## Tests para el Componente Login - Guía Completa (31 Tests Explicados)

Esta sección explica cada uno de los 31 tests del componente Login paso a paso, con su objetivo, código comentado y resultados esperados.

---

### TEST 1/31: Renderizar el título "Iniciar sesión"

**Categoría:** Renderizado inicial | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que el componente Login renderiza correctamente el título principal "Iniciar sesión" cuando se monta por primera vez.

**Source code con comentarios**

```javascript
it('debe renderizar el título "Iniciar sesión"', () => {
  // 1. Buscar el elemento con clase 'subtitle' en el DOM
  const title = container.querySelector('.subtitle');

  // 2. Verificar que el elemento existe
  expect(title).toBeDefined();

  // 3. Verificar que el texto es exactamente "Iniciar sesión"
  expect(title.textContent).toBe('Iniciar sesión');
});
```

**Resultados**

Si el test pasa, el elemento está en el DOM con el texto correcto. Si falla, el elemento no existe o el texto es diferente.

---

### TEST 2/31: Renderizar el logo "MyApp"

**Categoría:** Renderizado inicial | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que el logo de la aplicación "MyApp" se renderiza correctamente.

**Source code con comentarios**

```javascript
it('debe renderizar el logo "MyApp"', () => {
  // 1. Buscar el elemento con clase 'logo'
  const logo = container.querySelector('.logo');

  // 2. Verificar que existe
  expect(logo).toBeDefined();

  // 3. Verificar el texto
  expect(logo.textContent).toBe('MyApp');
});
```

**Resultados**

Si el test pasa, el logo está en el DOM con el texto "MyApp". Si falla, el elemento no existe o el texto es diferente.

---

### TEST 3/31: Renderizar el input de email

**Categoría:** Renderizado inicial | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que el campo de entrada para el email existe y tiene el tipo correcto (`type="email"`).

**Source code con comentarios**

```javascript
it('debe renderizar el input de email', () => {
  // 1. Buscar el input usando data-testid
  const emailInput = container.querySelector('[data-testid="email-input"]');

  // 2. Verificar que existe
  expect(emailInput).toBeDefined();

  // 3. Verificar el tipo
  expect(emailInput.getAttribute('type')).toBe('email');
});
```

**Resultados**

Si el test pasa, el input existe con `type="email"`. Si falla, el input no existe o el tipo es incorrecto.

---

### TEST 4/31: Renderizar el input de password

**Categoría:** Renderizado inicial | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que el campo de contraseña existe y tiene `type="password"` para ocultar el texto.

**Source code con comentarios**

```javascript
it('debe renderizar el input de password', () => {
  // 1. Buscar el input
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Verificar que existe
  expect(passwordInput).toBeDefined();

  // 3. Verificar el tipo
  expect(passwordInput.getAttribute('type')).toBe('password');
});
```

**Resultados**

Si el test pasa, el input existe con `type="password"`. Si falla, el input no existe o el tipo es incorrecto.

---

### TEST 5/31: Renderizar el botón de submit

**Categoría:** Renderizado inicial | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que el botón para enviar el formulario existe y tiene el texto "Siguiente".

**Source code con comentarios**

```javascript
it('debe renderizar el botón de submit', () => {
  // 1. Buscar el botón
  const submitBtn = container.querySelector('[data-testid="submit-btn"]');

  // 2. Verificar que existe
  expect(submitBtn).toBeDefined();

  // 3. Verificar el texto
  expect(submitBtn.textContent).toBe('Siguiente');
});
```

**Resultados**

Si el test pasa, el botón existe con el texto "Siguiente". Si falla, el botón no existe o el texto es diferente.

---

### TEST 6/31: Renderizar el botón de crear cuenta

**Categoría:** Renderizado inicial | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que el botón "Crear cuenta" existe para usuarios nuevos.

**Source code con comentarios**

```javascript
it('debe renderizar el botón de crear cuenta', () => {
  // 1. Buscar el botón
  const createBtn = container.querySelector('[data-testid="create-account-btn"]');

  // 2. Verificar que existe
  expect(createBtn).toBeDefined();

  // 3. Verificar el texto
  expect(createBtn.textContent).toBe('Crear cuenta');
});
```

**Resultados**

Si el test pasa, el botón existe con el texto "Crear cuenta". Si falla, el botón no existe o el texto es diferente.

---

### TEST 7/31: NO debe mostrar el spinner de carga inicialmente

**Categoría:** Renderizado inicial | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que el spinner de carga NO aparece en el estado inicial.

**Source code con comentarios**

```javascript
it('NO debe mostrar el spinner de carga inicialmente', () => {
  // 1. Buscar el spinner
  const spinner = container.querySelector('[data-testid="loading-spinner"]');

  // 2. Verificar que NO existe
  expect(spinner).toBeNull();
});
```

**Resultados**

Si el test pasa, el spinner NO existe. Si falla, el spinner se está renderizando incorrectamente.

---

### TEST 8/31: NO debe mostrar el mensaje de éxito inicialmente

**Categoría:** Renderizado inicial | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que el mensaje de éxito NO aparece en el estado inicial.

**Source code con comentarios**

```javascript
it('NO debe mostrar el mensaje de éxito inicialmente', () => {
  // 1. Buscar el mensaje
  const success = container.querySelector('[data-testid="success-message"]');

  // 2. Verificar que NO existe
  expect(success).toBeNull();
});
```

**Resultados**

Si el test pasa, el mensaje NO existe. Si falla, el mensaje se está mostrando prematuramente.

---

### TEST 9/31: Debe aceptar un email válido

**Categoría:** Validación de email | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que el input acepta y mantiene un email válido.

**Source code con comentarios**

```javascript
it('debe aceptar un email válido', () => {
  // 1. Obtener el input
  const emailInput = container.querySelector('[data-testid="email-input"]');

  // 2. Cambiar el valor
  emailInput.value = 'test@email.com';

  // 3. Disparar evento change
  syncDispatchEvent(emailInput, new Event('change', { bubbles: true }));

  // 4. Verificar el valor
  expect(emailInput.value).toBe('test@email.com');
});
```

**Resultados**

Si el test pasa, el input acepta el email válido. Si falla, hay un problema con el onChange.

---

### TEST 10/31: Debe mostrar error con email sin @

**Categoría:** Validación de email | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que un email sin @ muestra un error de validación.

**Source code con comentarios**

```javascript
it('debe mostrar error con email sin @', () => {
  // 1. Obtener el input
  const emailInput = container.querySelector('[data-testid="email-input"]');

  // 2. Llenar con email inválido
  fillInput(emailInput, 'testemail.com');

  // 3. Hacer submit
  submitForm();

  // 4. Verificar clase error
  const formGroup = emailInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(true);
});
```

**Resultados**

Si el test pasa, el formulario detecta el email inválido. Si falla, la validación no funciona.

---

### TEST 11/31: Debe mostrar error con email sin dominio

**Categoría:** Validación de email | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que un email sin dominio (ejemplo: `test@`) muestra error de validación.

**Source code con comentarios**

```javascript
it('debe mostrar error con email sin dominio', () => {
  // 1. Obtener input
  const emailInput = container.querySelector('[data-testid="email-input"]');

  // 2. Llenar con email sin dominio
  fillInput(emailInput, 'test@');

  // 3. Hacer submit
  submitForm();

  // 4. Verificar error
  const formGroup = emailInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(true);
});
```

**Resultados**

Si el test pasa, el formulario detecta el email sin dominio. Si falla, la validación no funciona.

---

### TEST 12/31: Debe mostrar error con email sin punto en dominio

**Categoría:** Validación de email | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que un email sin punto en el dominio (ejemplo: `test@emailcom`) muestra error.

**Source code con comentarios**

```javascript
it('debe mostrar error con email sin punto en dominio', () => {
  // 1. Obtener input
  const emailInput = container.querySelector('[data-testid="email-input"]');

  // 2. Llenar con email sin punto
  fillInput(emailInput, 'test@emailcom');

  // 3. Hacer submit
  submitForm();

  // 4. Verificar error
  const formGroup = emailInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(true);
});
```

**Resultados**

Si el test pasa, la validación detecta el email sin punto. Si falla, la validación no funciona.

---

### TEST 13/31: Debe mostrar error con email vacío al hacer submit

**Categoría:** Validación de email | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que si el usuario hace submit sin llenar el email, se muestra un error.

**Source code con comentarios**

```javascript
it('debe mostrar error con email vacío al hacer submit', () => {
  // 1. Hacer submit sin llenar
  submitForm();

  // 2. Verificar error en email
  const emailInput = container.querySelector('[data-testid="email-input"]');
  const formGroup = emailInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(true);
});
```

**Resultados**

Si el test pasa, el formulario requiere que el email no esté vacío. Si falla, permite envíos sin email.

---

### TEST 14/31: Debe aceptar un password válido

**Categoría:** Validación de password | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que el input acepta y mantiene un password válido.

**Source code con comentarios**

```javascript
it('debe aceptar un password válido', () => {
  // 1. Obtener input
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Cambiar valor
  passwordInput.value = '123456';

  // 3. Disparar evento
  syncDispatchEvent(passwordInput, new Event('change', { bubbles: true }));

  // 4. Verificar valor
  expect(passwordInput.value).toBe('123456');
});
```

**Resultados**

Si el test pasa, el input acepta el password válido. Si falla, hay un problema con el onChange.

---

### TEST 15/31: Debe aceptar password con exactamente 6 caracteres

**Categoría:** Validación de password | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que un password con exactamente 6 caracteres (límite mínimo) es válido.

**Source code con comentarios**

```javascript
it('debe aceptar password con exactamente 6 caracteres (límite válido)', () => {
  // 1. Obtener inputs
  const passwordInput = container.querySelector('[data-testid="password-input"]');
  const emailInput = container.querySelector('[data-testid="email-input"]');

  // 2. Llenar con datos válidos
  fillInput(emailInput, 'test@email.com');
  fillInput(passwordInput, 'abc123');

  // 3. Hacer submit
  submitForm();

  // 4. NO debe tener error
  const formGroup = passwordInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(false);
});
```

**Resultados**

Si el test pasa, el password de 6 caracteres es aceptado. Si falla, la validación del límite es incorrecta.

---

### TEST 16/31: Debe mostrar error con password menor a 6 caracteres

**Categoría:** Validación de password | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que un password con menos de 6 caracteres muestra error de validación.

**Source code con comentarios**

```javascript
it('debe mostrar error con password menor a 6 caracteres', () => {
  // 1. Obtener input
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Llenar con password corto
  fillInput(passwordInput, '12345');

  // 3. Hacer submit
  submitForm();

  // 4. Verificar error
  const formGroup = passwordInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(true);
});
```

**Resultados**

Si el test pasa, el formulario detecta passwords cortos. Si falla, la validación no funciona.

---

### TEST 17/31: Debe mostrar error con password vacío al hacer submit

**Categoría:** Validación de password | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que si el usuario hace submit sin llenar el password, se muestra un error.

**Source code con comentarios**

```javascript
it('debe mostrar error con password vacío al hacer submit', () => {
  // 1. Hacer submit sin llenar
  submitForm();

  // 2. Verificar error en password
  const passwordInput = container.querySelector('[data-testid="password-input"]');
  const formGroup = passwordInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(true);
});
```

**Resultados**

Si el test pasa, el formulario requiere que el password no esté vacío. Si falla, permite envíos sin password.

---

### TEST 18/31: Debe mostrar mensaje de error de email cuando hay error

**Categoría:** Mensajes de error y clases CSS dinámicas | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que cuando hay un error de email, se muestra el mensaje "Ingresa un correo válido".

**Source code con comentarios**

```javascript
it('debe mostrar mensaje de error de email cuando hay error', () => {
  // 1. Obtener input
  const emailInput = container.querySelector('[data-testid="email-input"]');

  // 2. Llenar con email inválido
  fillInput(emailInput, 'invalid-email');

  // 3. Hacer submit
  submitForm();

  // 4. Verificar mensaje
  const formGroup = emailInput.closest('.form-group');
  const errorMessage = formGroup.querySelector('.error-message');

  expect(formGroup.classList.contains('error')).toBe(true);
  expect(errorMessage).toBeDefined();
  expect(errorMessage.textContent).toBe('Ingresa un correo válido');
});
```

**Resultados**

Si el test pasa, el mensaje de error aparece con el texto correcto. Si falla, el mensaje no se muestra.

---

### TEST 19/31: Debe mostrar mensaje de error de password cuando hay error

**Categoría:** Mensajes de error y clases CSS dinámicas | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que cuando el password es inválido, se muestra el mensaje de error correspondiente.

**Source code con comentarios**

```javascript
it('debe mostrar mensaje de error de password cuando hay error', () => {
  // 1. Obtener input
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Llenar con password inválido
  fillInput(passwordInput, '123');

  // 3. Hacer submit
  submitForm();

  // 4. Verificar mensaje
  const formGroup = passwordInput.closest('.form-group');
  const errorMessage = formGroup.querySelector('.error-message');

  expect(formGroup.classList.contains('error')).toBe(true);
  expect(errorMessage).toBeDefined();
  expect(errorMessage.textContent).toBe('La contraseña debe tener al menos 6 caracteres');
});
```

**Resultados**

Si el test pasa, el mensaje de error del password aparece correctamente. Si falla, el mensaje no se muestra.

---

### TEST 20/31: Debe quitar clase error de email cuando usuario empieza a escribir

**Categoría:** Mensajes de error y clases CSS dinámicas | **Dificultad:** Avanzado

**¿Qué se quiere hacer con este test?**
Verificar que cuando el usuario empieza a escribir después de un error, el error desaparece.

**Source code con comentarios**

```javascript
it('debe quitar clase error de email cuando usuario empieza a escribir', () => {
  // 1. Obtener input
  const emailInput = container.querySelector('[data-testid="email-input"]');

  // 2. Crear el error primero
  submitForm();
  let formGroup = emailInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(true);

  // 3. Escribir algo
  fillInput(emailInput, 't');

  // 4. El error debe desaparecer
  formGroup = emailInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(false);
});
```

**Resultados**

Si el test pasa, el error desaparece cuando el usuario escribe. Si falla, el error permanece visible.

---

### TEST 21/31: Debe quitar clase error de password cuando usuario empieza a escribir

**Categoría:** Mensajes de error y clases CSS dinámicas | **Dificultad:** Avanzado

**¿Qué se quiere hacer con este test?**
Verificar que cuando el usuario empieza a escribir en el password después de un error, el error desaparece.

**Source code con comentarios**

```javascript
it('debe quitar clase error de password cuando usuario empieza a escribir', () => {
  // 1. Obtener input
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Crear el error
  submitForm();
  let formGroup = passwordInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(true);

  // 3. Escribir algo
  fillInput(passwordInput, '1');

  // 4. El error debe desaparecer
  formGroup = passwordInput.closest('.form-group');
  expect(formGroup.classList.contains('error')).toBe(false);
});
```

**Resultados**

Si el test pasa, el error desaparece al escribir. Si falla, el error permanece visible.

---

### TEST 22/31: Debe prevenir submit si hay errores de validación

**Categoría:** Comportamiento del formulario | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que el formulario NO inicia el proceso de login si hay errores de validación.

**Source code con comentarios**

```javascript
it('debe prevenir submit si hay errores de validación', () => {
  // 1. Hacer submit sin llenar datos
  submitForm();

  // 2. El spinner NO debe aparecer porque la validación falló
  const spinner = container.querySelector('[data-testid="loading-spinner"]');
  expect(spinner).toBeNull();
});
```

**Resultados**

Si el test pasa, el formulario no inicia el login con datos inválidos. Si falla, permite submit sin validación.

---

### TEST 23/31: Debe mostrar loading al hacer submit con datos válidos

**Categoría:** Flujo asíncrono completo con async/await | **Dificultad:** Avanzado

**¿Qué se quiere hacer con este test?**
Verificar que el spinner de carga aparece inmediatamente después de un submit válido.

**Source code con comentarios**

```javascript
it('debe mostrar loading al hacer submit con datos válidos', async () => {
  // 1. Obtener inputs
  const emailInput = container.querySelector('[data-testid="email-input"]');
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Llenar con datos válidos
  fillInput(emailInput, 'test@email.com');
  fillInput(passwordInput, '123456');

  // 3. Hacer submit
  submitForm();

  // 4. Verificar que loading aparece inmediatamente
  let spinner = container.querySelector('[data-testid="loading-spinner"]');
  expect(spinner).not.toBeNull();
  expect(spinner.textContent).toContain('Iniciando sesión...');

  // 5. Verificar que el formulario está oculto
  const form = container.querySelector('.login-form');
  expect(form).toBeNull();
});
```

**Resultados**

Si el test pasa, el spinner aparece al enviar el formulario. Si falla, el loading no se muestra correctamente.

---

### TEST 24/31: Debe mostrar success después de 2 segundos y luego limpiar formulario

**Categoría:** Flujo asíncrono completo con async/await | **Dificultad:** Avanzado

**¿Qué se quiere hacer con este test?**
Verificar el flujo completo: loading → success → limpieza del formulario (toma 4+ segundos).

**Source code con comentarios**

```javascript
it('debe mostrar success después de 2 segundos y luego limpiar formulario', async () => {
  // 1. Obtener inputs
  const emailInput = container.querySelector('[data-testid="email-input"]');
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Llenar formulario
  fillInput(emailInput, 'user@example.com');
  fillInput(passwordInput, 'password123');

  // 3. Hacer submit
  submitForm();

  // 4. Esperar 2100ms para el primer setTimeout
  await sleep(2100);

  // 5. Verificar que loading desapareció y success aparece
  let spinner = container.querySelector('[data-testid="loading-spinner"]');
  expect(spinner).toBeNull();

  let success = container.querySelector('[data-testid="success-message"]');
  expect(success).not.toBeNull();
  expect(success.textContent).toContain('¡Inicio de sesión exitoso!');

  // 6. Esperar otros 2100ms para limpieza
  await sleep(2100);

  // 7. Verificar limpieza completa
  success = container.querySelector('[data-testid="success-message"]');
  expect(success).toBeNull();

  const form = container.querySelector('.login-form');
  expect(form).not.toBeNull();

  const newEmailInput = container.querySelector('[data-testid="email-input"]');
  const newPasswordInput = container.querySelector('[data-testid="password-input"]');
  expect(newEmailInput.value).toBe('');
  expect(newPasswordInput.value).toBe('');
}, 10000);
```

**Resultados**

Si el test pasa, el flujo completo funciona correctamente. Si falla, hay un problema en la secuencia asíncrona.

---

### TEST 25/31: Debe llamar console.log con los datos correctos durante el login

**Categoría:** Flujo asíncrono completo con async/await | **Dificultad:** Avanzado

**¿Qué se quiere hacer con este test?**
Verificar que console.log se ejecuta con los datos correctos usando spies de Jasmine.

**Source code con comentarios**

```javascript
it('debe llamar console.log con los datos correctos durante el login', async () => {
  // 1. Crear spy en console.log
  spyOn(console, 'log');

  // 2. Obtener inputs
  const emailInput = container.querySelector('[data-testid="email-input"]');
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  const testEmail = 'spy@test.com';
  const testPassword = 'secret123';

  // 3. Llenar formulario
  fillInput(emailInput, testEmail);
  fillInput(passwordInput, testPassword);

  // 4. Hacer submit
  submitForm();

  // 5. Esperar 2100ms para que se ejecute el console.log
  await sleep(2100);

  // 6. Verificar que console.log fue llamado correctamente
  expect(console.log).toHaveBeenCalledWith('Login exitoso:', {
    email: testEmail,
    password: testPassword
  });
}, 10000);
```

**Resultados**

Si el test pasa, el spy detecta la llamada a console.log con los datos correctos. Si falla, console.log no fue llamado.

---

### TEST 26/31: Debe mostrar errores en ambos campos cuando se hace submit vacío

**Categoría:** Casos edge | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que ambos campos muestran error cuando se envía el formulario completamente vacío.

**Source code con comentarios**

```javascript
it('debe mostrar errores en ambos campos cuando se hace submit vacío', () => {
  // 1. Hacer submit sin llenar nada
  submitForm();

  // 2. Obtener ambos inputs
  const emailInput = container.querySelector('[data-testid="email-input"]');
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 3. Verificar ambos errores
  const emailFormGroup = emailInput.closest('.form-group');
  const passwordFormGroup = passwordInput.closest('.form-group');

  expect(emailFormGroup.classList.contains('error')).toBe(true);
  expect(passwordFormGroup.classList.contains('error')).toBe(true);
});
```

**Resultados**

Si el test pasa, ambos campos muestran error simultáneamente. Si falla, alguno no valida correctamente.

---

### TEST 27/31: Debe mostrar solo error de password cuando email es válido pero password no

**Categoría:** Casos edge | **Dificultad:** Avanzado

**¿Qué se quiere hacer con este test?**
Verificar validación parcial - solo el password debe mostrar error.

**Source code con comentarios**

```javascript
it('debe mostrar solo error de password cuando email es válido pero password no', () => {
  // 1. Obtener inputs
  const emailInput = container.querySelector('[data-testid="email-input"]');
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Llenar con email válido y password inválido
  fillInput(emailInput, 'good@email.com');
  fillInput(passwordInput, '123');

  // 3. Hacer submit
  submitForm();

  // 4. Verificar que solo password tiene error
  const emailFormGroup = emailInput.closest('.form-group');
  const passwordFormGroup = passwordInput.closest('.form-group');

  expect(emailFormGroup.classList.contains('error')).toBe(false);
  expect(passwordFormGroup.classList.contains('error')).toBe(true);
});
```

**Resultados**

Si el test pasa, la validación es independiente por campo. Si falla, la validación no funciona correctamente.

---

### TEST 28/31: Debe mostrar solo error de email cuando password es válido pero email no

**Categoría:** Casos edge | **Dificultad:** Avanzado

**¿Qué se quiere hacer con este test?**
Verificar validación parcial - solo el email debe mostrar error.

**Source code con comentarios**

```javascript
it('debe mostrar solo error de email cuando password es válido pero email no', () => {
  // 1. Obtener inputs
  const emailInput = container.querySelector('[data-testid="email-input"]');
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Llenar con email inválido y password válido
  fillInput(emailInput, 'bad-email');
  fillInput(passwordInput, '123456');

  // 3. Hacer submit
  submitForm();

  // 4. Verificar que solo email tiene error
  const emailFormGroup = emailInput.closest('.form-group');
  const passwordFormGroup = passwordInput.closest('.form-group');

  expect(emailFormGroup.classList.contains('error')).toBe(true);
  expect(passwordFormGroup.classList.contains('error')).toBe(false);
});
```

**Resultados**

Si el test pasa, cada campo valida independientemente. Si falla, hay un problema en la lógica de validación.

---

### TEST 29/31: Debe ejecutar función al hacer click en botón crear cuenta

**Categoría:** Botón crear cuenta | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que el botón "Crear cuenta" ejecuta la función correcta usando spy.

**Source code con comentarios**

```javascript
it('debe ejecutar función al hacer click', () => {
  // 1. Crear spy en window.alert
  spyOn(window, 'alert');

  // 2. Obtener botón
  const createBtn = container.querySelector('[data-testid="create-account-btn"]');

  // 3. Hacer click
  syncDispatchEvent(createBtn, new MouseEvent('click', { bubbles: true }));

  // 4. Verificar que alert fue llamado
  expect(window.alert).toHaveBeenCalledWith('Redirigiendo a página de registro...');
});
```

**Resultados**

Si el test pasa, el botón ejecuta la función correcta. Si falla, el evento click no funciona.

---

### TEST 30/31: Debe tener labels asociados a inputs

**Categoría:** Accesibilidad | **Dificultad:** Intermedio

**¿Qué se quiere hacer con este test?**
Verificar que los labels están correctamente asociados a los inputs usando for/id.

**Source code con comentarios**

```javascript
it('debe tener labels asociados a inputs', () => {
  // 1. Obtener inputs
  const emailInput = container.querySelector('[data-testid="email-input"]');
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Verificar que tienen IDs
  expect(emailInput.getAttribute('id')).toBe('email');
  expect(passwordInput.getAttribute('id')).toBe('password');

  // 3. Buscar labels con for correspondiente
  const emailLabel = container.querySelector('label[for="email"]');
  const passwordLabel = container.querySelector('label[for="password"]');

  // 4. Verificar que existen y tienen el texto correcto
  expect(emailLabel).toBeDefined();
  expect(passwordLabel).toBeDefined();
  expect(emailLabel.textContent).toContain('Correo electrónico');
  expect(passwordLabel.textContent).toContain('Contraseña');
});
```

**Resultados**

Si el test pasa, los labels están correctamente asociados para accesibilidad. Si falla, falta la asociación for/id.

---

### TEST 31/31: Debe tener placeholders descriptivos

**Categoría:** Accesibilidad | **Dificultad:** Básico

**¿Qué se quiere hacer con este test?**
Verificar que los inputs tienen placeholders descriptivos que ayudan al usuario a entender qué ingresar.

**Source code con comentarios**

```javascript
it('debe tener placeholders descriptivos', () => {
  // 1. Obtener inputs
  const emailInput = container.querySelector('[data-testid="email-input"]');
  const passwordInput = container.querySelector('[data-testid="password-input"]');

  // 2. Verificar que tienen placeholders
  expect(emailInput.getAttribute('placeholder')).toBe('tu@email.com');
  expect(passwordInput.getAttribute('placeholder')).toBe('Ingresa tu contraseña');
});
```

**Resultados**

Si el test pasa, los inputs tienen placeholders descriptivos para mejorar la UX. Si falla, los placeholders no existen o son diferentes.

---

## Código Completo del Archivo de Tests

A continuación se presenta el código completo del archivo `Login.spec.jsx` con todos los 31 tests implementados (código limpio, sin comentarios):

```javascript
import React from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import Login from '../components/Login.jsx';

describe('Login Component', () => {
  let container;
  let root;

  const syncDispatchEvent = (element, event) => {
    flushSync(() => {
      element.dispatchEvent(event);
    });
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fillInput = (input, value) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;

    nativeInputValueSetter.call(input, value);

    syncDispatchEvent(input, new Event('input', { bubbles: true }));
    syncDispatchEvent(input, new Event('change', { bubbles: true }));
  };

  const submitForm = () => {
    const form = container.querySelector('.login-form');
    if (form) {
      syncDispatchEvent(form, new Event('submit', { bubbles: true, cancelable: true }));
    }
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    root = ReactDOM.createRoot(container);
    flushSync(() => {
      root.render(<Login />);
    });
  });

  afterEach(() => {
    flushSync(() => {
      root.unmount();
    });
    document.body.removeChild(container);
    container = null;
    root = null;
  });

  describe('Renderizado inicial', () => {
    it('debe renderizar el título "Iniciar sesión"', () => {
      const title = container.querySelector('.subtitle');
      expect(title).toBeDefined();
      expect(title.textContent).toBe('Iniciar sesión');
    });

    it('debe renderizar el logo "MyApp"', () => {
      const logo = container.querySelector('.logo');
      expect(logo).toBeDefined();
      expect(logo.textContent).toBe('MyApp');
    });

    it('debe renderizar el input de email', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      expect(emailInput).toBeDefined();
      expect(emailInput.getAttribute('type')).toBe('email');
    });

    it('debe renderizar el input de password', () => {
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      expect(passwordInput).toBeDefined();
      expect(passwordInput.getAttribute('type')).toBe('password');
    });

    it('debe renderizar el botón de submit', () => {
      const submitBtn = container.querySelector('[data-testid="submit-btn"]');
      expect(submitBtn).toBeDefined();
      expect(submitBtn.textContent).toBe('Siguiente');
    });

    it('debe renderizar el botón de crear cuenta', () => {
      const createBtn = container.querySelector('[data-testid="create-account-btn"]');
      expect(createBtn).toBeDefined();
      expect(createBtn.textContent).toBe('Crear cuenta');
    });

    it('NO debe mostrar el spinner de carga inicialmente', () => {
      const spinner = container.querySelector('[data-testid="loading-spinner"]');
      expect(spinner).toBeNull();
    });

    it('NO debe mostrar el mensaje de éxito inicialmente', () => {
      const success = container.querySelector('[data-testid="success-message"]');
      expect(success).toBeNull();
    });
  });

  describe('Validación de email', () => {
    it('debe aceptar un email válido', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      emailInput.value = 'test@email.com';
      syncDispatchEvent(emailInput, new Event('change', { bubbles: true }));
      expect(emailInput.value).toBe('test@email.com');
    });

    it('debe mostrar error con email sin @', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      fillInput(emailInput, 'testemail.com');
      submitForm();
      const formGroup = emailInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(true);
    });

    it('debe mostrar error con email sin dominio', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      fillInput(emailInput, 'test@');
      submitForm();
      const formGroup = emailInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(true);
    });

    it('debe mostrar error con email sin punto en dominio', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      fillInput(emailInput, 'test@emailcom');
      submitForm();
      const formGroup = emailInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(true);
    });

    it('debe mostrar error con email vacío al hacer submit', () => {
      submitForm();
      const emailInput = container.querySelector('[data-testid="email-input"]');
      const formGroup = emailInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(true);
    });
  });

  describe('Validación de password', () => {
    it('debe aceptar un password válido', () => {
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      passwordInput.value = '123456';
      syncDispatchEvent(passwordInput, new Event('change', { bubbles: true }));
      expect(passwordInput.value).toBe('123456');
    });

    it('debe aceptar password con exactamente 6 caracteres (límite válido)', () => {
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      const emailInput = container.querySelector('[data-testid="email-input"]');
      fillInput(emailInput, 'test@email.com');
      fillInput(passwordInput, 'abc123');
      submitForm();
      const formGroup = passwordInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(false);
    });

    it('debe mostrar error con password menor a 6 caracteres', () => {
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      fillInput(passwordInput, '12345');
      submitForm();
      const formGroup = passwordInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(true);
    });

    it('debe mostrar error con password vacío al hacer submit', () => {
      submitForm();
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      const formGroup = passwordInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(true);
    });
  });

  describe('Mensajes de error y clases CSS dinámicas', () => {
    it('debe mostrar mensaje de error de email cuando hay error', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      fillInput(emailInput, 'invalid-email');
      submitForm();
      const formGroup = emailInput.closest('.form-group');
      const errorMessage = formGroup.querySelector('.error-message');
      expect(formGroup.classList.contains('error')).toBe(true);
      expect(errorMessage).toBeDefined();
      expect(errorMessage.textContent).toBe('Ingresa un correo válido');
    });

    it('debe mostrar mensaje de error de password cuando hay error', () => {
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      fillInput(passwordInput, '123');
      submitForm();
      const formGroup = passwordInput.closest('.form-group');
      const errorMessage = formGroup.querySelector('.error-message');
      expect(formGroup.classList.contains('error')).toBe(true);
      expect(errorMessage).toBeDefined();
      expect(errorMessage.textContent).toBe('La contraseña debe tener al menos 6 caracteres');
    });

    it('debe quitar clase error de email cuando usuario empieza a escribir', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      submitForm();
      let formGroup = emailInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(true);
      fillInput(emailInput, 't');
      formGroup = emailInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(false);
    });

    it('debe quitar clase error de password cuando usuario empieza a escribir', () => {
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      submitForm();
      let formGroup = passwordInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(true);
      fillInput(passwordInput, '1');
      formGroup = passwordInput.closest('.form-group');
      expect(formGroup.classList.contains('error')).toBe(false);
    });
  });

  describe('Comportamiento del formulario', () => {
    it('debe prevenir submit si hay errores de validación', () => {
      submitForm();
      const spinner = container.querySelector('[data-testid="loading-spinner"]');
      expect(spinner).toBeNull();
    });
  });

  describe('Flujo asíncrono completo con async/await', () => {
    it('debe mostrar loading al hacer submit con datos válidos', async () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      fillInput(emailInput, 'test@email.com');
      fillInput(passwordInput, '123456');
      submitForm();
      let spinner = container.querySelector('[data-testid="loading-spinner"]');
      expect(spinner).not.toBeNull();
      expect(spinner.textContent).toContain('Iniciando sesión...');
      const form = container.querySelector('.login-form');
      expect(form).toBeNull();
    });

    it('debe mostrar success después de 2 segundos y luego limpiar formulario', async () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      fillInput(emailInput, 'user@example.com');
      fillInput(passwordInput, 'password123');
      submitForm();
      await sleep(2100);
      let spinner = container.querySelector('[data-testid="loading-spinner"]');
      expect(spinner).toBeNull();
      let success = container.querySelector('[data-testid="success-message"]');
      expect(success).not.toBeNull();
      expect(success.textContent).toContain('¡Inicio de sesión exitoso!');
      await sleep(2100);
      success = container.querySelector('[data-testid="success-message"]');
      expect(success).toBeNull();
      const form = container.querySelector('.login-form');
      expect(form).not.toBeNull();
      const newEmailInput = container.querySelector('[data-testid="email-input"]');
      const newPasswordInput = container.querySelector('[data-testid="password-input"]');
      expect(newEmailInput.value).toBe('');
      expect(newPasswordInput.value).toBe('');
    }, 10000);

    it('debe llamar console.log con los datos correctos durante el login', async () => {
      spyOn(console, 'log');
      const emailInput = container.querySelector('[data-testid="email-input"]');
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      const testEmail = 'spy@test.com';
      const testPassword = 'secret123';
      fillInput(emailInput, testEmail);
      fillInput(passwordInput, testPassword);
      submitForm();
      await sleep(2100);
      expect(console.log).toHaveBeenCalledWith('Login exitoso:', {
        email: testEmail,
        password: testPassword
      });
    }, 10000);
  });

  describe('Casos edge', () => {
    it('debe mostrar errores en ambos campos cuando se hace submit vacío', () => {
      submitForm();
      const emailInput = container.querySelector('[data-testid="email-input"]');
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      const emailFormGroup = emailInput.closest('.form-group');
      const passwordFormGroup = passwordInput.closest('.form-group');
      expect(emailFormGroup.classList.contains('error')).toBe(true);
      expect(passwordFormGroup.classList.contains('error')).toBe(true);
    });

    it('debe mostrar solo error de password cuando email es válido pero password no', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      fillInput(emailInput, 'good@email.com');
      fillInput(passwordInput, '123');
      submitForm();
      const emailFormGroup = emailInput.closest('.form-group');
      const passwordFormGroup = passwordInput.closest('.form-group');
      expect(emailFormGroup.classList.contains('error')).toBe(false);
      expect(passwordFormGroup.classList.contains('error')).toBe(true);
    });

    it('debe mostrar solo error de email cuando password es válido pero email no', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      fillInput(emailInput, 'bad-email');
      fillInput(passwordInput, '123456');
      submitForm();
      const emailFormGroup = emailInput.closest('.form-group');
      const passwordFormGroup = passwordInput.closest('.form-group');
      expect(emailFormGroup.classList.contains('error')).toBe(true);
      expect(passwordFormGroup.classList.contains('error')).toBe(false);
    });
  });

  describe('Botón crear cuenta', () => {
    it('debe ejecutar función al hacer click', () => {
      spyOn(window, 'alert');
      const createBtn = container.querySelector('[data-testid="create-account-btn"]');
      syncDispatchEvent(createBtn, new MouseEvent('click', { bubbles: true }));
      expect(window.alert).toHaveBeenCalledWith('Redirigiendo a página de registro...');
    });
  });

  describe('Accesibilidad', () => {
    it('debe tener labels asociados a inputs', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      expect(emailInput.getAttribute('id')).toBe('email');
      expect(passwordInput.getAttribute('id')).toBe('password');
      const emailLabel = container.querySelector('label[for="email"]');
      const passwordLabel = container.querySelector('label[for="password"]');
      expect(emailLabel).toBeDefined();
      expect(passwordLabel).toBeDefined();
      expect(emailLabel.textContent).toContain('Correo electrónico');
      expect(passwordLabel.textContent).toContain('Contraseña');
    });

    it('debe tener placeholders descriptivos', () => {
      const emailInput = container.querySelector('[data-testid="email-input"]');
      const passwordInput = container.querySelector('[data-testid="password-input"]');
      expect(emailInput.getAttribute('placeholder')).toBe('tu@email.com');
      expect(passwordInput.getAttribute('placeholder')).toBe('Ingresa tu contraseña');
    });
  });
});
```

---

## Ejecutar los Tests

Para ejecutar todos los tests, usa el siguiente comando en tu terminal:

```bash
npm test
```

Verás que Karma abre un navegador (Chrome) y ejecuta automáticamente todos los 31 tests del componente Login. En la consola aparecerá un reporte indicando cuántos tests pasaron y cuántos fallaron. Si todos están correctos, verás un mensaje verde indicando "31 specs, 0 failures" y el navegador mostrará una página con fondo verde. Si algún test falla, la consola te dirá exactamente cuál falló y por qué, ayudándote a identificar y corregir el problema rápidamente.

---


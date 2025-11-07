# 02 - funciones lambda y trailing lambdas en compose

**tiempo estimado:** 10-15 minutos
**prerequisitos:** kotlin basico, haber leido 01-inheritance-compose.md

---

## introduccion

en jetpack compose veras esta sintaxis constantemente:

```kotlin
setContent {
    Greeting(name = "Android")
}
```

esto es una **funcion lambda** usando **trailing lambda syntax**. en este archivo aprenderas que son las lambdas por que compose las usa tanto y como leer el codigo compose correctamente.

---

## que es una funcion lambda?

### definicion simple

una funcion lambda es una **funcion sin nombre** que puedes pasar como parametro a otras funciones.

analogia del mundo real:
- funcion normal: es como un empleado con nombre y cargo fijo
- funcion lambda: es como un freelancer que contratas para una tarea especifica sin nombre permanente

### sintaxis basica

```kotlin
// funcion normal con nombre
fun suma(a: Int, b: Int): Int {
    return a + b
}

// funcion lambda sin nombre
val sumaLambda = { a: Int, b: Int -> a + b }
```

estructura de una lambda:

```kotlin
{ parametros -> cuerpo de la funcion }
```

componentes:
- llaves `{ }` encierran la lambda
- parametros antes de la flecha
- `->` separa parametros del cuerpo
- cuerpo de la funcion despues de la flecha

---

## trailing lambda: sintaxis especial de kotlin

### la regla de trailing lambda

kotlin tiene una convencion especial:

> si el ultimo parametro de una funcion es una lambda puedes sacarla fuera de los parentesis

esto se llama **trailing lambda** y hace el codigo mucho mas legible.

### ejemplo visual con setContent

mira este codigo de android studio:

```kotlin
// forma 1: lambda como parametro nombrado
setContent(content = {
    Greeting(name = "world!")
})

// forma 2: trailing lambda
setContent {
    Greeting(name = "Android")
}
```

ambas formas son **exactamente iguales** pero la forma 2 es:
- mas limpia
- mas facil de leer
- la convencion en compose

### como funciona?

la funcion `setContent` esta definida internamente asi:

```kotlin
// definicion simplificada
fun ComponentActivity.setContent(
    content: @Composable () -> Unit
)
```

donde:
- `content` es el nombre del parametro
- es el ultimo y unico parametro
- su tipo es `@Composable () -> Unit` o una funcion lambda

cuando llamamos `setContent`:

```kotlin
// forma explicita
setContent(content = {
    Text("Hola")
})

// trailing lambda: sacamos la lambda fuera
setContent {
    Text("Hola")
}

// como es el unico parametro podemos omitir parentesis vacios
// por eso queda solo: setContent { }
```

---

## trailing lambda en compose

### Button con dos lambdas

```kotlin
// Button recibe dos parametros:
// 1. onClick: () -> Unit (lambda para evento)
// 2. content: @Composable () -> Unit (lambda para contenido)

Button(
    onClick = { println("Click") }  // primer parametro
) {
    // trailing lambda (ultimo parametro)
    Text("Presioname")
}
```

equivale a escribir:

```kotlin
Button(
    onClick = { println("Click") },
    content = {
        Text("Presioname")
    }
)
```

### Column con contenido

```kotlin
// Column recibe content como ultimo parametro
Column {
    // esta lambda define el contenido
    Text("Linea 1")
    Text("Linea 2")
}
```

---

## parametro implicito it

### la regla de it

cuando una lambda tiene **un solo parametro** puedes omitir el nombre y usar `it`:

```kotlin
// forma explicita: nombras el parametro
items(usuarios) { usuario ->
    Text(usuario)
}

// forma con it: usas it sin nombrar
items(usuarios) {
    Text(it)
}
```

`it` es el parametro implicito que kotlin crea automaticamente.

### cuando usar it vs nombre explicito?

usa `it` cuando:
- el codigo es obvio y corto
- solo hay una operacion simple

usa nombre explicito cuando:
- el codigo es complejo
- hay lambdas anidadas
- mejora la legibilidad

---

## por que compose usa tanto lambdas?

### razon 1: define contenido de forma declarativa

compose describe **que mostrar** no **como mostrarlo**:

```kotlin
// dices que quieres mostrar
Column {
    Text("Titulo")
    Button(onClick = { }) {
        Text("Click")
    }
}

// compose se encarga de como dibujarlo
```

### razon 2: composicion de componentes

las lambdas permiten componer componentes como bloques de lego:

```kotlin
// Card recibe contenido
Card {
    // dentro compones otros componentes
    Column {
        Text("Titulo")
        Text("Descripcion")
    }
}
```

### razon 3: pasar comportamiento como parametro

```kotlin
// puedes pasar diferentes acciones al mismo boton
@Composable
fun MiBoton(texto: String, accion: () -> Unit) {
    Button(onClick = accion) {
        Text(texto)
    }
}
```

### razon 4: codigo mas legible

compara xml vs compose:

xml necesita interfaces y callbacks:

```kotlin
// xml: codigo verboso
button.setOnClickListener(object : View.OnClickListener {
    override fun onClick(v: View?) {
        Toast.makeText(context, "Click", Toast.LENGTH_SHORT).show()
    }
})
```

compose usa lambdas directamente:

```kotlin
// compose: codigo conciso
Button(onClick = {
    Toast.makeText(context, "Click", Toast.LENGTH_SHORT).show()
}) {
    Text("Click")
}
```

---

## comparacion: sin trailing lambda vs con trailing lambda

### sin trailing lambda: dificil de leer

```kotlin
// todo con parametros nombrados
Column(
    modifier = Modifier.fillMaxSize(),
    content = {
        Text(text = "Titulo")
        Button(
            onClick = { /* accion */ },
            content = { Text(text = "Click") }
        )
    }
)
```

problemas:
- muchos `content =`
- dificil ver la estructura
- verboso y repetitivo

### con trailing lambda: facil de leer

```kotlin
// usando trailing lambda
Column(modifier = Modifier.fillMaxSize()) {
    Text("Titulo")
    Button(onClick = { /* accion */ }) {
        Text("Click")
    }
}
```

ventajas:
- estructura clara
- menos ruido visual
- parece html o xml pero es kotlin
- facil ver jerarquia de componentes

---

## tipos de funciones lambda en compose

### lambda sin parametros y sin retorno

```kotlin
// tipo: () -> Unit
Button(onClick = {
    println("Click")
})
```

### lambda con parametros

```kotlin
// tipo: (String) -> Unit
items(nombres) { nombre ->
    Text(nombre)
}
```

### lambda composable

```kotlin
// tipo: @Composable () -> Unit
@Composable
fun MiCard(content: @Composable () -> Unit) {
    Card {
        content()  // ejecuta la lambda composable
    }
}
```

---

## errores comunes

### error 1: confundir parentesis con llaves

```kotlin
// incorrecto: parentesis en lugar de llaves
Button(onClick = ( println("Click") ))  // error de sintaxis

// correcto: llaves para lambda
Button(onClick = { println("Click") })
```

### error 2: olvidar la flecha en lambdas con parametros

```kotlin
// incorrecto: falta flecha
items(lista) { item
    Text(item.nombre)
}

// correcto: flecha ->
items(lista) { item ->
    Text(item.nombre)
}
```

### error 3: usar it cuando hay multiples parametros

```kotlin
// incorrecto: it no funciona con 2 parametros
map.forEach { it.key, it.value ->  // error
    println("$it.key: $it.value")
}

// correcto: nombrar ambos parametros
map.forEach { (key, value) ->
    println("$key: $value")
}
```

---

## tabla resumen

| concepto | sintaxis | ejemplo |
|----------|----------|---------|
| lambda basica | `{ parametros -> cuerpo }` | `{ x -> x * 2 }` |
| sin parametros | `{ cuerpo }` | `{ println("Hola") }` |
| trailing lambda | sacar lambda fuera | `Button(onClick = { }) { }` |
| it implicito | omitir nombre parametro | `filter { it > 0 }` |
| lambda composable | `@Composable () -> Unit` | `content: @Composable () -> Unit` |

---

## documentacion oficial

### kotlin lambdas

documentacion oficial kotlin:
- lambdas y higher-order functions: https://kotlinlang.org/docs/lambdas.html
- trailing lambdas: https://kotlinlang.org/docs/lambdas.html#passing-trailing-lambdas

puntos clave de la documentacion oficial kotlin:
- "if the last parameter of a function is a function a lambda can be placed outside the parentheses"
- "if the lambda is the only argument parentheses can be omitted entirely"
- "when a lambda has only one parameter you can use it implicitly"

### compose y kotlin

documentacion oficial android:
- compose y kotlin: https://developer.android.com/jetpack/compose/kotlin

punto clave de la documentacion oficial android:
- "trailing lambda syntax makes compose code more readable and concise especially for defining ui content"

---

## conclusion

### puntos clave para recordar

lambdas en compose:
1. son funciones sin nombre que se pasan como parametros
2. trailing lambda saca la lambda fuera de parentesis cuando es el ultimo parametro
3. `it` es parametro implicito cuando hay solo uno
4. compose usa lambdas para contenido y eventos
5. hacen el codigo mas legible y declarativo

### por que es importante entenderlas?

entender lambdas es fundamental porque:
- el 90% del codigo compose usa lambdas
- sin entenderlas no puedes leer compose
- son mas simples que interfaces y callbacks de xml
- hacen compose elegante y conciso

### diferencia con xml

xml usa interfaces y callbacks verbosos:
- `setOnClickListener(object : View.OnClickListener { ... })`

compose usa lambdas concisas:
- `Button(onClick = { ... })`

### el ejemplo clave

recuerda la imagen del inicio:

```kotlin
// forma explicita con parametro nombrado
setContent(content = {
    Greeting(name = "world!")
})

// forma con trailing lambda o mas comun
setContent {
    Greeting(name = "Android")
}
```

ambas son iguales pero trailing lambda es la convencion en compose.

---

## proximos pasos

ahora que entiendes lambdas estas listo para:
- 03 componentes basicos compose: Text Button Image Column Row
- 04 modifiers: como personalizar componentes
- 05 state management: como manejar estado reactivo

---

**ultima actualizacion:** semana 5 - 2025
**basado en:** documentacion oficial kotlin y android compose

# 01 - de herencia a composicion: xml vs jetpack compose

**tiempo estimado:** 15-20 minutos
**prerequisitos:** android studio instalado, kotlin basico

---

## introduccion

en esta seccion aprenderas la diferencia fundamental entre dos paradigmas de desarrollo android: herencia de clases con xml y composicion de funciones con jetpack compose. esto explica por que instagram linkedin y gmail migraron sus apps de xml a compose.

---

## diferencia clave: dos paradigmas

### enfoque xml o forma vieja

caracteristicas:
- dos lenguajes: xml para ui mas kotlin para logica
- herencia profunda: Button hereda de TextView hereda de View hereda de Object
- cuando heredas Button obtienes 900 mas metodos aunque solo uses 5
- findViewById vincula xml con kotlin de forma propensa a errores
- rebuild completo: 25 a 40 segundos por cambio

### enfoque compose o forma moderna

caracteristicas:
- un solo lenguaje: todo en kotlin
- composicion de funciones: armas componentes como bloques de lego
- solo usas lo que necesitas sin heredar nada
- type safe: no hay ids string que puedan fallar
- preview instantaneo: 1 a 2 segundos por cambio

---

## contexto: por que migraron las empresas?

estadisticas reales:
- instagram: redujo 40% del codigo ui
- linkedin: compose para todas las features nuevas desde 2021
- gmail: migrando gradualmente su ui completa
- twitter o x: redujo 50% tiempo de desarrollo ui
- google: recomienda compose como estandar desde 2021
- 80% de apps nuevas usan compose en 2024

razon principal:
- xml: herencia rigida mas dos lenguajes mas rebuilds lentos
- compose: composicion flexible mas un lenguaje mas iteracion rapida

---

## la jerarquia de herencia en xml

### diagrama de herencia

cuando creas un boton en xml estas heredando de una cadena profunda:

```
Object (clase base java)
  |
  v
View (400 mas metodos de android)
  |
  v
TextView (300 mas metodos para texto)
  |
  v
Button (200 mas metodos para clicks)
  |
  v
Tu CustomButton (heredas los 900 mas metodos aunque uses 5)
```

### que significa heredar?

herencia es cuando una clase IS-A otra clase:
- Button IS-A TextView
- TextView IS-A View
- View IS-A Object

esto significa que Button hereda:
- todos los metodos de TextView o aproximadamente 300
- todos los metodos de View o aproximadamente 400
- todos los metodos de Object o aproximadamente 200
- total: aproximadamente 900 metodos heredados

problema:
- estas acoplado a toda la cadena
- si TextView cambia internamente tu Button puede romperse
- heredas todo aunque no lo necesites
- rigido y dificil de modificar

---

## ejemplo: crear un boton

### forma vieja: xml con herencia

necesitas dos archivos en dos lenguajes diferentes:

archivo 1: activity_main.xml o lenguaje xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    android:gravity="center">

    <!-- definir boton en xml -->
    <Button
        android:id="@+id/myButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Presioname" />

</LinearLayout>
```

archivo 2: MainActivity.kt o lenguaje kotlin

```kotlin
package com.ejemplo.miapp

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // inflar xml
        setContentView(R.layout.activity_main)

        // buscar boton por id string
        // puede retornar null si el id esta mal escrito
        val button = findViewById<Button>(R.id.myButton)

        // configurar click
        button.setOnClickListener {
            Toast.makeText(this, "Click", Toast.LENGTH_SHORT).show()
        }
    }
}
```

problemas visibles:
- 2 archivos separados en 2 lenguajes
- findViewById usa strings o propenso a typos
- Button hereda 900 mas metodos de View TextView
- cada cambio en xml requiere rebuild de 30 segundos
- no puedes ver el resultado sin ejecutar la app

### forma moderna: compose con composicion

un solo archivo en un solo lenguaje:

archivo unico: MainActivity.kt o todo en kotlin

```kotlin
package com.ejemplo.miapp

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SimpleButtonScreen()
        }
    }
}

// funcion componible
// no hereda de nada es solo una funcion
@Composable
fun SimpleButtonScreen() {
    val context = LocalContext.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // boton componible
        // no hereda de View ni TextView ni Button
        // es una funcion que compone otros componentes
        Button(onClick = {
            Toast.makeText(context, "Click", Toast.LENGTH_SHORT).show()
        }) {
            Text("Presioname")
        }
    }
}

// preview instantaneo sin ejecutar app
@Preview(showBackground = true)
@Composable
fun Preview() {
    SimpleButtonScreen()
}
```

ventajas visibles:
- 1 archivo en 1 lenguaje o solo kotlin
- no hay findViewById o todo type safe
- Button no hereda nada o 0 metodos heredados
- preview instantaneo en 2 segundos sin rebuild
- puedes ver el resultado sin ejecutar la app

---

## composicion vs herencia: el concepto clave

### herencia o xml

paradigma: orientado a objetos

cuando creas un boton custom:

```kotlin
// heredas de Button
class CustomButton : Button {
    // ahora tienes 900 mas metodos heredados
    // Button IS-A TextView IS-A View
    // estas acoplado a toda la cadena
}
```

caracteristicas:
- relacion IS-A o Button IS-A TextView
- heredas todo o no puedes elegir que heredar
- acoplamiento fuerte o cambios en View afectan Button
- rigido o dificil modificar sin romper herencia

### composicion o compose

paradigma: funcional

cuando creas un boton custom:

```kotlin
// compones funciones
@Composable
fun CustomButton(text: String, icon: ImageVector, onClick: () -> Unit) {
    Button(onClick = onClick) {
        Row {
            // compones icono y texto como lego
            Icon(icon)
            Spacer(modifier = Modifier.width(8.dp))
            Text(text)
        }
    }
    // no heredas nada
    // 0 metodos heredados
}
```

caracteristicas:
- relacion HAS-A o Button HAS-A Text HAS-A Icon
- compones piezas o eliges exactamente que usar
- acoplamiento debil o cada funcion es independiente
- flexible o facil modificar sin afectar otras partes

---

## tabla comparativa

| aspecto | xml herencia | compose composicion |
|---------|--------------|---------------------|
| paradigma | orientado a objetos | funcional |
| lenguajes | 2 o xml mas kotlin | 1 o solo kotlin |
| archivos | minimo 2 por pantalla | 1 por pantalla |
| relacion | IS-A o Button IS-A View | HAS-A o Button HAS-A Text |
| metodos heredados | aproximadamente 900 | 0 no hereda |
| acoplamiento | fuerte y rigido | debil y flexible |
| findViewById | si o propenso a errores | no o type safe |
| type safety | no o ids son strings | si o verificacion compilacion |
| preview | no o rebuild requerido | si o instantaneo |
| tiempo iteracion | 30 a 50 segundos | 1 a 2 segundos |
| velocidad desarrollo | lenta | 20x mas rapida |
| usado por | apps viejas pre-2021 | instagram linkedin gmail |

---

## analogia del mundo real

### herencia o como heredar una casa

cuando heredas una casa:
- recibes TODO o la casa completa con muebles garage sotano
- aunque solo necesites la cocina te llevas todo
- no puedes cambiar la estructura sin afectar todo
- si cambias las tuberias puede afectar el techo
- rigido y acoplado

esto es xml con herencia:
- heredas Button con 900 metodos
- aunque solo necesites mostrar texto y detectar click
- no puedes cambiar TextView sin afectar Button
- rigido y acoplado

### composicion o como armar con lego

cuando armas con lego:
- eliges las piezas que necesitas
- solo tomas rueda ventana puerta
- puedes cambiar una pieza sin afectar otras
- si cambias la rueda no afecta la ventana
- flexible e independiente

esto es compose con composicion:
- compones Button con Text Icon
- solo usas lo que necesitas
- puedes cambiar Text sin afectar Button
- flexible e independiente

---

## diagrama: dos archivos vs un archivo

### xml o dos archivos en dos lenguajes

```
proyecto/
  |
  +-- activity_main.xml        <--- lenguaje xml
  |   (define layout visual)
  |
  +-- MainActivity.kt           <--- lenguaje kotlin
      (busca vistas con findViewById)
      (vincula logica con vista)
```

problema:
- tienes que editar dos archivos
- tienes que cambiar entre dos lenguajes
- findViewById conecta ambos con strings
- propenso a errores y crashes

### compose o un archivo en un lenguaje

```
proyecto/
  |
  +-- MainActivity.kt           <--- solo lenguaje kotlin
      (define layout visual)
      (define logica)
      (todo en el mismo lugar)
```

ventaja:
- todo en un archivo
- todo en un lenguaje
- no hay findViewById
- type safe y sin crashes

---

## por que compose elimina la herencia?

### problema con herencia profunda

en xml cuando creas un boton:

```
tu codigo:
<Button android:text="Click" />

lo que realmente heredas:
Button (200 metodos)
  +-- setText() setTextColor() setTextSize() etc
  |
  v hereda de
TextView (300 metodos)
  +-- append() setLines() setMaxLines() etc
  |
  v hereda de
View (400 metodos)
  +-- setVisibility() setPadding() setBackground() etc
  |
  v hereda de
Object (50 metodos)
  +-- toString() equals() hashCode() etc

total heredado: 950 metodos
usas realmente: 5 metodos o setText setOnClickListener
```

esto se llama "inheritance hell" o infierno de herencia:
- heredas 950 metodos
- usas 5 metodos
- desperdicio: 945 metodos innecesarios
- acoplamiento: cualquier cambio en la cadena te afecta

### solucion con composicion

en compose cuando creas un boton:

```kotlin
// tu codigo
@Composable
fun MiBoton() {
    Button(onClick = { }) {
        Text("Click")
    }
}

// no heredas nada
// Button es una funcion que compone:
// - Text o otra funcion
// - Modifier o parametro
// - onClick o parametro

metodos heredados: 0
funciones que usas: solo las que necesitas
sin acoplamiento: cada funcion es independiente
```

esto se llama "composition over inheritance":
- no heredas nada
- compones solo lo que necesitas
- sin desperdicio
- sin acoplamiento

---

## conclusion

### de herencia a composicion

xml con herencia:
- dos lenguajes: xml mas kotlin
- dos archivos: layout mas activity
- herencia profunda: Button hereda 900 mas metodos de View
- findViewById propenso a errores
- rebuilds lentos: 30 a 50 segundos
- rigido y acoplado

compose con composicion:
- un lenguaje: solo kotlin
- un archivo: todo junto
- sin herencia: 0 metodos heredados
- type safe sin findViewById
- preview instantaneo: 1 a 2 segundos
- flexible e independiente

### el cambio de paradigma

esto no es solo un cambio de sintaxis:
- es un cambio de paradigma de programacion
- de orientado a objetos con herencia a funcional con composicion
- de rigido y acoplado a flexible e independiente
- de dos lenguajes a uno
- de lento a rapido

por eso las empresas migraron:
- instagram: 40% menos codigo
- linkedin: nuevas features en compose
- gmail: migracion en progreso
- 80% de apps nuevas usan compose

compose no es solo nueva sintaxis es una nueva forma de pensar en ui.

---

## proximos pasos

ahora que entiendes la diferencia entre herencia y composicion exploraremos:
- 02 componentes basicos compose: Text Button Image Column Row
- 03 modifiers: como personalizar componentes sin herencia
- 04 state management: como manejar estado reactivo
- 05 listas: LazyColumn sin RecyclerView Adapter ViewHolder

---

## recursos adicionales

documentacion oficial:
- jetpack compose: https://developer.android.com/jetpack/compose
- thinking in compose: https://developer.android.com/jetpack/compose/mental-model
- compose vs views: https://developer.android.com/jetpack/compose/why-adopt

concepto clave para recordar:
- xml: herencia o Button IS-A TextView IS-A View
- compose: composicion o Button HAS-A Text HAS-A Icon

---

**ultima actualizacion:** semana 5 - 2025
**basado en:** documentacion oficial android compose paradigmas de programacion

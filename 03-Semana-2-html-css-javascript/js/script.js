// funcionalidad del formulario de contacto
// conecta con el servidor express para enviar correos electronicos reales

/* este bloque principal espera a que toda la pagina se cargue completamenete antes de ejecutar nuestro codigo.
   es crucial hacer esto porqeu si intentamos buscar el formulario antes de que el html este listo,
   javascript no lo encontrara y nuestro codigo fallara. domcontentloaded es el evento perfecto porque
   se dispara justo cuando el html esta parseado, pero sin esperar imagenes o css. */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form'); // element - referencia al formulario html
    
    /* estos console.log son fundamentales para debugging. cuando algo no funciona,
       lo primero que revisamos es la consola del navegador (f12). si vemos "javascript cargado"
       sabemos que el archivo se cargo bien. si "formulario encontrado: no", entonces ay 
       un problema con la clase css o la estructura html. */
    console.log('JavaScript cargado correctamente');
    console.log('Formulario encontrado:', form ? 'Si' : 'No');
    
    /* esta validacion temprana evita errores mas adelante. si no encontramos el formulario,
       es mejor detener la ejecucion aqui con un mensaje claro, que seguir adelante y obtener
       errores confusos cuando intentemos usarlo. el return termina toda la funcion. */
    if (!form) {
        console.error('ERROR: No se encontro el formulario con clase .contact-form');
        return;
    }
    
    /* aqui capturamos el evento 'submit' del formulario. cada vez que alguien hace clic en "enviar"
       o presiona enter en un campo, este evento se dispara. lo importante es que usamos 'async function'
       porqeu mas adelante haremos una peticion http con fetch(), que es asincrona y requiere 'await'.
       sin 'async/await', nuestro codigo se volveria muy complejo con callbacks anidados. */
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // evita que la pagina se recargue (comportamiento por defecto)
        
        console.log('Enviando formulario...');
        
        /* este objeto recolecta todos los datos del formulario de manera organizada.
           usamos .trim() en cada campo para eliminar espacios al inicio y final, porque
           los usuarios a menudo dejan espacios accidentales. form.nombre.value accede
           directamenete al valor del input con name="nombre". */
        const formData = { // object - contiene todos los datos del formulario
            nombre: form.nombre.value.trim(),   // string
            email: form.email.value.trim(),     // string  
            asunto: form.asunto.value.trim(),   // string
            mensaje: form.mensaje.value.trim()  // string
        };
        
        console.log('Datos a enviar:', formData);
        
        /* esta seccion de validacion es critica para la experiencia del usuario y la seguridad.
           validamos en el frontend para dar feedback inmediato (sin esperar al servidor),
           pero tambien validamos en el backend porqeu los usuarios maliciosos pueden
           saltarse la validacion del frontend. es una doble capa de proteccion. */
        
        // validacion de campos vacios - la mas basica pero esencial
        if (!formData.nombre || !formData.email || !formData.asunto || !formData.mensaje) {
            alert('Por favor completa todos los campos');
            return; // detiene la ejecucion si falta algun campo
        }
        
        /* esta expresion regular (regex) valida el formato del email de manera robusta.
           descompuesta: ^[^\s@]+ = inicio con uno o mas caracteres que no sean espacio o @
           @ = debe tener exactamente un simbolo @
           [^\s@]+ = uno o mas caracteres que no sean espacio o @  
           \. = debe tener exactamenet un punto
           [^\s@]+$ = termina con uno o mas caracteres que no sean espacio o @ */
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regexp - patron para validar emails
        if (!emailRegex.test(formData.email)) {
            alert('Por favor ingresa un email valido');
            return;
        }
        
        /* validaciones de longitud minima para asegurar que el contenido tenga sentido.
           un nombre de 1 caracter probablemente sea un error, y un mensaje muy corto
           no proporcionara informacion util. estos numeros (2 y 10) se pueden ajustar
           segun las necesidades del negocio. */
        if (formData.nombre.length < 2) {
            alert('El nombre debe tener al menos 2 caracteres');
            return;
        }
        
        if (formData.mensaje.length < 10) {
            alert('El mensaje debe tener al menos 10 caracteres');
            return;
        }
        
        /* este bloque mejora la experiencia del usuario durante el envio del formulario.
           cambiamos el texto del boton a "enviando..." y lo deshabilitamos para evitar
           multiples envios accidentales. guardamos el texto original para restaurarlo
           despues. es un patron estandar en aplicaciones web modernas. */
        const submitBtn = form.querySelector('button[type="submit"]'); // element - el boton de enviar
        const textoOriginal = submitBtn.textContent; // string - texto original del boton
        submitBtn.textContent = 'Enviando...'; // cambia el texto para mostrar actividad
        submitBtn.disabled = true; // boolean - deshabilitado para prevenir doble-clic
        
        /* el bloque try-catch-finally maneja toda la comunicacion con el servidor de manera segura.
           'try' ejecuta el codigo que puede fallar, 'catch' maneja los errores si algo sale mal,
           y 'finally' siempre se ejecuta (tenga exito o falle) para limpiar el estado del boton. */
        try {
            console.log('Enviando peticion a /api/contact');
            
            /* fetch() es la api moderna para hacer peticiones http. le decimos:
               - url: '/api/contact' (nuestro endpoint del servidor)
               - method: 'post' (enviamos datos, no solo los pedimos)
               - headers: le decimos al servidor que enviamos json
               - body: convertimos nuestro objeto javascript a texto json */
            const response = await fetch('/api/contact', { // promise<response>
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // indica que enviamos json
                },
                body: JSON.stringify(formData) // convierte objeto a string json
            });
            
            console.log('Respuesta del servidor:', response.status); // number - codigo http (200, 400, 500, etc)
            
            /* convertimos la respuesta del servidor de json a objeto javascript.
               await es necesario porqeu la conversion toma tiempo (es asincrona).
               result contendra algo conmo {success: true, message: "enviado"} */
            const result = await response.json(); // object - respuesta del servidor parseada
            console.log('Datos de respuesta:', result);
            
            /* verificamos si el servidor nos dice que todo salio bien.
               si success es true, mostramos mensaje de exito y limpiamos el formulario.
               si es false, mostramos el mensaje de error que nos envio el servidor. */
            if (result.success) {
                alert('Mensaje enviado correctamente! Te respondere pronto.');
                form.reset(); // limpia todos los campos del formulario
            } else {
                alert('Error: ' + result.message);
            }
            
        } catch (error) {
            /* si algo falla en la comunicacion (servidor apagado, sin internet, etc),
               llegamos aqui. es importante mostrar un mensaje claro al usuario sobre
               que revisar, en lugar de un error tecnico confuso. */
            console.error('Error completo:', error);
            alert('Error al enviar el mensaje. Verifica que el servidor este corriendo.');
        } finally {
            /* este bloque siempre se ejecuta, sin importar si hubo exito o error.
               es perfecto para limpiar el estado de la interfaz: restaurar el boton
               a su estado original para que el usuario pueda intentar de nuevo. */
            submitBtn.textContent = textoOriginal; // restaura texto original
            submitBtn.disabled = false; // reactiva el boton
        }
    });
});
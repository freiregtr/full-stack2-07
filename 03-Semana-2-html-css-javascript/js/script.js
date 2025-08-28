// FUNCIONALIDAD DEL FORMULARIO DE CONTACTO
// Conecta con el servidor Express para enviar correos electronicos reales

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    
    console.log('JavaScript cargado correctamente');
    console.log('Formulario encontrado:', form ? 'Si' : 'No');
    
    if (!form) {
        console.error('ERROR: No se encontro el formulario con clase .contact-form');
        return;
    }
    
    // Manejar envio del formulario
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        console.log('Enviando formulario...');
        
        // Obtener datos del formulario
        const formData = {
            nombre: form.nombre.value.trim(),
            email: form.email.value.trim(),
            asunto: form.asunto.value.trim(),
            mensaje: form.mensaje.value.trim()
        };
        
        console.log('Datos a enviar:', formData);
        
        // Validacion basica - verificar que todos los campos esten llenos
        if (!formData.nombre || !formData.email || !formData.asunto || !formData.mensaje) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        // Validar email con regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Por favor ingresa un email valido');
            return;
        }
        
        // Validar longitud minima
        if (formData.nombre.length < 2) {
            alert('El nombre debe tener al menos 2 caracteres');
            return;
        }
        
        if (formData.mensaje.length < 10) {
            alert('El mensaje debe tener al menos 10 caracteres');
            return;
        }
        
        // Deshabilitar boton mientras envia
        const submitBtn = form.querySelector('button[type="submit"]');
        const textoOriginal = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Enviar al servidor
            console.log('Enviando peticion a /api/contact');
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            console.log('Respuesta del servidor:', response.status);
            
            const result = await response.json();
            console.log('Datos de respuesta:', result);
            
            if (result.success) {
                alert('Mensaje enviado correctamente! Te respondere pronto.');
                form.reset();
            } else {
                alert('Error: ' + result.message);
            }
            
        } catch (error) {
            console.error('Error completo:', error);
            alert('Error al enviar el mensaje. Verifica que el servidor este corriendo.');
        } finally {
            // Restaurar boton
            submitBtn.textContent = textoOriginal;
            submitBtn.disabled = false;
        }
    });
});
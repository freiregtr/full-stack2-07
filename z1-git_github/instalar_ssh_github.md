# Tutorial: Configurar SSH con GitHub

Este tutorial te enseñará cómo crear y configurar una llave SSH para conectarte de forma segura con GitHub desde tu computadora.

## ¿Qué es SSH?

SSH (Secure Shell) es un protocolo que permite conectarse de forma segura a servidores remotos. Las llaves SSH son como una llave digital que te identifica ante GitHub sin necesidad de escribir tu contraseña cada vez.

## Paso 1: Verificar si ya tienes llaves SSH

### En Linux/macOS:
```bash
ls -la ~/.ssh
```

### En Windows (PowerShell):
```powershell
dir C:\Users\[tu-usuario]\.ssh
```

**¿Qué significa esto?**
- Si ves archivos como `id_rsa` e `id_rsa.pub`, ya tienes llaves SSH
- Si el directorio no existe o está vacío, necesitas crear nuevas llaves

## Paso 2: Generar una nueva llave SSH

### Para Linux/macOS y Windows (Git Bash o PowerShell):
```bash
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"
```

**Explicación de los parámetros:**
- `-t ed25519`: Especifica el tipo de algoritmo de encriptación (más seguro y moderno)
- `-C "email"`: Añade un comentario con tu email para identificar la llave

### Proceso interactivo:
1. **Ubicación del archivo**: Presiona Enter para usar la ubicación por defecto
2. **Passphrase**: Puedes escribir una contraseña adicional o presionar Enter para dejarlo vacío

```
Enter a file in which to save the key (/home/usuario/.ssh/id_ed25519): [Presiona Enter]
Enter passphrase (empty for no passphrase): [Escribe una contraseña o presiona Enter]
Enter same passphrase again: [Repite la contraseña o presiona Enter]
```

**¿Qué es un passphrase?**
Es una contraseña adicional que protege tu llave SSH. Es opcional pero recomendado para mayor seguridad.

### Opciones para el passphrase:

**Opción 1: Sin passphrase (más fácil)**
- Presiona Enter sin escribir nada
- Ventajas: No necesitas escribir contraseña cada vez
- Desventajas: Si alguien accede a tu computadora, puede usar tu llave SSH

**Opción 2: Con passphrase (más seguro)**
- Escribe una contraseña fuerte (mínimo 8 caracteres)
- Ventajas: Mayor seguridad, incluso si roban tu computadora
- Desventajas: Tienes que escribir la contraseña cada vez (aunque el agente SSH la recuerda temporalmente)

**Recomendación para estudiantes:**
- Si es tu computadora personal y solo tú la usas: puedes usar sin passphrase
- Si es una computadora compartida o pública: SIEMPRE usa passphrase

## Paso 3: Iniciar el agente SSH

### En Linux/macOS:
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### En Windows (PowerShell):
```powershell
# Iniciar el servicio ssh-agent
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent

# Agregar la llave
ssh-add C:\Users\[tu-usuario]\.ssh\id_ed25519
```

**¿Qué hace el agente SSH?**
El agente SSH mantiene tus llaves en memoria para que no tengas que escribir el passphrase cada vez que las uses.

## Paso 4: Copiar la llave pública

### En Linux/macOS:
```bash
cat ~/.ssh/id_ed25519.pub
```

### En Windows (PowerShell):
```powershell
Get-Content C:\Users\[tu-usuario]\.ssh\id_ed25519.pub
```

### Alternativa con clip (Windows):
```powershell
Get-Content C:\Users\[tu-usuario]\.ssh\id_ed25519.pub | clip
```

**¿Cuál es la diferencia entre llave pública y privada?**
- **Llave pública** (`.pub`): Se comparte con GitHub, es seguro mostrarla
- **Llave privada** (sin extensión): Se mantiene secreta en tu computadora, NUNCA la compartas

## Paso 5: Agregar la llave SSH a GitHub

1. **Copia** toda la salida del comando anterior (debe empezar con `ssh-ed25519`)

2. **Ve a GitHub**:
   - Inicia sesión en [github.com](https://github.com)
   - Click en tu foto de perfil (esquina superior derecha)
   - Selecciona **Settings**

3. **Navega a SSH Keys**:
   - En el menú lateral izquierdo, click en **SSH and GPG keys**
   - Click en **New SSH key**

4. **Configura la llave**:
   - **Title**: Dale un nombre descriptivo (ej: "Mi Laptop Personal")
   - **Key**: Pega la llave pública que copiaste
   - Click en **Add SSH key**

5. **Confirma** con tu contraseña de GitHub si te la pide

## Paso 6: Probar la conexión

```bash
ssh -T git@github.com
```

### Respuestas esperadas:

**Primera vez (todos los sistemas):**
```
The authenticity of host 'github.com (IP)' can't be established.
ECDSA key fingerprint is SHA256:xxxxxx.
Are you sure you want to continue connecting (yes/no/[fingerprint])? 
```
Escribe `yes` y presiona Enter.

**Conexión exitosa:**
```
Hi [tu-usuario]! You've successfully authenticated, but GitHub does not provide shell access.
```

**¿Qué significa este mensaje?**
Este mensaje confirma que tu llave SSH funciona correctamente. GitHub no permite acceso directo por SSH, solo para operaciones de Git.

## Paso 7: Configurar Git para usar SSH

### Cambiar URL de repositorio existente:
```bash
# Ver la URL actual
git remote -v

# Cambiar de HTTPS a SSH
git remote set-url origin git@github.com:usuario/repositorio.git
```

### Para clonar nuevos repositorios:
```bash
# En lugar de: git clone https://github.com/usuario/repo.git
# Usa: 
git clone git@github.com:usuario/repo.git
```

## Verificación Final

Prueba hacer un push a un repositorio:

```bash
git add .
git commit -m "Prueba de SSH"
git push origin main
```

Si no te pide contraseña y se sube correctamente, ¡tu configuración SSH está lista!

## Solución de Problemas Comunes

### Error: "Permission denied (publickey)"
- Verifica que copiaste la llave pública completa
- Asegúrate de que el agente SSH esté corriendo
- Confirma que agregaste la llave correcta a GitHub

### Error: "ssh-add: Could not open a connection to your authentication agent"
```bash
# Linux/macOS
eval "$(ssh-agent -s)"

# Windows
Start-Service ssh-agent
```

### Para verificar qué llaves están cargadas:
```bash
ssh-add -l
```

## Comandos de Referencia Rápida

```bash
# Generar llave
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"

# Ver llave pública
cat ~/.ssh/id_ed25519.pub

# Probar conexión
ssh -T git@github.com

# Agregar llave al agente
ssh-add ~/.ssh/id_ed25519
```

---

**¡Felicidades!** Ahora puedes trabajar con GitHub de forma segura usando SSH, sin necesidad de escribir tu contraseña cada vez que hagas push, pull o clone.
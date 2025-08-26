# Tutorial: Crear tu Primer Repositorio y Sincronizarlo con GitHub

Este tutorial te enseñará cómo crear un repositorio local con Git y sincronizarlo con GitHub. Al final, verás que GitHub te da instrucciones similares cuando creas un repositorio nuevo.

## ¿Qué es un repositorio?

Un **repositorio** (o "repo") es como una carpeta especial que Git usa para guardar todos los cambios de tu proyecto a lo largo del tiempo. Es como tener un historial completo de tu código.

## Paso 1: Verificar que Git esté instalado

```bash
git --version
```

**¿Qué esperamos ver?**
Algo como: `git version 2.34.1`

Si Git no está instalado:
- **Linux**: `sudo apt install git` (Ubuntu/Debian) o `sudo yum install git` (CentOS/RHEL)
- **Windows**: Descargar desde [git-scm.com](https://git-scm.com/)
- **macOS**: `brew install git` o descargar desde git-scm.com

## Paso 2: Configurar Git (solo la primera vez)

```bash
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu-email@ejemplo.com"
```

**¿Por qué es importante esto?**
Git necesita saber quién eres para registrar correctamente quién hizo cada cambio en el código.

### Verificar la configuración:
```bash
git config --global --list
```

## Paso 3: Crear tu proyecto local

### Crear una carpeta para tu proyecto:
```bash
mkdir mi-primer-proyecto
cd mi-primer-proyecto
```

### Crear algunos archivos de ejemplo:
```bash
# Crear un archivo README
echo "# Mi Primer Proyecto" > README.md

# Crear un archivo de código simple
echo 'print("Hola, mundo!")' > hola.py
```

**¿Qué acabamos de hacer?**
- Creamos una carpeta para nuestro proyecto
- Agregamos un archivo README.md (descripción del proyecto)
- Agregamos un archivo de código Python simple

## Paso 4: Inicializar el repositorio Git

```bash
git init
```

**¿Qué hace este comando?**
`git init` convierte tu carpeta normal en un repositorio Git. Crea una carpeta oculta `.git` que contiene toda la información de seguimiento.

### Verificar el estado:
```bash
git status
```

**Respuesta esperada:**
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md
	hola.py

nothing added to commit but untracked files present (use "git add" to track them)
```

**¿Qué significa "Untracked files"?**
Son archivos que Git ve pero que aún no está "vigilando". Necesitamos decirle a Git que queremos hacer seguimiento de estos archivos.

## Paso 5: Agregar archivos al área de preparación

```bash
git add README.md hola.py
```

**O agregar todos los archivos de una vez:**
```bash
git add .
```

**¿Qué es el área de preparación?**
Es como una "zona de espera" donde ponemos los archivos que queremos incluir en nuestro próximo commit (guardado).

### Verificar qué agregamos:
```bash
git status
```

**Ahora verás:**
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README.md
	new file:   hola.py
```

## Paso 6: Hacer tu primer commit

```bash
git commit -m "Primer commit: agregar README y archivo hola.py"
```

**¿Qué es un commit?**
Un commit es como tomar una "foto" de tu proyecto en este momento. Es un punto guardado en la historia de tu código al que puedes volver después.

**¿Por qué usar `-m`?**
`-m` significa "message" (mensaje). Siempre debes explicar qué cambios hiciste en cada commit.

### Ver el historial de commits:
```bash
git log --oneline
```

## Paso 7: Crear repositorio en GitHub

### Ir a GitHub:
1. Ve a [github.com](https://github.com)
2. Inicia sesión en tu cuenta
3. Click en el botón **"New"** (verde) o el ícono **"+"** → **"New repository"**

### Configurar el repositorio:
1. **Repository name**: `mi-primer-proyecto`
2. **Description**: "Mi primer repositorio para aprender Git y GitHub"
3. **Public/Private**: Selecciona Public (para que otros puedan verlo)
4. **NO marques** estas opciones:
   - Add a README file
   - Add .gitignore
   - Choose a license

**¿Por qué NO marcar esas opciones?**
Porque ya tenemos archivos locales. Si GitHub crea archivos adicionales, habrá conflictos al sincronizar.

5. Click en **"Create repository"**

## Paso 8: Lo que GitHub te muestra

Después de crear el repositorio, GitHub te mostrará una página con instrucciones. ¡Estas son muy similares a lo que estamos haciendo!

GitHub te dará tres opciones:

### Opción 1: Crear un nuevo repositorio desde línea de comandos
```bash
echo "# mi-primer-proyecto" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:tu-usuario/mi-primer-proyecto.git
git push -u origin main
```

### Opción 2: Subir un repositorio existente (¡esto es lo que nosotros haremos!)
```bash
git remote add origin git@github.com:tu-usuario/mi-primer-proyecto.git
git branch -M main
git push -u origin main
```

### Opción 3: Importar código desde otro repositorio
```bash
git remote add origin git@github.com:tu-usuario/mi-primer-proyecto.git
git push -u origin main
```

## Paso 9: Conectar tu repositorio local con GitHub

**Copia la URL SSH de tu repositorio**
Debe verse como: `git@github.com:tu-usuario/mi-primer-proyecto.git`

```bash
git remote add origin git@github.com:tu-usuario/mi-primer-proyecto.git
```

**¿Qué hace `git remote add origin`?**
- `remote`: Le dice a Git sobre un repositorio remoto (en Internet)
- `add`: Agregar una nueva conexión remota
- `origin`: Es el nombre que le damos a nuestro repositorio remoto (es el nombre estándar)

### Verificar la conexión remota:
```bash
git remote -v
```

**Deberías ver:**
```
origin  git@github.com:tu-usuario/mi-primer-proyecto.git (fetch)
origin  git@github.com:tu-usuario/mi-primer-proyecto.git (push)
```

## Paso 10: Configurar la rama principal

```bash
git branch -M main
```

**¿Qué hace este comando?**
- `branch`: Comando para trabajar con ramas
- `-M`: Renombrar la rama actual
- `main`: El nuevo nombre de la rama

**¿Por qué cambiar a "main"?**
GitHub usa "main" como nombre estándar para la rama principal. Git a veces crea "master" por defecto.

## Paso 11: Subir tu código a GitHub

```bash
git push -u origin main
```

**Explicación de parámetros:**
- `push`: Subir cambios al repositorio remoto
- `-u`: Establecer conexión de seguimiento (solo necesario la primera vez)
- `origin`: El nombre de nuestro repositorio remoto
- `main`: La rama que queremos subir

**Si todo sale bien, verás:**
```
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (4/4), 314 bytes | 314.00 KiB/s, done.
Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:tu-usuario/mi-primer-proyecto.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## Paso 12: Verificar en GitHub

1. Ve a tu repositorio en GitHub: `https://github.com/tu-usuario/mi-primer-proyecto`
2. Deberías ver:
   - Tu archivo README.md
   - Tu archivo hola.py
   - El mensaje de commit que escribiste

## Comparación con las Instrucciones de GitHub

¿Notaste que lo que hicimos es muy similar a lo que GitHub sugiere? La diferencia principal es el orden:

**Nuestro método (repositorio local primero):**
1. Crear proyecto local
2. `git init`
3. Agregar archivos y hacer commit
4. Crear repositorio en GitHub
5. Conectar y hacer push

**Método de GitHub (repositorio remoto primero):**
1. Crear repositorio en GitHub
2. Clonar o crear local
3. Agregar archivos y hacer commit
4. Hacer push

**Ambos métodos son válidos**. El nuestro te enseña más sobre cómo funciona Git desde cero.

## Flujo de Trabajo Básico para el Futuro

Ahora que tienes todo configurado, para futuros cambios solo necesitas:

```bash
# 1. Hacer cambios en tus archivos
echo 'print("Nuevo cambio!")' >> hola.py

# 2. Ver qué cambió
git status
git diff

# 3. Agregar cambios
git add .

# 4. Hacer commit
git commit -m "Agregar nueva línea de código"

# 5. Subir a GitHub
git push
```

**¿Por qué ya no necesitamos `-u origin main`?**
Porque ya establecimos la conexión de seguimiento en el primer push.

## Comandos Útiles para el Día a Día

```bash
# Ver estado de archivos
git status

# Ver diferencias antes de hacer commit
git diff

# Ver historial de commits
git log --oneline

# Ver repositorios remotos conectados
git remote -v

# Traer cambios desde GitHub (si trabajas desde múltiples computadoras)
git pull
```

## Solución de Problemas Comunes

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin git@github.com:tu-usuario/mi-primer-proyecto.git
```

### Error: "failed to push some refs"
```bash
# Si el repositorio remoto tiene archivos que no tienes localmente
git pull --rebase origin main
git push
```

### Verificar si SSH funciona
```bash
ssh -T git@github.com
```

## ¡Felicidades!

Has creado exitosamente tu primer repositorio y lo has sincronizado con GitHub. Ahora sabes:

- Cómo inicializar un repositorio Git
- Cómo hacer commits
- Cómo conectar con GitHub
- Cómo subir tu código
- Que GitHub te da instrucciones similares cuando creas repositorios

**Próximos pasos recomendados:**
- Practica haciendo más cambios y commits
- Explora tu repositorio en GitHub
- Aprende sobre ramas (branches)
- Colabora con otros desarrolladores
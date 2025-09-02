# Tutorial Completo: Gestion de Proyectos en Equipo con GitHub

Guia super practica para manejar tu proyecto grupal en GitHub como un profesional. Desde crear el repositorio hasta hacer el merge final para presentar. Todo via terminal y SSH.

## Lo que vas a lograr

Despues de seguir esta guia tendras:
- Tu proyecto configurado en GitHub de forma privada
- Todos los integrantes trabajando en ramas separadas
- Un flujo de trabajo profesional para el equipo
- Control total de versiones y cambios
- Base solida para entregar proyectos grupales sin problemas

## Lo que necesitas antes de empezar

- Una cuenta en GitHub (gratis)
- Git instalado en tu maquina
- Terminal (PowerShell, WSL2, o bash)
- Un proyecto grupal (2-4 personas idealmente)
- 30 minutos para configurar todo
- Ganas de trabajar como un desarrollador real

---

## PASO 1: Configurar SSH con GitHub (IMPORTANTE)

### Por que SSH?
SSH es mas seguro y no tienes que escribir tu usuario/password cada vez que haces push. Una vez configurado, es automatico.

### Generar tu clave SSH

```bash
# Generar nueva clave SSH
ssh-keygen -t ed25519 -C "tu-email@gmail.com"

# Presiona Enter 3 veces (acepta todo por defecto)
# Se crean 2 archivos: id_ed25519 (privada) e id_ed25519.pub (publica)
```

### Agregar clave al agente SSH

```bash
# Iniciar agente SSH
eval "$(ssh-agent -s)"

# Agregar tu clave privada
ssh-add ~/.ssh/id_ed25519
```

### Copiar clave publica a GitHub

```bash
# Ver tu clave publica
cat ~/.ssh/id_ed25519.pub

# Copia TODO el output que aparece
```

Ahora ve a GitHub:
1. Ve a Settings > SSH and GPG keys
2. Click "New SSH key"
3. Pon un titulo como "Mi laptop personal"
4. Pega la clave que copiaste
5. Click "Add SSH key"

### Probar que funcione

```bash
# Probar conexion SSH
ssh -T git@github.com

# Deberia decir: "Hi usuario! You've successfully authenticated"
```

---

## PASO 2: Crear y Configurar Repositorio

### Crear el repositorio

**Quien debe hacerlo:** El "lider" del equipo o quien tenga mas experiencia.

1. Ve a GitHub.com
2. Click el "+" arriba derecha > "New repository"
3. Nombre: `proyecto-equipo-X` (donde X es tu nombre de equipo)
4. Descripcion: "Proyecto final - [nombre del curso/materia]"
5. **IMPORTANTE:** Marca "Private" (repositorio privado)
6. Marca "Add a README file"
7. Click "Create repository"

### Clonar el repositorio

```bash
# Ir a tu carpeta de proyectos
cd ~/proyectos
# o
cd Desktop

# Clonar el repo (usa SSH, no HTTPS!)
git clone git@github.com:usuario/proyecto-equipo-X.git
cd proyecto-equipo-X
```

### Configurar Git localmente

```bash
# Configurar tu nombre y email (solo primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@gmail.com"

# Verificar configuracion
git config --list
```

---

## PASO 3: Agregar Colaboradores al Proyecto

**Solo el propietario del repo puede hacer esto:**

1. En tu repositorio de GitHub: Settings > Manage access
2. Click "Invite a collaborator"
3. Escribir el username de GitHub de cada companero
4. Click "Add [usuario] to this repository"
5. Repetir para cada integrante

**Los colaboradores deben:**
1. Revisar su email y aceptar la invitacion
2. Clonar el repositorio con SSH:

```bash
git clone git@github.com:propietario/proyecto-equipo-X.git
cd proyecto-equipo-X
```

---

## PASO 4: Crear Estructura de Ramas

### Entender el flujo de trabajo

```
main (rama principal - solo para releases/entregas)
 |
dev (rama de desarrollo - donde se junta todo)
 |-- feature/login (rama de Juan)
 |-- feature/dashboard (rama de Maria)
 |-- feature/api (rama de Carlos)
 |-- feature/frontend (rama de Ana)
```

### Crear rama de desarrollo

**El lider del equipo hace esto:**

```bash
# Crear y cambiar a rama dev
git checkout -b dev
git push origin dev

# Definir dev como rama por defecto para pull requests
# (esto se hace en GitHub: Settings > Branches > Default branch)
```

### Cada integrante crea su rama

**Cada persona del equipo:**

```bash
# Asegurarse de estar en dev
git checkout dev
git pull origin dev

# Crear tu rama personal (cambiar "login" por tu funcionalidad)
git checkout -b feature/login

# Subir tu rama al repositorio
git push -u origin feature/login
```

**Ejemplos de nombres de ramas por responsabilidad:**
- `feature/autenticacion` - Login, registro, sesiones
- `feature/frontend` - Interfaces, CSS, componentes visuales  
- `feature/backend` - API, base de datos, servidor
- `feature/testing` - Pruebas, validaciones, debugging

---

## PASO 5: Flujo de Trabajo Diario

### Antes de empezar a trabajar cada dia

```bash
# 1. Cambiar a tu rama
git checkout feature/tu-funcionalidad

# 2. Traer ultimos cambios de dev
git checkout dev
git pull origin dev

# 3. Regresar a tu rama y actualizar
git checkout feature/tu-funcionalidad
git merge dev

# 4. Ahora puedes trabajar tranquilo
```

### Despues de trabajar (guardar cambios)

```bash
# Ver que archivos cambiaste
git status

# Agregar archivos modificados
git add .
# o especificos: git add archivo1.js archivo2.css

# Hacer commit con mensaje descriptivo
git commit -m "agregar sistema de login con validacion"

# Subir cambios a tu rama
git push origin feature/tu-funcionalidad
```

### Mensajes de commit efectivos

**Buenos ejemplos:**
```bash
git commit -m "agregar formulario de login con validacion"
git commit -m "corregir error en conexion a base de datos"
git commit -m "actualizar estilos del dashboard principal"
```

**Malos ejemplos:**
```bash
git commit -m "cambios"
git commit -m "fix"
git commit -m "actualizar codigo"
```

---

## PASO 6: Integrar tu Trabajo (Merge a dev)

### Cuando terminas una funcionalidad

**En GitHub (Pull Request):**

1. Ve a tu repositorio en GitHub
2. Click "Compare & pull request" (deberia aparecer automaticamente)
3. **Base:** dev <- **Compare:** feature/tu-funcionalidad
4. Titulo: "Agregar [tu funcionalidad]"
5. Descripcion:
   ```
   ## Que se agrego:
   - Login con validacion
   - Manejo de sesiones
   - Pagina de registro
   
   ## Como probar:
   - Correr `npm start`
   - Ir a /login
   - Usar credenciales: admin/123456
   ```
6. Click "Create pull request"

### Revision del equipo

**Todos los integrantes deben:**
1. Revisar el Pull Request
2. Probar el codigo localmente:
   ```bash
   git checkout feature/funcionalidad-del-companero
   git pull origin feature/funcionalidad-del-companero
   # probar que funcione...
   ```
3. Dejar comentarios si hay problemas
4. Hacer "Approve" si todo esta bien

### Hacer el merge

**El lider del equipo o quien creo el PR:**
1. Click "Merge pull request"
2. Click "Confirm merge"
3. Click "Delete branch" (limpiar rama ya integrada)

**Todos deben actualizar dev:**
```bash
git checkout dev
git pull origin dev
```

---

## PASO 7: Preparar Release Final

### Cuando todo esta listo para entregar

```bash
# 1. Todos los features deben estar en dev
git checkout dev
git pull origin dev

# 2. Hacer merge final a main
git checkout main
git pull origin main
git merge dev

# 3. Crear tag de version
git tag -a v1.0.0 -m "Version final del proyecto"
git push origin main --tags

# 4. Crear release en GitHub
# Ve a GitHub > Releases > Create a new release
# Tag: v1.0.0
# Title: "Proyecto Final v1.0.0"
# Descripcion de que incluye el proyecto
```

---

## PASO 8: Comandos Utiles del Dia a Dia

### Ver estado del repositorio

```bash
# Ver que cambios tienes pendientes
git status

# Ver diferencias de lo que cambio
git diff

# Ver historial de commits
git log --oneline

# Ver todas las ramas
git branch -a
```

### Cambiar entre ramas

```bash
# Ver en que rama estas
git branch

# Cambiar a otra rama
git checkout nombre-rama

# Crear nueva rama y cambiar a ella
git checkout -b nueva-rama
```

### Actualizar tu rama con dev

```bash
# Traer ultimos cambios de dev a tu rama
git checkout tu-rama
git merge dev

# Si hay conflictos, Git te dira cuales archivos revisar
```

---

## PASO 9: Solucionar Conflictos (Super Importante)

### Que es un conflicto?

Sucede cuando 2 personas modifican las mismas lineas de codigo. Git no sabe cual version mantener.

### Como solucionarlo

1. **Git te avisa que hay conflicto:**
   ```bash
   git merge dev
   # CONFLICT (content): Merge conflict in archivo.js
   ```

2. **Abrir el archivo con conflicto:**
   ```javascript
   // Veras algo asi:
   <<<<<<< HEAD
   let nombre = "Juan";
   =======
   let nombre = "Maria";
   >>>>>>> dev
   ```

3. **Decidir que version mantener:**
   ```javascript
   // Opcion 1: mantener solo tu version
   let nombre = "Juan";
   
   // Opcion 2: mantener la de dev
   let nombre = "Maria";
   
   // Opcion 3: combinar ambas (si tiene sentido)
   let nombres = ["Juan", "Maria"];
   ```

4. **Guardar y completar merge:**
   ```bash
   git add archivo.js
   git commit -m "resolver conflicto en nombre de usuario"
   ```

### Prevenir conflictos

- Hacer merge de dev a tu rama frecuentemente
- Coordinar que archivos va a modificar cada quien
- Hacer commits pequenos y frecuentes

---

## PASO 10: Buenas Practicas para el Equipo

### Comunicacion

- **Canal de Slack/WhatsApp:** Avisar cuando haces push importantes
- **Reuniones cortas:** 15 min cada 2-3 dias para sincronizar
- **Documentar:** Dejar comentarios en Pull Requests explicando cambios

### Organizacion de codigo

```
proyecto/
├── README.md
├── src/
│   ├── components/    (Juan - frontend)
│   ├── services/      (Maria - API)
│   ├── utils/         (Carlos - utilidades)
│   └── styles/        (Ana - CSS)
├── docs/             (documentacion)
└── tests/           (pruebas)
```

### Commits y mensajes

```bash
# Formato recomendado:
git commit -m "tipo: descripcion corta

- detalle 1
- detalle 2
- detalle 3"

# Ejemplos:
git commit -m "feature: agregar login con JWT"
git commit -m "fix: corregir error en validacion de email"
git commit -m "style: actualizar colores del dashboard"
```

### Antes de entregar

**Checklist final:**
- [ ] Todos los features funcionan individualmente
- [ ] Integration testing entre componentes  
- [ ] README actualizado con instrucciones de instalacion
- [ ] Codigo comentado en partes complejas
- [ ] No hay passwords o keys hardcodeadas
- [ ] Todos los archivos innecesarios en .gitignore

---

## Solucion de Problemas Comunes

### ERROR: "Permission denied (publickey)"
**Problema:** SSH no esta configurado correctamente
```bash
# Verificar que tu clave esta agregada
ssh-add -l

# Si no aparece tu clave:
ssh-add ~/.ssh/id_ed25519

# Probar conexion
ssh -T git@github.com
```

### ERROR: "fatal: not a git repository"
**Problema:** No estas en la carpeta correcta
```bash
# Ver donde estas
pwd

# Ir a tu proyecto
cd ruta/a/tu/proyecto
```

### ERROR: "Your branch is behind origin/dev"
**Problema:** Tu rama esta desactualizada
```bash
# Actualizar tu rama
git pull origin dev
```

### ERROR: "fatal: refusing to merge unrelated histories"
**Problema:** Historiales de Git no coinciden
```bash
# Forzar merge (usar con cuidado)
git merge dev --allow-unrelated-histories
```

### Mi companero no ve mis cambios
**Problema:** No has hecho push
```bash
# Subir tus cambios
git push origin tu-rama

# Tu companero debe:
git checkout tu-rama
git pull origin tu-rama
```

---

## Flujo Completo Resumido

### Setup inicial (una sola vez)
1. Configurar SSH
2. Crear repositorio privado  
3. Agregar colaboradores
4. Clonar proyecto
5. Crear rama dev
6. Cada persona crea su rama feature

### Trabajo diario
1. `git checkout dev && git pull origin dev`
2. `git checkout tu-rama && git merge dev`  
3. Trabajar en tu codigo
4. `git add . && git commit -m "mensaje"`
5. `git push origin tu-rama`

### Integracion semanal
1. Crear Pull Request en GitHub
2. Revision del equipo
3. Merge a dev
4. Todos actualizan: `git checkout dev && git pull origin dev`

### Entrega final
1. Todo en dev funcionando
2. Merge dev -> main  
3. Crear tag y release
4. Entregar enlace al repositorio

---

## Recursos Adicionales

### Comandos de emergencia

```bash
# Deshacer ultimo commit (mantiene cambios)
git reset --soft HEAD~1

# Deshacer cambios no guardados
git checkout -- archivo.js

# Ver quien modifico cada linea
git blame archivo.js

# Buscar en commits anteriores
git log --grep="login"
```

### GitHub Desktop (alternativa grafica)

Si prefieres interfaz grafica:
1. Descargar GitHub Desktop
2. Clonar repositorio desde la app
3. Cambiar ramas con clicks
4. Hacer commits visualmente

Pero recomiendo dominar terminal primero.

---

## Resumen

Felicitaciones! Ya tienes todo lo necesario para manejar proyectos grupales como un desarrollador profesional. Este flujo de trabajo es el mismo que usan equipos en Google, Microsoft, y startups exitosas.

**Lo que lograste:**
- Control de versiones profesional
- Trabajo colaborativo sin pisarse
- Integracion continua de cambios
- Historial completo del proyecto
- Base para proyectos mas grandes

**Siguiente nivel:**
- GitHub Actions (automatizacion)
- Protected branches (seguridad)
- Code reviews obligatorias
- Integration con herramientas de desarrollo

Con esto ya pueden entregar cualquier proyecto grupal con la tranquilidad de tener todo organizado, respaldado y funcionando. A programar en equipo!
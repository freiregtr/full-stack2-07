# Taller Git + SSH en WSL

> **Propósito (ingeniería de requerimientos):** Al finalizar, cada estudiante podrá trabajar con un repositorio vía **SSH** en **WSL (Ubuntu)**, utilizando un modelo simple de ramas (**main/dev/feature-sprint**) y creando un **Pull Request** (PR) revisable.

---

## Objetivos de aprendizaje

1. **Instalar** Git y OpenSSH en WSL.
2. **Configurar** identidad de Git y claves SSH (agente, prueba de conexión).
3. **Sincronizar** con GitHub por SSH.
4. **Clonar** un repositorio y revisar remotos.
5. **Ramificar** con un modelo claro: `main`, `dev` y `feature/…` o `sprint/…`.
6. **Trabajar con PRs**: cambios mínimos, push y apertura de PR.

> **Resultados mínimos por alumno:** clave SSH registrada, repo clonado por SSH, rama de trabajo publicada y PR abierto contra `dev`.

---

## Prerrequisitos

* **Prerrequisitos:**

  * Windows 10/11 con **WSL** (Ubuntu) instalado y funcionando.
  * Cuenta de **GitHub** abierta en el navegador.
  * Concepto de terminal básico (cd, ls, etc.).

**Verificación rápida (2’)**

```bash
lsb_release -a     # comprobar distro
wsl --status       # (desde PowerShell) estado general de WSL
```

---

## Mapa del taller (módulos y tiempos estimados)

* **M0. Prerrequisitos** (5’)
* **M1. Instalación y ajustes base** (10’)
* **M2. SSH keys + agente** (15’)
* **M3. Clonado y remotos** (10’)
* **M4. Modelo de ramas** (15’)
* **M5. Pull Request** (15’)
* **M6. (Opcional) Conflictos/Revert/Stash** (15–20’)

---

## Conceptos claves

* **Git:** sistema de control de versiones distribuido. Guarda *snapshots* de tu proyecto, permite experimentar sin romper la línea principal.
* **SSH:** protocolo seguro para autenticación y transferencia. Evita contraseñas en cada operación remota.
* **Clave SSH (par público/privado):** la **privada** se queda contigo; la **pública** se registra en GitHub. Juntas prueban que “tú eres tú”.
* **Agente SSH:** proceso en memoria que “recuerda” tu clave privada para no reingresarla todo el tiempo.
* **Remoto `origin`:** referencia local al repositorio alojado en GitHub.
* **Ramas:** líneas de trabajo paralelas. Modelo sugerido: `main` (estable), `dev` (integración) y `feature/sprint-*` (trabajo diario por tarea).
* **Pull Request (PR):** propuesta de cambios desde una rama a otra. Punto de revisión, discusión y validación antes de mezclar.
* **Fast-forward vs Merge:** si el historial permite avanzar sin bifurcación → *fast-forward* (línea recta). Si hay bifurcaciones → *merge* crea una unión explícita.
* **CRLF vs LF:** Windows usa **CRLF**, Linux **LF**. Para evitar ruidos en diffs, en WSL configuramos `core.autocrlf=input`.

---

## M1. Instalar herramientas y configurar Git

```bash
sudo apt update
sudo apt install -y git openssh-client

# Identidad básica
git config --global user.name "Nombre Apellido"
git config --global user.email "tu_email@ejemplo.com"

# Rama por defecto y saltos de línea
git config --global init.defaultBranch main
git config --global core.autocrlf input

# (Opcional) Editor por defecto si usan VS Code
# git config --global core.editor "code --wait"

git --version
git config --global -l
```

> **Checklist de éxito:** Git instalado, identidad y preferencias listadas por `git config --global -l`.

---

## M2. Crear clave SSH, cargar en agente y registrar en GitHub

```bash
# 1) Generar clave tipo ed25519
ssh-keygen -t ed25519 -C "tu_email@ejemplo.com"

# 2) Levantar agente y agregar la clave privada
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 3) Copiar clave pública al portapapeles de Windows
cat ~/.ssh/id_ed25519.pub | clip.exe
```

**Luego en GitHub:** *Settings → SSH and GPG keys → New SSH key* → pegar y guardar.

**Probar autenticación:**

```bash
ssh -T git@github.com
# Esperado: "Hi <usuario>! You've successfully authenticated..."
```

> **Nota:** tras reiniciar terminal o PC, el agente puede no recordar la clave. Usa la “chuleta post-reinicio” (abajo) para re-cargarla.

---

## M3. Clonar un repositorio por SSH y revisar remotos

```bash
cd ~
git clone git@github.com:ORG/REPO.git
cd REPO

git remote -v  # verifica URLs por SSH
```

> **Tip:** si ves `https://` en el remoto, puedes cambiarlo a SSH:

```bash
git remote set-url origin git@github.com:ORG/REPO.git
```

---

## M4. Modelo de ramas: main/dev/feature (o sprint)

```bash
# Asegurar main local y traqueo
git checkout -B main
git pull --ff-only origin main || true
git push -u origin main

# Crear dev desde main y publicarla
git checkout -b dev
git push -u origin dev

# Rama de trabajo (elige convención: feature/ o sprint/)
git checkout -b feature/readme-inicial
echo -e "\n## Hola Git" >> README.md

git add README.md
git commit -m "docs: agrega sección Hola Git"

git push -u origin feature/readme-inicial
```

> **Criterio de éxito:** `git branch -a` muestra ramas locales y remotas; la rama de trabajo está publicada.

---


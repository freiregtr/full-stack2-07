# Reglas de Negocio - Instituto DUOC

## Entidades

**Alumno:**
- nombre
- apellido
- rut
- dirección

**Profesor:**
- nombre
- apellido
- rut
- dirección
- sueldo

**Empleado:**
- nombre
- apellido
- rut
- dirección
- sueldo
- tipo: administrativo o mantenimiento

**Dirección:**
- calle
- número
- piso
- departamento
- código postal
- localidad

**Sala:**
- número
- tamaño (metros por metros)
- cantidad de escritorios
- tipo pizarra (digital o normal)

**Ala:**
- cantidad de pisos
- nombre

**Carrera:**
- nombre
- cantidad de materias
- cantidad de años estimados

## Reglas Generales

- Cada entidad contará con un id propio
- Cada entidad contará con fecha de alta y modificación
- Al dar de alta un alumno, se le puede asignar una carrera
- Al dar de alta un profesor, se le pueden asignar una o más carreras
- Al dar de alta un empleado, se le puede asignar un ala
- Al dar de alta una sala, se le puede asignar un ala
- Un ala puede contar con varias salas

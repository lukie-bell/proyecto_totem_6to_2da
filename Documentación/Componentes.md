# Componentes principales

## Formulario de Inicio
- Permite a los padres solicitar un turno para hablar con una autoridad de la escuela.
- Envía los datos ingresados (nombre, motivo, fecha deseada, etc.) al Servidor Web.

## Login
- Módulo de autenticación para administradores.
- Verifica credenciales y, si son correctas, otorga acceso a la Pantalla de Empleados.

## Pantalla de Empleados
- Muestra los turnos solicitados por los usuarios.
- Permite eliminar turnos ya atendidos o cancelados.
- Se comunica con el Servidor Web para obtener y modificar la información.

## Servidor Web
- Gestiona toda la lógica del sistema.
- Recibe los datos del formulario, los valida y los almacena en la base de datos.
- Envía la información a la Pantalla de Empleados y al Login según las solicitudes.
- Puede incluir un submódulo de notificaciones para informar sobre nuevos turnos.

## Base de Datos
- Guarda los registros de turnos, usuarios y empleados.
- Solo es accedida a través del Servidor Web.

# Relaciones entre componentes
- **Formulario de Inicio → Servidor Web → Base de Datos**
- **Login → Servidor Web → Base de Datos**
- **Pantalla de Empleados ↔ Servidor Web ↔ Base de Datos**

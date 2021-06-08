export default function validarIniciarSesion(valores) {
  let errores = {};

  // Validar el email
  if (!valores.username) {
    errores.username = "El username es obligatorio";
  }

  // Validar el password
  if (!valores.password) {
    errores.password = "El password es obligatorio";
  } else if (valores.password.length < 8) {
    errores.password = "El password debe ser al menos 8 caracteres";
  }

  return errores;
}

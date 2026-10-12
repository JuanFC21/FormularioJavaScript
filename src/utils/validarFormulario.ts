import { revisarContrasena } from "./validaciones/revisarContrasena";
import { validarCorreo } from "./validaciones/validarCorreo";
import { validarEdad } from "./validaciones/validarEdad";
import { validarNombre } from "./validaciones/validarNombre";



export function obtenerErrores(
  nombre: string,
  correo: string,
  contrasena: string,
  edad: string
) {
  const errores: Record<string, string> = {};

  

  if (!validarNombre(nombre)) {
    errores.nombre = 'El nombre debe tener al menos 3 letras.';
  }

  

  if (!validarCorreo(correo)) {
    errores.correo = 'Ingresa un correo electrónico válido.';
  }

  


  const requisitos = revisarContrasena(contrasena);

  if (
    !requisitos.cumpleLongitud ||
    !requisitos.tieneMayuscula ||
    !requisitos.tieneMinuscula ||
    !requisitos.tieneNumero
  ) {
    errores.contrasena =
      'Usa al menos 8 caracteres, una mayúscula, una minúscula y un número.';
  }

  
  if (!validarEdad(edad)) {
    errores.edad = 'Ingresa una edad entera entre 18 y 120 años.';
  }

  return errores;
}

export function validarCorreo(correo: string): boolean {
    const texto = correo.trim();

    const arroba = texto.indexOf('@');
    const ultimaArroba = texto.lastIndexOf('@');
    const punto = texto.lastIndexOf('.');

    if (arroba <= 0) return false;
    if (arroba !== ultimaArroba) return false;
    if (punto <= arroba + 1) return false;
    if (punto === texto.length - 1) return false;

    for (const letra of texto) {
      if (letra.trim() === '') {
        return false;
      }
    }

    return true;
  }
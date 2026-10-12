
  export function validarNombre(nombre: string): boolean {
    const texto = nombre.trim();
    let cantidadLetras = 0;

    for (const letra of texto) {
      if (letra.toLowerCase() !== letra.toUpperCase()) {
        cantidadLetras++;
      } else if (letra.trim() !== '') {
        return false;
      }
    }

    return cantidadLetras >= 3;
  }
 export function soloNumeros(texto: string): boolean {
    for (const letra of texto) {
      if (letra < '0' || letra > '9') {
        return false;
      }
    }

    return true;
  }


  export function validarEdad(edad: string): boolean {
    if (edad === '') return false;
    if (!soloNumeros(edad)) return false;

    const numero = Number(edad);

    return numero >= 18 && numero <= 120;
  }
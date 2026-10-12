export function revisarContrasena(contrasena: string) {
    let tieneMayuscula = false;
    let tieneMinuscula = false;
    let tieneNumero = false;

    for (const letra of contrasena) {
      if (letra >= 'A' && letra <= 'Z') {
        tieneMayuscula = true;
      }

      if (letra >= 'a' && letra <= 'z') {
        tieneMinuscula = true;
      }

      if (letra >= '0' && letra <= '9') {
        tieneNumero = true;
      }
    }

    return {
      cumpleLongitud: contrasena.length >= 8,
      tieneMayuscula,
      tieneMinuscula,
      tieneNumero
    };
  }
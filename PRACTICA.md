# Formulario de validación en Ionic

## Objetivo general

Crear un formulario híbrido que valide datos de entrada con expresiones regulares, operadores y estructuras de control de JavaScript, mostrando errores por campo y una confirmación cuando todo es válido.

## Tecnologías

- Ionic React para la interfaz móvil.
- React 19 para componentes y estado.
- TypeScript para tipos y anotaciones.
- JavaScript para expresiones regulares, operadores y reglas de validación.
- Vite para desarrollo y compilación.

## Campos y reglas

| Campo | Regla |
|---|---|
| Nombre completo | Se eliminan espacios externos; acepta letras Unicode y espacios, con un mínimo de tres letras. Números y símbolos se rechazan. |
| Correo | Estructura razonable `texto@texto.dominio`; los espacios externos se eliminan. No confirma que la cuenta exista. |
| Contraseña | Mínimo ocho caracteres, una mayúscula ASCII, una minúscula ASCII y un dígito. |
| Edad | Solo dígitos y valor entero entre 18 y 120. |

Los mensajes de error aparecen debajo de cada campo. Al editar un campo se limpia su error; al enviar se validan todos. El éxito se muestra únicamente cuando no hay errores. El botón con icono de ojo cambia el tipo del campo entre texto y contraseña; los requisitos se indican visualmente mientras se escribe.

## Expresiones regulares

- Nombre: `/^[\p{L}\s]+$/u` permite letras Unicode y espacios. `match(/\p{L}/gu)` cuenta las letras para comprobar el mínimo de tres; así, los espacios no cuentan.
- Correo: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` comprueba una estructura básica con `@` y un punto posterior.
- Contraseña: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/` usa anticipaciones para exigir minúscula, mayúscula y dígito, además de ocho caracteres.
- Edad: `/^\d+$/` acepta uno o más dígitos. En el campo también se filtran entradas que no sean dígitos.
- `.test(texto)` devuelve `true` si el texto cumple el patrón.

Estas comprobaciones son del lado de la interfaz. No verifican una cuenta de correo ni reemplazan validaciones de un servidor.

## Operadores utilizados en el código

| Símbolo | Significado | Ejemplo |
|---|---|---|
| `=` | Asignación | `const regexEdad = /^\d+$/;` |
| `>=`, `<`, `>` | Comparación de rangos | `contrasena.length >= 8`, `Number(edad) < 18`, `Number(edad) > 120` |
| `===` | Igualdad estricta | `Object.keys(nuevosErrores).length === 0` |
| `!` | Negación | `!regexEdad.test(edad)` |
| `||` | OR lógico; basta una condición | Rechaza si nombre inválido **o** tiene menos de tres letras. |
| `? :` | Operador ternario | `mostrarContrasena ? 'text' : 'password'` |
| `??` | Valor alternativo ante `null` o `undefined` | `e.detail.value ?? ''` |

No hay operaciones aritméticas, asignaciones compuestas (`+=`, etc.), comparaciones `<=`/`!==` ni el operador `&&` en la lógica de la aplicación; no son necesarios para estas reglas. Los `&&` dentro del patrón de contraseña son parte de la sintaxis de expresiones regulares (anticipaciones), no el operador lógico de JavaScript.

## Variables, tipos y funciones

- Los estados `nombre`, `correo`, `contrasena` y `edad` guardan cadenas; los valores de un campo pueden estar temporalmente vacíos. `mostrarContrasena` y `registrado` son booleanos.
- `errores` es un objeto `Record<string, string>` que relaciona cada campo con su mensaje. `useState` crea y actualiza estos estados.
- `cumpleLongitud`, `tieneMayuscula`, `tieneMinuscula` y `tieneNumero` son booleanos derivados de la contraseña actual.
- `validarFormulario` recibe el evento del formulario, evita el envío tradicional con `preventDefault()`, calcula los errores y actualiza el estado.
- `limpiarError` recibe el nombre del campo, copia el objeto de errores y elimina la entrada correspondiente. Se usa una copia para actualizar el estado de React.
- `Number(edad)` convierte la cadena a número para comparar límites. El patrón verifica antes que la cadena contenga solo dígitos.
- También se usan `.trim()`, `.length`, `.match()` y `Object.keys()`.

## Flujo del formulario

1. Cada `IonInput` actualiza su estado con `onIonInput`.
2. Al editar un campo, se borra su error previo y se oculta cualquier confirmación anterior.
3. Al pulsar «Validar formulario», el evento se detiene y se comprueba cada regla.
4. Se guardan todos los errores encontrados. Si el objeto está vacío, aparece el mensaje de registro válido.

## Casos de prueba manuales

| Datos introducidos | Resultado esperado |
|---|---|
| Ana López, ana@example.com, `Clave123`, 25 | Sin errores; aparece éxito. |
| Todos los campos vacíos | Error en los cuatro campos. |
| Nombre `Al` | Error: mínimo tres letras. |
| Nombre `Ana2` o `A!na` | Error: solo letras y espacios. |
| Correo `ana@correo` | Error de correo. |
| Contraseña `clave123` | Error por falta de mayúscula. |
| Contraseña `CLAVE123` | Error por falta de minúscula. |
| Contraseña `Claveabc` | Error por falta de número. |
| Contraseña `Abc123` | Error por longitud. |
| Edad `17` o `121` | Error por estar fuera del rango. |
| Edad `20.5` o `-2` | La entrada se rechaza o queda vacía; al validar, error de edad. |
| Corregir un campo después de un error | El error de ese campo desaparece; los demás errores permanecen hasta corregirlos o reenviar. |
| Pulsar el botón de ojo | Alterna entre contraseña visible y oculta. |
| Corregir todos los datos y reenviar | Desaparecen errores y aparece el éxito. |

## Conclusiones

La práctica combina validación con expresiones regulares, comparación de valores y estado de React. Se observa cómo mantener los datos del formulario y sus mensajes sincronizados con la interfaz Ionic. La validación de cliente mejora la experiencia, mientras que una aplicación real también debe validar los datos en el servidor.

## Ejecución

Instala dependencias con `npm install` si aún no están instaladas y ejecuta `npm run dev`. Vite mostrará la dirección local para abrir la aplicación. `npm run build` comprueba tipos de TypeScript y genera la compilación.

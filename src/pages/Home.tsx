
import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonText,
  IonItem,
  IonIcon
} from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

import './Home.css';

const Home: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [edad, setEdad] = useState('');

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [registrado, setRegistrado] = useState(false);

  const cumpleLongitud = contrasena.length >= 8;
  const tieneMayuscula = /[A-Z]/.test(contrasena);
  const tieneMinuscula = /[a-z]/.test(contrasena);
  const tieneNumero = /\d/.test(contrasena);

  const limpiarError = (campo: string) => {
    setErrores((actuales) => {
      const siguientes = { ...actuales };
      delete siguientes[campo];
      return siguientes;
    });
    setRegistrado(false);
  };

  const validarFormulario = (event: React.FormEvent) => {
    event.preventDefault();

    const nuevosErrores: Record<string, string> = {};

    // Validar nombre con expresión regular
    const nombreLimpio = nombre.trim();
    const regexNombre = /^[\p{L}\s]+$/u;

    if (!regexNombre.test(nombreLimpio) || (nombreLimpio.match(/\p{L}/gu) ?? []).length < 3) {
      nuevosErrores.nombre =
        'El nombre debe tener al menos 3 letras.';
    }

    // Validar correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(correo.trim())) {
      nuevosErrores.correo =
        'Ingresa un correo electrónico válido.';
    }

    // Validar contraseña
    const regexContrasena =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regexContrasena.test(contrasena)) {
      nuevosErrores.contrasena =
        'Usa al menos 8 caracteres, una mayúscula, una minúscula y un número.';
    }

    // Validar edad
    const regexEdad = /^\d+$/;

    if (
      !regexEdad.test(edad) ||
      Number(edad) < 18 ||
      Number(edad) > 120
    ) {
      nuevosErrores.edad =
        'Ingresa una edad entera entre 18 y 120 años.';
    }

    setErrores(nuevosErrores);
    setRegistrado(Object.keys(nuevosErrores).length === 0);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Formulario de registro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="registro-fondo">
        <IonCard className="registro-card">
          <IonCardHeader>
            <IonCardTitle>
              Crea tu cuenta
            </IonCardTitle>
            <IonText color="medium">
              <p>
                Completa tus datos y valida la información.
              </p>
            </IonText>
          </IonCardHeader>

          <IonCardContent>
            <form onSubmit={validarFormulario}>
              <div className="formulario-grid">

                {/* Columna izquierda: nombre y correo */}
                <div className="campo-formulario">
                  <IonItem>
                    <IonInput
                      label="Nombre completo"
                      labelPlacement="stacked"
                      placeholder="Ej. Juan Pérez"
                      value={nombre}
                      onIonInput={(e) => {
                        setNombre(e.detail.value ?? '');
                        limpiarError('nombre');
                      }}
                    />
                  </IonItem>

                  {errores.nombre && (
                    <IonText color="danger">
                      <p className="mensaje-error">{errores.nombre}</p>
                    </IonText>
                  )}
                </div>

                <div className="campo-formulario">
                  <IonItem>
                    <IonInput
                      type="email"
                      label="Correo electrónico"
                      labelPlacement="stacked"
                      placeholder="ejemplo@correo.com"
                      value={correo}
                      onIonInput={(e) => {
                        setCorreo(e.detail.value ?? '');
                        limpiarError('correo');
                      }}
                    />
                  </IonItem>

                  {errores.correo && (
                    <IonText color="danger">
                      <p className="mensaje-error">{errores.correo}</p>
                    </IonText>
                  )}
                </div>

                {/* Columna izquierda: contraseña y sus requisitos */}
                <div className="campo-formulario">
                  <IonItem>
                    <IonInput
                      type={mostrarContrasena ? 'text' : 'password'}
                      label="Contraseña"
                      labelPlacement="stacked"
                      placeholder="Mínimo 8 caracteres"
                      value={contrasena}
                      onIonInput={(e) => {
                        setContrasena(e.detail.value ?? '');
                        limpiarError('contrasena');
                      }}
                    />

                    <IonButton
                      fill="clear"
                      slot="end"
                      type="button"
                      aria-label={
                        mostrarContrasena
                          ? 'Ocultar contraseña'
                          : 'Mostrar contraseña'
                      }
                      onClick={() => setMostrarContrasena(!mostrarContrasena)}
                    >
                      <IonIcon
                        slot="icon-only"
                        icon={mostrarContrasena ? eyeOffOutline : eyeOutline}
                      />
                    </IonButton>
                  </IonItem>

                  <div className="requisitos-contrasena">
                    <IonText color={cumpleLongitud ? 'success' : 'medium'}>
                      <p>{cumpleLongitud ? '✓' : '○'} Mínimo 8 caracteres</p>
                    </IonText>

                    <IonText color={tieneMayuscula ? 'success' : 'medium'}>
                      <p>{tieneMayuscula ? '✓' : '○'} Una letra mayúscula</p>
                    </IonText>

                    <IonText color={tieneMinuscula ? 'success' : 'medium'}>
                      <p>{tieneMinuscula ? '✓' : '○'} Una letra minúscula</p>
                    </IonText>

                    <IonText color={tieneNumero ? 'success' : 'medium'}>
                      <p>{tieneNumero ? '✓' : '○'} Al menos un número</p>
                    </IonText>
                  </div>

                  {errores.contrasena && (
                    <IonText color="danger">
                      <p className="mensaje-error">{errores.contrasena}</p>
                    </IonText>
                  )}
                </div>

                {/* Columna derecha: edad */}
                <div className="campo-formulario">
                  <IonItem>
                    <IonInput
                      type="number"
                      label="Edad"
                      labelPlacement="stacked"
                      placeholder="Ej. 20"
                      min="18"
                      max="120"
                      step="1"
                      value={edad}
                      onIonInput={(e) => {
                        const valor = e.detail.value ?? '';

                        // Permitir únicamente dígitos
                        if (/^\d*$/.test(valor)) {
                          setEdad(valor);
                          limpiarError('edad');
                        }
                      }}
                      onWheel={(e) => {
                        (e.target as HTMLElement).blur();
                      }}
                    />
                  </IonItem>

                  {errores.edad && (
                    <IonText color="danger">
                      <p className="mensaje-error">{errores.edad}</p>
                    </IonText>
                  )}
                </div>

              </div>

              <IonButton
                expand="block"
                type="submit"
                className="boton-registro"
              >
                Validar formulario
              </IonButton>
            </form>

            {registrado && (
              <IonText color="success">
                <p className="mensaje-exito">
                  ¡Registro válido! Todos los datos cumplen
                  con los requisitos.
                </p>
              </IonText>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;

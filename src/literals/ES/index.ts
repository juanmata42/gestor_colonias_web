import { lang } from 'models/lang';

const es: lang = {
  mainpage: {
    welcome: '¡Bienvenido',
    logout: 'Cerrar sesión',
  },
  notFound: {
    title500: 'Lo siento, hubo un error interno. No pudimos completar su solicitud.',
    description500: 'Nuestro equipo ha sido informado del problema. Pedimos disculpas por las molestias',
    title404: 'Lo siento, la página que está buscando no está en la web.',
    title401: 'Lo siento, no está autorizado para ver esta página',
    title400: 'Lo siento, la respuesta fue una mala solicitud',
    description404: 'Esto puede ocurrir por dos razones:',
    description401: 'Esto puede ocurrir por dos razones:',
    description400: 'Esto puede ocurrir por dos razones:',
    reason1400: 'La solicitud tiene algunos parámetros obligatorios faltantes, o',
    reason2400: 'Ocurrió un comportamiento inesperado',
    reason1401: 'Su rol no está autorizado, o',
    reason2401: 'No estás en la vista correcta.',
    reason1404: 'Ha ingresado una dirección de internet incorrecta, o',
    reason2404: 'La página ha sido eliminada o movida.',
    unknownStatus: 'El estado devuelto es desconocido y no ha sido manejado',
    back: 'Volver a casa',
  },
};

export default es;

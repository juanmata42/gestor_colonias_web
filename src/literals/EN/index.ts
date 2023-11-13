import { lang } from 'models/lang';

const en: lang = {
  mainpage: {
    welcome: 'Welcome!',
    logout: 'Logout',
  },
  notFound: {
    title500: 'Sorry, there was an internal server error. We could not complete your request.',
    description500: 'Our team has been made aware of the issue. We apologize for the inconvenience',
    title404: 'Sorry, the page you are looking for is not on the web.',
    title401: 'Sorry, you are unauthorized to view this page',
    title400: 'Sorry, the response was a bad request',
    description404: 'This may occur for two reasons:',
    description401: 'This may occur for two reasons:',
    description400: 'This may occur for two reasons:',
    reason1400: 'The request has some missing mandatory parameters, or',
    reason2400: 'Some unexpected behaviour ocurred',
    reason1401: 'Your role is not authorized, or',
    reason2401: 'You are not in the correct view.',
    reason1404: 'You have entered an incorrect internet address, or',
    reason2404: 'The page has been eliminated or moved.',
    unknownStatus: 'The status returned is unknown and has not been handled',
    back: 'Back to home',
  },
};

export default en;

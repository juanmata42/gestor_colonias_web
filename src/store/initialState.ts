import i18n from '../i18n';
import { State } from '../models/state';

const INITIAL_STATE: State = {
  session: {
    user: {
      id: '-1',
      email: '',
      hashemail: '',
      password: '',
      name: '',
      lastname: '',
      userFactories: [],
      birthdate: '',
      gender: '',
      nid: '',
      hashnid: '',
      telephone: '',
      address: '',
      country: '',
    },
    authenticated: localStorage.getItem('logged') === 'true',
    checked: false,
    error: '',
  },
  adminTool: {
    error: '',
    userManagement: [],
    userToEdit: {
      id: '-1',
      email: '',
      hashemail: '',
      password: '',
      name: '',
      lastname: '',
      userFactories: [],
      birthdate: '',
      gender: '',
      nid: '',
      hashnid: '',
      telephone: '',
      address: '',
      country: '',
    },
    interventions: [],
    selectedIntervention: '',
  },
  loading: {
    count: 0,
  },
  i18n: {
    language: 'EN',
    literals: i18n.EN,
  },
};

export default INITIAL_STATE;

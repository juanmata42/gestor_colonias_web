import axios, { AxiosError } from 'axios';
import { App } from '../models/app';
import { Diagnostic } from '../models/diagnostic';
import { Patient } from '../models/patient';
import { sessionActions } from '../store/session';
import constants from './defaultConstants';
import { store } from '../store';
import { EditUser, CreateUser } from '../models/user';
import { Intervention, InterventionInput } from '../models/intervention';

const baseURL = constants.DEFAULT_BACKEND_URL;
export const API = axios.create({ baseURL, withCredentials: true });

const handleAxiosError = async (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        localStorage.clear();
        store.dispatch(sessionActions.clear());
        return '';
      default:
        return error;
    }
  } else {
    return error;
  }
};

// USER RELATED CALLS
export const login = async (body: object) => {
  try {
    const { data } = await API.post('/users/login', body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const logout = async () => {
  try {
    const { data } = await API.post('/users/logout');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const getCurrentUser = async () => {
  try {
    const { data } = await API.get('/users/me');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const updateCurrentUser = async (body: object) => {
  try {
    const { data } = await API.put('/users/me', body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const getUserByID = async (id: string) => {
  try {
    const { data } = await API.get(`/users/?id=${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const getAllUsers = async () => {
  try {
    const { data } = await API.get('/users');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const createUser = async (body: CreateUser) => {
  try {
    const { data } = await API.post('/users', body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const editUser = async (body: EditUser, id: string) => {
  try {
    const { data } = await API.put(`/users/?id=${id}`, body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const deleteUser = async (id: string) => {
  try {
    const { data } = await API.delete(`/users/?id=${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

// APP RELATED CALLS
export const getAllApps = async () => {
  try {
    const { data } = await API.get('/apps');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const getAppByID = async (id: string) => {
  try {
    const { data } = await API.get(`/apps/?id=${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const getAppsByStatus = async (status: boolean) => {
  try {
    const { data } = await API.get(`/apps/?status=${status}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const createApp = async (app: App) => {
  try {
    const { data } = await API.post('/apps/', app);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const updateApp = async (id: string, toUpdate: object) => {
  try {
    const { data } = await API.post(`/apps/${id}`, toUpdate);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const deleteApp = async (id: string) => {
  try {
    const { data } = await API.delete(`/apps/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

// DIAGNOSTIC RELATED CALLS
export const getAllDiagnostics = async () => {
  try {
    const { data } = await API.get('/diagnostics');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const getDiagnosticByID = async (id: string) => {
  try {
    const { data } = await API.get(`/diagnostics/?id=${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const getDiagnosticsByPatientID = async (pid: string) => {
  try {
    const { data } = await API.get(`/diagnostics/?pid=${pid}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const createDiagnostic = async (diagnostic: Diagnostic) => {
  try {
    const { data } = await API.post('/diagnostics', diagnostic);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const deleteDiagnostic = async (id: string) => {
  try {
    const { data } = await API.delete(`/diagnostics/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const updateDiagnostic = async (id: string, toUpdate: object) => {
  try {
    const { data } = await API.put(`/diagnostics/${id}`, toUpdate);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const updateDiagnosticSteps = async (id: string, body: object) => {
  try {
    const { data } = await API.put(`/diagnostics/${id}/steps`, body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const finishDiagnostic = async (id: string) => {
  try {
    const { data } = await API.put(`/diagnostics/${id}/finish`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

// FACTORY RELATED CALLS
export const getAllFactories = async () => {
  try {
    const { data } = await API.get('/factories');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const getFactoriesFromUser = async () => {
  try {
    const { data } = await API.get('/factories/me');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
    }
    return error;
  }
};

// PATIENT RELATED CALLS
export const getAllPatients = async () => {
  try {
    const { data } = await API.get('/patients');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const getPatientByID = async (id: string) => {
  try {
    const { data } = await API.get(`/patients/?id=${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const createPatient = async (patient: Patient) => {
  try {
    const { data } = await API.post('/patients', patient);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const updatePatient = async (id: string, toUpdate: object) => {
  try {
    const { data } = await API.put(`/patients/${id}`, toUpdate);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const deletePatient = async (id: string) => {
  try {
    const { data } = await API.delete(`/patients/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

// COVID TOOL RELATED CALLS
export const getFactoriesData = async () => {
  try {
    const { data } = await API.get('/factories/me');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

const today = new Date();
const year = today.getFullYear();
const mes = today.getMonth() + 1;
const dia = today.getDate();
const fecha = `${year}-${mes}-${dia}`;

export const getCovidData = async (initDate = fecha, endDate = fecha) => {
  try {
    const { data } = await API.get(`/stats/covid?date1=${initDate}&date2=${endDate}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const getHealthIssuesData = async (initDate = fecha, endDate = fecha) => {
  try {
    const { data } = await API.get(`/stats/health?date1=${initDate}&date2=${endDate}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const getMinorInjuriesData = async (initDate = fecha, endDate = fecha) => {
  try {
    const { data } = await API.get(`/stats/minorInjuries?date1=${initDate}&date2=${endDate}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const getILOData = async (initDate = fecha, endDate = fecha) => {
  try {
    const { data } = await API.get(`/stats/ilo?date1=${initDate}&date2=${endDate}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const getExcelData = async (initDate = fecha, endDate = fecha, application = '') => {
  try {
    const { data } = await API.get(`/stats/excel?date1=${initDate}&date2=${endDate}&type=${application}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};

export const getInterventions = async () => {
  try {
    const { data } = await API.get('/interventions');
    return data;
  } catch (error) {
    return error;
  }
};

export const createIntervention = async (intervention: InterventionInput) => {
  try {
    const { data } = await API.post('/interventions', intervention);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteIntervention = async (id: string) => {
  try {
    const { data } = await API.delete(`/interventions/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

import { AnyAction, Dispatch } from 'redux';
import { adminToolActions } from '.';
import { Intervention, InterventionInput } from '../../models/intervention';
import {
  getAllUsers, deleteUser, createUser, editUser, getUserByID, getInterventions, createIntervention, deleteIntervention,
} from '../../utils/apiCalls';
import { loadingActions } from '../loading';

export function getAllUsersAction() {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const data = await getAllUsers();
      dispatch(adminToolActions.successGetAllUsers(data));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}

export function getUserByIDAction(userId: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const data = await getUserByID(userId);
      dispatch(adminToolActions.successGetUserById(data));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}

export function deleteUserAction(userId: string, callback: CallableFunction) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      await deleteUser(userId);
      dispatch(adminToolActions.successDeleteUser());
      dispatch(loadingActions.hide());
      if (callback && typeof callback === 'function') {
        callback();
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export function createUserAction(userData: any, callback: CallableFunction) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      await createUser(userData);
      dispatch(adminToolActions.successCreateUser());
      dispatch(loadingActions.hide());
      if (callback && typeof callback === 'function') {
        callback();
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export function editUserAction(userData: any, callback: CallableFunction, userId = '') {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      await editUser(userData, userId);
      dispatch(adminToolActions.successEditUser());
      dispatch(loadingActions.hide());
      if (callback && typeof callback === 'function') {
        callback();
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export function editInCreationUserAction(userData: any) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(adminToolActions.successEditInCreationUser(userData));
  };
}

export function getInterventionsAction() {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const data = await getInterventions();
      dispatch(adminToolActions.successGetInterventions(data));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}

export function createInterventionAction(interventionData: InterventionInput, callback: CallableFunction) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      await createIntervention(interventionData);
      dispatch(adminToolActions.successCreateIntervention());
      dispatch(loadingActions.hide());
      if (callback && typeof callback === 'function') {
        callback();
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export function deleteInterventionAction(interventionId: string, callback: CallableFunction) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      await deleteIntervention(interventionId);
      dispatch(adminToolActions.successDeleteIntervention());
      dispatch(loadingActions.hide());
      if (callback && typeof callback === 'function') {
        callback();
      }
    } catch (err) {
      console.error(err);
    }
  };
}
export function selectInterventionAction(intervention: Intervention) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(adminToolActions.successSelectIntervention(intervention.id));
  };
}

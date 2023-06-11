import { AnyAction, Dispatch } from 'redux';
import { factoriesActions } from '.';
import { getFactoriesData, getFactoriesFromUser } from '../../utils/apiCalls';
import { loadingActions } from '../loading';

export function getFactoriesDataAction() {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const factories = await getFactoriesData();
      dispatch(factoriesActions.success(factories));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}
export function getFactoriesFromUserDataAction() {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const factories = await getFactoriesFromUser();
      dispatch(factoriesActions.success(factories));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}

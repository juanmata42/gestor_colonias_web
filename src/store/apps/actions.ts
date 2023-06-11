import { AnyAction, Dispatch } from 'redux';
import { appsActions } from '.';
import { getAllApps } from '../../utils/apiCalls';
import { loadingActions } from '../loading';

export function getAllAppsAction() {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const data = await getAllApps();
      dispatch(appsActions.success(data));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}

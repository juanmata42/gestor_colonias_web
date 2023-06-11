import { AnyAction, Dispatch } from 'redux';
import { iloToolActions } from '.';
import { getILOData } from '../../utils/apiCalls';
import { loadingActions } from '../loading';

export function getIloDataAction(initDate: string, endDate: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const data = await getILOData(initDate, endDate);
      dispatch(iloToolActions.success(data));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}

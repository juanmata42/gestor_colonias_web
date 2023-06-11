import { AnyAction, Dispatch } from 'redux';
import { minorInjuriesToolActions } from '.';
import { getMinorInjuriesData } from '../../utils/apiCalls';
import { loadingActions } from '../loading';

export function getMinorInjuriesDataAction(initDate: string, endDate: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const data = await getMinorInjuriesData(initDate, endDate);
      dispatch(minorInjuriesToolActions.success(data));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}

import { AnyAction, Dispatch } from 'redux';
import { healthIssuesToolActions } from '.';
import { getHealthIssuesData } from '../../utils/apiCalls';
import { loadingActions } from '../loading';

export function getHealthIssuesDataAction(initDate: string, endDate: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const data = await getHealthIssuesData(initDate, endDate);
      dispatch(healthIssuesToolActions.success(data));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}

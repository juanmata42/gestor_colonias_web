import { AnyAction, Dispatch } from 'redux';
import { covidToolActions } from '.';
import { getCovidData } from '../../utils/apiCalls';
import { loadingActions } from '../loading';

export function getCovidDataAction(initDate: string, endDate: string) {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const data = await getCovidData(initDate, endDate);
      dispatch(covidToolActions.success(data));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}

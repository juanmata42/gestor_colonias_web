import { AnyAction, Dispatch } from 'redux';
import { newsActions } from '.';
import { getArticles } from '../../utils/apiNewsCalls';
import { loadingActions } from '../loading';

export function getNewsAction() {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingActions.show());
    try {
      const data = await getArticles();
      dispatch(newsActions.success(data));
      dispatch(loadingActions.hide());
    } catch (err) {
      console.error(err);
    }
  };
}

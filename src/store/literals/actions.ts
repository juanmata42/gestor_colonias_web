import { Dispatch } from '@reduxjs/toolkit';
import { loadingActions } from '../loading';
import { literalsActions } from '.';

export function setPlatformLanguageAction(lang: string) {
  return (dispatch: Dispatch) => {
    dispatch(loadingActions.show());
    dispatch(literalsActions.set(lang));

    setTimeout(() => {
      dispatch(loadingActions.hide());
    }, 1000);
  };
}

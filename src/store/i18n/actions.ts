import { Dispatch } from '@reduxjs/toolkit';
import { loadingActions } from '../loading';
import { i18nActions } from '.';

export function setPlatformLanguageAction(lang: string) {
  return (dispatch: Dispatch) => {
    dispatch(loadingActions.show());
    dispatch(i18nActions.set(lang));

    setTimeout(() => {
      dispatch(loadingActions.hide());
    }, 1000);
  };
}

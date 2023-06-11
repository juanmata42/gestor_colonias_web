/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AlertNew } from '../../models/alertNew';
import INITIAL_STATE from '../initialState';

export const newsSlice = createSlice({
  name: 'news',
  initialState: INITIAL_STATE.AlertNews,
  reducers: {
    success: (state, action) => {
      const localData: AlertNew[] = [];
      const globalData: AlertNew[] = [];
      action.payload.forEach((element: any) => {
        const info: AlertNew = {
          id: element.id,
          title: element.title,
          titleShort: element.titleShort,
          subtitle: element.subtitle,
          preTitle: element.preTitle,
          body: element.body.content[0].content,
          sectionName: element.section.name,
          date: element.date.created,
          imageSrc: element.image.horizontal.src || '',
        };
        if (element.section.name === 'local news') {
          localData.push(info);
        } else {
          globalData.push(info);
        }
      });
      state.localNews = localData;
      state.globalNews = globalData;
    },
  },
});

export const newsActions = newsSlice.actions;

export default newsSlice.reducer;

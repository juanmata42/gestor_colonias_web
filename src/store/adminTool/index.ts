/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import INITIAL_STATE from '../initialState';

export const adminToolSlice = createSlice({
  name: 'adminTool',
  initialState: INITIAL_STATE.adminTool,
  reducers: {
    successGetAllUsers: (state, action) => {
      state.userManagement = action.payload;
      state.userToEdit = {
        id: '-1',
        email: '',
        hashemail: '',
        password: '',
        name: '',
        lastname: '',
        userFactories: [],
        birthdate: '',
        gender: '',
        nid: '',
        hashnid: '',
        telephone: '',
        address: '',
        country: '',
      };
    },
    successDeleteUser: (state) => {
      state.error = '';
    },
    successCreateUser: (state) => {
      state.error = '';
    },
    successEditUser: (state) => {
      state.error = '';
      state.userToEdit = {
        id: '-1',
        email: '',
        hashemail: '',
        password: '',
        name: '',
        lastname: '',
        userFactories: [],
        birthdate: '',
        gender: '',
        nid: '',
        hashnid: '',
        telephone: '',
        address: '',
        country: '',
      };
    },
    successGetUserById: (state, action) => {
      state.userToEdit = action.payload;
    },
    successEditInCreationUser: (state, action) => {
      state.userToEdit = action.payload;
    },
    successGetInterventions: (state, action) => {
      state.interventions = action.payload;
    },
    successCreateIntervention: (state) => {
      state.error = '';
    },
    successDeleteIntervention: (state) => {
      state.error = '';
    },
    successSelectIntervention: (state, action) => {
      state.selectedIntervention = action.payload;
    },
  },
});

export const adminToolActions = adminToolSlice.actions;

export default adminToolSlice.reducer;

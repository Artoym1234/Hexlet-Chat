import { createSlice } from '@reduxjs/toolkit';

import { actions as loadingStateActions } from './loadingSlice';

const initialState = ({
  isOpen: false,
  type: null,
  context: null,
});

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, { payload: { type, context = null } }) => {
      /* eslint-disable no-param-reassign */
      state.isOpen = true;
      /* eslint-disable no-param-reassign */
      state.type = type;
      /* eslint-disable no-param-reassign */
      state.context = context;
    },
    close: (state) => {
      /* eslint-disable no-param-reassign */
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadingStateActions.unload, () => initialState);
  },
});

const { actions } = modalSlice;
const selectorsModal = {
  getModalType: (state) => state.modal.type,
  isModalOpen: (state) => state.modal.isOpen,
  getModalContext: (state) => state.modal.context,
};

export { actions, selectorsModal };
export default modalSlice.reducer;

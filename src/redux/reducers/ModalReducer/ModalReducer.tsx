// src/features/counter/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CommonStates {
  triggerModal: string | null;
  activeModal: boolean;
}

const initialState: CommonStates = {
  triggerModal: null,
  activeModal: false,
};

const ModalReducer = createSlice({
  name: "ModalReducer",
  initialState,
  reducers: {
    chooseModal: (state, action: PayloadAction<string>) => {
      state.triggerModal = action.payload;
      state.activeModal = true;
    },
    closeModal: (state) => {
      state.triggerModal = null;
      state.activeModal = false;
    },
  },
});

export const { chooseModal, closeModal } = ModalReducer.actions;
export default ModalReducer.reducer;

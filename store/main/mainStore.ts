import { createSlice } from '@reduxjs/toolkit';
import { DeliveriesState } from '@/type/type';

const initialState: DeliveriesState = {
  deliveries: [],
  error: null,
};

const mainStore = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    fetchDeliveriesSuccess(state, action) {
      state.deliveries = action.payload;
    },
    fetchDeliveriesError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { fetchDeliveriesSuccess, fetchDeliveriesError } =
  mainStore.actions;

export default mainStore.reducer;

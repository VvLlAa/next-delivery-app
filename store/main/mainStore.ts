import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Delivery, DeliveryDetails, DeliveriesState } from './types';
import {fetchDeliveries} from "@/services/api";

const initialState: DeliveriesState = {
    list: [],
    details: null,
    loading: false,
    error: null,
    filters: {
        status: '',
    },
    pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
    },
};

const deliveriesSlice = createSlice({
    name: 'deliveries',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeliveries.pending, (state) => {
        })
        .addCase(fetchDeliveries.fulfilled, (state, action) => {
            state.loading = false
            state.list = action.payload
        })
        .addCase(fetchDeliveries.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Ошибка при получении данных'
        })
    }
});

export const {

} = deliveriesSlice.actions;

export default deliveriesSlice.reducer;
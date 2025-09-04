import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded'
    error: null,
};

export const applicationsSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        addAplication: (state, action) => {
            state.items.push(action.payload);
        },
    },
});

export const { addAplication } = applicationsSlice.actions;

export default applicationsSlice.reducer;
// This file defines the applications slice of the Redux store, managing job applications state.
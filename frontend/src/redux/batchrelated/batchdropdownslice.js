import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};


const batchdropdownslice = createSlice({
    name: 'batchdropdown',
    initialState,
    reducers: {
        adddropdownbatch(state, action) {
            state.user = action.payload;
            console.log(action.payload, "dropdown check");
            console.log(state.user.batch, "dropdown check");
            state.source = 'selected';
        },
        removedropdown(state, action) {
            return { ...initialState };
        }

    }
});

export const { adddropdownbatch, removedropdown } = batchdropdownslice.actions;
console.log(batchdropdownslice.actions)
export default batchdropdownslice.reducer;

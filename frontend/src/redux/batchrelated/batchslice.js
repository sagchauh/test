import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

console.log(initialState, "initialState check")

const batchSlice = createSlice({
    name: 'batch',
    initialState,
    reducers: {
        addbatch(state, action) {
            state.user = action.payload;
            console.log(action.payload, "redux check");
            console.log(state.user.batch, "state check");
            state.source = 'typed';
        },
        removebatch(state, action){
            return { ...initialState };
        }, 
    }
});

export const { addbatch, removebatch } = batchSlice.actions;
console.log(batchSlice.actions)
export default batchSlice.reducer;




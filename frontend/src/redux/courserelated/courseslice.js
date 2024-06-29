import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const courseslice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        addcourse(state, action){
            state.user = action.payload
        },
        removecourse(state, action){
            
        }
    }

})

export const { addcourse, removecourse } = courseslice.actions
export default courseslice

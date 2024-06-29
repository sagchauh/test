import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';



// export const fetchuser = createAsyncThunk(
//     'auth/fetchUserData',
//     async (_, { getState, dispatch }) => {
//         const token = getState().auth.logindata;
//         if (token) {
//             try {
//                 const response = await axios.post("http://15.207.248.127:8000/getcurrentstudent", {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     }
//                 });
//                 if (response.status === 200) {
//                     return response.data.verifystudent;
//                 } else {
//                 }
//             } catch (error) {
//                 console.error("Error fetching user data:", error);

//             }
//         }
//     }
// );


const initialState = {
    logindata: null,
    withoutpass: null,
    // user:null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            // state.user = action.payload;
            // console.log(action.payload, "login check");
            // console.log(state.user.logindata, "login check");
            state.logindata = action.payload.logindata;
            state.withoutpass = action.payload.withoutpass;
            console.log(state.withoutpass, "withoutpass")
        },
        logout(state, action) {
            return { ...initialState };
        }
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


// export const fetchuser = ({ getState, dispatch }) => {

//     const token = getState().auth.logindata;

//     async function checkuser(){
//         if (token) {
//             console.log(token, "token heree")
//             const response = await axios.post("http://15.207.248.127:8000/getcurrentstudent", {
//                 token
//             })
//             console.log(response, "response token");
//             if (response.data.status === 200) {
//                 dispatch(login({ logindata: token, withoutpass: response.data.verifystudent }));
//             }
//         }
//     } checkuser()

// }


import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./userrelated/authslice";


const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);

    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const stateToPersist = { auth: { logindata: state.auth.logindata, withoutpass: state.auth.withoutpass } };
        const serializedState = JSON.stringify(stateToPersist);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        return undefined;
    }
};


const preloadedState = loadState();

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState,

});

store.subscribe(() => {
    const state = store.getState();
    saveState(state);
});



export default store;








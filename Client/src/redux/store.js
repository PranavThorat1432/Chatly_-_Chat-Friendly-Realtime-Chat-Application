import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import msgSlice from './msgSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        message: msgSlice 
    }
})
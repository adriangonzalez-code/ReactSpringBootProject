import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/users/usersSlice.js";
import { authSlice } from "./slices/auth/authSlice.js";

export const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        auth: authSlice.reducer
    }
});
import { configureStore } from "@reduxjs/toolkit"
import { courseReducer } from "../slices"

export const store = configureStore({
    reducer : {
        courses : courseReducer,
    },

    devTools : process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



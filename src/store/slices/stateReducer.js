import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { storeData, getData, removeData } from "../asyncStorage";

export const initialization = createAsyncThunk(
    'state/initialization',
    async (_, { dispatch }) => {
        try {
            // const userData = await getData('userData')
            // if (userData !== null) {
            //     dispatch(userData(userData))
            // }
        } catch (e) {
            console.log(e.message);
        }
    }
)

const stateSlice = createSlice({
    name: 'state',
    initialState: {
        version: '1.0.0',
        toastAndroidMessage: null,
    },
    reducers: {
        setToastAndroidMessage: (state, action) => {
            state.toastAndroidMessage = action.payload
        },
    },
    extraReducers: builder => { }
})

export const {
    setToastAndroidMessage,
} = stateSlice.actions


export default stateSlice.reducer
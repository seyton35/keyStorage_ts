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
        error: null,
        passList: []
    },
    reducers: {
        setToastAndroidMessage: (state, action) => {
            state.toastAndroidMessage = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        addPassword: (state, action) => {
            const arr = state.passList.map(el => el)
            arr.push(action.payload)
            state.passList = arr
            console.log('state.passList', state.passList)
        }
    },
    extraReducers: builder => { }
})

export const {
    addPassword,
    setToastAndroidMessage,
    setError
} = stateSlice.actions


export default stateSlice.reducer
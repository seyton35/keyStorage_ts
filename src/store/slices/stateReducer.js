import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EncryptedStorage from 'react-native-encrypted-storage';

import { storeData, getData, removeData } from "../asyncStorage";

export const initialization = createAsyncThunk(
    'state/initialization',
    async (_, { dispatch }) => {
        try {
            const passList = await EncryptedStorage.getItem('passList')
            if (passList) {
                const data = await JSON.parse(passList)
                dispatch(setPassList(data))
            }
            console.log(2);
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const safePassList = createAsyncThunk(
    'state/safePassList',
    async (_, { getState }) => {
        try {
            const { passList } = getState().state
            await EncryptedStorage.setItem(
                "passList",
                JSON.stringify(passList)
            );
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
        },
        setPassList: (state, action) => {
            state.passList = action.payload
        },
        updatePassField: (state, action) => {
            const { index, value, key } = action.payload
            state.passList[index][key] = value
        },

    },
    extraReducers: builder => { }
})

export const {
    addPassword,
    setToastAndroidMessage,
    setError,
    setPassList,
    updatePassField
} = stateSlice.actions


export default stateSlice.reducer
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
        passList: [
            {
                src: 'google',
                uri: 'https://google.com',
                password: 'qwerty',
                login: 'user2000',
            },
            {
                src: 'yandex',
                uri: 'https://yandex.com',
                password: 'qwerty22',
                login: 'user2000',
            },
            {
                src: 'mail',
                uri: 'https://mail.com',
                password: 'qwerty44',
                login: 'user2000',
            },
        ]
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
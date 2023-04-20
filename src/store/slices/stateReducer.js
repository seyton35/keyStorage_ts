import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EncryptedStorage from 'react-native-encrypted-storage';

import { storeData, getData, removeData } from "../asyncStorage";
import { genIdOfArray } from "../../logic/genId";

export const initialization = createAsyncThunk(
    'state/initialization',
    async (_, { dispatch }) => {
        try {
            const passList = await EncryptedStorage.getItem('passList')
            const categoryList = await getData('categoryList')
            if (categoryList !== null) {
                dispatch(setCategoryList(categoryList))
            }
            if (passList) {
                const data = await JSON.parse(passList)
                dispatch(setPassList(data))
            }
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

export const updatePassField = createAsyncThunk(
    'state/updatePassField',
    async ({ index, value, key }, { getState, dispatch }) => {
        try {
            const { passList } = getState().state
            passList[index][key] = value
            dispatch(setPassList(passList.map(el => el)))

            await EncryptedStorage.setItem(
                "passList",
                JSON.stringify(passList)
            );
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const updateCategory = createAsyncThunk(
    'state/updateCategory',
    async ({ index, title, fields, icon }, { getState, dispatch }) => {
        try {
            const { categoryList } = getState().state
            categoryList[index][key] = { title, fields, icon }
            dispatch(setCategoryList(categoryList.map(el => el)))

            await EncryptedStorage.setItem(
                "categoryList",
                JSON.stringify(categoryList)
            );
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const deletePassword = createAsyncThunk(
    'state/deletePassword',
    async ({ index }, { getState, dispatch }) => {
        try {
            const passList = getState().state.passList.map(el => el)
            passList.splice(index, index)

            dispatch(setPassList(passList))
            await EncryptedStorage.setItem(
                "passList",
                JSON.stringify(passList)
            );
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'state/deleteCategory',
    async ({ index }, { getState, dispatch }) => {
        try {
            const categoryList = getState().state.categoryList.map(el => el)
            categoryList.splice(index, index)

            dispatch(setCategoryList(categoryList))
            await EncryptedStorage.setItem(
                "categoryList",
                JSON.stringify(categoryList)
            );
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const setError = createAsyncThunk(
    'state/setError',
    async (error, { dispatch }) => {
        try {
            dispatch(setErrorMessage(error))
            setTimeout(() => {
                dispatch(setErrorMessage(null))
            }, 4000);
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
        passList: [],
        categoryList: [
            { "fields": [{ "secure": false, "title": "Номер" }], "icon": "bank", "title": "Банковские карты" },
            { "fields": [{ "secure": false, "title": "Номер" }], "icon": "key", "title": "пароли" },
            { "fields": [{ "secure": false, "title": "Номер" }], "icon": "bank", "title": "Банк" },
            { "fields": [{ "secure": false, "title": "Номер" }], "icon": "profile", "title": "услуги" },
            { "fields": [{ "secure": false, "title": "Номер" }], "icon": "youtube", "title": "фильмы" },
            { "fields": [{ "secure": false, "title": "Номер" }], "icon": "steam", "title": "игры" },
            { "fields": [{ "secure": false, "title": "Номер" }], "icon": "facebook", "title": "сайты" },
            { "fields": [{ "secure": false, "title": "Номер" }], "icon": "tiktok", "title": "ТВ" },

        ]
    },
    reducers: {
        setToastAndroidMessage: (state, action) => {
            state.toastAndroidMessage = action.payload
        },
        setErrorMessage: (state, action) => {
            state.error = action.payload
        },
        addPassword: (state, action) => {
            const arr = state.passList.map(el => el)
            arr.push({...action.payload, _id:genIdOfArray(arr)})
            state.passList = arr
        },
        setPassList: (state, action) => {
            state.passList = action.payload
        },
        addCategory: (state, action) => {
            const arr = state.categoryList.map(el => el)
            arr.push({ ...action.payload, _id: genIdOfArray(arr) })
            state.categoryList = arr
        },
        setCategoryList: (state, action) => {
            state.categoryList = action.payload
        },
        saveCategoryList: (state) => {
            storeData('categoryList', state.categoryList)
        }

    },
    extraReducers: builder => { }
})

export const {
    addPassword,
    setToastAndroidMessage,
    setErrorMessage,
    setPassList,
    addCategory,
    setCategoryList,
    saveCategoryList
} = stateSlice.actions


export default stateSlice.reducer
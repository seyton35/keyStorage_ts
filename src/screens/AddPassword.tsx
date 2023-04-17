import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { addPassword, initialization, safePassList, setError } from '../store/slices/stateReducer'
import SubmitBtn from '../components/native/SubmitBtn'
import AddPassFormItem from '../components/native/AddPassFormItem'
import ErrorView from '../components/native/ErrorView'

interface Params {

}

export default function AddPassword({ }: Params) {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const { error } = useSelector((s: any) => s.state)

    const nav = useNavigation()

    const dispatch = useDispatch()

    function onSubmitHandler() {
        if (title !== '') {
            dispatch(addPassword({
                title, url, login, password
            }))
            dispatch(safePassList())
            nav.navigate('passList')
        } else {
            dispatch(setError('хотя бы название должно быть заполнено'))
            setTimeout(() => {
                dispatch(setError(null))
            }, 4000);
        }
    }

    return (
        <View style={styles.container}>
            <ErrorView text={error} />
            <AddPassFormItem style={styles.formItem}
                value={title} onChangeText={setTitle} title='Название'
            />
            <AddPassFormItem style={styles.formItem}
                value={url} onChangeText={setUrl} title='Сайт'
            />
            <AddPassFormItem style={styles.formItem}
                value={login} onChangeText={setLogin} title='Логин'
            />
            <AddPassFormItem style={styles.formItem}
                value={password} onChangeText={setPassword} title='Пароль'
            />
            <SubmitBtn
                style={styles.submitBtn}
                title='готово'
                onPress={onSubmitHandler}
            />
            <SubmitBtn
                title='logoc'
                onPress={() => {
                    console.log(1);
                    
                    dispatch(initialization())
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    formItem: {
        marginBottom: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff'
    },
    submitBtn: {
        marginTop: 10,
        marginRight: 20,
        backgroundColor: '#ccc'
    }
})
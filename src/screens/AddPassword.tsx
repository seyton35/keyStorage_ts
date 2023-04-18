import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { addPassword, safePassList, setError } from '../store/slices/stateReducer'
import SubmitBtn from '../components/native/SubmitBtn'
import AddPassFormItem from '../components/native/AddPassFormItem'
import ErrorView from '../components/native/ErrorView'
import Logo from '../components/native/Logo'
import Modal from '../components/reusable/Modal'
import { accountsLogo_48x48 } from '../../assets/accountsLogo_48x48'
import PassIconsBtnList from '../components/native/PassIconsBtnList'
import Txt from '../components/custom/Txt'

interface Params {

}

export default function AddPassword({ }: Params) {
    const [icon, setIcon] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [modalVisible, setModalVisible] = useState(false)

    const { error } = useSelector((s: any) => s.state)

    const nav = useNavigation()

    const dispatch = useDispatch()

    function onSubmitHandler() {
        if (title !== '') {
            dispatch(addPassword({
                title, url, login, password, icon
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
            <Modal visible={modalVisible} setUnvisible={() => setModalVisible(false)}>
                <PassIconsBtnList icon={icon} iconList={Object.keys(accountsLogo_48x48)}
                    setIcon={(icon: string) => {
                        setIcon(icon)
                        setModalVisible(false)
                    }}
                />
            </Modal>
            <TouchableOpacity style={styles.changeIconBtn}
                onPress={() => setModalVisible(true)}
            >
                <Logo style={styles.passIcon} title={icon} />
                <Txt>Сменить иконку</Txt>
            </TouchableOpacity>

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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    iconBtnList: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20

    },
    iconBtn: {
        padding: 5
    },
    icon: {
        width: 50,
        height: 50,
    },
    changeIconBtn: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        alignItems: 'center'
    },
    passIcon: {
        margin: 10
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
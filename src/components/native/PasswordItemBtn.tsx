import { StyleSheet, Alert, TouchableOpacity, Vibration } from 'react-native'
import Txt from '../custom/Txt'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { deletePassword, updatePassField } from '../../store/slices/stateReducer'
import Logo from './Logo'
import Modal from '../reusable/Modal'
import { useState } from 'react'
import PassIconsBtnList from './PassIconsBtnList'
import { accountsLogo_48x48 } from '../../../assets/accountsLogo_48x48'

interface Params {
    title: '',
    details: {
        [key: string]: any
    }
}

export default function PasswordItemBtn({ title, details }: Params) {
    const [modalVisible, setModalVisible] = useState(false)
    const [icon, setIcon] = useState(details.icon)

    const navigate = useNavigation().navigate
    const dispatch = useDispatch()

    const longPressHandler = () => {
        Vibration.vibrate(100)
        Alert.alert(
            'удалить',
            'Вы хотите удалить этот пароль?',
            [
                {
                    text: 'отмена',
                    onPress: () => null
                },
                {
                    text: 'удалить',
                    onPress: () => dispatch(deletePassword({ index: details.index }))
                },

            ]
        )
    }

    return (
        <TouchableOpacity style={styles.passwordBtn}
            onPress={() => navigate('password', { ...details })}
            onLongPress={longPressHandler}
            delayLongPress={500}
        >
            <Modal visible={modalVisible} setUnvisible={() => setModalVisible(false)}>
                <PassIconsBtnList icon={icon} iconList={Object.keys(accountsLogo_48x48)}
                    setIcon={(icon: string) => {
                        setIcon(icon)
                        setModalVisible(false)
                        dispatch(updatePassField({ index: details.index, key: 'icon', value: icon }))
                    }}
                />
            </Modal>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Logo size={40} title={icon} style={styles.logo} />
            </TouchableOpacity>

            <Txt style={styles.title}>{title}</Txt>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    passwordBtn: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row'
    },
    logo: {
        marginRight: 10
    },
    title: {
        fontSize: 20
    },
})
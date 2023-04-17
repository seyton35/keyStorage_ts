import { StyleSheet, Alert, TouchableOpacity, Vibration } from 'react-native'
import Txt from '../custom/Txt'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { deletePassword } from '../../store/slices/stateReducer'

interface Params {
    title: '',
    details: {
        [key: string]: any
    }
}

export default function PasswordItemBtn({ title, details }: Params) {
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
            <Txt style={styles.title}>{title}</Txt>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    passwordBtn: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    title: {
        fontSize: 20
    },
})
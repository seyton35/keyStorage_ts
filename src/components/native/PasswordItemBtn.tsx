import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Txt from '../custom/Txt'
import { useNavigation } from '@react-navigation/native'

interface Params {
    title: '',
    details: {
        [key: string]: any
    }
}

export default function PasswordItemBtn({ title, details }: Params) {
    const navigate = useNavigation().navigate
    return (
        <TouchableOpacity style={styles.passwordBtn}
            onPress={() => navigate('password', { ...details })}
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
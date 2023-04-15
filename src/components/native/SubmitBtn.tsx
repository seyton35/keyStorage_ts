import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Txt from '../custom/Txt'

interface Params {
    title: string
    style?: {},
    onPress: () => void
}

export default function SubmitBtn({ title, onPress, style }: Params) {
    return (
        <TouchableOpacity style={[styles.btn, style]}
            onPress={onPress}
        >
            <Txt style={styles.btnTxt}>{title}</Txt>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 2,
        backgroundColor: '#fff',
        alignSelf: 'flex-end',
    },
    btnTxt: {
        fontSize: 18,
    }
})
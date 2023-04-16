import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Txt from '../custom/Txt'
import { useNavigation } from '@react-navigation/native'

interface Params {
    style?: {}
}

export default function AddPassBtn({ style }: Params) {
    const navigate = useNavigation().navigate
    return (
        <TouchableOpacity style={[styles.bnt, style]}
            onPress={() => navigate('addPass')}
        >
            <Txt style={styles.btnTxt}>Добавить</Txt>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bnt: {
        padding: 10,
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    btnTxt: {
        fontSize: 17
    }
})
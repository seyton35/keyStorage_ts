import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Txt from '../custom/Txt'
import { useNavigation } from '@react-navigation/native'

interface Params {
    title: string,
    screen: string,
}

export default function HomeBtn({ title, screen }: Params) {
    const navigate = useNavigation().navigate

    return (
        <TouchableOpacity style={styles.btn}
            onPress={() => {
                navigate(screen)
            }}
        >
            <Txt style={styles.btnTitle}>{title}</Txt>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    btnTitle:{
        fontSize:20
    }
})
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Txt from '../custom/Txt'

interface Params {
    title?: string
    children?: React.ReactNode
    route: string
    params?: {}
    style?: {}
    textStyle?: {}
}

export default function NavButton({ title, children, route, params, textStyle, style }: Params) {
    const navigate = useNavigation().navigate

    function navBtnHandler() {
        if (params) {
            navigate(route, { params })
        } else navigate(route)
    }

    return (
        <TouchableOpacity style={[styles.bnt, style]}
            onPress={navBtnHandler}
        >
            {title && <Txt style={[styles.btnTxt, textStyle]}>{title}</Txt>}
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bnt: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    btnTxt: {
        fontSize: 17
    }
})
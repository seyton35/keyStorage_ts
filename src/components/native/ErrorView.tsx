import { StyleSheet, View } from 'react-native'
import Txt from '../custom/Txt'

interface Params {
    text: string | null
    style?: {}
}

export default function ErrorView({ text, style }: Params) {
    return (
        <View style={[styles.errorView, style]}>
            {text && <Txt style={styles.errorTxt}>{text}</Txt>}
        </View>
    )
}

const styles = StyleSheet.create({
    errorView: {
        height: 25
    },
    errorTxt: {
        color: 'red',
        fontSize: 15.5
    }
})
import { StyleSheet, Animated } from 'react-native'
import Txt from '../custom/Txt'
import { useEffect, useRef } from 'react'

interface Params {
    text: string | null
    style?: {}
}

export default function ErrorView({ text, style }: Params) {
    const height = useRef(new Animated.Value(0)).current
    useEffect(() => {
        if (text !== null)
            increace()
    }, [text])

    const interpolate = height.interpolate(
        { inputRange: [0, 1], outputRange: [0, 30] }
    )

    function increace() {
        Animated.timing(
            height,
            {
                toValue: 1,
                useNativeDriver: false,
            }
        ).start(() => {
            setTimeout(() => {
                deCreace()
            }, 3000);
        })
    }

    function deCreace() {
        Animated.timing(
            height,
            {
                toValue: 0,
                useNativeDriver: false,
            }
        ).start()
    }

    return (
        <Animated.View style={[styles.errorView, {
            height: interpolate
        }, style]}>
            {text && <Txt style={styles.errorTxt}>{text}</Txt>}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    errorView: {},
    errorTxt: {
        color: 'red',
        fontSize: 15.5
    }
})
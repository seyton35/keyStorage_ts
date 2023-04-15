import { StyleSheet, TextInput, Pressable, View } from 'react-native'
import Txt from '../custom/Txt'
import { useEffect, useRef } from 'react'

interface Params {
    title: string
    onChangeText: (val: string) => void
    value: string
    style?: {}
}

export default function AddPassFormItem({ title, onChangeText, value, style }: Params) {
    const textInput = useRef()

    return (
        <Pressable style={[styles.inputBox, style]}
            onPress={() => textInput.current.focus()}
        >
            <Txt style={styles.inputLabel}>{title}</Txt>
            <TextInput ref={textInput} style={styles.inputTxt} onChangeText={onChangeText} value={value} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        flexDirection: 'row',
        alignItems: "center",
    },
    inputLabel: {
        color: '#666',
        width: '30%',
        fontSize: 17
    },
    inputTxt: {
        width: '70%',
        fontSize: 17
    },
})
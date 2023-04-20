import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { useState } from 'react'

interface Params {
    value: string,
    onChangeText: (val: string) => void,
    style: {},
    otherProps?: TextInputProps,
}

export default function Input({ value, onChangeText, style, ...otherProps }: Params) {
    const [text, setText] = useState(value)
    return (
        <TextInput style={[styles.input, style]}
            value={text} onChangeText={setText}
            {...otherProps}
            onEndEditing={() => onChangeText(text)}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#888'
    },
})
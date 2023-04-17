import { useRef, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, Vibration } from 'react-native'
import Txt from '../custom/Txt'
import Clipboard from '@react-native-clipboard/clipboard'
import { useDispatch } from 'react-redux'
import { setToastAndroidMessage } from '../../store/slices/stateReducer'

interface Params {
    value: string,
    onChangeText: (val: string) => void,
    onEndEditing: () => void,
    title: string,
    style?: {},
    hyperLink?: boolean,
    password?: boolean,
    children?: React.ReactNode
}

export default function DetailsEditableItem({
    title,
    onChangeText,
    onEndEditing,
    value,
    style,
    hyperLink,
    password = false,
    children
}: Params) {
    const [edit, setEdit] = useState(false)
    const ref = useRef<TextInput>(null)

    const dispatch = useDispatch()

    const isHyperLink = () => {
        if (hyperLink) return {
            color: '#0173fe',
            textDecorationLine: 'underline',
        }
    }

    const copyToClipboard = () => {
        Clipboard.setString(value)
        dispatch(setToastAndroidMessage('скопировано'))
        Vibration.vibrate(100)
    }

    const editValue = () => {
        Vibration.vibrate(100)
        setEdit(true)
        setTimeout(() => {
            ref.current?.focus()
        }, 0);
    }

    const cutText = (text: string) => {
        if (text.length > 30)
            text = text.slice(0, 29) + '...'
        return text
    }

    return (
        <TouchableOpacity style={[styles.item, style]}
            onPress={copyToClipboard}
            onLongPress={editValue}
        >
            {children}
            <View style={styles.labelBox}>
                <Txt style={styles.itemLabel}>{title}</Txt>
            </View>
            {edit
                ? <TextInput ref={ref} style={styles.itemTxt} value={value} onChangeText={onChangeText}
                    onEndEditing={() => {
                        onEndEditing()
                        setEdit(false)
                    }}
                    secureTextEntry={password}
                />
                : <Txt style={[styles.itemTxt, isHyperLink()]}>
                    {password
                        ? '********'
                        : cutText(value)
                    }
                </Txt>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelBox: {
        width: '25%',
        justifyContent: 'center'
    },
    itemLabel: {
        fontSize: 14,
        color: '#666'
    },
    itemTxt: {
        fontSize: 17,
        position: 'absolute',
        zIndex: -1,
        left: "30%",
        width: '60%'
    },

})
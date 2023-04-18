import { useState } from 'react'
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux'

import DetailsEditableItem from '../components/native/DetailsEditableItem'
import { setToastAndroidMessage, updatePassField } from '../store/slices/stateReducer'

interface Params {
    route: {
        params:
        {
            password: string,
            url: string,
            login: string,
            title: string,
            index: number
        }
    }
}

export default function PasswordDetails({ route }: Params) {
    const [title, setTitle] = useState(route.params.title)
    const [url, setUrl] = useState(route.params.url)
    const [login, setLogin] = useState(route.params.login)
    const [password, setPassword] = useState(route.params.password)
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()

    const updateValue = (key: string, value: string) => {
        const { index } = route.params
        dispatch(updatePassField({ index, key, value }))
    }

    function handleLinking(url: string) {
        function openLink(url: string) {
            try {
                Linking.openURL(url)
            } catch (e: any) {
                console.log(e.message);
                dispatch(setToastAndroidMessage('не удалось открыть ссылку'))
            }
        }
        const reg_proto = /https?:\/\//
        if (url === '') {
            dispatch(setToastAndroidMessage('нет ссылки'))
        }
        if (url.match(reg_proto)) {
            openLink(url)
        } else {
            openLink('https://' + url)
        }
    }

    return (
        <View style={styles.container}>
            <DetailsEditableItem title='Название' value={title} onChangeText={setTitle} onEndEditing={() => updateValue('title', title)} />
            <DetailsEditableItem title='Сайт' value={url} onChangeText={setUrl} onEndEditing={() => updateValue('url', url)} hyperLink >
                <TouchableOpacity style={styles.iconBtn}
                    onPress={() => handleLinking(url)}
                >
                    <AntDesign style={styles.icon} name='earth' />
                </TouchableOpacity>
            </DetailsEditableItem>
            <DetailsEditableItem title='Логин' value={login} onChangeText={setLogin} onEndEditing={() => updateValue('login', login)} />
            <DetailsEditableItem title='Пароль' value={password} onChangeText={setPassword} onEndEditing={() => updateValue('password', password)} password={!showPassword}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => setShowPassword(!showPassword)}>
                    {showPassword
                        ? <FontAwesome style={styles.icon} name={'eye-slash'} />
                        : <FontAwesome style={styles.icon} name={'eye'} />
                    }
                </TouchableOpacity>
            </DetailsEditableItem>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconBtn: {
        position: "absolute",
        right: 20,
    },
    icon: {
        fontSize: 25
    }
})
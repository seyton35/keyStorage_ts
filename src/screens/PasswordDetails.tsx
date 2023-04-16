import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Txt from '../components/custom/Txt'
import { useState, useRef } from 'react'
import DetailsEditableItem from '../components/native/DetailsEditableItem'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

interface Params {
    route: {
        params:
        {
            password: string,
            url: string,
            login: string,
            title: string
        }
    }
}

export default function PasswordDetails({ route }: Params) {
    const [title, setTitle] = useState(route.params.title)
    const [url, setUrl] = useState(route.params.url)
    const [login, setLogin] = useState(route.params.login)
    const [password, setPassword] = useState(route.params.password)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={styles.container}>

            <DetailsEditableItem title='Название' value={title} onChangeText={setTitle} />
            <DetailsEditableItem title='Сайт' value={url} onChangeText={setUrl} hyperLink />
            <DetailsEditableItem title='Логин' value={login} onChangeText={setLogin} />
            <DetailsEditableItem title='Пароль' value={password} onChangeText={setPassword} password={!showPassword}>
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
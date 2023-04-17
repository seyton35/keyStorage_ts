import { Linking, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Txt from '../components/custom/Txt'
import { useState, useRef } from 'react'
import DetailsEditableItem from '../components/native/DetailsEditableItem'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux'
import { updatePassField } from '../store/slices/stateReducer'

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
        dispatch(updatePassField({ index: route.params.index, key, value }))
    }

    return (
        <View style={styles.container}>

            <DetailsEditableItem title='Название' value={title} onChangeText={setTitle} onEndEditing={() => updateValue('title', title)} />
            <DetailsEditableItem title='Сайт' value={url} onChangeText={setUrl} onEndEditing={() => updateValue('url', url)} hyperLink >
                <TouchableOpacity style={styles.iconBtn}
                    onPress={() => Linking.openURL(url)}
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
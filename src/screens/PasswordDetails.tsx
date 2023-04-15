import { StyleSheet, View } from 'react-native'
import Txt from '../components/custom/Txt'

interface Params {
    route: {
        params:
        {
            password: '',
            uri: '',
            login: '',
            src: ''
        }
    }
}

export default function PasswordDetails({ route }: Params) {
    const { password, uri, login, src } = route.params
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.labelBox}>
                    <Txt style={styles.itemLabel}>Источник</Txt>
                </View>
                <Txt style={styles.itemTxt}>{src}</Txt>
            </View>
            <View style={styles.item}>
                <View style={styles.labelBox}>
                    <Txt style={styles.itemLabel}>Сайт</Txt>
                </View>
                <Txt style={styles.itemTxt}>{uri}</Txt>
            </View>
            <View style={styles.item}>
                <View style={styles.labelBox}>
                    <Txt style={styles.itemLabel}>Логин</Txt>
                </View>
                <Txt style={styles.itemTxt}>{login}</Txt>
            </View>
            <View style={styles.item}>
                <View style={styles.labelBox}>
                    <Txt style={styles.itemLabel}>Пароль</Txt>
                </View>
                <Txt style={styles.itemTxt}>{password}</Txt>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        flexDirection: 'row',
    },
    labelBox: {
        width: '25%'
    },
    itemLabel: {
        fontSize: 14,
        color: '#666'
    },
    itemTxt: {
        fontSize: 17,
    },
})
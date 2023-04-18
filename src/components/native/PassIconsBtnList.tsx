import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Logo from './Logo'

interface Params {
    iconList: string[],
    icon: string,
    setIcon: (src: string) => void,
}

export default function PassIconsBtnList({ iconList, icon, setIcon, }: Params) {
    return (
        <View style={styles.iconBtnList}>
            {
                iconList.map((logo, index) => {
                    let style
                    if (logo == icon) {
                        style = {
                            borderRadius: 10,
                            borderWidth: 4,
                            borderColor: '#20d18b',
                        }
                    }
                    return (
                        <TouchableOpacity
                            style={styles.iconBtn}
                            key={index}
                            onPress={() => {
                                setIcon(logo)
                            }}
                        >
                            <Logo
                                size={50}
                                style={style}
                                iconStyle={styles.icon}
                                title={logo} />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    iconBtnList: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        margin:4
    },
    iconBtn: {
        padding: 5
    },
    icon: {
        width: 50,
        height: 50,
    },
})
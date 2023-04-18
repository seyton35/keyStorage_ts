import { Image, ImageStyle, ViewStyle, StyleSheet, View } from 'react-native'
import { accountsLogo_48x48 as logos } from '../../../assets/accountsLogo_48x48'

interface Params {
    title: string,
    size?: number,
    style?: ViewStyle,
    iconStyle?: ImageStyle,
}

export default function Logo({ title, size = 30, style, iconStyle }: Params) {
    if (!logos[title]) {
        title = 'key'
    }

    return (
        <View style={[
            styles.logoBox,
            style
        ]}>
            <Image style={[
                styles.logo,
                { width: size, height: size },
                iconStyle
            ]}
                source={logos[title]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    logoBox: {},
    logo: {
        borderRadius: 10,
        backgroundColor: '#fff'
    }
})
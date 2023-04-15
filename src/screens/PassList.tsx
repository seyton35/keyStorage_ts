import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import Txt from '../components/custom/Txt'
import { useNavigation } from '@react-navigation/native'
import PasswordItemBtn from '../components/native/PasswordItemBtn'

interface Params {
}

export default function PassList({ }: Params) {
    const { passList } = useSelector((s: any) => s.state)
    const nav = useNavigation()


    return (
        <View style={styles.container}>
            <ScrollView>
                {passList.length
                    ? passList.map((pass: any, index: number) => {
                        return (
                            // <TouchableOpacity onPress={() => {
                            //     nav.navigate('password', { ...pass })
                            // }}>
                            //     <Txt>{pass.src}</Txt>
                            // </TouchableOpacity>
                            <PasswordItemBtn key={index} title={pass.src} details={pass} />
                        )
                    })
                    : <Txt>no passwords yet</Txt>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
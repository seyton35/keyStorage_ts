import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import Txt from '../components/custom/Txt'
import { useNavigation } from '@react-navigation/native'
import PasswordItemBtn from '../components/native/PasswordItemBtn'
import AddPassBtn from '../components/native/AddPassBtn'

interface Params {
}

export default function PassList({ }: Params) {
    const { passList } = useSelector((s: any) => s.state)
    const nav = useNavigation()


    return (
        <View style={styles.container}>
            <AddPassBtn style={styles.addPasswordBtn} />
            <ScrollView>
                {passList.length
                    ? passList.map((pass: any, index: number) => {
                        return (
                            <PasswordItemBtn key={index} title={pass.title} details={pass} />
                        )
                    })
                    : <View style={styles.isListEmpty}>
                        <Txt style={styles.isListEmptyTxt}>Пока что нет никаких записей</Txt>
                    </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addPasswordBtn: {
        margin: 10,
        borderRadius: 2,
        backgroundColor: '#ccc'
    },
    isListEmpty:{
        padding:10
    },
    isListEmptyTxt:{
        fontSize:15
    },
    
})
import { StyleSheet, View, TextInput, TouchableOpacity, } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Input from '../components/custom/Input'


interface Params {
    title: string
    setTitle: (val: string) => void
    secure: boolean
    setSequre: (flag: boolean) => void
    onDeleteField: () => void
}

export default function EditCategoryItem({ title, setTitle, secure, setSequre, onDeleteField }: Params) {
    return (
        <View style={styles.categoryItem}>

            <Input style={styles.input} value={title} onChangeText={setTitle} />

            <TouchableOpacity style={styles.checkboxBtn} onPress={() => setSequre(!secure)}>
                <MaterialIcons style={styles.checkboxIcon} name={
                    secure
                        ? 'check-box'
                        : 'check-box-outline-blank'
                }
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={onDeleteField}>
                <Entypo style={styles.deleteIcon} name='cross' />
            </TouchableOpacity>

        </View >
    )
}

const styles = StyleSheet.create({
    categoryItem: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    input: {
        borderColor: "gray",
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 20
    },
    checkboxBtn: {
        padding: 5
    },
    checkboxIcon: {
        fontSize: 40,
        color: '#000',
    },
    deleteBtn: {},
    deleteIcon: {
        fontSize: 50,
        color: '#f00',
    },

})
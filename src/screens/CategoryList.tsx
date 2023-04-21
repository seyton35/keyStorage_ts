import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { NavigationProp } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Txt from '../components/custom/Txt'
import Logo from '../components/native/Logo'
import NavButton from '../components/reusable/NavButton'
import { useEffect } from 'react'

interface Params {
    navigation: NavigationProp<ReactNavigation.RootParamList>
}
interface CategoryType { _id: string, title: string, icon: string, fields: [] }

export default function CategoryList({ navigation }: Params) {
    const { categoryList } = useSelector((s: { state: { categoryList: CategoryType[] } }) => s.state)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => HeaderBtn,
        })
    }, [navigation])


    const HeaderBtn = (
        <NavButton style={styles.navBtn} textStyle={styles.navBtnIcon} route='editCategory'>
            <FontAwesome style={styles.navBtnIcon} name='plus' />
        </NavButton>
    )

    return (
        <ScrollView style={styles.container}>
            <View style={styles.categoryList}>
                {categoryList.map((category: CategoryType, index: number) => {
                    return (
                        <TouchableOpacity style={styles.categoryItem} key={index}
                            onPress={() => navigation.navigate('passList', { params: category })}
                            delayLongPress={300}
                            onLongPress={() => navigation.navigate('editCategory', {
                                index,
                                edit: true,
                                body: { ...category }
                            })}
                        >
                            <Logo style={styles.categoryIcon} title={category.icon} size={60} />
                            <Txt style={styles.categoryTitle}>{category.title}</Txt>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navBtn: {
        backgroundColor: ''
    },
    navBtnIcon: {
        fontSize: 25,
        paddingVertical: 5,
        paddingHorizontal: 7,
        backgroundColor: '#ccc',
        borderRadius: 20
    },

    categoryList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    categoryItem: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        margin: 5,
    },
    categoryIcon: {

    },
    categoryTitle: {
        fontSize: 17,
        fontWeight: '700'
    },
})
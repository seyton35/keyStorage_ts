import { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import EditCategoryItem from './EditCategoryItem'
import Txt from '../components/custom/Txt'
import Modal from '../components/reusable/Modal'
import PassIconsBtnList from '../components/native/PassIconsBtnList'
import { accountsLogo_48x48 } from '../../assets/accountsLogo_48x48'
import Logo from '../components/native/Logo'
import Input from '../components/custom/Input'
import { addCategory, deleteCategory, saveCategoryList, setError, updateCategory } from '../store/slices/stateReducer'
import ErrorView from '../components/native/ErrorView'

interface Params {
    edit?: boolean,
    index?: number
}
interface FieldType { title: string, secure: boolean }

export default function EditCategory({ edit, index }: Params) {
    const [modalVisible, setModalVisible] = useState(false)
    const [icon, setIcon] = useState('key')
    const [title, setTitle] = useState('')
    const [fields, setFields] = useState<FieldType[]>([{ title: '', secure: false }])
    const { error } = useSelector((s: any) => s.state)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    function addFieldBtnHandler() {
        fields.push({
            title: '',
            secure: false
        })
        setFields(fields.map(el => el))
    }

    function deleteField(index: number) {
        const newFields: FieldType[] = []
        fields.forEach((field, i) => {
            if (index !== i) {
                newFields.push(field)
            }
        })
        setFields(newFields)
    }

    function setFieldsProp(prop: string, value: string | boolean, index: number) {
        setFields(fields.map((field, i) => {
            if (index === i) {
                field[prop] = value
            }
            return field
        }))
    }

    function saveCategoryBtnHandler() {
        if (title != '') {
            if (fields.length !== 0) {
                let nonEmpty = false
                for (let i = 0; i < fields.length; i++) {
                    if (fields[i].title.trim() !== '') {
                        nonEmpty = true
                        i = fields.length
                        continue
                    }
                }
                if (nonEmpty) {
                    if (edit) dispatch(updateCategory(index, title, fields, icon,))
                    else dispatch(addCategory({ title, fields, icon }))
                    dispatch(saveCategoryList())
                    navigation.navigate('home')
                } else dispatch(setError('Хотя бы одно поле не должно быть пустым'))
            } else dispatch(setError('Добавьте хотя бы одно поле'))
        } else dispatch(setError('Название не должно быть пустым'))
    }

    function removeCategoryBtnHandler() {
        Alert.alert(
            'Удалить категорию?',
            'Категория будет удалена',
            [
                {
                    text: 'отмена',
                    onPress: () => null
                },
                {
                    text: 'удалить',
                    onPress: () => removeCategory()
                },
            ]
        )
    }

    function removeCategory() {
        if (edit) {
            dispatch(deleteCategory(index))
        }
        navigation.navigate('categoryList')
    }

    return (
        <ScrollView style={styles.container}>

            <Modal visible={modalVisible} setUnvisible={() => setModalVisible(false)}>
                <PassIconsBtnList icon={icon} iconList={Object.keys(accountsLogo_48x48)}
                    setIcon={(icon: string) => {
                        setIcon(icon)
                        setModalVisible(false)
                    }}
                />
            </Modal>

            <ErrorView text={error} />

            <View style={styles.endChangeBtnBox}>
                <TouchableOpacity style={[styles.endChangeBtn, { backgroundColor: '#d90000' }]}
                    onPress={removeCategoryBtnHandler}
                >
                    <Txt style={styles.endChangeBtnTxt}>Удалить</Txt>
                    <FontAwesome style={styles.endChangeBtnIcon} name='trash' />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.endChangeBtn, { backgroundColor: '#00d269' }]}
                    onPress={saveCategoryBtnHandler}
                >
                    <Txt style={styles.endChangeBtnTxt}>Сохранить</Txt>
                    <FontAwesome style={styles.endChangeBtnIcon} name='check' />
                </TouchableOpacity>
            </View>

            <View style={styles.categoryTitleBlock}>
                <TouchableOpacity style={styles.categoryIconBox} onPress={() => setModalVisible(true)}>
                    <Logo size={50} title={icon} style={styles.categoryIcon} />
                </TouchableOpacity>
                <View style={styles.categoryTitleBox}>
                    <Input style={styles.categoryTitleTxt}
                        value={title}
                        onChangeText={setTitle}
                        placeholder='Название категории'
                    />
                </View>

            </View>

            <View style={styles.labelBlock}>
                <Txt style={styles.labelTxt}>Поле</Txt>
                <View style={styles.labelBox}>
                    <FontAwesome style={styles.labelIcon} name={'eye'} />
                    <Txt style={styles.labelTxt}>Удалить</Txt>
                </View>
            </View>

            {fields.map((field, index) => {
                return (
                    <EditCategoryItem key={index}
                        title={field.title}
                        setTitle={(title) => setFieldsProp('title', title, index)}
                        secure={field.secure}
                        setSequre={(flag) => setFieldsProp('secure', flag, index)}
                        onDeleteField={() => deleteField(index)}
                    />
                )
            })
            }

            <TouchableOpacity style={styles.addFieldBtn}
                onPress={addFieldBtnHandler}
            >
                <FontAwesome style={styles.addFieldIcon} name='plus' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addFieldBtn}
                onPress={() => {
                    console.log('title', title)
                    saveCategoryBtnHandler()
                }}
            >
                <FontAwesome style={styles.addFieldIcon} name='check' />
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
    headerTitle: {
        fontSize: 20,
    },
    endChangeBtnBox: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 10
    },
    endChangeBtn: {
        flexDirection: "row",
        padding: 10,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    endChangeBtnTxt: {
        fontSize: 20,
        color: '#fff',
        marginRight: 5
    },
    endChangeBtnIcon: {
        fontSize: 30,
        color: '#fff'
    },

    categoryTitleBlock: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    categoryTitleBox: {
        flex: 1,
    },
    categoryTitleTxt: {},
    categoryIconBox: {
        marginRight: 10
    },
    categoryIcon: {},

    labelBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    labelTxt: {
        color: '#666'
    },
    labelBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 85,
        justifyContent: 'space-between'
    },
    labelIcon: {
        fontSize: 20
    },

    addFieldBtn: {
        marginLeft: 10,
        borderRadius: 10,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        alignSelf: 'flex-start'
    },
    addFieldIcon: {
        fontSize: 40,
        color: '#888'
    },

})
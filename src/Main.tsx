import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { ToastAndroid } from "react-native"

import { initialization } from "./store/slices/stateReducer"
import { setToastAndroidMessage } from "./store/slices/stateReducer"
import Home from "./screens/Home"
import PassList from "./screens/PassList"
import PasswordDetails from "./screens/PasswordDetails"
import AddPassword from "./screens/AddPassword"
import EditCategory from "./screens/EditCategory"
import CategoryList from "./screens/CategoryList"

export default function Main() {
    const { toastAndroidMessage } = useSelector((s: any) => s.state)

    const Stack = createNativeStackNavigator()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialization())
    }, [])

    useEffect(() => {
        if (toastAndroidMessage) {
            ToastAndroid.show(toastAndroidMessage, 0)
            dispatch(setToastAndroidMessage(null))
        }
    }, [toastAndroidMessage])


    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="home"
            >

                <Stack.Group
                // screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="home" component={Home}
                        options={{ title: 'Key storage' }}
                    />
                    <Stack.Screen name="passList" component={PassList}
                        options={{ title: 'Пароли' }}
                    />
                    <Stack.Screen name="password" component={PasswordDetails} />
                    <Stack.Screen name="addPass" component={AddPassword}
                        options={{ title: 'Новый пароль' }}
                    />
                    <Stack.Screen name="editCategory" component={EditCategory}
                        options={{ title: 'Редактор категорий' }}
                    />
                    <Stack.Screen name="categoryList" component={CategoryList}
                        options={{ title: 'Категории' }}
                    />
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    )
}
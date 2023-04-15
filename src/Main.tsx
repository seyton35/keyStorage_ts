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
                    <Stack.Screen name="home" component={Home} />
                    <Stack.Screen name="passList" component={PassList} />
                    <Stack.Screen name="password" component={PasswordDetails} />
                    <Stack.Screen name="addPass" component={AddPassword} />
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    )
}
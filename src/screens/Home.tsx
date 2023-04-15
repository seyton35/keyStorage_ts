import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import Container from "../components/reusable/Container";
import Txt from "../components/custom/Txt";
import { useNavigation } from "@react-navigation/native";
import HomeBtn from "../components/native/HomeBtn";

export default function Home() {
    const nav = useNavigation()

    return (
        <Container>
            <View style={styles.wrapper}>
                <HomeBtn screen="passList" title="Пароли" />
            </View>
        </Container >
    )
}

const styles = StyleSheet.create({
    wrapper: {
    },
})
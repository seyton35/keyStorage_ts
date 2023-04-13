import { StyleSheet, View, } from "react-native";

import Container from "../components/reusable/Container";
import Txt from "../components/custom/Txt";

export default function Home() {

    return (
        <Container>
            <View style={styles.wrapper}>
                <Txt>hello</Txt>

            </View>
        </Container >
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: .85
    },
})
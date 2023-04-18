import { StyleSheet, Pressable, Modal as RNModal } from 'react-native'

interface Params {
    children?: React.ReactNode,
    visible: boolean,
    setUnvisible: () => void
}

export default function Modal({ children, visible, setUnvisible }: Params) {
    return (
        <RNModal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setUnvisible();
            }}
        >
            <Pressable style={styles.modalBlur}
                onPress={setUnvisible}
            >
                {visible && children}
            </Pressable>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    modalBlur: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ddd5'
    },
})
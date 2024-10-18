import  { Dimensions, StyleSheet } from 'react-native'
import { colors } from '../../utils/colors'

const {height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: height * 0.45
    },
    content: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: -40,
        paddingHorizontal: 24
    },
    title: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: "500"
    },
    price: {
        fontSize: 30,
        fontWeight: "bold",
        marginVertical: 8
    },
    description: {
        color: colors.textGrey,
        fontWeight: "300",
        marginVertical: 8
    },
    footer: {
        padding: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    save: {
        flex: 1
    },
    button: {
        marginLeft: 15
    },
    backContainer: {
        backgroundColor: colors.white,
        padding: 10,
        margin: 24,
        borderRadius: 8,
        position: "absolute",
    },
    backIcon: {
        width: 20,
        height: 20
    }
})
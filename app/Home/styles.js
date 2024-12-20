import  { StyleSheet } from 'react-native'
import { colors } from '@utils/colors'
export const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: colors.white
    },
    list: {
        paddingVertical: 24,
    },
    image: {
        width: '100%',
        height: 200
    },
    titleContainer: {
        marginVertical: 54
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center"
    },
    innerTitle: {
        color: colors.orange,
        textDecorationLine: 'underline',
        textAlign: "center"
    },
    footerText: {
        color: colors.blue,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 30
    }
})
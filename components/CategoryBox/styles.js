import { StyleSheet } from "react-native-web";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        marginBottom: 8,
        marginTop: 8,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: colors.grey
    },
    image: {
        width: 32,
        height: 32
    },
    imageContainer: {
        backgroundColor: colors.lightGray,
        padding: 8,
        borderRadius: 8,
        marginBottom: 8
    }
})
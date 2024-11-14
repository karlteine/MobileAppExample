import { StyleSheet } from "react-native-web";
import { colors } from "@utils/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.white
    },
    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold"
    },
    icon: {
        width: 24,
        height: 24
    },
    space: {
        width: 24
    }
})
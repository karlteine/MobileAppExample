import { StyleSheet } from "react-native";
import { colors } from "@utils/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        boxShadow: "0px 3px 3.84px rgba(0, 0, 0, 0.27)",
        elevation: 6,
        backgroundColor: colors.white,
        marginVertical: 12,
        borderRadius: 4
    },
    title: {
        color: colors.blue,
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 6
    },
    subtitle: {
        color: colors.grey,
        fontSize: 12,
        marginTop: 6
    },
    arrow: {
        height: 32,
        width: 32
    }
})
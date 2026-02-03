import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 12,
        justifyContent: "center",
    },

    header: {
        flexDirection: "row",
        paddingHorizontal: 2,
        paddingTop: 0,
    },

    title: {
        color: "#ffffff",
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 32,
        textAlign: "center",
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    label: {
        color: "#ffffff",
        fontSize: 14,
        marginBottom: 6,
    },

     logo: {
        width: 25,
        height: 25,
        resizeMode: 'stretch',
    },

    button: {
        padding: 16,
        alignItems: "center",
        marginTop: 8,
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
    },

    loading: {
        color: "#ffffff",
    },
});

export default homeStyles;
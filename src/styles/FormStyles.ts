import { StyleSheet } from 'react-native';

export const formStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 24,
        justifyContent: "center",
    },

    title: {
        color: "#ffffff",
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 32,
        textAlign: "center",
    },

    inputContainer: {
        marginBottom: 16,
        height: 40,
        borderWidth: 1,
        borderColor: "#2a2a3e65",
        borderRadius: 8,
        padding: 4
    },

    label: {
        color: "#ffffff",
        fontSize: 14,
        marginBottom: 6,
    },

    inputError: {
        borderColor: "#ef4444",
    },

    errorText: {
        color: "#ef4444",
        fontSize: 12,
        margin: 1,
    },
    logo: {
        width: 200,
        height: 50,
        resizeMode: 'stretch',
        marginBottom: 20
    },
    button: {
        backgroundColor: "#0f1920",
        borderRadius: 8,
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
    loadingContainer : {
         flex: 1,
        justifyContent: "center",
        alignItems: "center",

    }
});

export default formStyles;
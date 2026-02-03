import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from "../context/AuthContext";
import { formStyles } from '../styles/FormStyles';

export function LoginScreen() {

    const { state, login } = useAuth()
    const [user, setUser] = useState({
        username: "",
        password: "",
        error: "",
    })

    const handleLogin = () => {
        login(user.username, user.password);
    }
    return (
        <View style={formStyles.container}>
            <Image
                style={formStyles.logo}
                source={require("../../assets/images/experient.png")}
            />
            <TextInput
                style={formStyles.inputContainer}
                placeholder="Username"
                value={user.username}
                onChangeText={(username) => setUser({ ...user, username })}
            />
            <TextInput
                style={formStyles.inputContainer}
                placeholder="Password"
                value={user.password}
                onChangeText={(password) => setUser({ ...user, password })}
            />

            {state.error && (
                <Text style={formStyles.errorText}>{state.error}</Text>
            )}

            <TouchableOpacity
                style={[formStyles.button, state.isLoading && formStyles.buttonDisabled]}
                onPress={handleLogin}
                disabled={state.isLoading}
            >
                <Text style={formStyles.buttonText}>Login</Text>
            </TouchableOpacity>

        </View>
    )

};
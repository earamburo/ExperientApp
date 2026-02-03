import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppStack } from "./navigation/AppStack";
import { AuthStack } from "./navigation/AuthStack";
import formStyles from "./styles/FormStyles";


const Navigation = () => {
    const { state } = useAuth();

    if (state.isLoading) {
        return (
           <View style={formStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#0f1920" />
            </View>
        );
    }

    return (
            <NavigationContainer>
                {state.isAuthenticated ?
                    <AppStack/>
                    : 
                    <AuthStack/>
                }
            </NavigationContainer>
    )
}

export function App() {
    return (
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    )
}




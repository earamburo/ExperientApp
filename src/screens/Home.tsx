import React from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { mockUser, useAuth } from '../context/AuthContext';
import homeStyles from "../styles/HomeStyles";


export function HomeScreen() {
    const { logout  } = useAuth();
    const handleLogout = () => {
        logout()
    }
    return (
        <View style={homeStyles.container}>
            <View style={homeStyles.header}>
                <TouchableOpacity style={homeStyles.button} onPress={handleLogout}>
                    <TouchableOpacity onPress={logout}>
                        <Image
                            style={homeStyles.logo}
                            source={require("../../assets/images/logout.svg")}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <View style={homeStyles.content}>
                <Text>Welcome Home {mockUser.firstName} {mockUser.lastName} </Text>

            </View>
        </View>
    )

}

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from '../screens/Login';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator id="Login" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  

  );
}
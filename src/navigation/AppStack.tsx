import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeScreen } from '../screens/Home';

const Stack = createNativeStackNavigator();

export function AppStack() {
  return (
    <Stack.Navigator id="Authenticated" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  

  );
}
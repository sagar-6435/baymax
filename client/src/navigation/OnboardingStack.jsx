import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import SplashScreen from '../pages/onboarding/SplashScreen';
import WelcomeOnboardingScreen from '../pages/onboarding/WelcomeOnboardingScreen';
import LoginScreen from '../pages/auth/LoginScreen';
import SignupScreen from '../pages/auth/SignupScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  const { hasSeenWelcome } = useAuth();

  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName={hasSeenWelcome ? "Login" : "SplashScreen"}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeOnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../pages/health_onboarding/WelcomeScreen';
import AboutYouScreen from '../pages/health_onboarding/AboutYouScreen';
import BodyProfileScreen from '../pages/health_onboarding/BodyProfileScreen';
import HealthConditionsScreen from '../pages/health_onboarding/HealthConditionsScreen';
import MedicinesAllergiesScreen from '../pages/health_onboarding/MedicinesAllergiesScreen';
import EmergencyContactScreen from '../pages/health_onboarding/EmergencyContactScreen';
import CompletionScreen from '../pages/health_onboarding/CompletionScreen';

const Stack = createNativeStackNavigator();

export default function HealthOnboardingStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="AboutYou" component={AboutYouScreen} />
      <Stack.Screen name="BodyProfile" component={BodyProfileScreen} />
      <Stack.Screen name="HealthConditions" component={HealthConditionsScreen} />
      <Stack.Screen name="MedicinesAllergies" component={MedicinesAllergiesScreen} />
      <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} />
      <Stack.Screen name="Completion" component={CompletionScreen} />
    </Stack.Navigator>
  );
}

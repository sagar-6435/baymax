import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingStack from './OnboardingStack';
import MainTabNavigator from './MainTabNavigator';
import HealthOnboardingStack from './HealthOnboardingStack';
import { useAuth } from '../context/AuthContext';

// Modals
import VoiceInputScreen from '../pages/health/VoiceInputScreen';
import MedicineScanner from '../pages/medicine/MedicineScanner';
import ArFirstAidCamera from '../pages/firstaid/ArFirstAidCamera';
import ExportOptions from '../pages/reports/ExportOptions';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated, user } = useAuth();

  const isHealthOnboardingComplete = user?.onboarding?.completed || user?.onboarding?.skipped;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main Flow Group */}
      <Stack.Group>
        {!isAuthenticated ? (
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        ) : !isHealthOnboardingComplete ? (
          <Stack.Screen name="HealthOnboarding" component={HealthOnboardingStack} />
        ) : (
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
        )}
      </Stack.Group>

      {/* Global Modals Group */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="VoiceInputModal" component={VoiceInputScreen} />
        <Stack.Screen name="MedicineScannerModal" component={MedicineScanner} />
        <Stack.Screen name="ArFirstAidCameraModal" component={ArFirstAidCamera} />
        <Stack.Screen name="ExportOptionsModal" component={ExportOptions} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingStack from './OnboardingStack';
import MainTabNavigator from './MainTabNavigator';
import { useAuth } from '../context/AuthContext';

// Modals
import VoiceInputScreen from '../pages/health/VoiceInputScreen';
import MedicineScanner from '../pages/medicine/MedicineScanner';
import ArFirstAidCamera from '../pages/firstaid/ArFirstAidCamera';
import ExportOptions from '../pages/reports/ExportOptions';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isOnboardingCompleted } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main Flow Group */}
      <Stack.Group>
        {!isOnboardingCompleted ? (
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
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

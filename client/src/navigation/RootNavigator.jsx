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
import OfflineEmergencyMode from '../pages/firstaid/OfflineEmergencyMode';
import EmergencyStepViewer from '../pages/firstaid/EmergencyStepViewer';

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
        <Stack.Screen name="OfflineEmergencyMode" component={OfflineEmergencyMode} screenOptions={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="EmergencyStepViewer" component={EmergencyStepViewer} screenOptions={{ presentation: 'fullScreenModal' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme';

// Import Stacks
import { HomeStack, HealthStack, FirstAidStack, LearningStack, ProfileStack } from './FeatureStacks';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'HealthTab') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          } else if (route.name === 'FirstAidTab') {
            iconName = focused ? 'bandage' : 'bandage-outline';
          } else if (route.name === 'LearningTab') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.darkGray,
        tabBarStyle: { 
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 15, 
          paddingTop: 5, 
          height: 80
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="HealthTab" component={HealthStack} options={{ title: 'Health' }} />
      <Tab.Screen name="FirstAidTab" component={FirstAidStack} options={{ title: 'First Aid' }} />
      <Tab.Screen name="LearningTab" component={LearningStack} options={{ title: 'Learn' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

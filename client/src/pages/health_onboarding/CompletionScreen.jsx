import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const CompletionScreen = () => {
  const { user, updateUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleFinish = async () => {
    try {
      setIsSaving(true);
      // Mark onboarding as completed
      const updatedUser = await userService.updateProfile({ 
        onboarding: { ...user.onboarding, completed: true } 
      });
      await updateUser(updatedUser);
      // We do not need to call navigation.navigate('MainApp') manually here.
      // RootNavigator will automatically re-render and route to MainApp 
      // because isHealthOnboardingComplete will now evaluate to true.
    } catch (error) {
      console.error('Error completing onboarding', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={{ fontSize: 64 }}>🎉</Text>
        </View>

        <Text style={styles.title}>You're all set!</Text>
        <Text style={styles.subtitle}>BayMax is ready to care for you. 💛</Text>
        <Text style={styles.description}>
          Your profile is ready. You can update your information anytime from Settings.
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          title={isSaving ? "Finishing..." : "Go to My Home →"} 
          onPress={handleFinish} 
          disabled={isSaving}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.darkGray,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
});

export default CompletionScreen;

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const WelcomeScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();

  const handleSkip = async () => {
    try {
      const updatedUser = await userService.updateProfile({ onboarding: { ...user.onboarding, skipped: true } });
      await updateUser(updatedUser);
      // Navigation state will automatically update because RootNavigator listens to user state
    } catch (error) {
      console.error('Error skipping onboarding', error);
    }
  };

  const handleGetStarted = () => {
    navigation.navigate('AboutYou');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="heart" size={80} color={colors.primary} />
        </View>

        <Text style={styles.title}>Welcome to BayMax 💛</Text>
        <Text style={styles.subtitle}>Let's personalize your BayMax experience.</Text>
        <Text style={styles.description}>
          Tell us a little about yourself and your health so we can make your experience more personalized.
        </Text>
        <Text style={styles.privacyNote}>
          <Ionicons name="lock-closed" size={12} color={colors.darkGray} /> Your health information is private and can be updated or deleted from your profile.
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Get Started →" onPress={handleGetStarted} />
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkGray,
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
  privacyNote: {
    fontSize: 12,
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  skipButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  skipButtonText: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: '600',
  }
});

export default WelcomeScreen;

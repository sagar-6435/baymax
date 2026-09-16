import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, globalStyles } from '../../theme';

const WelcomeOnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.featureBlock}>
          <Text style={styles.title}>Your AI Health Companion</Text>
          <Text style={styles.description}>
            Meet Baymax, your personal AI healthcare companion. Baymax is here to help you understand your health better.
          </Text>
        </View>

        <View style={styles.featureBlock}>
          <Text style={styles.title}>Learn First Aid Visually</Text>
          <Text style={styles.description}>
            Baymax offers interactive AR First-Aid tutorials to guide you step-by-step through emergency situations.
          </Text>
        </View>

        <View style={styles.featureBlock}>
          <Text style={styles.title}>Health, Education & Wellness</Text>
          <Text style={styles.description}>
            Track your wellness, scan medicines, and learn about your body. Baymax is your all-in-one health platform.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="Get Started" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.white,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
    justifyContent: 'center',
  },
  featureBlock: {
    marginBottom: 40,
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    padding: 20,
    borderRadius: globalStyles.cardRadius,
  },
  title: {
    fontSize: 22, 
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 12,
    color: colors.black,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.darkGray,
    lineHeight: 24,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  }
});

export default WelcomeOnboardingScreen;

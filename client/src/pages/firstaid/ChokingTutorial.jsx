import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';

const ChokingTutorial = ({ navigation }) => {
  const steps = [
    { id: 1, title: 'Ask if they are choking', desc: 'Ask "Are you choking?" If they cannot cough, speak, or breathe, act immediately.' },
    { id: 2, title: 'Give 5 Back Blows', desc: 'Stand behind them. Give 5 firm back blows between the shoulder blades with the heel of your hand.' },
    { id: 3, title: 'Give 5 Abdominal Thrusts', desc: 'Make a fist just above their navel. Grab your fist with the other hand and give 5 quick, upward thrusts (Heimlich maneuver).' },
    { id: 4, title: 'Repeat Cycle', desc: 'Repeat 5 back blows and 5 abdominal thrusts until the object is forced out or the person becomes unresponsive.' },
    { id: 5, title: 'Call 911 if Unresponsive', desc: 'If the person loses consciousness, lower them to the floor gently, call 911 immediately, and begin CPR.' },
  ];

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} title="Choking Guide" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Warning Banner */}
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={24} color={colors.white} />
          <Text style={styles.warningText}>ACT QUICKLY • HEIMLICH MANEUVER</Text>
        </View>

        {/* Icon Illustration Box */}
        <View style={styles.illustrationWrapper}>
          <View style={styles.iconCircle}>
            <Ionicons name="warning" size={60} color="#FF9500" />
          </View>
          <Text style={styles.illustrationLabel}>Choking First Aid Protocol</Text>
        </View>

        <Text style={styles.sectionHeading}>STEP-BY-STEP INSTRUCTIONS</Text>

        {steps.map((step) => (
          <View key={step.id} style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>{step.id}</Text>
            </View>
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <PrimaryButton title="Finish Tutorial" onPress={() => navigation.goBack()} />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20 },
  warningBanner: {
    backgroundColor: '#FF9500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: '#FF9500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  warningText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 15,
    marginLeft: 10,
    letterSpacing: 0.8,
  },
  illustrationWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 22,
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#FF9500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  illustrationLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#9A3412',
    letterSpacing: 0.4,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  stepCard: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  stepNumberContainer: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumber: {
    color: colors.black,
    fontWeight: '900',
    fontSize: 16,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.black,
    marginBottom: 6,
  },
  stepDesc: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 21,
  },
  footer: {
    marginTop: 16,
  }
});

export default ChokingTutorial;

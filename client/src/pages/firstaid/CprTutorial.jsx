import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';

const CprTutorial = ({ navigation }) => {
  const steps = [
    { id: 1, title: 'Check for Responsiveness', desc: 'Shake the person gently and shout, "Are you okay?"' },
    { id: 2, title: 'Call 911', desc: 'If there is no response, call emergency services immediately or direct someone else to do it.' },
    { id: 3, title: 'Open the Airway', desc: 'Tilt their head back slightly and lift their chin.' },
    { id: 4, title: 'Check Breathing', desc: 'Listen for breathing for no more than 10 seconds.' },
    { id: 5, title: 'Chest Compressions', desc: 'Place the heel of your hand on the center of their chest. Push hard and fast (100-120 compressions per minute).' },
  ];

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={24} color={colors.white} />
          <Text style={styles.warningText}>CALL 911 IMMEDIATELY</Text>
        </View>

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
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20, 
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border 
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  content: { padding: 20 },
  warningBanner: {
    backgroundColor: colors.error, flexDirection: 'row', alignItems: 'center', 
    justifyContent: 'center', padding: 16, borderRadius: globalStyles.cardRadius, marginBottom: 20
  },
  warningText: { color: colors.white, fontWeight: 'bold', fontSize: 16, marginLeft: 10, letterSpacing: 1 },
  stepCard: {
    backgroundColor: colors.white, flexDirection: 'row', padding: 16, 
    borderRadius: globalStyles.cardRadius, marginBottom: 12, borderWidth: 1, borderColor: colors.border
  },
  stepNumberContainer: {
    backgroundColor: colors.primary, width: 32, height: 32, borderRadius: 16, 
    alignItems: 'center', justifyContent: 'center', marginRight: 16
  },
  stepNumber: { color: colors.black, fontWeight: 'bold', fontSize: 16 },
  stepTextContainer: { flex: 1 },
  stepTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  stepDesc: { fontSize: 14, color: colors.darkGray, lineHeight: 20 },
  footer: { marginTop: 20 }
});

export default CprTutorial;

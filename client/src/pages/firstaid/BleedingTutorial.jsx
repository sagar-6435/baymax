import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';

const BleedingTutorial = ({ navigation }) => {
  const steps = [
    { id: 1, title: 'Ensure Safety', desc: 'Make sure the environment is safe and put on medical gloves if available.' },
    { id: 2, title: 'Apply Pressure', desc: 'Use a clean cloth or sterile gauze to apply firm, direct pressure on the wound.' },
    { id: 3, title: 'Elevate', desc: 'If possible, elevate the injured area above the heart to slow down blood flow.' },
    { id: 4, title: 'Bandage', desc: 'Once bleeding is controlled, wrap a bandage firmly over the dressing.' },
    { id: 5, title: 'Seek Help', desc: 'If bleeding does not stop after 10 minutes of direct pressure, seek emergency medical care.' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SEVERE BLEEDING</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={24} color={colors.white} />
          <Text style={styles.warningText}>SEEK EMERGENCY HELP IF SEVERE</Text>
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
  container: { flex: 1, backgroundColor: colors.lightGray },
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

export default BleedingTutorial;

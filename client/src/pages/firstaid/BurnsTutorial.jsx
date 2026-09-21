import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';

const burnsIllustration = require('../../../assets/firstaid/burns.jpg');

const BurnsTutorial = ({ navigation }) => {
  const steps = [
    { id: 1, title: 'Cool the Burn', desc: 'Run cool (not cold) water over the burn for at least 10 minutes.' },
    { id: 2, title: 'Remove Constrictions', desc: 'Quickly and gently remove rings or tight items from the burned area before it swells.' },
    { id: 3, title: "Don't Break Blisters", desc: 'Blisters help protect against infection. If a blister breaks, clean it with water and mild soap.' },
    { id: 4, title: 'Cover the Burn', desc: 'Loosely cover the burn with a sterile, non-stick bandage.' },
    { id: 5, title: 'Seek Medical Care', desc: 'For severe burns, burns on the face or joints, or chemical burns, seek professional help immediately.' },
  ];

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} title="Burns Guide" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Warning Banner */}
        <View style={styles.warningBanner}>
          <Ionicons name="warning" size={24} color={colors.white} />
          <Text style={styles.warningText}>DO NOT APPLY ICE OR BUTTER</Text>
        </View>

        {/* First Aid Illustration Image */}
        <View style={styles.illustrationWrapper}>
          <Image source={burnsIllustration} style={styles.illustrationImage} resizeMode="contain" />
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
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  warningText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 16,
    marginLeft: 10,
    letterSpacing: 0.8,
  },
  illustrationWrapper: {
    width: '100%',
    height: 200,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#000000',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
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

export default BurnsTutorial;

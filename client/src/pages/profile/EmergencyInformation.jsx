import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const emergencyContacts = [
  { name: 'Maya Mercer', relation: 'Partner', phone: '(555) 014-2211' },
  { name: 'David Mercer', relation: 'Father', phone: '(555) 014-9932' },
  { name: 'Dr. Elena Park', relation: 'Primary Care', phone: '(555) 017-2058' },
];

const EmergencyInformation = ({ navigation }) => {
  const handleEmergencyCall = () => {
    Alert.alert('Emergency services', 'This action would trigger a direct emergency call flow in production.');
  };

  const handleNotifyContacts = () => {
    Alert.alert('Alert contacts', 'Emergency notifications would be sent to your saved contacts right now.');
  };

  const handleFirstAid = () => {
    Alert.alert('First aid', 'Open the emergency first-aid guide to review critical instructions.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EMERGENCY</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.alertCard}>
          <Ionicons name="warning" size={44} color={colors.error} />
          <Text style={styles.alertTitle}>Critical information</Text>
          <Text style={styles.alertText}>Keep your medical profile and emergency contacts up to date so BayMax can respond quickly when you need it most.</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.error }]} onPress={handleEmergencyCall}>
            <Ionicons name="call" size={18} color={colors.white} />
            <Text style={styles.actionButtonText}>Call 911</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.darkGray }]} onPress={handleNotifyContacts}>
            <Ionicons name="notifications" size={18} color={colors.white} />
            <Text style={styles.actionButtonText}>Notify contacts</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>EMERGENCY CONTACTS</Text>
        <View style={styles.card}>
          {emergencyContacts.map(({ name, relation, phone }) => (
            <View key={name} style={styles.contactRow}>
              <View style={styles.contactBadge}>
                <Ionicons name="person" size={18} color={colors.white} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{name}</Text>
                <Text style={styles.contactMeta}>{relation}</Text>
                <Text style={styles.contactMeta}>{phone}</Text>
              </View>
              <TouchableOpacity onPress={() => Alert.alert('Call', `Dialing ${name} now.`)}>
                <Ionicons name="call-outline" size={20} color={colors.success} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>MEDICAL SUMMARY</Text>
        <View style={styles.card}>
          <Text style={styles.summaryTitle}>Important notes</Text>
          <Text style={styles.summaryText}>• Blood type: O+</Text>
          <Text style={styles.summaryText}>• Allergies: Penicillin</Text>
          <Text style={styles.summaryText}>• Conditions: Asthma, occasional dizziness</Text>
          <Text style={styles.summaryText}>• Preferred hospital: Northside Medical Center</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleFirstAid}>
          <Text style={styles.primaryButtonText}>Open first-aid guide</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.lightGray },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  content: { padding: 20 },

  alertCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },
  alertTitle: { fontSize: 20, fontWeight: 'bold', color: colors.black, marginTop: 12 },
  alertText: { fontSize: 14, color: colors.darkGray, textAlign: 'center', lineHeight: 20, marginTop: 8 },

  quickActions: { flexDirection: 'row', marginBottom: 20, gap: 12 },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: globalStyles.buttonRadius,
    gap: 8,
  },
  actionButtonText: { color: colors.white, fontWeight: '700' },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGray,
    letterSpacing: 1,
    marginBottom: 12,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: globalStyles.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  contactBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 16, fontWeight: '600', color: colors.black },
  contactMeta: { fontSize: 12, color: colors.darkGray, marginTop: 2 },

  summaryTitle: { fontSize: 18, fontWeight: '700', color: colors.black, marginBottom: 10 },
  summaryText: { fontSize: 14, color: colors.darkGray, marginBottom: 6 },

  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: globalStyles.buttonRadius,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: { color: colors.black, fontWeight: '700', fontSize: 16 },
});

export default EmergencyInformation;

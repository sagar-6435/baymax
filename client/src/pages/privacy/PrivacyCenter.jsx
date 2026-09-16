import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const PrivacyCenter = ({ navigation }) => {
  const [privacyPrefs, setPrivacyPrefs] = useState({
    localAiOnly: true,
    cloudBackup: false,
    wellnessSharing: false,
    emergencySharing: true,
  });

  const toggleSetting = (key) => {
    setPrivacyPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDataExport = () => {
    Alert.alert('Data export started', 'Your health data and conversation history are being packaged securely for download.');
  };

  const handleDeleteData = () => {
    Alert.alert(
      'Delete local data?',
      'This removes saved health history and app preferences from this device. You can still restore data from a backup later.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete Local Data', style: 'destructive', onPress: () => Alert.alert('Data cleared') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PRIVACY CENTER</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.securityCard}>
          <Ionicons name="shield-checkmark" size={56} color={colors.success} />
          <Text style={styles.securityTitle}>Your data stays protected</Text>
          <Text style={styles.securityText}>
            BayMax keeps health conversations and sensitive summaries on-device by default, so your information remains private unless you choose to share it.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>DATA CONTROLS</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.actionRow} onPress={handleDataExport}>
            <View style={styles.actionLeft}>
              <Ionicons name="download-outline" size={22} color={colors.primary} />
              <View style={styles.actionTextWrap}>
                <Text style={styles.actionTitle}>Download my data</Text>
                <Text style={styles.actionDesc}>Export your health records and chat archive.</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.darkGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow} onPress={handleDeleteData}>
            <View style={styles.actionLeft}>
              <Ionicons name="trash-outline" size={22} color={colors.error} />
              <View style={styles.actionTextWrap}>
                <Text style={[styles.actionTitle, { color: colors.error }]}>Delete local data</Text>
                <Text style={styles.actionDesc}>Remove saved health information from this device.</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.darkGray} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>CONSENT</Text>
        <View style={styles.card}>
          {[
            { key: 'localAiOnly', label: 'Local AI processing', description: 'Keep analysis on this device', icon: 'server' },
            { key: 'cloudBackup', label: 'Cloud backup', description: 'Store encrypted backups in the cloud', icon: 'cloud-upload' },
            { key: 'wellnessSharing', label: 'Wellness sharing', description: 'Allow sharing anonymized wellness trends', icon: 'share-social' },
            { key: 'emergencySharing', label: 'Emergency contact access', description: 'Share profile info in critical events', icon: 'medical' },
          ].map(({ key, label, description, icon }) => (
            <View key={key} style={styles.preferenceRow}>
              <View style={styles.actionLeft}>
                <View style={styles.iconCircle}>
                  <Ionicons name={icon} size={18} color={colors.darkGray} />
                </View>
                <View style={styles.actionTextWrap}>
                  <Text style={styles.actionTitle}>{label}</Text>
                  <Text style={styles.actionDesc}>{description}</Text>
                </View>
              </View>
              <Switch
                value={privacyPrefs[key]}
                onValueChange={() => toggleSetting(key)}
                trackColor={{ false: colors.border, true: colors.success }}
                thumbColor={colors.white}
              />
            </View>
          ))}
        </View>

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

  securityCard: {
    backgroundColor: colors.white,
    borderRadius: globalStyles.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 28,
    alignItems: 'center',
    marginBottom: 24,
  },
  securityTitle: { fontSize: 22, fontWeight: 'bold', color: colors.black, marginTop: 12, marginBottom: 8 },
  securityText: { fontSize: 14, color: colors.darkGray, textAlign: 'center', lineHeight: 20 },

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
    overflow: 'hidden',
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  actionTextWrap: { flex: 1, marginLeft: 12 },
  actionTitle: { fontSize: 16, fontWeight: '600', color: colors.black },
  actionDesc: { fontSize: 12, color: colors.darkGray, marginTop: 3 },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrivacyCenter;

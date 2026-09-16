import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { colors, globalStyles } from '../../theme';

const Settings = ({ navigation }) => {
  const { isDarkMode, setDarkMode } = useAuth();

  const [preferences, setPreferences] = useState({
    darkMode: isDarkMode,
    notifications: true,
    voiceAlerts: true,
    aiSuggestions: true,
    locationSharing: false,
    dataBackup: true,
    haptics: true,
  });

  useEffect(() => {
    setPreferences((prev) => ({ ...prev, darkMode: isDarkMode }));
  }, [isDarkMode]);

  const toggleSetting = (key) => {
    setPreferences((prev) => {
      const nextValue = !prev[key];
      const updated = { ...prev, [key]: nextValue };

      if (key === 'darkMode') {
        setDarkMode(nextValue);
      }

      return updated;
    });
  };

  const quickSettings = [
    { key: 'darkMode', label: 'Appearance', description: 'Dark mode and contrast', icon: 'moon', color: colors.darkGray },
    { key: 'notifications', label: 'Notifications', description: 'Alerts and reminders', icon: 'notifications', color: colors.success },
    { key: 'voiceAlerts', label: 'Voice', description: 'Voice prompts and audio feedback', icon: 'mic', color: colors.primary },
    { key: 'aiSuggestions', label: 'AI Assistant', description: 'Smart recommendations', icon: 'sparkles', color: colors.warning },
    { key: 'locationSharing', label: 'Permissions', description: 'Location and sensor access', icon: 'shield-checkmark', color: colors.error },
    { key: 'dataBackup', label: 'Data & Storage', description: 'Sync and local backups', icon: 'cloud-upload', color: colors.darkGray },
  ];

  const categories = [
    { label: 'Connected devices', icon: 'watch', description: 'Bluetooth and wearable sync' },
    { label: 'Language', icon: 'language', description: 'English, Español, Français' },
    { label: 'Accessibility', icon: 'accessibility', description: 'Screen reader and contrast tools' },
    { label: 'Privacy', icon: 'lock-closed', description: 'Consent and data controls' },
  ];

  const handleCategoryPress = (label) => {
    Alert.alert(label, 'This settings area is ready for deeper configuration in the next update.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SETTINGS</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <View style={styles.card}>
          {quickSettings.map(({ key, label, description, icon, color }) => (
            <View key={key} style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconWrap, { backgroundColor: color }]}>
                  <Ionicons name={icon} size={20} color={colors.white} />
                </View>
                <View style={styles.textWrap}>
                  <Text style={styles.settingLabel}>{label}</Text>
                  <Text style={styles.settingDesc}>{description}</Text>
                </View>
              </View>
              <Switch
                value={preferences[key]}
                onValueChange={() => toggleSetting(key)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>ADVANCED</Text>
        <View style={styles.card}>
          {categories.map(({ label, icon, description }) => (
            <TouchableOpacity key={label} style={styles.categoryRow} onPress={() => handleCategoryPress(label)}>
              <View style={styles.settingInfo}>
                <View style={styles.iconWrapSecondary}>
                  <Ionicons name={icon} size={18} color={colors.darkGray} />
                </View>
                <View style={styles.textWrap}>
                  <Text style={styles.settingLabel}>{label}</Text>
                  <Text style={styles.settingDesc}>{description}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.darkGray} />
            </TouchableOpacity>
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

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGray,
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 8,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: globalStyles.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  settingInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  textWrap: { flex: 1 },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconWrapSecondary: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: colors.lightGray,
  },
  settingLabel: { fontSize: 16, fontWeight: '600', color: colors.black },
  settingDesc: { fontSize: 12, color: colors.darkGray, marginTop: 2 },
});

export default Settings;

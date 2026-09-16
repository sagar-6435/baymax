import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const Settings = ({ navigation }) => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    shakeToAlert: true
  });

  const toggleSwitch = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
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

      <ScrollView style={styles.content}>
        
        <Text style={styles.sectionTitle}>APPEARANCE</Text>
        <View style={styles.settingsCard}>
          <View style={[styles.settingsRow, { borderBottomWidth: 0 }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon" size={22} color={colors.darkGray} style={styles.icon} />
              <Text style={styles.settingLabel}>Dark Theme</Text>
            </View>
            <Switch 
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
              value={settings.darkMode}
              onValueChange={() => toggleSwitch('darkMode')}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        <View style={styles.settingsCard}>
          <View style={[styles.settingsRow, { borderBottomWidth: 0 }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={22} color={colors.darkGray} style={styles.icon} />
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch 
              trackColor={{ false: colors.border, true: colors.success }}
              thumbColor={colors.white}
              value={settings.notifications}
              onValueChange={() => toggleSwitch('notifications')}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>EMERGENCY FEATURES</Text>
        <View style={styles.settingsCard}>
          <View style={[styles.settingsRow, { borderBottomWidth: 0, paddingVertical: 20 }]}>
            <View style={[styles.settingInfo, { flex: 1 }]}>
              <Ionicons name="phone-portrait-outline" size={22} color={colors.error} style={styles.icon} />
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.settingLabel}>Shake for Emergency</Text>
                <Text style={styles.settingDesc}>Shake phone continuously for 3 seconds to trigger an SOS alert.</Text>
              </View>
            </View>
            <Switch 
              trackColor={{ false: colors.border, true: colors.error }}
              thumbColor={colors.white}
              value={settings.shakeToAlert}
              onValueChange={() => toggleSwitch('shakeToAlert')}
            />
          </View>
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
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 12, marginTop: 10 },
  settingsCard: {
    backgroundColor: colors.white, borderRadius: globalStyles.cardRadius,
    borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, marginBottom: 20
  },
  settingsRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.lightGray
  },
  settingInfo: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 12 },
  settingLabel: { fontSize: 16, color: colors.black, fontWeight: '500' },
  settingDesc: { fontSize: 13, color: colors.darkGray, marginTop: 4, lineHeight: 18 }
});

export default Settings;

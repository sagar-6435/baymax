import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const Profile = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarMock}>
          <Text style={styles.avatarText}>AM</Text>
        </View>
        <Text style={styles.name}>Alex Mercer</Text>
        <Text style={styles.email}>alex@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACCOUNT DETAILS</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('PersonalInformation')}>
            <Ionicons name="person-outline" size={20} color={colors.darkGray} style={styles.listIcon} />
            <Text style={styles.listText}>Personal Information</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.border} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('HealthPreferences')}>
            <Ionicons name="heart-outline" size={20} color={colors.darkGray} style={styles.listIcon} />
            <Text style={styles.listText}>Health Preferences</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.border} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('EmergencyInformation')}>
            <Ionicons name="call-outline" size={20} color={colors.darkGray} style={styles.listIcon} />
            <Text style={styles.listText}>Emergency Contacts</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.border} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={20} color={colors.darkGray} style={styles.listIcon} />
            <Text style={styles.listText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.border} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('PrivacyCenter')}>
            <Ionicons name="lock-closed-outline" size={20} color={colors.darkGray} style={styles.listIcon} />
            <Text style={styles.listText}>Privacy Center</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.border} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={{height: 40}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.lightGray },
  headerContainer: { backgroundColor: colors.white, paddingVertical: 40, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border },
  avatarMock: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { fontSize: 32, color: colors.black, fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  email: { fontSize: 16, color: colors.darkGray },
  
  section: { marginTop: 30, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
  
  card: {
    backgroundColor: colors.white,
    borderRadius: globalStyles.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden'
  },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  listIcon: { marginRight: 16 },
  listText: { flex: 1, fontSize: 16, color: colors.black, fontWeight: '500' },
  divider: { height: 1, backgroundColor: colors.border, marginLeft: 52 }
});

export default Profile;

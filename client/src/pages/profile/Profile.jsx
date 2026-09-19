import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { useAuth } from '../../context/AuthContext';

const Profile = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Sign Out', 
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            console.error('Logout error:', error);
          }
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarMock}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'B'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.email || 'No email provided'}</Text>
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
            <Text style={styles.listText}>Health Details</Text>
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

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.error || '#FF3B30'} style={styles.listIcon} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
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
  divider: { height: 1, backgroundColor: colors.border, marginLeft: 52 },
  logoutButton: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: globalStyles.cardRadius,
    borderWidth: 1,
    borderColor: colors.error || '#FF3B30',
    marginTop: 10
  },
  logoutText: {
    fontSize: 16,
    color: colors.error || '#FF3B30',
    fontWeight: 'bold',
    marginLeft: 8
  }
});

export default Profile;

import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { useAuth } from '../../context/AuthContext';

const AppearanceSettings = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useAuth();

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>THEME PREFERENCES</Text>
        
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons 
                name={isDarkMode ? "moon" : "sunny"} 
                size={24} 
                color={colors.primary} 
                style={styles.settingIcon}
              />
              <View>
                <Text style={styles.cardTitle}>Dark Mode</Text>
                <Text style={styles.cardText}>
                  Reduce glare and improve night viewing
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.toggleContainer, isDarkMode && styles.toggleActive]} 
              onPress={toggleDarkMode}
              activeOpacity={0.8}
            >
              <View style={[styles.toggleCircle, isDarkMode && styles.toggleCircleActive]} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={colors.darkGray} />
          <Text style={styles.infoText}>
            Changing your theme will instantly restart the app to apply the new colors seamlessly across all screens.
          </Text>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  
  content: { padding: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  card: { 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20, 
    borderRadius: globalStyles.cardRadius, 
    marginBottom: 16 
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  cardText: { fontSize: 14, color: colors.darkGray, lineHeight: 20, maxWidth: '80%' },
  
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 16,
  },

  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 15,
    backgroundColor: colors.border,
    justifyContent: 'center',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: colors.success,
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleCircleActive: {
    transform: [{ translateX: 22 }],
  },

  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: globalStyles.cardRadius,
    marginTop: 10,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: colors.darkGray,
    lineHeight: 20,
  }
});

export default AppearanceSettings;

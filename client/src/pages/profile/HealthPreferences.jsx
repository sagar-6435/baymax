import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const HealthPreferences = ({ navigation }) => {
  const [preferences, setPreferences] = useState({
    vegan: false,
    glutenFree: true,
    nutAllergy: false,
    dailyStepGoal: true,
    sleepTracking: true
  });

  const toggleSwitch = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HEALTH PREFERENCES</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>DIETARY RESTRICTIONS</Text>
        <View style={styles.preferenceCard}>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Vegan / Vegetarian</Text>
            <Switch 
              trackColor={{ false: colors.border, true: colors.success }}
              thumbColor={colors.white}
              value={preferences.vegan}
              onValueChange={() => toggleSwitch('vegan')}
            />
          </View>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Gluten-Free</Text>
            <Switch 
              trackColor={{ false: colors.border, true: colors.success }}
              thumbColor={colors.white}
              value={preferences.glutenFree}
              onValueChange={() => toggleSwitch('glutenFree')}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>ALLERGIES</Text>
        <View style={styles.preferenceCard}>
          <View style={[styles.preferenceRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.preferenceLabel}>Nut Allergy</Text>
            <Switch 
              trackColor={{ false: colors.border, true: colors.error }}
              thumbColor={colors.white}
              value={preferences.nutAllergy}
              onValueChange={() => toggleSwitch('nutAllergy')}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>GOALS & TRACKING</Text>
        <View style={styles.preferenceCard}>
          <View style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Enforce Daily Step Goal</Text>
            <Switch 
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
              value={preferences.dailyStepGoal}
              onValueChange={() => toggleSwitch('dailyStepGoal')}
            />
          </View>
          <View style={[styles.preferenceRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.preferenceLabel}>Enable Sleep Tracking</Text>
            <Switch 
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
              value={preferences.sleepTracking}
              onValueChange={() => toggleSwitch('sleepTracking')}
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
  preferenceCard: {
    backgroundColor: colors.white, borderRadius: globalStyles.cardRadius,
    borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, marginBottom: 20
  },
  preferenceRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.lightGray
  },
  preferenceLabel: { fontSize: 16, color: colors.black, fontWeight: '500' },
});

export default HealthPreferences;

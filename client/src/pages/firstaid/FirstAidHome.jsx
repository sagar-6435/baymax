import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, globalStyles } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { scenarios } from '../../data/scenarioData';

const FirstAidHome = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.arCard} onPress={() => navigation.navigate('ArFirstAidCameraModal')}>
        <Ionicons name="scan-outline" size={32} color={colors.black} style={styles.arIcon} />
        <View style={styles.arContent}>
          <Text style={styles.arCardTitle}>AR First-Aid Camera</Text>
          <Text style={styles.arCardText}>Launch the camera to get real-time visual instructions.</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={colors.black} />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>EMERGENCY TUTORIALS</Text>
      
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('CprTutorial')}>
          <View style={styles.iconContainer}>
            <Text style={styles.gridIcon}>❤️‍🩹</Text>
          </View>
          <Text style={styles.gridText}>CPR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('BleedingTutorial')}>
          <View style={styles.iconContainer}>
            <Text style={styles.gridIcon}>🩸</Text>
          </View>
          <Text style={styles.gridText}>Bleeding</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('BurnsTutorial')}>
          <View style={styles.iconContainer}>
            <Text style={styles.gridIcon}>🔥</Text>
          </View>
          <Text style={styles.gridText}>Burns</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('FractureInjuryTutorial')}>
          <View style={styles.iconContainer}>
            <Text style={styles.gridIcon}>🦴</Text>
          </View>
          <Text style={styles.gridText}>Fracture</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 10 }]}>PRACTICE SCENARIOS</Text>
      
      {scenarios.map((scenario) => (
        <TouchableOpacity 
          key={scenario.id} 
          style={styles.scenarioCard}
          onPress={() => navigation.navigate('ScenarioPlayer', { scenario })}
        >
          <View style={styles.scenarioIconContainer}>
            <Text style={styles.scenarioIcon}>{scenario.icon}</Text>
          </View>
          <View style={styles.scenarioContent}>
            <Text style={styles.scenarioTitle}>{scenario.title}</Text>
            <Text style={styles.scenarioDesc} numberOfLines={2}>{scenario.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.darkGray} />
        </TouchableOpacity>
      ))}
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: colors.white },
  header: { fontSize: 28, fontWeight: 'bold', marginTop: 40, marginBottom: 20, color: colors.black },
  
  arCard: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary, 
    padding: 20, 
    borderRadius: globalStyles.cardRadius, 
    marginBottom: 30, 
  },
  arIcon: { marginRight: 16 },
  arContent: { flex: 1 },
  arCardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  arCardText: { fontSize: 14, color: colors.darkGray },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { 
    width: '48%', 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20, 
    borderRadius: globalStyles.cardRadius, 
    marginBottom: 16, 
    alignItems: 'center' 
  },
  iconContainer: { 
    backgroundColor: colors.lightGray, 
    padding: 12, 
    borderRadius: 24, 
    marginBottom: 12 
  },
  gridIcon: { fontSize: 28 },
  gridText: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  
  scenarioCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  scenarioIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  scenarioIcon: { fontSize: 24 },
  scenarioContent: { flex: 1, paddingRight: 10 },
  scenarioTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  scenarioDesc: { fontSize: 13, color: colors.darkGray, lineHeight: 18 }
});

export default FirstAidHome;

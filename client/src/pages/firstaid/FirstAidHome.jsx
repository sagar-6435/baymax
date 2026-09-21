import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { colors, globalStyles } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { scenarios } from '../../data/scenarioData';

const FirstAidHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Brand Header */}
      <View style={styles.headerRow}>
        <View style={styles.brandRow}>
          <Ionicons name="heart-circle" size={32} color={colors.primary} />
          <View>
            <Text style={styles.appTitle}>First <Text style={{ color: colors.primary }}>Aid</Text></Text>
            <Text style={styles.appSubtitle}>Life-saving guides & emergency training</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.sosButton}
          onPress={() => navigation.navigate('OfflineEmergencyMode')}
          activeOpacity={0.85}
        >
          <Ionicons name="warning" size={18} color={colors.white} style={{ marginRight: 4 }} />
          <Text style={styles.sosButtonText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* AR Camera Feature Card */}
        <TouchableOpacity 
          style={styles.arCard} 
          onPress={() => navigation.navigate('ArFirstAidCameraModal')}
          activeOpacity={0.88}
        >
          <View style={styles.arIconContainer}>
            <Ionicons name="scan-outline" size={28} color={colors.black} />
          </View>
          <View style={styles.arContent}>
            <Text style={styles.arCardTitle}>AR First-Aid Camera</Text>
            <Text style={styles.arCardText}>Real-time visual instructions to identify and treat injuries</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.black} />
        </TouchableOpacity>

        {/* Section Heading */}
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="medkit" size={20} color="#FF3B30" style={{ marginRight: 8 }} />
          <Text style={styles.sectionTitle}>Emergency Tutorials</Text>
        </View>
        
        {/* 2x2 Emergency Tutorials Grid */}
        <View style={styles.grid}>
          <TouchableOpacity 
            style={[styles.gridItem, { backgroundColor: '#FFF1F0' }]} 
            onPress={() => navigation.navigate('CprTutorial')}
            activeOpacity={0.85}
          >
            <View style={styles.iconContainer}>
              <Image source={require('../../../assets/labels/cpr.png')} style={styles.gridIconImage} />
            </View>
            <Text style={styles.gridText}>CPR</Text>
            <Text style={styles.gridSubText}>Adult chest compressions</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridItem, { backgroundColor: '#FFF1F2' }]} 
            onPress={() => navigation.navigate('BleedingTutorial')}
            activeOpacity={0.85}
          >
            <View style={styles.iconContainer}>
              <Image source={require('../../../assets/labels/bleeding.png')} style={styles.gridIconImage} />
            </View>
            <Text style={styles.gridText}>Bleeding</Text>
            <Text style={styles.gridSubText}>Direct pressure & wounds</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridItem, { backgroundColor: '#FFFBEB' }]} 
            onPress={() => navigation.navigate('BurnsTutorial')}
            activeOpacity={0.85}
          >
            <View style={styles.iconContainer}>
              <Image source={require('../../../assets/labels/burns.png')} style={styles.gridIconImage} />
            </View>
            <Text style={styles.gridText}>Burns</Text>
            <Text style={styles.gridSubText}>Cooling & burn dressing</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridItem, { backgroundColor: '#EFF6FF' }]} 
            onPress={() => navigation.navigate('FractureInjuryTutorial')}
            activeOpacity={0.85}
          >
            <View style={styles.iconContainer}>
              <Image source={require('../../../assets/labels/fracture.png')} style={styles.gridIconImage} />
            </View>
            <Text style={styles.gridText}>Fractures</Text>
            <Text style={styles.gridSubText}>Splints & immobilization</Text>
          </TouchableOpacity>
        </View>

        {/* Section Heading */}
        <View style={[styles.sectionHeaderRow, { marginTop: 12 }]}>
          <Ionicons name="fitness-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
          <Text style={styles.sectionTitle}>Practice Scenarios</Text>
        </View>
        
        {scenarios.map((scenario) => (
          <TouchableOpacity 
            key={scenario.id} 
            style={styles.scenarioCard}
            onPress={() => navigation.navigate('ScenarioPlayer', { scenario })}
            activeOpacity={0.85}
          >
            <View style={styles.scenarioIconContainer}>
              <Text style={styles.scenarioIconText}>{scenario.icon || '🚑'}</Text>
            </View>
            <View style={styles.scenarioContent}>
              <Text style={styles.scenarioTitle}>{scenario.title}</Text>
              <Text style={styles.scenarioSub}>{scenario.difficulty || 'Interactive Training'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.darkGray} />
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.white 
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: Platform.OS === 'ios' ? 12 : 20, 
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white
  },
  brandRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  },
  appTitle: { 
    fontSize: 24, 
    fontWeight: '900', 
    letterSpacing: -0.5,
    color: colors.black
  },
  appSubtitle: { 
    fontSize: 10, 
    color: colors.darkGray, 
    fontWeight: '600',
    marginTop: -2
  },
  sosButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sosButtonText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  
  scrollView: { 
    flex: 1, 
    paddingHorizontal: 20 
  },
  scrollContent: {
    paddingBottom: 36
  },
  
  arCard: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6', 
    borderWidth: 1.5,
    borderColor: colors.primary,
    padding: 18, 
    borderRadius: 22, 
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  arIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  arContent: { 
    flex: 1,
    paddingRight: 6,
  },
  arCardTitle: { 
    fontSize: 17, 
    fontWeight: '900', 
    color: colors.black, 
    marginBottom: 4 
  },
  arCardText: { 
    fontSize: 13, 
    color: colors.darkGray,
    lineHeight: 18,
  },
  
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '900', 
    color: colors.black,
  },
  
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridItem: { 
    width: '48%', 
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16, 
    borderRadius: 22, 
    marginBottom: 14, 
    alignItems: 'flex-start',
    minHeight: 145,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: { 
    width: 80,
    height: 80,
    borderRadius: 16, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  gridIconImage: {
    width: 76,
    height: 76,
    resizeMode: 'contain'
  },
  gridText: { 
    fontSize: 18, 
    fontWeight: '900', 
    color: colors.black,
    marginBottom: 4,
  },
  gridSubText: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 16,
  },
  
  scenarioCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  scenarioIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  scenarioIconText: {
    fontSize: 22,
  },
  scenarioContent: {
    flex: 1,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.black,
    marginBottom: 4,
  },
  scenarioSub: {
    fontSize: 12,
    color: colors.darkGray,
  },
});

export default FirstAidHome;

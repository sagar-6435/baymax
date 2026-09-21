import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { emergencyData } from '../../data/emergencyData';

const FirstAidCategorySelection = ({ navigation }) => {
  const navigateToTutorial = (id) => {
    switch (id) {
      case 'cpr':
        navigation.navigate('CprTutorial');
        break;
      case 'bleeding':
        navigation.navigate('BleedingTutorial');
        break;
      case 'burns':
        navigation.navigate('BurnsTutorial');
        break;
      case 'fracture':
        navigation.navigate('FractureInjuryTutorial');
        break;
      case 'choking':
        navigation.navigate('EmergencyStepViewer', { emergency: emergencyData.find(e => e.id === 'choking') });
        break;
      default:
        navigation.navigate('CprTutorial');
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} title="First Aid Guides" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Ionicons name="medical" size={28} color="#DC2626" />
          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={styles.bannerTitle}>Emergency Guides</Text>
            <Text style={styles.bannerSub}>Select a category to view step-by-step instructions and voice guidance</Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>AVAILABLE FIRST AID PROTOCOLS</Text>

        {emergencyData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.categoryCard, { backgroundColor: item.bgColor || '#FFF9E6' }]}
            onPress={() => navigateToTutorial(item.id)}
            activeOpacity={0.85}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.white }]}>
              <Ionicons name={item.icon} size={28} color={item.color || '#FF3B30'} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.categoryTitle}>{item.title}</Text>
              <Text style={styles.categorySubtitle}>{item.subtitle || `${item.steps?.length || 5} steps protocol`}</Text>
            </View>
            <View style={[styles.chevronWrapper, { backgroundColor: item.color || '#FF3B30' }]}>
              <Ionicons name="chevron-forward" size={16} color={colors.white} />
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20 },
  banner: {
    backgroundColor: '#FFF1F2',
    borderWidth: 1.5,
    borderColor: '#FECDD3',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#991B1B',
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 13,
    color: '#7F1D1D',
    lineHeight: 18,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.black,
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 13,
    color: '#4B5563',
  },
  chevronWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default FirstAidCategorySelection;

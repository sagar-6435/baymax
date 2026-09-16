import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const HomeDashboard = ({ navigation }) => {
  useEffect(() => {
    // Simulated permission request when landing on the home dashboard
    Alert.alert(
      'Baymax Needs Permissions',
      'To provide you with AR First-Aid, voice interactions, and activity tracking, Baymax needs access to your camera, microphone, sensors, and Bluetooth.',
      [
        { text: 'Skip', style: 'cancel' },
        { text: 'Allow All', onPress: () => console.log('Permissions granted') },
      ]
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* Fixed Header at the top of the app */}
      <View style={styles.headerRow}>
        <Text style={styles.appTitle}>BayMax</Text>
        <Ionicons name="notifications-outline" size={24} color={colors.black} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.greeting}>Good Morning 👋</Text>
      <Text style={styles.subGreeting}>How are you feeling today?</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.darkGray} style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Ask Baymax anything..."
          placeholderTextColor={colors.darkGray}
        />
      </View>

      <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>

      {/* 2x2 Grid */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('HealthTab')}>
          <Text style={styles.gridIcon}>🩺</Text>
          <Text style={styles.gridText}>AI HEALTH</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('FirstAidTab')}>
          <Text style={styles.gridIcon}>🩹</Text>
          <Text style={styles.gridText}>FIRST AID</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('MedicineHome')}>
          <Text style={styles.gridIcon}>💊</Text>
          <Text style={styles.gridText}>MEDICINE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <Text style={styles.gridIcon}>🧘</Text>
          <Text style={styles.gridText}>WELLNESS</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Learning Banner */}
      <TouchableOpacity style={styles.learningBanner} onPress={() => navigation.navigate('LearningTab')}>
        <Text style={styles.learningBannerText}>📚 CONTINUE LEARNING    →</Text>
      </TouchableOpacity>
      
      <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 20 },
  appTitle: { fontSize: 20, fontWeight: '900', letterSpacing: 2, color: colors.black },
  greeting: { fontSize: 28, fontWeight: 'bold', color: colors.black },
  subGreeting: { fontSize: 16, color: colors.darkGray, marginBottom: 20 },
  
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.lightGray, 
    borderRadius: globalStyles.cardRadius,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 30,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: colors.black },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { 
    width: '48%', 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius, 
    padding: 20, 
    marginBottom: 16, 
    alignItems: 'flex-start',
  },
  gridIcon: { fontSize: 32, marginBottom: 12 },
  gridText: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  
  learningBanner: { 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20, 
    borderRadius: globalStyles.cardRadius, 
    alignItems: 'center', 
    marginTop: 10 
  },
  learningBannerText: { color: colors.black, fontSize: 16, fontWeight: 'bold' }
});

export default HomeDashboard;

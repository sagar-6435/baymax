import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const MedicineHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Scanner Action Hero */}
        <TouchableOpacity 
          style={styles.scannerHero} 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('MedicineScanner')}
        >
          <View style={styles.scannerHeroContent}>
            <Ionicons name="scan-outline" size={48} color={colors.white} />
            <Text style={styles.scannerHeroTitle}>Scan Medicine</Text>
            <Text style={styles.scannerHeroSub}>Instantly identify pills & get safety info</Text>
          </View>
        </TouchableOpacity>

        {/* Upcoming Reminders Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TODAY'S REMINDERS</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MedicineReminderList')}>
            <Text style={styles.seeAllText}>Manage All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reminderCard}>
          <View style={styles.reminderTimeBox}>
            <Text style={styles.reminderTime}>08:00</Text>
            <Text style={styles.reminderAmPm}>AM</Text>
          </View>
          <View style={styles.reminderInfo}>
            <Text style={styles.reminderName}>Paracetamol 500mg</Text>
            <Text style={styles.reminderInstructions}>1 pill • After meal</Text>
          </View>
          <TouchableOpacity style={styles.checkButton}>
            <Ionicons name="checkmark-circle-outline" size={32} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.reminderCard}>
          <View style={styles.reminderTimeBox}>
            <Text style={styles.reminderTime}>02:00</Text>
            <Text style={styles.reminderAmPm}>PM</Text>
          </View>
          <View style={styles.reminderInfo}>
            <Text style={styles.reminderName}>Amoxicillin</Text>
            <Text style={styles.reminderInstructions}>1 pill • With water</Text>
          </View>
          <TouchableOpacity style={styles.checkButton}>
            <Ionicons name="ellipse-outline" size={32} color={colors.darkGray} />
          </TouchableOpacity>
        </View>

        {/* My Cabinet Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MY CABINET</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <TouchableOpacity style={styles.cabinetItem} onPress={() => navigation.navigate('MedicineDetails')}>
            <View style={styles.cabinetIconBox}>
              <Ionicons name="medical" size={32} color={colors.primary} />
            </View>
            <Text style={styles.cabinetItemName}>Paracetamol</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cabinetItem} onPress={() => navigation.navigate('MedicineDetails')}>
            <View style={styles.cabinetIconBox}>
              <Ionicons name="bandage" size={32} color={colors.primary} />
            </View>
            <Text style={styles.cabinetItemName}>Ibuprofen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cabinetItem} onPress={() => navigation.navigate('MedicineDetails')}>
            <View style={styles.cabinetIconBox}>
              <Ionicons name="flask" size={32} color={colors.primary} />
            </View>
            <Text style={styles.cabinetItemName}>Cough Syrup</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Learning Banner */}
        <TouchableOpacity style={styles.learningBanner} onPress={() => navigation.navigate('MedicineLearningQuiz')}>
          <View style={styles.learningBannerIcon}>
            <Ionicons name="school" size={24} color={colors.black} />
          </View>
          <View style={styles.learningBannerTextContainer}>
            <Text style={styles.learningBannerTitle}>Medicine Quiz</Text>
            <Text style={styles.learningBannerSub}>Test your safety knowledge</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingTop: 50, 
    paddingBottom: 16, 
    paddingHorizontal: 20, 
    backgroundColor: colors.white,
    borderBottomWidth: 1, 
    borderBottomColor: colors.border 
  },
  backButton: { padding: 4 },
  moreButton: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  
  content: { padding: 20 },
  
  scannerHero: {
    backgroundColor: colors.primary,
    borderRadius: globalStyles.cardRadius,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  scannerHeroContent: { alignItems: 'center' },
  scannerHeroTitle: { fontSize: 24, fontWeight: 'bold', color: colors.white, marginTop: 12, marginBottom: 4 },
  scannerHeroSub: { fontSize: 14, color: 'rgba(255,255,255,0.9)' },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1 },
  seeAllText: { fontSize: 14, fontWeight: 'bold', color: colors.primary },
  
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
    marginBottom: 12,
  },
  reminderTimeBox: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  reminderTime: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  reminderAmPm: { fontSize: 12, fontWeight: 'bold', color: colors.darkGray },
  reminderInfo: { flex: 1, marginLeft: 16 },
  reminderName: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  reminderInstructions: { fontSize: 14, color: colors.darkGray },
  checkButton: { padding: 8 },

  horizontalScroll: { marginBottom: 30 },
  cabinetItem: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    width: 120,
  },
  cabinetIconBox: {
    backgroundColor: colors.white,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cabinetItemName: { fontSize: 14, fontWeight: 'bold', color: colors.black, textAlign: 'center' },

  learningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: globalStyles.cardRadius,
    padding: 20,
    marginBottom: 20,
  },
  learningBannerIcon: {
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  learningBannerTextContainer: { flex: 1 },
  learningBannerTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  learningBannerSub: { fontSize: 14, color: colors.darkGray }
});

export default MedicineHome;

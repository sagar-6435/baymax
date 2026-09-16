import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const MedicineDetails = ({ navigation, route }) => {
  const { item } = route.params || { item: 'Paracetamol 500mg' };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETAILS</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.medIconBox}>
            <Ionicons name="medical" size={60} color={colors.primary} />
          </View>
          <Text style={styles.medName}>{item}</Text>
          <Text style={styles.medGeneric}>Acetaminophen</Text>
          
          <View style={styles.tagContainer}>
            <View style={styles.tag}><Text style={styles.tagText}>Over-the-counter</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Pain Reliever</Text></View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="water-outline" size={24} color={colors.primary} />
            <Text style={styles.statLabel}>Take with</Text>
            <Text style={styles.statValue}>Water</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="restaurant-outline" size={24} color={colors.primary} />
            <Text style={styles.statLabel}>Food</Text>
            <Text style={styles.statValue}>After Meal</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={24} color={colors.primary} />
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>4-6 hrs</Text>
          </View>
        </View>

        {/* Information Grid */}
        <Text style={styles.sectionTitle}>MEDICATION INFORMATION</Text>
        
        <View style={styles.grid}>
          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('MedicineUsesPurpose')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#e3f2fd' }]}>
              <Ionicons name="information-circle" size={32} color="#1976d2" />
            </View>
            <Text style={styles.gridTitle}>Uses & Purpose</Text>
            <Text style={styles.gridSub}>What is this for?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('DosageSafetyInformation')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#fff3e0' }]}>
              <Ionicons name="scale" size={32} color="#f57c00" />
            </View>
            <Text style={styles.gridTitle}>Dosage & Safety</Text>
            <Text style={styles.gridSub}>How much to take</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('SideEffectsInformation')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#ffebee' }]}>
              <Ionicons name="warning" size={32} color="#d32f2f" />
            </View>
            <Text style={styles.gridTitle}>Side Effects</Text>
            <Text style={styles.gridSub}>What to watch out for</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('MedicineLearningQuiz')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#f3e5f5' }]}>
              <Ionicons name="school" size={32} color="#7b1fa2" />
            </View>
            <Text style={styles.gridTitle}>Safety Quiz</Text>
            <Text style={styles.gridSub}>Test your knowledge</Text>
          </TouchableOpacity>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('AddMedicineReminder', { medName: item })}>
          <Ionicons name="alarm-outline" size={24} color={colors.black} style={{ marginRight: 8 }} />
          <Text style={styles.primaryButtonText}>Set Reminder</Text>
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
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  backButton: { padding: 4 },
  favoriteButton: { padding: 4 },
  
  content: { padding: 20 },
  
  heroSection: { alignItems: 'center', marginBottom: 24 },
  medIconBox: {
    width: 100, height: 100,
    borderRadius: 50,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  medName: { fontSize: 24, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  medGeneric: { fontSize: 16, color: colors.darkGray, marginBottom: 12 },
  tagContainer: { flexDirection: 'row', gap: 8 },
  tag: { backgroundColor: colors.lightGray, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: 'bold', color: colors.darkGray },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
    marginBottom: 30
  },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 12, color: colors.darkGray, marginTop: 8, marginBottom: 2 },
  statValue: { fontSize: 14, fontWeight: 'bold', color: colors.black },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
    marginBottom: 16,
    alignItems: 'flex-start'
  },
  iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  gridTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  gridSub: { fontSize: 12, color: colors.darkGray },
  
  primaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    padding: 16,
    borderRadius: globalStyles.buttonRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: { color: colors.black, fontSize: 16, fontWeight: 'bold' }
});

export default MedicineDetails;

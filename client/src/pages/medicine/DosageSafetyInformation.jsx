import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const DosageSafetyInformation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <Ionicons name="alert-circle" size={24} color="#f57c00" style={{ marginRight: 8 }} />
            <Text style={styles.alertTitle}>Crucial Warning</Text>
          </View>
          <Text style={styles.alertText}>
            Do not take more than the recommended dose. An overdose of this medication can cause serious liver damage.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>RECOMMENDED DOSAGE</Text>
        
        <View style={styles.dosageCard}>
          <View style={styles.dosageRow}>
            <Text style={styles.dosageLabel}>Adults (12+ years)</Text>
            <Text style={styles.dosageValue}>1-2 tablets</Text>
          </View>
          <View style={styles.dosageDivider} />
          <View style={styles.dosageRow}>
            <Text style={styles.dosageLabel}>Frequency</Text>
            <Text style={styles.dosageValue}>Every 4-6 hours</Text>
          </View>
          <View style={styles.dosageDivider} />
          <View style={styles.dosageRow}>
            <Text style={styles.dosageLabel}>Maximum (24 hrs)</Text>
            <Text style={[styles.dosageValue, { color: '#d32f2f' }]}>8 tablets</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
        <View style={styles.instructionCard}>
          <View style={styles.instructionRow}>
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            <Text style={styles.instructionText}>Swallow tablets whole with a glass of water.</Text>
          </View>
          <View style={styles.instructionRow}>
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            <Text style={styles.instructionText}>Can be taken with or without food.</Text>
          </View>
          <View style={styles.instructionRow}>
            <Ionicons name="close-circle" size={20} color="#d32f2f" />
            <Text style={styles.instructionText}>Do not consume alcohol while taking this medicine.</Text>
          </View>
        </View>

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
  
  content: { padding: 20 },
  
  alertCard: { 
    backgroundColor: '#fff3e0', 
    borderWidth: 1,
    borderColor: '#ffb74d',
    padding: 20, 
    borderRadius: globalStyles.cardRadius, 
    marginBottom: 24 
  },
  alertHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  alertTitle: { fontSize: 18, fontWeight: 'bold', color: '#e65100' },
  alertText: { fontSize: 16, color: '#e65100', lineHeight: 24 },

  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  dosageCard: { 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius, 
    marginBottom: 24 
  },
  dosageRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  dosageDivider: { height: 1, backgroundColor: colors.border },
  dosageLabel: { fontSize: 16, color: colors.darkGray },
  dosageValue: { fontSize: 16, fontWeight: 'bold', color: colors.black },

  instructionCard: {
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    borderRadius: globalStyles.cardRadius, 
  },
  instructionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  instructionText: { fontSize: 16, color: colors.black, marginLeft: 12, flex: 1, lineHeight: 22 }
});

export default DosageSafetyInformation;

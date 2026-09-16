import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const HealthChronicle = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>MOCK DATA OVERVIEW</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Information Details</Text>
          <Text style={styles.cardText}>This is a placeholder page for HEALTH CHRONICLE. Here you would typically see relevant data fetched from the backend API.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <Text style={styles.cardText}>• Checked in at 9:00 AM</Text>
          <Text style={styles.cardText}>• Updated preferences</Text>
          <Text style={styles.cardText}>• Synced with wearable</Text>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit Details</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.lightGray },
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
  title: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  
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
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginBottom: 8 },
  cardText: { fontSize: 16, color: colors.darkGray, marginBottom: 4, lineHeight: 24 },
  
  actionButton: { 
    backgroundColor: colors.primary, 
    padding: 16, 
    borderRadius: globalStyles.buttonRadius, 
    alignItems: 'center', 
    marginTop: 10 
  },
  actionButtonText: { color: colors.black, fontSize: 16, fontWeight: 'bold' }
});

export default HealthChronicle;

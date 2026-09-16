import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const MedicineUsesPurpose = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>USES & PURPOSE</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle" size={24} color="#1976d2" style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Primary Uses</Text>
          </View>
          <Text style={styles.cardText}>
            This medication is primarily used to treat mild to moderate pain (from headaches, menstrual periods, toothaches, backaches, osteoarthritis, or cold/flu aches and pains) and to reduce fever.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="body-outline" size={24} color="#1976d2" style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>How it works</Text>
          </View>
          <Text style={styles.cardText}>
            It works by blocking chemical messengers in your brain that tell us we have pain. It also reduces fever by affecting the chemical messengers in an area of the brain that regulates body temperature.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#1976d2" style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Additional Benefits</Text>
          </View>
          <Text style={styles.cardText}>
            Unlike NSAIDs (like ibuprofen), it does not reduce inflammation but it is much gentler on the stomach, making it a preferred choice for people with stomach issues.
          </Text>
        </View>

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
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  backButton: { padding: 4 },
  
  content: { padding: 20 },
  
  card: { 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24, 
    borderRadius: globalStyles.cardRadius, 
    marginBottom: 16 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  cardText: { fontSize: 16, color: colors.darkGray, lineHeight: 24 }
});

export default MedicineUsesPurpose;

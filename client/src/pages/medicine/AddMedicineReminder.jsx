import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const AddMedicineReminder = ({ navigation, route }) => {
  const [medName, setMedName] = useState(route.params?.medName || '');
  const [dosage, setDosage] = useState('');

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medicine Name</Text>
          <View style={styles.inputBox}>
            <Ionicons name="medical" size={20} color={colors.darkGray} style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="e.g. Paracetamol"
              value={medName}
              onChangeText={setMedName}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dosage</Text>
          <View style={styles.inputBox}>
            <Ionicons name="water" size={20} color={colors.darkGray} style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="e.g. 1 pill"
              value={dosage}
              onChangeText={setDosage}
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>SELECT TIME</Text>
        <View style={styles.timeGrid}>
          <TouchableOpacity style={styles.timeSelect}>
            <Text style={styles.timeSelectText}>08:00 AM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.timeSelect, { backgroundColor: colors.primary }]}>
            <Text style={[styles.timeSelectText, { color: colors.white }]}>12:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeSelect}>
            <Text style={styles.timeSelectText}>08:00 PM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeSelect}>
            <Ionicons name="add" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>FREQUENCY</Text>
        <View style={styles.freqRow}>
          <TouchableOpacity style={[styles.freqBtn, { backgroundColor: colors.black }]}>
            <Text style={[styles.freqBtnText, { color: colors.white }]}>Everyday</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.freqBtn}>
            <Text style={styles.freqBtnText}>Specific Days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.freqBtn}>
            <Text style={styles.freqBtnText}>As needed</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
          <Text style={styles.saveButtonText}>Save Reminder</Text>
        </TouchableOpacity>
      </View>
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
  
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, marginBottom: 8, letterSpacing: 1 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: globalStyles.cardRadius,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: colors.black },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, marginBottom: 12, letterSpacing: 1, marginTop: 10 },
  
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 30 },
  timeSelect: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSelectText: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  
  freqRow: { flexDirection: 'row', gap: 12 },
  freqBtn: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  freqBtnText: { fontSize: 14, fontWeight: '600', color: colors.black },
  
  footer: { padding: 20, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center'
  },
  saveButtonText: { fontSize: 16, fontWeight: 'bold', color: colors.black }
});

export default AddMedicineReminder;

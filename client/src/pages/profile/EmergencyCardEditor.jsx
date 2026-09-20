import AppHeader from '../../components/AppHeader';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const EmergencyCardEditor = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    emergencyContact: '',
    contactPhone: '',
    bloodType: '',
    allergies: '',
    medications: '',
    medicalConditions: '',
    notes: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadCardData();
  }, []);

  const loadCardData = async () => {
    try {
      const data = await AsyncStorage.getItem('emergencyCardData');
      if (data) setFormData(JSON.parse(data));
    } catch (e) {
      console.error('Failed to load emergency card data', e);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await AsyncStorage.setItem('emergencyCardData', JSON.stringify(formData));
      Alert.alert("Success", "Emergency card updated successfully.");
    } catch (e) {
      Alert.alert("Error", "Failed to save emergency card data.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppHeader showBack={true} onBack={() => navigation.goBack()} title="Emergency Card" />
      
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.banner}>
          <Ionicons name="shield-checkmark" size={24} color="#1565C0" />
          <Text style={styles.bannerText}>This information is stored securely on your device and will be accessible from the Offline Emergency Mode.</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput 
            style={styles.input} 
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            placeholder="Jane Doe"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Emergency Contact Name</Text>
          <TextInput 
            style={styles.input} 
            value={formData.emergencyContact}
            onChangeText={(text) => setFormData({...formData, emergencyContact: text})}
            placeholder="John Doe (Husband)"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Emergency Contact Phone</Text>
          <TextInput 
            style={styles.input} 
            value={formData.contactPhone}
            onChangeText={(text) => setFormData({...formData, contactPhone: text})}
            placeholder="555-0199"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Blood Type</Text>
          <TextInput 
            style={styles.input} 
            value={formData.bloodType}
            onChangeText={(text) => setFormData({...formData, bloodType: text})}
            placeholder="O Positive"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Allergies</Text>
          <TextInput 
            style={styles.inputMultiline} 
            value={formData.allergies}
            onChangeText={(text) => setFormData({...formData, allergies: text})}
            placeholder="Penicillin, Peanuts..."
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Current Medications</Text>
          <TextInput 
            style={styles.inputMultiline} 
            value={formData.medications}
            onChangeText={(text) => setFormData({...formData, medications: text})}
            placeholder="Lisinopril 10mg..."
            multiline
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Medical Conditions</Text>
          <TextInput 
            style={styles.inputMultiline} 
            value={formData.medicalConditions}
            onChangeText={(text) => setFormData({...formData, medicalConditions: text})}
            placeholder="Asthma, Type 2 Diabetes..."
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Additional Notes for Responders</Text>
          <TextInput 
            style={styles.inputMultiline} 
            value={formData.notes}
            onChangeText={(text) => setFormData({...formData, notes: text})}
            placeholder="Organ donor..."
            multiline
          />
        </View>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isSaving}>
          <Text style={styles.saveButtonText}>{isSaving ? 'Saving...' : 'Save Emergency Card'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20 },
  
  banner: { flexDirection: 'row', backgroundColor: '#E3F2FD', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 24 },
  bannerText: { flex: 1, marginLeft: 12, color: '#0D47A1', fontSize: 14, lineHeight: 20 },
  
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, marginBottom: 8 },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: colors.black,
  },
  inputMultiline: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: colors.black,
    minHeight: 100,
    textAlignVertical: 'top'
  },
  
  saveButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40
  },
  saveButtonText: { fontSize: 18, fontWeight: 'bold', color: colors.black }
});

export default EmergencyCardEditor;

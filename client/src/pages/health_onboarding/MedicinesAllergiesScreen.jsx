import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import ProgressIndicator from '../../components/onboarding/ProgressIndicator';
import MultiSelectCard from '../../components/onboarding/MultiSelectCard';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { notificationService } from '../../services/notificationService';

const ALLERGY_OPTIONS = [
  'No known allergies',
  'Medicines',
  'Food',
  'Dust / Pollen',
  'Other'
];

const MedicinesAllergiesScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  
  const [medications, setMedications] = useState(user?.health?.medications || []);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState({ name: '', dosage: '', frequency: '', time: new Date() });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedAllergies, setSelectedAllergies] = useState(user?.health?.allergies || []);
  const [otherAllergy, setOtherAllergy] = useState(user?.health?.otherAllergy || '');

  const [isSaving, setIsSaving] = useState(false);

  // --- Medicine Handlers ---
  const handleAddMedicine = () => {
    if (currentMedicine.name.trim() === '') {
      alert('Medicine name is required.');
      return;
    }
    setMedications([...medications, { ...currentMedicine, time: currentMedicine.time.toISOString() }]);
    setCurrentMedicine({ name: '', dosage: '', frequency: '', time: new Date() });
    setShowMedicineForm(false);
  };

  const handleRemoveMedicine = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  // --- Allergy Handlers ---
  const toggleAllergy = (allergy) => {
    if (allergy === 'No known allergies') {
      if (selectedAllergies.includes('No known allergies')) {
        setSelectedAllergies([]);
      } else {
        setSelectedAllergies(['No known allergies']);
        setOtherAllergy('');
      }
      return;
    }

    let newSelections = selectedAllergies.filter(a => a !== 'No known allergies');
    
    if (newSelections.includes(allergy)) {
      newSelections = newSelections.filter(a => a !== allergy);
      if (allergy === 'Other') setOtherAllergy('');
    } else {
      newSelections.push(allergy);
    }
    
    setSelectedAllergies(newSelections);
  };

  const handleContinue = async () => {
    try {
      setIsSaving(true);
      const healthData = {
        ...user?.health,
        medications,
        allergies: selectedAllergies,
        otherAllergy: selectedAllergies.includes('Other') ? otherAllergy : ''
      };

      const updatedUser = await userService.updateProfile({ health: healthData });
      await updateUser(updatedUser);
      
      // Schedule the reminders locally!
      await notificationService.scheduleMedicationReminders(user, updateUser, medications);
      
      navigation.navigate('EmergencyContact');
    } catch (error) {
      console.error('Error saving Medicines & Allergies', error);
      alert('Failed to save information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('EmergencyContact');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={4} totalSteps={5} stepName="Medicines & allergies" />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Section A: Medications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section A — Medications</Text>
          <Text style={styles.questionText}>Do you currently take any regular medicines?</Text>
          
          {medications.map((med, index) => (
            <View key={index} style={styles.medicineCard}>
              <View style={styles.medicineInfo}>
                <Text style={styles.medicineName}>{med.name}</Text>
                {med.dosage ? <Text style={styles.medicineSubtext}>Dosage: {med.dosage}</Text> : null}
                {med.frequency ? <Text style={styles.medicineSubtext}>Frequency: {med.frequency}</Text> : null}
                {med.time ? <Text style={styles.medicineSubtext}>Time: {new Date(med.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text> : null}
              </View>
              <TouchableOpacity onPress={() => handleRemoveMedicine(index)}>
                <Ionicons name="trash-outline" size={20} color={colors.danger || 'red'} />
              </TouchableOpacity>
            </View>
          ))}

          {showMedicineForm ? (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Medicine Name (required)"
                value={currentMedicine.name}
                onChangeText={(text) => setCurrentMedicine({ ...currentMedicine, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Dosage (e.g. 500mg)"
                value={currentMedicine.dosage}
                onChangeText={(text) => setCurrentMedicine({ ...currentMedicine, dosage: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Frequency (e.g. Once daily)"
                value={currentMedicine.frequency}
                onChangeText={(text) => setCurrentMedicine({ ...currentMedicine, frequency: text })}
              />
              <TouchableOpacity 
                style={[styles.input, { justifyContent: 'center' }]} 
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={{ color: colors.black }}>
                  Time to take: {currentMedicine.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>
              
              {showTimePicker && (
                <DateTimePicker
                  value={currentMedicine.time}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(Platform.OS === 'ios');
                    if (selectedTime) {
                      setCurrentMedicine({ ...currentMedicine, time: selectedTime });
                    }
                  }}
                />
              )}
              <View style={styles.formButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowMedicineForm(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={handleAddMedicine}>
                  <Text style={styles.addButtonText}>Save Medicine</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.addMedicineBtn} onPress={() => setShowMedicineForm(true)}>
              <Ionicons name="add" size={20} color={colors.primary} />
              <Text style={styles.addMedicineText}>Add Medicine</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Section B: Allergies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Section B — Allergies</Text>
          <Text style={styles.questionText}>Do you have any known allergies?</Text>
          
          {ALLERGY_OPTIONS.map((allergy) => (
            <View key={allergy}>
              <MultiSelectCard
                label={allergy}
                selected={selectedAllergies.includes(allergy)}
                onPress={() => toggleAllergy(allergy)}
              />
              {allergy === 'Other' && selectedAllergies.includes('Other') && (
                <View style={styles.otherInputContainer}>
                  <Text style={styles.otherLabel}>Please specify</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Type allergy here"
                    value={otherAllergy}
                    onChangeText={setOtherAllergy}
                  />
                </View>
              )}
            </View>
          ))}
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton 
          title={isSaving ? "Saving..." : "Continue →"} 
          onPress={handleContinue} 
          disabled={isSaving}
        />
        <View style={styles.secondaryButtons}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} disabled={isSaving}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip} disabled={isSaving}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 16,
  },
  medicineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: 16,
    borderRadius: globalStyles.cardRadius,
    marginBottom: 12,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  medicineSubtext: {
    fontSize: 14,
    color: colors.darkGray,
  },
  addMedicineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: globalStyles.cardRadius,
  },
  addMedicineText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  formContainer: {
    backgroundColor: '#F5F7FA',
    padding: 16,
    borderRadius: globalStyles.cardRadius,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.black,
    marginBottom: 12,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    padding: 10,
  },
  cancelButtonText: {
    color: colors.darkGray,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  otherInputContainer: {
    marginLeft: 16,
    marginBottom: 16,
  },
  otherLabel: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 8,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    padding: 8,
  },
  skipButtonText: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: '600',
  }
});

export default MedicinesAllergiesScreen;

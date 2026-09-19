import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import ProgressIndicator from '../../components/onboarding/ProgressIndicator';
import MultiSelectCard from '../../components/onboarding/MultiSelectCard';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const CONDITIONS = [
  'Diabetes',
  'High Blood Pressure',
  'Asthma',
  'Thyroid Condition',
  'High Cholesterol',
  'Heart Condition',
  'Kidney Condition',
  'Liver Condition',
  'Migraine',
  'PCOS / PCOD',
  'Arthritis',
  'Other',
  'None of these'
];

const HealthConditionsScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  
  const [selectedConditions, setSelectedConditions] = useState(user?.health?.chronicConditions || []);
  const [otherCondition, setOtherCondition] = useState(user?.health?.otherHealthCondition || '');
  const [isSaving, setIsSaving] = useState(false);

  const toggleCondition = (condition) => {
    if (condition === 'None of these') {
      if (selectedConditions.includes('None of these')) {
        setSelectedConditions([]);
      } else {
        setSelectedConditions(['None of these']);
        setOtherCondition('');
      }
      return;
    }

    let newSelections = selectedConditions.filter(c => c !== 'None of these');
    
    if (newSelections.includes(condition)) {
      newSelections = newSelections.filter(c => c !== condition);
      if (condition === 'Other') {
        setOtherCondition('');
      }
    } else {
      newSelections.push(condition);
    }
    
    setSelectedConditions(newSelections);
  };

  const handleContinue = async () => {
    try {
      setIsSaving(true);
      const healthData = {
        ...user?.health,
        chronicConditions: selectedConditions,
        otherHealthCondition: selectedConditions.includes('Other') ? otherCondition : ''
      };

      const updatedUser = await userService.updateProfile({ health: healthData });
      await updateUser(updatedUser);
      navigation.navigate('MedicinesAllergies');
    } catch (error) {
      console.error('Error saving Health Conditions', error);
      alert('Failed to save information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('MedicinesAllergies');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={3} totalSteps={5} stepName="Your health" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Select all conditions that apply to you.</Text>
        
        {CONDITIONS.map((condition) => (
          <View key={condition}>
            <MultiSelectCard
              label={condition}
              selected={selectedConditions.includes(condition)}
              onPress={() => toggleCondition(condition)}
            />
            {condition === 'Other' && selectedConditions.includes('Other') && (
              <View style={styles.otherInputContainer}>
                <Text style={styles.otherLabel}>Please specify</Text>
                <TextInput
                  style={styles.otherInput}
                  placeholder="Type condition here"
                  placeholderTextColor={colors.darkGray}
                  value={otherCondition}
                  onChangeText={setOtherCondition}
                />
              </View>
            )}
          </View>
        ))}
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
  subtitle: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 24,
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
  otherInput: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 12,
    fontSize: 16,
    color: colors.black,
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

export default HealthConditionsScreen;

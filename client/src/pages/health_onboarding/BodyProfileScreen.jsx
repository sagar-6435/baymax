import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import ProgressIndicator from '../../components/onboarding/ProgressIndicator';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const calculateAge = (dobString) => {
  if (!dobString) return '';
  const birthDate = new Date(dobString);
  const today = new Date();
  let calculatedAge = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    calculatedAge--;
  }
  return String(calculatedAge);
};

const BodyProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  
  const [height, setHeight] = useState(user?.height?.value ? String(user.height.value) : '');
  const [weight, setWeight] = useState(user?.weight?.value ? String(user.weight.value) : '');
  const [age, setAge] = useState(user?.age ? String(user.age) : calculateAge(user?.dob));
  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    // Validate
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age, 10);
    
    if (height && (isNaN(h) || h <= 0)) {
      alert('Please enter a valid height.');
      return;
    }
    
    if (weight && (isNaN(w) || w <= 0)) {
      alert('Please enter a valid weight.');
      return;
    }

    if (age && (isNaN(a) || a <= 0 || a > 120)) {
      alert('Please enter a valid age.');
      return;
    }

    try {
      setIsSaving(true);
      const updatePayload = {};
      if (height) updatePayload.height = { value: h, unit: 'cm' };
      if (weight) updatePayload.weight = { value: w, unit: 'kg' };
      if (age) updatePayload.age = a;

      const updatedUser = await userService.updateProfile(updatePayload);
      await updateUser(updatedUser);
      navigation.navigate('HealthConditions');
    } catch (error) {
      console.error('Error saving Body Profile', error);
      alert('Failed to save information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('HealthConditions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={2} totalSteps={5} stepName="Your body profile" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Help us understand your basic body measurements.</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={colors.darkGray}
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
              maxLength={3}
            />
            <View style={styles.unitBadge}>
              <Text style={styles.unitText}>yrs</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={colors.darkGray}
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
              maxLength={5}
            />
            <View style={styles.unitBadge}>
              <Text style={styles.unitText}>cm</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={colors.darkGray}
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
              maxLength={5}
            />
            <View style={styles.unitBadge}>
              <Text style={styles.unitText}>kg</Text>
            </View>
          </View>
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
  },
  subtitle: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 18,
    color: colors.black,
  },
  unitBadge: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unitText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.white,
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

export default BodyProfileScreen;

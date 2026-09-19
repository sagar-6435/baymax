import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import ProgressIndicator from '../../components/onboarding/ProgressIndicator';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const GENDER_OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say'];

const AboutYouScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  
  const [dob, setDob] = useState(user?.dob ? new Date(user.dob) : new Date(2000, 0, 1));
  const [dobText, setDobText] = useState(
    user?.dob ? new Date(user.dob).toLocaleDateString('en-GB') : ''
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState(user?.gender || '');
  const [isSaving, setIsSaving] = useState(false);

  // Helper to parse DD/MM/YYYY
  const parseDateString = (dateStr) => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
        return d;
      }
    }
    return null;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      if (selectedDate > new Date()) {
        alert('Date of birth cannot be in the future.');
        return;
      }
      setDob(selectedDate);
      setDobText(selectedDate.toLocaleDateString('en-GB')); // Updates text input as DD/MM/YYYY
    }
  };

  const handleContinue = async () => {
    // Validate manual date entry if they typed something
    let finalDob = dob;
    if (dobText) {
      const parsed = parseDateString(dobText);
      if (!parsed || parsed > new Date()) {
        alert('Please enter a valid Date of Birth (DD/MM/YYYY) not in the future.');
        return;
      }
      finalDob = parsed;
    }

    try {
      setIsSaving(true);
      const updatedUser = await userService.updateProfile({
        dob: finalDob.toISOString(),
        gender: gender
      });
      await updateUser(updatedUser);
      navigation.navigate('BodyProfile');
    } catch (error) {
      console.error('Error saving About You data', error);
      alert('Failed to save information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('BodyProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={1} totalSteps={5} stepName="About You" />
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>This helps us personalize your BayMax experience.</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth (DD/MM/YYYY)</Text>
          <View style={styles.dobInputContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              placeholder="DD/MM/YYYY"
              placeholderTextColor={colors.darkGray}
              keyboardType="numeric"
              value={dobText}
              onChangeText={setDobText}
              maxLength={10}
            />
            <TouchableOpacity 
              style={styles.pickerButton} 
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
              style={Platform.OS === 'ios' ? { height: 120, marginTop: 10 } : undefined}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender (Optional)</Text>
          <View style={styles.genderContainer}>
            {GENDER_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.genderOption,
                  gender === option && styles.genderOptionSelected
                ]}
                onPress={() => setGender(option)}
              >
                <Text 
                  style={[
                    styles.genderText,
                    gender === option && styles.genderTextSelected
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          title={isSaving ? "Saving..." : "Continue →"} 
          onPress={handleContinue} 
          disabled={isSaving}
        />
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip} disabled={isSaving}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
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
    flex: 1,
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
  dobInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.black,
  },
  pickerButton: {
    backgroundColor: colors.primary,
    borderRadius: globalStyles.cardRadius,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
  },
  dateText: {
    fontSize: 16,
    color: colors.black,
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  genderOption: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  genderOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genderText: {
    fontSize: 14,
    color: colors.darkGray,
    fontWeight: '500',
  },
  genderTextSelected: {
    color: colors.white,
    fontWeight: 'bold',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  skipButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  skipButtonText: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: '600',
  }
});

export default AboutYouScreen;

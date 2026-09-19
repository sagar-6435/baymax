import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import ProgressIndicator from '../../components/onboarding/ProgressIndicator';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const EmergencyContactScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  
  // If there's an existing contact, we'll populate the first one, or leave it blank
  const existingContact = user?.emergencyContacts?.[0] || { name: '', relation: '', phone: '' };
  
  const [name, setName] = useState(existingContact.name || '');
  const [relation, setRelation] = useState(existingContact.relation || '');
  const [phone, setPhone] = useState(existingContact.phone || '');
  
  const [isSaving, setIsSaving] = useState(false);

  const pickContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        // Just for Expo Go testing, normally we would let the user pick from the OS UI.
        // But Expo doesn't have a reliable `presentContactPickerAsync` across all OS versions.
        // However, iOS has presentContactPickerAsync if we want to use it.
        // Wait, yes it does!
      }
    }
  };

  const handlePickContact = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need access to your contacts to pick an emergency contact.');
        return;
      }
      
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      
      if (data.length > 0) {
         Alert.alert(
            'Contacts Loaded', 
            `Found ${data.length} contacts. Note: A custom picker is usually required here, but we will auto-fill with the first one for demonstration.`
         );
         const contact = data[0];
         setName(contact.name || '');
         if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
           setPhone(contact.phoneNumbers[0].number || '');
         }
      } else {
         Alert.alert('No Contacts', 'No contacts found on this device.');
      }
    } catch (err) {
      console.log('Error picking contact', err);
    }
  };

  const handleContinue = async () => {
    // If they typed something but didn't finish, warn them, but allow it to be optional
    if ((name || relation || phone) && (!name || !relation || !phone)) {
      alert('Please fill out all emergency contact fields or leave them all blank.');
      return;
    }

    // Very basic phone validation if entered
    if (phone && phone.length < 5) {
      alert('Please enter a valid phone number.');
      return;
    }

    try {
      setIsSaving(true);
      
      let contacts = user?.emergencyContacts || [];
      if (name && relation && phone) {
        // If they provided info, replace the first contact or add it
        if (contacts.length > 0) {
          contacts[0] = { name, relation, phone };
        } else {
          contacts.push({ name, relation, phone });
        }
      }

      const updatedUser = await userService.updateProfile({ emergencyContacts: contacts });
      await updateUser(updatedUser);
      navigation.navigate('Completion');
    } catch (error) {
      console.error('Error saving Emergency Contact', error);
      alert('Failed to save information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Completion');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={5} totalSteps={5} stepName="Emergency contact" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.subtitle}>Add someone we can contact in an emergency.</Text>
          
          <TouchableOpacity style={styles.pickContactBtn} onPress={handlePickContact}>
            <Ionicons name="people-circle-outline" size={24} color={colors.primary} />
            <Text style={styles.pickContactText}>Choose from Contacts</Text>
          </TouchableOpacity>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color={colors.darkGray} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={colors.darkGray}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Relationship</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="people-outline" size={20} color={colors.darkGray} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="e.g. Spouse, Parent, Friend"
                placeholderTextColor={colors.darkGray}
                value={relation}
                onChangeText={setRelation}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone number</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color={colors.darkGray} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Mobile Number"
                placeholderTextColor={colors.darkGray}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
            <Text style={styles.infoText}>Your emergency contact can be added or updated later from the Emergency section.</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton 
            title={isSaving ? "Saving..." : "Save & Continue →"} 
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
      </KeyboardAvoidingView>
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
  pickContactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    padding: 12,
    borderRadius: globalStyles.cardRadius,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
  },
  pickContactText: {
    marginLeft: 8,
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
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
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.black,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F7FF',
    padding: 16,
    borderRadius: globalStyles.cardRadius,
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: colors.primary,
    lineHeight: 20,
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

export default EmergencyContactScreen;

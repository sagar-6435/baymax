import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import * as Contacts from 'expo-contacts/legacy';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const EmergencyInformation = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', relation: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);

  const contacts = user?.emergencyContacts || [];

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
         setNewContact(prev => ({
           ...prev,
           name: contact.name || '',
           phone: (contact.phoneNumbers && contact.phoneNumbers.length > 0) ? contact.phoneNumbers[0].number || '' : ''
         }));
      } else {
         Alert.alert('No Contacts', 'No contacts found on this device.');
      }
    } catch (err) {
      console.log('Error picking contact', err);
    }
  };

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone || !newContact.relation) {
      Alert.alert('Error', 'Name, Relationship, and Phone are required.');
      return;
    }
    setIsLoading(true);
    try {
      const updatedContacts = [...contacts, newContact];
      const updatedUser = await userService.updateProfile({ emergencyContacts: updatedContacts });
      await updateUser(updatedUser);
      setModalVisible(false);
      setNewContact({ name: '', relation: '', phone: '' });
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to add contact');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (index) => {
    Alert.alert('Remove Contact', 'Are you sure you want to remove this contact?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          try {
            const updatedContacts = contacts.filter((_, i) => i !== index);
            const updatedUser = await userService.updateProfile({ emergencyContacts: updatedContacts });
            await updateUser(updatedUser);
          } catch (error) {
            Alert.alert('Error', 'Failed to remove contact');
          }
        }
      }
    ]);
  };

  const handleEmergencyCall = () => {
    Alert.alert('Emergency services', 'This action would trigger a direct emergency call flow in production.');
  };

  const handleNotifyContacts = () => {
    Alert.alert('Alert contacts', 'Emergency notifications would be sent to your saved contacts right now.');
  };

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.alertCard}>
          <Ionicons name="warning" size={44} color={colors.error} />
          <Text style={styles.alertTitle}>Critical information</Text>
          <Text style={styles.alertText}>Keep your medical profile and emergency contacts up to date so BayMax can respond quickly when you need it most.</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.error }]} onPress={handleEmergencyCall}>
            <Ionicons name="call" size={18} color={colors.white} />
            <Text style={styles.actionButtonText}>Call 911</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.darkGray }]} onPress={handleNotifyContacts}>
            <Ionicons name="notifications" size={18} color={colors.white} />
            <Text style={styles.actionButtonText}>Notify contacts</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>EMERGENCY CONTACTS</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="add-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          {contacts.length === 0 ? (
            <Text style={styles.emptyText}>No emergency contacts added.</Text>
          ) : (
            contacts.map((contact, index) => (
              <View key={index} style={styles.contactRow}>
                <View style={styles.contactBadge}>
                  <Ionicons name="person" size={18} color={colors.white} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactMeta}>{contact.relation}</Text>
                  <Text style={styles.contactMeta}>{contact.phone}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteContact(index)} style={{ padding: 4 }}>
                  <Ionicons name="trash-outline" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <Text style={styles.sectionTitle}>MEDICAL SUMMARY</Text>
        <View style={styles.card}>
          <Text style={styles.summaryTitle}>Important notes</Text>
          <Text style={styles.summaryText}>• Blood type: {user?.bloodGroup || 'Not set'}</Text>
          <Text style={styles.summaryText}>• Diet: {user?.health?.diet || 'Not set'}</Text>
          <Text style={styles.summaryText}>• Allergies: {user?.health?.allergies?.join(', ') || 'None'}</Text>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Emergency Contact</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.pickContactBtn} onPress={handlePickContact}>
              <Ionicons name="people-circle-outline" size={24} color={colors.primary} />
              <Text style={styles.pickContactText}>Choose from Contacts</Text>
            </TouchableOpacity>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.textInput}
                value={newContact.name}
                onChangeText={(text) => setNewContact({ ...newContact, name: text })}
                placeholder="e.g. Jane Doe"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Relationship</Text>
              <TextInput
                style={styles.textInput}
                value={newContact.relation}
                onChangeText={(text) => setNewContact({ ...newContact, relation: text })}
                placeholder="e.g. Mother"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.textInput}
                value={newContact.phone}
                onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
                placeholder="e.g. 555-1234"
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={{ height: 20 }} />
            <PrimaryButton title={isLoading ? "Adding..." : "Add Contact"} onPress={handleAddContact} disabled={isLoading} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  content: { padding: 20 },

  alertCard: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: globalStyles.cardRadius, padding: 24, alignItems: 'center', marginBottom: 18,
  },
  alertTitle: { fontSize: 20, fontWeight: 'bold', color: colors.black, marginTop: 12 },
  alertText: { fontSize: 14, color: colors.darkGray, textAlign: 'center', lineHeight: 20, marginTop: 8 },

  quickActions: { flexDirection: 'row', marginBottom: 20, gap: 12 },
  actionButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 14, paddingHorizontal: 12, borderRadius: globalStyles.buttonRadius, gap: 8,
  },
  actionButtonText: { color: colors.white, fontWeight: '700' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1 },

  card: {
    backgroundColor: colors.white, borderRadius: globalStyles.cardRadius, borderWidth: 1,
    borderColor: colors.border, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 20,
  },
  emptyText: { paddingVertical: 16, color: colors.darkGray, textAlign: 'center' },
  contactRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: colors.lightGray,
  },
  contactBadge: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 16, fontWeight: '600', color: colors.black },
  contactMeta: { fontSize: 12, color: colors.darkGray, marginTop: 2 },

  summaryTitle: { fontSize: 18, fontWeight: '700', color: colors.black, marginBottom: 10, marginTop: 8 },
  summaryText: { fontSize: 14, color: colors.darkGray, marginBottom: 6 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { 
    backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24 
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  
  pickContactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    padding: 12,
    borderRadius: globalStyles.cardRadius,
    marginBottom: 20,
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

  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 14, color: colors.darkGray, marginBottom: 8 },
  textInput: {
    backgroundColor: colors.white, borderRadius: 8, padding: 12, fontSize: 16,
    color: colors.black, borderWidth: 1, borderColor: colors.border
  }
});

export default EmergencyInformation;

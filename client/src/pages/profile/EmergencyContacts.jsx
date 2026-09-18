import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';

const EmergencyContacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Jane Doe', relation: 'Wife', phone: '+1 (555) 123-4567' },
    { id: '2', name: 'Robert Smith', relation: 'Brother', phone: '+1 (555) 987-6543' },
    { id: '3', name: 'Dr. Gregory House', relation: 'Primary Physician', phone: '+1 (555) 111-2222' }
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', relation: '', phone: '' });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      Alert.alert("Missing Info", "Please enter at least a name and phone number.");
      return;
    }
    
    setContacts(prev => [
      ...prev, 
      { id: Date.now().toString(), ...newContact }
    ]);
    setNewContact({ name: '', relation: '', phone: '' });
    setModalVisible(false);
  };

  const handleCall = (name) => {
    Alert.alert("Emergency Call", `Simulating call to ${name}...`);
  };

  const handleMessage = (name) => {
    Alert.alert("Emergency Message", `Sending SOS SMS to ${name}...`);
  };

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        <View style={styles.warningBanner}>
          <Ionicons name="information-circle" size={24} color={colors.white} />
          <Text style={styles.warningText}>These contacts will be notified during an SOS alert.</Text>
        </View>

        {contacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactAvatar}>
              <Text style={styles.avatarText}>{contact.name.charAt(0)}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactRelation}>{contact.relation}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <View style={styles.contactActions}>
              <TouchableOpacity style={styles.actionIcon} onPress={() => handleMessage(contact.name)}>
                <Ionicons name="chatbubble" size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionIcon, { backgroundColor: colors.success }]} onPress={() => handleCall(contact.name)}>
                <Ionicons name="call" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <PrimaryButton title="Add New Contact" onPress={() => setModalVisible(true)} />
        </View>
        <View style={{ height: 40 }} />
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
            
            <ScrollView>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. John Smith"
                  value={newContact.name}
                  onChangeText={(text) => setNewContact(prev => ({ ...prev, name: text }))}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Relationship</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Brother"
                  value={newContact.relation}
                  onChangeText={(text) => setNewContact(prev => ({ ...prev, relation: text }))}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="+1 (555) 000-0000"
                  keyboardType="phone-pad"
                  value={newContact.phone}
                  onChangeText={(text) => setNewContact(prev => ({ ...prev, phone: text }))}
                />
              </View>
              <View style={{ height: 20 }} />
              <PrimaryButton title="Add Contact" onPress={handleAddContact} />
            </ScrollView>
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
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border 
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  content: { padding: 20 },
  
  warningBanner: {
    backgroundColor: colors.darkGray, flexDirection: 'row', alignItems: 'center', 
    padding: 16, borderRadius: globalStyles.cardRadius, marginBottom: 20
  },
  warningText: { color: colors.white, fontSize: 14, marginLeft: 10, flex: 1 },

  contactCard: {
    backgroundColor: colors.white, flexDirection: 'row', padding: 16, alignItems: 'center',
    borderRadius: globalStyles.cardRadius, marginBottom: 12, borderWidth: 1, borderColor: colors.border
  },
  contactAvatar: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center', marginRight: 16
  },
  avatarText: { fontSize: 20, fontWeight: 'bold', color: colors.black },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 2 },
  contactRelation: { fontSize: 12, color: colors.darkGray, marginBottom: 4 },
  contactPhone: { fontSize: 14, color: colors.black },
  
  contactActions: { flexDirection: 'row' },
  actionIcon: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.white,
    justifyContent: 'center', alignItems: 'center', marginLeft: 10
  },

  footer: { marginTop: 20 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { 
    backgroundColor: colors.white, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 24, 
    maxHeight: '80%' 
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 14, color: colors.darkGray, marginBottom: 8 },
  textInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.border
  }
});

export default EmergencyContacts;

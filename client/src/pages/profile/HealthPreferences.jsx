import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const HealthPreferences = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [modalType, setModalType] = useState(null); // 'condition', 'allergy', 'medication'
  const [inputText, setInputText] = useState('');
  
  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '', time: '' });

  const health = user?.health || {};
  const chronicConditions = health.chronicConditions || [];
  const allergies = health.allergies || [];
  const medications = health.medications || [];

  const handleUpdateHealth = async (newHealthObj) => {
    setIsLoading(true);
    try {
      const updatedUser = await userService.updateProfile({ health: newHealthObj });
      await updateUser(updatedUser);
      setModalType(null);
      setInputText('');
      setNewMed({ name: '', dosage: '', frequency: '', time: '' });
    } catch (error) {
      Alert.alert('Error', 'Failed to update health profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = () => {
    if (modalType === 'condition') {
      if (!inputText.trim()) return;
      handleUpdateHealth({ ...health, chronicConditions: [...chronicConditions, inputText.trim()] });
    } else if (modalType === 'allergy') {
      if (!inputText.trim()) return;
      handleUpdateHealth({ ...health, allergies: [...allergies, inputText.trim()] });
    } else if (modalType === 'medication') {
      if (!newMed.name.trim()) return Alert.alert('Validation', 'Medication name is required');
      handleUpdateHealth({ ...health, medications: [...medications, newMed] });
    }
  };

  const handleDeleteItem = (type, index) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          if (type === 'condition') {
            const updated = chronicConditions.filter((_, i) => i !== index);
            handleUpdateHealth({ ...health, chronicConditions: updated });
          } else if (type === 'allergy') {
            const updated = allergies.filter((_, i) => i !== index);
            handleUpdateHealth({ ...health, allergies: updated });
          } else if (type === 'medication') {
            const updated = medications.filter((_, i) => i !== index);
            handleUpdateHealth({ ...health, medications: updated });
          }
        }
      }
    ]);
  };

  const renderList = (items, type, emptyText) => (
    <View style={styles.card}>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>{emptyText}</Text>
      ) : (
        items.map((item, index) => (
          <View key={index} style={[styles.listItem, index === items.length - 1 && { borderBottomWidth: 0 }]}>
            <View style={{ flex: 1 }}>
              {type === 'medication' ? (
                <>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemSub}>{item.dosage} • {item.frequency} • {item.time}</Text>
                </>
              ) : (
                <Text style={styles.itemTitle}>{item}</Text>
              )}
            </View>
            <TouchableOpacity onPress={() => handleDeleteItem(type, index)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Chronic Conditions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CHRONIC CONDITIONS</Text>
          <TouchableOpacity onPress={() => setModalType('condition')}>
            <Ionicons name="add-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {renderList(chronicConditions, 'condition', 'No chronic conditions added.')}

        {/* Allergies */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ALLERGIES</Text>
          <TouchableOpacity onPress={() => setModalType('allergy')}>
            <Ionicons name="add-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {renderList(allergies, 'allergy', 'No allergies added.')}

        {/* Medications */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MEDICATIONS</Text>
          <TouchableOpacity onPress={() => setModalType('medication')}>
            <Ionicons name="add-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {renderList(medications, 'medication', 'No medications added.')}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Add Item Modal */}
      <Modal visible={!!modalType} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === 'condition' ? 'Add Condition' : modalType === 'allergy' ? 'Add Allergy' : 'Add Medication'}
              </Text>
              <TouchableOpacity onPress={() => { setModalType(null); setInputText(''); }}>
                <Ionicons name="close" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
            
            {(modalType === 'condition' || modalType === 'allergy') && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{modalType === 'condition' ? 'Condition Name' : 'Allergy Name'}</Text>
                <TextInput
                  style={styles.textInput}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder={`e.g. ${modalType === 'condition' ? 'Asthma' : 'Peanuts'}`}
                />
              </View>
            )}

            {modalType === 'medication' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Medication Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newMed.name}
                    onChangeText={(t) => setNewMed({ ...newMed, name: t })}
                    placeholder="e.g. Lisinopril"
                  />
                </View>
                <View style={styles.rowInputs}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.inputLabel}>Dosage</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newMed.dosage}
                      onChangeText={(t) => setNewMed({ ...newMed, dosage: t })}
                      placeholder="e.g. 10mg"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.inputLabel}>Frequency</Text>
                    <TextInput
                      style={styles.textInput}
                      value={newMed.frequency}
                      onChangeText={(t) => setNewMed({ ...newMed, frequency: t })}
                      placeholder="e.g. Daily"
                    />
                  </View>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Time</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newMed.time}
                    onChangeText={(t) => setNewMed({ ...newMed, time: t })}
                    placeholder="e.g. 08:00 AM"
                  />
                </View>
              </>
            )}
            
            <View style={{ height: 20 }} />
            <PrimaryButton title={isLoading ? "Saving..." : "Add"} onPress={handleAddItem} disabled={isLoading} />
            <View style={{ height: 20 }} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20 },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 10 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1 },

  card: {
    backgroundColor: colors.white, borderRadius: globalStyles.cardRadius, borderWidth: 1,
    borderColor: colors.border, paddingHorizontal: 16, marginBottom: 20,
  },
  emptyText: { paddingVertical: 16, color: colors.darkGray, textAlign: 'center', fontStyle: 'italic' },
  
  listItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: colors.lightGray,
  },
  itemTitle: { fontSize: 16, fontWeight: '600', color: colors.black },
  itemSub: { fontSize: 13, color: colors.darkGray, marginTop: 4 },
  deleteBtn: { padding: 4, marginLeft: 12 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { 
    backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24 
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  
  inputGroup: { marginBottom: 16 },
  rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },
  inputLabel: { fontSize: 14, color: colors.darkGray, marginBottom: 8, fontWeight: '500' },
  textInput: {
    backgroundColor: colors.white, borderRadius: 8, padding: 12, fontSize: 16,
    color: colors.black, borderWidth: 1, borderColor: colors.border
  }
});

export default HealthPreferences;

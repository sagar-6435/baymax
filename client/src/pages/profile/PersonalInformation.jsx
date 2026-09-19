import AppHeader from '../../components/AppHeader';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', "Don't know"];

const PersonalInformation = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  
  const [userInfo, setUserInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
    bloodGroup: user?.bloodGroup || '',
    phone: user?.phone || '',
    address: user?.address || '',
    age: user?.age ? String(user.age) : '',
    height: user?.height?.value ? String(user.height.value) : '',
    weight: user?.weight?.value ? String(user.weight.value) : ''
  });

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({ ...userInfo });
  const [isLoading, setIsLoading] = useState(false);
  const [showBloodGroupPicker, setShowBloodGroupPicker] = useState(false);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    } catch (e) {
      return isoString;
    }
  };

  useEffect(() => {
    if (user) {
      const formattedDob = formatDate(user.dob);
      const data = {
        name: user.name || '',
        email: user.email || '',
        dob: formattedDob,
        gender: user.gender || '',
        bloodGroup: user.bloodGroup || '',
        phone: user.phone || '',
        address: user.address || '',
        age: user.age ? String(user.age) : '',
        height: user.height?.value ? String(user.height.value) : '',
        weight: user.weight?.value ? String(user.weight.value) : ''
      };
      setUserInfo(data);
      setEditForm(data);
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payload = {
        name: editForm.name,
        email: editForm.email,
        dob: editForm.dob,
        gender: editForm.gender,
        bloodGroup: editForm.bloodGroup,
        phone: editForm.phone,
        address: editForm.address,
        age: editForm.age ? parseInt(editForm.age, 10) : null,
      };
      
      if (editForm.height) payload.height = { value: parseFloat(editForm.height), unit: 'cm' };
      if (editForm.weight) payload.weight = { value: parseFloat(editForm.weight), unit: 'kg' };

      const updatedUser = await userService.updateProfile(payload);
      await updateUser(updatedUser);
      setUserInfo(editForm);
      setEditModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const infoList = [
    { label: 'Full Name', value: userInfo.name, key: 'name' },
    { label: 'Email', value: userInfo.email, key: 'email' },
    { label: 'Date of Birth', value: userInfo.dob, key: 'dob' },
    { label: 'Age', value: userInfo.age ? `${userInfo.age} yrs` : '', key: 'age' },
    { label: 'Gender', value: userInfo.gender, key: 'gender' },
    { label: 'Blood Type', value: userInfo.bloodGroup, key: 'bloodGroup' },
    { label: 'Height (cm)', value: userInfo.height ? `${userInfo.height} cm` : '', key: 'height' },
    { label: 'Weight (kg)', value: userInfo.weight ? `${userInfo.weight} kg` : '', key: 'weight' },
    { label: 'Phone', value: userInfo.phone, key: 'phone' },
    { label: 'Address', value: userInfo.address, key: 'address' },
  ];

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}</Text>
          </View>
          <TouchableOpacity style={styles.editAvatarBtn}>
            <Ionicons name="camera" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          {infoList.map((info, index) => (
            <View key={index} style={[styles.infoRow, index === infoList.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.infoLabel}>{info.label}</Text>
              <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">
                {info.value || '-'}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.actionContainer}>
          <PrimaryButton title="Edit Details" onPress={() => setEditModalVisible(true)} />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Edit Details Modal */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Personal Info</Text>
              <TouchableOpacity onPress={() => { setEditForm(userInfo); setEditModalVisible(false); }}>
                <Ionicons name="close" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
              {infoList.map((item) => (
                <View key={item.key} style={[styles.inputGroup, item.key === 'bloodGroup' && { zIndex: 100 }]}>
                  <Text style={styles.inputLabel}>{item.label}</Text>
                  
                  {item.key === 'bloodGroup' ? (
                    <View style={{ zIndex: 100 }}>
                      <TouchableOpacity 
                        style={[styles.textInput, { justifyContent: 'center' }]}
                        onPress={() => setShowBloodGroupPicker(!showBloodGroupPicker)}
                        activeOpacity={0.8}
                      >
                        <Text style={{ fontSize: 16, color: editForm.bloodGroup ? colors.black : colors.darkGray }}>
                          {editForm.bloodGroup || 'Select Blood Type'}
                        </Text>
                        <Ionicons 
                          name={showBloodGroupPicker ? "chevron-up" : "chevron-down"} 
                          size={20} 
                          color={colors.darkGray} 
                          style={{ position: 'absolute', right: 12 }} 
                        />
                      </TouchableOpacity>
                      
                      {showBloodGroupPicker && (
                        <View style={styles.dropdownContainer}>
                          {BLOOD_GROUPS.map((bg) => (
                            <TouchableOpacity
                              key={bg}
                              style={styles.dropdownItem}
                              onPress={() => {
                                setEditForm(prev => ({ ...prev, bloodGroup: bg }));
                                setShowBloodGroupPicker(false);
                              }}
                            >
                              <Text style={[
                                styles.dropdownItemText,
                                editForm.bloodGroup === bg && { color: colors.primary, fontWeight: 'bold' }
                              ]}>
                                {bg}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  ) : (
                    <TextInput
                      style={styles.textInput}
                      value={editForm[item.key]}
                      onChangeText={(text) => {
                        let newValue = item.key === 'email' ? text.toLowerCase() : text;
                        let updates = { [item.key]: newValue };
                        
                        if (item.key === 'dob' && newValue.length === 10) {
                          const parts = newValue.split('/');
                          if (parts.length === 3) {
                            const dob = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                            if (!isNaN(dob.getTime())) {
                              const today = new Date();
                              let calculatedAge = today.getFullYear() - dob.getFullYear();
                              const m = today.getMonth() - dob.getMonth();
                              if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                                calculatedAge--;
                              }
                              if (calculatedAge >= 0) {
                                updates.age = String(calculatedAge);
                              }
                            }
                          }
                        }
                        
                        setEditForm(prev => ({ ...prev, ...updates }));
                      }}
                      autoCapitalize={item.key === 'email' ? 'none' : 'words'}
                      keyboardType={['email'].includes(item.key) ? 'email-address' : (['age', 'height', 'weight', 'phone'].includes(item.key) ? 'numeric' : 'default')}
                      placeholder={`Enter ${item.label}`}
                    />
                  )}
                </View>
              ))}
              <View style={{ height: 20 }} />
              <PrimaryButton title={isLoading ? "Saving..." : "Save Changes"} onPress={handleSave} disabled={isLoading} />
              <View style={{ height: 40 }} />
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
  
  avatarContainer: { alignItems: 'center', marginVertical: 30 },
  avatarPlaceholder: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: colors.white
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: colors.black },
  editAvatarBtn: {
    position: 'absolute', bottom: 0, right: '35%', backgroundColor: colors.black,
    width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: colors.white
  },

  infoCard: {
    backgroundColor: colors.white, borderRadius: globalStyles.cardRadius,
    borderWidth: 1, borderColor: colors.border, padding: 10, marginBottom: 30
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 16, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: colors.border
  },
  infoLabel: { fontSize: 16, color: colors.darkGray },
  infoValue: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  
  actionContainer: { marginTop: 10 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { 
    backgroundColor: colors.white, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 24, 
    maxHeight: '90%' 
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
    borderColor: colors.border,
    minHeight: 48
  },
  dropdownContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.black,
  }
});

export default PersonalInformation;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';

const PersonalInformation = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    age: '34 years',
    gender: 'Male',
    bloodType: 'O+',
    height: '180 cm',
    weight: '75 kg'
  });

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({ ...userInfo });

  const handleSave = () => {
    setUserInfo(editForm);
    setEditModalVisible(false);
  };

  const infoList = [
    { label: 'Full Name', value: userInfo.fullName, key: 'fullName' },
    { label: 'Age', value: userInfo.age, key: 'age' },
    { label: 'Gender', value: userInfo.gender, key: 'gender' },
    { label: 'Blood Type', value: userInfo.bloodType, key: 'bloodType' },
    { label: 'Height', value: userInfo.height, key: 'height' },
    { label: 'Weight', value: userInfo.weight, key: 'weight' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PERSONAL INFO</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{userInfo.fullName.charAt(0)}</Text>
          </View>
          <TouchableOpacity style={styles.editAvatarBtn}>
            <Ionicons name="camera" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          {infoList.map((info, index) => (
            <View key={index} style={[styles.infoRow, index === infoList.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.infoLabel}>{info.label}</Text>
              <Text style={styles.infoValue}>{info.value}</Text>
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
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
            
            <ScrollView>
              {infoList.map((item) => (
                <View key={item.key} style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>{item.label}</Text>
                  <TextInput
                    style={styles.textInput}
                    value={editForm[item.key]}
                    onChangeText={(text) => setEditForm(prev => ({ ...prev, [item.key]: text }))}
                  />
                </View>
              ))}
              <View style={{ height: 20 }} />
              <PrimaryButton title="Save Changes" onPress={handleSave} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.lightGray },
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
    maxHeight: '80%' 
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 14, color: colors.darkGray, marginBottom: 8 },
  textInput: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.border
  }
});

export default PersonalInformation;

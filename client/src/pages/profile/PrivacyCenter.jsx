import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const PrivacyCenter = ({ navigation }) => {

  const handleDownload = () => {
    Alert.alert("Data Export Started", "Your health data and chat history are being packaged securely. We will notify you when it's ready to download.");
  };

  const handlePolicy = () => {
    Alert.alert("Privacy Policy", "Baymax uses local, on-device AI. Your personal health data never leaves your device unless you explicitly opt-in to cloud backups.");
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Account?",
      "Are you absolutely sure? This will permanently wipe all your local health data and preferences. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete Everything", style: "destructive", onPress: () => Alert.alert("Account Deleted") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        <View style={styles.shieldContainer}>
          <Ionicons name="shield-checkmark" size={60} color={colors.success} />
          <Text style={styles.shieldTitle}>Your Data is Protected</Text>
          <Text style={styles.shieldDesc}>Baymax uses local, on-device AI to process your health data, ensuring your privacy.</Text>
        </View>

        <Text style={styles.sectionTitle}>DATA MANAGEMENT</Text>
        
        <TouchableOpacity style={styles.actionCard} onPress={handleDownload}>
          <Ionicons name="download-outline" size={24} color={colors.primary} style={styles.actionIcon} />
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Download My Data</Text>
            <Text style={styles.actionDesc}>Export a secure copy of all your health records and chat history.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.darkGray} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard} onPress={handlePolicy}>
          <Ionicons name="document-text-outline" size={24} color={colors.black} style={styles.actionIcon} />
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Privacy Policy</Text>
            <Text style={styles.actionDesc}>Read how we collect, store, and protect your information.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.darkGray} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>DANGER ZONE</Text>

        <TouchableOpacity style={[styles.actionCard, { borderColor: colors.error, borderWidth: 1 }]} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color={colors.error} style={styles.actionIcon} />
          <View style={styles.actionTextContainer}>
            <Text style={[styles.actionTitle, { color: colors.error }]}>Delete Account</Text>
            <Text style={styles.actionDesc}>Permanently delete your account and all associated health data.</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  
  shieldContainer: {
    alignItems: 'center', backgroundColor: colors.white, padding: 30,
    borderRadius: globalStyles.cardRadius, marginBottom: 30, borderWidth: 1, borderColor: colors.border
  },
  shieldTitle: { fontSize: 20, fontWeight: 'bold', color: colors.black, marginTop: 16, marginBottom: 8 },
  shieldDesc: { fontSize: 14, color: colors.darkGray, textAlign: 'center', lineHeight: 20 },

  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 12 },
  
  actionCard: {
    backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', padding: 16,
    borderRadius: globalStyles.cardRadius, marginBottom: 12, borderWidth: 1, borderColor: colors.border
  },
  actionIcon: { marginRight: 16 },
  actionTextContainer: { flex: 1 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  actionDesc: { fontSize: 13, color: colors.darkGray, lineHeight: 18 }
});

export default PrivacyCenter;

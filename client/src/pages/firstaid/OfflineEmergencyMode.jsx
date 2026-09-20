import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { emergencyData } from '../../data/emergencyData';

const OfflineEmergencyMode = ({ navigation }) => {
  const [showCard, setShowCard] = useState(false);
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await AsyncStorage.getItem('emergencyCardData');
        if (data) setCardData(JSON.parse(data));
      } catch (e) {
        console.error(e);
      }
    };
    fetchCard();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EMERGENCY</Text>
        <TouchableOpacity onPress={() => setShowCard(true)}>
          <Ionicons name="card" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Select the emergency to get offline voice guidance immediately.</Text>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {emergencyData.map((emergency) => (
          <TouchableOpacity
            key={emergency.id}
            style={[styles.emergencyCard, { borderLeftColor: emergency.color }]}
            onPress={() => navigation.navigate('EmergencyStepViewer', { emergency })}
          >
            <View style={[styles.iconContainer, { backgroundColor: emergency.color + '20' }]}>
              <Ionicons name={emergency.icon} size={32} color={emergency.color} />
            </View>
            <Text style={styles.emergencyTitle}>{emergency.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>
        ))}
        
        <View style={styles.offlineNoteContainer}>
          <Ionicons name="cloud-offline" size={20} color="#999999" />
          <Text style={styles.offlineNoteText}>Works completely offline</Text>
        </View>
      </ScrollView>

      {/* Emergency Card Modal */}
      <Modal visible={showCard} transparent={true} animationType="slide" onRequestClose={() => setShowCard(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>MEDICAL ID</Text>
              <TouchableOpacity onPress={() => setShowCard(false)}>
                <Ionicons name="close" size={28} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll}>
              {cardData ? (
                <>
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>NAME</Text>
                    <Text style={styles.cardValue}>{cardData.name || 'Not provided'}</Text>
                  </View>
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>EMERGENCY CONTACT</Text>
                    <Text style={styles.cardValue}>{cardData.emergencyContact || 'Not provided'} ({cardData.contactPhone || 'No number'})</Text>
                  </View>
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>BLOOD TYPE</Text>
                    <Text style={[styles.cardValue, {color: '#FF3B30', fontWeight: 'bold'}]}>{cardData.bloodType || 'Unknown'}</Text>
                  </View>
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>ALLERGIES</Text>
                    <Text style={styles.cardValue}>{cardData.allergies || 'None listed'}</Text>
                  </View>
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>MEDICATIONS</Text>
                    <Text style={styles.cardValue}>{cardData.medications || 'None listed'}</Text>
                  </View>
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>MEDICAL CONDITIONS</Text>
                    <Text style={styles.cardValue}>{cardData.medicalConditions || 'None listed'}</Text>
                  </View>
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>NOTES</Text>
                    <Text style={styles.cardValue}>{cardData.notes || 'None'}</Text>
                  </View>
                </>
              ) : (
                <View style={{padding: 20, alignItems: 'center'}}>
                  <Text style={{fontSize: 16, textAlign: 'center', color: '#666'}}>No emergency card set up. Go to Profile to configure it.</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black background for high contrast
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FF3B30',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    paddingHorizontal: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emergencyCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderLeftWidth: 6,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emergencyTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  offlineNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  offlineNoteText: {
    color: '#999999',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '60%',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FF3B30',
    letterSpacing: 1,
  },
  modalScroll: {
    flex: 1,
  },
  cardSection: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingBottom: 12,
  },
  cardLabel: {
    fontSize: 12,
    color: '#999999',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    color: '#000000',
  }
});

export default OfflineEmergencyMode;

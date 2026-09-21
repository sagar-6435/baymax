import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Modal, Image, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { emergencyData } from '../../data/emergencyData';

const medicalIdImage = require('../../../assets/firstaid/medical_id.jpg');

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

  const callEmergency = () => {
    Linking.openURL('tel:911').catch(() => {});
  };

  const callContact = (phone) => {
    if (phone) Linking.openURL(`tel:${phone}`).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <Ionicons name="arrow-back" size={26} color={colors.black} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Ionicons name="warning" size={22} color="#FF3B30" style={{ marginRight: 6 }} />
          <Text style={styles.headerTitle}>Emergency <Text style={{ color: '#FF3B30' }}>SOS</Text></Text>
        </View>

        <TouchableOpacity 
          style={styles.medicalIdHeaderBtn} 
          onPress={() => setShowCard(true)}
          accessibilityRole="button"
          accessibilityLabel="Medical ID"
        >
          <Ionicons name="card" size={22} color={colors.black} />
          <Text style={styles.medicalIdHeaderBtnText}>ID</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Call 911 Emergency Button */}
        <TouchableOpacity 
          style={styles.emergencyCallBanner}
          onPress={callEmergency}
          activeOpacity={0.88}
        >
          <View style={styles.callIconWrapper}>
            <Ionicons name="call" size={26} color={colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.emergencyCallTitle}>CALL 911 IMMEDIATELY</Text>
            <Text style={styles.emergencyCallSub}>One-tap emergency dispatch</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.white} />
        </TouchableOpacity>

        {/* Offline Badge & Subtitle */}
        <View style={styles.infoRow}>
          <View style={styles.offlineBadge}>
            <Ionicons name="cloud-offline" size={16} color="#16A34A" />
            <Text style={styles.offlineBadgeText}>100% Offline Voice Guided</Text>
          </View>
          <Text style={styles.subtitle}>
            Select an emergency below for instant voice walkthroughs:
          </Text>
        </View>

        {/* Emergency Guides List */}
        {emergencyData.map((emergency) => (
          <TouchableOpacity
            key={emergency.id}
            style={[styles.emergencyCard, { backgroundColor: emergency.bgColor || '#FFF9E6' }]}
            onPress={() => navigation.navigate('EmergencyStepViewer', { emergency })}
            activeOpacity={0.85}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.white }]}>
              <Ionicons name={emergency.icon} size={28} color={emergency.color} />
            </View>
            <View style={styles.cardInfo}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.emergencyTitle}>{emergency.title}</Text>
                <View style={[styles.stepCountBadge, { borderColor: emergency.color + '40' }]}>
                  <Text style={[styles.stepCountText, { color: emergency.color }]}>
                    {emergency.steps?.length || 5} steps
                  </Text>
                </View>
              </View>
              <Text style={styles.emergencySubtitle}>{emergency.subtitle || emergency.steps[0]?.title}</Text>
            </View>
            <View style={[styles.chevronWrapper, { backgroundColor: emergency.color }]}>
              <Ionicons name="play" size={14} color={colors.white} style={{ marginLeft: 2 }} />
            </View>
          </TouchableOpacity>
        ))}

        {/* Quick Access to Medical ID Card */}
        <TouchableOpacity 
          style={styles.medicalIdBanner}
          onPress={() => setShowCard(true)}
          activeOpacity={0.88}
        >
          <Image source={medicalIdImage} style={styles.medicalIdThumb} resizeMode="contain" />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.medicalIdBannerTitle}>View Emergency Medical ID</Text>
            <Text style={styles.medicalIdBannerSub}>Blood type, contacts, allergies & medications</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.darkGray} />
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Emergency Card Modal */}
      <Modal visible={showCard} transparent={true} animationType="slide" onRequestClose={() => setShowCard(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="shield-checkmark" size={24} color="#FF3B30" style={{ marginRight: 8 }} />
                <Text style={styles.modalTitle}>EMERGENCY MEDICAL ID</Text>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowCard(false)}
              >
                <Ionicons name="close" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {/* BayMax Medical ID Illustration */}
              <View style={styles.illustrationContainer}>
                <Image source={medicalIdImage} style={styles.modalIllustration} resizeMode="contain" />
              </View>

              {cardData ? (
                <>
                  {/* Name Card */}
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>PATIENT NAME</Text>
                    <Text style={styles.cardValue}>{cardData.name || 'Not provided'}</Text>
                  </View>

                  {/* Blood Type Highlight */}
                  <View style={styles.bloodTypeCard}>
                    <View>
                      <Text style={styles.bloodTypeLabel}>BLOOD GROUP</Text>
                      <Text style={styles.bloodTypeValue}>{cardData.bloodType || 'Unknown'}</Text>
                    </View>
                    <Ionicons name="water" size={36} color="#FF3B30" />
                  </View>

                  {/* Emergency Contact */}
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>PRIMARY EMERGENCY CONTACT</Text>
                    <Text style={styles.cardValue}>{cardData.emergencyContact || 'Not provided'}</Text>
                    {cardData.contactPhone ? (
                      <TouchableOpacity 
                        style={styles.callContactButton}
                        onPress={() => callContact(cardData.contactPhone)}
                      >
                        <Ionicons name="call" size={18} color={colors.white} style={{ marginRight: 8 }} />
                        <Text style={styles.callContactText}>Call {cardData.contactPhone}</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>

                  {/* Allergies */}
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>KNOWN ALLERGIES</Text>
                    <Text style={styles.cardValueAlert}>{cardData.allergies || 'None listed'}</Text>
                  </View>

                  {/* Current Medications */}
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>CURRENT MEDICATIONS</Text>
                    <Text style={styles.cardValue}>{cardData.medications || 'None listed'}</Text>
                  </View>

                  {/* Medical Conditions */}
                  <View style={styles.cardSection}>
                    <Text style={styles.cardLabel}>MEDICAL CONDITIONS</Text>
                    <Text style={styles.cardValue}>{cardData.medicalConditions || 'None listed'}</Text>
                  </View>

                  {/* Notes for First Responders */}
                  {cardData.notes ? (
                    <View style={[styles.cardSection, { borderBottomWidth: 0 }]}>
                      <Text style={styles.cardLabel}>NOTES FOR FIRST RESPONDERS</Text>
                      <Text style={styles.cardValue}>{cardData.notes}</Text>
                    </View>
                  ) : null}
                </>
              ) : (
                <View style={styles.emptyCardContainer}>
                  <Ionicons name="information-circle-outline" size={48} color={colors.primary} />
                  <Text style={styles.emptyCardText}>No Medical ID data configured yet.</Text>
                  <Text style={styles.emptyCardSubText}>Configure your Emergency Card under Profile to have life-saving info ready offline.</Text>
                </View>
              )}
              <View style={{ height: 30 }} />
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
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 18,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.black,
    letterSpacing: 0.5,
  },
  medicalIdHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  medicalIdHeaderBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.black,
    marginLeft: 4,
  },

  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  emergencyCallBanner: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 22,
    marginBottom: 20,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  callIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  emergencyCallTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  emergencyCallSub: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },

  infoRow: {
    marginBottom: 16,
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  offlineBadgeText: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  subtitle: {
    fontSize: 15,
    color: colors.darkGray,
    lineHeight: 22,
  },

  emergencyCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.black,
  },
  stepCountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
  },
  stepCountText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  emergencySubtitle: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },
  chevronWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  medicalIdBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    padding: 14,
    marginTop: 10,
  },
  medicalIdThumb: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  medicalIdBannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  medicalIdBannerSub: {
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 2,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.black,
    letterSpacing: 0.5,
  },
  modalCloseButton: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
  },
  modalScroll: {
    paddingBottom: 20,
  },
  illustrationContainer: {
    width: '100%',
    height: 160,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#000000',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalIllustration: {
    width: '100%',
    height: '100%',
  },

  cardSection: {
    backgroundColor: colors.lightGray,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  cardLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: 'bold',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
    lineHeight: 22,
  },
  cardValueAlert: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '700',
    lineHeight: 22,
  },

  bloodTypeCard: {
    backgroundColor: '#FFF1F0',
    borderWidth: 1,
    borderColor: '#FECDD3',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bloodTypeLabel: {
    fontSize: 11,
    color: '#9F1239',
    fontWeight: 'bold',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  bloodTypeValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FF3B30',
  },

  callContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16A34A',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  callContactText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },

  emptyCardContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 12,
    textAlign: 'center',
  },
  emptyCardSubText: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  }
});

export default OfflineEmergencyMode;

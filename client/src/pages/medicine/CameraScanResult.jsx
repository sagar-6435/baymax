import AppHeader from '../../components/AppHeader';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const CameraScanResult = ({ navigation, route }) => {
  const { mockItem } = route.params || { mockItem: 'Unknown' };
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate AI scanning delay
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        {analyzing ? (
          <View style={styles.analyzingContainer}>
            <View style={styles.pulseRing}>
              <Ionicons name="scan-outline" size={64} color={colors.primary} />
            </View>
            <Text style={styles.analyzingTitle}>Analyzing Image...</Text>
            <Text style={styles.analyzingSub}>Baymax is identifying the medicine</Text>
            <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={80} color={colors.primary} />
            </View>
            <Text style={styles.matchText}>Match Found!</Text>
            
            <View style={styles.medicineCard}>
              <View style={styles.medIconBox}>
                <Ionicons name="medical" size={40} color={colors.primary} />
              </View>
              <Text style={styles.medicineName}>{mockItem}</Text>
              <Text style={styles.medicineType}>Pain Reliever & Fever Reducer</Text>
              
              <View style={styles.confidenceRow}>
                <Ionicons name="shield-checkmark" size={16} color={colors.success || '#28a745'} />
                <Text style={styles.confidenceText}>99.8% AI Confidence</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={() => navigation.navigate('MedicineDetails', { item: mockItem })}
            >
              <Text style={styles.detailsButtonText}>View Medicine Details</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.rescanButton} onPress={() => navigation.goBack()}>
              <Text style={styles.rescanButtonText}>Scan Another</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingTop: 50, 
    paddingBottom: 16, 
    paddingHorizontal: 20, 
    backgroundColor: colors.white,
  },
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  backButton: { padding: 4 },
  
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  
  analyzingContainer: { alignItems: 'center' },
  pulseRing: {
    width: 120, height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  analyzingTitle: { fontSize: 22, fontWeight: 'bold', color: colors.black, marginBottom: 8 },
  analyzingSub: { fontSize: 16, color: colors.darkGray },
  
  resultContainer: { alignItems: 'center' },
  successIcon: { marginBottom: 10 },
  matchText: { fontSize: 24, fontWeight: 'bold', color: colors.black, marginBottom: 30 },
  
  medicineCard: {
    backgroundColor: colors.white,
    borderRadius: globalStyles.cardRadius,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 40
  },
  medIconBox: {
    width: 80, height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  medicineName: { fontSize: 22, fontWeight: 'bold', color: colors.black, marginBottom: 8 },
  medicineType: { fontSize: 16, color: colors.darkGray, marginBottom: 16 },
  confidenceRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e6f4ea', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  confidenceText: { color: '#137333', fontWeight: 'bold', marginLeft: 6 },
  
  detailsButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    width: '100%',
    padding: 16,
    borderRadius: globalStyles.buttonRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  detailsButtonText: { color: colors.white, fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  
  rescanButton: { padding: 16 },
  rescanButtonText: { color: colors.darkGray, fontSize: 16, fontWeight: 'bold' }
});

export default CameraScanResult;

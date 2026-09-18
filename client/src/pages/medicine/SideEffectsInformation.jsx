import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const SideEffectsInformation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        
        <View style={styles.card}>
          <Text style={styles.cardHeader}>COMMON SIDE EFFECTS</Text>
          <Text style={styles.cardSub}>Usually mild and may go away within a few days.</Text>
          
          <View style={styles.effectItem}>
            <Ionicons name="sad-outline" size={24} color={colors.primary} />
            <Text style={styles.effectText}>Nausea or vomiting</Text>
          </View>
          <View style={styles.effectItem}>
            <Ionicons name="bed-outline" size={24} color={colors.primary} />
            <Text style={styles.effectText}>Mild headache</Text>
          </View>
          <View style={styles.effectItem}>
            <Ionicons name="water-outline" size={24} color={colors.primary} />
            <Text style={styles.effectText}>Dry mouth</Text>
          </View>
        </View>

        <View style={[styles.card, { borderColor: '#d32f2f', borderWidth: 1.5 }]}>
          <Text style={[styles.cardHeader, { color: '#d32f2f' }]}>SEVERE SIDE EFFECTS</Text>
          <Text style={styles.cardSub}>Seek immediate medical attention if you experience any of these.</Text>
          
          <View style={styles.effectItem}>
            <Ionicons name="warning" size={24} color="#d32f2f" />
            <Text style={[styles.effectText, { color: '#d32f2f', fontWeight: 'bold' }]}>Severe allergic reaction (rash, itching, swelling)</Text>
          </View>
          <View style={styles.effectItem}>
            <Ionicons name="warning" size={24} color="#d32f2f" />
            <Text style={[styles.effectText, { color: '#d32f2f', fontWeight: 'bold' }]}>Difficulty breathing or swallowing</Text>
          </View>
          <View style={styles.effectItem}>
            <Ionicons name="warning" size={24} color="#d32f2f" />
            <Text style={[styles.effectText, { color: '#d32f2f', fontWeight: 'bold' }]}>Yellowing of skin or eyes (jaundice)</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    borderBottomWidth: 1, 
    borderBottomColor: colors.border 
  },
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  backButton: { padding: 4 },
  
  content: { padding: 20 },
  
  card: { 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24, 
    borderRadius: globalStyles.cardRadius, 
    marginBottom: 20 
  },
  cardHeader: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  cardSub: { fontSize: 14, color: colors.darkGray, marginBottom: 20 },
  
  effectItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  effectText: { fontSize: 16, color: colors.black, marginLeft: 16, flex: 1 }
});

export default SideEffectsInformation;

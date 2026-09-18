import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const LearningCategories = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('AnatomyModule')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#e3f2fd' }]}>
              <Text style={styles.iconText}>🧠</Text>
            </View>
            <Text style={styles.cardTitle}>Human Anatomy</Text>
            <Text style={styles.cardSub}>Understand your body</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('NutritionModule')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
              <Text style={styles.iconText}>🥗</Text>
            </View>
            <Text style={styles.cardTitle}>Nutrition Basics</Text>
            <Text style={styles.cardSub}>Healthy eating habits</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('DiseaseModule')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#ffebee' }]}>
              <Text style={styles.iconText}>🦠</Text>
            </View>
            <Text style={styles.cardTitle}>Disease Prevention</Text>
            <Text style={styles.cardSub}>Stay healthy & safe</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('FirstAidLearningModule')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#fff3e0' }]}>
              <Text style={styles.iconText}>🩹</Text>
            </View>
            <Text style={styles.cardTitle}>First Aid Essentials</Text>
            <Text style={styles.cardSub}>Emergency response</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('MedicationSafetyModule')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#f3e5f5' }]}>
              <Text style={styles.iconText}>💊</Text>
            </View>
            <Text style={styles.cardTitle}>Medication Safety</Text>
            <Text style={styles.cardSub}>Proper use & care</Text>
          </TouchableOpacity>
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
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center'
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  iconText: { fontSize: 32 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, textAlign: 'center', marginBottom: 4 },
  cardSub: { fontSize: 12, color: colors.darkGray, textAlign: 'center' }
});

export default LearningCategories;

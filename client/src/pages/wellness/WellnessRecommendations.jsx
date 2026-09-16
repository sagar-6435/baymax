import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const WellnessRecommendations = ({ navigation }) => {
  const recommendations = [
    {
      id: '1',
      title: 'Hydration Check',
      desc: "You haven't logged water intake today. Drinking a glass now can boost your energy.",
      icon: 'water',
      color: '#e1f5fe'
    },
    {
      id: '2',
      title: 'Take a Short Walk',
      desc: 'You have been seated for 2 hours. A 5-minute walk will refresh your mind.',
      icon: 'walk',
      color: '#e8f5e9'
    },
    {
      id: '3',
      title: 'Evening Decompression',
      desc: 'Your recent mood logs indicate stress. Try our 10-minute deep body scan.',
      icon: 'moon',
      color: '#ede7f6'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>INSIGHTS</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.heroSection}>
          <Ionicons name="bulb" size={48} color={colors.primary} style={styles.heroIcon} />
          <Text style={styles.heroTitle}>Daily Insights</Text>
          <Text style={styles.heroDesc}>Personalized suggestions based on your activity and mood patterns to help you stay balanced.</Text>
        </View>

        <Text style={styles.sectionTitle}>FOR YOU TODAY</Text>

        {recommendations.map((rec) => (
          <TouchableOpacity key={rec.id} style={styles.recCard}>
            <View style={[styles.iconBox, { backgroundColor: rec.color }]}>
              <Ionicons name={rec.icon} size={28} color={colors.black} />
            </View>
            <View style={styles.recText}>
              <Text style={styles.recTitle}>{rec.title}</Text>
              <Text style={styles.recDesc}>{rec.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.border} />
          </TouchableOpacity>
        ))}

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
  
  heroSection: {
    alignItems: 'center',
    backgroundColor: '#fffde7',
    padding: 30,
    borderRadius: globalStyles.cardRadius,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#fff59d'
  },
  heroIcon: { marginBottom: 12 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: colors.black, marginBottom: 8 },
  heroDesc: { fontSize: 14, color: colors.darkGray, textAlign: 'center', lineHeight: 22 },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  recCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recText: { flex: 1, paddingRight: 10 },
  recTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  recDesc: { fontSize: 13, color: colors.darkGray, lineHeight: 18 }
});

export default WellnessRecommendations;

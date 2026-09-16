import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const WellnessDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WELLNESS</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>Daily Check-in</Text>
          <Text style={styles.greetingSub}>Take a moment for yourself today.</Text>
        </View>

        {/* Mood Check Card */}
        <TouchableOpacity style={styles.moodCard} onPress={() => navigation.navigate('MoodCheck')}>
          <View style={styles.moodHeader}>
            <View>
              <Text style={styles.cardTitle}>How are you feeling?</Text>
              <Text style={styles.cardSub}>Log your mood for better insights</Text>
            </View>
            <View style={styles.iconCircle}>
              <Text style={styles.emojiIcon}>🙂</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>YOUR TOOLS</Text>

        <View style={styles.grid}>
          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('BreathingExercise')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#e0f7fa' }]}>
              <Text style={styles.gridEmoji}>🌬️</Text>
            </View>
            <Text style={styles.gridCardTitle}>Breathe</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('RelaxationExercise')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#f3e5f5' }]}>
              <Text style={styles.gridEmoji}>🧘</Text>
            </View>
            <Text style={styles.gridCardTitle}>Relax</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('ActivitySummary')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#fff3e0' }]}>
              <Text style={styles.gridEmoji}>🏃</Text>
            </View>
            <Text style={styles.gridCardTitle}>Activity</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => navigation.navigate('WellnessHistory')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
              <Text style={styles.gridEmoji}>📊</Text>
            </View>
            <Text style={styles.gridCardTitle}>History</Text>
          </TouchableOpacity>
        </View>

        {/* Recommendations Teaser */}
        <TouchableOpacity style={styles.recommendationCard} onPress={() => navigation.navigate('WellnessRecommendations')}>
          <View style={styles.recContent}>
            <Ionicons name="bulb-outline" size={24} color={colors.primary} />
            <View style={styles.recTextContainer}>
              <Text style={styles.recTitle}>Daily Insight</Text>
              <Text style={styles.recDesc}>See personalized tips based on your recent activity.</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.darkGray} />
        </TouchableOpacity>

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
  
  greetingSection: { marginBottom: 24 },
  greetingTitle: { fontSize: 24, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  greetingSub: { fontSize: 16, color: colors.darkGray },
  
  moodCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  moodHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  cardSub: { fontSize: 14, color: colors.darkGray },
  iconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.lightGray, justifyContent: 'center', alignItems: 'center' },
  emojiIcon: { fontSize: 24 },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
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
  gridEmoji: { fontSize: 28 },
  gridCardTitle: { fontSize: 16, fontWeight: '600', color: colors.black },
  
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightGray,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
    marginTop: 10
  },
  recContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  recTextContainer: { marginLeft: 16, flex: 1 },
  recTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 2 },
  recDesc: { fontSize: 13, color: colors.darkGray, paddingRight: 10 }
});

export default WellnessDashboard;

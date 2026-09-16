import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const MoodResult = ({ route, navigation }) => {
  const { mood } = route.params || { mood: { id: 3, emoji: '😐', label: 'Okay', color: '#fff9c4' } };

  // Personalize suggestion based on mood id
  let suggestionTitle = "Let's keep the balance.";
  let suggestionText = "A quick breathing exercise might help you center yourself for the rest of the day.";
  let actionRoute = "BreathingExercise";
  let actionLabel = "Try 1-Minute Breathing";

  if (mood.id <= 2) {
    suggestionTitle = "It's okay to not be okay.";
    suggestionText = "When you're feeling down or stressed, taking a few minutes to deeply relax can make a big difference.";
    actionRoute = "RelaxationExercise";
    actionLabel = "Start Relaxation";
  } else if (mood.id >= 4) {
    suggestionTitle = "Glad you're doing well!";
    suggestionText = "Since you have good energy today, how about reviewing your recent activity goals?";
    actionRoute = "ActivitySummary";
    actionLabel = "View Activity";
  }

  return (
    <View style={styles.container}>
      <View style={[styles.colorBackground, { backgroundColor: mood.color }]} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('WellnessDashboard')}>
          <Ionicons name="close" size={28} color={colors.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.resultCard}>
          <Text style={styles.emoji}>{mood.emoji}</Text>
          <Text style={styles.moodLabel}>You are feeling {mood.label}</Text>
          <Text style={styles.loggedText}>Mood logged successfully</Text>
        </View>

        <View style={styles.suggestionBox}>
          <Text style={styles.suggestionTitle}>{suggestionTitle}</Text>
          <Text style={styles.suggestionText}>{suggestionText}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate(actionRoute)}
        >
          <Text style={styles.actionButtonText}>{actionLabel}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.navigate('WellnessDashboard')}
        >
          <Text style={styles.skipButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  colorBackground: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '45%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  header: { 
    paddingTop: 50, 
    paddingHorizontal: 20, 
    alignItems: 'flex-start',
    zIndex: 10
  },
  backButton: { padding: 4, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 20 },
  
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 60, alignItems: 'center' },
  
  resultCard: {
    backgroundColor: colors.white,
    borderRadius: globalStyles.cardRadius,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 40
  },
  emoji: { fontSize: 72, marginBottom: 16 },
  moodLabel: { fontSize: 24, fontWeight: 'bold', color: colors.black, marginBottom: 8 },
  loggedText: { fontSize: 14, color: colors.darkGray },
  
  suggestionBox: {
    padding: 20,
    alignItems: 'center',
  },
  suggestionTitle: { fontSize: 20, fontWeight: 'bold', color: colors.black, marginBottom: 12, textAlign: 'center' },
  suggestionText: { fontSize: 16, color: colors.darkGray, textAlign: 'center', lineHeight: 24 },
  
  footer: { padding: 20, paddingBottom: 40 },
  actionButton: {
    backgroundColor: colors.black,
    paddingVertical: 18,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
    marginBottom: 16
  },
  actionButtonText: { color: colors.white, fontSize: 16, fontWeight: 'bold' },
  
  skipButton: { alignItems: 'center', paddingVertical: 10 },
  skipButtonText: { color: colors.darkGray, fontSize: 16, fontWeight: '600' }
});

export default MoodResult;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const { width } = Dimensions.get('window');

const QuizResult = ({ navigation, route }) => {
  const { score = 3, total = 3 } = route.params || {};
  const isPerfect = score === total;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeEmoji}>{isPerfect ? '🏆' : '👍'}</Text>
        </View>
        
        <Text style={styles.title}>{isPerfect ? 'Perfect Score!' : 'Good Job!'}</Text>
        <Text style={styles.subtitle}>You completed the lesson and earned experience points.</Text>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreText}>{score} / {total}</Text>
          <Text style={styles.scoreLabel}>Correct Answers</Text>
        </View>

        <View style={styles.rewardRow}>
          <View style={styles.rewardItem}>
            <Ionicons name="flame" size={24} color={colors.primary} />
            <Text style={styles.rewardText}>+50 XP</Text>
          </View>
          <View style={styles.rewardItem}>
            <Ionicons name="star" size={24} color={colors.primary} />
            <Text style={styles.rewardText}>Lesson Complete</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.outlineButton} 
          onPress={() => navigation.navigate('ReviewAnswers')}
        >
          <Text style={styles.outlineButtonText}>Review Answers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.navigate('LearningDashboard')}
        >
          <Text style={styles.primaryButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  
  content: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  
  badgeContainer: {
    backgroundColor: '#fffde7',
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  badgeEmoji: { fontSize: 80 },
  
  title: { fontSize: 28, fontWeight: 'bold', color: colors.black, marginBottom: 12 },
  subtitle: { fontSize: 16, color: colors.darkGray, textAlign: 'center', lineHeight: 24, paddingHorizontal: 20, marginBottom: 40 },
  
  scoreCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  scoreText: { fontSize: 48, fontWeight: 'bold', color: colors.black },
  scoreLabel: { fontSize: 16, color: colors.darkGray, marginTop: 4 },
  
  rewardRow: { flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10 },
  rewardItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16 },
  rewardText: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginLeft: 8 },

  footer: { padding: 20, paddingBottom: 40 },
  outlineButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 16,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
    marginBottom: 16,
  },
  outlineButtonText: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
  },
  primaryButtonText: { fontSize: 18, fontWeight: 'bold', color: colors.black }
});

export default QuizResult;

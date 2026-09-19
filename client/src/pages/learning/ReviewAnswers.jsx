import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { getLessonByTitle } from '../../data/learningData';

const ReviewAnswers = ({ navigation, route }) => {
  const { title, userAnswers = [] } = route?.params || {};
  
  const lesson = getLessonByTitle(title);
  const questions = lesson?.quiz || [];

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        
        {questions.map((item, index) => {
          const uAnsIdx = userAnswers[index];
          const isCorrect = uAnsIdx === item.correct;
          const userStr = item.options[uAnsIdx] || "No Answer";
          const correctStr = item.options[item.correct];

          return (
            <View key={index} style={styles.reviewCard}>
              <Text style={styles.questionText}>{index + 1}. {item.question}</Text>
              
              <View style={styles.answerRow}>
                <Ionicons name={isCorrect ? "checkmark-circle" : "close-circle"} size={20} color={isCorrect ? colors.primary : colors.error || 'red'} />
                <Text style={styles.yourAnswerText}>Your Answer: {userStr}</Text>
              </View>

              {!isCorrect && (
                <View style={styles.correctAnswerRow}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  <Text style={styles.correctAnswerText}>Correct Answer: {correctStr}</Text>
                </View>
              )}

              <View style={styles.explanationBox}>
                <Text style={styles.explanationTitle}>Explanation</Text>
                <Text style={styles.explanationText}>{item.explanation}</Text>
              </View>
            </View>
          );
        })}

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
  
  reviewCard: { 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20, 
    borderRadius: globalStyles.cardRadius, 
    marginBottom: 20 
  },
  questionText: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 16, lineHeight: 24 },
  
  answerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  yourAnswerText: { fontSize: 14, color: colors.black, marginLeft: 8, fontWeight: 'bold' },
  
  correctAnswerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, backgroundColor: '#f0fdf4', padding: 8, borderRadius: 8 },
  correctAnswerText: { fontSize: 14, color: '#166534', marginLeft: 8, fontWeight: 'bold' },
  
  explanationBox: { marginTop: 12, backgroundColor: colors.lightGray, padding: 12, borderRadius: 8 },
  explanationTitle: { fontSize: 12, fontWeight: 'bold', color: colors.darkGray, marginBottom: 4, textTransform: 'uppercase' },
  explanationText: { fontSize: 14, color: colors.darkGray, lineHeight: 20 }
});

export default ReviewAnswers;

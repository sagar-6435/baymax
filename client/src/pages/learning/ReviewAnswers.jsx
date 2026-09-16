import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const ReviewAnswers = ({ navigation }) => {
  const mockReviews = [
    {
      question: "Which of the following is considered a macronutrient?",
      yourAnswer: "Protein",
      correctAnswer: "Protein",
      isCorrect: true,
      explanation: "Proteins, carbohydrates, and fats are the three main macronutrients essential for the body."
    },
    {
      question: "How many liters of water should an average adult drink daily?",
      yourAnswer: "2-3 Liters",
      correctAnswer: "2-3 Liters",
      isCorrect: true,
      explanation: "The U.S. National Academies of Sciences, Engineering, and Medicine determined that an adequate daily fluid intake is about 2.7 to 3.7 liters."
    },
    {
      question: "Which organ is primarily responsible for pumping blood?",
      yourAnswer: "Lungs",
      correctAnswer: "Heart",
      isCorrect: false,
      explanation: "The heart pumps blood throughout the body, while the lungs are responsible for oxygenating the blood."
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>REVIEW ANSWERS</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content}>
        
        {mockReviews.map((item, index) => (
          <View key={index} style={styles.reviewCard}>
            <Text style={styles.questionText}>{index + 1}. {item.question}</Text>
            
            <View style={styles.answerRow}>
              <Ionicons name={item.isCorrect ? "checkmark-circle" : "close-circle"} size={20} color={item.isCorrect ? colors.primary : colors.error || 'red'} />
              <Text style={styles.yourAnswerText}>Your Answer: {item.yourAnswer}</Text>
            </View>

            {!item.isCorrect && (
              <View style={styles.correctAnswerRow}>
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                <Text style={styles.correctAnswerText}>Correct Answer: {item.correctAnswer}</Text>
              </View>
            )}

            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>Explanation</Text>
              <Text style={styles.explanationText}>{item.explanation}</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.lightGray },
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

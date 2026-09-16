import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const QuizQuestion = ({ navigation, route }) => {
  const { title = "Quiz", questionIndex = 0 } = route.params || {};
  const [selectedOption, setSelectedOption] = useState(null);

  const mockQuestions = [
    {
      question: "Which of the following is considered a macronutrient?",
      options: ["Vitamin C", "Protein", "Iron", "Calcium"],
      correct: 1
    },
    {
      question: "How many liters of water should an average adult drink daily?",
      options: ["1 Liter", "2-3 Liters", "5 Liters", "0.5 Liters"],
      correct: 1
    },
    {
      question: "Which organ is primarily responsible for pumping blood?",
      options: ["Lungs", "Brain", "Heart", "Liver"],
      correct: 2
    }
  ];

  const currentQ = mockQuestions[questionIndex];

  const handleNext = () => {
    if (selectedOption === null) return;
    
    if (questionIndex < mockQuestions.length - 1) {
      navigation.push('QuizQuestion', { title, questionIndex: questionIndex + 1 });
    } else {
      navigation.navigate('QuizResult', { score: 3, total: 3 });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((questionIndex + 1) / mockQuestions.length) * 100}%` }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.questionCounter}>QUESTION {questionIndex + 1} OF {mockQuestions.length}</Text>
        <Text style={styles.questionText}>{currentQ.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQ.options.map((opt, index) => {
            const isSelected = selectedOption === index;
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.optionButton, isSelected && styles.optionSelected]}
                onPress={() => setSelectedOption(index)}
              >
                <View style={[styles.radioCircle, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.nextButton, selectedOption === null && styles.nextButtonDisabled]} 
          onPress={handleNext}
          disabled={selectedOption === null}
        >
          <Text style={styles.nextButtonText}>
            {questionIndex < mockQuestions.length - 1 ? 'Next' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingTop: 50, 
    paddingHorizontal: 20, 
    backgroundColor: colors.white,
  },
  backButton: { padding: 4, marginRight: 16 },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  
  content: { flex: 1, padding: 24, paddingTop: 40 },
  questionCounter: { fontSize: 12, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  questionText: { fontSize: 24, fontWeight: 'bold', color: colors.black, lineHeight: 32, marginBottom: 40 },
  
  optionsContainer: { flex: 1 },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    borderRadius: globalStyles.cardRadius,
    marginBottom: 16,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#fffde7',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  optionText: { fontSize: 16, color: colors.black, flex: 1 },
  
  footer: { padding: 20, paddingBottom: 40, borderTopWidth: 1, borderTopColor: colors.border },
  nextButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: colors.lightGray,
  },
  nextButtonText: { fontSize: 18, fontWeight: 'bold', color: colors.black }
});

export default QuizQuestion;

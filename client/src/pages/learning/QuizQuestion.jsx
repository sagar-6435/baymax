import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { getLessonByTitle } from '../../data/learningData';

const QuizQuestion = ({ navigation, route }) => {
  const { title, questionIndex = 0, userAnswers = [] } = route?.params || {};
  
  const lesson = getLessonByTitle(title);
  const questions = lesson?.quiz || [];
  
  const currentQ = questions[questionIndex];
  
  const [selectedOption, setSelectedOption] = useState(null);

  if (!currentQ) {
    return (
      <View style={styles.container}>
        <AppHeader showBack={true} onBack={() => navigation.goBack()} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Question not found.</Text>
        </View>
      </View>
    );
  }

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...userAnswers, selectedOption];

    if (questionIndex < questions.length - 1) {
      navigation.push('QuizQuestion', { 
        title, 
        questionIndex: questionIndex + 1,
        userAnswers: newAnswers 
      });
    } else {
      navigation.navigate('QuizResult', { 
        title, 
        userAnswers: newAnswers 
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${((questionIndex + 1) / questions.length) * 100}%` }]} />
      </View>

      <View style={styles.content}>
        <Text style={styles.questionCounter}>QUESTION {questionIndex + 1} OF {questions.length}</Text>
        <Text style={styles.questionText}>{currentQ.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, index) => {
            const isSelected = selectedOption === index;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => setSelectedOption(index)}
              >
                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option}
                </Text>
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
            {questionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
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
    justifyContent: 'space-between', 
    paddingTop: 50, 
    paddingBottom: 16, 
    paddingHorizontal: 20, 
    backgroundColor: colors.white,
  },
  
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.lightGray,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  
  content: { flex: 1, padding: 20 },
  
  questionCounter: { fontSize: 12, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  questionText: { fontSize: 22, fontWeight: 'bold', color: colors.black, lineHeight: 32, marginBottom: 32 },
  
  optionsContainer: { width: '100%' },
  
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#fffde7',
  },
  
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  
  optionText: { fontSize: 16, color: colors.black, flex: 1 },
  optionTextSelected: { fontWeight: 'bold' },
  
  footer: { padding: 20, paddingBottom: 40 },
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

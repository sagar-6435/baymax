import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { generateLlmResponse } from '../../services/llmService';

const QuizQuestion = ({ navigation, route }) => {
  const { title, lessonData, questionIndex = 0, userAnswers = [] } = route?.params || {};
  const questions = lessonData?.quiz || [];
  const currentQ = questions[questionIndex];
  
  const [selectedOption, setSelectedOption] = useState(null);
  
  // 'answering', 'correct', 'generating_retest', 'retesting', 'retest_incorrect', 'incorrect'
  const [evaluationState, setEvaluationState] = useState('answering');
  const [explanationText, setExplanationText] = useState('');
  const [retestQuestion, setRetestQuestion] = useState(null);

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

  const isRetestMode = evaluationState === 'retesting' || evaluationState === 'retest_incorrect';
  const activeQuestion = isRetestMode && retestQuestion ? retestQuestion : currentQ;

  const handleSubmit = async () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === activeQuestion.correct;
    
    if (isCorrect) {
      setEvaluationState('correct');
    } else {
      if (isRetestMode) {
        setEvaluationState('retest_incorrect');
      } else {
        setEvaluationState('generating_retest');
        // Hardcoded retest feedback for prototype
        setTimeout(() => {
          setExplanationText("That wasn't quite right. Let's try again with a slightly different question to reinforce the concept!");
          setRetestQuestion({
            question: `RETEST: ${currentQ.question} (Think carefully!)`,
            options: currentQ.options,
            correct: currentQ.correct
          });
          setEvaluationState('retesting');
          setSelectedOption(null);
        }, 1000);
      }
    }
  };

  const handleNextQuestion = () => {
    // Record original answer, even if they had to do a retest
    const newAnswers = [...userAnswers, isRetestMode ? (userAnswers[questionIndex] || null) : selectedOption];

    if (questionIndex < questions.length - 1) {
      navigation.push('QuizQuestion', { 
        title, 
        lessonData,
        questionIndex: questionIndex + 1,
        userAnswers: newAnswers 
      });
    } else {
      navigation.navigate('QuizResult', { 
        title,
        lessonData,
        userAnswers: newAnswers 
      });
    }
  };

  const renderFeedback = () => {
    if (evaluationState === 'correct') {
      return (
        <View style={[styles.feedbackBanner, { backgroundColor: '#E8F5E9' }]}>
          <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.feedbackTitle, { color: '#2E7D32' }]}>Correct!</Text>
            {activeQuestion.explanation && (
              <Text style={styles.feedbackText}>{activeQuestion.explanation}</Text>
            )}
          </View>
        </View>
      );
    }
    
    if (evaluationState === 'generating_retest') {
      return (
        <View style={[styles.feedbackBanner, { backgroundColor: '#E3F2FD' }]}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={[styles.feedbackText, { marginLeft: 12, fontWeight: 'bold' }]}>Baymax is thinking...</Text>
        </View>
      );
    }

    if (evaluationState === 'retesting' || evaluationState === 'retest_incorrect' || evaluationState === 'incorrect') {
      return (
        <View style={[styles.feedbackBanner, { backgroundColor: '#FFF3E0', flexDirection: 'column', alignItems: 'flex-start' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="warning" size={28} color="#FF9800" />
            <Text style={[styles.feedbackTitle, { color: '#E65100', marginLeft: 12 }]}>Not quite.</Text>
          </View>
          {explanationText ? (
            <View style={styles.baymaxBubble}>
              <Image source={require('../../../assets/baymax_robot.png')} style={{ width: 40, height: 40, marginRight: 12 }} />
              <Text style={styles.feedbackText}>{explanationText}</Text>
            </View>
          ) : currentQ.explanation ? (
            <Text style={styles.feedbackText}>{currentQ.explanation}</Text>
          ) : null}
          {evaluationState === 'retest_incorrect' && (
             <Text style={[styles.feedbackText, { color: '#D32F2F', marginTop: 10, fontWeight: 'bold' }]}>Try again on this retest question!</Text>
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${((questionIndex + 1) / questions.length) * 100}%` }]} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isRetestMode ? (
          <View style={styles.retestBadge}>
            <Ionicons name="refresh" size={16} color={colors.white} />
            <Text style={styles.retestBadgeText}>RETEST</Text>
          </View>
        ) : (
          <Text style={styles.questionCounter}>QUESTION {questionIndex + 1} OF {questions.length}</Text>
        )}
        
        <Text style={styles.questionText}>{activeQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {activeQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            // Disable changing option if correct or generating retest
            const disabled = evaluationState === 'correct' || evaluationState === 'generating_retest';
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionCard, 
                  isSelected && styles.optionCardSelected,
                  disabled && !isSelected && { opacity: 0.5 }
                ]}
                onPress={() => setSelectedOption(index)}
                disabled={disabled}
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
        
        {renderFeedback()}
        
        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.footer}>
        {evaluationState === 'correct' ? (
           <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
             <Text style={styles.nextButtonText}>
               {questionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
             </Text>
           </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[
              styles.nextButton, 
              (selectedOption === null || evaluationState === 'generating_retest') && styles.nextButtonDisabled
            ]} 
            onPress={evaluationState === 'incorrect' ? () => setEvaluationState('answering') : handleSubmit}
            disabled={selectedOption === null || evaluationState === 'generating_retest'}
          >
            <Text style={styles.nextButtonText}>
               {evaluationState === 'incorrect' ? 'Try Again' : 'Submit'}
            </Text>
          </TouchableOpacity>
        )}
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
  retestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  retestBadgeText: { fontSize: 12, fontWeight: 'bold', color: colors.white, letterSpacing: 1, marginLeft: 4 },
  
  questionText: { fontSize: 22, fontWeight: 'bold', color: colors.black, lineHeight: 32, marginBottom: 32 },
  
  optionsContainer: { width: '100%', marginBottom: 20 },
  
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
  
  optionText: { fontSize: 16, color: colors.black, flex: 1, lineHeight: 22 },
  optionTextSelected: { fontWeight: 'bold' },
  
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: globalStyles.cardRadius,
    marginBottom: 20,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    flex: 1,
  },
  baymaxBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  footer: { padding: 20, paddingBottom: 40, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.white },
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

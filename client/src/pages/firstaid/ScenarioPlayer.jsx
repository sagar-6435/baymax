import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const ScenarioPlayer = ({ route, navigation }) => {
  const { scenario } = route.params;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentStep = scenario.steps[currentStepIndex];
  const isScenarioComplete = currentStepIndex >= scenario.steps.length;

  if (isScenarioComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={colors.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.completionContainer}>
          <Text style={styles.emojiGiant}>🏆</Text>
          <Text style={styles.titleText}>Scenario Complete!</Text>
          <Text style={styles.subtitleText}>You successfully navigated the {scenario.title} situation.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryButtonText}>Back to First Aid</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleOptionSelect = (index) => {
    if (showFeedback) return; // Don't allow changing answer while reading feedback
    setSelectedOptionIndex(index);
    setShowFeedback(true);
  };

  const handleNextAction = () => {
    const isCorrect = currentStep.options[selectedOptionIndex].isCorrect;
    if (isCorrect) {
      // Proceed to next step
      setCurrentStepIndex(currentStepIndex + 1);
      setSelectedOptionIndex(null);
      setShowFeedback(false);
    } else {
      // Try again
      setSelectedOptionIndex(null);
      setShowFeedback(false);
    }
  };

  const selectedOption = selectedOptionIndex !== null ? currentStep.options[selectedOptionIndex] : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Practice Scenario</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${(currentStepIndex / scenario.steps.length) * 100}%` }]} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.contextCard}>
          <Text style={styles.contextLabel}>SITUATION</Text>
          <Text style={styles.contextText}>{scenario.description}</Text>
        </View>

        <Text style={styles.promptText}>{currentStep.prompt}</Text>

        <View style={styles.optionsList}>
          {currentStep.options.map((option, index) => {
            const isSelected = selectedOptionIndex === index;
            const optionDisabled = showFeedback && !isSelected;
            
            let cardStyle = [styles.optionCard];
            let textStyle = [styles.optionText];
            
            if (isSelected && showFeedback) {
              if (option.isCorrect) {
                cardStyle.push(styles.optionCardCorrect);
                textStyle.push(styles.optionTextCorrect);
              } else {
                cardStyle.push(styles.optionCardIncorrect);
                textStyle.push(styles.optionTextIncorrect);
              }
            } else if (isSelected) {
              cardStyle.push(styles.optionCardSelected);
            }

            return (
              <TouchableOpacity 
                key={index} 
                style={cardStyle}
                onPress={() => handleOptionSelect(index)}
                disabled={optionDisabled}
                activeOpacity={0.7}
              >
                <Text style={textStyle}>{option.text}</Text>
                {isSelected && showFeedback && option.isCorrect && (
                  <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
                )}
                {isSelected && showFeedback && !option.isCorrect && (
                  <Ionicons name="close-circle" size={24} color="#D32F2F" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {showFeedback && selectedOption && (
          <View style={styles.feedbackContainer}>
            <Image source={require('../../../assets/baymax_robot.png')} style={styles.baymaxImage} />
            <View style={styles.feedbackBubble}>
              <Text style={styles.feedbackBubbleTitle}>
                {selectedOption.isCorrect ? 'Baymax says: Spot on!' : 'Baymax says: Let\'s rethink that.'}
              </Text>
              <Text style={styles.feedbackExplanation}>{selectedOption.explanation}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {showFeedback && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.primaryButton, selectedOption && !selectedOption.isCorrect && styles.secondaryButton]} 
            onPress={handleNextAction}
          >
            <Text style={[styles.primaryButtonText, selectedOption && !selectedOption.isCorrect && styles.secondaryButtonText]}>
              {selectedOption.isCorrect ? 'Next Decision' : 'Try Again'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: { padding: 4, marginLeft: -4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  
  progressBarContainer: { height: 4, backgroundColor: colors.lightGray, width: '100%' },
  progressBarFill: { height: '100%', backgroundColor: colors.primary },
  
  content: { flex: 1, padding: 20 },
  
  contextCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary
  },
  contextLabel: { fontSize: 12, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 8 },
  contextText: { fontSize: 16, color: colors.black, lineHeight: 24 },
  
  promptText: { fontSize: 22, fontWeight: 'bold', color: colors.black, lineHeight: 32, marginBottom: 20 },
  
  optionsList: { marginBottom: 20 },
  optionCard: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionCardSelected: { borderColor: colors.primary, backgroundColor: '#FAFAFA' },
  optionCardCorrect: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' },
  optionCardIncorrect: { borderColor: '#F44336', backgroundColor: '#FFEBEE' },
  
  optionText: { fontSize: 16, color: colors.black, flex: 1 },
  optionTextCorrect: { color: '#2E7D32', fontWeight: 'bold' },
  optionTextIncorrect: { color: '#C62828', fontWeight: 'bold' },
  
  feedbackContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  baymaxImage: { width: 50, height: 60, resizeMode: 'contain', marginRight: 12, alignSelf: 'flex-end' },
  feedbackBubble: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },
  feedbackBubbleTitle: { fontSize: 14, fontWeight: 'bold', color: colors.black, marginBottom: 6 },
  feedbackExplanation: { fontSize: 15, color: '#333', lineHeight: 22 },
  
  footer: { padding: 20, paddingBottom: 30, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.white },
  primaryButton: { backgroundColor: colors.primary, padding: 18, borderRadius: globalStyles.buttonRadius, alignItems: 'center' },
  primaryButtonText: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  secondaryButton: { backgroundColor: colors.lightGray },
  secondaryButtonText: { color: colors.black },
  
  completionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emojiGiant: { fontSize: 80, marginBottom: 20 },
  titleText: { fontSize: 28, fontWeight: 'bold', color: colors.black, marginBottom: 12 },
  subtitleText: { fontSize: 16, color: colors.darkGray, textAlign: 'center', marginBottom: 40, lineHeight: 24 }
});

export default ScenarioPlayer;

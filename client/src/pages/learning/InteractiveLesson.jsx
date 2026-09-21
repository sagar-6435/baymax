import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { generateLlmResponse } from '../../services/llmService';

const { width } = Dimensions.get('window');

const InteractiveLesson = ({ navigation, route }) => {
  const lessonTitle = route?.params?.title || "Interactive Lesson";
  const lessonData = route?.params?.lessonData;
  const [currentCard, setCurrentCard] = useState(0);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const rawContent = lessonData ? lessonData.content : "Content not found.";
  
  // Split content into paragraphs for interactive cards
  const paragraphs = rawContent.split('\n\n').filter(p => p.trim() !== '');
  
  const cards = paragraphs.map((p, index) => ({
    emoji: index === 0 ? '🤓' : index === paragraphs.length - 1 ? '💡' : '🔍',
    title: index === 0 ? 'Introduction' : index === paragraphs.length - 1 ? 'Key Takeaway' : 'Deep Dive',
    content: p
  }));

  if (cards.length === 0) {
    cards.push({ emoji: '🤷', title: 'Empty', content: 'No content available.' });
  }

  const handleNext = async () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setIsGeneratingQuiz(true);
        // Hardcoded quiz for prototype
        setTimeout(() => {
          setIsGeneratingQuiz(false);
          const mockQuiz = [
            {
              question: "What is the primary focus of this lesson?",
              options: ["Understanding the condition", "Ignoring symptoms", "Taking random pills", "Sleeping all day"],
              correct: 0
            },
            {
              question: "Why is it important to follow your care plan?",
              options: ["It isn't", "To manage your health effectively", "To waste time", "Because doctors said so"],
              correct: 1
            },
            {
              question: "When should you contact a healthcare professional?",
              options: ["Never", "Only when feeling fine", "If you experience severe or unusual symptoms", "Every 5 minutes"],
              correct: 2
            },
            {
              question: "What is a good daily habit for this condition?",
              options: ["Skipping meals", "Drinking plenty of water and resting", "Eating only junk food", "Avoiding all physical activity"],
              correct: 1
            },
            {
              question: "How can Baymax help you with this?",
              options: ["By cooking meals", "By providing daily reminders and tips", "By driving you to the doctor", "By doing your homework"],
              correct: 1
            }
          ];
          
          navigation.navigate('Quiz', { 
            title: lessonTitle, 
            lessonData: { ...lessonData, quiz: mockQuiz } 
          });
        }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardEmoji}>{cards[currentCard].emoji}</Text>
          <Text style={styles.cardTitle}>{cards[currentCard].title}</Text>
          <Text style={styles.cardText}>{cards[currentCard].content}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentCard < cards.length - 1 ? 'Continue' : 'Take Quiz'}
          </Text>
        </TouchableOpacity>
      </View>

      {isGeneratingQuiz && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingTitle}>Baymax is thinking...</Text>
            <Text style={styles.loadingSub}>Generating your personalized 5-10 question quiz.</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingTop: 50, 
    paddingBottom: 16, 
    paddingHorizontal: 20, 
    backgroundColor: colors.white,
  },
  backButton: { padding: 4, marginRight: 16 },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  
  cardContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 30,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardEmoji: { fontSize: 64, marginBottom: 20 },
  cardTitle: { fontSize: 24, fontWeight: 'bold', color: colors.black, marginBottom: 16, textAlign: 'center' },
  cardText: { fontSize: 18, color: colors.darkGray, lineHeight: 28, textAlign: 'center' },
  
  footer: { padding: 20, paddingBottom: 40 },
  nextButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
  },
  nextButtonText: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  loadingOverlay: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center', alignItems: 'center',
    zIndex: 100,
  },
  loadingCard: {
    backgroundColor: colors.white,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    maxWidth: '80%',
  },
  loadingTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginTop: 16, marginBottom: 8, textAlign: 'center' },
  loadingSub: { fontSize: 14, color: colors.darkGray, textAlign: 'center', lineHeight: 20 },
});

export default InteractiveLesson;

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
      try {
        const prompt = `Based on the following lesson content, generate a 5-10 question multiple-choice quiz.
Output MUST be valid JSON with NO markdown blocks around it. Do not include \`\`\`json.
The JSON must have this exact structure:
{
  "quiz": [
    {
      "question": "A multiple choice question about the content",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answerIndex": 0
    }
  ]
}
IMPORTANT: The quiz array MUST contain between 5 and 10 questions.
Lesson Content:
${rawContent}`;
        
        const response = await generateLlmResponse(prompt);
        let parsedData;
        try {
          let cleanResponse = response.trim();
          if (cleanResponse.startsWith('```json')) cleanResponse = cleanResponse.substring(7);
          else if (cleanResponse.startsWith('```')) cleanResponse = cleanResponse.substring(3);
          if (cleanResponse.endsWith('```')) cleanResponse = cleanResponse.substring(0, cleanResponse.length - 3);
          
          parsedData = JSON.parse(cleanResponse);
        } catch (parseError) {
          console.error("Failed to parse LLM response:", response);
          Alert.alert("Error", "Baymax got a bit confused generating the quiz. Please try again!");
          setIsGeneratingQuiz(false);
          return;
        }

        setIsGeneratingQuiz(false);
        // Combine the existing lesson data with the new quiz array
        navigation.navigate('Quiz', { 
          title: lessonTitle, 
          lessonData: { ...lessonData, quiz: parsedData.quiz } 
        });
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Could not generate quiz at this time.");
        setIsGeneratingQuiz(false);
      }
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

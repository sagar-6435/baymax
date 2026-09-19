import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { getLessonByTitle } from '../../data/learningData';
import { generateLlmResponse } from '../../services/llmService';

const LessonDetails = ({ navigation, route }) => {
  const lessonTitle = route?.params?.title || "Lesson Overview";
  const lesson = getLessonByTitle(lessonTitle);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <AppHeader showBack={true} onBack={() => navigation.goBack()} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Lesson not found.</Text>
        </View>
      </View>
    );
  }

  const handleStartLesson = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Generate an educational health lesson about "${lessonTitle}". 
Output MUST be valid JSON with NO markdown blocks around it. Do not include \`\`\`json. 
The JSON must have this exact structure:
{
  "content": "A detailed educational text about the topic. Use \\n\\n to separate paragraphs.",
  "quiz": [
    {
      "question": "A multiple choice question about the content",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answerIndex": 0
    }
  ]
}
IMPORTANT: The quiz array MUST contain between 5 and 10 questions.`;
      
      const response = await generateLlmResponse(prompt);
      
      // Try to parse the JSON
      let parsedData;
      try {
        // Strip out markdown code blocks if the LLM still wraps it
        let cleanResponse = response.trim();
        if (cleanResponse.startsWith('\`\`\`json')) {
          cleanResponse = cleanResponse.substring(7);
        } else if (cleanResponse.startsWith('\`\`\`')) {
          cleanResponse = cleanResponse.substring(3);
        }
        if (cleanResponse.endsWith('\`\`\`')) {
          cleanResponse = cleanResponse.substring(0, cleanResponse.length - 3);
        }
        parsedData = JSON.parse(cleanResponse);
      } catch (parseError) {
        console.error("Failed to parse LLM response:", response);
        Alert.alert("Error", "Baymax got a bit confused generating the lesson. Please try again!");
        setIsGenerating(false);
        return;
      }

      setIsGenerating(false);
      navigation.navigate('InteractiveLesson', { 
        title: lessonTitle, 
        lessonData: parsedData 
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not generate lesson at this time.");
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>{lesson.icon}</Text>
          <Text style={styles.heroTitle}>{lesson.title}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color={colors.darkGray} />
              <Text style={styles.statText}>{lesson.time}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame-outline" size={16} color={colors.darkGray} />
              <Text style={styles.statText}>50 XP</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="bar-chart-outline" size={16} color={colors.darkGray} />
              <Text style={styles.statText}>Beginner</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ABOUT THIS LESSON</Text>
        <Text style={styles.descriptionText}>
          {lesson.description}
        </Text>

        <Text style={styles.sectionTitle}>WHAT YOU'LL LEARN</Text>
        
        {lesson.objectives.map((obj, index) => (
          <View key={index} style={styles.objectiveRow}>
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            <Text style={styles.objectiveText}>{obj}</Text>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {isGenerating ? (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingTitle}>Baymax is preparing...</Text>
            <Text style={styles.loadingSub}>Generating your personalized lesson and a 5-10 question quiz.</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={handleStartLesson}
        >
          <Text style={styles.startButtonText}>Start Lesson</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.black} style={{marginLeft: 8}} />
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
    borderBottomWidth: 1, 
    borderBottomColor: colors.border 
  },
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  backButton: { padding: 4 },
  
  content: { padding: 20 },
  
  heroCard: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: globalStyles.cardRadius,
    alignItems: 'center',
    marginBottom: 24,
  },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: colors.black, marginBottom: 16, textAlign: 'center' },
  
  statsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  statItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 },
  statText: { fontSize: 14, color: colors.darkGray, marginLeft: 4 },

  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 12, marginTop: 12 },
  descriptionText: { fontSize: 16, color: colors.black, lineHeight: 24, marginBottom: 20 },
  
  objectiveRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  objectiveText: { fontSize: 16, color: colors.black, flex: 1, marginLeft: 12, lineHeight: 22 },
  
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  startButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: globalStyles.buttonRadius,
  },
  startButtonText: { fontSize: 16, fontWeight: 'bold', color: colors.black },
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

export default LessonDetails;

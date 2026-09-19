import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { getLessonByTitle } from '../../data/learningData';

const { width } = Dimensions.get('window');

const InteractiveLesson = ({ navigation, route }) => {
  const lessonTitle = route?.params?.title || "Interactive Lesson";
  const lessonData = route?.params?.lessonData;
  const [currentCard, setCurrentCard] = useState(0);

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

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      navigation.navigate('Quiz', { title: lessonTitle, lessonData });
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
});

export default InteractiveLesson;

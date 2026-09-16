import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const { width } = Dimensions.get('window');

const InteractiveLesson = ({ navigation, route }) => {
  const lessonTitle = route?.params?.title || "Interactive Lesson";
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      emoji: '🤓',
      title: 'Introduction',
      content: 'Welcome to this lesson! First, we need to understand the fundamental mechanics behind this concept. Every system relies on a set of core principles that interact with each other.'
    },
    {
      emoji: '🔍',
      title: 'Deep Dive',
      content: 'Let’s look closer. The primary components act as the foundation. Without them, the entire structure would collapse. Think of it like the engine of a car.'
    },
    {
      emoji: '💡',
      title: 'Key Takeaway',
      content: 'Always remember: The efficiency of the system depends on the health of its smallest parts. Small changes can lead to massive improvements overall!'
    }
  ];

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      navigation.navigate('Quiz', { title: lessonTitle });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentCard + 1) / cards.length) * 100}%` }]} />
        </View>
      </View>

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
    backgroundColor: colors.lightGray,
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

import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { getLessonByTitle } from '../../data/learningData';

const Quiz = ({ navigation, route }) => {
  const { title = "Health Quiz", lessonData } = route?.params || {};
  const numQuestions = lessonData?.quiz?.length || 0;

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.emojiContainer}>
          <Text style={styles.bigEmoji}>📝</Text>
        </View>
        
        <Text style={styles.title}>Ready for a quick check?</Text>
        <Text style={styles.subtitle}>Test your knowledge on "{title}". There are {numQuestions} questions to complete this lesson.</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
            <Text style={styles.statText}>{numQuestions} Questions</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={24} color={colors.primary} />
            <Text style={styles.statText}>~2 Mins</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => navigation.navigate('QuizQuestion', { title, lessonData, questionIndex: 0, userAnswers: [] })}
        >
          <Text style={styles.startButtonText}>Let's Go!</Text>
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
  backButton: { padding: 4 },
  
  content: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  
  emojiContainer: {
    backgroundColor: colors.white,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  bigEmoji: { fontSize: 60 },
  
  title: { fontSize: 24, fontWeight: 'bold', color: colors.black, textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, color: colors.darkGray, textAlign: 'center', lineHeight: 24, paddingHorizontal: 20, marginBottom: 40 },
  
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  statBox: { alignItems: 'center' },
  statText: { fontSize: 14, fontWeight: 'bold', color: colors.black, marginTop: 8 },
  
  footer: { padding: 20, paddingBottom: 40 },
  startButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
  },
  startButtonText: { fontSize: 18, fontWeight: 'bold', color: colors.black }
});

export default Quiz;

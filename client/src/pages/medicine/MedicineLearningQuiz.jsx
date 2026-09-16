import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const questions = [
  {
    question: "When should you stop taking prescribed antibiotics?",
    options: ["When I feel better", "When the bottle is empty", "When the doctor says so", "After 3 days"],
    correct: 1, // "When the bottle is empty" (finish the course)
  },
  {
    question: "Can you drink alcohol while taking Paracetamol?",
    options: ["Yes, anytime", "In moderation", "No, it causes liver damage", "Only with food"],
    correct: 2,
  },
  {
    question: "What does 'take on an empty stomach' mean?",
    options: ["1 hr before or 2 hrs after meal", "Right before a meal", "With a small snack", "Before breakfast only"],
    correct: 0,
  }
];

const MedicineLearningQuiz = ({ navigation }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (index) => {
    if (selectedOpt !== null) return; // Prevent changing answer
    setSelectedOpt(index);
    if (index === questions[currentQ].correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOpt(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SAFETY QUIZ</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        {showResult ? (
          <View style={styles.resultContainer}>
            <Ionicons name="trophy" size={80} color="#fbc02d" />
            <Text style={styles.resultTitle}>Quiz Complete!</Text>
            <Text style={styles.resultScore}>You scored {score} out of {questions.length}</Text>
            
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>
                {score === questions.length ? "Perfect! You know your medicine safety." : "Good effort! Remember to always check your medication instructions."}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
              <Text style={styles.primaryButtonText}>Return to Hub</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.quizContainer}>
            <View style={styles.progressRow}>
              <Text style={styles.progressText}>Question {currentQ + 1} of {questions.length}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${((currentQ + 1) / questions.length) * 100}%` }]} />
              </View>
            </View>

            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{questions[currentQ].question}</Text>
            </View>

            <View style={styles.optionsContainer}>
              {questions[currentQ].options.map((opt, index) => {
                let bgColor = colors.white;
                let borderColor = colors.border;
                let icon = null;

                if (selectedOpt !== null) {
                  if (index === questions[currentQ].correct) {
                    bgColor = '#e8f5e9';
                    borderColor = '#4caf50';
                    icon = <Ionicons name="checkmark-circle" size={24} color="#4caf50" />;
                  } else if (index === selectedOpt) {
                    bgColor = '#ffebee';
                    borderColor = '#f44336';
                    icon = <Ionicons name="close-circle" size={24} color="#f44336" />;
                  }
                }

                return (
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.optionBtn, { backgroundColor: bgColor, borderColor }]}
                    onPress={() => handleSelect(index)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.optionText}>{opt}</Text>
                    {icon}
                  </TouchableOpacity>
                );
              })}
            </View>

            {selectedOpt !== null && (
              <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
                <Text style={styles.primaryButtonText}>{currentQ < questions.length - 1 ? "Next Question" : "View Results"}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.lightGray },
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
  
  content: { flex: 1, padding: 20 },
  
  quizContainer: { flex: 1 },
  progressRow: { marginBottom: 20 },
  progressText: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, marginBottom: 8 },
  progressBar: { height: 8, backgroundColor: colors.white, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.primary },
  
  questionCard: {
    backgroundColor: colors.white,
    padding: 30,
    borderRadius: globalStyles.cardRadius,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  questionText: { fontSize: 20, fontWeight: 'bold', color: colors.black, textAlign: 'center', lineHeight: 28 },
  
  optionsContainer: { flex: 1 },
  optionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 20,
    borderRadius: globalStyles.cardRadius,
    marginBottom: 16
  },
  optionText: { fontSize: 16, fontWeight: '600', color: colors.black, flex: 1 },
  
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20
  },
  primaryButtonText: { color: colors.black, fontSize: 16, fontWeight: 'bold' },
  
  resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  resultTitle: { fontSize: 28, fontWeight: 'bold', color: colors.black, marginTop: 20, marginBottom: 8 },
  resultScore: { fontSize: 18, color: colors.darkGray, marginBottom: 30 },
  messageBox: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: globalStyles.cardRadius,
    marginBottom: 40,
    width: '100%',
  },
  messageText: { fontSize: 16, color: colors.black, textAlign: 'center', lineHeight: 24 }
});

export default MedicineLearningQuiz;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const MoodCheck = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { id: 1, emoji: '😖', label: 'Terrible', color: '#ffcdd2' },
    { id: 2, emoji: '😕', label: 'Bad', color: '#ffe0b2' },
    { id: 3, emoji: '😐', label: 'Okay', color: '#fff9c4' },
    { id: 4, emoji: '🙂', label: 'Good', color: '#c8e6c9' },
    { id: 5, emoji: '🤩', label: 'Excellent', color: '#b3e5fc' },
  ];

  const handleContinue = () => {
    if (selectedMood) {
      navigation.navigate('MoodResult', { mood: selectedMood });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>How are you feeling right now?</Text>
        <Text style={styles.subtitle}>Select the emoji that best matches your current state.</Text>

        <View style={styles.moodList}>
          {moods.map((mood) => (
            <TouchableOpacity 
              key={mood.id} 
              style={[
                styles.moodItem, 
                selectedMood?.id === mood.id && { backgroundColor: mood.color, borderColor: mood.color }
              ]}
              onPress={() => setSelectedMood(mood)}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <Text style={[styles.moodLabel, selectedMood?.id === mood.id && { fontWeight: 'bold' }]}>
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.continueButton, !selectedMood && styles.continueButtonDisabled]} 
          disabled={!selectedMood}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { 
    paddingTop: 50, 
    paddingHorizontal: 20, 
    paddingBottom: 10,
    alignItems: 'flex-start'
  },
  backButton: { padding: 4 },
  
  content: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.black, textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, color: colors.darkGray, textAlign: 'center', marginBottom: 40 },
  
  moodList: { width: '100%' },
  moodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: globalStyles.cardRadius,
    borderWidth: 2,
    borderColor: colors.lightGray,
    marginBottom: 12,
    backgroundColor: colors.white
  },
  emoji: { fontSize: 32, marginRight: 20 },
  moodLabel: { fontSize: 18, color: colors.black },
  
  footer: { padding: 20, paddingBottom: 40 },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: colors.lightGray,
  },
  continueButtonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default MoodCheck;

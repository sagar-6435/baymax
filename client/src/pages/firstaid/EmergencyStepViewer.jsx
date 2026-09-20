import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');

const EmergencyStepViewer = ({ route, navigation }) => {
  const { emergency } = route.params;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = emergency.steps;
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    // Speak automatically when step changes
    speakCurrentStep();
    
    // Cleanup on unmount or when step changes
    return () => {
      Speech.stop();
    };
  }, [currentStepIndex]);

  const speakCurrentStep = () => {
    Speech.stop(); // Stop any ongoing speech
    setIsPlaying(true);
    Speech.speak(currentStep.audio, {
      rate: 0.9, // Slightly slower for clarity in emergencies
      onDone: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReplay = () => {
    speakCurrentStep();
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: emergency.color }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => { Speech.stop(); navigation.goBack(); }}>
          <Ionicons name="close" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{emergency.title}</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.progressContainer}>
        {steps.map((_, idx) => (
          <View 
            key={idx} 
            style={[
              styles.progressDot, 
              { backgroundColor: idx === currentStepIndex ? '#FFFFFF' : 'rgba(255,255,255,0.3)' }
            ]} 
          />
        ))}
      </View>

      <View style={styles.content}>
        <View style={styles.stepNumberBadge}>
          <Text style={[styles.stepNumberText, { color: emergency.color }]}>Step {currentStep.id}</Text>
        </View>
        
        <Text style={styles.stepTitle}>{currentStep.title}</Text>
        <Text style={styles.stepDesc}>{currentStep.desc}</Text>
        
        <TouchableOpacity 
          style={styles.speakerButton} 
          onPress={handleReplay}
        >
          <Ionicons name={isPlaying ? "volume-high" : "volume-medium"} size={32} color="#FFFFFF" />
          <Text style={styles.speakerText}>{isPlaying ? "Speaking..." : "Tap to Replay"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.navButton, currentStepIndex === 0 && { opacity: 0 }]} 
          onPress={handlePrev}
          disabled={currentStepIndex === 0}
        >
          <Ionicons name="arrow-back" size={36} color="#FFFFFF" />
        </TouchableOpacity>
        
        {isLastStep ? (
          <TouchableOpacity style={styles.finishButton} onPress={() => { Speech.stop(); navigation.goBack(); }}>
            <Text style={styles.finishButtonText}>FINISH</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={[styles.nextButtonText, { color: emergency.color }]}>NEXT STEP</Text>
            <Ionicons name="arrow-forward" size={32} color={emergency.color} style={{marginLeft: 8}} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  progressDot: {
    height: 6,
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  stepNumberText: {
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  stepTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 42,
  },
  stepDesc: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 34,
    fontWeight: '500',
    marginBottom: 40,
  },
  speakerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  speakerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  navButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonText: {
    fontSize: 22,
    fontWeight: '900',
  },
  finishButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 36,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  }
});

export default EmergencyStepViewer;

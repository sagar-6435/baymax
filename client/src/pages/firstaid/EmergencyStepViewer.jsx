import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Image, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { colors, globalStyles } from '../../theme';

const { width } = Dimensions.get('window');

const emergencyImages = {
  cpr: require('../../../assets/firstaid/cpr.jpg'),
  burns: require('../../../assets/firstaid/burns.jpg'),
  bleeding: require('../../../assets/firstaid/bleeding.jpg'),
  fracture: require('../../../assets/firstaid/fracture.jpg'),
};

const EmergencyStepViewer = ({ route, navigation }) => {
  const { emergency } = route.params;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = emergency.steps;
  const currentStep = steps[currentStepIndex];
  const illustration = emergencyImages[emergency.id];

  useEffect(() => {
    // Speak automatically when step changes - preserving exact voice behavior
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
  const themeColor = emergency.color || '#FF3B30';

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => { Speech.stop(); navigation.goBack(); }}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Ionicons name="close" size={26} color={colors.black} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>{emergency.title}</Text>
        </View>

        <View style={styles.sosTag}>
          <Text style={styles.sosTagText}>SOS</Text>
        </View>
      </View>

      {/* Segmented Step Progress Bar */}
      <View style={styles.progressContainer}>
        {steps.map((_, idx) => (
          <View 
            key={idx} 
            style={[
              styles.progressBarSegment, 
              { 
                backgroundColor: idx <= currentStepIndex ? themeColor : '#E5E7EB',
                flex: 1
              }
            ]} 
          />
        ))}
      </View>

      <ScrollView 
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Relevant First Aid Illustration Image */}
        {illustration ? (
          <View style={styles.illustrationWrapper}>
            <Image 
              source={illustration} 
              style={styles.illustrationImage} 
              resizeMode="contain" 
            />
          </View>
        ) : (
          <View style={[styles.fallbackIconContainer, { backgroundColor: emergency.bgColor || '#FFF9E6' }]}>
            <Ionicons name={emergency.icon || 'medkit'} size={54} color={themeColor} />
          </View>
        )}

        {/* Step Badge */}
        <View style={styles.stepBadgeRow}>
          <View style={[styles.stepNumberBadge, { backgroundColor: themeColor }]}>
            <Text style={styles.stepNumberText}>STEP {currentStepIndex + 1} OF {steps.length}</Text>
          </View>
          <View style={styles.offlineIndicator}>
            <Ionicons name="cloud-offline" size={14} color="#16A34A" />
            <Text style={styles.offlineIndicatorText}>Offline</Text>
          </View>
        </View>
        
        {/* Step Instruction Card */}
        <View style={styles.instructionCard}>
          <Text style={styles.stepTitle}>{currentStep.title}</Text>
          <Text style={styles.stepDesc}>{currentStep.desc}</Text>
        </View>

        {/* Spoken Audio Voice Control Bar */}
        <TouchableOpacity 
          style={[
            styles.voiceBar, 
            isPlaying ? styles.voiceBarActive : styles.voiceBarInactive
          ]} 
          onPress={handleReplay}
          activeOpacity={0.85}
        >
          <View style={[styles.speakerIconCircle, { backgroundColor: isPlaying ? '#FF3B30' : colors.primary }]}>
            <Ionicons 
              name={isPlaying ? "volume-high" : "volume-medium"} 
              size={22} 
              color={colors.black} 
            />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.voiceBarTitle}>
              {isPlaying ? "BayMax is speaking..." : "Tap to Replay Voice Guidance"}
            </Text>
            <Text style={styles.voiceBarSub}>Spoken step-by-step instructions</Text>
          </View>
          <Ionicons 
            name={isPlaying ? "pause-circle" : "play-circle"} 
            size={26} 
            color={isPlaying ? '#FF3B30' : colors.darkGray} 
          />
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Navigation Controls */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.prevButton, 
            currentStepIndex === 0 && { opacity: 0.3 }
          ]} 
          onPress={handlePrev}
          disabled={currentStepIndex === 0}
          accessibilityRole="button"
          accessibilityLabel="Previous Step"
        >
          <Ionicons name="arrow-back" size={22} color={colors.black} style={{ marginRight: 6 }} />
          <Text style={styles.prevButtonText}>Prev</Text>
        </TouchableOpacity>
        
        {isLastStep ? (
          <TouchableOpacity 
            style={[styles.nextButton, { backgroundColor: '#16A34A' }]} 
            onPress={() => { Speech.stop(); navigation.goBack(); }}
            activeOpacity={0.88}
          >
            <Ionicons name="checkmark-circle" size={24} color={colors.white} style={{ marginRight: 8 }} />
            <Text style={styles.nextButtonText}>COMPLETE GUIDE</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.nextButton, { backgroundColor: themeColor }]} 
            onPress={handleNext}
            activeOpacity={0.88}
          >
            <Text style={styles.nextButtonText}>NEXT STEP</Text>
            <Ionicons name="arrow-forward" size={22} color={colors.white} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  closeButton: {
    padding: 8,
    borderRadius: 14,
    backgroundColor: colors.lightGray,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.black,
    letterSpacing: 0.3,
  },
  sosTag: {
    backgroundColor: '#FFF1F0',
    borderWidth: 1,
    borderColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sosTagText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FF3B30',
    letterSpacing: 0.5,
  },

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 6,
  },
  progressBarSegment: {
    height: 5,
    borderRadius: 3,
  },

  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
  },

  illustrationWrapper: {
    width: '100%',
    height: 200,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#000000',
    marginBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  fallbackIconContainer: {
    width: '100%',
    height: 140,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  stepBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stepNumberBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: 0.8,
  },
  offlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  offlineIndicatorText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#065F46',
    marginLeft: 4,
  },

  instructionCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.black,
    marginBottom: 10,
    lineHeight: 28,
  },
  stepDesc: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    fontWeight: '500',
  },

  voiceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
  },
  voiceBarInactive: {
    backgroundColor: '#FFF9E6',
    borderColor: colors.primary,
  },
  voiceBarActive: {
    backgroundColor: '#FFF1F0',
    borderColor: '#FF3B30',
  },
  speakerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceBarTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.black,
  },
  voiceBarSub: {
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 2,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 18,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
  },
  prevButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  nextButton: {
    flex: 1,
    marginLeft: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  }
});

export default EmergencyStepViewer;

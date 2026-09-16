import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const BreathingExercise = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [instruction, setInstruction] = useState('Ready');
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;
  
  // We'll use a simple 4-7-8 pattern: Inhale (4s), Hold (7s), Exhale (8s)
  // For UI demonstration, we'll use a slightly faster 4-4-4 pattern
  const inhaleTime = 4000;
  const holdTime = 2000;
  const exhaleTime = 4000;

  useEffect(() => {
    let timeoutId;
    if (isActive) {
      runBreathingCycle();
    } else {
      scaleAnim.stopAnimation();
      opacityAnim.stopAnimation();
      scaleAnim.setValue(1);
      opacityAnim.setValue(0.7);
      setInstruction('Ready');
    }
    
    return () => clearTimeout(timeoutId);
  }, [isActive]);

  const runBreathingCycle = () => {
    if (!isActive) return;
    
    // INHALE
    setInstruction('Breathe In');
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 2,
        duration: inhaleTime,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: inhaleTime,
        useNativeDriver: true,
      })
    ]).start(() => {
      if (!isActive) return;
      
      // HOLD
      setInstruction('Hold');
      setTimeout(() => {
        if (!isActive) return;
        
        // EXHALE
        setInstruction('Breathe Out');
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: exhaleTime,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.7,
            duration: exhaleTime,
            useNativeDriver: true,
          })
        ]).start(() => {
          if (!isActive) return;
          runBreathingCycle(); // loop
        });
      }, holdTime);
    });
  };

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => {
          setIsActive(false);
          navigation.goBack();
        }}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BREATHING</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        
        <View style={styles.animationContainer}>
          <Animated.View style={[
            styles.breathingCircle,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim
            }
          ]} />
          
          <View style={styles.centerDot}>
            <Text style={styles.instructionText}>{instruction}</Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={[styles.mainButton, isActive ? styles.stopButton : styles.startButton]}
            onPress={toggleExercise}
          >
            <Text style={styles.mainButtonText}>
              {isActive ? 'Stop Exercise' : 'Start Exercise'}
            </Text>
          </TouchableOpacity>
        </View>
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
  
  content: { flex: 1, justifyContent: 'space-between', paddingBottom: 40 },
  
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#80deea',
    position: 'absolute',
  },
  centerDot: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center'
  },
  
  controlsContainer: {
    paddingHorizontal: 20,
  },
  mainButton: {
    paddingVertical: 18,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: colors.primary,
  },
  stopButton: {
    backgroundColor: '#ffcdd2',
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  }
});

export default BreathingExercise;

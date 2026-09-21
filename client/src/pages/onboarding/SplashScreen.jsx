import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { colors } from '../../theme';

const HEALTH_FACTS = [
  "Laughter is the best medicine, unless you have diarrhea. 😬",
  "An apple a day keeps anyone away, if thrown hard enough. 🍏",
  "I’m on a seafood diet. I see food and I eat it. 🦞",
  "Running late totally counts as my daily cardio. 🏃‍♂️",
  "My favorite exercise is a cross between a lunge and a crunch... lunch! 🍕",
  "Does refusing to go to the gym count as resistance training? 🏋️‍♂️",
  "I run... out of patience, mostly. 🐢"
];

const SplashScreen = ({ navigation, isGlobal }) => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    // Pick a random fact
    const randomFact = HEALTH_FACTS[Math.floor(Math.random() * HEALTH_FACTS.length)];
    setFact(randomFact);

    // If used within navigation stack, navigate after 2 seconds
    if (!isGlobal && navigation) {
      const timer = setTimeout(() => {
        navigation.replace('Welcome');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [navigation, isGlobal]);

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image 
          source={require('../../../assets/baymax_robot.png')} 
          style={styles.robotImage}
        />
        <Text style={styles.brandTitle}>BayMax</Text>
      </View>
      
      <View style={styles.factContainer}>
        <Text style={styles.didYouKnow}>Did you know?</Text>
        <Text style={styles.factText}>{fact}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "space-between", 
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 80,
    paddingBottom: 50,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  robotImage: {
    width: 220,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  brandTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.black,
    letterSpacing: 2,
  },
  factContainer: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  didYouKnow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  factText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
    lineHeight: 24,
  }
});

export default SplashScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../../theme';

const HEALTH_FACTS = [
  "Laughing for 15 minutes burns about 40 calories! 😂",
  "Your nose can remember 50,000 different scents. 👃",
  "Apples are more effective at waking you up than coffee! 🍏",
  "You use 200 muscles to take a single step. 🚶",
  "Your body has enough iron in it to make a 3-inch nail. 🔨",
  "A sneeze can travel up to 100 miles per hour! 🤧",
  "Your heart beats about 100,000 times a day. ❤️"
];

const SplashScreen = ({ navigation }) => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    // Pick a random fact
    const randomFact = HEALTH_FACTS[Math.floor(Math.random() * HEALTH_FACTS.length)];
    setFact(randomFact);

    // Show splash a bit longer to read the fact (3 seconds)
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.brandTitle}>BayMax</Text>
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
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 20
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 60,
  },
  factContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
    lineHeight: 26,
  }
});

export default SplashScreen;

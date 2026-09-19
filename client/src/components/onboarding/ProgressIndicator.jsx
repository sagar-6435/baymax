import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

const ProgressIndicator = ({ currentStep, totalSteps, stepName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>Step {currentStep} of {totalSteps}</Text>
      <Text style={styles.stepName}>{stepName}</Text>
      
      <View style={styles.barContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.barSegment,
              { backgroundColor: index < currentStep ? colors.primary : colors.border }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },
  stepText: {
    fontSize: 12,
    color: colors.darkGray,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  stepName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 16,
  },
  barContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  barSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  }
});

export default ProgressIndicator;

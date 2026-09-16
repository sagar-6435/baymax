import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, globalStyles } from '../theme';

const PrimaryButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 8,
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrimaryButton;

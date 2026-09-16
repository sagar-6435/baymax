import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, globalStyles } from '../theme';

const SecondaryButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: globalStyles.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.black,
  },
  text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SecondaryButton;

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const MultiSelectCard = ({ label, selected, onPress, style }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        selected && styles.cardSelected,
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected && <Ionicons name="checkmark" size={16} color={colors.white} />}
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
    marginBottom: 12,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.lightPrimary || '#F0F7FF', // fallback if lightPrimary not in theme
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 16,
    color: colors.black,
  },
  labelSelected: {
    fontWeight: '600',
  }
});

export default MultiSelectCard;

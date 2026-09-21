import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';

const FirstAidCompletionSummary = ({ navigation, route }) => {
  const guideTitle = route?.params?.title || 'First Aid Guide';

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.navigate('FirstAidHome')} title="Summary" />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.badgeCircle}>
          <Ionicons name="checkmark-done-circle" size={80} color="#16A34A" />
        </View>

        <Text style={styles.title}>Tutorial Completed!</Text>
        <Text style={styles.subtitle}>
          You have reviewed all instructions for {guideTitle}. Reviewing emergency protocols regularly helps you stay prepared.
        </Text>

        <View style={styles.tipCard}>
          <Ionicons name="information-circle" size={24} color={colors.primary} style={{ marginRight: 12 }} />
          <Text style={styles.tipText}>
            In a real life-threatening emergency, always dial 911 immediately before or while administering first aid.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton 
            title="Return to First Aid" 
            onPress={() => navigation.navigate('FirstAidHome')} 
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { flex: 1 },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80%',
  },
  badgeCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#BBF7D0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.black,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  tipCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default FirstAidCompletionSummary;

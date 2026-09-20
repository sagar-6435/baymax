import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { generateLlmResponse } from '../../services/llmService';

const ExplainMedicalText = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState(null);

  const modes = [
    { id: 'simple', label: 'Simple Explanation', icon: 'chatbubble-outline', prompt: "Explain the following medical text in very simple, everyday language." },
    { id: 'step', label: 'Step-by-Step', icon: 'list-outline', prompt: "Break down the following medical text into a clear, step-by-step numbered list." },
    { id: 'child', label: 'For a Child', icon: 'happy-outline', prompt: "Explain the following medical text as if you are talking to a 10-year-old child." },
    { id: 'translate', label: 'Translate (Spanish)', icon: 'language-outline', prompt: "Translate the following medical text into simple, clear Spanish." },
  ];

  const handleExplain = async (mode) => {
    if (!inputText.trim()) return;
    
    Keyboard.dismiss();
    setActiveMode(mode.id);
    setIsLoading(true);
    setResultText('');

    const systemPrompt = "You are Baymax, a personal healthcare companion. You help users understand complex medical information.";
    const fullPrompt = `${mode.prompt}\n\nMedical Text:\n"${inputText}"`;

    try {
      const response = await generateLlmResponse(fullPrompt, systemPrompt);
      setResultText(response);
    } catch (error) {
      setResultText("I'm sorry, I couldn't process that request right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppHeader showBack={true} onBack={() => navigation.goBack()} title="Explain Simply" />
      
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Paste any confusing medical text, test results, or doctor's notes below.</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="E.g., 'The patient exhibits acute rhinitis and bilateral conjunctivitis...'"
            placeholderTextColor={colors.darkGray}
            value={inputText}
            onChangeText={setInputText}
            textAlignVertical="top"
          />
        </View>

        <Text style={styles.modesTitle}>How should I explain it?</Text>
        <View style={styles.modesGrid}>
          {modes.map(mode => (
            <TouchableOpacity 
              key={mode.id} 
              style={[styles.modeButton, activeMode === mode.id && styles.modeButtonActive]}
              onPress={() => handleExplain(mode)}
              disabled={isLoading || !inputText.trim()}
            >
              <Ionicons 
                name={mode.icon} 
                size={20} 
                color={activeMode === mode.id ? colors.white : colors.black} 
                style={styles.modeIcon} 
              />
              <Text style={[styles.modeText, activeMode === mode.id && styles.modeTextActive]}>
                {mode.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Baymax is analyzing...</Text>
          </View>
        )}

        {resultText ? (
          <View style={styles.resultContainer}>
            <View style={styles.resultHeader}>
              <Image source={require('../../../assets/baymax_robot.png')} style={{ width: 24, height: 24, marginRight: 8 }} />
              <Text style={styles.resultTitle}>Baymax's Explanation</Text>
            </View>
            <Text style={styles.resultText}>{resultText}</Text>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: 20 },
  headerText: { fontSize: 16, color: colors.darkGray, marginBottom: 16, lineHeight: 22 },
  
  inputContainer: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 24,
    minHeight: 150,
  },
  textInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: colors.black,
    lineHeight: 24,
  },
  
  modesTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 12 },
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  modeButton: {
    width: '48%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modeIcon: { marginRight: 8 },
  modeText: { fontSize: 14, fontWeight: '500', color: colors.black },
  modeTextActive: { color: colors.white },
  
  loadingContainer: {
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 12,
    color: colors.darkGray,
    fontSize: 14,
  },
  
  resultContainer: {
    backgroundColor: '#F0F4F8',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  }
});

export default ExplainMedicalText;

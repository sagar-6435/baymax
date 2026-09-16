import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { generateLlmResponseStream } from '../../services/llmService';

const AiHealthAssistant = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', role: 'bot', text: 'Hello! I am Baymax, your personal healthcare companion. How can I assist you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  const suggestions = [
    "I have a headache",
    "What should I do for a burn?",
    "How can I sleep better?",
    "Healthy diet tips"
  ];

  const handleSend = async (textOverride = null) => {
    const userMsg = textOverride || inputText.trim();
    if (!userMsg) return;

    setInputText('');
    
    // Add user message
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user', text: userMsg }];
    setMessages(newMessages);
    
    // Immediately add an empty bot message that we will stream into
    const botMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: botMsgId, role: 'bot', text: '' }]);
    setIsLoading(true);

    // System prompt tailored for Baymax Health Assistant
    const systemPrompt = "You are Baymax, a personal healthcare companion. You are polite, medically informed (but always advise consulting a real doctor for serious issues), and highly empathetic. Keep responses concise and structured.";
    
    // Create a context window from previous messages (simple string concatenation for the prompt)
    const contextPrompt = newMessages.map(m => `${m.role === 'user' ? 'Patient' : 'Baymax'}: ${m.text}`).join('\n') + '\nBaymax:';

    try {
      await generateLlmResponseStream(contextPrompt, systemPrompt, (partialText) => {
        setIsLoading(false); // Hide the generic loading spinner once text starts arriving
        setMessages((prev) => 
          prev.map(m => m.id === botMsgId ? { ...m, text: partialText } : m)
        );
      });
    } catch (error) {
      setIsLoading(false);
      setMessages((prev) => 
        prev.map(m => m.id === botMsgId ? { ...m, text: "I'm having trouble connecting to my local AI brain right now." } : m)
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 15}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI HEALTH</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.chatArea}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View key={msg.id} style={msg.role === 'bot' ? styles.botMessageWrapper : styles.userMessageWrapper}>
            {msg.role === 'bot' && (
              <View style={styles.botTitleContainer}>
                <Text style={styles.botTitle}>BAYMAX</Text>
                {msg.text === '' && <Text style={styles.typingIndicator}>● ● ●</Text>}
              </View>
            )}
            <View style={msg.role === 'bot' ? styles.botMessageCard : styles.userMessage}>
              {msg.role === 'bot' && msg.text === '' ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text style={styles.messageText}>{msg.text}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Suggestions Area */}
      <View style={styles.suggestionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
          {suggestions.map((item, index) => (
            <TouchableOpacity key={index} style={styles.suggestionChip} onPress={() => handleSend(item)}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputArea}>
        <TouchableOpacity style={styles.micButton} onPress={() => navigation.navigate('VoiceInputModal')}>
          <Ionicons name="mic" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <TextInput 
            style={styles.textInput}
            placeholder="Ask a health question..."
            placeholderTextColor={colors.darkGray}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => handleSend()}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
            <Ionicons name="send" size={20} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    borderBottomWidth: 1, 
    borderBottomColor: colors.border 
  },
  backButton: { padding: 4 },
  moreButton: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  
  chatArea: { flex: 1, padding: 16 },
  
  botMessageWrapper: { marginBottom: 12 },
  userMessageWrapper: { marginBottom: 12 },
  
  botTitleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  botTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, marginRight: 8 },
  typingIndicator: { fontSize: 16, color: colors.darkGray, letterSpacing: 2 },
  
  botMessageCard: { 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16, 
    borderRadius: globalStyles.cardRadius, 
    maxWidth: '85%', 
    alignSelf: 'flex-start' 
  },
  userMessage: { 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.black,
    padding: 16, 
    borderRadius: globalStyles.cardRadius, 
    maxWidth: '85%', 
    alignSelf: 'flex-end' 
  },
  messageText: { fontSize: 16, color: colors.black, lineHeight: 24 },
  
  suggestionsContainer: {
    backgroundColor: colors.white,
    paddingVertical: 10,
  },
  suggestionsScroll: {
    paddingHorizontal: 16,
    gap: 10,
  },
  suggestionChip: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '500'
  },

  inputArea: { 
    flexDirection: 'row', 
    padding: 16, 
    backgroundColor: colors.white, 
    borderTopWidth: 1, 
    borderTopColor: colors.border, 
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 16
  },
  micButton: { marginRight: 16 },
  textInputContainer: { 
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    height: 50, 
    backgroundColor: colors.lightGray, 
    borderRadius: 25, 
    paddingHorizontal: 20 
  },
  textInput: { flex: 1, fontSize: 16, color: colors.black },
  sendButton: { marginLeft: 10 }
});

export default AiHealthAssistant;

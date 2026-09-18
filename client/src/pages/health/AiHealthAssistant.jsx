import AppHeader from '../../components/AppHeader';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { generateLlmResponseStream } from '../../services/llmService';

const AiHealthAssistant = ({ route, navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', role: 'bot', text: 'Hello! I am Baymax, your personal healthcare companion. How can I assist you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    if (route.params?.voiceText) {
      setInputText(route.params.voiceText);
      // Clear the param so it doesn't stay there forever
      navigation.setParams({ voiceText: undefined });
    }
  }, [route.params?.voiceText]);

  const suggestions = [
    "I have a headache",
    "What should I do for a burn?",
    "How can I sleep better?",
    "Healthy diet tips"
  ];

  const handleSend = async (textOverride = null) => {
    if (isLoading) return; // Prevent double submission
    
    const actualOverride = typeof textOverride === 'string' ? textOverride : null;
    const userMsg = actualOverride || inputText.trim();
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
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />
      
      <ScrollView 
        style={styles.chatArea}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        contentContainerStyle={{ paddingBottom: 60 }} // Extra padding for the floating suggestions
      >
        {messages.map((msg) => (
          <View key={msg.id} style={msg.role === 'bot' ? styles.botMessageWrapper : styles.userMessageWrapper}>
            {msg.role === 'bot' && (
              <View style={styles.botTitleContainer}>
                <Text style={styles.botTitle}>BAYMAX</Text>
              </View>
            )}
            <View style={msg.role === 'bot' ? styles.botMessageCard : styles.userMessage}>
              {msg.role === 'bot' && msg.text === '' ? (
                <View style={styles.typingIndicatorContainer}>
                  <Text style={styles.typingIndicator}>● ● ●</Text>
                </View>
              ) : (
                <Text style={styles.messageText}>{msg.text}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomAreaContainer}>
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
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
    zIndex: 10
  },
  backButton: { padding: 4 },
  moreButton: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  
  chatArea: { flex: 1, padding: 16 },
  
  botMessageWrapper: { marginBottom: 16 },
  userMessageWrapper: { marginBottom: 16 },
  
  botTitleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, marginLeft: 4 },
  botTitle: { fontSize: 12, fontWeight: 'bold', color: colors.darkGray },
  
  botMessageCard: { 
    backgroundColor: '#f3f4f6', 
    padding: 16, 
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    maxWidth: '85%', 
    alignSelf: 'flex-start' 
  },
  userMessage: { 
    backgroundColor: colors.primary, 
    padding: 16, 
    borderRadius: 20, 
    borderBottomRightRadius: 4,
    maxWidth: '85%', 
    alignSelf: 'flex-end' 
  },
  messageText: { fontSize: 16, color: colors.black, lineHeight: 24 },
  
  typingIndicatorContainer: { paddingVertical: 4, paddingHorizontal: 8 },
  typingIndicator: { fontSize: 18, color: colors.darkGray, letterSpacing: 2 },
  
  bottomAreaContainer: {
    backgroundColor: colors.white,
  },
  suggestionsContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  suggestionsScroll: {
    paddingHorizontal: 16,
    gap: 10,
  },
  suggestionChip: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  micButton: { marginRight: 12, backgroundColor: colors.white, padding: 12, borderRadius: 24 },
  textInputContainer: { 
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    height: 50, 
    backgroundColor: colors.white, 
    borderRadius: 25, 
    paddingHorizontal: 20 
  },
  textInput: { flex: 1, fontSize: 16, color: colors.black },
  sendButton: { marginLeft: 10, padding: 4 }
});

export default AiHealthAssistant;

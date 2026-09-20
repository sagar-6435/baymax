import AppHeader from '../../components/AppHeader';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { generateLlmResponseStream } from '../../services/llmService';

const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot, delay) => {
      Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(dot, { toValue: -6, duration: 300, useNativeDriver: true }),
            Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.delay(400)
          ])
        )
      ]).start();
    };

    animate(dot1, 0);
    animate(dot2, 150);
    animate(dot3, 300);
  }, []);

  return (
    <View style={styles.typingIndicatorContainer}>
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
    </View>
  );
};

const SymptomExplorationMode = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', role: 'bot', text: 'I understand you are not feeling well and aren\'t sure what\'s wrong. Please describe what you are experiencing in your own words, and I will ask a few simple questions to help summarize your symptoms.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [isSummarized, setIsSummarized] = useState(false);
  
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (isLoading || isSummarized) return;
    
    const userMsg = inputText.trim();
    if (!userMsg) return;

    setInputText('');
    
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user', text: userMsg }];
    setMessages(newMessages);
    
    const newTurnCount = turnCount + 1;
    setTurnCount(newTurnCount);
    
    const botMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: botMsgId, role: 'bot', text: '' }]);
    setIsLoading(true);

    const isFinalSummaryTurn = newTurnCount >= 3;

    let systemPrompt = "You are Baymax. The user doesn't know what's wrong with their health. Ask EXACTLY ONE simple follow-up question to understand their symptoms better. Do NOT give a diagnosis. Keep it extremely brief.";
    
    if (isFinalSummaryTurn) {
      systemPrompt = "You are Baymax. The user has described their symptoms. Generate a clear, concise bullet-point summary of what they described. Start by saying 'Here is a summary of your symptoms that you can share with a healthcare professional:' DO NOT diagnose the user. Only summarize.";
    }
    
    const contextPrompt = newMessages.map(m => `${m.role === 'user' ? 'Patient' : 'Baymax'}: ${m.text}`).join('\n') + '\nBaymax:';

    try {
      await generateLlmResponseStream(contextPrompt, systemPrompt, (partialText) => {
        setIsLoading(false); 
        setMessages((prev) => 
          prev.map(m => m.id === botMsgId ? { ...m, text: partialText } : m)
        );
      });
      
      if (isFinalSummaryTurn) {
        setIsSummarized(true);
      }

    } catch (error) {
      setIsLoading(false);
      setMessages((prev) => 
        prev.map(m => m.id === botMsgId ? { ...m, text: "I'm having trouble thinking clearly right now. Please try again later." } : m)
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppHeader showBack={true} onBack={() => navigation.goBack()} title="Symptom Check" />
      
      <View style={styles.banner}>
        <Ionicons name="information-circle" size={24} color="#1565C0" />
        <Text style={styles.bannerText}>Baymax will ask you 3 questions and generate a summary for your doctor.</Text>
      </View>
      
      <ScrollView 
        style={styles.chatArea}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        contentContainerStyle={{ paddingBottom: 20 }} 
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
                <TypingIndicator />
              ) : (
                <Text style={styles.messageText}>{msg.text}</Text>
              )}
            </View>
          </View>
        ))}
        
        {isSummarized && (
           <View style={styles.summaryCompleteBanner}>
             <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
             <Text style={styles.summaryCompleteText}>Summary Complete. You can screenshot this or show it directly to a professional.</Text>
           </View>
        )}
      </ScrollView>

      {!isSummarized && (
        <View style={styles.inputArea}>
          <View style={styles.textInputContainer}>
            <TextInput 
              style={styles.textInput}
              placeholder="Describe what you feel..."
              placeholderTextColor={colors.darkGray}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSend()}
            />
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
            <Ionicons name="send" size={20} color={colors.black} />
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  banner: { flexDirection: 'row', backgroundColor: '#E3F2FD', padding: 12, alignItems: 'center', margin: 16, borderRadius: 8 },
  bannerText: { flex: 1, marginLeft: 12, color: '#0D47A1', fontSize: 13, lineHeight: 18 },
  
  chatArea: { flex: 1, paddingHorizontal: 16 },
  
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
  
  typingIndicatorContainer: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 12, alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.darkGray, marginHorizontal: 3 },
  
  summaryCompleteBanner: { flexDirection: 'row', backgroundColor: '#E8F5E9', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, marginBottom: 20 },
  summaryCompleteText: { flex: 1, marginLeft: 12, color: '#2E7D32', fontSize: 14, fontWeight: 'bold' },
  
  inputArea: { 
    flexDirection: 'row', 
    padding: 16, 
    backgroundColor: colors.white, 
    borderTopWidth: 1, 
    borderTopColor: colors.border, 
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 16
  },
  textInputContainer: { 
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    height: 50, 
    backgroundColor: '#f3f4f6', 
    borderRadius: 25, 
    paddingHorizontal: 20 
  },
  textInput: { flex: 1, fontSize: 16, color: colors.black },
  sendButton: { marginLeft: 10, padding: 8, backgroundColor: colors.primary, borderRadius: 20 },
});

export default SymptomExplorationMode;

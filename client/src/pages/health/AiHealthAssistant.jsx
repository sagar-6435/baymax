import AppHeader from '../../components/AppHeader';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Animated, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { generateLlmResponseStream } from '../../services/llmService';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

let ExpoSpeechRecognitionModule = null;
let useSpeechRecognitionEvent = () => {};

try {
  const SpeechRec = require('expo-speech-recognition');
  ExpoSpeechRecognitionModule = SpeechRec.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = SpeechRec.useSpeechRecognitionEvent;
} catch (e) {
  console.warn("ExpoSpeechRecognitionModule native module not found.");
}

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

const AiHealthAssistant = ({ route, navigation }) => {
  const { user, updateUser } = useAuth();
  
  // Load initial messages from user's history if available
  const initialMessages = user?.aiChatHistory?.length > 0 
    ? user.aiChatHistory 
    : [{ id: '1', role: 'bot', text: 'Hello! I am Baymax, your personal healthcare companion. How can I assist you today?' }];

  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollViewRef = useRef();

  // Listen to speech results
  if (useSpeechRecognitionEvent) {
    useSpeechRecognitionEvent("start", () => setIsListening(true));
    useSpeechRecognitionEvent("end", () => setIsListening(false));
    useSpeechRecognitionEvent("error", (event) => {
      setIsListening(false);
      console.error(event.error);
    });
    useSpeechRecognitionEvent("result", (event) => {
      if (event.results && event.results.length > 0) {
        setInputText(event.results[0].transcript);
      }
    });
  }

  const toggleListening = async () => {
    if (isListening) {
      if (ExpoSpeechRecognitionModule) ExpoSpeechRecognitionModule.stop();
      else setIsListening(false);
    } else {
      try {
        if (!ExpoSpeechRecognitionModule) {
          setIsListening(true);
          setTimeout(() => {
            setIsListening(false);
            setInputText('Hello Baymax, my head hurts.');
          }, 2500);
          return;
        }
        const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!granted) {
          Alert.alert("Permission Denied", "Microphone permission is required to use voice input.");
          return;
        }
        ExpoSpeechRecognitionModule.start({ lang: "en-US", interimResults: true });
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (isListening && ExpoSpeechRecognitionModule) {
        ExpoSpeechRecognitionModule.stop();
      }
    };
  }, [isListening]);

  useEffect(() => {
    if (route.params?.voiceText) {
      setInputText(route.params.voiceText);
      navigation.setParams({ voiceText: undefined });
    }
  }, [route.params?.voiceText]);

  const chronicConditions = user?.health?.chronicConditions || [];
  
  const dynamicPrompts = chronicConditions.map(c => `Tips for managing ${c}`);
  
  const suggestions = [
    ...dynamicPrompts,
    "I have a headache",
    "What should I do for a burn?",
    "How can I sleep better?",
    "Healthy diet tips"
  ];

  const saveChatHistory = async (newHistory) => {
    try {
      const updatedUser = await userService.updateProfile({ aiChatHistory: newHistory });
      updateUser(updatedUser);
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  };

  const handleSend = async (textOverride = null) => {
    if (isLoading) return;
    
    const actualOverride = typeof textOverride === 'string' ? textOverride : null;
    const userMsg = actualOverride || inputText.trim();
    if (!userMsg) return;

    setInputText('');
    
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user', text: userMsg, timestamp: new Date().toISOString() }];
    setMessages(newMessages);
    
    // Save user message immediately
    saveChatHistory(newMessages);
    
    const botMsgId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: botMsgId, role: 'bot', text: '', timestamp: new Date().toISOString() }]);
    setIsLoading(true);

    const systemPrompt = "You are Baymax, a personal healthcare companion. You are polite, medically informed (but always advise consulting a real doctor for serious issues), and highly empathetic. Keep responses concise and structured.";
    
    const contextPrompt = newMessages.map(m => `${m.role === 'user' ? 'Patient' : 'Baymax'}: ${m.text}`).join('\n') + '\nBaymax:';

    let finalBotText = "";
    try {
      await generateLlmResponseStream(contextPrompt, systemPrompt, (partialText) => {
        setIsLoading(false); 
        finalBotText = partialText;
        setMessages((prev) => 
          prev.map(m => m.id === botMsgId ? { ...m, text: partialText } : m)
        );
      });
      
      // Save final bot message
      const finalMessages = [...newMessages, { id: botMsgId, role: 'bot', text: finalBotText, timestamp: new Date().toISOString() }];
      saveChatHistory(finalMessages);

    } catch (error) {
      setIsLoading(false);
      finalBotText = "I'm having trouble connecting to my local AI brain right now.";
      setMessages((prev) => 
        prev.map(m => m.id === botMsgId ? { ...m, text: finalBotText } : m)
      );
      
      const finalMessages = [...newMessages, { id: botMsgId, role: 'bot', text: finalBotText, timestamp: new Date().toISOString() }];
      saveChatHistory(finalMessages);
    }
  };

  const clearChat = () => {
    const defaultMsg = [{ id: '1', role: 'bot', text: 'Hello! I am Baymax, your personal healthcare companion. How can I assist you today?' }];
    setMessages(defaultMsg);
    saveChatHistory([]);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <AppHeader 
        showBack={true} 
        onBack={() => navigation.goBack()} 
        rightComponent={
          <TouchableOpacity style={{ padding: 4 }} onPress={() => setShowMenu(true)}>
            <Ionicons name="ellipsis-vertical" size={24} color={colors.black} />
          </TouchableOpacity>
        }
      />
      
      {/* Dropdown Menu Modal */}
      <Modal visible={showMenu} transparent={true} animationType="fade" onRequestClose={() => setShowMenu(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowMenu(false)}>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                setShowMenu(false);
                navigation.navigate('ChatHistory');
              }}
            >
              <Ionicons name="time-outline" size={20} color={colors.black} style={styles.menuIcon} />
              <Text style={styles.menuText}>See History</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => {
                setShowMenu(false);
                clearChat();
              }}
            >
              <Ionicons name="trash-outline" size={20} color={colors.black} style={styles.menuIcon} />
              <Text style={styles.menuText}>Clear Chat</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.menuItem, { borderBottomWidth: 0 }]} 
              onPress={() => {
                setShowMenu(false);
                Alert.alert("About AI Health", "Baymax AI is your personal healthcare companion. It uses advanced language models to provide general health advice. Always consult a real doctor for serious conditions.");
              }}
            >
              <Ionicons name="information-circle-outline" size={20} color={colors.black} style={styles.menuIcon} />
              <Text style={styles.menuText}>About</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      
      <ScrollView 
        style={styles.chatArea}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        contentContainerStyle={{ paddingBottom: 60 }} 
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
          <TouchableOpacity 
            style={[styles.micButton, isListening && styles.micButtonActive]} 
            onPress={toggleListening}
          >
            <Ionicons name={isListening ? "stop" : "mic"} size={24} color={isListening ? colors.white : colors.black} />
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
          </View>
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
  
  typingIndicatorContainer: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 12, alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.darkGray, marginHorizontal: 3 },
  
  bottomAreaContainer: {
    backgroundColor: colors.white,
  },
  specialModesContainer: {
    position: 'absolute',
    top: -110,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  symptomModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E65100', // Distinct alert color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  symptomModeText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  suggestionsContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    position: 'absolute',
    top: -65,
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
  micButton: { marginRight: 12, backgroundColor: '#f3f4f6', padding: 12, borderRadius: 24 },
  micButtonActive: { backgroundColor: '#ff4444' },
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
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  menuContainer: { 
    position: 'absolute', 
    top: 60, 
    right: 20, 
    backgroundColor: colors.white, 
    borderRadius: 12, 
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.border 
  },
  menuIcon: { marginRight: 12 },
  menuText: { fontSize: 16, color: colors.black }
});

export default AiHealthAssistant;

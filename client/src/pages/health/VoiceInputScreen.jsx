import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';

const VoiceInputScreen = ({ navigation }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [error, setError] = useState(null);

  // Listen to speech results
  useSpeechRecognitionEvent("start", () => setIsListening(true));
  useSpeechRecognitionEvent("end", () => setIsListening(false));
  useSpeechRecognitionEvent("error", (event) => {
    setIsListening(false);
    setError(event.error || 'Error occurred during speech recognition');
  });
  useSpeechRecognitionEvent("result", (event) => {
    if (event.results && event.results.length > 0) {
      setRecognizedText(event.results[0].transcript);
    }
  });

  const startListening = async () => {
    try {
      const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!granted) {
        setError('Microphone permission denied');
        return;
      }
      setRecognizedText('');
      setError(null);
      ExpoSpeechRecognitionModule.start({ lang: "en-US", interimResults: true });
    } catch (e) {
      console.error(e);
      setError('Failed to start recording');
    }
  };

  const stopListening = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const submitText = () => {
    if (recognizedText.trim()) {
      navigation.navigate({
        name: 'AiHealthAssistant',
        params: { voiceText: recognizedText },
        merge: true,
      });
    } else {
      navigation.goBack();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isListening) {
        ExpoSpeechRecognitionModule.stop();
      }
    };
  }, [isListening]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Voice Input</Text>
        <TouchableOpacity onPress={submitText} disabled={!recognizedText}>
          <Text style={[styles.doneText, !recognizedText && { color: colors.gray }]}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.textContainer}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Text style={styles.recognizedText}>
              {recognizedText || 'Tap the microphone and start speaking...'}
            </Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.micButton, isListening && styles.micButtonActive]} 
          onPress={toggleListening}
        >
          {isListening ? (
            <Ionicons name="stop" size={40} color={colors.white} />
          ) : (
            <Ionicons name="mic" size={40} color={colors.white} />
          )}
        </TouchableOpacity>

        <Text style={styles.statusText}>
          {isListening ? 'Listening...' : 'Tap to speak'}
        </Text>
      </View>
    </View>
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
    backgroundColor: colors.white,
    borderBottomWidth: 1, 
    borderBottomColor: colors.border 
  },
  backButton: { padding: 4 },
  title: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  doneText: { fontSize: 16, fontWeight: 'bold', color: colors.primary },
  
  content: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 24,
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recognizedText: { 
    fontSize: 24, 
    color: colors.black, 
    textAlign: 'center',
    lineHeight: 34
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  micButtonActive: {
    backgroundColor: '#ff4444',
  },
  statusText: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 40
  }
});

export default VoiceInputScreen;

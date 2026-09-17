import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import Voice from '@react-native-voice/voice';

const VoiceInputScreen = ({ navigation }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Setup Voice listeners
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      // Clean up listeners when component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    setIsListening(true);
    setError(null);
  };

  const onSpeechEnd = (e) => {
    setIsListening(false);
  };

  const onSpeechError = (e) => {
    setIsListening(false);
    setError(e.error?.message || 'Error occurred during speech recognition');
  };

  const onSpeechResults = (e) => {
    if (e.value && e.value.length > 0) {
      setRecognizedText(e.value[0]);
    }
  };

  const startListening = async () => {
    try {
      setRecognizedText('');
      setError(null);
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
      setError('Failed to start recording');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
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
      // Pass the text back to the previous screen via params
      navigation.navigate({
        name: 'AiHealthAssistant', // Assuming this is the name of the chat screen
        params: { voiceText: recognizedText },
        merge: true,
      });
    } else {
      navigation.goBack();
    }
  };

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

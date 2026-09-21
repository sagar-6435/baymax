import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { learningData } from '../../data/learningData';
import { generateLlmResponse } from '../../services/llmService';

const OfflineLibraryReader = ({ navigation }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // AI Explainer State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Flatten the learning data for the library
  const libraryTopics = [];
  Object.keys(learningData).forEach(category => {
    learningData[category].lessons.forEach(lesson => {
      libraryTopics.push({
        category,
        title: lesson.title,
        content: lesson.content,
        icon: lesson.icon || '📚'
      });
    });
  });

  const handleAskAi = async () => {
    if (!aiQuestion.trim() || !selectedTopic) return;
    
    Keyboard.dismiss();
    setIsAiLoading(true);
    setAiResponse('');

    const systemPrompt = "You are Baymax, an offline healthcare companion. Answer the user's question based strictly on the provided text context. Keep it simple and concise.";
    const fullPrompt = `Context:\n"${selectedTopic.content}"\n\nUser Question:\n${aiQuestion}`;

    // Hardcoded response for prototype
    setTimeout(() => {
      setAiResponse(`Here is some basic information about "${selectedTopic.title}":\n\nThis condition involves taking proactive steps for your well-being. Make sure you follow the guidelines mentioned in the text carefully. If you have any specific concerns, it's always best to consult with a healthcare professional.\n\n(Note: This is a prototype response as AI is currently disabled.)`);
      setIsAiLoading(false);
    }, 1000);
  };

  if (selectedTopic) {
    return (
      <View style={styles.container}>
        <AppHeader showBack={true} onBack={() => setSelectedTopic(null)} title="Offline Library" />
        
        <ScrollView style={styles.readerContent} contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.readerHeader}>
            <Text style={styles.readerCategory}>{selectedTopic.category.toUpperCase()}</Text>
            <Text style={styles.readerTitle}>{selectedTopic.title}</Text>
          </View>
          <Text style={styles.readerText}>{selectedTopic.content}</Text>
        </ScrollView>

        <TouchableOpacity style={styles.fab} onPress={() => setShowAiModal(true)}>
          <Ionicons name="chatbubbles" size={24} color={colors.white} />
          <Text style={styles.fabText}>Ask Baymax</Text>
        </TouchableOpacity>

        {/* AI Modal */}
        <Modal visible={showAiModal} transparent={true} animationType="slide" onRequestClose={() => setShowAiModal(false)}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Ask Baymax</Text>
                <TouchableOpacity onPress={() => setShowAiModal(false)}>
                  <Ionicons name="close" size={28} color={colors.black} />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.modalSubtitle}>Ask a question about: "{selectedTopic.title}"</Text>
              
              <View style={styles.aiInputContainer}>
                <TextInput
                  style={styles.aiInput}
                  placeholder="E.g., What does this mean?"
                  value={aiQuestion}
                  onChangeText={setAiQuestion}
                  onSubmitEditing={handleAskAi}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleAskAi} disabled={isAiLoading}>
                  <Ionicons name="send" size={20} color={colors.white} />
                </TouchableOpacity>
              </View>

              {isAiLoading && (
                <View style={styles.aiLoading}>
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={{ marginLeft: 8 }}>Thinking...</Text>
                </View>
              )}

              {aiResponse ? (
                <ScrollView style={styles.aiResponseContainer}>
                  <Text style={styles.aiResponseText}>{aiResponse}</Text>
                </ScrollView>
              ) : null}
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} title="Offline Library" />
      <ScrollView style={styles.listContent}>
        <View style={styles.banner}>
          <Ionicons name="cloud-offline" size={24} color="#1565C0" />
          <Text style={styles.bannerText}>These materials are stored on your device and are available even without an internet connection.</Text>
        </View>

        {libraryTopics.map((topic, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.topicCard}
            onPress={() => setSelectedTopic(topic)}
          >
            <View style={styles.topicIconContainer}>
              <Text style={styles.topicIcon}>{topic.icon}</Text>
            </View>
            <View style={styles.topicInfo}>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicCategory}>{topic.category}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  
  listContent: { padding: 20 },
  banner: { flexDirection: 'row', backgroundColor: '#E3F2FD', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  bannerText: { flex: 1, marginLeft: 12, color: '#0D47A1', fontSize: 14, lineHeight: 20 },
  
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginBottom: 12,
  },
  topicIconContainer: { width: 50, height: 50, backgroundColor: '#F3F4F6', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  topicIcon: { fontSize: 24 },
  topicInfo: { flex: 1 },
  topicTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  topicCategory: { fontSize: 13, color: colors.darkGray },
  
  readerContent: { padding: 24 },
  readerHeader: { marginBottom: 24, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 16 },
  readerCategory: { fontSize: 12, fontWeight: 'bold', color: colors.primary, letterSpacing: 1, marginBottom: 8 },
  readerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.black },
  readerText: { fontSize: 18, color: '#333', lineHeight: 28 },
  
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  fabText: { color: colors.white, fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: '50%', maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: colors.black },
  modalSubtitle: { fontSize: 14, color: colors.darkGray, marginBottom: 16, fontStyle: 'italic' },
  
  aiInputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  aiInput: { flex: 1, backgroundColor: '#F3F4F6', height: 50, borderRadius: 25, paddingHorizontal: 20, fontSize: 16 },
  sendButton: { backgroundColor: colors.primary, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  
  aiLoading: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  aiResponseContainer: { backgroundColor: '#F0F4F8', padding: 16, borderRadius: 12 },
  aiResponseText: { fontSize: 16, color: '#333', lineHeight: 24 }
});

export default OfflineLibraryReader;

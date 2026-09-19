import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, globalStyles } from '../../theme';
import { useAuth } from '../../context/AuthContext';

const ChatHistory = ({ navigation }) => {
  const { user } = useAuth();
  
  // Extract AI chat history or default to empty array
  const chatHistory = user?.aiChatHistory || [];

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Group messages by date
  const groupedMessages = chatHistory.reduce((acc, msg) => {
    if (!msg.timestamp) return acc;
    const dateKey = formatDate(msg.timestamp);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(msg);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />
      
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>AI Health History</Text>
        <Text style={styles.headerSub}>Your conversations with Baymax</Text>
      </View>

      <ScrollView style={styles.historyList}>
        {chatHistory.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>💬</Text>
            <Text style={styles.emptyTitle}>No History Yet</Text>
            <Text style={styles.emptySub}>Start a conversation with Baymax to see your history here.</Text>
          </View>
        ) : (
          Object.keys(groupedMessages).map((date) => (
            <View key={date} style={styles.dateGroup}>
              <View style={styles.dateHeader}>
                <Text style={styles.dateText}>{date}</Text>
              </View>
              
              {groupedMessages[date].map((msg) => (
                <View key={msg.id} style={msg.role === 'bot' ? styles.botMessageWrapper : styles.userMessageWrapper}>
                  {msg.role === 'bot' && (
                    <View style={styles.botTitleContainer}>
                      <Text style={styles.botTitle}>BAYMAX</Text>
                    </View>
                  )}
                  <View style={msg.role === 'bot' ? styles.botMessageCard : styles.userMessage}>
                    <Text style={msg.role === 'bot' ? styles.messageTextBot : styles.messageTextUser}>
                      {msg.text}
                    </Text>
                  </View>
                  <Text style={[styles.timeText, msg.role === 'user' ? { alignSelf: 'flex-end', marginRight: 8 } : { marginLeft: 8 }]}>
                    {formatTime(msg.timestamp)}
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  
  headerTitleContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  headerSub: { fontSize: 14, color: colors.darkGray },
  
  historyList: { flex: 1, padding: 16 },
  
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    padding: 20,
  },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: colors.black, marginBottom: 8 },
  emptySub: { fontSize: 14, color: colors.darkGray, textAlign: 'center', lineHeight: 22 },

  dateGroup: { marginBottom: 24 },
  dateHeader: { alignItems: 'center', marginBottom: 16 },
  dateText: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: colors.darkGray, 
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden'
  },
  
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
  messageTextBot: { fontSize: 16, color: colors.black, lineHeight: 24 },
  messageTextUser: { fontSize: 16, color: colors.black, lineHeight: 24 },
  
  timeText: { fontSize: 10, color: colors.darkGray, marginTop: 4 },
});

export default ChatHistory;

import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
          Object.keys(groupedMessages).map((date) => {
            const messages = groupedMessages[date];
            const firstUserMessage = messages.find(m => m.role === 'user')?.text || 'Chat Session';
            const sessionTime = formatTime(messages[0]?.timestamp);
            
            return (
              <TouchableOpacity 
                key={date} 
                style={styles.chatSessionCard}
                onPress={() => navigation.navigate('DetailedChatHistory', { date, messages })}
                activeOpacity={0.7}
              >
                <View style={styles.chatSessionLeft}>
                  <View style={styles.iconCircle}>
                    <Text style={styles.iconEmoji}>🤖</Text>
                  </View>
                  <View style={styles.sessionTextContainer}>
                    <Text style={styles.sessionTitle} numberOfLines={1}>{firstUserMessage}</Text>
                    <Text style={styles.sessionTime}>{date} • {sessionTime}</Text>
                  </View>
                </View>
                <Text style={styles.arrow}>❯</Text>
              </TouchableOpacity>
            );
          })
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
  
  historyList: { flex: 1, padding: 20 },
  
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    padding: 20,
  },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: colors.black, marginBottom: 8 },
  emptySub: { fontSize: 14, color: colors.darkGray, textAlign: 'center', lineHeight: 22 },

  chatSessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: globalStyles.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  chatSessionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconEmoji: {
    fontSize: 24,
  },
  sessionTextContainer: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  sessionTime: {
    fontSize: 14,
    color: colors.darkGray,
  },
  arrow: {
    fontSize: 20,
    color: colors.border,
    fontWeight: 'bold',
  }
});

export default ChatHistory;

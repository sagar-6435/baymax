import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import AppHeader from '../../components/AppHeader';

import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const getIconForType = (type) => {
  switch(type) {
    case 'medical': return { name: 'medkit', color: '#0066FF', bg: '#EEF5FF' };
    case 'health': return { name: 'heart', color: '#FF4D4D', bg: '#FFEEEE' };
    case 'learning': return { name: 'book', color: '#339933', bg: '#EEFFE8' };
    default: return { name: 'information-circle', color: colors.darkGray, bg: colors.lightGray };
  }
};

const NotificationsScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const notifications = user?.inAppNotifications || [];

  const updateBackend = async (newNotifications) => {
    try {
      const updatedUser = await userService.updateProfile({ inAppNotifications: newNotifications });
      if (updateUser) await updateUser(updatedUser);
    } catch (e) {
      console.error('Failed to mark notifications', e);
    }
  };

  const markAllAsRead = () => {
    const newNotifications = notifications.map(n => ({ ...n, read: true }));
    updateBackend(newNotifications);
  };

  const markAsRead = (id) => {
    const newNotifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    updateBackend(newNotifications);
  };

  const renderItem = ({ item }) => {
    const iconData = getIconForType(item.type);
    return (
      <TouchableOpacity 
        style={[styles.notificationCard, !item.read && styles.unreadCard]}
        onPress={() => markAsRead(item.id)}
      >
        <View style={[styles.iconContainer, { backgroundColor: iconData.bg }]}>
          <Ionicons name={iconData.name} size={24} color={iconData.color} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, !item.read && styles.unreadText]}>{item.title}</Text>
            {!item.read && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />
      
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      {notifications.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="notifications-off-outline" size={64} color={colors.lightGray} />
          <Text style={{ marginTop: 16, color: colors.darkGray, fontSize: 16 }}>No notifications yet.</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 10,
    paddingBottom: 20 
  },
  headerTitle: { fontSize: 28, fontWeight: '900', color: colors.black },
  markReadText: { fontSize: 14, color: colors.primary, fontWeight: 'bold' },
  
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  unreadCard: {
    backgroundColor: '#FFFBF0',
    borderColor: colors.primary,
  },
  
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  textContainer: { flex: 1, justifyContent: 'center' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  title: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  unreadText: { color: colors.black },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  
  message: { fontSize: 14, color: colors.darkGray, lineHeight: 20, marginBottom: 8 },
  time: { fontSize: 12, color: colors.darkGray, fontWeight: '500' }
});

export default NotificationsScreen;

import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const { width } = Dimensions.get('window');
const BADGE_SIZE = (width - 60 - 32) / 3;

const AchievementsBadges = ({ navigation }) => {
  const badges = [
    { id: 1, icon: '🏆', name: 'First Steps', desc: 'Complete your first lesson.', unlocked: true },
    { id: 2, icon: '🧠', name: 'Brainiac', desc: 'Score 100% on a quiz.', unlocked: true },
    { id: 3, icon: '🔥', name: 'On Fire', desc: 'Maintain a 3-day streak.', unlocked: true },
    { id: 4, icon: '🎓', name: 'Scholar', desc: 'Complete an entire module.', unlocked: true },
    { id: 5, icon: '🌟', name: 'Super Star', desc: 'Earn 1000 total XP.', unlocked: false },
    { id: 6, icon: '🏃', name: 'Marathon', desc: 'Complete 10 lessons.', unlocked: false },
    { id: 7, icon: '🩺', name: 'Doctor', desc: 'Pass all health quizzes.', unlocked: false },
  ];

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        
        <View style={styles.summaryCard}>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryCount}>4 / 12</Text>
            <Text style={styles.summaryLabel}>Badges Unlocked</Text>
          </View>
          <Ionicons name="medal-outline" size={48} color={colors.primary} />
        </View>

        <Text style={styles.sectionTitle}>YOUR COLLECTION</Text>

        <View style={styles.badgesGrid}>
          {badges.map((badge) => (
            <View key={badge.id} style={styles.badgeWrapper}>
              <View style={[styles.badgeIconBox, !badge.unlocked && styles.badgeLockedBox]}>
                {badge.unlocked ? (
                  <Text style={styles.badgeEmoji}>{badge.icon}</Text>
                ) : (
                  <Ionicons name="lock-closed" size={24} color={colors.border} />
                )}
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeDesc} numberOfLines={2} ellipsizeMode="tail">
                {badge.desc}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  backButton: { padding: 4 },
  
  content: { padding: 20 },
  
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#fffde7',
    borderRadius: globalStyles.cardRadius,
    padding: 24,
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  summaryInfo: { flex: 1 },
  summaryCount: { fontSize: 32, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  summaryLabel: { fontSize: 14, color: colors.darkGray },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  badgeWrapper: {
    width: BADGE_SIZE,
    alignItems: 'center',
    marginBottom: 24,
  },
  badgeIconBox: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#00bcd4',
  },
  badgeLockedBox: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  badgeEmoji: { fontSize: 32 },
  badgeName: { fontSize: 12, fontWeight: 'bold', color: colors.black, textAlign: 'center', marginBottom: 4 },
  badgeDesc: { fontSize: 10, color: colors.darkGray, textAlign: 'center', lineHeight: 14 },
});

export default AchievementsBadges;

import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const LessonDetails = ({ navigation, route }) => {
  const lessonTitle = route?.params?.title || "Lesson Overview";

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>📘</Text>
          <Text style={styles.heroTitle}>{lessonTitle}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color={colors.darkGray} />
              <Text style={styles.statText}>15 mins</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame-outline" size={16} color={colors.darkGray} />
              <Text style={styles.statText}>50 XP</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="bar-chart-outline" size={16} color={colors.darkGray} />
              <Text style={styles.statText}>Beginner</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ABOUT THIS LESSON</Text>
        <Text style={styles.descriptionText}>
          In this lesson, you will learn the foundational concepts required to master the topic. 
          We'll cover the basics, common misconceptions, and practical applications that you can use in your daily life.
        </Text>

        <Text style={styles.sectionTitle}>WHAT YOU'LL LEARN</Text>
        
        <View style={styles.objectiveRow}>
          <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
          <Text style={styles.objectiveText}>Understand the core principles and functions.</Text>
        </View>
        <View style={styles.objectiveRow}>
          <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
          <Text style={styles.objectiveText}>Identify key components and their interactions.</Text>
        </View>
        <View style={styles.objectiveRow}>
          <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
          <Text style={styles.objectiveText}>Apply this knowledge in practical scenarios.</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => navigation.navigate('InteractiveLesson', { title: lessonTitle })}
        >
          <Text style={styles.startButtonText}>Start Lesson</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.black} style={{marginLeft: 8}} />
        </TouchableOpacity>
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
  headerTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1, color: colors.black },
  backButton: { padding: 4 },
  
  content: { padding: 20 },
  
  heroCard: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: globalStyles.cardRadius,
    alignItems: 'center',
    marginBottom: 24,
  },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: colors.black, marginBottom: 16, textAlign: 'center' },
  
  statsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  statItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 },
  statText: { fontSize: 14, color: colors.darkGray, marginLeft: 4 },

  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 12, marginTop: 12 },
  descriptionText: { fontSize: 16, color: colors.black, lineHeight: 24, marginBottom: 20 },
  
  objectiveRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  objectiveText: { fontSize: 16, color: colors.black, flex: 1, marginLeft: 12, lineHeight: 22 },
  
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  startButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: globalStyles.buttonRadius,
  },
  startButtonText: { fontSize: 16, fontWeight: 'bold', color: colors.black },
});

export default LessonDetails;

import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const AnatomyModule = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🧠</Text>
          <Text style={styles.heroTitle}>Understand Your Body</Text>
          <Text style={styles.heroSub}>Explore how the human body works to better understand your health.</Text>
        </View>

        <Text style={styles.sectionTitle}>LESSONS (3/4 COMPLETED)</Text>

        <TouchableOpacity style={styles.lessonCard} onPress={() => navigation.navigate('LessonDetails', { title: 'The Circulatory System' })}>
          <View style={styles.lessonIconBox}>
            <Text style={styles.lessonIcon}>❤️</Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>The Circulatory System</Text>
            <Text style={styles.lessonTime}>10 mins • Completed</Text>
          </View>
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.lessonCard} onPress={() => navigation.navigate('LessonDetails', { title: 'The Respiratory System' })}>
          <View style={styles.lessonIconBox}>
            <Text style={styles.lessonIcon}>🫁</Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>The Respiratory System</Text>
            <Text style={styles.lessonTime}>12 mins • Completed</Text>
          </View>
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.lessonCard} onPress={() => navigation.navigate('LessonDetails', { title: 'The Nervous System' })}>
          <View style={styles.lessonIconBox}>
            <Text style={styles.lessonIcon}>⚡</Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>The Nervous System</Text>
            <Text style={styles.lessonTime}>15 mins • Completed</Text>
          </View>
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.lessonCard, { borderColor: colors.primary, borderWidth: 2 }]} onPress={() => navigation.navigate('LessonDetails', { title: 'The Digestive System' })}>
          <View style={styles.lessonIconBox}>
            <Text style={styles.lessonIcon}>🥪</Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>The Digestive System</Text>
            <Text style={styles.lessonTime}>8 mins • Up Next</Text>
          </View>
          <Ionicons name="play-circle" size={28} color={colors.primary} />
        </TouchableOpacity>

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
  
  heroCard: {
    backgroundColor: '#e3f2fd',
    padding: 24,
    borderRadius: globalStyles.cardRadius,
    alignItems: 'center',
    marginBottom: 24,
  },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: colors.black, marginBottom: 8 },
  heroSub: { fontSize: 14, color: colors.darkGray, textAlign: 'center', lineHeight: 20 },

  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    borderRadius: globalStyles.cardRadius,
    marginBottom: 12,
  },
  lessonIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonIcon: { fontSize: 24 },
  lessonInfo: { flex: 1 },
  lessonTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  lessonTime: { fontSize: 12, color: colors.darkGray },
});

export default AnatomyModule;

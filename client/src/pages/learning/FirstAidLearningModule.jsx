import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const FirstAidLearningModule = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FIRST AID ESSENTIALS</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content}>
        
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🩹</Text>
          <Text style={styles.heroTitle}>Emergency Response</Text>
          <Text style={styles.heroSub}>Learn critical first-aid skills that can save lives in an emergency.</Text>
        </View>

        <Text style={styles.sectionTitle}>LESSONS (2/3 COMPLETED)</Text>

        <TouchableOpacity style={styles.lessonCard} onPress={() => navigation.navigate('LessonDetails', { title: 'Basic CPR Guide' })}>
          <View style={styles.lessonIconBox}>
            <Text style={styles.lessonIcon}>🫀</Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Basic CPR Guide</Text>
            <Text style={styles.lessonTime}>20 mins • Completed</Text>
          </View>
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.lessonCard} onPress={() => navigation.navigate('LessonDetails', { title: 'Treating Severe Bleeding' })}>
          <View style={styles.lessonIconBox}>
            <Text style={styles.lessonIcon}>🩸</Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Treating Severe Bleeding</Text>
            <Text style={styles.lessonTime}>12 mins • Completed</Text>
          </View>
          <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.lessonCard, { borderColor: colors.primary, borderWidth: 2 }]} onPress={() => navigation.navigate('LessonDetails', { title: 'Burns & Scalds' })}>
          <View style={styles.lessonIconBox}>
            <Text style={styles.lessonIcon}>🔥</Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Burns & Scalds</Text>
            <Text style={styles.lessonTime}>15 mins • Up Next</Text>
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
    backgroundColor: '#fff3e0',
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
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonIcon: { fontSize: 24 },
  lessonInfo: { flex: 1 },
  lessonTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  lessonTime: { fontSize: 12, color: colors.darkGray },
});

export default FirstAidLearningModule;

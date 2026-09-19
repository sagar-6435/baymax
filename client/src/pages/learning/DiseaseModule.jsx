import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { getLearningDataForCondition } from '../../data/learningData';

const DiseaseModule = ({ navigation, route }) => {
  const { condition } = route?.params || {};
  const data = getLearningDataForCondition(condition);

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>{data.emoji}</Text>
          <Text style={styles.heroTitle}>{data.title}</Text>
          <Text style={styles.heroSub}>{data.subtitle}</Text>
        </View>

        <Text style={styles.sectionTitle}>LESSONS (0/{data.lessons.length} COMPLETED)</Text>

        {data.lessons.map((lesson, index) => (
          <TouchableOpacity 
            key={index}
            style={[styles.lessonCard, index === 0 ? { borderColor: colors.primary, borderWidth: 2 } : {}]} 
            onPress={() => navigation.navigate('LessonDetails', { title: lesson.title })}
          >
            <View style={styles.lessonIconBox}>
              <Text style={styles.lessonIcon}>{lesson.icon}</Text>
            </View>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonTime}>{lesson.time} • {index === 0 ? 'Up Next' : 'Available'}</Text>
            </View>
            <Ionicons name="play-circle" size={index === 0 ? 28 : 24} color={index === 0 ? colors.primary : colors.darkGray} />
          </TouchableOpacity>
        ))}

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
    backgroundColor: '#ffebee',
    padding: 24,
    borderRadius: globalStyles.cardRadius,
    alignItems: 'center',
    marginBottom: 24,
  },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: colors.black, marginBottom: 8, textAlign: 'center' },
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

export default DiseaseModule;

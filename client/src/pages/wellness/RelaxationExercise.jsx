import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const RelaxationExercise = ({ navigation }) => {
  
  const exercises = [
    { id: 1, title: 'Deep Body Scan', duration: '10 Min', type: 'Meditation', color: '#e3f2fd', icon: 'body-outline' },
    { id: 2, title: 'Visualizing Calm', duration: '5 Min', type: 'Visualization', color: '#e8f5e9', icon: 'image-outline' },
    { id: 3, title: 'Progressive Muscle Relaxation', duration: '15 Min', type: 'Physical', color: '#f3e5f5', icon: 'fitness-outline' },
    { id: 4, title: 'Quick De-stress', duration: '3 Min', type: 'Audio', color: '#fff3e0', icon: 'musical-notes-outline' },
  ];

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.featuredCard}>
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTag}>RECOMMENDED</Text>
            <Text style={styles.featuredTitle}>Evening Wind Down</Text>
            <Text style={styles.featuredDesc}>Prepare your body for a restful night's sleep.</Text>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={20} color={colors.white} />
              <Text style={styles.playButtonText}>Play (12 Min)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ALL EXERCISES</Text>

        {exercises.map((exercise) => (
          <TouchableOpacity key={exercise.id} style={styles.exerciseCard}>
            <View style={[styles.iconContainer, { backgroundColor: exercise.color }]}>
              <Ionicons name={exercise.icon} size={24} color={colors.black} />
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseMeta}>{exercise.type} • {exercise.duration}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.border} />
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
  
  featuredCard: {
    backgroundColor: '#37474f',
    borderRadius: globalStyles.cardRadius,
    padding: 24,
    marginBottom: 30,
    overflow: 'hidden',
  },
  featuredTag: { color: colors.primary, fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8 },
  featuredTitle: { fontSize: 24, fontWeight: 'bold', color: colors.white, marginBottom: 8 },
  featuredDesc: { fontSize: 14, color: '#cfd8dc', marginBottom: 20, lineHeight: 20 },
  playButton: {
    backgroundColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  playButtonText: { color: colors.white, fontWeight: 'bold', marginLeft: 8 },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseInfo: { flex: 1 },
  exerciseTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  exerciseMeta: { fontSize: 13, color: colors.darkGray },
});

export default RelaxationExercise;

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, globalStyles } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

const LearningDashboard = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.progressCard}
        onPress={() => navigation.navigate('LearningProgress')}
      >
        <View style={styles.progressHeader}>
          <Text style={styles.cardTitle}>Your Progress</Text>
          <Text style={styles.levelBadge}>LVL 3</Text>
        </View>
        <Text style={styles.cardText}>Health Scholar</Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFill}></View>
        </View>
        <Text style={styles.progressText}>75% to Level 4</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>CATEGORIES</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LearningCategories')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.moduleCard}
        onPress={() => navigation.navigate('AnatomyModule')}
      >
        <View style={styles.moduleIconContainer}>
          <Text style={styles.moduleIcon}>🧠</Text>
        </View>
        <View style={styles.moduleInfo}>
          <Text style={styles.moduleTitle}>Human Anatomy</Text>
          <Text style={styles.moduleSub}>3 / 4 lessons completed</Text>
          <View style={styles.smallProgressBar}>
            <View style={[styles.smallProgressFill, {width: '75%'}]}></View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.darkGray} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.moduleCard}
        onPress={() => navigation.navigate('NutritionModule')}
      >
        <View style={styles.moduleIconContainer}>
          <Text style={styles.moduleIcon}>🥗</Text>
        </View>
        <View style={styles.moduleInfo}>
          <Text style={styles.moduleTitle}>Nutrition Basics</Text>
          <Text style={styles.moduleSub}>1 / 4 lessons completed</Text>
          <View style={styles.smallProgressBar}>
            <View style={[styles.smallProgressFill, {width: '25%'}]}></View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.darkGray} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.achievementsCard}
        onPress={() => navigation.navigate('AchievementsBadges')}
      >
        <Ionicons name="trophy" size={24} color={colors.primary} />
        <Text style={styles.achievementsText}>View Achievements & Badges</Text>
        <Ionicons name="arrow-forward" size={20} color={colors.black} />
      </TouchableOpacity>

      <View style={{height: 40}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: colors.white },
  header: { fontSize: 28, fontWeight: 'bold', marginTop: 40, marginBottom: 20, color: colors.black },
  
  progressCard: { 
    backgroundColor: colors.primary, 
    padding: 20, 
    borderRadius: globalStyles.cardRadius, 
    marginBottom: 30 
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.black },
  levelBadge: { backgroundColor: colors.black, color: colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, fontSize: 12, fontWeight: 'bold' },
  cardText: { fontSize: 16, color: colors.darkGray, marginBottom: 16 },
  
  progressBarContainer: { height: 8, backgroundColor: colors.black + '20', borderRadius: 4, marginBottom: 8 },
  progressBarFill: { width: '75%', height: '100%', backgroundColor: colors.black, borderRadius: 4 },
  progressText: { color: colors.darkGray, fontSize: 14, fontWeight: 'bold' },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1 },
  seeAllText: { fontSize: 14, fontWeight: 'bold', color: colors.primary },
  
  moduleCard: { 
    flexDirection: 'row', 
    backgroundColor: colors.white, 
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16, 
    borderRadius: globalStyles.cardRadius, 
    marginBottom: 12, 
    alignItems: 'center' 
  },
  moduleIconContainer: { backgroundColor: colors.lightGray, padding: 12, borderRadius: 12, marginRight: 16 },
  moduleIcon: { fontSize: 24 },
  moduleInfo: { flex: 1 },
  moduleTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  moduleSub: { fontSize: 14, color: colors.darkGray, marginBottom: 8 },
  
  smallProgressBar: { height: 4, backgroundColor: colors.lightGray, borderRadius: 2, width: '80%' },
  smallProgressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },
  
  achievementsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: globalStyles.cardRadius,
    marginTop: 20,
    marginBottom: 20
  },
  achievementsText: { flex: 1, fontSize: 16, fontWeight: 'bold', color: colors.black, marginLeft: 16 }
});

export default LearningDashboard;

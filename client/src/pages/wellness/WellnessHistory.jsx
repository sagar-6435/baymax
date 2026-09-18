import AppHeader from '../../components/AppHeader';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const WellnessHistory = ({ navigation }) => {
  const historyData = [
    { id: '1', date: 'Today, 2:30 PM', type: 'Mood', value: 'Good 🙂', detail: 'Logged after lunch', color: '#c8e6c9' },
    { id: '2', date: 'Today, 9:00 AM', type: 'Exercise', value: '4-7-8 Breathing', detail: 'Completed 5 cycles', color: '#e0f7fa' },
    { id: '3', date: 'Yesterday, 8:00 PM', type: 'Relaxation', value: 'Body Scan', detail: '10 Min session', color: '#f3e5f5' },
    { id: '4', date: 'Yesterday, 1:15 PM', type: 'Mood', value: 'Stressed 😖', detail: 'Felt overwhelmed at work', color: '#ffcdd2' },
  ];

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>This Week</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Moods</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>RECENT LOGS</Text>

        <View style={styles.timeline}>
          {historyData.map((item, index) => (
            <View key={item.id} style={styles.timelineItem}>
              {/* Timeline Line */}
              {index !== historyData.length - 1 && <View style={styles.timelineLine} />}
              
              {/* Timeline Dot */}
              <View style={[styles.timelineDot, { backgroundColor: item.color }]} />
              
              {/* Content */}
              <View style={styles.timelineContent}>
                <Text style={styles.timelineDate}>{item.date}</Text>
                <View style={styles.logCard}>
                  <View style={styles.logHeader}>
                    <Text style={styles.logType}>{item.type}</Text>
                    <Text style={styles.logValue}>{item.value}</Text>
                  </View>
                  <Text style={styles.logDetail}>{item.detail}</Text>
                </View>
              </View>
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
    backgroundColor: colors.white,
    borderRadius: globalStyles.cardRadius,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center'
  },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 16 },
  summaryStats: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: colors.primary, marginBottom: 4 },
  statLabel: { fontSize: 12, color: colors.darkGray, textTransform: 'uppercase' },
  statDivider: { width: 1, height: 30, backgroundColor: colors.border },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 20 },
  
  timeline: { paddingLeft: 10 },
  timelineItem: { flexDirection: 'row', marginBottom: 24, position: 'relative' },
  timelineLine: {
    position: 'absolute',
    left: 7,
    top: 24,
    bottom: -24,
    width: 2,
    backgroundColor: colors.white,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: colors.white,
    marginTop: 4,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  timelineContent: { flex: 1 },
  timelineDate: { fontSize: 13, color: colors.darkGray, marginBottom: 8 },
  logCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 16,
  },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  logType: { fontSize: 12, fontWeight: 'bold', color: colors.primary, textTransform: 'uppercase' },
  logValue: { fontSize: 14, fontWeight: 'bold', color: colors.black },
  logDetail: { fontSize: 14, color: colors.darkGray }
});

export default WellnessHistory;

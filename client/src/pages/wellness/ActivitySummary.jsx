import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const ActivitySummary = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ACTIVITY SUMMARY</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.ringsContainer}>
          <Text style={styles.dateText}>Today, Oct 24</Text>
          {/* Mock circular progress representation using basic shapes for prototype */}
          <View style={styles.mockRings}>
            <View style={[styles.ring, { borderColor: '#ef5350', width: 160, height: 160, borderRadius: 80 }]} />
            <View style={[styles.ring, { borderColor: '#66bb6a', width: 120, height: 120, borderRadius: 60 }]} />
            <View style={[styles.ring, { borderColor: '#29b6f6', width: 80, height: 80, borderRadius: 40 }]} />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#ffebee' }]}>
            <Ionicons name="flame" size={24} color="#ef5350" style={styles.statIcon} />
            <Text style={styles.statValue}>450</Text>
            <Text style={styles.statLabel}>Move (kcal)</Text>
          </View>
          
          <View style={[styles.statBox, { backgroundColor: '#e8f5e9' }]}>
            <Ionicons name="fitness" size={24} color="#66bb6a" style={styles.statIcon} />
            <Text style={styles.statValue}>22</Text>
            <Text style={styles.statLabel}>Exercise (min)</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#e1f5fe' }]}>
            <Ionicons name="body" size={24} color="#29b6f6" style={styles.statIcon} />
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Stand (hrs)</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>TRENDS</Text>

        <View style={styles.trendCard}>
          <View style={styles.trendHeader}>
            <Ionicons name="walk" size={20} color={colors.black} />
            <Text style={styles.trendTitle}>Steps</Text>
          </View>
          <Text style={styles.trendValue}>7,243 <Text style={styles.trendSub}>steps today</Text></Text>
          
          {/* Mock Bar Chart */}
          <View style={styles.barChart}>
            {[40, 60, 30, 80, 100, 70, 50].map((height, i) => (
              <View key={i} style={styles.barColumn}>
                <View style={[styles.barFill, { height: `${height}%`, backgroundColor: i === 4 ? colors.primary : colors.lightGray }]} />
              </View>
            ))}
          </View>
          <View style={styles.barLabels}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <Text key={i} style={styles.barLabelText}>{day}</Text>
            ))}
          </View>
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
  
  ringsContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  dateText: { fontSize: 18, fontWeight: 'bold', color: colors.black, marginBottom: 30 },
  mockRings: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  ring: {
    position: 'absolute',
    borderWidth: 12,
    opacity: 0.8
  },
  
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statBox: {
    width: '31%',
    borderRadius: globalStyles.cardRadius,
    padding: 12,
    alignItems: 'center',
  },
  statIcon: { marginBottom: 8 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: colors.black, marginBottom: 2 },
  statLabel: { fontSize: 10, color: colors.darkGray, textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.darkGray, letterSpacing: 1, marginBottom: 16 },
  
  trendCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: globalStyles.cardRadius,
    padding: 20,
  },
  trendHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  trendTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginLeft: 8 },
  trendValue: { fontSize: 24, fontWeight: 'bold', color: colors.black, marginBottom: 20 },
  trendSub: { fontSize: 14, color: colors.darkGray, fontWeight: 'normal' },
  
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 8,
  },
  barColumn: { width: 20, height: '100%', justifyContent: 'flex-end' },
  barFill: { width: '100%', borderRadius: 4 },
  barLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingHorizontal: 4 },
  barLabelText: { fontSize: 12, color: colors.darkGray }
});

export default ActivitySummary;

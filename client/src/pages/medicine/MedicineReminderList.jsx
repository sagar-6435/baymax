import AppHeader from '../../components/AppHeader';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';

const MedicineReminderList = ({ navigation }) => {
  const [reminders, setReminders] = useState([
    { id: 1, name: 'Paracetamol', dosage: '1 pill', time: '08:00 AM', status: 'taken' },
    { id: 2, name: 'Vitamin C', dosage: '1 tablet', time: '12:00 PM', status: 'pending' },
    { id: 3, name: 'Amoxicillin', dosage: '1 capsule', time: '08:00 PM', status: 'pending' },
  ]);

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        
        <View style={styles.dateSelector}>
          <TouchableOpacity style={styles.dateArrow}><Ionicons name="chevron-back" size={24} color={colors.black}/></TouchableOpacity>
          <Text style={styles.dateText}>Today</Text>
          <TouchableOpacity style={styles.dateArrow}><Ionicons name="chevron-forward" size={24} color={colors.black}/></TouchableOpacity>
        </View>

        <View style={styles.timeline}>
          {reminders.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.reminderCard}
              onPress={() => navigation.navigate('EditMedicineReminder', { reminder: item })}
            >
              <View style={styles.timeColumn}>
                <Text style={styles.timeVal}>{item.time.split(' ')[0]}</Text>
                <Text style={styles.timeAmPm}>{item.time.split(' ')[1]}</Text>
              </View>
              
              <View style={styles.timelineDotBox}>
                <View style={styles.timelineLine} />
                <View style={[
                  styles.timelineDot, 
                  item.status === 'taken' ? { backgroundColor: colors.primary } : { backgroundColor: colors.border }
                ]}>
                  {item.status === 'taken' && <Ionicons name="checkmark" size={12} color={colors.white} />}
                </View>
              </View>

              <View style={styles.reminderInfo}>
                <Text style={styles.reminderName}>{item.name}</Text>
                <Text style={styles.reminderDosage}>{item.dosage}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddMedicineReminder')}
      >
        <Ionicons name="add" size={32} color={colors.white} />
      </TouchableOpacity>
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
  
  dateSelector: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  dateArrow: { padding: 8 },
  dateText: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 20 },
  
  timeline: { paddingLeft: 10 },
  reminderCard: { flexDirection: 'row', marginBottom: 24, minHeight: 60 },
  
  timeColumn: { width: 60, alignItems: 'flex-end', paddingTop: 4 },
  timeVal: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  timeAmPm: { fontSize: 12, color: colors.darkGray },
  
  timelineDotBox: { width: 40, alignItems: 'center' },
  timelineLine: { position: 'absolute', top: 24, bottom: -24, width: 2, backgroundColor: colors.border },
  timelineDot: { 
    width: 20, height: 20, 
    borderRadius: 10, 
    backgroundColor: colors.border, 
    marginTop: 4, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 2
  },
  
  reminderInfo: { 
    flex: 1, 
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: globalStyles.cardRadius,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary
  },
  reminderName: { fontSize: 16, fontWeight: 'bold', color: colors.black, marginBottom: 4 },
  reminderDosage: { fontSize: 14, color: colors.darkGray },
  
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  }
});

export default MedicineReminderList;

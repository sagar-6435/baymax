import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Image, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';

const { width } = Dimensions.get('window');

const HomeDashboard = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [greeting, setGreeting] = useState({ text: 'Good\nMorning', icon: '☀️' });
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const bubbleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Generate daily alerts if applicable
    notificationService.generateDailyMedicationAlerts(user, updateUser);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting({ text: 'Good\nMorning', icon: '☀️' });
    else if (hour < 18) setGreeting({ text: 'Good\nAfternoon', icon: '🌤️' });
    else setGreeting({ text: 'Good\nEvening', icon: '🌙' });

    // Friendly bounce animation and speech bubble instead of full-body wave
    Animated.sequence([
      Animated.delay(500),
      Animated.parallel([
        Animated.timing(bubbleOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.sequence([
          // Wave 1 (Bounce)
          Animated.timing(bounceAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.delay(300),
          // Wave 2 (Bounce)
          Animated.timing(bounceAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        ])
      ]),
      Animated.delay(1000), // Hold the bubble a bit
      Animated.timing(bubbleOpacity, { toValue: 0, duration: 300, useNativeDriver: true })
    ]).start();
  }, []);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10]
  });
  
  const scale = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.02]
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.brandRow}>
          <Ionicons name="heart-circle" size={32} color={colors.primary} />
          <View>
            <Text style={styles.appTitle}>Bay<Text style={{color: colors.primary}}>Max</Text></Text>
            <Text style={styles.appSubtitle}>Your Health • Your Knowledge • Our Care</Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={28} color={colors.black} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      
      {/* Greeting and Image Row */}
      <View style={styles.greetingRow}>
        <View style={styles.greetingTextContainer}>
          <Text style={styles.greetingText}>{greeting.text}</Text>
          <Text style={styles.greetingHighlight}>there! {greeting.icon}</Text>
          <Text style={styles.subGreeting}>How are you feeling today?</Text>
        </View>
        <View style={styles.robotContainer}>
          <Animated.View style={[styles.speechBubble, { opacity: bubbleOpacity }]}>
            <Text style={styles.speechBubbleText}>Hi! 👋</Text>
          </Animated.View>
          <Animated.Image 
            source={require('../../../assets/baymax_robot.jpg')} 
            style={[styles.baymaxImage, { transform: [{ translateY }, { scale }] }]}
          />
        </View>
      </View>



      {/* Quick Actions Header */}
      <View style={styles.sectionHeaderRow}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="grid" size={20} color={colors.primary} style={{marginRight: 8}} />
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#FFF9E6'}]} onPress={() => navigation.navigate('HealthTab')}>
          <View style={styles.iconWrapper}>
            <Ionicons name="chatbubbles" size={24} color={colors.black} />
          </View>
          <Text style={styles.gridText}>AI Health</Text>
          <Text style={styles.gridSubText}>Get instant health advice from Baymax</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#FFEEEE'}]} onPress={() => navigation.navigate('FirstAidTab')}>
          <View style={styles.iconWrapper}>
            <Ionicons name="medkit" size={24} color="#FF4D4D" />
          </View>
          <Text style={styles.gridText}>First Aid</Text>
          <Text style={styles.gridSubText}>Learn & practice life-saving skills</Text>

        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#EEF5FF'}]} onPress={() => navigation.navigate('MedicineHome')}>
          <View style={styles.iconWrapper}>
            <Ionicons name="bandage" size={24} color="#0066FF" />
          </View>
          <Text style={styles.gridText}>Medicine</Text>
          <Text style={styles.gridSubText}>Track your daily medications</Text>

        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#EEFFE8'}]} onPress={() => navigation.navigate('WellnessDashboard')}>
          <View style={styles.iconWrapper}>
            <Ionicons name="fitness" size={24} color="#339933" />
          </View>
          <Text style={styles.gridText}>Wellness</Text>
          <Text style={styles.gridSubText}>Meditation & fitness tracking</Text>

        </TouchableOpacity>
      </View>
      
      <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, marginBottom: 20, paddingHorizontal: 20 },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  appTitle: { fontSize: 24, fontWeight: '900', color: colors.black, marginLeft: 8 },
  appSubtitle: { fontSize: 10, color: colors.darkGray, marginLeft: 8 },
  
  scrollView: { paddingHorizontal: 20 },

  greetingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  greetingTextContainer: { flex: 1 },
  greetingText: { fontSize: 32, fontWeight: '900', color: colors.black, lineHeight: 40 },
  greetingHighlight: { fontSize: 32, fontWeight: '900', color: colors.primary, marginBottom: 15 },
  subGreeting: { fontSize: 18, color: colors.black },
  robotContainer: { position: 'relative', alignItems: 'flex-end' },
  baymaxImage: { width: 150, height: 180, resizeMode: 'contain', marginLeft: 10 },
  speechBubble: {
    position: 'absolute',
    top: -10,
    right: 100,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  speechBubbleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.white, 
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchIcon: { marginRight: 15 },
  searchInput: { flex: 1, fontSize: 16, color: colors.black },
  micButton: { backgroundColor: colors.primary, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: colors.black },
  viewAllText: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { 
    width: '48%', 
    borderRadius: 24, 
    padding: 16, 
    marginBottom: 16, 
    alignItems: 'flex-start',
    minHeight: 140
  },
  iconWrapper: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  gridText: { fontSize: 18, fontWeight: '900', color: colors.black, marginBottom: 8 },
  gridSubText: { fontSize: 14, color: '#555', lineHeight: 20 },
  arrowButton: { backgroundColor: colors.primary, width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 15, right: 15 }
});

export default HomeDashboard;

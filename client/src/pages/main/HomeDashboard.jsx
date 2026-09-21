import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Platform, Image, Linking, Alert, PermissionsAndroid, Dimensions } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';
import { getLearningDataForCondition } from '../../data/learningData';
import { generateLlmResponse } from '../../services/llmService';
import { userService } from '../../services/userService';

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

    const generateLessonsInBackground = async () => {
      if (!user || !user.health?.chronicConditions) return;
      
      const generatedLessons = user.generatedLessons || [];
      const updatedLessons = [...generatedLessons];
      let hasNewLessons = false;

      for (const condition of user.health.chronicConditions) {
        const data = getLearningDataForCondition(condition);
        if (!data || !data.lessons) continue;

        for (const lesson of data.lessons) {
          // Check if lesson already generated
          const exists = updatedLessons.find(
            l => l.condition === condition && l.title === lesson.title
          );
          
          if (!exists) {
            try {
              console.log(`Generating lesson for ${condition}: ${lesson.title}`);
              const prompt = `Generate an educational health lesson about "${lesson.title}" for a patient with "${condition}". Output MUST be valid JSON with a "content" string. Do not include markdown \`\`\` wrappers, just valid JSON like: {"content": "Your lesson text here. Use \\n\\n for paragraphs."}`;
              const response = await generateLlmResponse(prompt);
              
              let cleanResponse = response.trim();
              if (cleanResponse.startsWith('\`\`\`json')) cleanResponse = cleanResponse.substring(7);
              else if (cleanResponse.startsWith('\`\`\`')) cleanResponse = cleanResponse.substring(3);
              if (cleanResponse.endsWith('\`\`\`')) cleanResponse = cleanResponse.substring(0, cleanResponse.length - 3);
              
              const parsed = JSON.parse(cleanResponse);
              
              if (parsed.content) {
                updatedLessons.push({
                  condition,
                  title: lesson.title,
                  content: parsed.content
                });
                hasNewLessons = true;
                console.log(`Successfully generated lesson: ${lesson.title}`);
              }
            } catch (err) {
              console.log(`Failed to generate lesson ${lesson.title}`, err);
            }
          }
        }
      }

      if (hasNewLessons) {
        try {
          const updatedUser = await userService.updateProfile({ generatedLessons: updatedLessons });
          await updateUser(updatedUser);
        } catch (e) {
          console.log("Failed to save generated lessons to profile");
        }
      }
    };

    generateLessonsInBackground();

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

  const handleCallEmergencyContact = async () => {
    if (user?.emergencyContacts && user.emergencyContacts.length > 0) {
      const firstContact = user.emergencyContacts[0];
      
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            {
              title: 'Phone Call Permission',
              message: 'BayMax needs permission to make phone calls automatically for emergency situations.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            RNImmediatePhoneCall.immediatePhoneCall(firstContact.phone);
          } else {
            Alert.alert(
              'Permission Denied',
              'Without permission, BayMax can only open the dialer. Would you like to do that?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Dialer', onPress: () => Linking.openURL(`tel:${firstContact.phone}`) }
              ]
            );
          }
        } else {
          RNImmediatePhoneCall.immediatePhoneCall(firstContact.phone);
        }
      } catch (err) {
        console.warn(err);
        // Fallback to standard Linking if native module fails or is missing
        Linking.openURL(`tel:${firstContact.phone}`).catch(() => {
          Alert.alert('Error', 'Failed to open dialer. Make sure your device supports phone calls.');
        });
      }
    } else {
      Alert.alert(
        'No Emergency Contacts',
        'You have not added any emergency contacts yet.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add Contact', onPress: () => navigation.navigate('EmergencyInformation') }
        ]
      );
    }
  };

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
            source={require('../../../assets/baymax_robot.png')} 
            style={[styles.baymaxImage, { transform: [{ translateY }, { scale }] }]}
          />
        </View>
      </View>

      {/* Emergency Actions Row */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 22 }}>
        {/* Emergency Mode Entry */}
        <TouchableOpacity 
          style={[styles.emergencyButton, { flex: 1, marginBottom: 0, paddingHorizontal: 12 }]} 
          onPress={() => navigation.navigate('OfflineEmergencyMode')}
          activeOpacity={0.88}
        >
          <Ionicons name="warning" size={24} color={colors.white} style={{ marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.emergencyTitle, { fontSize: 15 }]}>
              Emergency Guide
            </Text>
            <Text style={[styles.emergencySub, { fontSize: 11 }]} numberOfLines={1}>
              Offline aid
            </Text>
          </View>
        </TouchableOpacity>

        {/* Call Emergency Contact */}
        <TouchableOpacity 
          style={[styles.emergencyButton, { flex: 1, marginBottom: 0, paddingHorizontal: 12 }]} 
          onPress={handleCallEmergencyContact}
          activeOpacity={0.88}
        >
          <Ionicons name="call" size={24} color={colors.white} style={{ marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.emergencyTitle, { fontSize: 16 }]}>
              CONTACT
            </Text>
            <Text style={[styles.emergencySub, { fontSize: 11 }]} numberOfLines={1}>
              Call now
            </Text>
          </View>
        </TouchableOpacity>
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
            <Image source={require('../../../assets/labels/Ai-health.png')} style={{width: 70, height: 70, resizeMode: 'contain'}} />
          </View>
          <Text style={styles.gridText}>AI Health</Text>
          <Text style={styles.gridSubText}>Get instant health advice from Baymax</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#FFEEEE'}]} onPress={() => navigation.navigate('FirstAidTab')}>
          <View style={styles.iconWrapper}>
            <Image source={require('../../../assets/labels/first-aid.png')} style={{width: 70, height: 70, resizeMode: 'contain'}} />
          </View>
          <Text style={styles.gridText}>First Aid</Text>
          <Text style={styles.gridSubText}>Learn & practice life-saving skills</Text>

        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#EEF5FF'}]} onPress={() => navigation.navigate('MedicineHome')}>
          <View style={styles.iconWrapper}>
            <Image source={require('../../../assets/labels/medicine.png')} style={{width: 70, height: 70, resizeMode: 'contain'}} />
          </View>
          <Text style={styles.gridText}>Medicine</Text>
          <Text style={styles.gridSubText}>Track your daily medications</Text>

        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.gridItem, {backgroundColor: '#EEFFE8'}]} onPress={() => navigation.navigate('WellnessDashboard')}>
          <View style={styles.iconWrapper}>
            <Image source={require('../../../assets/labels/wellness.png')} style={{width: 70, height: 70, resizeMode: 'contain'}} />
          </View>
          <Text style={styles.gridText}>Wellness</Text>
          <Text style={styles.gridSubText}>Meditation & fitness tracking</Text>

        </TouchableOpacity>
      </View>
      
      {/* Continue Learning Card */}
      <TouchableOpacity 
        style={styles.learningCard} 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('LearningTab')}
      >
        <View style={styles.learningIconContainer}>
          <Ionicons name="book" size={32} color={colors.black} />
        </View>
        
        <View style={styles.learningTextContainer}>
          <Text style={styles.learningTitle}>Continue Learning</Text>
          <Text style={styles.learningSub}>Build a healthier you, one lesson at a time!</Text>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressActive} />
            <View style={styles.progressInactive} />
            <View style={styles.progressInactive} />
            <View style={styles.progressInactive} />
            <View style={styles.progressInactive} />
          </View>
        </View>

        <View style={styles.learningArrowButton}>
          <Ionicons name="arrow-forward" size={20} color={colors.black} />
        </View>
      </TouchableOpacity>

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
    minHeight: 170
  },
  iconWrapper: { width: 70, height: 70, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  gridText: { fontSize: 18, fontWeight: '900', color: colors.black, marginBottom: 8 },
  gridSubText: { fontSize: 14, color: '#555', lineHeight: 20 },
  arrowButton: { backgroundColor: colors.primary, width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 15, right: 15 },
  
  emergencyButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  emergencyTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  emergencySub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  
  learningCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700', // yellow accent
  },
  learningIconContainer: {
    backgroundColor: '#FFD700',
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  learningTextContainer: {
    flex: 1,
  },
  learningTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  learningSub: {
    color: '#AAA',
    fontSize: 12,
    marginBottom: 10,
  },

  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressActive: {
    width: 30,
    height: 4,
    backgroundColor: '#FFD700',
    borderRadius: 2,
    marginRight: 4,
  },
  progressInactive: {
    width: 20,
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
    marginRight: 4,
  },
  learningArrowButton: {
    backgroundColor: '#FFD700',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  }
});

export default HomeDashboard;

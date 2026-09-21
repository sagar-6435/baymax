import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Image, Animated, Dimensions, Platform, Linking, PermissionsAndroid, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { colors, globalStyles } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';
import { getLearningDataForCondition } from '../../data/learningData';
import { generateLlmResponse } from '../../services/llmService';
import { userService } from '../../services/userService';

const baymaxVideoSource = require('../../../assets/Robot.mp4');

const HomeDashboard = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 380;

  const [greeting, setGreeting] = useState({ text: 'Good\nMorning', icon: '☀️' });
  const bubbleOpacity = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Video player configuration
  const player = useVideoPlayer(baymaxVideoSource, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  // Manage video playback based on screen focus lifecycle
  useFocusEffect(
    useCallback(() => {
      if (player) {
        player.play();
      }
      return () => {
        if (player) {
          player.pause();
        }
      };
    }, [player])
  );

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
          const exists = updatedLessons.find(
            l => l.condition === condition && l.title === lesson.title
          );
          
          if (!exists) {
            try {
              console.log(`Generating lesson for ${condition}: ${lesson.title}`);
              
              // Use hardcoded content for prototype
              const content = `Welcome to the lesson on "${lesson.title}".\n\nManaging ${condition} requires a comprehensive approach. It's important to understand your symptoms and communicate effectively with your healthcare provider.\n\nKey steps include maintaining a balanced lifestyle, following your prescribed care plan, and monitoring for any changes.\n\nAlways remember to consult a professional before making major changes to your routine. Stay healthy!`;
              
              updatedLessons.push({
                condition,
                title: lesson.title,
                content: content
              });
              hasNewLessons = true;
              console.log(`Successfully generated lesson: ${lesson.title}`);
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

    // Friendly speech bubble entrance animation
    Animated.sequence([
      Animated.delay(600),
      Animated.timing(bubbleOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(bubbleOpacity, { toValue: 0, duration: 400, useNativeDriver: true })
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
          <Ionicons name="heart-circle" size={isLargeScreen ? 36 : 32} color={colors.primary} />
          <View>
            <Text style={[styles.appTitle, { fontSize: isLargeScreen ? 26 : 24 }]}>
              Bay<Text style={{ color: colors.primary }}>Max</Text>
            </Text>
            <Text style={[styles.appSubtitle, { fontSize: isLargeScreen ? 11 : 10 }]}>
              Your Health • Your Knowledge • Our Care
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={isLargeScreen ? 30 : 28} color={colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      
      {/* Greeting and Image Row */}
      <View style={styles.greetingRow}>
        <View style={styles.greetingTextContainer}>
          <Text style={styles.greetingText}>{greeting.text}</Text>
          <Text style={[styles.greetingHighlight, isLargeScreen && styles.greetingHighlightLarge]}>there! {greeting.icon}</Text>
          <Text style={[styles.subGreeting, isLargeScreen && styles.subGreetingLarge, { marginTop: 4 }]}>How are you feeling today?</Text>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="grid" size={isLargeScreen ? 22 : 20} color={colors.primary} style={{ marginRight: 8 }} />
          <Text style={[styles.sectionTitle, isLargeScreen && styles.sectionTitleLarge]}>
            Quick Actions
          </Text>
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
  container: { 
    flex: 1, 
    backgroundColor: colors.white 
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: Platform.OS === 'ios' ? 12 : 20, 
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white
  },
  brandRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  },
  appTitle: { 
    fontWeight: '900', 
    letterSpacing: -0.5,
    color: colors.black
  },
  appSubtitle: { 
    color: colors.darkGray, 
    fontWeight: '600',
    marginTop: -2
  },

  scrollView: { 
    flex: 1 
  },
  scrollContent: { 
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24 
  },

  greetingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16,
    minHeight: 120
  },
  greetingTextContainer: { 
    flex: 1,
    paddingRight: 10
  },
  greetingText: { 
    fontSize: 28, 
    fontWeight: '900', 
    color: colors.black, 
    lineHeight: 34,
    letterSpacing: -0.5
  },
  greetingTextLarge: { 
    fontSize: 34, 
    lineHeight: 40 
  },
  greetingHighlight: { 
    fontSize: 28, 
    fontWeight: '900', 
    color: colors.primary,
    lineHeight: 34,
    letterSpacing: -0.5,
    marginTop: 2
  },
  greetingHighlightLarge: { 
    fontSize: 34, 
    lineHeight: 40 
  },

  feelingContainer: {
    marginBottom: 20
  },
  subGreeting: { 
    fontSize: 18, 
    fontWeight: '700',
    color: colors.black,
    letterSpacing: -0.2
  },
  subGreetingLarge: { 
    fontSize: 20 
  },

  robotContainer: { 
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative'
  },
  baymaxImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  speechBubble: {
    position: 'absolute',
    top: -12,
    right: 40,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  speechBubbleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.black,
  },

  emergencyButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginBottom: 22,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  emergencyButtonLarge: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 24
  },
  emergencyTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  emergencyTitleLarge: {
    fontSize: 20,
  },
  emergencySub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 4
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.black,
    letterSpacing: -0.3
  },
  sectionTitleLarge: {
    fontSize: 20
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  gridItem: {
    width: '48%',
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrapper: {
    marginBottom: 12
  },
  gridText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.black,
    marginBottom: 2
  },
  gridSubText: {
    fontSize: 11,
    color: colors.darkGray,
    fontWeight: '600',
    lineHeight: 14
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
    borderColor: '#FFD700',
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

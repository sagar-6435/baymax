import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, useWindowDimensions, Platform, Image, Linking, Alert, PermissionsAndroid } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
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
              const prompt = `Generate an educational health lesson about "${lesson.title}" for a patient with "${condition}". Output MUST be valid JSON with a "content" string. Do not include markdown \`\`\` wrappers, just valid JSON like: {"content": "Your lesson text here. Use \\n\\n for paragraphs."}`;
              const response = await generateLlmResponse(prompt);
              
              let cleanResponse = response.trim();
              if (cleanResponse.startsWith('```json')) cleanResponse = cleanResponse.substring(7);
              else if (cleanResponse.startsWith('```')) cleanResponse = cleanResponse.substring(3);
              if (cleanResponse.endsWith('```')) cleanResponse = cleanResponse.substring(0, cleanResponse.length - 3);
              
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

    // Friendly speech bubble entrance animation
    Animated.sequence([
      Animated.delay(600),
      Animated.timing(bubbleOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(bubbleOpacity, { toValue: 0, duration: 400, useNativeDriver: true })
    ]).start();
  }, []);

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

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting and BayMax Video Row */}
        <View style={styles.greetingRow}>
          <View style={styles.greetingTextContainer}>
            <Text style={[styles.greetingText, isLargeScreen && styles.greetingTextLarge]}>
              {greeting.text}
            </Text>
            <Text style={[styles.greetingHighlight, isLargeScreen && styles.greetingHighlightLarge]}>
              there! {greeting.icon}
            </Text>
          </View>
          <View style={styles.robotContainer}>
            <View style={styles.videoWrapper}>
              <VideoView
                player={player}
                style={styles.baymaxVideo}
                nativeControls={false}
                contentFit="contain"
              />
            </View>
          </View>
        </View>

        {/* Feeling Text Prompt */}
        <View style={styles.feelingContainer}>
          <Text style={[styles.subGreeting, isLargeScreen && styles.subGreetingLarge]}>
            How are you feeling today?
          </Text>
        </View>

        {/* Emergency Actions Row */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 22 }}>
          {/* Emergency Mode Entry */}
          <TouchableOpacity 
            style={[styles.emergencyButton, isLargeScreen && styles.emergencyButtonLarge, { flex: 1, marginBottom: 0, paddingHorizontal: 12 }]} 
            onPress={() => navigation.navigate('OfflineEmergencyMode')}
            activeOpacity={0.88}
          >
            <Ionicons name="warning" size={isLargeScreen ? 28 : 24} color={colors.white} style={{ marginRight: 8 }} />
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
            style={[styles.emergencyButton, isLargeScreen && styles.emergencyButtonLarge, { flex: 1, marginBottom: 0, paddingHorizontal: 12 }]} 
            onPress={handleCallEmergencyContact}
            activeOpacity={0.88}
          >
            <Ionicons name="call" size={isLargeScreen ? 28 : 24} color={colors.white} style={{ marginRight: 8 }} />
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

        {/* 2x2 Grid */}
        <View style={styles.grid}>
          <TouchableOpacity 
            style={[styles.gridItem, isLargeScreen && styles.gridItemLarge, { backgroundColor: '#FFF9E6' }]} 
            onPress={() => navigation.navigate('HealthTab')}
            activeOpacity={0.85}
          >
            <View style={[styles.iconWrapper, isLargeScreen && styles.iconWrapperLarge]}>
              <Image source={require('../../../assets/labels/Ai-health.png')} style={styles.actionIconImage} />
            </View>
            <View style={styles.cardTextContent}>
              <Text style={[styles.gridText, isLargeScreen && styles.gridTextLarge]}>AI Health</Text>
              <Text style={[styles.gridSubText, isLargeScreen && styles.gridSubTextLarge]}>
                Get instant health advice from Baymax
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridItem, isLargeScreen && styles.gridItemLarge, { backgroundColor: '#FFEEEE' }]} 
            onPress={() => navigation.navigate('FirstAidTab')}
            activeOpacity={0.85}
          >
            <View style={[styles.iconWrapper, isLargeScreen && styles.iconWrapperLarge]}>
              <Image source={require('../../../assets/labels/first-aid.png')} style={styles.actionIconImage} />
            </View>
            <View style={styles.cardTextContent}>
              <Text style={[styles.gridText, isLargeScreen && styles.gridTextLarge]}>First Aid</Text>
              <Text style={[styles.gridSubText, isLargeScreen && styles.gridSubTextLarge]}>
                Learn & practice life-saving skills
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.gridItem, isLargeScreen && styles.gridItemLarge, { backgroundColor: '#EEF5FF' }]} 
            onPress={() => navigation.navigate('MedicineHome')}
            activeOpacity={0.85}
          >
            <View style={[styles.iconWrapper, isLargeScreen && styles.iconWrapperLarge]}>
              <Image source={require('../../../assets/labels/medicine.png')} style={styles.actionIconImage} />
            </View>
            <View style={styles.cardTextContent}>
              <Text style={[styles.gridText, isLargeScreen && styles.gridTextLarge]}>Medicine</Text>
              <Text style={[styles.gridSubText, isLargeScreen && styles.gridSubTextLarge]}>
                Track your daily medications
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.gridItem, isLargeScreen && styles.gridItemLarge, { backgroundColor: '#EEFFE8' }]} 
            onPress={() => navigation.navigate('WellnessDashboard')}
            activeOpacity={0.85}
          >
            <View style={[styles.iconWrapper, isLargeScreen && styles.iconWrapperLarge]}>
              <Image source={require('../../../assets/labels/wellness.png')} style={styles.actionIconImage} />
            </View>
            <View style={styles.cardTextContent}>
              <Text style={[styles.gridText, isLargeScreen && styles.gridTextLarge]}>Wellness</Text>
              <Text style={[styles.gridSubText, isLargeScreen && styles.gridSubTextLarge]}>
                Meditation & fitness tracking
              </Text>
            </View>
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
            <Text style={[styles.learningTitle, isLargeScreen && styles.learningTitleLarge]}>Continue Learning</Text>
            <Text style={[styles.learningSub, isLargeScreen && styles.learningSubLarge]}>Build a healthier you, one lesson at a time!</Text>
            
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

        <View style={{ height: 40 }} />
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
  videoWrapper: {
    width: '100%',
    maxWidth: 180,
    aspectRatio: 16 / 9,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.white
  },
  baymaxVideo: { 
    width: '100%', 
    height: '100%' 
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
    color: 'rgba(255,255,255,0.92)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  emergencySubLarge: {
    fontSize: 14,
  },

  sectionHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '900', 
    color: colors.black 
  },
  sectionTitleLarge: { 
    fontSize: 22 
  },

  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  gridItem: { 
    width: '48%', 
    borderRadius: 24, 
    padding: 16, 
    marginBottom: 16, 
    alignItems: 'flex-start',
    minHeight: 160,
    justifyContent: 'space-between'
  },
  gridItemLarge: { 
    padding: 18, 
    minHeight: 175,
    marginBottom: 18
  },
  iconWrapper: { 
    width: 60, 
    height: 60, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  iconWrapperLarge: { 
    width: 66, 
    height: 66, 
    borderRadius: 18, 
    marginBottom: 14 
  },
  actionIconImage: {
    width: 56,
    height: 56,
    resizeMode: 'contain'
  },
  cardTextContent: {
    width: '100%'
  },
  gridText: { 
    fontSize: 18, 
    fontWeight: '900', 
    color: colors.black, 
    marginBottom: 6 
  },
  gridTextLarge: { 
    fontSize: 20, 
    marginBottom: 8 
  },
  gridSubText: { 
    fontSize: 13, 
    color: '#4B5563', 
    lineHeight: 19 
  },
  gridSubTextLarge: { 
    fontSize: 14, 
    lineHeight: 21 
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
  learningTitleLarge: {
    fontSize: 20,
  },
  learningSub: {
    color: '#AAA',
    fontSize: 12,
    marginBottom: 10,
  },
  learningSubLarge: {
    fontSize: 13,
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

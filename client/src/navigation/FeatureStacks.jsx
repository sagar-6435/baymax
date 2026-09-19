import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Home
import HomeDashboard from '../pages/main/HomeDashboard';
import NotificationsScreen from '../pages/main/NotificationsScreen';
import GlobalSearchScreen from '../pages/main/GlobalSearchScreen';
import AiHealthAssistant from '../pages/health/AiHealthAssistant';
import ChatHistory from '../pages/health/ChatHistory';
import DetailedChatHistory from '../pages/health/DetailedChatHistory';
import AiResponseHealthAssessment from '../pages/health/AiResponseHealthAssessment';
import HealthFollowUpConversation from '../pages/health/HealthFollowUpConversation';
import HealthConversationHistory from '../pages/health/HealthConversationHistory';

// First Aid
import FirstAidHome from '../pages/firstaid/FirstAidHome';
import FirstAidCategorySelection from '../pages/firstaid/FirstAidCategorySelection';
import CprTutorial from '../pages/firstaid/CprTutorial';
import BleedingTutorial from '../pages/firstaid/BleedingTutorial';
import BurnsTutorial from '../pages/firstaid/BurnsTutorial';
import FractureInjuryTutorial from '../pages/firstaid/FractureInjuryTutorial';
import FirstAidCompletionSummary from '../pages/firstaid/FirstAidCompletionSummary';

// Learning
import LearningDashboard from '../pages/learning/LearningDashboard';
import LearningCategories from '../pages/learning/LearningCategories';
import AnatomyModule from '../pages/learning/AnatomyModule';
import NutritionModule from '../pages/learning/NutritionModule';
import DiseaseModule from '../pages/learning/DiseaseModule';
import FirstAidLearningModule from '../pages/learning/FirstAidLearningModule';
import MedicationSafetyModule from '../pages/learning/MedicationSafetyModule';
import LessonDetails from '../pages/learning/LessonDetails';
import InteractiveLesson from '../pages/learning/InteractiveLesson';
import Quiz from '../pages/learning/Quiz';
import QuizQuestion from '../pages/learning/QuizQuestion';
import QuizResult from '../pages/learning/QuizResult';
import ReviewAnswers from '../pages/learning/ReviewAnswers';
import LearningProgress from '../pages/learning/LearningProgress';
import AchievementsBadges from '../pages/learning/AchievementsBadges';

// Medicine
import MedicineHome from '../pages/medicine/MedicineHome';
import MedicineScanner from '../pages/medicine/MedicineScanner';
import CameraScanResult from '../pages/medicine/CameraScanResult';
import MedicineDetails from '../pages/medicine/MedicineDetails';
import SideEffectsInformation from '../pages/medicine/SideEffectsInformation';
import DosageSafetyInformation from '../pages/medicine/DosageSafetyInformation';
import MedicineUsesPurpose from '../pages/medicine/MedicineUsesPurpose';
import MedicineReminderList from '../pages/medicine/MedicineReminderList';
import AddMedicineReminder from '../pages/medicine/AddMedicineReminder';
import EditMedicineReminder from '../pages/medicine/EditMedicineReminder';
import MedicineLearningQuiz from '../pages/medicine/MedicineLearningQuiz';

// Profile
import Profile from '../pages/profile/Profile';
import Settings from '../pages/settings/Settings';
import PrivacyCenter from '../pages/privacy/PrivacyCenter';
import PersonalInformation from '../pages/profile/PersonalInformation';
import HealthPreferences from '../pages/profile/HealthPreferences';
import EmergencyInformation from '../pages/profile/EmergencyInformation';

// Wellness
import WellnessDashboard from '../pages/wellness/WellnessDashboard';
import MoodCheck from '../pages/wellness/MoodCheck';
import MoodResult from '../pages/wellness/MoodResult';
import BreathingExercise from '../pages/wellness/BreathingExercise';
import RelaxationExercise from '../pages/wellness/RelaxationExercise';
import ActivitySummary from '../pages/wellness/ActivitySummary';
import WellnessRecommendations from '../pages/wellness/WellnessRecommendations';
import WellnessHistory from '../pages/wellness/WellnessHistory';

const Stack = createNativeStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeDashboard" component={HomeDashboard} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="GlobalSearch" component={GlobalSearchScreen} />
    <Stack.Screen name="MedicineHome" component={MedicineHome} />
    <Stack.Screen name="MedicineScanner" component={MedicineScanner} />
    <Stack.Screen name="CameraScanResult" component={CameraScanResult} />
    <Stack.Screen name="MedicineDetails" component={MedicineDetails} />
    <Stack.Screen name="SideEffectsInformation" component={SideEffectsInformation} />
    <Stack.Screen name="DosageSafetyInformation" component={DosageSafetyInformation} />
    <Stack.Screen name="MedicineUsesPurpose" component={MedicineUsesPurpose} />
    <Stack.Screen name="MedicineReminderList" component={MedicineReminderList} />
    <Stack.Screen name="AddMedicineReminder" component={AddMedicineReminder} />
    <Stack.Screen name="EditMedicineReminder" component={EditMedicineReminder} />
    <Stack.Screen name="MedicineLearningQuiz" component={MedicineLearningQuiz} />
    
    {/* Wellness integrated into HomeStack for easy access */}
    <Stack.Screen name="WellnessDashboard" component={WellnessDashboard} />
    <Stack.Screen name="MoodCheck" component={MoodCheck} />
    <Stack.Screen name="MoodResult" component={MoodResult} />
    <Stack.Screen name="BreathingExercise" component={BreathingExercise} />
    <Stack.Screen name="RelaxationExercise" component={RelaxationExercise} />
    <Stack.Screen name="ActivitySummary" component={ActivitySummary} />
    <Stack.Screen name="AiHealthAssistant" component={AiHealthAssistant} />
    <Stack.Screen name="ChatHistory" component={ChatHistory} />
    <Stack.Screen name="DetailedChatHistory" component={DetailedChatHistory} />
    <Stack.Screen name="WellnessRecommendations" component={WellnessRecommendations} />
    <Stack.Screen name="WellnessHistory" component={WellnessHistory} />
  </Stack.Navigator>
);

export const HealthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AiHealthAssistant" component={AiHealthAssistant} />
    <Stack.Screen name="ChatHistory" component={ChatHistory} />
    <Stack.Screen name="DetailedChatHistory" component={DetailedChatHistory} />
    <Stack.Screen name="AiResponseHealthAssessment" component={AiResponseHealthAssessment} />
    <Stack.Screen name="HealthFollowUpConversation" component={HealthFollowUpConversation} />
    <Stack.Screen name="HealthConversationHistory" component={HealthConversationHistory} />
  </Stack.Navigator>
);

export const FirstAidStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FirstAidHome" component={FirstAidHome} />
    <Stack.Screen name="FirstAidCategorySelection" component={FirstAidCategorySelection} />
    <Stack.Screen name="CprTutorial" component={CprTutorial} />
    <Stack.Screen name="BleedingTutorial" component={BleedingTutorial} />
    <Stack.Screen name="BurnsTutorial" component={BurnsTutorial} />
    <Stack.Screen name="FractureInjuryTutorial" component={FractureInjuryTutorial} />
    <Stack.Screen name="FirstAidCompletionSummary" component={FirstAidCompletionSummary} />
  </Stack.Navigator>
);

export const LearningStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LearningDashboard" component={LearningDashboard} />
    <Stack.Screen name="LearningCategories" component={LearningCategories} />
    <Stack.Screen name="AnatomyModule" component={AnatomyModule} />
    <Stack.Screen name="NutritionModule" component={NutritionModule} />
    <Stack.Screen name="DiseaseModule" component={DiseaseModule} />
    <Stack.Screen name="FirstAidLearningModule" component={FirstAidLearningModule} />
    <Stack.Screen name="MedicationSafetyModule" component={MedicationSafetyModule} />
    <Stack.Screen name="LessonDetails" component={LessonDetails} />
    <Stack.Screen name="InteractiveLesson" component={InteractiveLesson} />
    <Stack.Screen name="Quiz" component={Quiz} />
    <Stack.Screen name="QuizQuestion" component={QuizQuestion} />
    <Stack.Screen name="QuizResult" component={QuizResult} />
    <Stack.Screen name="ReviewAnswers" component={ReviewAnswers} />
    <Stack.Screen name="LearningProgress" component={LearningProgress} />
    <Stack.Screen name="AchievementsBadges" component={AchievementsBadges} />
  </Stack.Navigator>
);

export const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
    <Stack.Screen name="HealthPreferences" component={HealthPreferences} />
    <Stack.Screen name="EmergencyInformation" component={EmergencyInformation} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="PrivacyCenter" component={PrivacyCenter} />
  </Stack.Navigator>
);

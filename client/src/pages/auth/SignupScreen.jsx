import AppHeader from '../../components/AppHeader';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../theme';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const SignupScreen = ({ navigation }) => {
  const { register, googleLogin } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '633852806467-5oj5f8ki310usa88j5qg753e67dspqum.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      googleLogin(id_token).catch(err => {
        console.error('Google signup failed:', err);
        alert(err.message || 'Failed to sign up with Google');
      });
    }
  }, [response]);

  const handleGoogleLogin = () => {
    promptAsync();
  };

  const handleSignup = async () => {
    try {
      await register(name, email, password, phone);
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.message || 'Failed to sign up');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <AppHeader showBack={true} onBack={() => navigation.goBack()} />

        {/* Welcome Text */}
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Baymax and take control of your personal health journey.</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color={colors.darkGray} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={colors.darkGray}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color={colors.darkGray} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Enter your mobile number"
                placeholderTextColor={colors.darkGray}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address (Optional)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={colors.darkGray} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.darkGray}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.darkGray} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor={colors.darkGray}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={colors.darkGray} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <PrimaryButton title="Create Account" onPress={handleSignup} />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scrollContent: { flexGrow: 1, padding: 24, paddingTop: 50 },
  
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  
  welcomeSection: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.black, marginBottom: 12 },
  subtitle: { fontSize: 16, color: colors.darkGray, lineHeight: 24 },

  formContainer: { marginBottom: 40 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: colors.black, marginBottom: 8 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: globalStyles.cardRadius, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 16, height: 56
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: colors.black },
  eyeIcon: { padding: 8 },

  socialSection: { marginBottom: 40 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  divider: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { marginHorizontal: 16, color: colors.darkGray, fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  socialButtonsRow: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  socialButton: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center'
  },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingBottom: 20 },
  footerText: { color: colors.darkGray, fontSize: 16 },
  footerLink: { color: colors.primary, fontSize: 16, fontWeight: 'bold' }
});

export default SignupScreen;

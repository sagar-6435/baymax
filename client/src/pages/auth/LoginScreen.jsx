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

const LoginScreen = ({ navigation }) => {
  const { login, googleLogin } = useAuth();
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /* TEMPORARILY REMOVED GOOGLE SIGN-IN
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '633852806467-5oj5f8ki310usa88j5qg753e67dspqum.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      googleLogin(id_token).catch(err => {
        console.error('Google login failed:', err);
        alert(err.message || 'Failed to sign in with Google');
      });
    }
  }, [response]);

  const handleGoogleLogin = () => {
    promptAsync();
  };
  */

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrors({});

      // Validation
      if (!mobileOrEmail.trim()) {
        setErrors({ mobileOrEmail: 'Mobile number or email is required' });
        setLoading(false);
        return;
      }

      if (!password.trim()) {
        setErrors({ password: 'Password is required' });
        setLoading(false);
        return;
      }

      // Determine if input is email or mobile
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[0-9]{10,}$/; // Accepts 10 or more digits
      
      const isEmail = emailRegex.test(mobileOrEmail);
      const isMobile = mobileRegex.test(mobileOrEmail.replace(/\D/g, ''));

      if (!isEmail && !isMobile) {
        setErrors({ mobileOrEmail: 'Please enter a valid email address or mobile number' });
        setLoading(false);
        return;
      }

      const loginData = {
        [isEmail ? 'email' : 'mobile']: mobileOrEmail,
        password: password
      };

      await login(mobileOrEmail, password);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: error.message || 'Failed to login. Please try again.' });
      alert(error.message || 'Failed to login');
    } finally {
      setLoading(false);
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
          <Text style={styles.title}>Welcome Back! 👋</Text>
          <Text style={styles.subtitle}>Sign in to access your personal healthcare companion.</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number or Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={colors.darkGray} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Enter your email or mobile number"
                placeholderTextColor={colors.darkGray}
                keyboardType="default"
                autoCapitalize="none"
                value={mobileOrEmail}
                onChangeText={(text) => setMobileOrEmail(text.toLowerCase())}
              />
            </View>
            {errors.mobileOrEmail && <Text style={styles.errorText}>{errors.mobileOrEmail}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.darkGray} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={colors.darkGray}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={colors.darkGray} />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {errors.submit && <Text style={styles.errorText}>{errors.submit}</Text>}

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <PrimaryButton title={loading ? "Signing In..." : "Sign In"} onPress={handleLogin} disabled={loading} />
        </View>

        {/* Social Login (Temporarily Removed) */}
        {/* 
        <View style={styles.socialSection}>
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtonsRow}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
              <Ionicons name="logo-google" size={24} color={colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
        </View>
        */}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scrollContent: { flexGrow: 1, padding: 24, paddingTop: 50 },
  
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  brandTitle: { fontSize: 20, fontWeight: '900', letterSpacing: 2, color: colors.black, marginLeft: 10 },
  
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
  errorText: { color: colors.error || '#E74C3C', fontSize: 12, marginTop: 6, fontWeight: '500' },
  
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotPasswordText: { color: colors.black, fontWeight: 'bold', fontSize: 14 },

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

export default LoginScreen;

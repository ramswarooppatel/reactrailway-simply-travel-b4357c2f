
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';
import { StackParamList } from '../types';

type RegisterNavigationProp = NativeStackNavigationProp<StackParamList>;

const Register = () => {
  const navigation = useNavigation<RegisterNavigationProp>();
  const { signUp, session } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (session?.user) {
      navigation.navigate('HomeTabs');
    }
  }, [session]);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await signUp(email, password, name);
      
      if (error) throw error;
      
      // In a real app, might show verification required screen
      // For simplicity, we're relying on auth state change to navigate
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <Ionicons name="train" size={64} color={colors.primary} />
            <Text style={styles.appName}>RailConnect</Text>
          </View>
          
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
          
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.danger} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={colors.grey} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={colors.grey} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.grey} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password (min. 6 characters)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={colors.grey} 
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.registerButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>
          
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color={colors.textPrimary} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.termsText}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  appName: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: spacing.sm,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.danger + '15',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.sm,
    marginLeft: spacing.sm,
    flex: 1,
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: fontSize.md,
  },
  passwordToggle: {
    padding: spacing.sm,
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  registerButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  socialIcon: {
    marginRight: spacing.md,
  },
  socialButtonText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  loginText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});

export default Register;

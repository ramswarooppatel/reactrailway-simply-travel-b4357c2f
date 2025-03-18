
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';
import { StackParamList } from '../types';

type LoginNavigationProp = NativeStackNavigationProp<StackParamList>;

const Login = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { signIn, session } = useAuth();
  
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

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) throw error;
      
      // Navigation will happen automatically due to the useEffect above
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, navigate to a password reset screen
    Alert.alert('Reset Password', 'Password reset functionality will be available soon!');
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
          
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
          
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.danger} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.formContainer}>
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
                placeholder="Password"
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
              onPress={handleForgotPassword}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
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
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: spacing.xl,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  registerText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default Login;

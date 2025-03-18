import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';
import { fetchUserBookings } from '../services/trainService';
import { StackParamList } from '../types';

type ProfileNavigationProp = NativeStackNavigationProp<StackParamList>;

const Profile = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const { session, signOut } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session?.user) {
      // If not logged in, navigate to login screen
      navigation.navigate('Login');
      return;
    }

    // Fetch user bookings
    loadUserBookings();
  }, [session]);

  const loadUserBookings = async () => {
    if (!session?.user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await fetchUserBookings(session.user.id);
      if (error) throw error;
      if (data) setBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  if (!session?.user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text>Please log in to view your profile</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
        </View>
        
        <View style={styles.profileCard}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {session.user.user_metadata?.name ? 
                  session.user.user_metadata.name.substring(0, 2).toUpperCase() : 
                  session.user.email.substring(0, 2).toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{session.user.user_metadata?.name || 'User'}</Text>
              <Text style={styles.userEmail}>{session.user.email}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => Alert.alert('Coming Soon', 'Edit profile feature will be available soon!')}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('TravelHistory')}>
            <Ionicons name="time-outline" size={24} color={colors.primary} />
            <Text style={styles.settingText}>Travel History</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.grey} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('TicketManagement')}>
            <Ionicons name="document-text-outline" size={24} color={colors.primary} />
            <Text style={styles.settingText}>My Tickets</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.grey} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('HomeTabs', { screen: 'PnrStatus' })}>
            <Ionicons name="search-outline" size={24} color={colors.primary} />
            <Text style={styles.settingText}>PNR Status</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.grey} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('Coming Soon', 'Payment methods feature will be available soon!')}>
            <Ionicons name="card-outline" size={24} color={colors.primary} />
            <Text style={styles.settingText}>Payment Methods</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.grey} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Recent Bookings</Text>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : bookings.length > 0 ? (
          <View style={styles.bookingsContainer}>
            {bookings.map((booking, index) => (
              <View key={index} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.bookingTitle}>{booking.train_name}</Text>
                  <Text style={styles.pnrNumber}>PNR: {booking.pnr_number}</Text>
                </View>
                
                <View style={styles.bookingDetails}>
                  <View style={styles.bookingRoute}>
                    <Text style={styles.stationName}>{booking.source}</Text>
                    <View style={styles.routeLine}>
                      <View style={styles.dashedLine} />
                      <Ionicons name="train-outline" size={20} color={colors.primary} />
                      <View style={styles.dashedLine} />
                    </View>
                    <Text style={styles.stationName}>{booking.destination}</Text>
                  </View>
                  
                  <View style={styles.bookingInfo}>
                    <Text style={styles.bookingLabel}>Date</Text>
                    <Text style={styles.bookingValue}>{booking.travel_date}</Text>
                  </View>
                  
                  <View style={styles.bookingInfo}>
                    <Text style={styles.bookingLabel}>Status</Text>
                    <Text 
                      style={[
                        styles.bookingStatus, 
                        booking.status === 'Confirmed' ? styles.confirmedStatus : styles.waitingStatus
                      ]}
                    >
                      {booking.status}
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.viewTicketButton}
                  onPress={() => navigation.navigate('TicketManagement')}
                >
                  <Text style={styles.viewTicketButtonText}>View Ticket</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyBookings}>
            <Ionicons name="ticket-outline" size={64} color={colors.lightGrey} />
            <Text style={styles.emptyBookingsText}>No bookings found</Text>
            <TouchableOpacity 
              style={styles.bookNowButton}
              onPress={() => navigation.navigate('HomeTabs', { screen: 'TrainSearch' })}
            >
              <Text style={styles.bookNowButtonText}>Book a Train</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
    marginTop: spacing.lg,
  },
  loginButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  avatarText: {
    fontSize: fontSize.xl,
    color: colors.white,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  editProfileButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  settingsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.md,
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  bookingsContainer: {
    marginBottom: spacing.xl,
  },
  bookingCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  bookingTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  pnrNumber: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  bookingDetails: {
    marginBottom: spacing.md,
  },
  bookingRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  stationName: {
    fontSize: fontSize.md,
    fontWeight: '500',
    width: '35%',
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.lightGrey,
  },
  bookingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  bookingLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  bookingValue: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  bookingStatus: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  confirmedStatus: {
    color: colors.success,
  },
  waitingStatus: {
    color: colors.warning,
  },
  viewTicketButton: {
    backgroundColor: colors.primary + '20',
    borderRadius: 8,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  viewTicketButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  emptyBookings: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.xl,
  },
  emptyBookingsText: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  bookNowButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  bookNowButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
    paddingVertical: spacing.md,
  },
  signOutButtonText: {
    color: colors.danger,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
});

export default Profile;

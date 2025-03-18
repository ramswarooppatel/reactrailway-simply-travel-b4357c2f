
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';
import { fetchPopularStations, fetchTrains } from '../services/trainService';
import { StackParamList } from '../types';

type IndexNavigationProp = NativeStackNavigationProp<StackParamList>;

type PopularStation = {
  id: string;
  name: string;
  code: string;
};

const Index = () => {
  const navigation = useNavigation<IndexNavigationProp>();
  const { session } = useAuth();
  const [popularStations, setPopularStations] = useState<PopularStation[]>([]);
  const [popularRoutes, setPopularRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Fetch popular stations
      const { data: stationsData } = await fetchPopularStations();
      if (stationsData) {
        setPopularStations(stationsData);
      }

      // For popular routes, we'll just use some predefined routes
      // In a real app, you might fetch this from an analytics service
      const popularRoutesData = [
        { id: '1', from: 'NDLS', fromName: 'New Delhi', to: 'MMCT', toName: 'Mumbai Central', count: 1250 },
        { id: '2', from: 'NDLS', fromName: 'New Delhi', to: 'KOAA', toName: 'Kolkata', count: 980 },
        { id: '3', from: 'NDLS', fromName: 'New Delhi', to: 'MAS', toName: 'Chennai Central', count: 850 },
        { id: '4', from: 'MMCT', fromName: 'Mumbai Central', to: 'NDLS', toName: 'New Delhi', count: 1150 },
        { id: '5', from: 'SBC', fromName: 'Bangalore', to: 'MAS', toName: 'Chennai Central', count: 750 }
      ];
      setPopularRoutes(popularRoutesData);
      
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStationPress = (station: PopularStation) => {
    navigation.navigate('TrainSearch', { selectedStation: station });
  };

  const handleRoutePress = (route: any) => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    navigation.navigate('TrainListing', {
      source: route.from,
      destination: route.to,
      date: formattedDate
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading train information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>
              {session?.user ? `Welcome, ${session.user.user_metadata?.name || 'Traveler'}` : 'Welcome, Traveler'}
            </Text>
            <Text style={styles.subheaderText}>Where would you like to go today?</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Search Card */}
        <TouchableOpacity 
          style={styles.searchCard}
          onPress={() => navigation.navigate('TrainSearch')}
        >
          <Ionicons name="search" size={24} color={colors.primary} style={styles.searchIcon} />
          <Text style={styles.searchText}>Search for trains</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity 
            style={styles.quickActionItem}
            onPress={() => navigation.navigate('TrainSearch')}
          >
            <View style={[styles.quickActionIcon, {backgroundColor: colors.primary + '20'}]}>
              <Ionicons name="train-outline" size={22} color={colors.primary} />
            </View>
            <Text style={styles.quickActionText}>Book Ticket</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionItem}
            onPress={() => navigation.navigate('PnrStatus')}
          >
            <View style={[styles.quickActionIcon, {backgroundColor: colors.success + '20'}]}>
              <Ionicons name="document-text-outline" size={22} color={colors.success} />
            </View>
            <Text style={styles.quickActionText}>PNR Status</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionItem}
            onPress={() => navigation.navigate('TrainSchedules')}
          >
            <View style={[styles.quickActionIcon, {backgroundColor: colors.warning + '20'}]}>
              <Ionicons name="time-outline" size={22} color={colors.warning} />
            </View>
            <Text style={styles.quickActionText}>Schedules</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionItem}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={[styles.quickActionIcon, {backgroundColor: colors.danger + '20'}]}>
              <Ionicons name="person-outline" size={22} color={colors.danger} />
            </View>
            <Text style={styles.quickActionText}>Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Stations */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Stations</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularStationsContainer}
          >
            {popularStations.slice(0, 6).map((station) => (
              <TouchableOpacity 
                key={station.id}
                style={styles.stationCard}
                onPress={() => handleStationPress(station)}
              >
                <Text style={styles.stationCode}>{station.code}</Text>
                <Text style={styles.stationName}>{station.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Routes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          <View style={styles.popularRoutesContainer}>
            {popularRoutes.map((route) => (
              <TouchableOpacity 
                key={route.id}
                style={styles.routeCard}
                onPress={() => handleRoutePress(route)}
              >
                <View style={styles.routeInfo}>
                  <View style={styles.routeStations}>
                    <Text style={styles.routeStationCode}>{route.from}</Text>
                    <View style={styles.routeLine}>
                      <View style={styles.routeDot} />
                      <View style={styles.routeDash} />
                      <View style={styles.routeDot} />
                    </View>
                    <Text style={styles.routeStationCode}>{route.to}</Text>
                  </View>
                  <View style={styles.routeNames}>
                    <Text style={styles.routeStationName}>{route.fromName}</Text>
                    <Text style={styles.routeStationName}>{route.toName}</Text>
                  </View>
                </View>
                <View style={styles.routeTraffic}>
                  <Text style={styles.routeTrafficText}>{route.count}+ travelers</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Offers */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Offers & Promotions</Text>
          <View style={styles.offerCard}>
            <View style={styles.offerContent}>
              <Text style={styles.offerTitle}>Save up to 10% on AC bookings</Text>
              <Text style={styles.offerDescription}>Use code ACSAVER on bookings made before June 30</Text>
              <TouchableOpacity style={styles.offerButton}>
                <Text style={styles.offerButtonText}>COPY CODE</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.offerImageContainer}>
              <Ionicons name="ticket-outline" size={64} color={colors.primary} />
            </View>
          </View>
        </View>

        {/* Extra spacing at bottom */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  welcomeText: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subheaderText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: spacing.md,
  },
  searchText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  quickActionItem: {
    alignItems: 'center',
    width: '22%',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quickActionText: {
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  popularStationsContainer: {
    paddingRight: spacing.lg,
  },
  stationCard: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    marginRight: spacing.md,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stationCode: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  stationName: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  popularRoutesContainer: {
    marginTop: spacing.sm,
  },
  routeCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  routeInfo: {
    flex: 1,
  },
  routeStations: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  routeStationCode: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
    width: 50,
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: spacing.xs,
  },
  routeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  routeDash: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primary,
    marginHorizontal: spacing.xs,
  },
  routeNames: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeStationName: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    width: '48%',
  },
  routeTraffic: {
    backgroundColor: colors.primary + '10',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 16,
  },
  routeTrafficText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '600',
  },
  offerCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  offerContent: {
    flex: 3,
  },
  offerTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  offerDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  offerButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    fontSize: fontSize.xs,
    color: colors.white,
    fontWeight: 'bold',
  },
  offerImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;

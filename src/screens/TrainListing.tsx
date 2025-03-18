
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../styles/theme';
import { fetchTrains } from '../services/trainService';
import { StackParamList, Train } from '../types';

type TrainListingNavigationProp = NativeStackNavigationProp<StackParamList, 'TrainDetails'>;
type TrainListingRouteProp = RouteProp<StackParamList, 'TrainListing'>;

const TrainListing = () => {
  const navigation = useNavigation<TrainListingNavigationProp>();
  const route = useRoute<TrainListingRouteProp>();
  const { source, destination, date } = route.params;
  
  const [trains, setTrains] = useState<Train[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    departureTime: 'all',
    trainType: 'all',
    classType: 'all',
  });

  useEffect(() => {
    loadTrains();
  }, [source, destination, date]);

  const loadTrains = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await fetchTrains(source, destination, date);
      
      if (error) throw new Error(error.message);
      
      if (data && data.length > 0) {
        setTrains(data);
      } else {
        setTrains([]);
        setError('No trains found for this route and date.');
      }
    } catch (err) {
      console.error('Error fetching trains:', err);
      setError('Failed to fetch trains. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (train: Train) => {
    navigation.navigate('TrainDetails', { id: train.id });
  };

  const renderTrainItem = ({ item }: { item: Train }) => (
    <View style={styles.trainCard}>
      <View style={styles.trainHeader}>
        <View>
          <Text style={styles.trainName}>{item.name}</Text>
          <Text style={styles.trainNumber}>{item.number}</Text>
        </View>
        <View style={styles.daysContainer}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <View 
              key={index} 
              style={[
                styles.dayIndicator, 
                index % 2 === 0 && styles.dayAvailable
              ]}
            >
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.journeyContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{item.departureTime}</Text>
          <Text style={styles.stationCode}>{item.from.code}</Text>
        </View>
        
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{item.duration}</Text>
          <View style={styles.durationLine}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>
        </View>
        
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{item.arrivalTime}</Text>
          <Text style={styles.stationCode}>{item.to.code}</Text>
        </View>
      </View>

      <View style={styles.classesContainer}>
        {Object.entries(item.availability).map(([classType, availability], index) => (
          <View key={index} style={styles.classItem}>
            <Text style={styles.classType}>{formatClassType(classType)}</Text>
            <Text 
              style={[
                styles.availability,
                availability.includes('Available') ? styles.availableText : 
                availability.includes('WL') ? styles.waitlistText : styles.unavailableText
              ]}
            >
              {availability}
            </Text>
            <Text style={styles.price}>₹{item.price[classType]}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.detailsButton}
        onPress={() => handleViewDetails(item)}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const formatClassType = (classType: string): string => {
    switch (classType) {
      case 'sleeper': return 'Sleeper';
      case 'ac3Tier': return '3A';
      case 'ac2Tier': return '2A';
      case 'acFirstClass': return '1A';
      default: return classType;
    }
  };

  // Mocked trains for demo
  const mockTrains: Train[] = [
    {
      id: '1',
      number: '12301',
      name: 'Rajdhani Express',
      from: { name: 'New Delhi', code: 'NDLS' },
      to: { name: 'Mumbai Central', code: 'MMCT' },
      departureTime: '16:30',
      arrivalTime: '08:15',
      duration: '15h 45m',
      distance: 1384,
      price: {
        sleeper: 750,
        ac3Tier: 1950,
        ac2Tier: 2650,
        acFirstClass: 4500
      },
      availability: {
        sleeper: 'Available (36)',
        ac3Tier: 'Available (18)',
        ac2Tier: 'WL 12',
        acFirstClass: 'RAC 5'
      }
    },
    {
      id: '2',
      number: '12952',
      name: 'Mumbai Rajdhani',
      from: { name: 'New Delhi', code: 'NDLS' },
      to: { name: 'Mumbai Central', code: 'MMCT' },
      departureTime: '17:15',
      arrivalTime: '09:55',
      duration: '16h 40m',
      distance: 1384,
      price: {
        sleeper: 720,
        ac3Tier: 1850,
        ac2Tier: 2500,
        acFirstClass: 4350
      },
      availability: {
        sleeper: 'Available (52)',
        ac3Tier: 'Available (24)',
        ac2Tier: 'Available (8)',
        acFirstClass: 'WL 3'
      }
    },
    {
      id: '3',
      number: '22221',
      name: 'CSMT Rajdhani',
      from: { name: 'New Delhi', code: 'NDLS' },
      to: { name: 'Mumbai CSMT', code: 'CSMT' },
      departureTime: '16:00',
      arrivalTime: '10:05',
      duration: '18h 05m',
      distance: 1410,
      price: {
        sleeper: 680,
        ac3Tier: 1750,
        ac2Tier: 2450,
        acFirstClass: 4200
      },
      availability: {
        sleeper: 'WL 26',
        ac3Tier: 'RAC 14',
        ac2Tier: 'Available (4)',
        acFirstClass: 'Available (2)'
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{source} to {destination}</Text>
          <Text style={styles.headerSubtitle}>{new Date(date).toDateString()}</Text>
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        <ScrollableFilters 
          filters={filters}
          setFilters={setFilters}
        />
      </View>
      
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Searching for trains...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={colors.grey} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={loadTrains}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={mockTrains} // In a real app, use the actual trains data
          renderItem={renderTrainItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const ScrollableFilters = ({ 
  filters, 
  setFilters 
}: { 
  filters: { departureTime: string; trainType: string; classType: string };
  setFilters: React.Dispatch<React.SetStateAction<{ departureTime: string; trainType: string; classType: string }>>;
}) => {
  const departureOptions = [
    { label: 'All', value: 'all' },
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
    { label: 'Night', value: 'night' },
  ];
  
  const trainTypeOptions = [
    { label: 'All', value: 'all' },
    { label: 'Rajdhani', value: 'rajdhani' },
    { label: 'Shatabdi', value: 'shatabdi' },
    { label: 'Superfast', value: 'superfast' },
    { label: 'Express', value: 'express' },
  ];
  
  const classTypeOptions = [
    { label: 'All', value: 'all' },
    { label: 'Sleeper', value: 'sleeper' },
    { label: '3A', value: 'ac3Tier' },
    { label: '2A', value: 'ac2Tier' },
    { label: '1A', value: 'acFirstClass' },
  ];
  
  return (
    <View>
      <Text style={styles.filterTitle}>Departure Time</Text>
      <View style={styles.filterOptionsContainer}>
        {departureOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterOption,
              filters.departureTime === option.value && styles.filterOptionActive
            ]}
            onPress={() => setFilters({ ...filters, departureTime: option.value })}
          >
            <Text 
              style={[
                styles.filterOptionText,
                filters.departureTime === option.value && styles.filterOptionTextActive
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.filterTitle}>Train Type</Text>
      <View style={styles.filterOptionsContainer}>
        {trainTypeOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterOption,
              filters.trainType === option.value && styles.filterOptionActive
            ]}
            onPress={() => setFilters({ ...filters, trainType: option.value })}
          >
            <Text 
              style={[
                styles.filterOptionText,
                filters.trainType === option.value && styles.filterOptionTextActive
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.filterTitle}>Class Type</Text>
      <View style={styles.filterOptionsContainer}>
        {classTypeOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterOption,
              filters.classType === option.value && styles.filterOptionActive
            ]}
            onPress={() => setFilters({ ...filters, classType: option.value })}
          >
            <Text 
              style={[
                styles.filterOptionText,
                filters.classType === option.value && styles.filterOptionTextActive
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  filtersContainer: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  filterOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: colors.lightGrey,
    marginBottom: spacing.xs,
  },
  filterOptionActive: {
    backgroundColor: colors.primary,
  },
  filterOptionText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  filterOptionTextActive: {
    color: colors.white,
  },
  centerContainer: {
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
  errorText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: fontSize.md,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  listContent: {
    padding: spacing.lg,
  },
  trainCard: {
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
  trainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  trainName: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  trainNumber: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  daysContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  dayIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayAvailable: {
    backgroundColor: colors.primary + '30',
  },
  dayText: {
    fontSize: 8,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  journeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  timeContainer: {
    alignItems: 'center',
    width: 60,
  },
  timeText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stationCode: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  durationContainer: {
    flex: 1,
    alignItems: 'center',
  },
  durationText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  durationLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primary,
  },
  classesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  classItem: {
    width: '25%',
    paddingVertical: spacing.xs,
    alignItems: 'center',
  },
  classType: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  availability: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    marginBottom: 2,
  },
  availableText: {
    color: colors.success,
  },
  waitlistText: {
    color: colors.warning,
  },
  unavailableText: {
    color: colors.danger,
  },
  price: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  detailsButtonText: {
    color: colors.primary,
    fontWeight: '600',
    marginRight: spacing.xs,
  },
});

export default TrainListing;

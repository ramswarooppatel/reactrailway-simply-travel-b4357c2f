
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, fontSize } from '../styles/theme';
import { fetchPopularStations } from '../services/trainService';
import { StackParamList } from '../types';

type TrainSearchNavigationProp = NativeStackNavigationProp<StackParamList, 'TrainListing'>;
type TrainSearchRouteProp = RouteProp<StackParamList, 'TrainSearch'>;

type Station = {
  id: string;
  name: string;
  code: string;
};

const TrainSearch = () => {
  const navigation = useNavigation<TrainSearchNavigationProp>();
  const route = useRoute<TrainSearchRouteProp>();
  const selectedStationFromRoute = route.params?.selectedStation;
  
  const [sourceStation, setSourceStation] = useState<Station | null>(null);
  const [destinationStation, setDestinationStation] = useState<Station | null>(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<'departure' | 'return'>('departure');
  
  const [stations, setStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStations();
    
    // If a station was passed through route params, set it as source
    if (selectedStationFromRoute) {
      setSourceStation(selectedStationFromRoute);
    }
  }, [selectedStationFromRoute]);

  const loadStations = async () => {
    try {
      const { data, error } = await fetchPopularStations();
      if (error) throw error;
      
      if (data) {
        setStations(data);
        setFilteredStations(data);
      }
    } catch (error) {
      console.error('Error loading stations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterStations = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredStations(stations);
      return;
    }
    
    const filtered = stations.filter(station => 
      station.name.toLowerCase().includes(query.toLowerCase()) || 
      station.code.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredStations(filtered);
  };

  const handleStationSelect = (station: Station) => {
    if (showSourceModal) {
      setSourceStation(station);
      setShowSourceModal(false);
    } else if (showDestinationModal) {
      setDestinationStation(station);
      setShowDestinationModal(false);
    }
    
    setSearchQuery('');
    setFilteredStations(stations);
  };

  const handleSwapStations = () => {
    const temp = sourceStation;
    setSourceStation(destinationStation);
    setDestinationStation(temp);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    
    if (selectedDate) {
      if (datePickerMode === 'departure') {
        setDepartureDate(selectedDate);
        
        // If return date is earlier than new departure date, update it
        if (returnDate && returnDate < selectedDate) {
          setReturnDate(selectedDate);
        }
      } else {
        setReturnDate(selectedDate);
      }
    }
  };

  const handleToggleRoundTrip = () => {
    setIsRoundTrip(!isRoundTrip);
    if (!isRoundTrip && !returnDate) {
      // Set return date to day after departure by default
      const nextDay = new Date(departureDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setReturnDate(nextDay);
    }
  };

  const handleSearch = () => {
    if (!sourceStation || !destinationStation) {
      // Show error to user
      return;
    }
    
    // Check if source and destination are the same
    if (sourceStation.code === destinationStation.code) {
      // Show error to user
      return;
    }
    
    // Format dates
    const formattedDepartureDate = departureDate.toISOString().split('T')[0];
    const formattedReturnDate = returnDate ? returnDate.toISOString().split('T')[0] : undefined;
    
    navigation.navigate('TrainListing', {
      source: sourceStation.code,
      destination: destinationStation.code,
      date: formattedDepartureDate,
      returnDate: formattedReturnDate,
      isRoundTrip
    });
  };

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Search Trains</Text>
        </View>
        
        <View style={styles.searchCard}>
          {/* Source Station */}
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowSourceModal(true)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={20} color={colors.primary} />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>From</Text>
              {sourceStation ? (
                <View style={styles.stationContainer}>
                  <Text style={styles.stationName}>{sourceStation.name}</Text>
                  <Text style={styles.stationCode}>{sourceStation.code}</Text>
                </View>
              ) : (
                <Text style={styles.placeholderText}>Select source station</Text>
              )}
            </View>
          </TouchableOpacity>
          
          {/* Swap Button */}
          <TouchableOpacity 
            style={styles.swapButton}
            onPress={handleSwapStations}
            disabled={!sourceStation || !destinationStation}
          >
            <Ionicons 
              name="swap-vertical" 
              size={20} 
              color={(!sourceStation || !destinationStation) ? colors.lightGrey : colors.primary} 
            />
          </TouchableOpacity>
          
          {/* Destination Station */}
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowDestinationModal(true)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={20} color={colors.danger} />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>To</Text>
              {destinationStation ? (
                <View style={styles.stationContainer}>
                  <Text style={styles.stationName}>{destinationStation.name}</Text>
                  <Text style={styles.stationCode}>{destinationStation.code}</Text>
                </View>
              ) : (
                <Text style={styles.placeholderText}>Select destination station</Text>
              )}
            </View>
          </TouchableOpacity>
          
          {/* Date Selection */}
          <View style={styles.dateContainer}>
            {/* Departure Date */}
            <TouchableOpacity 
              style={styles.dateInputContainer}
              onPress={() => {
                setDatePickerMode('departure');
                setShowDatePicker(true);
              }}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="calendar" size={20} color={colors.primary} />
              </View>
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>Departure Date</Text>
                <Text style={styles.dateText}>{formatDate(departureDate)}</Text>
              </View>
            </TouchableOpacity>
            
            {/* Return Date (conditionally rendered) */}
            {isRoundTrip && (
              <TouchableOpacity 
                style={[styles.dateInputContainer, { marginTop: spacing.md }]}
                onPress={() => {
                  setDatePickerMode('return');
                  setShowDatePicker(true);
                }}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name="calendar" size={20} color={colors.primary} />
                </View>
                <View style={styles.inputContent}>
                  <Text style={styles.inputLabel}>Return Date</Text>
                  <Text style={styles.dateText}>
                    {returnDate ? formatDate(returnDate) : 'Select return date'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Round Trip Toggle */}
          <TouchableOpacity 
            style={styles.roundTripContainer}
            onPress={handleToggleRoundTrip}
          >
            <View style={[
              styles.checkBox, 
              isRoundTrip && { backgroundColor: colors.primary, borderColor: colors.primary }
            ]}>
              {isRoundTrip && <Ionicons name="checkmark" size={16} color={colors.white} />}
            </View>
            <Text style={styles.roundTripText}>Round Trip</Text>
          </TouchableOpacity>
          
          {/* Search Button */}
          <TouchableOpacity 
            style={[
              styles.searchButton,
              (!sourceStation || !destinationStation) && styles.searchButtonDisabled
            ]}
            onPress={handleSearch}
            disabled={!sourceStation || !destinationStation}
          >
            <Text style={styles.searchButtonText}>Search Trains</Text>
          </TouchableOpacity>
        </View>
        
        {/* Recent Searches (mock data) */}
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.recentSearches}>
            <TouchableOpacity 
              style={styles.recentSearchItem}
              onPress={() => {
                setSourceStation({ id: '1', name: 'New Delhi', code: 'NDLS' });
                setDestinationStation({ id: '2', name: 'Mumbai Central', code: 'MMCT' });
              }}
            >
              <View style={styles.recentSearchRoute}>
                <Text style={styles.recentSearchCode}>NDLS</Text>
                <View style={styles.recentSearchLine} />
                <Text style={styles.recentSearchCode}>MMCT</Text>
              </View>
              <Text style={styles.recentSearchText}>New Delhi - Mumbai Central</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.recentSearchItem}
              onPress={() => {
                setSourceStation({ id: '2', name: 'Mumbai Central', code: 'MMCT' });
                setDestinationStation({ id: '1', name: 'New Delhi', code: 'NDLS' });
              }}
            >
              <View style={styles.recentSearchRoute}>
                <Text style={styles.recentSearchCode}>MMCT</Text>
                <View style={styles.recentSearchLine} />
                <Text style={styles.recentSearchCode}>NDLS</Text>
              </View>
              <Text style={styles.recentSearchText}>Mumbai Central - New Delhi</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Popular Routes */}
        <View style={styles.popularRoutesContainer}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          <View style={styles.popularRoutes}>
            <TouchableOpacity 
              style={styles.popularRouteItem}
              onPress={() => {
                setSourceStation({ id: '1', name: 'New Delhi', code: 'NDLS' });
                setDestinationStation({ id: '3', name: 'Kolkata', code: 'KOAA' });
              }}
            >
              <Ionicons name="trending-up" size={16} color={colors.primary} style={styles.popularRouteIcon} />
              <Text style={styles.popularRouteText}>Delhi - Kolkata</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.popularRouteItem}
              onPress={() => {
                setSourceStation({ id: '2', name: 'Mumbai Central', code: 'MMCT' });
                setDestinationStation({ id: '5', name: 'Bangalore', code: 'SBC' });
              }}
            >
              <Ionicons name="trending-up" size={16} color={colors.primary} style={styles.popularRouteIcon} />
              <Text style={styles.popularRouteText}>Mumbai - Bangalore</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.popularRouteItem}
              onPress={() => {
                setSourceStation({ id: '1', name: 'New Delhi', code: 'NDLS' });
                setDestinationStation({ id: '4', name: 'Chennai Central', code: 'MAS' });
              }}
            >
              <Ionicons name="trending-up" size={16} color={colors.primary} style={styles.popularRouteIcon} />
              <Text style={styles.popularRouteText}>Delhi - Chennai</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.popularRouteItem}
              onPress={() => {
                setSourceStation({ id: '6', name: 'Hyderabad', code: 'HYD' });
                setDestinationStation({ id: '2', name: 'Mumbai Central', code: 'MMCT' });
              }}
            >
              <Ionicons name="trending-up" size={16} color={colors.primary} style={styles.popularRouteIcon} />
              <Text style={styles.popularRouteText}>Hyderabad - Mumbai</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Station Selection Modal - Source */}
      <Modal
        visible={showSourceModal}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => {
                setShowSourceModal(false);
                setSearchQuery('');
                setFilteredStations(stations);
              }}
            >
              <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Source Station</Text>
          </View>
          
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={colors.grey} style={styles.searchInputIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for stations"
              value={searchQuery}
              onChangeText={filterStations}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.clearSearchButton}
                onPress={() => {
                  setSearchQuery('');
                  setFilteredStations(stations);
                }}
              >
                <Ionicons name="close-circle" size={20} color={colors.grey} />
              </TouchableOpacity>
            )}
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Loading stations...</Text>
            </View>
          ) : (
            <FlatList
              data={filteredStations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.stationListItem}
                  onPress={() => handleStationSelect(item)}
                >
                  <View style={styles.stationListItemContent}>
                    <Text style={styles.stationListItemName}>{item.name}</Text>
                    <Text style={styles.stationListItemCode}>{item.code}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.grey} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.stationList}
              ListEmptyComponent={
                <View style={styles.emptyListContainer}>
                  <Ionicons name="alert-circle-outline" size={64} color={colors.lightGrey} />
                  <Text style={styles.emptyListText}>No stations found</Text>
                </View>
              }
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* Station Selection Modal - Destination */}
      <Modal
        visible={showDestinationModal}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => {
                setShowDestinationModal(false);
                setSearchQuery('');
                setFilteredStations(stations);
              }}
            >
              <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Destination Station</Text>
          </View>
          
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={colors.grey} style={styles.searchInputIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for stations"
              value={searchQuery}
              onChangeText={filterStations}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.clearSearchButton}
                onPress={() => {
                  setSearchQuery('');
                  setFilteredStations(stations);
                }}
              >
                <Ionicons name="close-circle" size={20} color={colors.grey} />
              </TouchableOpacity>
            )}
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Loading stations...</Text>
            </View>
          ) : (
            <FlatList
              data={filteredStations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.stationListItem}
                  onPress={() => handleStationSelect(item)}
                >
                  <View style={styles.stationListItemContent}>
                    <Text style={styles.stationListItemName}>{item.name}</Text>
                    <Text style={styles.stationListItemCode}>{item.code}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.grey} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.stationList}
              ListEmptyComponent={
                <View style={styles.emptyListContainer}>
                  <Ionicons name="alert-circle-outline" size={64} color={colors.lightGrey} />
                  <Text style={styles.emptyListText}>No stations found</Text>
                </View>
              }
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={datePickerMode === 'departure' ? departureDate : (returnDate || departureDate)}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={datePickerMode === 'departure' ? new Date() : departureDate}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
  },
  searchCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  inputLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  stationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stationName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  stationCode: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
  placeholderText: {
    fontSize: fontSize.md,
    color: colors.grey,
  },
  swapButton: {
    position: 'absolute',
    right: 16,
    top: 55,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  dateContainer: {
    marginTop: spacing.md,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  dateText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  roundTripContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.grey,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundTripText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  searchButtonDisabled: {
    backgroundColor: colors.grey,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  recentSearchesContainer: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  recentSearches: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentSearchItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recentSearchRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  recentSearchCode: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.primary,
  },
  recentSearchLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  recentSearchText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  popularRoutesContainer: {
    marginTop: spacing.xl,
  },
  popularRoutes: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  popularRouteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  popularRouteIcon: {
    marginRight: spacing.md,
  },
  popularRouteText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalCloseButton: {
    marginRight: spacing.md,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInputIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
  },
  clearSearchButton: {
    padding: spacing.xs,
  },
  stationList: {
    paddingHorizontal: spacing.lg,
  },
  stationListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  stationListItemContent: {
    flex: 1,
  },
  stationListItemName: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  stationListItemCode: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyListText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});

export default TrainSearch;

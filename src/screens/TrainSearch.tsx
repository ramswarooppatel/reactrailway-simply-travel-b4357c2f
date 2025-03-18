
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../styles/theme';
import { StackParamList } from '../types';

type TrainSearchProp = NativeStackNavigationProp<StackParamList, 'TrainListing'>;

const TrainSearch = () => {
  const navigation = useNavigation<TrainSearchProp>();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('oneWay');

  const handleSearch = () => {
    if (source && destination) {
      navigation.navigate('TrainListing', {
        source,
        destination,
        date: date.toISOString().split('T')[0],
        isRoundTrip: activeTab === 'roundTrip'
      });
    }
  };

  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Find Your Train</Text>
        
        <View style={styles.card}>
          <View style={styles.tabs}>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'oneWay' && styles.activeTab
              ]}
              onPress={() => setActiveTab('oneWay')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'oneWay' && styles.activeTabText
              ]}>One way</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'roundTrip' && styles.activeTab
              ]}
              onPress={() => setActiveTab('roundTrip')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'roundTrip' && styles.activeTabText
              ]}>Round trip</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>From</Text>
            <View style={styles.inputContainer}>
              <Ionicons 
                name="location-outline" 
                size={20} 
                color={colors.grey} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter city or station"
                value={source}
                onChangeText={setSource}
              />
              <View style={[styles.dot, styles.greenDot]} />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>To</Text>
            <View style={styles.inputContainer}>
              <Ionicons 
                name="location-outline" 
                size={20} 
                color={colors.grey} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter city or station"
                value={destination}
                onChangeText={setDestination}
              />
              <View style={[styles.dot, styles.redDot]} />
            </View>
          </View>
          
          <View style={styles.swapButtonContainer}>
            <TouchableOpacity 
              style={styles.swapButton}
              onPress={handleSwap}
            >
              <Ionicons name="swap-vertical" size={20} color={colors.grey} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Departure Date</Text>
            <TouchableOpacity style={styles.dateButton}>
              <Ionicons 
                name="calendar-outline" 
                size={20} 
                color={colors.grey} 
                style={styles.inputIcon}
              />
              <Text style={styles.dateText}>
                {date.toDateString()}
              </Text>
              <View style={styles.dayBadge}>
                <Text style={styles.dayBadgeText}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {activeTab === 'roundTrip' && (
            <View style={styles.formGroup}>
              <Text style={styles.label}>Return Date</Text>
              <TouchableOpacity style={styles.dateButton}>
                <Ionicons 
                  name="calendar-outline" 
                  size={20} 
                  color={colors.grey} 
                  style={styles.inputIcon}
                />
                <Text style={styles.dateText}>
                  Select return date
                </Text>
              </TouchableOpacity>
            </View>
          )}
          
          <TouchableOpacity 
            style={[
              styles.searchButton,
              (!source || !destination) && styles.disabledButton
            ]}
            onPress={handleSearch}
            disabled={!source || !destination}
          >
            <Text style={styles.searchButtonText}>Search Trains</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.recentSearchesSection}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          
          {[
            { from: 'Mumbai', to: 'Delhi', date: '2023-12-10' },
            { from: 'Bangalore', to: 'Chennai', date: '2023-12-15' },
            { from: 'Kolkata', to: 'Hyderabad', date: '2023-12-20' },
          ].map((search, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.recentSearchItem}
              onPress={() => {
                setSource(search.from);
                setDestination(search.to);
                setDate(new Date(search.date));
              }}
            >
              <View>
                <Text style={styles.recentSearchRoute}>
                  {search.from} → {search.to}
                </Text>
                <Text style={styles.recentSearchDate}>
                  {new Date(search.date).toLocaleDateString()}
                </Text>
              </View>
              <Ionicons name="calendar-outline" size={20} color={colors.grey} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.popularRoutesSection}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          
          <View style={styles.popularRoutesGrid}>
            {[
              { from: 'Delhi', to: 'Mumbai' },
              { from: 'Mumbai', to: 'Bangalore' },
              { from: 'Chennai', to: 'Hyderabad' },
              { from: 'Kolkata', to: 'Delhi' },
            ].map((route, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.popularRouteItem}
                onPress={() => {
                  setSource(route.from);
                  setDestination(route.to);
                }}
              >
                <Text style={styles.popularRouteText}>
                  {route.from} → {route.to}
                </Text>
                <Text style={styles.selectRouteText}>Select</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    marginBottom: spacing.xs,
    color: colors.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  inputIcon: {
    marginLeft: spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    fontSize: fontSize.md,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  greenDot: {
    backgroundColor: colors.success,
  },
  redDot: {
    backgroundColor: colors.danger,
  },
  swapButtonContainer: {
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
  },
  dateText: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    fontSize: fontSize.md,
  },
  dayBadge: {
    backgroundColor: colors.lightGrey,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 4,
    marginRight: spacing.md,
  },
  dayBadgeText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  searchButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  disabledButton: {
    backgroundColor: colors.lightGrey,
  },
  searchButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  recentSearchesSection: {
    marginTop: spacing.xl,
  },
  popularRoutesSection: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  recentSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recentSearchRoute: {
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  recentSearchDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  popularRoutesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  popularRouteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    width: '48%',
  },
  popularRouteText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  selectRouteText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default TrainSearch;

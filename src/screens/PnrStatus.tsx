
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../styles/theme';
import { searchPnrStatus } from '../services/trainService';

const PnrStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pnrData, setPnrData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    // Basic validation
    if (!pnrNumber.trim() || pnrNumber.length < 5) {
      setError('Please enter a valid PNR number');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setPnrData(null);
    
    try {
      const { data, error } = await searchPnrStatus(pnrNumber);
      
      if (error) throw error;
      
      if (!data) {
        setError('No booking found with this PNR number');
        return;
      }
      
      setPnrData(data);
    } catch (err) {
      console.error('Error checking PNR status:', err);
      setError('Failed to check PNR status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for demo
  const mockPnrData = {
    pnr_number: 'PNR123456789',
    status: 'Confirmed',
    train: {
      name: 'Rajdhani Express',
      number: '12301',
      from_station: 'New Delhi',
      from_code: 'NDLS',
      to_station: 'Mumbai Central',
      to_code: 'MMCT',
      departure_time: '16:50',
      arrival_time: '08:35'
    },
    journey_date: '2023-06-15',
    passengers: [
      { name: 'John Doe', age: 35, gender: 'male', seat: 'B1-23', status: 'Confirmed' },
      { name: 'Jane Doe', age: 32, gender: 'female', seat: 'B1-24', status: 'Confirmed' }
    ],
    class: 'AC 2 Tier'
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
          <View style={styles.header}>
            <Text style={styles.title}>PNR Status</Text>
            <Text style={styles.subtitle}>Check your train booking status</Text>
          </View>
          
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Enter PNR Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g., 1234567890"
                value={pnrNumber}
                onChangeText={setPnrNumber}
                maxLength={10}
                keyboardType="numeric"
              />
              <TouchableOpacity 
                style={[styles.checkButton, (!pnrNumber.trim() || pnrNumber.length < 5) && styles.checkButtonDisabled]}
                onPress={handleCheck}
                disabled={!pnrNumber.trim() || pnrNumber.length < 5 || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Text style={styles.checkButtonText}>Check Status</Text>
                )}
              </TouchableOpacity>
            </View>
            
            {error && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={20} color={colors.danger} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </View>
          
          {/* Display PNR Status */}
          {(pnrData || mockPnrData) && (
            <View style={styles.resultContainer}>
              <View style={styles.pnrHeader}>
                <View>
                  <Text style={styles.pnrLabel}>PNR Number</Text>
                  <Text style={styles.pnrNumber}>{pnrData?.pnr_number || mockPnrData.pnr_number}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  (pnrData?.status || mockPnrData.status) === 'Confirmed' ? styles.confirmedStatus : styles.waitingStatus
                ]}>
                  <Text style={styles.statusText}>
                    {pnrData?.status || mockPnrData.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.trainInfo}>
                <Text style={styles.trainName}>{pnrData?.train?.name || mockPnrData.train.name}</Text>
                <Text style={styles.trainNumber}>{pnrData?.train?.number || mockPnrData.train.number}</Text>
              </View>
              
              <View style={styles.journeyInfo}>
                <View style={styles.stationContainer}>
                  <Text style={styles.stationCode}>{pnrData?.train?.from_code || mockPnrData.train.from_code}</Text>
                  <Text style={styles.stationName}>{pnrData?.train?.from_station || mockPnrData.train.from_station}</Text>
                  <Text style={styles.departureTime}>{pnrData?.train?.departure_time || mockPnrData.train.departure_time}</Text>
                </View>
                
                <View style={styles.journeyArrow}>
                  <View style={styles.arrowLine} />
                  <Ionicons name="arrow-forward" size={20} color={colors.primary} />
                  <View style={styles.arrowLine} />
                </View>
                
                <View style={styles.stationContainer}>
                  <Text style={styles.stationCode}>{pnrData?.train?.to_code || mockPnrData.train.to_code}</Text>
                  <Text style={styles.stationName}>{pnrData?.train?.to_station || mockPnrData.train.to_station}</Text>
                  <Text style={styles.arrivalTime}>{pnrData?.train?.arrival_time || mockPnrData.train.arrival_time}</Text>
                </View>
              </View>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date of Journey</Text>
                  <Text style={styles.detailValue}>{pnrData?.journey_date || mockPnrData.journey_date}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Class</Text>
                  <Text style={styles.detailValue}>{pnrData?.class || mockPnrData.class}</Text>
                </View>
              </View>
              
              <View style={styles.passengersContainer}>
                <Text style={styles.passengersTitle}>Passenger Details</Text>
                
                {(pnrData?.passengers || mockPnrData.passengers).map((passenger: any, index: number) => (
                  <View key={index} style={styles.passengerItem}>
                    <View style={styles.passengerHeader}>
                      <Text style={styles.passengerName}>{passenger.name}</Text>
                      <Text style={[
                        styles.passengerStatus,
                        passenger.status === 'Confirmed' ? styles.confirmedText : styles.waitingText
                      ]}>
                        {passenger.status}
                      </Text>
                    </View>
                    
                    <View style={styles.passengerDetails}>
                      <View style={styles.passengerDetail}>
                        <Text style={styles.passengerDetailLabel}>Seat</Text>
                        <Text style={styles.passengerDetailValue}>{passenger.seat}</Text>
                      </View>
                      
                      <View style={styles.passengerDetail}>
                        <Text style={styles.passengerDetailLabel}>Age</Text>
                        <Text style={styles.passengerDetailValue}>{passenger.age}</Text>
                      </View>
                      
                      <View style={styles.passengerDetail}>
                        <Text style={styles.passengerDetailLabel}>Gender</Text>
                        <Text style={styles.passengerDetailValue}>
                          {passenger.gender.charAt(0).toUpperCase() + passenger.gender.slice(1)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              
              <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="share-outline" size={20} color={colors.white} style={styles.shareIcon} />
                <Text style={styles.shareButtonText}>Share PNR Details</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Recent PNR Searches */}
          {!pnrData && !error && (
            <View style={styles.recentSearchesContainer}>
              <Text style={styles.recentSearchesTitle}>Recent PNR Searches</Text>
              
              <TouchableOpacity 
                style={styles.recentSearchItem}
                onPress={() => setPnrNumber('1234567890')}
              >
                <View style={styles.recentSearchContent}>
                  <Text style={styles.recentPnr}>PNR: 1234567890</Text>
                  <Text style={styles.recentRoute}>NDLS → MMCT</Text>
                  <Text style={styles.recentDate}>15 Jun 2023</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.grey} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.recentSearchItem}
                onPress={() => setPnrNumber('9876543210')}
              >
                <View style={styles.recentSearchContent}>
                  <Text style={styles.recentPnr}>PNR: 9876543210</Text>
                  <Text style={styles.recentRoute}>MAS → SBC</Text>
                  <Text style={styles.recentDate}>10 Jun 2023</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.grey} />
              </TouchableOpacity>
            </View>
          )}
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
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  inputCard: {
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
  inputLabel: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.md,
    marginRight: spacing.md,
  },
  checkButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
  checkButtonDisabled: {
    backgroundColor: colors.grey,
  },
  checkButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.danger + '15',
    padding: spacing.md,
    borderRadius: 8,
    marginTop: spacing.md,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.sm,
    marginLeft: spacing.sm,
    flex: 1,
  },
  resultContainer: {
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
  pnrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  pnrLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  pnrNumber: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
  },
  confirmedStatus: {
    backgroundColor: colors.success + '20',
  },
  waitingStatus: {
    backgroundColor: colors.warning + '20',
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  trainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.md,
  },
  trainName: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  trainNumber: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  journeyInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.md,
  },
  stationContainer: {
    alignItems: 'center',
    width: '35%',
  },
  stationCode: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  stationName: {
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  departureTime: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.success,
  },
  arrivalTime: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.danger,
  },
  journeyArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    paddingTop: spacing.md,
  },
  arrowLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primary,
  },
  detailsContainer: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  detailLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  passengersContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginBottom: spacing.lg,
  },
  passengersTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  passengerItem: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  passengerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  passengerName: {
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  passengerStatus: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  confirmedText: {
    color: colors.success,
  },
  waitingText: {
    color: colors.warning,
  },
  passengerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passengerDetail: {
    alignItems: 'center',
    width: '33%',
  },
  passengerDetailLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  passengerDetailValue: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  shareIcon: {
    marginRight: spacing.sm,
  },
  shareButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  recentSearchesContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentSearchesTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recentSearchContent: {
    flex: 1,
  },
  recentPnr: {
    fontSize: fontSize.md,
    fontWeight: '500',
    marginBottom: 2,
  },
  recentRoute: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  recentDate: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
});

export default PnrStatus;

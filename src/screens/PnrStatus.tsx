
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
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../styles/theme';

// Mock PNR result type
interface PnrResult {
  pnr: string;
  trainNumber: string;
  trainName: string;
  date: string;
  boardingStation: string;
  destination: string;
  class: string;
  passengers: { seat: string; status: string; coach: string }[];
  status: 'Confirmed' | 'Waiting' | 'RAC';
}

const PnrStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrResult, setPnrResult] = useState<PnrResult | null>(null);
  const [activeTab, setActiveTab] = useState('recent');

  const handleCheckPnr = () => {
    if (!pnrNumber || pnrNumber.length !== 10) {
      // In a real app, we would show a toast here
      console.log("Invalid PNR");
      return;
    }

    // Simulate PNR check - in a real app, this would be an API call
    setPnrResult({
      pnr: pnrNumber,
      trainNumber: '12301',
      trainName: 'Rajdhani Express',
      date: '15 Dec 2023',
      boardingStation: 'New Delhi (NDLS)',
      destination: 'Mumbai Central (MMCT)',
      class: '3A',
      passengers: [
        { seat: 'LB', status: 'CNF', coach: 'B1' },
        { seat: 'MB', status: 'CNF', coach: 'B1' },
      ],
      status: 'Confirmed',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>PNR Status</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Check Your PNR Status</Text>
          
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit PNR Number"
              keyboardType="number-pad"
              maxLength={10}
              value={pnrNumber}
              onChangeText={setPnrNumber}
            />
            <TouchableOpacity 
              style={styles.checkButton}
              onPress={handleCheckPnr}
            >
              <Ionicons name="search" size={18} color={colors.white} />
              <Text style={styles.checkButtonText}>Check Status</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tabs}>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'recent' && styles.activeTab
              ]}
              onPress={() => setActiveTab('recent')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'recent' && styles.activeTabText
              ]}>Recent PNRs</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'saved' && styles.activeTab
              ]}
              onPress={() => setActiveTab('saved')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'saved' && styles.activeTabText
              ]}>Saved PNRs</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tabContent}>
            {activeTab === 'recent' ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  Your recent PNR enquiries will appear here
                </Text>
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  You don't have any saved PNR enquiries
                </Text>
              </View>
            )}
          </View>
        </View>
        
        {pnrResult && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>PNR: {pnrResult.pnr}</Text>
            </View>
            
            <View style={styles.statusBanner}>
              <Text style={styles.statusText}>
                Booking Status: {pnrResult.status}
              </Text>
            </View>
            
            <View style={styles.resultSection}>
              <View style={styles.resultRow}>
                <View style={styles.resultItem}>
                  <Ionicons name="train-outline" size={20} color={colors.grey} />
                  <View style={styles.resultItemContent}>
                    <Text style={styles.resultItemLabel}>Train Number/Name</Text>
                    <Text style={styles.resultItemValue}>
                      {pnrResult.trainNumber} - {pnrResult.trainName}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.resultItem}>
                  <Ionicons name="calendar-outline" size={20} color={colors.grey} />
                  <View style={styles.resultItemContent}>
                    <Text style={styles.resultItemLabel}>Date of Journey</Text>
                    <Text style={styles.resultItemValue}>{pnrResult.date}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.resultRow}>
                <View style={styles.resultItem}>
                  <Ionicons name="location-outline" size={20} color={colors.grey} />
                  <View style={styles.resultItemContent}>
                    <Text style={styles.resultItemLabel}>From</Text>
                    <Text style={styles.resultItemValue}>{pnrResult.boardingStation}</Text>
                  </View>
                </View>
                
                <View style={styles.resultItem}>
                  <Ionicons name="location-outline" size={20} color={colors.grey} />
                  <View style={styles.resultItemContent}>
                    <Text style={styles.resultItemLabel}>To</Text>
                    <Text style={styles.resultItemValue}>{pnrResult.destination}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.resultRow}>
                <View style={styles.resultItem}>
                  <Ionicons name="time-outline" size={20} color={colors.grey} />
                  <View style={styles.resultItemContent}>
                    <Text style={styles.resultItemLabel}>Class</Text>
                    <Text style={styles.resultItemValue}>{pnrResult.class}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.passengersSection}>
              <View style={styles.passengersSectionHeader}>
                <Ionicons name="people-outline" size={20} color={colors.textPrimary} />
                <Text style={styles.passengersSectionTitle}>Passenger Details</Text>
              </View>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.passengersTable}>
                  <View style={styles.passengersTableHeader}>
                    <Text style={[styles.passengersTableCell, styles.passengersTableHeaderText]}>Passenger</Text>
                    <Text style={[styles.passengersTableCell, styles.passengersTableHeaderText]}>Booking Status</Text>
                    <Text style={[styles.passengersTableCell, styles.passengersTableHeaderText]}>Current Status</Text>
                    <Text style={[styles.passengersTableCell, styles.passengersTableHeaderText]}>Coach</Text>
                    <Text style={[styles.passengersTableCell, styles.passengersTableHeaderText]}>Berth</Text>
                  </View>
                  
                  {pnrResult.passengers.map((passenger, index) => (
                    <View key={index} style={styles.passengersTableRow}>
                      <Text style={styles.passengersTableCell}>Passenger {index + 1}</Text>
                      <Text style={styles.passengersTableCell}>Confirmed</Text>
                      <Text style={[styles.passengersTableCell, styles.confirmedText]}>{passenger.status}</Text>
                      <Text style={styles.passengersTableCell}>{passenger.coach}</Text>
                      <Text style={styles.passengersTableCell}>{passenger.seat}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Share Ticket</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Download E-Ticket</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Cancel Ticket</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    marginBottom: spacing.xl,
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.md,
  },
  checkButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
  tabs: {
    flexDirection: 'row',
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
  tabContent: {
    marginTop: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyStateText: {
    color: colors.textSecondary,
  },
  resultCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultHeader: {
    padding: spacing.lg,
  },
  resultTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  statusBanner: {
    backgroundColor: colors.success + '20',
    borderWidth: 1,
    borderColor: colors.success + '30',
    padding: spacing.md,
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  statusText: {
    color: colors.success,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  resultSection: {
    padding: spacing.lg,
  },
  resultRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '50%',
    marginBottom: spacing.md,
  },
  resultItemContent: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  resultItemLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  resultItemValue: {
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
  },
  passengersSection: {
    padding: spacing.lg,
  },
  passengersSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  passengersSectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  passengersTable: {
    minWidth: '100%',
  },
  passengersTableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.lightGrey,
  },
  passengersTableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  passengersTableCell: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    width: 120,
  },
  passengersTableHeaderText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  confirmedText: {
    color: colors.success,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    padding: spacing.lg,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
});

export default PnrStatus;

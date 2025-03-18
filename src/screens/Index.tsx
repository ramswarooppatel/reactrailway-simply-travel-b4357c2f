
import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  useWindowDimensions,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from '../types';
import { colors, spacing, fontSize } from '../styles/theme';

type HomeProp = NativeStackNavigationProp<TabParamList, 'Home'>;

const FeatureCard = ({ icon, title, description }) => (
  <View style={styles.featureCard}>
    <View style={styles.featureIconContainer}>
      {icon}
    </View>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const StatItem = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const TestimonialCard = ({ name, image, quote }) => (
  <View style={styles.testimonialCard}>
    <View style={styles.testimonialHeader}>
      <Image
        source={{ uri: image }}
        style={styles.testimonialImage}
      />
      <View>
        <Text style={styles.testimonialName}>{name}</Text>
        <Text style={styles.testimonialSubtitle}>Verified Traveler</Text>
      </View>
    </View>
    <Text style={styles.testimonialQuote}>"{quote}"</Text>
  </View>
);

const Index = () => {
  const navigation = useNavigation<HomeProp>();
  const { width } = useWindowDimensions();

  // Mock data for features
  const features = [
    {
      icon: <Ionicons name="calendar" size={24} color={colors.primary} />,
      title: 'Instant Booking',
      description: 'Book your train tickets instantly with our easy-to-use platform',
    },
    {
      icon: <Ionicons name="shield" size={24} color={colors.primary} />,
      title: 'Secure Payments',
      description: 'Multiple secure payment options for a safe booking experience',
    },
    {
      icon: <Ionicons name="map" size={24} color={colors.primary} />,
      title: 'Live Tracking',
      description: 'Track your train location in real-time for a stress-free journey',
    },
    {
      icon: <Ionicons name="time" size={24} color={colors.primary} />,
      title: 'Fast Refunds',
      description: 'Quick refunds processed within 24-48 hours of cancellation',
    },
  ];

  // Mock data for stats
  const stats = [
    { value: '6,500+', label: 'Trains' },
    { value: '8,000+', label: 'Routes' },
    { value: '10M+', label: 'Happy Travelers' },
    { value: '98%', label: 'On-time Arrival' },
  ];

  // Mock data for testimonials
  const testimonials = [
    {
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      quote: 'RailGo made my travel planning so much easier. The interface is intuitive and booking tickets is a breeze!',
    },
    {
      name: 'Rajesh Kumar',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      quote: 'I love the real-time train tracking feature. It helps me plan my arrivals and departures with confidence.',
    },
    {
      name: 'Ananya Patel',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      quote: 'The seat availability predictions are surprisingly accurate. I\'ve never had issues with my bookings.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        {/* Hero Section */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=800' }}
          style={styles.heroBackground}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Book Your Train Tickets</Text>
            <Text style={styles.heroSubtitle}>Travel smarter, journey better</Text>
            <TouchableOpacity 
              style={styles.heroCta}
              onPress={() => navigation.navigate('TrainSearch')}
            >
              <Text style={styles.heroCtaText}>Find Trains</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Features Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Why Choose RailGo</Text>
            <Text style={styles.sectionSubtitle}>Experience seamless train booking with features designed for the modern traveler</Text>
          </View>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </View>
        </View>

        {/* Featured Destinations - Simplified for mobile */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
            <Text style={styles.sectionSubtitle}>Explore India's most traveled train routes</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.destinationsContainer}
          >
            {[
              {
                name: 'Delhi to Mumbai',
                image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400',
              },
              {
                name: 'Bangalore to Chennai',
                image: 'https://images.unsplash.com/photo-1580742314088-1b5be9e25a97?auto=format&fit=crop&w=400',
              },
              {
                name: 'Kolkata to Delhi',
                image: 'https://images.unsplash.com/photo-1561361513-2d000a50f2fa?auto=format&fit=crop&w=400',
              },
            ].map((destination, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.destinationCard, { width: width * 0.7 }]}
                onPress={() => navigation.navigate('TrainSearch')}
              >
                <Image
                  source={{ uri: destination.image }}
                  style={styles.destinationImage}
                />
                <View style={styles.destinationOverlay}>
                  <Text style={styles.destinationName}>{destination.name}</Text>
                  <TouchableOpacity style={styles.destinationCta}>
                    <Text style={styles.destinationCtaText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatItem 
                key={index}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </View>
        </View>

        {/* App Download Section */}
        <View style={styles.downloadSection}>
          <Text style={styles.downloadTitle}>Get the RailGo App</Text>
          <Text style={styles.downloadSubtitle}>
            Download our mobile app for a seamless booking experience on the go. Access tickets, receive real-time updates, and more.
          </Text>
          <View style={styles.downloadButtons}>
            <TouchableOpacity style={styles.storeButton}>
              <Ionicons name="logo-google-playstore" size={24} color={colors.white} />
              <Text style={styles.storeButtonText}>Google Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.storeButton}>
              <Ionicons name="logo-apple" size={24} color={colors.white} />
              <Text style={styles.storeButtonText}>App Store</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>What Our Users Say</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.testimonialsContainer}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                name={testimonial.name}
                image={testimonial.image}
                quote={testimonial.quote}
              />
            ))}
          </ScrollView>
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
  heroBackground: {
    height: 350,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: fontSize.lg,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 30,
  },
  heroCtaText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  section: {
    padding: spacing.xl,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  destinationsContainer: {
    paddingRight: spacing.xl,
  },
  destinationCard: {
    height: 200,
    marginLeft: spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: spacing.md,
  },
  destinationName: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  destinationCta: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  destinationCtaText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
  },
  statsSection: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.8,
  },
  downloadSection: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    margin: spacing.xl,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  downloadTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  downloadSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  downloadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    width: '48%',
    justifyContent: 'center',
  },
  storeButtonText: {
    color: colors.white,
    marginLeft: spacing.sm,
    fontSize: fontSize.sm,
    fontWeight: 'bold',
  },
  testimonialsContainer: {
    paddingRight: spacing.xl,
  },
  testimonialCard: {
    width: 280,
    marginLeft: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  testimonialImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.md,
  },
  testimonialName: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  testimonialSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  testimonialQuote: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default Index;

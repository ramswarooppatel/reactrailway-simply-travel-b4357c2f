
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import Index from './screens/Index';
import TrainSearch from './screens/TrainSearch';
import TrainListing from './screens/TrainListing';
import TrainDetails from './screens/TrainDetails';
import Booking from './screens/Booking';
import Profile from './screens/Profile';
import PnrStatus from './screens/PnrStatus';
import TrainSchedules from './screens/TrainSchedules';
import TicketManagement from './screens/TicketManagement';
import SeatAvailability from './screens/SeatAvailability';
import Notifications from './screens/Notifications';
import TravelHistory from './screens/TravelHistory';
import NotFound from './screens/NotFound';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      id="HomeTabs"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TrainSearch') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'PnrStatus') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Index} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="TrainSearch" 
        component={TrainSearch} 
        options={{ title: 'Search Trains', headerShown: false }}
      />
      <Tab.Screen 
        name="PnrStatus" 
        component={PnrStatus} 
        options={{ title: 'PNR Status', headerShown: false }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          id="RootStack"
          initialRouteName="HomeTabs"
        >
          <Stack.Screen 
            name="HomeTabs" 
            component={HomeTabs} 
            options={{ headerShown: false }}
          />
          <Stack.Screen name="TrainListing" component={TrainListing} />
          <Stack.Screen name="TrainDetails" component={TrainDetails} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="TrainSchedules" component={TrainSchedules} />
          <Stack.Screen name="TicketManagement" component={TicketManagement} />
          <Stack.Screen name="SeatAvailability" component={SeatAvailability} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="TravelHistory" component={TravelHistory} />
          <Stack.Screen name="NotFound" component={NotFound} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

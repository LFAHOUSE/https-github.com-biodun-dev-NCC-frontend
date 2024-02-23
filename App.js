import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import StartupScreen from './screens/StartupScreen'; // Ensure this is correctly imported
import Loader from './screens/components/Loader.js';
import LoginScreen from './screens/LoginScreen.js';// Ensure this is correctly imported
import SignUp from './screens/SignUp';
import Verify from './screens/Verify';
import LetsMeet from './screens/LetsMeet';
import Setpasssword from './screens/SetpasswordScreen';
import VerificationComplete from './screens/VerificationComplete';
import MyLibrary from './screens/MyLibrary.js';
import UpcomingEvents from './screens/components/UpcomingEvents.js';
import HappeningNow from './screens/components/HappeningNow.js';
import Search from "./screens/Dashboard/Search.js";
import Library from "./screens/Dashboard/Library.js";
import Home from "./screens/Dashboard/Home.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardHeader from "./screens/components/DashboardHeader.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () => <DashboardHeader />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          header: () => <DashboardHeader />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          header: () => <DashboardHeader />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
           {/* Hide the header for the StartupScreen */}
          {/* <Stack.Screen
            name="Startup"
            component={StartupScreen}
            options={{ headerShown: false }} // This hides the header
          /> */}

          {/* For the RegistrationScreen, you might want to show the header, but if not, you can apply the same options here */}
          <Stack.Screen name="Login" component={LoginScreen}
                   options={{ headerShown: false }} // This hides the header
           />
            <Stack.Screen name="SignUp" component={SignUp}
                   options={{ headerShown: false }} // This hides the header
           />
           <Stack.Screen name="Verify" component={Verify}
                   options={{ headerShown: false}} // This hides the header
           />
            <Stack.Screen name='Setpassword' component={Setpasssword} options={{headerShown:false}}/>
            <Stack.Screen name="VerificationComplete" component={VerificationComplete} options={{headerShown:false}}/>
           <Stack.Screen name="LetsMeet" component={LetsMeet} options={{headerShown:false}}/>
           <Stack.Screen name="Events" component={UpcomingEvents} options={{headerShown:false}}/>
            <Stack.Screen name="Live" component={HappeningNow} options={{headerShown:false}}/>
          {/* <Stack.Screen name="My Library" component={MyLibrary} options={{headerShown:false}}/>  */}
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

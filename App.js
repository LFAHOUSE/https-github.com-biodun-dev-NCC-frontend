import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import StartupScreen from "./screens/StartupScreen"; // Ensure this is correctly imported
import Loader from "./screens/components/Loader.js";
import LoginScreen from "./screens/LoginScreen.js"; // Ensure this is correctly imported
import SignUp from "./screens/SignUp";
import Verify from "./screens/Verify";
import LetsMeet from "./screens/LetsMeet";
import Setpasssword from "./screens/SetpasswordScreen";
import VerificationComplete from "./screens/VerificationComplete";
import MyLibrary from "./screens/MyLibrary.js";
import UpcomingEvents from "./screens/components/UpcomingEvents.js";
import HappeningNow from "./screens/components/HappeningNow.js";
import Search from "./screens/Dashboard/Search.js";
import Library from "./screens/Dashboard/Library.js";
import Home from "./screens/Dashboard/Home.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardHeader from "./screens/components/DashboardHeader.js";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <ImageBackground
      source={require("./assets/banner.png")}
      style={style.container}
    >
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            paddingVertical: 0,
            backgroundColor: "#C8e8f7",
          },
          tabBarIcon: ({ focused }) => {
            let srcName;
            let label;

            if (route.name === "Home") {
              srcName = require("./assets/home.png");
              label = "Home";
            } else if (route.name === "Search") {
              srcName = require("./assets/search.png");
              label = "Search";
            } else if (route.name === "Library") {
              srcName = require("./assets/library.png");
              label = "Library";
            }

            return (
              <View style={[style.view, { opacity: focused ? 1 : 0.6 }]}>
                <Image
                  source={srcName}
                  style= {style.Icon}
                />
                <Text style={style.text}>{label}</Text>
              </View>
            );
          },
        })}
      >
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
    </ImageBackground>
  );
};

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
           <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const style = StyleSheet.create({
  container: {
   flex: 1,
   display: "flex",
   backgroundColor: "transparent",
  },

  view: {
    alignItems: "center",
    gap: 5,
  },

  Icon: {
    width: 24,
    height: 24,
  },

  text: {
    fontSize: 14,
    fontWeight: "700",
  },
});

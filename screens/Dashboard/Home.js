import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Dimensions,
  PixelRatio,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
} from "react-native";
import MyCalendar from "../components/MyCalendar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardFooter from "../components/DashboardFooter";

const Home = () => {
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView>
        <MyCalendar />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
  },

  container: {
    flex: 1,
  },
});


export default Home;



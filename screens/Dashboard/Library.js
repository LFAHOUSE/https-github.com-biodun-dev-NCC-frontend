import React from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import DashboardHeader from "../components/DashboardHeader";
import DashboardFooter from "../components/DashboardFooter";
import MyCalendar from "../components/MyCalendar";

const Library = () => {
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView>
       <Text>Library</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
  },
});



export default Library;

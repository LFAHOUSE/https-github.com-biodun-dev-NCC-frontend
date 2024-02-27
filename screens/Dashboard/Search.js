import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import DashboardHeader from '../components/DashboardHeader';
import DashboardFooter from '../components/DashboardFooter';
import MyCalendar from '../components/MyCalendar';

const Search = () => {
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView>
        <Text>Search</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
  },
});

export default Search
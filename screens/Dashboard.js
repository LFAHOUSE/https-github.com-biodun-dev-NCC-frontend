import React from 'react';
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
} from 'react-native';
import PageHeader from './components/PageHeader';

const Dashboard = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
             <View style={styles.pageHeaderContainer}>
                <PageHeader pageTitle="Dashboard"/>
             </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f5f5f5", // Assuming a light grey background
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      },
      container: {
        flexGrow: 1,
          justifyContent: "space-between",
          padding:"2%",
           gap:20,
          flexDirection:"column"
      },
      
    
      pageHeaderContainer:{
        marginBottom:20
      },
})

export default Dashboard


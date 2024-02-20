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

// import React from 'react'
// import DashboardHeader from './components/DashboardHeader'
// import DashboardFooter from './components/DashboardFooter'
// import { StyleSheet, View } from 'react-native'

// const Dashboard = () => {
//   return (
//     <View style={styles.body} >
//         <DashboardHeader/>
//         <DashboardFooter/>
//     </View>
//   )
// }

//  const styles = StyleSheet.create({
//    body: {
//      height: "100%",
//      width: "100%",
//    },
//  });

// export default Dashboard
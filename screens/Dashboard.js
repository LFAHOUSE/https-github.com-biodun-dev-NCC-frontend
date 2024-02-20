import React from 'react'
import DashboardHeader from './components/DashboardHeader'
import DashboardFooter from './components/DashboardFooter'
import { StyleSheet, View } from 'react-native'

const Dashboard = () => {
  return (
    <View style={styles.body} >
        <DashboardHeader/>
        <DashboardFooter/>
    </View>
  )
}

 const styles = StyleSheet.create({
   body: {
     height: "100%",
     width: "100%",
   },
 });

export default Dashboard
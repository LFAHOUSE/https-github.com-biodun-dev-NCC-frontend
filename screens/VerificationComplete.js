import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";

const VerificationComplete = ({route,navigation}) => {

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
          
          <View style={styles.pageHeaderContainer}>
          <PageHeader pageTitle="Let us verify you" onBack={goBack}/>
          </View>
        
         <PageFooter/>
        </ScrollView>
      </SafeAreaView>
    )
}

export default VerificationComplete
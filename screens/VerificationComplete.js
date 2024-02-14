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

  const goBack = () => {
    navigation.goBack()
  }

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
         
          <View style={styles.pageHeaderContainer}>
          <PageHeader pageTitle="Verification Completed" onBack={goBack}/>
          </View>

          <View style={styles.successTextContainer}>
            <Text style={styles.successText}>Details Processed Successfully</Text>
            <Image style={styles.successImage} source={require("../assets/success.png")} />
          </View>

          
           
        <Button
          mode="contained"
          onPress={() => navigation.navigate("LetsMeet")} 
          style={[
            styles.button,
            { backgroundColor:"#06447C"},
          ]}
          //labelStyle={{ color: isButtonActive ? "#FFFFFF" : "#C0C0C0" }} // Text color for better contrast
        >
         Continue
        </Button>
         
        <View style={styles.footerContainer}>
        <PageFooter/>
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
    padding: 5,
    // gap:30,
  },
  // pageHeaderContainer:{
  //   marginBottom:20
  // },

  successTextContainer:{
    display:'flex',
    flexDirection:"column",
    width: '202',
    height: '17.45',
    top: '212',
    left: '79',
    gap:10,
    alignSelf:"center"
    
  },

  successText:{
    display:"flex",
    flexDirection:"row",
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '300',
    lineHeight: 18,
    letterSpacing: 2,
    textAlign:"left"

  },
  successImage:{
    alignSelf:"center",
    width: 50,
    height: 50,
    top: '258px',
    //left: 155,
    
  },

  button:{
    alignSelf:'center',
    marginTop:20,
    width:290,
    height:'40',
    padding:'10',
    gap:10,
    borderRadius:10,
    //left:32,
  },

  footerContainer:{
    marginTop:87,
    marginBottom:20

  }
})
export default VerificationComplete
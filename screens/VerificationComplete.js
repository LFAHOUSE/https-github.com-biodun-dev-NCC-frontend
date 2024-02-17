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
   const {phoneNumber,email} = route.params
  const goBack = () => {
    navigation.goBack()
  }
  const handleNavigate = () => {
    console.log("Phone number in Verification complete: "+ phoneNumber)
    navigation.navigate("LetsMeet",{
      phoneNumber:phoneNumber
    })
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
          onPress={handleNavigate} 
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
    padding:"2%",
     gap:20,
    flexDirection:"column"
  },
  pageHeaderContainer:{
    marginBottom:20
  },

  successTextContainer:{
    display:'flex',
    flexDirection:"column",
    alignContent:"space-around",
    alignItems:"center",
    width: '100%',
    height: '17.5%',
    top: '2%',
    gap:10,
    alignSelf:"center",
    //borderWidth:1
    
  },

  successText:{
    display:"flex",
    flexDirection:"row",
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '300',
    lineHeight: 18,
    letterSpacing: 2,
    //textAlign:"left",
    alignSelf:'center',
   // borderWidth:1

  },
  successImage:{
    alignSelf:"center",
    width: "20%",
    height: "60%",
    top: '8%',
    // borderRadius:7,
    // borderWidth:1
    //left: 155,
    
  },

  button:{
    marginTop:"10%",
    width:"85%",
    height:'8%',
    padding:'1%',
    gap:10,
    borderRadius:10,
    left:"8%",
    //left:32,
  },

  footerContainer:{
    marginTop:87,
    marginBottom:20

  }
})
export default VerificationComplete
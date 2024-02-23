import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useFonts, Sacramento_400Regular } from '@expo-google-fonts/sacramento';
import AppLoading from 'expo-app-loading'



const HappeningNow = () => {

    let [fontsLoaded] = useFonts({
        Sacramento_400Regular,
      });
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
    return (
        <SafeAreaView style={styles.safeArea}>
             <View style={styles.upcomingEventsContainer} >
             <View style={styles.eventLabel}>
            <Text style={[styles.eventText,{fontWeight:"800"}]}>Live - <Text style={{fontWeight:"400"}}>happening right now!</Text></Text>
            </View>
      <View style = {styles.eventsContainer}>

            <View style={styles.imageContainer}>
                <Image source={require("../../assets/fadedlogo.png")} style={styles.eventBanner}/>
            </View>
        </View>

        <View style={styles.eventDetails}>
            <View style={styles.joinAndSocialIcons}>
                <View style={styles.joinTextContainer}>
                    <Text style={styles.joinText}>Join now</Text>
                </View>

                <View style={styles.socialIcons}>
                    <TouchableOpacity style={styles.socialIconContainer}>
                    <Image style={styles.socialIcon} source={require("../../assets/zoom.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialIconContainer}>
                    <Image style={styles.socialIcon} source={require("../../assets/spaces.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialIconContainer}>
                    <Image style={styles.socialIcon} source={require("../../assets/facebook.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialIconContainer}>
                    <Image style={styles.socialIcon} source={require("../../assets/youtube.png")}/>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
        </View>
        </SafeAreaView>
    )
    
}}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f5f5f5", // Assuming a light grey background
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      },
      
      upcomingEventsContainer:{
       display:"flex",
       flexDirection:"column",
       width:wp("95%"),
       height: hp("51%"),
       padding:"2%",
       alignSelf:"center",
       //left:"2.5%"
       //borderWidth:1
       
   },
   eventsContainer:{
       display:"flex",
       flexDirection:"column",
       width:wp("95%"),
       height: hp("38%"),
       alignSelf:"center",
       //top:"10%"
      //borderWidth:1,
    },

    eventLabel:{
       display:"flex",
       flexDirection:"row",
       justifyContent:"center",
       alignItems:"center",
       flexWrap: "nowrap",
       width: "100%",
       height:  "14%",
       padding: "2%",
       alignSelf:"center"
     //borderWidth:1

    },

    eventText:{
       width: "100%",
       height: "100%",
       fontFamily: "Roboto",
       fontSize: 15,
       fontWeight: "500",
       lineHeight: 18,
       letterSpacing: 1,
       textAlign: "left",
       color:"#06447C"


    },
    imageContainer:{
       width: "100%",
       height: "85%",
       padding: "2%",
       gap: 10,
       // borderWidth:1,
       // borderColor:"red"

    },
    eventBanner:{
       width: "100%",
       height: "98%",
       borderRadius: 10,
       resizeMode:"cover"

    },
    eventDetails:{
      top:"-12%",
       display:"flex",
       flexDirection:"row",
       justifyContent:"space-between",
       width:"95%",
       height:"22%",
       alignSelf:"center",
      //borderWidth:1,
 },
 joinAndSocialIcons:{
   display:"flex",
   flexDirection:"row"
 },
 joinTextContainer:{
    width:"37%", 
       height: "80%",    
       paddingTop: "2%",
       paddingRigt: "2%", 
       paddingBottom:"2%",
       paddingLeft: "2%",  
       gap: 10,
      // borderWidth:1
 },
 joinText:{
    width: "100%",
    height: "100%",
    fontFamily: "Sacramento_400Regular",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 47,
    letterSpacing: 1,
    textAlign: "left",


 },
 socialIcons:{
    //flex:1,
    display:"flex",
    flexDirection:"row",
    width: "63%",
    height: "60%",
    //borderWidth:1,
   // borderColor:"red"

 },
 socialIconContainer:{
    width: "25%",
    height: "99%",
    padding: 10,
    gap: 10,
    //borderWidth:1

 },
 socialIcon:{
    width: "80%",
    height: "80%",
    borderRadius: 5,
    resizeMode:"cover"
    
 }


   
})

export default HappeningNow


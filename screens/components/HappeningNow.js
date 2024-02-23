import React, {useState,useEffect} from 'react';
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
import Live from './Live';
import axiosInstance from '../../axios_services/axios';

const HappeningNow = () => {

  const [data, setData] = useState([])

  const fetchLiveEvents = async () => {
    try {
      const response = await axiosInstance.get('http://20.84.147.6:8080/api/events/live');
     if (Array.isArray(response.data)) {
      setData(response.data)
     }else {
      console.log("data is not an array")
     }
     
    } catch (error) {
      // Handle the error or display a message
      console.error(error);
    }
  };

 // Use useEffect to call the fetchEvents function when the component mounts
  useEffect(() => {
    fetchLiveEvents();
   
  },[]);

  const scrollViewRef = React.useRef(null);
    
    return (
        <SafeAreaView style={styles.safeArea}>
             <ScrollView
              ref={scrollViewRef}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.container}
              >
             { Array.isArray(data) && data.map((event) =>(
          <Live key={event._id} event={event} />
        ))}
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


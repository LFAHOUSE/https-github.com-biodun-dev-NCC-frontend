import React, { useState,useEffect ,useCallback} from "react";
import * as SplashScreen from 'expo-splash-screen'
import moment from "moment";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useFonts, Sacramento_400Regular } from '@expo-google-fonts/sacramento';


const Live = ({ event }) => {
    const [appIsReady] =  useFonts({
      Sacramento_400Regular,
  });
  
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }
  
    const onLayoutRootView = useCallback(async () => {
      if (appIsReady) {
        await SplashScreen.hideAsync()
      }
    },[appIsReady])
  
    if (!appIsReady) {
      return null;
    } else {
    return (
        <View style={[styles.upcomingEventsContainer, {height: showDetails ? hp("65%") : hp("50%") }]} onLayout={onLayoutRootView} >
        <View style={styles.eventLabel}>
      <View style={styles.roundedContainer}><Text style={styles.rounded}></Text></View><Text style={[styles.eventText,{fontWeight:"800"}]}>Live - <Text style={{fontWeight:"400"}}>happening right now!</Text></Text>
       </View>
     <View style = {styles.eventsContainer}>

       <TouchableOpacity style={styles.imageContainer} onPress={toggleShowDetails}>
           <Image source={require("../../assets/event.png")} style={styles.eventBanner}/>
       </TouchableOpacity>
   </View>
   {showDetails && 
        <View style={styles.titleAndDesc}>
        <View style={styles.titletextcontainer}>
        <Text style={styles.titleText}>{event.title}</Text>
        </View>
         
         <View style={styles.desctextContainer}>
         <Text style={styles.descText}>{event.description}</Text>
         </View>
        
      </View>
       }
         
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
    );
 } };

  const styles = StyleSheet.create({
    upcomingEventsContainer:{
        display:"flex",
        flexDirection:"column",
        width:wp("100%"),
        alignSelf:"center",
        left:"2%",
        //borderWidth:1,
      
        
    },
    eventsContainer:{
        display:"flex",
        flexDirection:"column",
        width:wp("95%"),
        height: hp("38%"),
        
     },
 
     eventLabel:{
        display:"flex",
        flexDirection:"row",
        width: "100%",
        height:  "10%",
        padding: "2%",
       // right:"90%",
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
     titleAndDesc:{
      display:"flex",
      flexDirection:"column",
      //gap:2,
      top:"-10%",
      width:"100%",
      height:"28%",
      padding:"2%",
      // borderWidth:1,
      // borderColor:"red"
    },
    
    titletextcontainer:{
    height:"35%",
    width:"100%",
    alignSelf:"center",
    //borderWidth:1
    },
    titleText:{
      width: "100%",
     height: "100%",
     fontFamily: "Roboto",
     fontSize: 15,
     fontWeight:"800",
     lineHeight: 18,
     letterSpacing: 1,
     textAlign: "left",
    },
    desctextContainer:{
      flex:1,
      display:"flex",
      flexDirection:"row",
      width:"100%",
      height:"60%",
      alignSelf:'center',
      justifyContent:"center",
      alignItems:"center",
      //borderWidth:1
    },
    descText:{
      width: "100%",
     height: "100%",
     fontFamily: "Roboto",
     fontSize: 11,
     fontWeight: "700",
     lineHeight: 14,
     letterSpacing:0.5,
     //textAlign: "left",
     color:"#06447C",
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
  roundedContainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"center",
    width: 20,
    height: 20,
   // borderWidth:1,
    padding:10,
    marginHorizontal:5
  },
  rounded:{
    width: 15,
    height: 15,
    opacity: 0.9,
    borderRadius:100,
    backgroundColor:"red",
   // top:5,
  //  borderWidth:1
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
     width: 50,
     height: 40,
     padding: 10,
     gap: 10,
    // borderWidth:1
 
  },
  socialIcon:{
     width:25,
     height: 25,
     borderRadius: 5,
     resizeMode:"cover"
     
  }
 
  })
  export default Live;
import React, { useState,useEffect } from "react";
import moment from "moment";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useFonts, ShareTechMono_400Regular } from '@expo-google-fonts/share-tech-mono';
import AppLoading from "expo-app-loading";


const Event = ({ event }) => {
   let [fontsLoaded] = useFonts({
      ShareTechMono_400Regular,
    });
    const scrollViewRef = React.useRef(null);

  // Define a function to scroll forward
  const scrollForward = () => {
    // Get the current scroll position
    const currentPosition = scrollViewRef.current.getScrollResponder().scrollResponderHandleScrollEnd
      .nativeEvent.contentOffset.x;
    // Calculate the next scroll position by adding 320 (the width of the event component plus the margin)
    const nextPosition = currentPosition + 320;
    // Scroll to the next position with animation
    scrollViewRef.current.scrollTo({ x: nextPosition, y: 0, animated: true });
  };

  // Define a function to scroll backward
  const scrollBackward = () => {
    // Get the current scroll position
    const currentPosition = scrollViewRef.current.getScrollResponder().scrollResponderHandleScrollEnd
      .nativeEvent.contentOffset.x;
    // Calculate the previous scroll position by subtracting 320 (the width of the event component plus the margin)
    const previousPosition = currentPosition - 320;
    // Scroll to the previous position with animation
    scrollViewRef.current.scrollTo({ x: previousPosition, y: 0, animated: true });
  };
    // Use state to store the remaining time
    const [remainingTime, setRemainingTime] = useState("");
   const imageUrl = event?.imageUrl
    // Use effect to update the remaining time every second
    useEffect(() => {
      // Define a function to calculate the remaining time
      const calculateRemainingTime = () => {
        // Get the current time
        const now = moment();
        // Get the event time
        const eventTime = moment(event?.startDate);
        // Get the difference in milliseconds
        const diff = eventTime.diff(now);
        // Check if the event has passed
        if (diff <= 0) {
          // Set the remaining time to "Event has passed"
          setRemainingTime("Event has passed");
        } else {
          // Format the remaining time as "DD days HH hours MM minutes"
          const duration = moment.duration(diff);
          const formattedTime= moment(duration).format("DD:HH:MM:SS")
          // Set the remaining time to the formatted time
          setRemainingTime(formattedTime);
        }
      };
  
      // Call the function once
     calculateRemainingTime();
      // Set an interval to call the function every second
      const interval = setInterval(calculateRemainingTime, 1000);
      // Return a cleanup function to clear the interval
      return () => clearInterval(interval);
    }, [event?.startDate]);
  
    // Return the JSX element
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
    return (
      <View style={styles.upcomingEventsContainer} >
        <View style = {styles.eventsContainer}>
  
              <View style={styles.imageContainer}>
                  <Image source={{uri:event.imageUrl}}  style={styles.eventBanner}/>
              </View>
          </View>

          <View style={styles.titleAndDesc}>
        <View style={styles.titletextcontainer}>
        <Text style={styles.titleText}>{event.title}</Text>
        </View>
         
         <View style={styles.desctextContainer}>
         <Text style={styles.descText}>{event.description}</Text>
         </View>
        
      </View>
  
          <View style={styles.eventDetails}>
              <TouchableOpacity>
              <Image source={require("../../assets/double-arrow-left.png")}  style={styles.arrowBackward}/>
              </TouchableOpacity>
              <View style={styles.countDownContainer}>
                  <Text style={styles.countdowntitleText}>Countdown:</Text>
                  <Text style={styles.timerText}>{remainingTime}</Text>
                  <Text style={styles.daysCount}>D:H:M:S</Text>
              </View>
              <View style={styles.registrationContainer}>
                  <Text style={styles.regtitleText}>Registration</Text>
                  <Text style={styles.regtext}>Registration is free</Text>
                  <TouchableOpacity style={{height:"100%"}} >
                      <Text style={styles.regtexttwo}>Click here to register</Text>
                      </TouchableOpacity>
  
              </View>
              
              <TouchableOpacity >
              <Image source={require("../../assets/double-arrow-right.png")} style={styles.arrowBackward}/>
              </TouchableOpacity>
          </View>
  
  
          </View>
    );
 } };

  const styles = StyleSheet.create({
    upcomingEventsContainer:{
        display:"flex",
       flexDirection:"column",
       width:wp("95%"),
       height: hp("60%"),
       //top:"10%",
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
      // borderWidth:1,
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
      width:"100%",
      height:"60%"
    },
    descText:{
      width: "100%",
     height: "100%",
     fontFamily: "Roboto",
     fontSize: 13,
     fontWeight: "400",
     lineHeight: 14,
     letterSpacing:1,
     textAlign: "left",
     color:"#000000",
    },
    eventDetails:{
      top:"-12%",
       display:"flex",
       flexDirection:"row",
       justifyContent:"space-between",
       width:"95%",
       height:"22%",
       alignSelf:"center",
      // borderWidth:1,

    },
    arrowBackward:{
       width: 20,
       height: 11,
       top: "30%",

    },

    countDownContainer:{
      display:"flex",
      flexDirection:"column",
       width: "40%",
       height: "90%",
       alignItems:"center",
       paddingTop:"0%",
       paddingRight:"2%",
       paddingBottom:"2%",
       paddingLeft:"2%",
       // borderWidth:1,
       // borderColor:'green'

    },
    countdowntitleText:{
       width: "100%",
       height: "35%",
       fontFamily: "Roboto",
       fontSize: 15,
       fontWeight: "800",
       lineHeight: 18,
       letterSpacing: 1,
       textAlign: "left",
       color:"#000000"

    },
    timerText:{
       width: "90%",
       height: "25%",
       fontFamily: "ShareTechMono_400Regular",
       fontSize: 15,
       fontWeight: "400",
       lineHeight: 17,
       letterSpacing: 1,
       textAlign: "left",
       color:"#FF0303"

    },
    daysCount:{
       width: "70%",
       height: "25%",
       fontFamily: "ShareTechMono_400Regular",
       fontSize: 15,
       fontWeight: "400",
       lineHeight: 17,
       letterSpacing: 1,
       textAlign: "left",
       color:"#06447C61",
       opacity:0.38,
       //backgroundColor: "#06447C61",



    },
    registrationContainer:{
       display:"flex",
       flexDirection:"column",
       width: "45%",
       height: "80%",
       gap:4,

    },
    regtitleText:{
       width: "100%",
       height: "35%",
       fontFamily: "Roboto",
       fontSize: 15,
       fontWeight:"800",
       lineHeight: 18,
       letterSpacing: 1,
       textAlign: "left",


    },
    regtext:{
       width: "100%",
       height: "25%",
       fontFamily: "Roboto",
       fontSize: 11,
       fontWeight: "400",
       lineHeight: 13,
       letterSpacing:1,
       textAlign: "left",
       color:"#000000"

       //top: 932,
      // left: 194,
       
    },
    regtexttwo:{
       width: "100%",
       height: "30%",
       fontFamily: "Roboto",
       fontSize: 11,
       fontWeight: "600",
       lineHeight: 13,
       letterSpacing: 0,
       textAlign: "left",
       color:'#6EB1E1'

       

    }
  })
  export default Event;
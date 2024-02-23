import React,{useState, useEffect} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar
} from 'react-native'

import axiosInstance from '../../axios_services/axios'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Event from './Event'
import { Button } from 'react-native-paper'


const UpcomingEvents = () => {
  
  const [data, setData] = useState([])

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get('http://20.84.147.6:8080/api/events/upcoming');
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
    fetchEvents();
   
  },[]);
  
  console.log("Upcoming events: "+  data)

  

  
   // Use a ref to access the scroll view
  const scrollViewRef = React.useRef(null);

  // Define a function to scroll forward
  const scrollforward = () => {
    // Get the current x and y coordinates of the content
    const currentX = scrollViewRef.current.contentOffset.x;
    const currentY = scrollViewRef.current.contentOffset.y;

    // Calculate the new x and y coordinates for scrollforward
    // You can adjust the values according to your item width and height
    const newX = currentX + 300;
    const newY = currentY;

    // Scroll the content to the new position
    scrollViewRef.current.scrollTo({ x: newX, y: newY });
  };
  // Define a function to scroll backward
  const scrollbackward = () => {
    // Get the current x and y coordinates of the content
    const currentX = scrollViewRef.current.contentOffset.x;
    const currentY = scrollViewRef.current.contentOffset.y;

    // Calculate the new x and y coordinates for scrollbackward
    // You can adjust the values according to your item width and height
    const newX = currentX - 300;
    const newY = currentY;

    // Scroll the content to the new position
    scrollViewRef.current.scrollTo({ x: newX, y: newY });
  };

      

    return (
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.eventLabel}>
            <Text style={styles.eventText}>Upcoming events </Text>
            </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.container}
      >
        { Array.isArray(data) && data.map((event) =>(
          <Event key={event._id} event={event} />
        ))}
       
      </ScrollView>
      {/* <View style={styles.navButton}>
        <TouchableOpacity onPress={scrollbackward}>
              <Image source={require("../../assets/double-arrow-left.png")}  style={styles.arrowBackward}/>
              </TouchableOpacity>

              <TouchableOpacity onPress={scrollforward} >
              <Image source={require("../../assets/double-arrow-right.png")} style={styles.arrowBackward}/>
              </TouchableOpacity> 
        </View> */}
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
   // flexGrow: 1,
    justifyContent: "space-between",
    padding:"2%",
    // gap:5,
    flexDirection:"row"
  },
  eventLabel:{
    display:"flex",
    flexDirection:"row",
    flexWrap: "nowrap",
    width: "50%",
    height:  "9%",
    padding: "2%",
   // top:"-10%",
    left:"2%",
    //gap: 10,
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
navButton:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:"80%",
    height:"5%",
    borderWidth:1,
    top:"-5%",
    alignSelf:"center"
},
button:{
  alignSelf:"center",
  marginTop:"10%",
  width:wp("89%"),
  height:hp('7%'),
  borderRadius:10,
  left:"2%",
  marginTop:"15%"
},
   

})
export default UpcomingEvents
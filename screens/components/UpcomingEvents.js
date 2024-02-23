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

      

    return (
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.eventLabel}>
            <Text style={styles.eventText}>Upcoming events </Text>
            </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        { Array.isArray(data) && data.map((event) =>(
          <Event key={event._id} event={event} />
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
   

})
export default UpcomingEvents
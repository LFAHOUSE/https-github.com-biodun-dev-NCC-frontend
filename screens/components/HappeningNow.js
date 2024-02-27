import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  View,
 
  ScrollView,
  
  StatusBar,
  SafeAreaView,
} from 'react-native';
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
   
})

export default HappeningNow


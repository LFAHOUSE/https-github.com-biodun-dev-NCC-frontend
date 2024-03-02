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

const dummyData = [
  {
    "_id": "65d74755a9995c8d7471c58f",
    "title": "Tech Conference 2024",
    "description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
    "startDate": "2024-03-15T09:00:00.000Z",
    "endDate": "2024-03-16T17:00:00.000Z",
    "isLive": true,
    "imageUrl": "../../assets/event.png",
    "__v": 0
  },
  {
    "_id": "65d74755a9995c8d7471c58b",
    "title": "Tech Conference 2024",
    "description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
    "startDate": "2024-03-15T09:00:00.000Z",
    "endDate": "2024-03-16T17:00:00.000Z",
    "isLive": true,
    "imageUrl": "../../assets/event.png",
    "__v": 0
  },
  {
    "_id": "65d74755a9995c8d7471c58a",
    "title": "Tech Conference 2024",
    "description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
    "startDate": "2024-03-15T09:00:00.000Z",
    "endDate": "2024-03-16T17:00:00.000Z",
    "isLive": true,
    "imageUrl": "../../assets/event.png",
    "__v": 0
  },
  {
    "_id": "65d74755a9995c8d7471c58y",
    "title": "Tech Conference 2024",
    "description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
    "startDate": "2024-03-15T09:00:00.000Z",
    "endDate": "2024-03-16T17:00:00.000Z",
    "isLive": true,
    "imageUrl": "../../assets/event.png",
    "__v": 0
  },
]


const HappeningNow = () => {

  const [data, setData] = useState([])

  // const fetchLiveEvents = async () => {
  //   try {
  //     const response = await axiosInstance.get('http://20.84.147.6:8080/api/events/live');
  //     setData(response.data) 
   
  //   } catch (error) {
  //     // Handle the error or display a message
  //     console.error(error);
  //   }
  // };

 //Use useEffect to call the fetchEvents function when the component mounts
  // useEffect(() => {
  //   fetchLiveEvents();
   
  // });

  const scrollViewRef = React.useRef(null);
    
    return (

             <ScrollView
              ref={scrollViewRef}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.container}
              >
             { Array.isArray(dummyData) && dummyData.map((event) =>(
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
        paddingTop:25
       },
   
})

export default HappeningNow


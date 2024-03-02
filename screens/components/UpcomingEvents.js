import React,{useState, useEffect} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    SafeAreaView,
    StatusBar
} from 'react-native'

import axiosInstance from '../../axios_services/axios'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Event from './Event'



const UpcomingEvents = () => {
  
  const [data, setData] = useState([])
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

  

 //Use useEffect to call the fetchEvents function when the component mounts
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await axiosInstance.get('http://20.84.147.6:8080/api/events/upcoming');
  //      setData(response.data)
  //      }
       
  //     catch (error) {
  // //       // Handle the error or display a message
  //       console.error(error.response.data.message);
  //     }
  //   };

  //   fetchEvents()
   
  // });
  


  

  
   // Use a ref to access the scroll view
  const flatListRef = React.useRef(null);
  const [scrollPosition,setScrollPosition] = useState(0)

  // Define a function to scroll forward
  const scrollforward = () => {
   setScrollPosition(scrollPosition + 340)
   flatListRef.current.scrollToOffset({offset:scrollPosition + 340})
  };
  // Define a function to scroll backward
  const scrollbackward = () => {
    // Get the current x and y coordinates of the content
    setScrollPosition(scrollPosition - 340)
    flatListRef.current.scrollToOffset({offset:scrollPosition -340})
 
  };

  const handleScroll = (event) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.x
    setScrollPosition(currentScrollPosition)
  }
 
      //renderItem
  
      const renderItem = ({ item,index }) => {
         return (
        <Event event={item} scrollbackward={scrollbackward} scrollforward={scrollforward}/>
       );
      } ;

    return (
      
      <SafeAreaView style={styles.safeArea}>
       
        {/* <View style={styles.eventLabel}>
            <Text style={styles.eventText}>Upcoming events </Text>
            </View> */}
            <FlatList
            ref={flatListRef}
            data={dummyData}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={(item,index) => item._id.toString()}
            onScroll={handleScroll}
            />
          
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
    width: "100%",
    height:  "9%",
    padding: "2%",
   // top:"15%",
    left:"2%",
    //gap: 10,
  //borderWidth:1

 },
 eventText:{
  width: "100%",
  height: "100%",
  fontFamily: "Roboto",
  fontSize: 18,
  fontWeight: "700",
  lineHeight: 18,
  letterSpacing: 1,
  textAlign: "left",
  color:"#06447C"


},

})
export default UpcomingEvents
import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
 FlatList
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
  const [loading,setLoading] = useState(false)

  const fetchLiveEvents = async () => {
    try {
      const response = await axiosInstance.get('http://20.84.147.6:8080/api/events/live');
      return response.data
   
    } catch (error) {
      // Handle the error or display a message
      console.error(error);
    }
  };


  useEffect(() => {
    setLoading(true);
    fetchLiveEvents().then(data => {
      setData(data);
      setLoading(false);
    });
  }, []);


  const scrollViewRef = React.useRef(null);
    
    return (

      <View>
      {loading ? (
<ActivityIndicator size="large" color="#0000ff" />
) : data?.length > 0 ? (
      <FlatList
      data={data}
      horizontal={true}
      renderItem={({item}) => <Live event={item}/>}
      keyExtractor={(item,index) => item._id}
      removeClippedSubviews={true}
      maxToRenderPerBatch={5}
      initialNumToRender={2}
      windowSize={5}
      />
      ) : (
        <Text style={styles.error}>No data found</Text>
      )}
</View>
   
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


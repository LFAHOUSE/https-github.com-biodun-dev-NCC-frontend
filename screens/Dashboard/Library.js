import React,{useEffect, useState} from 'react';
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    FlatList
  
} from 'react-native'
import Collapsible from 'react-native-collapsible';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import DashboardHeader from "../components/DashboardHeader";
import DashboardFooter from "../components/DashboardFooter";
import MyCalendar from "../components/MyCalendar";
import {formatEvents, groupEventsByMonth} from '../../utils/formatLibEvents.js'
import { Link } from '@react-navigation/native';
import RenderLibEvents from '../components/RenderLibEvents.js';

const dummyData = [
	{
		"_id": "65d74755a9995c8d7471c58f",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/564x/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d7478be82d58bdfcc5ce9d",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/564x/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d748c329be716bc7463dc6",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d748f229be716bc7463dca",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
		"startDate": "2024-06-13T09:00:00.000Z",
		"endDate": "2024-08-14T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/564x/8b/a5/2f/8ba52fc673d49c27f134f6b26418edce.jpg",
		"__v": 0
	},
	{
		"_id": "65d7492529be716bc7463dd0",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
		"startDate": "2024-06-15T09:00:00.000Z",
		"endDate": "2024-08-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d7491429be716bc7463dce",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
		"startDate": "2024-06-13T09:00:00.000Z",
		"endDate": "2024-08-14T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/564x/8b/a5/2f/8ba52fc673d49c27f134f6b26418edce.jpg",
		"__v": 0
	},
	{
		"_id": "65d7493fe74407fa1046230e",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities for tech enthusiasts.",
		"startDate": "2024-06-13T09:00:00.000Z",
		"endDate": "2024-08-14T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/564x/8b/a5/2f/8ba52fc673d49c27f134f6b26418edce.jpg",
		"__v": 0
	},
	{
		"_id": "65d748c329be716bc7463dc7",
		"title": "Church Leadership Summit 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities...",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b409...",
		"__v": 0
	},
	{
		"_id": "65d748c329be716bc7463dc9",
		"title": "Church Leadership Summit 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities...",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b409...",
		"__v": 0
	},
	{
		"_id": "65d89ce35102776ce275a684",
		"title": "Church Leadership Summit 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities...",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b409...",
		"__v": 0
	},
	{
		"_id": "65d89e8b5102776ce275a693",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities.",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d89ea8586614ad38c665a5",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities.",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d89f31bdc4d4d245194ee1",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities.",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d89f74bdc4d4d245194ee4",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities.",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d89fd32c1d6e4e985dad79",
		"title": "Tech Conference 2024",
		"description": "An engaging two-day event filled with workshops, panels, and networking opportunities.",
		"startDate": "2024-03-15T09:00:00.000Z",
		"endDate": "2024-03-16T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d8a0f68ea71063ea19ac43",
		"title": "Digital Ministry Workshop 2024",
		"description": "Explore the intersection of faith and technology to enhance your ministry's digital presence.",
		"startDate": "2024-04-12T10:00:00.000Z",
		"endDate": "2024-04-13T18:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d8a10c8ea71063ea19ac47",
		"title": "Faith and Family Conference 2024",
		"description": "Strengthen family bonds through faith-based activities and discussions.",
		"startDate": "2024-05-20T09:30:00.000Z",
		"endDate": "2024-05-21T17:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d8a1428ea71063ea19ac4b",
		"title": "Youth Leaders Summit 2024",
		"description": "Empowering the next generation of church leaders with workshops, mentorship, and fellowship.",
		"startDate": "2024-07-15T08:00:00.000Z",
		"endDate": "2024-07-16T16:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d8a1528ea71063ea19ac4f",
		"title": "Global Prayer Retreat 2024",
		"description": "Join believers from around the world in a serene setting to deepen your prayer life.",
		"startDate": "2024-08-22T09:00:00.000Z",
		"endDate": "2024-08-24T19:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	},
	{
		"_id": "65d8a15f8ea71063ea19ac53",
		"title": "Church Musician Symposium 2024",
		"description": "A gathering for church musicians to learn, share, and worship together through music.",
		"startDate": "2024-09-18T10:00:00.000Z",
		"endDate": "2024-09-19T18:00:00.000Z",
		"isLive": true,
		"imageUrl": "https://i.pinimg.com/originals/8e/5c/5d/8e5c5d6c10f8717176bec34011b4096e.jpg",
		"__v": 0
	}
]

const Library = () => {

  const eventsByMonth = formatEvents(dummyData)

 
  const getYear = () => {
    const date = new Date();
    const year = date.getFullYear();

    return `All Events, ${year}`
  }



useEffect(() => {
 
  try {
    const newEvents = groupEventsByMonth(eventsByMonth)

    const parsedData = newEvents.map(month => {
      return {
        ...month,
        events: month.events.map(event => {
          return {
            ...event,
            startDate: event.startDate.toString(),
            endDate: event.endDate.toString()
          }
        })
      }
    });
  
    // Set the state with the parsed data
    setGroupedEvent(parsedData)
   
  }catch(error){
     console.log(error)
  }
  
},[])

//const groupedEvents = groupEventsByMonth(eventsByMonth)

const [groupedEvents, setGroupedEvent] = useState([])
const [searchText, setSearchText] = useState("")

const [collapsed, setCollapsed] = useState(
  // initialize it with an array of true values
  groupedEvents?.map(() => true)
);

const toggleSection = (index) => {
  const newCollapsed = [...collapsed];
  newCollapsed[index] = !newCollapsed[index];
  setCollapsed(newCollapsed);

};

console.log("groupedEvents: "+ JSON.stringify(groupedEvents,null, 2))

  const renderItem = ({ item,index}) => {
  let {month,events} = item
    return (

      <View style={styles.tooltipContainer} key={item.month}>
      <View style={styles.monthAndLogo}>
  
  
       
          <View style={styles.monthContainer}>
              <Text style={styles.monthText}>{month}</Text>
          </View>
      
          {collapsed[index] ?  <TouchableOpacity style={styles.logoContainer}  onPress={()=>toggleSection(index)} activeOpacity={0.8} >
              <Image source={require("../../assets/free-icon-double-arrow-up.png")} style={styles.arrow} />
          </TouchableOpacity> : <TouchableOpacity style={styles.logoContainer}  onPress={() => toggleSection(index)} >
              <Image source={require("../../assets/double-arrow-down-.png")} style={styles.arrow} />
          </TouchableOpacity>}
  
  </View>
  
  {events.map((event) => (
    <Collapsible collapsed={collapsed[index]} key={event._id} >
    <View style={styles.dateAndTitle} >
    <View style={styles.date}>
    <Text style={styles.dateText}>{event.startDate }</Text>
    </View>
    <View style={styles.title}>
    <Text style={styles.titleText}>{event.title}</Text>
    </View>
    </View>
    </Collapsible>
  ))}
  </View>
    )
  };




  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.searchContainer}>
               <View style={styles.searchInputContainer}>
                    <TouchableOpacity style={styles.searchIconContainer}>
                        <Image source={require("../../assets/search.png")} style={styles.searchIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder='Messages, music, events, or books'
                        value={searchText}
                        onChangeText={setSearchText}
                        keyboardType='name-phone-pad'
                        />
                    </TouchableOpacity>
                
                </View>
            
            </View>
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{getYear()}</Text>
            </View>
      </ScrollView>
      <FlatList
          data={Object.values(groupedEvents)}
          renderItem={renderItem}
           keyExtractor={(event) => event.month}
           contentContainerStyle={{gap:20}}
           ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
           //collapsable={true}
          /> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Assuming a light grey background
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
  display:"flex",
  justifyContent: "space-between",
  padding: "2%",
  gap:30,
  flexDirection: "column",
  },
  searchContainer:{
    width: wp("82%"),
    height: hp("7.5%") ,
    //top: 115,
    left: "8%",
    borderRadius: 10,
    borderWidth:0.5,
    borderColor:"#000000",
   // backgroundColor:"red"

  },
  searchInputContainer:{
    flex:1,
    flexDirection:'row',
    width: "100%",
    height: "90%",
    padding: 10,
    //gap: 10,
    borderRadius:20,
    // borderWidth:1,
    // borderColor:"#ddd"

  },
  searchIconContainer:{
   // flex:1,
   alignSelf:'center',
    width: "20%",
    height:"170%",
    padding: 10,
    gap: 10,
    //borderWidth:1

  },
  searchIcon:{
    width: "90%",
    height: "90%",

  },

  inputContainer:{
    flex:1,
    width:"100%",
    height:"100%",
    padding: 10,
    gap: 10,
    //borderWidth:1

  },
  input:{
    width: "100%",
    height: 15,
    fontFamily: "Roboto",
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 13,
    letterSpacing: 0.5,
    textAlign: "left",
    color:"#AA9A9A"


  },

  labelContainer:{
    width: wp("100%"),
    height: hp("15%"),
    paddingVertical:10,
    left: "4%",
    padding: "2%",
    gap: 10,
    //borderWidth:1

  },
  labelText:{
    flex:1,
    width: "100%",
    height: "100%",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: "left",
    color:"#06447C"


  },

  tooltipContainer:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    width:wp("85%"),
    alignSelf:"center",
    // height: "20%",
    //top: 100,
    //left: "8%",
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor:"#6EB1E1"

  },

  monthAndLogo:{
    flex:1,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignContent:"center",
    width: "100%",
    height: "23%",
    gap: 187,
    borderWidth:1

  },
  monthContainer:{
    //flex:1,
    width: "40%",
    height:"100%",
    padding: "2%",
    gap: 10,
   // borderWidth:1

  },
  monthText:{
    flex:1,
    width: "100%",
    height: "100%",
    padding: "1%",
    gap: 10,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 19,
    letterSpacing: 0.5,
    textAlign: "left",
  },

  logoContainer:{
    display:"flex",
    alignItems:"center",
   // padding:10,
    width: "10%",
    height: "100%",
    padding: 10,
    right:"90%",
    gap: 10,
    //borderWidth:1

  },
  arrowDownButton: {
    fontSize: 24,
    marginBottom: 10,
    color:"#000000",
    padding:15,
    height:"100%",
    width:24,
    backgroundColor:"blue",
    borderWidth:1

  },
  arrow:{
    width:"100%",
    height:"80%",
    //backgroundColor:"#ddd"

  },
  dateAndTitle:{
    flex:1,
    display:"flex",
    flexDirection:"row",
    width:"100%",
    height: "29%",
    gap: 14,
    //borderWidth:0.5
  },

  date:{
    flex:1,
width: "30%",
height:"75%",
paddingTop: 10, 
paddingRight:10,
paddingBottom: 10,
paddingLeft: 5,
gap: 10,
//borderWidth:1
},
  dateText:{
    width: "100%",
    height: "100%",
    fontFamily: "Roboto",
    fontSize: 11,
    fontWeight: "800",
    lineHeight: 13,
    letterSpacing: 0.5,
    textAlign: "left",


  },

  title:{
   // flex:1,
    width: "65%",
    height: 50,
    paddingTop: 5, 
    paddingRight:10,
    paddingBottom: 10,
    paddingLeft: 10,
    gap: 10,
   // borderWidth:1

  },
  titleText:{
    display:"flex",
    flexDirection:"row",
    width: "100%",
    height: "100%",
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 15,
    letterSpacing: 0.5,
    textAlign: "left",


  },



  // container: {
  //   flex: 1,
  //   padding: 10,
  // },
  month: {
    width:"100%",
    marginVertical: 10,
    backgroundColor:'red',
    color:"#fff",
    left:23
  },
  monthName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  event: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  eventDate: {
    fontSize: 16,
    color: 'darkgray',
  },
  eventDescription: {
    fontSize: 16,
    color: 'black',
  },

});



export default Library;

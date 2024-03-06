import React,{useEffect, useState} from 'react';
import {
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
 
  
} from 'react-native'
import Collapsible from 'react-native-collapsible';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


const RenderLibrary = ({ item,index,groupedEvents}) => {

    const [collapsed, setCollapsed] = useState(
        groupedEvents?.map(() => true)
      );
    
      function toggleSection(index) {
        const newCollapsed = [...collapsed];
        newCollapsed[index] = !newCollapsed[index];
        setCollapsed(newCollapsed);
      
      };
      
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

    export default RenderLibrary;
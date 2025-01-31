
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
  } from "react-native";
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
  const PageHeader = ({onBack,pageTitle}) => {
     return(
     <ImageBackground style={{width:wp("100%"),height:hp("16%")}} source={require("../../assets/banner.png")}>
    <View style={styles.pageHeader}>
      <View style={styles.headerContainer}>
    {/* Logo and title */}
      <View style={styles.arrowAndTitle}>
        <View style={styles.arrow}>
          <TouchableOpacity onPress={onBack}>
          <Image source={require('../../assets/arrow-back.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>{pageTitle}</Text>
        </View>
      </View>

  <View style={styles.logoAndText}>
      <View style={styles.logoContainer}>
      <Image source={require("../../assets/logo.png")} style={styles.appLogo}/>
      </View>

      <View style={styles.textContainer}>
      <Text style={styles.text}>New Covenant Church</Text>
      </View>
   
      </View> 
      </View>  
     </View>
     </ImageBackground>
     )
  }


  const styles = StyleSheet.create({
    pageHeader:{
      width:wp("100%"),
      height:hp("16%"),
      gap:10,
     // borderWidth:1
      
    },
    headerContainer:{
      display:'flex',
      flexDirection: 'row',
      padding: "2%",
      width:wp("98%"),
      height:hp("15%") ,
      gap:107,
      //borderWidth:1
     
    },
    titleText:{
      fontSize: 18,
      fontWeight: '800',
      fontFamily:"Roboto",
      color: '#000',
      width:"160%",
      height:"180%",
      //borderWidth:1,
    },

    arrowAndTitle:{
      display:"flex",
      flexDirection:'column',
      width:wp("30%"),
      height:hp("13%"),
      gap:16,
      //borderWidth:1
    },
    logoAndText:{
      flex:1,
      flexDirection:"row",
      width:wp("100%"),
      height:hp("13%"),
      right:10,
      //borderWidth:1
    },
    logoContainer:{
      width:"40%",
      height:"90%",
      paddingTop: 24,
      paddingRight: 10,
      paddingBottom: 0,
      paddingLeft: 10,
      gap:10,
      //borderWidth:1,
     left:"1%",
     // left:215
     marginTop:5
    },
    textContainer:{
      paddingTop: "20%",
      paddingRight: 10,
      paddingBottom:10,
      paddingLeft: 10,
      gap:10,
      width:"65%",
      maxHeight:"100%",
      top:'1%',
      //borderWidth:1,
      //left:257,
        right:"10%"
    },
    text:{
      width:90.05,
      height:90,
      flexDirection:"column"
    },
    
    backButton: {
      padding: 5,
    },

    title: {
      width:142,
      height: 41,
      paddingTop: '10',
      paddingRight: 10, 
      paddingBottom:10,
      paddingLeft: '0',
      gap: 10,

      top:2,
      gap:10,
      
    },
  appLogo: {
      width: 40,
      height: 40,
    },
  })
  export default PageHeader;

  
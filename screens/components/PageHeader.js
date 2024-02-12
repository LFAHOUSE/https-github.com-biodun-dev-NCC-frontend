
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
  } from "react-native";
  
  const PageHeader = ({onBack,pageTitle}) => {
     return(
     <ImageBackground style={{width:360,height:100}} source={require("../../assets/banner.png")}>
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
      width:360,
      height:100,
      gap:10,
      
    },
    headerContainer:{
      display:'flex',
      flexDirection: 'row',
      padding: 5,
      width:318,
      height:71 ,
      gap:107,
      //gap:80
     
    },
    titleText:{
      fontSize: 15,
      fontWeight: '800',
      color: '#000'
    },

    headerContent:{
      display:"flex",
      flexDirection:"column"
    },
    arrowAndTitle:{
      display:"flex",
      flexDirection:'column',
      width:108,
      height:71,
      gap:16
    },
    logoAndText:{
      flex:1,
      flexDirection:"row",
      width:103,
      height:71,
      right:10
    },
    logoContainer:{
      width:60,
      height:71,
      paddingTop: 24,
      paddingRight: 10,
      paddingBottom: 0,
      paddingLeft: 10,
      gap:10,
     // left:215
     marginTop:5
    },
    textContainer:{
      paddingTop: 23,
      paddingRight: 10,
      paddingBottom:10,
      paddingLeft: 10,
      gap:10,
      maxWidth:61,
      maxHeight:69,
      top:'2px',
      //left:257,
      right:20
    },
    text:{
      width:90.05,
      height:90,
      flexDirection:"column"
    },
    
    backButton: {
      padding: 5,
    },
    titleContainer: {
      flex: 1,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems: 'center',
      height:60,
      marginBottom:10
    },

    title: {
      top:2,
      gap:10,
      
    },
  appLogo: {
      width: 40,
      height: 40,
    },
  })
  export default PageHeader;

  
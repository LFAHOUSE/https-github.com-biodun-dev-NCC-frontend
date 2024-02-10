
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
  } from "react-native";
  import { Ionicons } from '@expo/vector-icons';
  
  const PageHeader = ({onBack,pageTitle}) => {
     return(
    <View style={styles.pageHeader}>
      {/* container for the back arrow and the app logo */}
     <View style={styles.headerContainer}> 
      <Ionicons name="arrow-back" size={40} color="black"  onPress={onBack}/>
      </View>
     {/* container for the page title */}
     <View style={styles.titleContainer}>
      <Text style={styles.title}>{pageTitle}</Text>
      <Image source={require("../../assets/logo.png")} style={styles.appLogo}/>
     </View>
     <View style={{borderBottomColor:"black", borderBottomWidth:StyleSheet.hairlineWidth}}></View>
   </View>
     )
  }

  const styles = StyleSheet.create({
    pageHeader:{

    },
    headerContainer:{
      flexDirection: 'row',
      // alignItems: 'center',
      justifyContent: 'space-between',
      // height: 60,
      // backgroundColor: '#f0f0f0',
      padding: 5,
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
      fontSize: 15,
      fontWeight: 'bold',
      color: '#000',
    },
  appLogo: {
      width: 65,
      height: 65,
      resizeMode: 'contain',
    },
  })
  export default PageHeader;

  
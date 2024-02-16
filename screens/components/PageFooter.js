import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image, 
    SafeAreaView,
    ScrollView
} from 'react-native'


const PageFooter = () => {
    return (
        <View style={styles.footerView}>
          <View style={styles.privacyAndReserverd}>

          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>
              ©2024 All rights reserved. v.1.0.1
            </Text>
            </View>

            <View style={styles.privacy}>
            <TouchableOpacity>
              <Text style={styles.privacyText}>
                Term Policy - Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
         </View >

          <View style={styles.footerImageContainer}>
          <TouchableOpacity >
            <Image
              source={require("../../assets/footerimage.png")} // Make sure the path to your logo image is correct
              resizeMode="contain"
              style={styles.footerImage}
            />
          </TouchableOpacity>
          </View>

        </View>
    
    )
}

const styles = StyleSheet.create({
  footerView: {
    display:'flex',
    padding:10,
    flexDirection:"column",
    width:"100%",
    height:70,
    display: "flex",
    flexDirection: "row",
     gap: 10,
    alignSelf: "center",
    //borderWidth:1,
    alignItems:"center"
  },
      footerTextContainer: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        width:'100%',
        height:'40%',
        paddingTop:'10',
        paddingRight:'10',
        paddingBottom:'10',
        paddingLeft:'0',
        gap:10,
        marginBottom: 5,
        //borderWidth:1,
        left:"50%",
        alignSelf:"center",
      },
      privacyAndReserverd:{
        display:'flex',
        flexDirection:'column'
      },
      privacyText:{
        width:137,
        height:13,
        fontFamily:"Roboto",
        fontWeight:'400',
        fontSize:11,
        lineHeight:13,
        color:"#06447C",
      //  left:"50%"
      },
      footerText:{
        width:'169px',
        height:'13px',
        gap:2,
        //borderWidth:1
      },
      privacy:{
        width:159,
        height:23,
        paddingTop:'0',
        paddingRight:'2',
        paddingBottom:'0',
        paddingLeft:'20',
        gap:10,
        //borderWidth:1,
        left:"30%"
        
      },
      footerLink: {
        fontSize: 14,
        color: "#0000FF",
       // marginBottom: 40,
      },
      
      footerImageContainer: {
        marginTop: 12,
        height: 50,
        width: 44,
        padding:10,
        gap:10,
        left:"30%"
      },
      footerImage:{
        width:33,
        height:37
      }
})

export default PageFooter;
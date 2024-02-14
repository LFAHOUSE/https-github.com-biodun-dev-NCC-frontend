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
    width:203,
    height:50,
    display: "flex",
    flexDirection: "row",
     gap: 10,
    alignSelf: "center",
  },
      footerTextContainer: {
        width:'179',
        height:'27',
        paddingTop:'10',
        paddingRight:'10',
        paddingBottom:'10',
        paddingLeft:'0',
        gap:10,
        //marginBottom: 5,
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
        color:"#06447C"
      },
      footerText:{
        width:'169px',
        height:'13px',
        gap:2
      },
      privacy:{
        width:159,
        height:23,
        paddingTop:'0',
        paddingRight:'2',
        paddingBottom:'0',
        paddingLeft:'20',
        gap:10
        
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
        gap:10
      },
      footerImage:{
        width:33,
        height:37
      }
})

export default PageFooter;
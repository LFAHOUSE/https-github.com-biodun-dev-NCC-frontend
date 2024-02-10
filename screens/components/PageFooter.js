import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image, 
} from 'react-native'


const PageFooter = () => {
    return (
        <View style={styles.footerView}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              ©2024 All rights reserved. v.1.0.1
            </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>
                Term Policy - Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.footerText}>
            <Image
              source={require("../../assets/footerimage.png")} // Make sure the path to your logo image is correct
              resizeMode="contain"
              style={styles.footerImage}
            />
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        // marginTop: 40,
        alignItems: "center",
      },
      footerText: {
        fontSize: 14,
        color: "#000",
        marginBottom: 5,
      },
      footerLink: {
        fontSize: 14,
        color: "#0000FF",
        marginBottom: 40,
      },
      footerView: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      footerImage: {
        marginTop: 12,
        height: 30,
        width: 33,
      },
      
})

export default PageFooter;
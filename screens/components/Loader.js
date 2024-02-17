import React from 'react';
import {
    View,
    StyleSheet,
    Image, 
    SafeAreaView,
    ScrollView,
    StatusBar,
    ActivityIndicator
} from 'react-native'


const Loader = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
           
             <View style={styles.loaderParentContainer}>
              <Image source={require("../../assets/NCC-LOGO.png")} style={styles.loaderImage}/>
              <ActivityIndicator/>
             </View>
           
            </ScrollView>
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
        flexGrow: 1,
          justifyContent: "space-between",
          padding:"2%",
           gap:20,
          flexDirection:"column"
      },

      loaderParentContainer:{
        width: "35%",
        height: "21%",
        top: "40%",
        left: "34%",
        padding: "1%",
        gap: 40,
        //borderWidth:1

      },

      loaderImage:{
        display:"flex",
        flexDirection: "column",
        alignSelf:'center',
        width:"100%",
        height:"90%",
        top:10
      }
})

export default Loader;
import React,{useState} from 'react';
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
  
} from 'react-native'
import { Button } from 'react-native-paper';
import Tooltip from 'react-native-walkthrough-tooltip'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const MyLibrary = () => {
    const [toolTipVisible, setToolTipVisible] = useState(false);
    const [searchText, setSearchText] = useState("")

    const toggletooltipVisible = () => {
      setToolTipVisible(!toolTipVisible)
      console.log("Tooltip visible: "+ toolTipVisible)
    }
    return (
       <SafeAreaView style={styles.safeArea}>
        <View>

            <View style={styles.searchContainer}>
               <View style={styles.searchInputContainer}>
                    <TouchableOpacity style={styles.searchIconContainer}>
                        <Image source={require("../assets/search.png")} style={styles.searchIcon}/>
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
                <Text style={styles.labelText}>All events, 2024</Text>
            </View>

            <View style={styles.tooltipContainer}>
            <View style={styles.monthAndLogo}>

                <View style={styles.monthContainer}>
                    <Text style={styles.monthText}>January</Text>
                </View>
                {toolTipVisible ?  <TouchableOpacity style={styles.logoContainer} onPress={toggletooltipVisible} >
                    <Image source={require("../assets/free-icon-double-arrow-up.png")} style={styles.arrow} />
                </TouchableOpacity> : <TouchableOpacity style={styles.logoContainer} onPress={toggletooltipVisible} >
                    <Image source={require("../assets/double-arrow-down-.png")} style={styles.arrow} />
                </TouchableOpacity>}
    
            </View>

            <Tooltip
        isVisible={toolTipVisible}
        content={<Text>Here is some content inside the tooltip!</Text>}
        //placement="bottom"
        onClose={() => setToolTipVisible(false)}
      >
      </Tooltip>
            </View>
        {/* <Tooltip
        isVisible={toolTipVisible}
        content={<Text>Here is some content inside the tooltip!</Text>}
        placement="bottom"
        onClose={() => setToolTipVisible(false)}
      >
        <TouchableOpacity onPress={() => setToolTipVisible(true)}>
          <Button style={styles.arrowDownButton}>Click</Button>
        </TouchableOpacity>
      </Tooltip> */}
      </View>
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
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      searchContainer:{
        width: wp("82%"),
        height: hp("7.5%") ,
        top: 115,
        left: "8%",
        borderRadius: 10,
        borderWidth:0.5,
        borderColor:"#000000"

      },
      searchInputContainer:{
        flex:1,
        flexDirection:'row',
        width: "100%",
        height: "90%",
        padding: 10,
        gap: 10,
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
        width: wp("40%"),
        height: hp("5%"),
        top: 184,
        left: "6%",
        padding: "2%",
        gap: 10,
        //borderWidth:1

      },
      labelText:{
        flex:1,
        width: "100%",
        height: 15,
        fontFamily: "Roboto",
        fontSize: 13,
        fontWeight: "600",
        lineHeight: 15,
        letterSpacing: 1,
        textAlign: "left",
        color:"#06447C"


      },

      tooltipContainer:{
        display:"flex",
        flexDirection:"column",
        width:wp("85%"),
        height: hp("25%"),
        top: 226,
        left: "8%",
        borderRadius: 7,
        borderWidth: 0.5,
        borderColor:"#6EB1E1"

      },

      monthAndLogo:{
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
        width: "30%",
        height:"100%",
        padding: "2%",
        gap: 10,
       // borderWidth:1

      },
      monthText:{
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
        height: "90%",
        padding: 10,
        right:"15%",
        gap: 10,
        //borderWidth:1

      },
      arrowDownButton: {
        fontSize: 24,
        marginBottom: 10,
        color:"#000000",
        padding:15,
        height:15,
        width:24,
        backgroundColor:"blue"
      },
      arrow:{
        width:"100%",
        height:"80%",
        //backgroundColor:"#ddd"

      }
})

export default MyLibrary;
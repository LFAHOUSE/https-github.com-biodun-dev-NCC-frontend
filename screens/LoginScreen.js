import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { Button } from "react-native-paper";
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import {useForm,Controller,useWatch} from "react-hook-form"
import { CountryPicker,CountryList } from 'react-native-country-codes-picker';
import axiosInstance from "../axios_services/axios";



const LoginScreen = ({navigation}) => {
const {control,handleSubmit,errors} = useForm()
    const phoneNumber = useWatch({control,name:"phoneNumber"})
    const password = useWatch({control, name:"password"})

    const [countryCode, setCountryCode] = useState("+234");
    const [showPickerModal,setShowPickerModal] = useState(false)
  
    const openCodePicker = () => {
      setShowPickerModal(true)
  }
  const handleRegistration = async () => {
    console.log(countryCode+phoneNumber)
    setLoading(true);
    try {
      const response = await axiosInstance.post('http://20.84.147.6:8080/api/users/login', {
        phoneNumber: countryCode + phoneNumber,
        password:password
      });
      setStatusText(response.data.message)
      if (response.status === 200 || response.status === 200 ) {
        setLoading(false)
        setButtonText("Next")
        Alert.alert("OK",response.data.message);
         navigation.navigate("Dashboard")
      }
    } catch (error) {
     setLoading(false)
     setStatusText(error.response.data.message)
      console.log(error)
       setButtonText("Try Again")
      Alert.alert('Sign up failed', error.response.data.message);
    }
  // To be removed in production
    setLoading(false);
    navigation.navigate("Verify",{phoneNumber: phoneNumber,countryCode:countryCode})
    };
    // Determine if the phone number is 11 digits for enabling the button
    const isButtonActive = phoneNumber?.length === 10 && password.length >= 8;

    return(
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
         <View>
          <PageHeader pageTitle="Welcome"/>
         </View>

   
         <View style={styles.loginTextContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Login</Text>
          </View>

          <View style={styles.loginDesc}>
            <Text style={styles.desc}>Please provide your phone number to login</Text>
          </View>

         </View>
         
          {/* Phone Number Input */}
          <View style={styles.phoneNumberInputParentContainer}>

          <View style={styles.inputLabelContainer}>
            <Text style={styles.label}>Phone Number</Text>
          </View>

          <View style={styles.inputContainier}>
           <View style={styles.inputAccessory}>
         <View style={styles.phoneIconContainer}> 
              <Image style={styles.phoneIcon} source={require("../assets/phone.png")}/>
            </View>

            <View style={styles.countryCodeContainer}> 
              <Text style={styles.countryCode}>{countryCode}</Text>
            </View>
            <CountryPicker
          style={styles.picker}
          show={showPickerModal}
          pickerButtonOnPress={(item) =>{setCountryCode(item.dial_code),setShowPickerModal(false)}}
          
        />

            <TouchableOpacity style={styles.phoneIconContainer} onPress={openCodePicker}> 
              <Image style={styles.angleDown} source={require("../assets/arrow-down.png")}/>
            </TouchableOpacity>
            </View>
         <Controller
        name="phoneNumber"
        control={control}
        rules={{ required: 'Phone Number  is required' }}
        render={({ field,fieldState}) => (
          <TouchableOpacity style={styles.inputFieldContainer}>
            <TextInput
              style={[styles.input, {borderColor: fieldState.isTouched ? 'green' : 'transparent',borderWidth:1}]}
              placeholder="7063164212"
              onChangeText={field.onChange}
              value={field.value}
              maxLength={10}
            />
            {errors && (
            <View style={styles.inputStatusContainer}>
            <Text style={{width: "100%",height: "100%",color:"red"}}>{errors.phoneNumber}</Text>
          </View>
            )}
         </TouchableOpacity>
        )}
      />
       
          </View>
          </View>

          {/* Password input */}

          <View style={styles.passwordInputParentContainer}>

<View style={styles.inputLabelContainer}>
  <Text style={styles.label}>Password</Text>
</View>

<View style={styles.inputContainier}>


<Controller
name="password"
control={control}
rules={{ required: 'minimum of 8 characters' }}
render={({ field,fieldState}) => (
<TouchableOpacity style={styles.inputFieldContainer}>
  <TextInput
    style={[styles.passwordinput, {borderColor: fieldState.isTouched ? 'green' : 'transparent',borderWidth:1}]}
    secureTextEntry
    onChangeText={field.onChange}
    value={field.value}
  />
  {errors && (
  <View style={styles.inputStatusContainer}>
  <Text style={{width: "100%",height: "100%",color:"red"}}>{errors.password}</Text>
</View>
  )}
</TouchableOpacity>
)}
/>

</View>
</View>

          <Button
          mode="contained"
          onPress={handleSubmit(handleRegistration)}
          style={[
            styles.button,
            { backgroundColor: isButtonActive ? "#06447C" : "#EFEFF0" },
          ]}
           disabled={!isButtonActive} // Optionally disable the button when the phone number is not 11 digits
          labelStyle={{ color: isButtonActive ? "#FFFFFF" : "#C0C0C0" }} // Text color for better contrast
        >
             Next
        </Button>

        <View style={styles.account}>
          <View style={styles.visitorTextContainer}>
        <TouchableOpacity>
            <Text style={styles.visitorText}>
              I am a <Text style={styles.sign}>Visitor</Text>
            </Text>
          </TouchableOpacity>
          </View>
          <View style={styles.member}>
          <TouchableOpacity>
            <Text style={styles.memberText}>
              Dont have an account? <Text style={styles.sign} onPress={() => navigation.navigate("SignUp")} >Sign Up</Text>
            </Text>
          </TouchableOpacity>
          </View>
          </View>
          <View>
          <PageFooter/>
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
      loginTextContainer: {
          display:'flex',
          alignItems:'left',
          flexDirection: "column",
          width:"80%",
          height:"12%",
          //top: "8%",
          left: '8%',
         
    
      },
    
      loginContainer:{
        width: 85,
        height: 48,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingLeft: 0,
        gap: 10,
  
    
      },
      loginText:{
        width:70,
        height:38,
        display:"flex",
        flexDirection:"row",
        fontFamily: 'Roboto',
        fontSize: 24,
        fontWeight:'800',
        lineHeight: 28,
        letterSpacing: 0.1,
        textAlign: 'left',
    
      },
     
      loginDesc: {
        flex:1,
        width:"100%",
        height: 34,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        gap: 10,
        
      },

      desc:{
        display:"flex",
        flexDirection:'row',
        width: "100%",
        height: 40,
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14,
        letterSpacing: 0.1,
        textAlign: 'left',


      },

      phoneNumberInputParentContainer:{
        display:"flex",
        flexDirection:"column",
        padding:10,
        width: "80%",
        height: '15%',
       // top: "6%",
        left: '8%',
        gap:15,
      //  marginBottom:"30%",
      //  borderWidth:1,

      },
      passwordInputParentContainer:{
        display:"flex",
        flexDirection:"column",
        padding:15,
        width: "80%",
        height: '15%',
       // top: "6%",
        left: '8%',
        gap:15,
      //  marginBottom:"30%",
       // borderWidth:1,
      },
      inputLabelContainer:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        height: "45%",
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        gap: 10,
       // borderWidth:1
        
      },
      label: {
        flex:1,
        color:"#000000"
 },
 
 inputContainier:{
  display:"flex",
  flexDirection:"row",
  alignItems:"center",
  width: "100%",
  height: '40%',
  padding:10,
  borderRadius: 7,
  borderWidth: 1,
  borderColor:"#ddd",
  //marginVertical:"-2%"

 },
 inputAccessory:{
  display:"flex",
  flexDirection: "row",
  justifyContent:"space-between",
  alignItems:"center",
  //borderWidth:1,

  
 },
 phoneIconContainer:{
  display:'flex',
  flexDirection:'row',
  width: "10%",
  height: 36,
  paddingTop:0,
  gap: 10,
  justifyContent:'space-around',
  //borderWidth:1,
  alignItems: "center",
 },

 phoneIcon:{
  width: 30,
  height: 15
  
 },
 angleDown:{
  width:15,
  height:18,
  
 },

 countryCodeContainer:{
  display:"flex",
  flexDirection:"row",
  width: "10%",
  justifyContent:"space-around",
  height: 36,
  paddingTop: 12,
  paddingRight: 10,
  paddingBottom: 12,
  paddingLeft: 10,
  //gap: 10,
  //borderWidth:1,
  alignItems:'center',
  justifyContent:"center",
  alignContent:'center'
 },
 countryCode:{
  display:"flex",
  flexDirection:"row",
  width: 40,
  height: 45,
  alignSelf:'center',
  paddingTop:10

},
inputFieldContainer:{
  flex:1,
  height:"100%",
  paddingTop: 10,
  paddingRight: 10,
  paddingBottom: 10,
  paddingLeft: 26,
  borderRadius: 7,
  gap: 10,
  //borderWidth:1,
  borderColor:"#ddd",
  alignItems:'center',
  justifyContent:'center'

},

input:{
  flex:1,
  width: "100%",
  height: 37,
  alignItems:'center',
  //backgroundColor:"#ddd",
 // borderColor:"red",
  borderRadius:7,
  //borderWidth:1,
 // right:"10%",
  padding:10,
  

},
passwordinput:{
  flex:1,
  width: "100%",
  height: 40,
  //backgroundColor:"#ddd",
 // borderColor:"red",
  borderRadius:7,
  //borderWidth:1,
  right:"10%",
  padding:10,
  alignSelf:'center',
  justifyContent:'center',
  alignContent:"center",
  alignItems:"center"
},

inputStatusContainer:{
 flex:1,
  width: "200%",
  height: "30%",
  gap: 111,
  right:"95%",
  borderWidth:1

},
button:{
  alignSelf:"center",
  marginTop:"9%",
  width:"80%",
      height:'6%',
  padding:'1%',
  gap:10,
  borderRadius:10,
  //left:"8%",
  borderWidth:1
},

signUpContainer: {
  width:187,
  height:86,
  left:32,
  //top:'144',
  
},
signUpText: {
  color: "#000",
  marginVertical: 10,
  fontSize: 13,
},
account:{
  width:"75%",
  height:"15%",
  alignSelf:'center',
  gap:5,
  //marginTop:49,
  //borderWidth:1,
  //left:"5%",
  alignSelf:"center"
},
sign: {
 // width:78,
  color: "#6EB1E1",
  marginLeft:20,
  fontSize: 15,
},
visitorTextContainer:{
  display:'flex',
  flexDirection:"row",
  width: "40%",
  height:"27%",
  paddingTop: '1%',
  paddingRight: '1%',
  paddingBottom: '2%',
  paddingLeft: '0%',
  gap: 10,
  //borderWidth:1,
  alignSelf:"center"
  
  
},
visitorText: {
  width: "100%",
  height: "120%",
  color: "#000",
  fontWeight:'800',
  fontSize:13,
  fontFamily:"Roboto"

  //marginVertical: 10,
},
member:{
  width:"100%",
  height:"30%",
  paddingTop:0,
  paddingRight:10,
  paddingBottom:1,
  paddingLeft:0,
 //borderWidth:1,
 alignSelf:"center"
},
memberText:{
  display:'flex',
  flexDirection:"row",
  width:"100%",
  height:28,
  //alignSelf:"center",
  left:"60%"
},


})


export default LoginScreen
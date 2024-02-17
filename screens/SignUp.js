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
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import Loader from "./components/Loader.js";
import { CountryPicker,CountryList } from 'react-native-country-codes-picker';
import axiosInstance from "../axios_services/axios.js";
import {useForm,Controller,useWatch} from "react-hook-form"





const SignUp = ({props, navigation }) => {
  const {control,handleSubmit,formState:{errors}}= useForm()

  const rules = {
    phoneNumber: {
      required: 'Phone number is required',
      minLength: {
        value: 10,
        message: 'Phone number not valid',
      },
    },
  };

  const phoneNumber = useWatch({control, name:"phoneNumber"})

    //  const [phoneNumber, setPhoneNumber] = useState("");
     const [countryCode, setCountryCode] = useState('+234'); 
     const [showPickerModal,setShowPickerModal] = useState(false)
     const [loading,setLoading] = useState(false)
     const [statusText,setStatusText] = useState("")
     const [buttonText, setButtonText] = useState("Sign-up")

    const goBack = () => {
      navigation.goBack()
      }

      const openCodePicker = () => {
          setShowPickerModal(true)
      }

      
        const handleRegistration = async () => {
          console.log(countryCode+phoneNumber)
          setLoading(true);
          console.log(loading)
          try {
            setLoading(true)
            const response = await axiosInstance.post('http://20.84.147.6:8080/api/users/initiate-registration', {
              phoneNumber: countryCode + phoneNumber,
            });
            setStatusText(response.data.message)
            if (response.status === 201) {
              setLoading(false)
              setButtonText("Next")
              Alert.alert("OK",response.data.message);
               navigation.navigate("Verify",{phoneNumber:phoneNumber,countryCode:countryCode})
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
  const isButtonActive = phoneNumber?.length === 10 || loading

 

  return (
    loading ? (<Loader/>) :(
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} >

       <View>
       <PageHeader pageTitle="Registration" onBack={goBack}/>
        </View>

         <View style={styles.signUpContainer}> 
        <Text style={styles.signText}>Sign Up</Text>
        <Text style={styles.signupText}>Please provide your phone number to create account</Text>
        </View>

        <View style={styles.inputParentContainer}>

          <View style={styles.inputLabel}>
          <Text style={styles.label}>Phone number</Text>
          </View>
          <Controller
        name="phoneNumber"
        control={control}
        rules={rules.phoneNumber}
        render={({ field,fieldState}) => (
        <View style={[styles.inputContainer, {borderColor: fieldState.isTouched ? 'green' : 'red',borderWidth:1}]}>
          <View style={styles.inputAccessory}>

           <View style={styles.phoneNumberIcon}>
           <Image source={require("../assets/phone.png")} style={styles.phoneIconLogo}/>
           </View>
            
            <View style={styles.countryCodeSelector} >
             <Text style={styles.countryCodeText}>{countryCode}</Text>
            </View>

            <TouchableOpacity style={styles.arrowDownContainer} onPress={openCodePicker}>
            <Image source={require("../assets/arrow-down.png")} style={styles.arrowDown}/>
            </TouchableOpacity>

           </View>
           <View style={styles.textInputContainer}>
           <TextInput
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            rules={rules.phoneNumber}
            error={errors.phoneNumber}
            keyboardType="number-pad"
            placeholder="e.g 7063164212"
            autoCapitalize="none"
            
          />
          <CountryPicker
          style={styles.picker}
          show={showPickerModal}
          pickerButtonOnPress={(item) =>{setCountryCode(item.dial_code),setShowPickerModal(false)}}
          
        />
        </View>
        </View>
         )}
        
         />
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
         {buttonText}
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
              I am a member, Login <Text style={styles.sign} onPress={()=>navigation.navigate("Login")}>here</Text>
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
  );
};

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
    
  
    pageHeaderContainer:{
      marginBottom:20
    },
    signText: {
      display:'flex',
      flexDirection:"row",
      width:"29.5%",
      height:"40.5%",
      paddingTop:10,
      paddingRight:10,
      paddingBottom:0,
      paddingLeft:0,
      gap:10,
     // borderWidth:1,
      fontSize: 20,
      fontWeight: "bold",
      
    },
    signUpContainer: {
      display:"flex",
      flexDirection:'column',
      width:"90%",
      height:"15%",
      left:"8%",

      //top:'144',
      //borderWidth:1
      
    },
    signupText: {
      display:"flex",
      flexDirection:'row',
      width:"100%",
      height:'64%',
      paddingTop:10,
      paddingRight:10,
      paddingBottom:10,
      paddingLeft:0,
      gap:10,
      //borderWidth:1
    },
    inputParentContainer:{
      display:"flex",
      flexDirection:"column",
      width:'89.5%',
      height:'15.5%',
      top:'237',
      left:"8%",
      //borderWidth:1

    },
    inputContainer: {
      display:"flex",
      flexDirection:"row",
      alignItems: 'center',
      justifyContent: 'space-around',
      width:"95%",
      height:"40%",
      borderRadius:7,
      borderWidth:1,
      background: "#CAC3C3",
      borderColor:"#CAC3C3",
      // borderWidth:1,
      // borderColor:"red"
    },
    inputAccessory:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:'space-between',
      right:"3%",
      width:"35%",
      height:"100%",
      //top:"5%",
    // borderWidth:1
    },
    phoneNumberIcon:{
      width: 30,
      height: "85%",
      paddingTop: '1.3%',
      paddingRight: '1%',
      paddingBottom: '1.2%',
      paddingLeft: '1%',
      gap: 10,
      top:"2%"

    },

    phoneIconLogo:{
        width:"100%",
        
        
    },

    arrowDownContainer:{
      width: "60%",
      height:"90%",
      padding: 10,
      gap: 10,
      top:"3%",

    },

    arrowDown:{
      width:13,
      height:16
    },
    textInputContainer:{
      display:"flex",
      flexDirection:"row",
      width: "50%",
      height: "100%",
      paddingTop: '1%', 
      paddingRight:'1%',
      paddingBottom: '1%', 
      paddingLeft:'2.6%',
      borderRadius: 7,
      gap: 10,
      fontSize:16,
      right:24,
      //top:"2%",
      //borderWidth:1

    },

    input: {
      width:'74',
      height:'1.5%',
      paddingTop:5,
      paddingRight:'1%',
      paddingBottom:'1%',
      paddingLeft:'2.6%',
      borderWidth:1
    
   },
    inputError:{
      borderColor:"red"
    },
    errorText:{
      color: 'red',
    fontSize: 12,
    marginLeft: 10,
    marginRight:5,
    },
    inputLabel: {
      width:'50%',
      height:'40%', 
      paddingTop: "1%",
      paddingRight:"1%",
      paddingBottom:"1%",
      paddingLeft:"0%",
      gap:10,
      fontSize: 16,
      color: "#000",
      marginBottom: 5,
     // borderWidth:1
    },
    button:{
      marginTop:"10%",
      width:"85%",
      height:'7%',
      padding:'1%',
      gap:10,
      borderRadius:10,
      left:32,
    },

    
   label:{
    fontFamily:"Roboto",
   fontWeight:'400'
   },

      phoneNumberContainer: {
        width:'80%',
        height:'80%',
        flexDirection: "row",
        alignItems: "center",
        // marginBottom: 10,
   
    
    },
    countryCodeSelector: {
      width:'37',
      height:'35',
      padding: '10',
      gap: 10,
      top:'2%'
      
    },
    countryCodeText: {
      width:'100%',
      height:'70%',
      fontSize: 16,
      color: "#000",
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
    
    code: {
      fontSize: 18,
      marginBottom: 10,
    },
   
    
  });
  




export default SignUp

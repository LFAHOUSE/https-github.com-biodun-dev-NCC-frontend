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
import { CountryPicker,CountryList } from 'react-native-country-codes-picker';
import axiosInstance from "../axios_services/axios.js";
import { useForm,useWatch } from "react-hook-form";
import Input from "./components/Input.js";




const SignUp = ({props, navigation }) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();


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
     const [buttonText, setButtonText] = useState("Sign-up")
    const goBack = () => {
      navigation.goBck()
      }

      const openCodePicker = () => {
          setShowPickerModal(true)
      }

      
        const handleRegistration = async () => {
          console.log(countryCode+phoneNumber)
          setLoading(true);
          try {
            const response = await axiosInstance.post('http://20.84.147.6:8080/api/users/initiate-registration', {
              phoneNumber: countryCode + phoneNumber,
            });
            if (response.status === 201) {
              setLoading(true)
              setButtonText("Next")
              Alert.alert("OK",response.data.message);
               navigation.navigate("Verify",{phoneNumber:phoneNumber,countryCode:countryCode})
            }
          } catch (error) {
           setLoading(false)
            console.log(error)
             setButtonText("Try Again")
            Alert.alert('Sign up failed', error.response.data.message);
          }
        
          setLoading(false);
          navigation.navigate("Verify",{phoneNumber: phoneNumber,countryCode:countryCode})

         
        };
      
  // Determine if the phone number is 11 digits for enabling the button
  const isButtonActive = phoneNumber?.length === 10 || loading

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} >

       <View style={styles.pageHeaderContainer}>
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
        
        <View style={styles.inputContainer}>
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
           <Input
            control={control}
            name="phoneNumber"
            rules={rules.phoneNumber}
            error={errors.phoneNumber}
            keyboardType="number-pad"
            placeholder="7063164212"
            autoCapitalize="none"
          />
          <CountryPicker
          style={styles.picker}
          show={showPickerModal}
          pickerButtonOnPress={(item) =>{setCountryCode(item.dial_code),setShowPickerModal(false)}}
          
        />
        </View>
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
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.memberText}>
              I am a member, Login <Text style={styles.sign}>here</Text>
            </Text>
          </TouchableOpacity>
          </View>

        </View>
      <PageFooter/>
      </ScrollView>
    </SafeAreaView>
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
      padding: 20,
      // gap:30,
    },
    logoContainer: {
      alignItems: "center",
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "flex-end", // Center the logo and text horizontally
      width: "100%", // Ensure it takes the full width to center the content
    },
    logo: {
      width: 70,
      height: 70,
    },
    pageHeaderContainer:{
      marginBottom:20
    },
    logoText: {
      width: 65,
      height: 75,
      marginTop: 20,
    },
    signText: {
      width:94,
      height:38,
      paddingTop:10,
      paddingRight:10,
      paddingBottom:0,
      paddingLeft:0,
      gap:10,
      fontSize: 20,
      fontWeight: "bold",
      
    },
    signupText: {
      width:291,
      height:'34',
      paddingTop:10,
      paddingRight:10,
      paddingBottom:10,
      paddingLeft:0,
      gap:10,
    },
    inputParentContainer:{
      width:'290',
      height:'102',
      top:'237',
      left:32

    },
    inputContainer: {
      display:"flex",
      flexDirection:"row",
      alignItems: 'center',
      justifyContent: 'space-around',
      width:290,
      height:40,
      borderRadius:7,
      borderWidth:1,
      background: "#CAC3C3",
      borderColor:"#CAC3C3"
    },
    inputAccessory:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:'space-between',
      right:10,
      width:101,
      height:36
    },
    phoneNumberIcon:{
      width: 35,
      height: 36,
      paddingTop: '12',
      paddingRight: '10',
      paddingBottom: '12',
      paddingLeft: '10',
      gap: 10

    },

    phoneIconLogo:{
        width:'15',
        
        
    },

    arrowDownContainer:{
      width: 29,
      height:36,
      padding: 10,
      gap: 10

    },

    arrowDown:{
      width:13,
      height:16
    },
    textInputContainer:{
      width: 124,
      height: 43,
      paddingTop: '10', 
      paddingRight:'10',
      paddingBottom: '10', 
      paddingLeft:'26',
      borderRadius: 7,
      gap: 10,
      fontSize:16
    },

    input: {
      width:'74',
      height:'15',
      paddingTop:5,
      paddingRight:'10',
      paddingBottom:'10',
      paddingLeft:'26',
    
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
      width:'95',
      height:'35', 
      paddingTop: 10,
      paddingRight:10,
      paddingBottom:10,
      paddingLeft:0,
      gap:10,
      fontSize: 16,
      color: "#000",
      marginBottom: 5,
    },
    button:{
      marginTop:20,
      width:290,
      height:'40',
      padding:'10',
      gap:10,
      borderRadius:10,
      left:32,
    },

    
   label:{
    fontFamily:"Roboto",
   fontWeight:'400'
   },

      phoneNumberContainer: {
        width:'101',
        height:'36',
        flexDirection: "row",
        alignItems: "center",
        // marginBottom: 10,
   
    
    },
    countryCodeSelector: {
      width:'37',
      height:'35',
      padding: '10',
      gap: 10
      
    },
    countryCodeText: {
      width:'30',
      height:'30',
      fontSize: 16,
      color: "#000",
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
      width:187,
      height:86,
      alignSelf:'center',
      gap:5
    },
    sign: {
      color: "#6EB1E1",
      marginLeft:20,
      fontSize: 15,
    },
    visitorTextContainer:{
      width: 83,
      height:18,
      paddingTop: '17',
      paddingRight: '10',
      paddingBottom: '10',
      paddingLeft: '10',
      gap: 10,
      
      
    },
    visitorText: {
      width: 100,
      height: 18,
      color: "#000",
      fontWeight:'800',
      fontSize:13,
      fontFamily:"Roboto"

      //marginVertical: 10,
    },
    member:{
      width:187,
      height:29,
      paddingTop:'0',
      paddingRight:'10',
      paddingBottom:'1',
      paddingLeft:'0'  
    },
    memberText:{
      width:209,
      height:'28'
    },

    picker: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    code: {
      fontSize: 18,
      marginBottom: 10,
    },
  });
  




export default SignUp

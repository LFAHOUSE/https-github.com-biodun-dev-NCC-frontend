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
import { FontAwesome } from '@expo/vector-icons';
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import { CountryPicker,CountryList } from 'react-native-country-codes-picker';
import axiosInstance from "../axios_services/axios.js";
import axios from 'axios'

const useForm = (initialValues,validate) => {
  const [values,setValues] = useState(initialValues)
  const [errors,setErrors] = useState({})
  const [touched,setTouched] = useState({})

  const handleInputChange = (name,value) => {
    setValues({
      ...values,
      [name]:value
    })

    const validationErrors = validate(values)
setErrors({
  ...errors,
  [name]:validationErrors[name],
})
  }




const handleBlur = (name) => {
  setTouched(({
    ...touched,
    [name]: true
  }))
}


const isValid = () => {
  Object.values(errors).every((error) => error === null)
}


return {
  values,errors,touched,handleInputChange,handleBlur,isValid
}
}


const SignUp = ({props, navigation }) => {

    //  const [phoneNumber, setPhoneNumber] = useState("");
     const [countryCode, setCountryCode] = useState('+234'); 
     const [showPickerModal,setShowPickerModal] = useState(false)
     const [loading,setLoading] = useState(false)
     const [buttonText, setButtonText] = useState("Register")

const initialValues = {
  phoneNumber:""
}

const validate = (values) => {
    const errors = {}

    if(!values.name) {
      errors.phoneNumber = "*Phone number is required"
    }

    return errors

}

const {values,errors,touched,handleInputChange,handleBlur,isValid} = useForm(initialValues,validate)

    const goBack = () => {
      navigation.goBck()
      }

      const openCodePicker = () => {
          setShowPickerModal(true)
      }

      
        const handleRegistration = async () => {
          console.log(countryCode+values.phoneNumber)
          setLoading(true);
          try {
            ;
            const response = await axios.post('http://20.84.147.6:8080/api/users/initiate-registration', {
              phoneNumber: countryCode + values.phoneNumber,
            });
            if (response.status === 201) {
              setButtonText("Next")
              Alert.alert("OK",JSON.stringify(response.data.message));
              // navigation.navigate("Verify",{phoneNumber: values.phoneNumber,countryCode:countryCode})
            }
          } catch (error) {
            console.log(JSON.stringify(error))
            console.log(error)
             setButtonText("Try Again")
            Alert.alert('Sign up failed', error.message);
          }
        
          setLoading(false);
          navigation.navigate("Verify",{phoneNumber: values.phoneNumber,countryCode:countryCode})

         
        };
      
  // Determine if the phone number is 11 digits for enabling the button
  const isButtonActive = values.phoneNumber.length === 10 || loading

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} >
       <View style={styles.pageHeaderContainer}>
       <PageHeader pageTitle="Registration" onBack={goBack}/>
        </View>
          
        <Text style={styles.signText}>Sign Up</Text>
        <Text style={styles.loginText}>Please provide your phone number to create account</Text>
        <View style={styles.inputParentContainer}>
        <Text style={styles.inputLabel}>Phone number</Text>
        <View style={styles.inputContainer}>
           <View style={styles.phoneNumberContainer}>
            <TouchableOpacity style={styles.countryCodeSelector} onPress={openCodePicker}>
            <FontAwesome name="phone" size={24} color="#6200ee" />
              <Text style={styles.countryCodeText}>{countryCode}</Text>
              <FontAwesome name="angle-down" size={40} color="#6200ee" />
            </TouchableOpacity>
            <View>
            <TextInput
              style={[styles.input,errors.phoneNumber && touched.phoneNumber && styles.inputError]}
              placeholder="9082000150"
              value={values.phoneNumber}
              onChangeText={(value) => {handleInputChange("phoneNumber",value)} }
              onBlur={() => handleBlur("phoneNumber")}
              keyboardType="number-pad"
              maxLength={10}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
          </View>

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
          onPress={handleRegistration}
          style={[
            styles.button,
            { backgroundColor: isButtonActive ? "#6200ee" : "#EFEFF0" },
          ]}
          disabled={!isButtonActive} // Optionally disable the button when the phone number is not 11 digits
          labelStyle={{ color: isButtonActive ? "#FFFFFF" : "#C0C0C0" }} // Text color for better contrast
        >
         {buttonText}
        </Button>
        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signUpText}>
              Don’t have account,<Text style={styles.sign}>Login</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.visitorText}>
              I am a <Text style={styles.sign}>Visitor</Text>
            </Text>
          </TouchableOpacity>
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
      marginTop:15,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "left",
    },
    loginText: {
      fontSize: 16,
      textAlign: "left",
      marginBottom: 30,
      color: "#000",
    },
    inputParentContainer:{
      marginBottom:20
    },
    inputContainer: {
    alignSelf: "stretch",
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    height:70,
    borderWidth:1,
    borderRadius: 10,
    borderColor: "#ddd",
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
      fontSize: 16,
      color: "#000",
      marginBottom: 5,
    },

      phoneNumberContainer: {
        flexDirection: "row",
        alignItems: "center",
        // marginBottom: 10,
   
    
    },
    countryCodeSelector: {
      alignItems:'center',
      flexDirection:'row',
      gap:5,
      backgroundColor: "transparent",
      paddingHorizontal: 15,
      paddingVertical: 10,
      paddingTop: 20,
      borderColor: "black",
      borderRadius: 10,
      
    },
    countryCodeText: {
      fontSize: 16,
      color: "#000",
    },
   
      input: {
        borderColor: "#ddd",
       flex:1,
       backgroundColor: "transparent",
       paddingHorizontal: 5,
       paddingVertical: 5,
       fontSize: 16,
       height: 70,
       padding:10,
       borderColor:'#fff',
       marginTop:10,
     },
  
    button: {
      paddingVertical: 12,
      marginBottom: 40,
      borderRadius: 7,
    },
    signUpContainer: {
      marginBottom: 80,
      alignItems: "center",
    },
    signUpText: {
      color: "#000",
      marginVertical: 10,
      fontSize: 13,
    },
    sign: {
      color: "#0000FF",
      marginVertical: 10,
      fontSize: 15,
    },
    visitorText: {
      color: "#000",
      marginVertical: 10,
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

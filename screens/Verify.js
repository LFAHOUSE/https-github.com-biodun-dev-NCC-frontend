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
  ImageBackground,
  Keyboard
} from "react-native";
import { Button } from "react-native-paper";
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import { FontAwesome } from '@expo/vector-icons';
import { validateEmail } from "../utils/utils";
import axios from "axios";
import axiosInstance from "../axios_services/axios";


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


const Verify = ({ route, navigation }) => {
  const initialValues = {
    newPhoneNumber:"",
    emailAddress:"",
    otp:""
  }
  

  const validate = (values) => {
    const errors = {}

    if(!values.emailAddress) {
      errors.emailAddress = "*Email is required"
    } else if (
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.emailAddress)
    ) {
      errors.emailAddress = "**Email is invalid"
    }

    if (!values.otp) {
      errors.otp = "**otp is required"
    }
 
    return errors

}

const {values,errors,touched,handleInputChange,handleBlur,isValid} = useForm(initialValues,validate)

  const {countryCode,phoneNumber} =route.params
  
  console.log("Phone Number: " + countryCode + phoneNumber)
  const complete_phone_number = countryCode+phoneNumber
 


 
  const handleOtp = (otp) => {
    setOtp(otp)
  }

  const goBack = () => {
    navigation.goBack()
  }


// define the requestOtp function
const requestOtp = async (email, phone) => {
  console.log("emailAddress: ", values.emailAddress)
  // create a data object with email and phone
  const data = { "phoneNumber":complete_phone_number, "email":values.emailAddress };

  try {
    // make a post request to the api endpoint with the data object
    const response = await axiosInstance.post("/add-email-request-otp", data);
    if (response.status === 201) {
      // return the response data
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    // handle the error
    console.error(error);
    return null;
  }
};

  // Determine if the phone number is 11 digits for enabling the button
  const isButtonActive = values.otp.length === 10 
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
        <View style={styles.pageHeaderContainer}>
        <PageHeader pageTitle="Let's Verify You" onBack={goBack}/>
        </View>
       
        <View style={styles.inputParentContainer}>
        <Text style={styles.inputLabel}>Phone number</Text>
        <View style={styles.inputContainer}>

          <View style={styles.emailAddressContainer}>
            <TouchableOpacity style={styles.countryCodeSelector}>
            <FontAwesome name="phone" size={24} color="#6200ee" />
           </TouchableOpacity>
            </View>

            <TextInput
              value={complete_phone_number || values.newPhoneNumber }
              keyboardType="phone-pad"
              onChangeText={(value) => handleInputChange("newPhoneNumber", value)}
              onBlur={() => handleBlur("newPhoneNumber")}
              maxLength={14}
            />
          
          </View>
        </View>

        <View style={styles.inputParentContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <View style={styles.inputContainer}>
        <View style={styles.emailAddressContainer}>
            <TouchableOpacity style={styles.countryCodeSelector}>
            <FontAwesome name="envelope" size={20} color="#6200ee" />
            </TouchableOpacity>
            </View>
          <TextInput
            style={[styles.input,errors.emailAddress && touched.emailAddress && styles.inputError]}
            onChangeText={(value) => handleInputChange("emailAddress",value)}
            value={values.emailAddress}
            onBlur={() => handleBlur("emailAddress")}
            keyboardType="email-address"
            placeholder="e.g omoniyi.bankole@gmail.com"
          
          />
          {errors.emailAddress && touched.emailAddress && (
              <Text style={styles.errorText}>{errors.emailAddress}</Text>
            )}
        </View>
        </View>

        <View style={styles.inputParentContainer}>
       <TouchableOpacity>
         <Text style={styles.otp}>Request for OTP</Text>
          </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input,errors.otp && touched.otp && styles.inputError]}
            onChangeText={(value) => handleInputChange("otp",value)}
            onBlur={() => handleBlur("otp")}
            value={values.otp}
            placeholder="Enter OTP"
            maxLength={6}
            keyboardType="number-pad"
          />
          {errors.otp && touched.otp && (
              <Text style={styles.errorText}>{errors.otp}</Text>
            )}
        </View>
        </View>
        <Button
          mode="contained"
         
          style={[
            styles.button,
            { backgroundColor: isButtonActive ? "#6200ee" : "#EFEFF0" },
          ]}
          disabled={!isButtonActive} // Optionally disable the button when the phone number is not 11 digits
          labelStyle={{ color: isButtonActive ? "#FFFFFF" : "#C0C0C0" }} // Text color for better contrast
        >
          Next
        </Button>

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
  arrowDown:{
    marginBottom:2
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
  logoText: {
    width: 65,
    height: 75,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 20,

    textAlign: "left",
  },
  pageHeaderContainer:{
    marginBottom:20
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

  inputLabel: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  input: {
     borderColor: "#ddd",
    flex:1,
    backgroundColor: "transparent",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 16,
    height: 60,
    padding:10,
    borderColor:'#fff',
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
  emailAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
  },
  countryCodeSelector: {
    alignItems:'center',
    justifyItems: 'center',
      flexDirection:'row',
      gap:5,
      // backgroundColor: "#fff",
      paddingHorizontal: 15,
      paddingVertical: 10,
      paddingTop: 20,
      borderColor: "transparent",
      borderRadius: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  countryCodeText: {
    fontSize: 16,
    color: "#000",
    height: 30,
  },
  emailAddressInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,

    fontSize: 16,
    borderColor: "transparent",
    height: 60,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
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
  otp: {
    color: "#06447C",
    fontSize: 16,

    marginBottom: 5,
  },

});

export default Verify;

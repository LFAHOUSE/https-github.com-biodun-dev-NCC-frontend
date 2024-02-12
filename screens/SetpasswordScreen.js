
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
import { Button } from "react-native-paper"
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import { Foundation } from '@expo/vector-icons';
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


const Setpasssword = ({route,navigation}) => {
 const {phoneNumber,email,otp} = route.params
 const [loading,setLoading] = useState(false)
    const validate = (values) => {
      const errors = {}
  
      if(!values.password) {
        errors.password = "*Password is required"
      } else if (
       values.password < 8
      ) {
        errors.password = "**Password must be at least 8 characcters"
      }
  
      if (!values.confirmPassword) {
        errors.confirmPassword = "**Confirm password is required"
      }else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "**Password do no match"
      }
   
      return errors
  
  }

  const initialValues = {
    password:"",
    confirmPassword:""
  }
  const {values,errors,touched,handleInputChange,handleBlur,isValid} = useForm(initialValues,validate)
  //To navigate backward on the pageHeader component
    const goBack = () => {
        navigation.goBack()
    }

 
  const handleRegistration = async () => {
    setLoading(true)

    const data = { 
      email:email,
      otp:otp,
      password:values.password
     };
  
    try {
      const response = await axiosInstance.post("http://20.84.147.6:8080/api/users/verify-otp-set-password", data);
      console.log(response.status)
      if (response.status === 200 || response.status ===201) {
        // return the response data
        Alert.alert("OK", response.data.message)
        navigation.navigate("LetsMeet",{
          phoneNumber:phoneNumber
        });
        setLoading(false)
      
      } 
    } catch (error) {
      // handle the error
      Alert.alert("Error", error.response.data.message)
      setLoading(false)
      
    }
    // Handle the registration logic here
    navigation.navigate("LetsMeet");
  };
  
  // Determine if all input fields are touched for enabling the button
   const isButtonActive = values.password === values.confirmPassword
 return(
   <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
        <View style={styles.pageHeaderContainer}>
         <PageHeader onBack={goBack} pageTitle="Create password" />
       </View>

          <View style={styles.inputParentContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputContainer}>
            <View style={styles.phoneNumberContainer}>
            <TouchableOpacity style={styles.countryCodeSelector}>
            <Foundation name="key" size={30} color="#6200ee" />
            </TouchableOpacity>
            </View>

           <TextInput
            style={[styles.input,errors.emailAddress && touched.emailAddress && styles.inputError]}
            placeholder="Password"
            value={values.password}
            onChangeText={(value) => handleInputChange("password",value)}
            onBlur={() => handleBlur("password")}
            secureTextEntry
      />
         {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
        </View>
        </View>
        <View style={styles.inputParentContainer}>
         <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <View style={styles.phoneNumberContainer}>
            <TouchableOpacity style={styles.countryCodeSelector}>
            <Foundation name="key" size={30} color="#6200ee" />
            </TouchableOpacity>
            </View>
          <TextInput
            style={[styles.input,errors.emailAddress && touched.emailAddress && styles.inputError]}
            placeholder="Confirm Password"
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            value={values.confirmPassword}
            onBlur={() =>handleBlur("confirmPassword")}
            secureTextEntry
          />
          {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
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
          Next
        </Button>

        <PageFooter/>
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
  logoText: {
    width: 65,
    height: 75,
    marginTop: 20,
  },
 
  welcomeText: {
    fontSize: 20,

    textAlign: "left",
  },
  loginText: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 30,
    color: "#000",
  },
  inputParentContainer:{
    // marginBottom:20
  },
  inputContainer: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginBottom: 5,
    borderWidth:1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  inputLogo:{
   marginHorizontal:10
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
  input: {
    flex:1,
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    height: 60,
    padding:10
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    marginRight:5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
  },
  countryCodeSelector: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 20,
    borderColor: "transparent",

    borderRadius: 10,
  },
  countryCodeText: {
    fontSize: 16,
    color: "#000",
    height: 30,
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

  footer: {
    marginTop: 40,
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
  otp: {
    color: "#06447C",
    fontSize: 16,

    marginBottom: 5,
  },
  pageHeaderContainer:{
    marginBottom:20
  }
});
export default Setpasssword;
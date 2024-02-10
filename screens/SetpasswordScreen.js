
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
import { Button } from "react-native-paper"
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import { Foundation } from '@expo/vector-icons';

const Setpasssword = ({route,navigation}) => {
    const goBack = () => {
        navigation.goBack()
    }
   const {phoneNumber,emailAddress,firstname,lastname,nccCenter} = route.params

  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
 
  const handleRegistration = () => {
    // Handle the registration logic here
    navigation.navigate("Setpasssword");
  };

//   const handleNameBlur = (name) => {
//     const error = validateName(name)
//     setNameError
//   }

  
  // Determine if all input fields are touched for enabling the button
   const isButtonActive = confirmPassword
 return(
   <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
        <View style={styles.pageHeaderContainer}>
         <PageHeader onBack={goBack} pageTitle="Let's Meet You" />
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
           style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setpassword}
      />
         
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
            placeholder="Confirm Password"
            onChangeText={setconfirmPassword}
            value={confirmPassword}
          />
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
  centerinputContainer: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginBottom: 10,
    borderWidth:1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  picker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  pickerItem:{
    // backgroundColor:'grey',
    // padding:10,
    // borderBottomColor:'black',
    // borderWidth:2,
    // gap:30
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
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

const SignUp = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState('+234'); 

  const handleRegistration = () => {
    // Handle the registration logic here
    console.log('Full phone number:', countryCode + phoneNumber);
    navigation.navigate("Verify")
  };

  // Determine if the phone number is 11 digits for enabling the button
  const isButtonActive = phoneNumber.length === 10;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")} // Make sure the path to your logo image is correct
            resizeMode="contain"
            style={styles.logo}
          />
           <Text style={styles.logoText}>New Covenant Church</Text>
        </View>
        <Text style={styles.welcomeText}>Sign Up</Text>
        <Text style={styles.loginText}>Please provide your phone number to create account</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone number</Text>
          <View style={styles.phoneNumberContainer}>
            <TouchableOpacity style={styles.countryCodeSelector}>
              <Text style={styles.countryCodeText}>{countryCode}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.phoneNumberInput}
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              placeholder="9082000150"
              keyboardType="phone-pad"
              maxLength={10}
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
       <View style={styles.footerView}>
       <View style={styles.footer}>
          <Text style={styles.footerText}>
            ©2024 All rights reserved. v.1.0.1
          </Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Term Policy - Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.footerText}>
            <Image
              source={require("../assets/footerimage.png")} // Make sure the path to your logo image is correct
              resizeMode="contain"
              style={styles.footerImage}
            />
          </TouchableOpacity>
       </View>
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
    logoText: {
      width: 65,
      height: 75,
      marginTop: 20,
    },
    welcomeText: {
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
    inputContainer: {
      alignSelf: "stretch",
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 16,
      color: "#000",
      marginBottom: 5,
    },
    phoneNumberContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 7,
    },
    countryCodeSelector: {
      backgroundColor: "#fff",
      paddingHorizontal: 15,
      paddingVertical: 10,
      paddingTop: 20,
      borderColor: "transparent",
  
      borderRadius: 5,
    },
    countryCodeText: {
      fontSize: 16,
      color: "#000",
      height: 30,
    },
    phoneNumberInput: {
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
  });
  




export default SignUp

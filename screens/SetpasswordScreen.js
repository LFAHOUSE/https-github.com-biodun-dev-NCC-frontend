
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
import axiosInstance from "../axios_services/axios";
import { useForm,useWatch} from "react-hook-form";
import Input from "./components/Input";
const Setpasssword = ({route,navigation}) => {
 const {phoneNumber,email,otp} = route.params
 const [loading,setLoading] = useState(false)

 const {
  watch,
  control,
  handleSubmit,
  formState: { errors },
} = useForm();
  const password = useWatch({control,name:"password"})
  const confirmPassword = useWatch({control,name:"confirmPassword"})
  //To navigate backward on the pageHeader component
    const goBack = () => {
        navigation.goBack()
    }
    const rules = {
      password: {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters',
        },
      },
      confirmPassword: {
        required: 'Confirm password is required',
        validate: value =>
          value === watch('password') || 'Passwords do not match',
      },
    };
  const handleRegistration = async () => {
    console.log("PhoneNumber: " + phoneNumber)
    setLoading(true)

    const data = { 
      email:email,
      otp:otp,
      password:password
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
   const isButtonActive = password === confirmPassword
 return(
  <SafeAreaView style={styles.safeArea}>
  <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
    
    <View style={styles.pageHeaderContainer}>
    <PageHeader pageTitle="Let us verify you" onBack={goBack}/>
    </View>
   
    <View style={styles.inputParentContainer}>
  
    <View style={styles.labelContainer}>
    <Text style={styles.inputLabel}>Choose a password</Text>
   </View>

    <View style={styles.inputContainer}>
      <View style={styles.inputAccessory}>
        
       </View>
       <View style={styles.textInputContainer}>
       <Input
        control={control}
        name="password"
        rules={rules.password}
        error={errors.password}
        keyboardType="name-phone-pad"
        autoCapitalize="none"
        secureTextEntry
      />
    
    </View>
    </View>
    


    </View>
{/* second input */}
<View style={styles.inputParentContainer}>
  
  <View style={styles.labelContainer}>
  <Text style={styles.inputLabel}>Retype Password</Text>
 </View>

  <View style={styles.inputContainer}>
     <Input
      control={control}
      name="confirmPassword"
      rules={rules.confirmPassword}
      error={errors.confirmPassword}
      keyboardType="name-phone-pad"
      autoCapitalize="none"
     secureTextEntry
    />
  
  </View>
  </View>

  
    <Button
      mode="contained"
      onPress={handleSubmit(handleRegistration)}
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
    width: 312,
    height: 108,
    //top: 111,
    left: 24,
    paddingTop: '0', 
    paddingRight:'0',
    paddingBottom: '10', 
    paddingLeft:'0',
    gap: 10,
    marginBottom:20
  } ,

  // inputParentContainerContent:{
  //   width: '318,
  //   height: 108

  // },

  labelContainer:{
    width: '105',
    height: '28',
    padding: '10',
    gap: 10

  },
  inputLabel: {
    width:'85',
    height:'15',
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  // inputContainer: {
  //   alignSelf: "stretch",
  //   flex:1,
  //   flexDirection:'row',
  //   alignItems:'center',
  //   justifyContent:'flex-start',
  //   height:70,
  //   borderWidth:1,
  //   borderRadius: 10,
  //   borderColor: "#ddd",
  // },

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
  emailAddressInput:{
   
      display:"flex",
      flexDirection:"row",
      alignItems: 'center',
      justifyContent: 'space-around',
      width:189,
      height:15,
      borderRadius:7,
      borderWidth:1,
      background: "#CAC3C3",
      borderColor:"#CAC3C3"
  },
  inputAccessory:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    //justifyContent:'space-between',
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
export default Setpasssword;
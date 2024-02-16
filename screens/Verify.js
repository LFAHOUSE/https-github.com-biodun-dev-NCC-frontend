import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  StatusBar,
  Alert
} from "react-native";
import { Button } from "react-native-paper";
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import { FontAwesome } from '@expo/vector-icons';
import axiosInstance from "../axios_services/axios";
import {useForm,useWatch} from 'react-hook-form'
import Input from "./components/Input";


const Verify = ({ route, navigation }) => {
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const rules = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },

    otp:{
      required:"OTP is requuired",
      minLength: {
        value: 6,
        message: 'OTP must be at least 8 characters',
      },
    }
  };

  const email = useWatch({control, name:"email"})
  const otp = useWatch({control, name:"otp"})

  
  const [loading,setLoading] = useState(false)
  const [statusText,setStatusText] = useState("")
 const goBack = () => {
  navigation.goBack()
 }
  
  const {countryCode,phoneNumber} =route.params
  
  console.log("Phone Number: " + countryCode + phoneNumber)
  const complete_phone_number = countryCode+phoneNumber
 

// define the requestOtp function
const requestOtp = async () => {
  console.log("emailAddress: ", email)
  setLoading(true)
  // create a data object with email and phone
  const data = { 
    phoneNumber:complete_phone_number,
    email:email
   };

  try {
    const response = await axiosInstance.post("http://20.84.147.6:8080/api/users/add-email-request-otp", data);
    console.log(response.status)
    if (response.status === 200) {
      // return the response data
      setStatusText(response.data.message)
      Alert.alert("OK", response.data.message)
      setLoading(false)
    
    } 
  } catch (error) {
    // handle the error
    setStatusText(error.response.data.message)
    Alert.alert("Error", error.response.data.message)
    setLoading(false)
    
  }
};


const handleRegistration = () => {
  console.log("PhoneNumber: "+ phoneNumber)
   navigation.navigate("Setpassword",{
    email: email,
    otp:otp,
    phoneNumber:complete_phone_number
  })
}
  // Determine if the phone number is 11 digits for enabling the button
  const isButtonActive = otp?.length === 6
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
        
        <View style={styles.pageHeaderContainer}>
        <PageHeader pageTitle="Let us verify you" onBack={goBack}/>
        </View>
       
        <View style={styles.inputParentContainer}>
      
        <View style={styles.labelContainer}>
        <Text style={styles.inputLabel}>Phone number</Text>
       </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputAccessory}>

           <View style={styles.phoneNumberIcon}>
           <Image source={require("../assets/phone.png")} style={styles.phoneIconLogo}/>
           </View>
            
            <View style={styles.countryCodeSelector} >
             <Text style={styles.countryCodeText}>{countryCode}</Text>
            </View>

            <TouchableOpacity style={styles.arrowDownContainer}>
            <Image source={require("../assets/arrow-down.png")} style={styles.arrowDown}/>
            </TouchableOpacity>

           </View>
           <View style={styles.textInputContainer}>
           <Input
            control={control}
            value={complete_phone_number}
            name="phoneNumber"
            rules={rules.phoneNumber}
            error={errors.phoneNumber}
            keyboardType="number-pad"
            placeholder="7063164212"
            autoCapitalize="none"
            
          />
        
        </View>
        </View>
        


        </View>
{/* second input */}
<View style={styles.inputParentContainer}>
      
      <View style={styles.labelContainer}>
      <Text style={styles.inputLabel}>Email Address</Text>
     </View>

      <View style={styles.inputContainer}>

         <Input
          control={control}
          name="email"
          rules={rules.email}
          error={errors.email}
          keyboardType="email-address"
          placeholder="e.g pastorbimbo@nccnigeria.org"
          autoCapitalize="none"
        />
      
      </View>
      </View>

       
        <View style={styles.inputParentContainer}>
       <TouchableOpacity onPress={requestOtp} style={{display:'flex'}}>
         <Text style={styles.otp}>Request for OTP</Text>
         {loading && <ActivityIndicator size={24} color="#6200ee"/>}
          </TouchableOpacity>
          
        <View style={styles.inputContainer}>
        <Input
               control={control}
               name="otp"
               rules={rules.otp}
               error={errors.otp}
               keyboardType="number-pad"
               autoCapitalize="none"
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
          <View style={styles.footerContainer}>
          <PageFooter/>
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
    padding: 5,
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

  textInputContainer:{
    width: 124,
    height: 43,
    paddingTop: '10', 
    paddingRight:'10',
    paddingBottom: '10', 
    paddingLeft:'26',
    borderRadius: 7,
    gap: 10,
    fontSize:16,
    right:30

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
   
    width:'37',
    height:'35',
    padding: '10',
    gap: 10
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
  button:{
    marginTop:20,
    width:290,
    height:'40',
    padding:'10',
    gap:10,
    borderRadius:10,
    left:32,
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
  footerContainer:{
    marginTop:87,
    marginBottom:20

  }
});

export default Verify;

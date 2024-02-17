
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
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
console.log("PhoneNumber in password: "+ phoneNumber)
 const [loading,setLoading] = useState(false)
 const [statusText,setStatusText]= useState("")

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
  const handleRegistration =  async () => {
    console.log("PhoneNumber: " + phoneNumber)
    setLoading(true)

    const data = { 
      email:email,
      otp:otp,
      password:password
     };
  
    try {
      const response = await axiosInstance.post("http://20.84.147.6:8080/api/users/verify-otp-set-password", data);
      setStatusText(response.data.message)
      if (response.status === 200 || response.status ===201) {
        // return the response data
        Alert.alert("OK", response.data.message)
        navigation.navigate("VerificationComplete",{
          phoneNumber:phoneNumber
        });
        setLoading(false)
      
      } 
    } catch (error) {
      // handle the error
      setStatusText(error.response.data.message)
      Alert.alert("Error", error.response.data.message)
      setLoading(false)
      
    }
    // TO be removed in Production
    navigation.navigate("VerificationComplete");
  };
  
  // Determine if all input fields are touched for enabling the button
   const isButtonActive = password === confirmPassword
 return(
  <SafeAreaView style={styles.safeArea}>
  <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'}>
    
    <View style={styles.pageHeaderContainer}>
    <PageHeader pageTitle="Set password" onBack={goBack}/>
    </View>
   
    <View style={styles.inputParentContainer}>
  
    <View style={styles.labelContainer}>
    <Text style={styles.inputLabel}>Choose a password</Text>
   </View>

    <View style={styles.inputContainer}>

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
    <View style={styles.textInputContainer}>
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
  </View>
  {/* Info box */}

  <View style={styles.infoContainer}>

    <View style={styles.infoLogoContainer}>
      <Image style={styles.infoLogo} source={require("../assets/info.png")}/>
    </View>

    <View style={styles.infoTextContainer}>
    <View style={styles.infoText}>
        <Text style={styles.text}>*10 characters</Text>
        <Text  style={styles.text}>*one special characters</Text>
        <Text  style={styles.text}>*one upper case letter</Text>
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
      Next
    </Button>
    
      <View style={styles.footerContainer}>
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
    display:"flex",
    flexDirection:"column",
    alignSelf:"center",
    width: '90%',
    height: '14%',
    //top: 111,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 0,
    gap: 10,
    //borderWidth:1
  } ,


  labelContainer:{
    display:"flex",
    flexDirection:"row",
    left:"8%",
    width: '60%',
    height: '38%',
    padding: '10',
    gap: 10,
    //borderWidth:1
    

  },
  inputLabel: {
    width:'100%',
    height:'100%',
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
   // borderWidth:1
  },

  inputContainer: {
    display:"flex",
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'space-around',
    width:"95%",
    height:"50%",
    borderRadius:7,
    borderWidth:1,
    background: "#CAC3C3",
    borderColor:"#CAC3C3",
    borderWidth:1,
    left:"8%"
  },
 

  // textInputContainer:{
  //   width: 124,
  //   height: 43,
  //   paddingTop: '10', 
  //   paddingRight:'10',
  //   paddingBottom: '10', 
  //   paddingLeft:'26',
  //   borderRadius: 7,
  //   gap: 10,
  //   fontSize:16
  // },

  
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
  button:{
    marginTop:"10%",
    width:"85%",
    height:'8%',
    padding:'1%',
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

  infoContainer:{
    display:"flex",
    flexDirection:"row",
    width: 268,
    height: 69,
    top: '356',
    left: 45,
    marginVertical:32

  },
  infoLogoContainer:{
    width: 69,
    height: 69,
    padding: 10,
    gap: 10,
  

  },
  infoLogo:{
    width:49,
    height:49,
    opacity:50
  },

  infoTextContainer:{
    width: 217,
    height: 73,
    padding: 10,
    gap: 10,
 

  },
  infoText:{
    flex:1,
    width: 197,
    height: 43,
    gap: 2,
   right:5,
 
    alignSelf: 'center',
    display:'flex',
   

  },
  text:{
    flex:1,
    fontFamily: 'Roboto',
    fontWeight: '300',
     lineHeight: 13,
    letterSpacing: 0.2,
    //alignSelf:'center',
    color:"#FF0303",
    width: 900,
    height: 13,
     


  },

  footerContainer:{
    marginTop:87,
    marginBottom:20

  }

   
});
export default Setpasssword;
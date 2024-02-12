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
import {Picker} from '@react-native-picker/picker'
import { Button } from "react-native-paper"
import PageHeader from "./components/PageHeader";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import PageFooter from "./components/PageFooter";
import { validateName } from "../utils/utils";



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


const LetsMeet= ({route,navigation}) => {
  const phoneNumber = route.params
    const goBack = () => {
        navigation.goBack()
    }


    const validate = (values) => {
      const errors = {}
  
      if(!values.firstname) {
        errors.emailAddress = "*Firstname is required"
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
  const initialValues = {
    firstname:"",
    lastname:"",
    nccCenter:"",
  }
  const {values,errors,touched,handleInputChange,handleBlur,isValid} = useForm(initialValues,validate)
  //  const {phoneNumber,emailAddress} = route.params
  //  console.log("Phone Number: " + phoneNumber,"Email: " + emailAddress)
  const [firstname, setfirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nccCenter,setNccCentre] = useState(["Lekki","Ajah","Ikeja","Shomolu","Ilorin","Ibadan","Oworonshoki","Port-Harcourt","Jos","Abuja"])
  const [selectedCenter,setSelectedCenter] = useState("")
  const [centerValue,setCenterValue] = useState("")
  const [centerSelected,setCenterSelected] = useState(false)
  const [nameError, setNameError] = useState(null)

const handleSelectedCenter = (centerSelected) => {
  setNccCentre(centerSelected)
  setSelectedCenter(centerSelected)
  setCenterValue(centerSelected)
  setCenterSelected(true)
}
  const handleRegistration = () => {
    // Handle the registration logic here
    navigation.navigate("Dashboard");
  }

  const handleNameBlur = (name) => {
    const error = validateName(name)
    setNameError
  }

  console.log(Array.isArray(nccCenter))
  // Determine if all input fields are touched for enabling the button
  const isButtonActive = selectedCenter
 return(
   <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
        <View style={styles.pageHeaderContainer}>
         <PageHeader onBack={goBack} pageTitle="Let's Meet You" />
       </View>

          <View style={styles.inputParentContainer}>
          <Text style={styles.inputLabel}>First name</Text>
          <View style={styles.inputContainer}>
            <View style={styles.phoneNumberContainer}>
            <TouchableOpacity style={styles.countryCodeSelector}>
          <Ionicons name="person" size={30} color="#6200ee" />
            </TouchableOpacity>
            </View>

           <TextInput
           style={styles.input}
        placeholder="First Name"
        value={firstname}
        onChangeText={setfirstname}
      />
         
        </View>
        </View>
        <View style={styles.inputParentContainer}>
         <Text style={styles.inputLabel}>Last name</Text>
          <View style={styles.inputContainer}>
            <View style={styles.phoneNumberContainer}>
            <TouchableOpacity style={styles.countryCodeSelector}>
            <Ionicons name="person" size={30} color="#6200ee" />
            </TouchableOpacity>
            </View>
          <TextInput
            placeholder="Last Name"
            onChangeText={setLastname}
            value={lastname}
          />
        </View>
        </View>

        <View >
          <Text style={styles.inputLabel}>NCC centre</Text>
          <View style={styles.centerinputContainer}>
          <TextInput
            placeholder="Select Your Center"
            style={styles.input}
            onChangeText={setNccCentre}
             value={selectedCenter}
           
           
          />
            <Picker
        style={styles.picker}
        selectedValue={selectedCenter}
        onValueChange={(itemValue,itemIndex) => {setSelectedCenter(itemValue)}}
        mode="dropdown"
      >
        {nccCenter.filter(item => typeof item === "string").map((item,index,) => (
          <Picker.Item key={index} label={item} value={item} style={styles.pickerItem}/>
      ))}
      </Picker>
          <TouchableOpacity style={styles.inputLogo}>
          {/* <AntDesign name="circledowno" size={40} color="#6200ee" /> */}
          <FontAwesome name="angle-down" size={40} color="#6200ee" />
          </TouchableOpacity>
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
    marginBottom:20
  },
  inputContainer: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginBottom: 10,
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
  firstnameContainer: {
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
export default LetsMeet;
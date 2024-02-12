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
import Input from "./components/Input";
import { useForm,useWatch ,Controller} from "react-hook-form";




const LetsMeet= ({route,navigation}) => {
  const phoneNumber = route.params
    const goBack = () => {
        navigation.goBack()
    }

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();
   

    const rules = {
      firstname: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
        },
      },
      password: {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters',
        },
      },
      confirm: {
        required: 'Confirm password is required',
        validate: value =>
          value === watch('password') || 'Passwords do not match',
      },
    };

    const firstname = useWatch({control, name:"firstname"})
    const lastname = useWatch({control, name:"lastname"})
    //const sex = useWatch({control, name:"sex"})
    const center = useWatch({control, name:"center"})
    const dob = useWatch({control, name:"dob"})
  
  //  const {phoneNumber,emailAddress} = route.params
  //  console.log("Phone Number: " + phoneNumber,"Email: " + emailAddress)
  // const [firstname, setfirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  
  const [nccCenter,setNccCentre] = useState(["Lekki","Ajah","Ikeja","Shomolu","Ilorin","Ibadan","Oworonshoki","Port-Harcourt","Jos","Abuja"])
  const [sex,setSex] = useState(["Male","Female"])
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

        <View style={styles.formLabelContainer}>
          <Text style={styles.label}>First name</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
          <Input
          control={control}
          name="firstname"
          rules={rules.phoneNumber}
          error={errors.phoneNumber}
          keyboardType="name-phone-pad"
          placeholder="Please enter your first name"
          autoCapitalize="none"/>
          
          </View>
        </View>
       </View>
       <View style={styles.inputParentContainer}>

        <View style={styles.formLabelContainer}>
          <Text style={styles.label}>Last name</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
          <Input
          control={control}
          name="firstname"
          rules={rules.phoneNumber}
          error={errors.phoneNumber}
          keyboardType="name-phone-pad"
          placeholder="Please enter your last name"
          autoCapitalize="none"/>
          
          </View>
        </View>
       </View>

       <View style={styles.inputParentContainer}>

        <View style={styles.formLabelContainer}>
          <Text style={styles.label}>Sex</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.genderInputContainer}>
          <Input
          control={control}
          name="firstname"
          rules={rules.phoneNumber}
          error={errors.phoneNumber}
          keyboardType="name-pad"
          placeholder="Click to choose"
          autoCapitalize="none"
          />
          <TouchableOpacity style={styles.logoContainer}>
          <Image source={require("../assets/arrow-down.png")} style={styles.logo}/>
          </TouchableOpacity>
          <Picker
        style={styles.picker}
        selectedValue={selectedCenter}
        onValueChange={(itemValue,itemIndex) => {setSelectedCenter(itemValue)}}
        mode="dropdown"
      >
        {sex.filter(item => typeof item === "string").map((item,index,) => (
          <Picker.Item key={index} label={item} value={item} style={styles.pickerItem}/>
      ))}
      </Picker>
          </View>
        </View>
       </View>


       <View style={styles.inputParentContainer}>

<View style={styles.formLabelContainer}>
  <Text style={styles.label}>NCC satelite center</Text>
</View>
<View style={styles.inputContainer}>
  <View style={styles.genderInputContainer}>
  <Input
  control={control}
  name="firstname"
  rules={rules.phoneNumber}
  error={errors.phoneNumber}
 // keyboardType="name-pad"
  placeholder="Click to choose"
  autoCapitalize="none"/>
  <TouchableOpacity style={styles.logoContainer}>
  <Image source={require("../assets/arrow-down.png")} style={styles.logo}/>
  </TouchableOpacity>

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
  </View>
</View>
      </View>

      <View style={styles.inputParentContainer}>

<View style={styles.formLabelContainer}>
  <Text style={styles.label}>Date of Birth</Text>
</View>
<View style={styles.inputContainer}>
  <View style={styles.textInputContainer}>
  <Input
  control={control}
  name="firstname"
  rules={rules.phoneNumber}
  error={errors.phoneNumber}
 // keyboardType="name-phone-pad"
  placeholder="click calendar icon"
  autoCapitalize="none"/>
  
  </View>
</View>
</View>



       
       <Controller
       control={control}
       name="ncccenter"
       defaulValue=""
       rules={{required:true}}
       render={({onChange,onBlur,value,name}) => {
        <Picker
        onValuechange = {(itemValue) => onChange(itemValue)}
        onBlue={onBlur}
        selectedValue={value}
        name={name}
       >
         {sex.filter(item => typeof item === "string").map((item,index,) => (
          <Picker.Item key={index} label={item} value={item} style={styles.pickerItem}/>
      ))}
        </Picker>
       }}
       />
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
         Proceed
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
    //justifyContent: "space-between",
    padding: 5,
     gap:10,
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

  },
  formLabelContainer:{
    width: 104,
    height: 28,
    padding: 10,
    gap: 10,
    //borderWidth:1

  },
 
  label:{
    display:'flex',
    flexDirection:"column",
    alignSelf:'center',
    width: "100%",
    height: 15,
    fontFamily: 'Roboto',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15,
    //letterSpacing: 1,
    textAlign: 'left',
    


  },
  inputContainer:{
    width:290,
    height:43,
    borderWidth:1,
    borderRadius:7,
    borderColor:"#ddd",
    alignSelf:"center",
  },
  textInputContainer:{
    width: 290,
    height: 35,
    borderRadius: 7,
    //borderWidth: 1,
    gap: 35,
    borderColor:"#CAC3C3"
},
genderInputContainer:{
  display:'flex',
  flexDirection:"row",
  justifyContent:"space-between",
  width: 290,
  height: 35,
  borderRadius: 7,
  //borderWidth: 1,
  gap: 35,
  borderColor:"#CAC3C3"
},
picker: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: 0,
},
logoContainer:{
  height:58,
  width:34,
  right:'10%',
  marginTop:"4%",
  //paddingTop:10,
  //paddingRight:58,
  //paddingBottom:10,
  // paddingLeft:58,
  gap:10
},
logo:{
  width:20,
  height:20
},
  input:{
    width: 204,
    height: 15,
    fontFamily: 'Roboto',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15,
    //letterSpacing: 0em,
    textAlign: 'center',


  },
  
  pageHeaderContainer:{
    marginBottom:20
  },

 
});
export default LetsMeet;
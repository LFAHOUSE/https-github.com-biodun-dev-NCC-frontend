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
import {Picker} from '@react-native-picker/picker'
import { Button } from "react-native-paper"
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";
import { useForm,useWatch ,Controller,getValues} from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment'
import Loader from "./components/Loader";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const LetsMeet= ({route,navigation}) => {
  const {phoneNumber,otp,password,email} = route.params
  console.log("PhoneNumber in LetsMeet: " + phoneNumber)
  console.log( phoneNumber,
    firstname,
    lastname, 
    email,
    otp,
    password,
    selectedCenter,
    selectedSex,
    dateSelected)
    const goBack = () => {
        navigation.goBack()
    }
    const [nccCenter,setNccCentre] = useState(["Lekki","Ajah","Ikeja","Shomolu","Ilorin","Ibadan","Oworonshoki","Port-Harcourt","Jos","Abuja"])
    const [sex,setSex] = useState(["Male","Female"])
    const [selectedSex,setSelectedSex] = useState("")
    const [selectedCenter,setSelectedCenter] = useState("")
    const [dateSelected,setDatSelected] = useState("")
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [statusText,setStatusText]= useState("")
    const [loading,setLoading] = useState(false)
    
  console.log(dateSelected)
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();
   

    const rules = {
      firstname: {
        required: 'First name is required',
        
      },
      lastname: {
        required: 'Last name is required',
        
      },

    };

    const firstname = useWatch({control, name:"firstname"})
    const lastname = useWatch({control, name:"lastname"})

    const onChange = (event, selectedDate) => {
      console.log("selectedDate: " + selectedDate)
    if (selectedDate) {
      setDate(selectedDate)
        const formattedDate = moment (selectedDate).format('YYYY-MM-DD');
        setDatSelected(formattedDate)
        setShow(false)
      } else {
        setShow(false);
      }
    }
  
    const showMode = () => {
      setShow(true);
    };

  
 // Define a named function for the render prop
function renderInput({ field, fieldState }) {
  return (
    <View
      style={[
        styles.inputContainer,
        { borderColor: fieldState.isTouched ? 'green' : 'red', borderWidth: 1 },
      ]}
    >
      <TouchableOpacity style={styles.textInputContainer}>
        <TextInput
          name="firstname"
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          keyboardType="name-phone-pad"
          placeholder="Please enter your first name"
          autoCapitalize="none"
        />
      </TouchableOpacity>
    </View>
  );
}

// Pass the function as a reference to the render prop
<Controller
  name="firstname"
  control={control}
  rules={rules.firstname}
  render={renderInput} // no need to use an anonymous function here
/>;

    const handleRegistration =  async () => {
      console.log("PhoneNumber in LetsMeet: " + phoneNumber)
      console.log( phoneNumber,
        firstname,
        lastname, 
        email,
        otp,
        password,
        selectedCenter,
        selectedSex,
        dateSelected)
      setLoading(true)
    
      try {
        const response = await axiosInstance.post("http://20.84.147.6:8080/api/users/complete-profile-registration",{
          phoneNumber:phoneNumber,
          firstname: firstname,
          lastName: lastname, 
          email:email,
          otp:otp,
          password:password,
          nccCentre: selectedCenter,
          sex:selectedSex,
          dob:dateSelected
        });
        setStatusText(response.data?.message)
        if (response.status === 200 || response.status ===201) {
          // return the response data
          setLoading(false)
          Alert.alert("OK", response.data?.message)
          setStatusText(response.data?.message)
          navigation.navigate("Dashboard",{
            firstname:firstname
          });
       
        
        } 
      } catch (error) {
        // handle the error
        Alert.alert("Error", error.response.data?.message)
        setStatusText(error.response.data?.message)
        setLoading(false)
        
      }
      //To be removed in Production
      navigation.navigate("Dashboard");
    };

  

  console.log(Array.isArray(nccCenter))
  // Determine if all input fields are touched for enabling the button
  const isButtonActive = dateSelected
 return(
   loading ? (<Loader/>) : (
   <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.pageHeaderContainer}>
         <PageHeader onBack={goBack} pageTitle="Let's Meet You" />
       </View>

       <View style={styles.inputParentContainer}>

        <View style={styles.formLabelContainer}>
          <Text style={styles.label}>First name</Text>
        </View>
        <Controller
        name="firstname"
        control={control}
        rules={rules.firstname}
        render={({ field,fieldState}) => (
        <View style={[styles.inputContainer,{borderColor: fieldState.isTouched ? 'green' : 'red',borderWidth:1}]}>
          <TouchableOpacity style={styles.textInputContainer}>
          <TextInput
          name= "firstname"
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          keyboardType="name-phone-pad"
          placeholder="Please enter your first name"
          autoCapitalize="none"/>
          
          </TouchableOpacity>
        </View>
        )}/>
       </View>
       <View style={styles.inputParentContainer}>

        <View style={styles.formLabelContainer}>
          <Text style={styles.label}>Last name</Text>
        </View>
        <Controller
        name="lastname"
        control={control}
        rules={rules.lastname}
        render={({ field,fieldState}) => (
        <View style={[styles.inputContainer, {borderColor: fieldState.isTouched ? 'green' : 'red',borderWidth:1}]}>
          <TouchableOpacity style={styles.textInputContainer}>
          <TextInput
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          keyboardType="name-phone-pad"
          placeholder="Please enter your last name"
          autoCapitalize="none"/>
          
          </TouchableOpacity>
        </View>
        )}/>
       </View>

       <View style={styles.inputParentContainer}>

        <View style={styles.formLabelContainer}>
          <Text style={styles.label}>Sex</Text>
        </View>
        <Controller
        name="gender"
        control={control}
        rules={rules.sex}
        render={({ field,fieldState}) => (
        <View style={[styles.inputContainer,{borderColor: selectedSex ? 'green' : 'red',borderWidth:1}]}>
          <TouchableOpacity style={styles.genderInputContainer}>
          <TextInput
          style={styles.input}
          control={control}
          name="gender"
          onChangeText={setSex}
          value={selectedSex}
          keyboardType="name-phone-pad"
          placeholder="Click to choose"
          autoCapitalize="none"
          />
          <TouchableOpacity style={styles.logoContainer}>
          <Image source={require("../assets/arrow-down.png")} style={styles.logo}/>
          </TouchableOpacity>
          <Picker
        style={styles.picker}
        selectedValue={selectedSex}
        onValueChange={(itemValue,itemIndex) => {setSelectedSex(itemValue)}}
        mode="dropdown"
      >
        {sex.filter(item => typeof item === "string").map((item,index,) => (
          <Picker.Item key={index} label={item} value={item} style={styles.pickerItem}/>
      ))}
      </Picker>
          </TouchableOpacity>
        </View>
        )}/>
       </View>


       <View style={styles.inputParentContainer}>

<View style={styles.formLabelContainer}>
  <Text style={styles.label}>NCC satelite center</Text>
</View>
<Controller
        name="nccsateliteCenter"
        control={control}
        rules={rules.nccCenter}
        render={({ field,fieldState}) => (
<View style={[styles.inputContainer, {borderColor: selectedCenter ? 'green' : 'red',borderWidth:1}]}>
  <TouchableOpacity style={styles.genderInputContainer}>
  <TextInput
  style={styles.input}
  onChangeText={field.onChange}
  value={selectedCenter}
  onBlur={field.onBlur}
  placeholder="choose your satelite center"
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
  </TouchableOpacity>
</View>
        )}/>
      </View>


 <View style={styles.inputParentContainer}>
<View style={styles.formLabelContainer}>
  <Text style={styles.label}>Date of Birth</Text>
</View>
<Controller
        name="phoneNumber"
        control={control}
        rules={rules.phoneNumber}
        render={({ field,fieldState}) => (
<View style={[styles.inputContainer,{borderColor: dateSelected ? 'green' : 'red',borderWidth:1}]}>
  <TouchableOpacity style={styles.textInputContainer}>

  <TextInput
  style={styles.input}
  onChangeText={setDate}
  value={dateSelected}
  placeholder="click the calendar icon"
  autoCapitalize="none"/>

  <TouchableOpacity onPress={showMode} style={styles.calendarContainer}>
  <Image source={require("../assets/calendar.png")} />
  </TouchableOpacity>
  {show &&  <DateTimePicker
        style={styles.datePicker}
        mode='date'
        value={date}
        display={Platform.OS === 'ios' ? 'spinner' : 'inline'}
        is24Hour={true}
        dateformat="YYYY-MM-DD"
        onChange={onChange}
     
      />
      
      }
 
  
  </TouchableOpacity>
</View>
        )}/>
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
  
        <View>
        <PageFooter/>
          </View>
    </ScrollView>
   </SafeAreaView>
 ))
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
    // gap:5,
    flexDirection:"column"
  },
  pageHeaderContainer:{
    marginBottom:20
  },
  inputParentContainer:{
    display:"flex",
    flexDirection:"column",
    alignSelf:"center",
    width: wp('83%'),
    height: hp('15%'),
    paddingTop: "0%",
    paddingRight: "0%",
    paddingBottom: "2%",
    paddingLeft: "0%",
    gap: 10,
    //borderWidth:1

  },
  
  formLabelContainer:{
    width: "80%",
    height: "30%",
    padding: '1%',
    //gap: 10,
    //borderWidth:1

  },
 
  label:{
    display:'flex',
    flexDirection:"column",
    alignSelf:'center',
    width: "100%",
    height: "90%",
    fontFamily: 'Roboto',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15,
    letterSpacing: 1,
    textAlign: 'left',
  //  borderWidth:1
    

  },
  inputContainer:{
    display:"flex",
    flexDirection:'row',
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    width:"100%",
    height:"50%",
    borderWidth:1,
    borderRadius:7,
    borderColor:"#CAC3C3",
    alignSelf:"center",
  //  borderWidth:1,
    
  },
  textInputContainer:{
    width: "95%",
    height: "95%",
    borderRadius: 7,
    //borderWidth: 1,
    gap: 35,
    borderColor:"#CAC3C3"
},
genderInputContainer:{
  display:'flex',
  flexDirection:"row",
  justifyContent:"space-between",
  width: "95%",
  height: "95%",
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
  height:"60%",
  width:"10%",
  right:'40%',
  marginTop:"4%",
  //borderWidth:1,
  paddingTop:"1%",
  paddingRight:"5.8%",
  paddingBottom:"1%",
  paddingLeft:"1.8%",
  gap:10
},
logo:{
  width:20,
  height:20
},
  input:{
    borderColor: "#ddd",
    backgroundColor: "transparent",
    paddingHorizontal: "0.5%",
    paddingVertical:"0.5%",
    fontSize: 16,
    width:"80%",
    height:'100%',
    paddingRight:'1%',
    paddingBottom:'1%',
    paddingLeft:'2.6%',
   // borderWidth:1

  },
  calendarContainer:{
    width: "15%",
    height: "100%",
   // gap: 167,
    //borderWidth:1,
    marginBottom:78,
    top:"-50%"

  },
  
  button:{
    alignSelf:"center",
    marginTop:"10%",
    width:wp("89%"),
    height:hp('7%'),
    borderRadius:10,
    left:"2%",
    marginTop:"15%"
  },
  datePicker: {
    width: 200,
  },
footerContainer:{
  // marginTop:87,
  // marginBottom:20
  marginVertical:30
}
 
});
export default LetsMeet;
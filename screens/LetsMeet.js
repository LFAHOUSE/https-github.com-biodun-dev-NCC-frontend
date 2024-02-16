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
import PageFooter from "./components/PageFooter";
import Input from "./components/Input";
import { useForm,useWatch ,Controller} from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment'



const LetsMeet= ({route,navigation}) => {
  const phoneNumber = route.params
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
        const formattedDate = moment (selectedDate).format('DD-MM-YYYY');
        setDatSelected(formattedDate)
        setShow(false)
      } else {
        setShow(false);
      }
    }
  
    const showMode = () => {
      setShow(true);
    };

  
 
    const handleRegistration =  async () => {
      console.log("PhoneNumber: " + phoneNumber)
      setLoading(true)
  
      const data = { 
        phoneNumber:phoneNumber,
        firstname: firstname,
        lastName: lastname, 
        nccCentre: selectedCenter,
        sex:selectedSex,
        dob:dateSelected

       };
    
      try {
        const response = await axiosInstance.post("http://20.84.147.6:8080/api/users/complete-profile-registration", data);
        setStatusText(response.data.message)
        if (response.status === 200 || response.status ===201) {
          // return the response data
          Alert.alert("OK", response.data.message)
          navigation.navigate("Dashboard",{
            phoneNumber:phoneNumber
          });
          setLoading(false)
        
        } 
      } catch (error) {
        // handle the error
        Alert.alert("Error", error.response.data.message)
        setStatusText(error.response.data.message)
        setLoading(false)
        
      }
      //To be removed in Production
      navigation.navigate("Dashboard");
    };

  

  console.log(Array.isArray(nccCenter))
  // Determine if all input fields are touched for enabling the button
  const isButtonActive = selectedCenter
 return(
   <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
        <View style={styles.pageHeaderContainer}>
         <PageHeader onBack={goBack} pageTitle="Let's Meet You" />
       </View>
<View>
       <View style={styles.inputParentContainer}>

        <View style={styles.formLabelContainer}>
          <Text style={styles.label}>First name</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
          <Input
          control={control}
          name="firstname"
          rules={rules.firstname}
          error={errors.firstname}
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
          name="lastname"
          rules={rules.lastname}
          error={errors.lastname}
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
          <TextInput
          style={styles.input}
          control={control}
          name="gender"
          onChangeText={setSex}
          error={errors.sex}
          value={selectedSex}
          rules={rules.sex}
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
          </View>
        </View>
       </View>


       <View style={styles.inputParentContainer}>

<View style={styles.formLabelContainer}>
  <Text style={styles.label}>NCC center</Text>
</View>
<View style={styles.inputContainer}>
  <View style={styles.genderInputContainer}>
  <TextInput
  style={styles.input}
  control={control}
  name="nccsateliteCenter"
  onChangeText={setNccCentre}
  value={selectedCenter}
  rules={rules.nccCenter}
  error={errors.nccCenter}
 // keyboardType="name-pad"
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
  </View>
</View>
      </View>


 <View style={styles.inputParentContainer}>
<View style={styles.formLabelContainer}>
  <Text style={styles.label}>Date of Birth</Text>
</View>
<View style={styles.inputContainer}>
  <View style={styles.textInputContainer}>

  <TextInput
  style={styles.input}
  control={control}
  name="dob"
  rules={rules.dob}
  error={errors.dob}
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
        dateformat="DD-MM-YYYY"
        onChange={onChange}
     
      />
      
      }
 
  
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
         Proceed
        </Button>
        </View>
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
    //justifyContent: "space-between",
    padding: 5,
     gap:10,
  },
  pageHeaderContainer:{
    marginBottom:20
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
  right:'40%',
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
    // width: 204,
    // height: 15,
    // fontFamily: 'Roboto',
    // fontSize: 13,
    // fontWeight: '400',
    // lineHeight: 15,
    // //letterSpacing: 0em,
    // textAlign: 'center',

    borderColor: "#ddd",
    backgroundColor: "transparent",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 16,
    height: 60,
    padding:10,
    width:240,
    height:'15',
    paddingRight:'10',
    paddingBottom:'10',
    paddingLeft:'26',


  },
  calendarContainer:{
    width: 290,
    height: 38,
    gap: 167,
    //borderWidth:1,
    marginBottom:78,
    top:-24

  },
  
  button:{
    marginTop:60,
    width:290,
    height:'40',
    padding:'10',
    gap:10,
    borderRadius:10,
    left:32,
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
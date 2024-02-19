import React from "react";
import {
    View,
    TextInput,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StyleSheet
    
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {Calendar} from 'react-native-calendars'


const MyCalendar = ({}) => {

    const onDayPress = (day) => {
        console.log('selected day', day);
      };

    return (
        <View style={styles.container}>
          <View style={styles.pageTitle}>
            <Text style={styles.pageText}>My Calendar</Text>
            </View>  

            <View style={styles.calendarContainer}>
            <Calendar
            style={styles.calendar}
            current={'2024-01-01'}
            minDate={'2023-12-01'}
            maxDate={'2024-12-31'}
            onDayPress={onDayPress}
            monthFormat={'MMMM YYYY '}
            onMonthChange={(month) => {console.log('month changed', month)}}
            hideExtraDays={true}
            hideArrows={false}
            enableSwipeMonths={true}
            />
            </View>

            <View style={styles.calendarDetails}>
            <View style={styles.roundedContainer}>
                    <View style={styles.rounded}></View>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textone}>National Fasting & Prayer (Satellite)</Text>
                    </View>
                    <View style={styles.texttwoContainer}>
                        <Text style={styles.texttwo}>January 4 - 5, 2024</Text>
                    </View>
                </View>
            </View>

            <View style={styles.calendarDetails}>
            <View style={styles.roundedContainer}>
                    <View style={styles.roundedone}></View>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textone}>Regional Fasting & Prayer</Text>
                    </View>
                    <View style={styles.texttwoContainer}>
                        <Text style={styles.texttwo}>January 6, 2024</Text>
                    </View>
                </View>
            </View>

            <View style={styles.calendarDetails}>
            <View style={styles.roundedContainer}>
                    <View style={styles.roundedtwo}></View>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textone}>National Children and Teenagers Teachers' Retreat</Text>
                    </View>
                    <View style={styles.texttwoContainer}>
                        <Text style={styles.texttwo}>January 25 - 27, 2024</Text>
                    </View>
                </View>
            </View>
           
             
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        gap:5
    },
    pageTitle:{
        display:"flex",
        flexDirection:"row",
        width: wp("30%"),
        height:hp("5%"),
        top: "20%",
        left: "4%",
        padding:"1%",
        //borderWidth:1,
       


    },
    pageText:{
        width:wp("50%"),
        fontFamily: "Roboto",
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 15,
        letterSpacing: 0.5,
        textAlign: 'left',
       // borderWidth:1
    },

    calendarContainer:{
        display:"flex",
        alignItems:"center",
        alighItems:"center",
        width: wp("85%"),
        height: hp("45%"),
        top: "15%",
        left: "7.5%",
        borderRadius: 7,
        border: 1,
        //padding:10,
        borderColor:"#6EB1E1",
        borderWidth:2,
        borderRadius:2,
        borderRadius:5
    },
    calendar:{
        width: wp("84%"),
        height: hp("40%"),
        alignSelf:"center",

    },
    calendarDetails: {
        displa:"flex",
        flexDirection:"row",
        width:wp("85%"),
        height: hp("10.5%"),
        top: "35%",
        alignSelf:"center",
        borderWidth:1,
        borderColor:"red",
        borderColor:"#ddd",
        gap:10,

    },
    roundedContainer:{
        width: wp("12%"),
        height: hp("6%"),
        padding: "1%",
        gap: 10,
       // borderWidth:1

    },
    rounded:{
        width: wp("8%"),
        height: hp("4%"),
        opacity: 0.9,
        borderRadius:100,
        backgroundColor:"#A6BB22"

    },
    roundedone:{
        width: wp("8%"),
        height: hp("4%"),
        opacity: 0.9,
        borderRadius:100,
        backgroundColor:"#489DEC"
    },

    roundedtwo:{
        width: wp("8%"),
        height: hp("4%"),
        opacity: 0.9,
        borderRadius:100,
        backgroundColor:"#FBCF33"
    },

    detailsContainer:{
        display:'flex',
        flexDirection:"column",
        width: wp("70%"),
        height: hp("10%"),
        //borderWidth:1

    },
    textContainer:{
        width: "100%",
        height: "60%",
        padding: "1%",
        gap: 10,
        //borderWidth:1

    },
    textone:{
        flex:1,
        height: 14,
        fontFamily: "Roboto",
        fontSize: 12,
        fontWeight: "700",
        lineHeight: 14,
       letterSpacing: 1,
        textAlign: "left",
    },
    texttwoContainer:{
        width: wp("40%"),
        height: hp("4%"),
        padding: "1%",
        gap: 10,
       // borderWidth:1

    },
    texttwo:{
        width: wp("50%"),
        height: hp("4%"),
        fontFamily: "Roboto",
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 14,
        letterSpacing: 1,
        textAlign: "left",


    }
})

export default MyCalendar;
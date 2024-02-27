import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";

// Override default styles using theme prop
const calendarTheme = {
  // Customize background color for calendar
  backgroundColor: "#FFFFFF",

  // Customize text color for various elements
  calendarBackground: "#FFFFFF",
  textSectionTitleColor: "#06447C",
  todayTextColor: "#A6BB22",
  dayTextColor: "#000000",
  arrowColor: "#000000",
  monthTextColor: "#C39C0E",
  indicatorColor: "#06447C",
};

const MyCalendar = ({}) => {
  const onDayPress = (day) => {
    console.log("selected day", day);
  };

  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState();
  const [formattedData, setFormattedData] = useState({});
  const [colorMap, setColorMap] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const response = await axios.get("http://20.84.147.6:8080/api/events");
      console.log("Response data", response.data);
      const { formattedData, colorMap } = formatEventData(response.data); // Update formattedData and colorMap
      setEventData(response.data);
      setFormattedData(formattedData); // Set formattedData state to the formatted data
      setColorMap(colorMap); // Set colorMap state to the color map
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  const formatEventData = (events) => {
    const formattedData = {};
    const colorMap = {};
    events.forEach((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const currentDate = new Date(startDate);
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colorMap[event._id] = color;
      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        formattedData[dateString] = {
          marked: true,
          selected: true,
          selectedColor: color,
          dotColor: color,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return { formattedData, colorMap };
  };

  const renderEventsForMonth = (currentMonth) => {
    // Filter events that belong to the current month
    const eventsForCurrentMonth = eventData.filter((event) => {
      const eventMonth = new Date(event.startDate).getMonth() + 1;
      return eventMonth === currentMonth;
    });

    // If there are no events for the current month, render a text indicating so
    if (eventsForCurrentMonth.length === 0) {
      return (
        <View >
          <Text style={styles.noEventsText}>No events for this month</Text>
        </View>
      );
    }

    // Render events for the current month
    return eventsForCurrentMonth.map((event, index) => (
      <View key={index} style={styles.eventContainer}>
        <View
          style={[styles.eventDot, { backgroundColor: colorMap[event._id] }]}
        />
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDate}>
            {formatEventDate(event.startDate, event.endDate)}
          </Text>
        </View>
      </View>
    ));
  };

  const formatEventDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMonth = start.toLocaleString("default", { month: "long" });
    const startDay = start.getDate();
    const endDay = end.getDate();
    const year = start.getFullYear();

    if (
      startMonth ===
      new Date(endDate).toLocaleString("default", { month: "long" })
    ) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${end.toLocaleString("default", {
        month: "long",
      })} ${endDay}, ${year}`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.subText}>My Calendar</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          minDate={"2023-12-01"}
          maxDate={"2024-12-31"}
          onDayPress={onDayPress}
          monthFormat={"MMMM yyyy "}
          onMonthChange={(month) => {
            console.log("month changed", month);
            setCurrentMonth(new Date(month.dateString).getMonth() + 1);
          }}
          hideExtraDays={true}
          hideArrows={false}
          enableSwipeMonths={true}
          style={styles.calendar}
          markedDates={formattedData}
          theme={calendarTheme}
        />
      </View>

      <View>
        {renderEventsForMonth(currentMonth)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    columnGap: 10,
    padding: 20,
    backgroundColor: "white",
  },

  calendarContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingTop: 10,
  },

  calendar: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#A6BB22",
  },

  subText: {
    color: "#06447C",
    fontSize: 17,
    fontWeight: "800",
  },

  eventContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },

  eventDot: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },

  eventDetails: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Roboto",
    fontSize: 13,
  },

  eventTitle: {
    fontWeight: "700",
    textAlign: "left",
  },

  eventDate: {},

  noEventsText: {
    fontSize: 15,
    fontWeight: "700",
    paddingTop: 20,
  },
});

export default MyCalendar;

import React from "react";
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
  Alert,
  ImageBackground,
} from "react-native";
import Bell from "../../assets/bell.svg";
import Clock from "../../assets/time.svg";
import Settings from "../../assets/setting.svg";
import Avatar from "../../assets/avatar.svg";

const DashboardHeader = () => {
  const urls = [
    require("../../assets/bell.svg"),
    require("../../assets/time.svg"),
    require("../../assets/setting.svg"),
    require("../../assets/avatar.svg"),
  ];

  return (
    <View>
      <ImageBackground
        source={require("../../assets/banner.png")}
        style={styles.container}
      >
          <View>
            <Text>Good morning,</Text>
            <Text style={styles.userName} >Temidayo</Text>
          </View>
          <View style={styles.notifImgFlex}>
            <Bell style={styles.notifImg} />
            <Clock style={styles.notifImg} />
            <Settings style={styles.notifImg} />
            <Avatar style={styles.notifImg} />
          </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  notifImg: {
    width: "100%",
    height: "100%",
  },
  notifImgFlex: {
    display: "flex",
    flexDirection: "row",
    gap: 25,
  },
  userName: {
    fontSize: 24,
    fontWeight: "900"
  }
});

export default DashboardHeader;

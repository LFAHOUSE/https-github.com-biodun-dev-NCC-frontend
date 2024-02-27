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


const DashboardHeader = () => {
  const urls = [
    require("../../assets/bell.png"),
    require("../../assets/time.png"),
    require("../../assets/setting.png"),
    require("../../assets/avatar.png"),
  ];

  return (
    <View>
      <ImageBackground
        source={require("../../assets/banner.png")}
        style={styles.container}
      >
        <View>
          <Text>Good morning,</Text>
          <Text style={styles.userName}>Temidayo</Text>
        </View>
        <View style={styles.notifImgFlex}>
          {urls.map((url, index) => (
            <TouchableOpacity key={index}>
              <Image source={url} style={styles.notifImg} />
            </TouchableOpacity>
          ))}
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
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  notifImg: {
    width: 24,
    height: 24,
  },
  notifImgFlex: {
    display: "flex",
    flexDirection: "row",
    gap: 25,
  },
  userName: {
    fontSize: 24,
    fontWeight: "900",
  },
});

export default DashboardHeader;

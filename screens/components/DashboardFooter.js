import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Home from "../../assets/home.svg";
import Search from "../../assets/search.svg";
import Library from "../../assets/library.svg";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const DashboardFooter = () => {
  const navigation = useNavigation();
  const isHomeFocused = useIsFocused("Home"); // Check if Home screen is focused
  const isSearchFocused = useIsFocused("Search"); // Check if Search screen is focused
  const isLibraryFocused = useIsFocused("Library"); // Check if Library screen is focused

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/banner.png")}
        style={styles.bgImg}
      >
        <View style={styles.footerImgFlex}>
          <TouchableOpacity
            style={styles.footerTextImg}
            onPress={() => navigation.navigate("Home")}
          >
            <Home
              style={[
                styles.footerImg,
                isHomeFocused ? styles.activeIcon : styles.inactiveIcon,
              ]}
            />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerTextImg}
            onPress={() => navigation.navigate("Search")}
          >
            <Search
              style={[
                styles.footerImg,
                // isSearchFocused ? styles.activeIcon : styles.inactiveIcon,
              ]}
            />
            <Text>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerTextImg}
            onPress={() => navigation.navigate("Library")}
          >
            <Library
              style={[
                styles.footerImg,
                isLibraryFocused ? styles.activeIcon : styles.inactiveIcon,
              ]}
            />
            <Text>Library</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    width: "100%",
    backgroundColor: "#ffffff", // Ensure it stretches across the width
  },
  bgImg: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  footerImgFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  footerTextImg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  activeIcon: {
    opacity: 1,
  },

  inactiveIcon: {
    // opacity: 0.5,
  },
});

export default DashboardFooter;

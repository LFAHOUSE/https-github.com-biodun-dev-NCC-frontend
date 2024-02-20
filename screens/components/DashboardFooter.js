import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import Home from "../../assets/home.svg";
import Search from "../../assets/search.svg";
import Library from "../../assets/library.svg";

const DashboardFooter = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/banner.png")}
        style={styles.bgImg}
      >
        <View style={styles.footerImgFlex}>
          <View style={styles.footerTextImg}>
            <Home style={styles.footerImg} />
            <Text>Home</Text>
          </View>
          <View style={styles.footerTextImg}>
            <Search style={styles.footerImg} />
            <Text>Search</Text>
          </View>
          <View style={styles.footerTextImg}>
            <Library style={styles.footerImg} />
            <Text>Library</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    width: "100%", // Ensure it stretches across the width
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

});

export default DashboardFooter;

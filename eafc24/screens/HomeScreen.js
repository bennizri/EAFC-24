import React from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/eafc.jpg")}
        style={styles.imageBackground}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    resizeMode: "cover",
  },
});

export default HomeScreen;

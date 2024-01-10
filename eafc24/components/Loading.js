import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text>Loading...</Text>
      <ActivityIndicator size="large" color="#black" />
    </View>
  );
};
export default Loading;
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe4b5",
  },
});

import { View, Text, Image, StyleSheet } from "react-native";

const PlayerPrice = ({ playerPrice }) => {
  return (
    <View>
      <Text style={{ fontSize: 24 }}>Last Prices:</Text>
      <View style={{ flexDirection: "column" }}>
        {Object.keys(playerPrice).map((key, index) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            key={key}
          >
            <Image
              style={styles.iconImage}
              source={{
                uri: "https://cdn.futbin.com/design/img/coins_bin.png",
              }}
            />
            <Text
              style={[
                styles.smallPrice,
                index === 0 ? styles.firstPrice : null,
              ]}
            >
              {playerPrice[key]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default PlayerPrice;
const styles = StyleSheet.create({
  iconImage: {
    width: 25,
    height: 25,
    marginLeft: 12,
  },
  firstPrice: {
    fontSize: 24,
    color: "white",
  },
  smallPrice: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
});

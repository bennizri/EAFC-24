import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { findPlayer, getUserPrice } from "../http/http";
import Card from "../components/Card";
const PlayerDeatailsScreen = ({ route }) => {
  const [playerPrice, setPlayerPrice] = useState({});
  const [data, setData] = useState();
  const playerData = route.params;
  const playerId = playerData.player_id;
  const image = `https://cdn.futbin.com/content/fifa24/img/players/${playerId}.png`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findPlayer(playerId);
        console.log("find women player");
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    const featchPlayerPrice = async () => {
      try {
        const response = await getUserPrice(playerId);
        const price = {
          price: response[playerId].prices.ps.LCPrice,
          price1: response[playerId].prices.ps.LCPrice2,
          price2: response[playerId].prices.ps.LCPrice3,
          price3: response[playerId].prices.ps.LCPrice4,
          price4: response[playerId].prices.ps.LCPrice5,
        };
        console.log([price]);
        setPlayerPrice(price);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    featchPlayerPrice();
  }, [playerId]);

  return (
    <View style={styles.container}>
      <Card image={image} playerDeatail={data} playerPrice={playerPrice} />
    </View>
  );
};
export default PlayerDeatailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    backgroundColor: "#f0f0f0",
  },
});

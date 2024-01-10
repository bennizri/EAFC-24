import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import PlayerStats from "./PlayerStats";
import { useState } from "react";
import PlayerStatCard from "./PlayerStatCard";
import Button from "./Button";
import Loading from "./Loading";
import PlayerPrice from "./PlayerPrice";

const Card = ({ image, playerDeatail, playerPrice }) => {
  console.log(playerPrice);
  const [showStats, setShowStats] = useState(false);
  if (!playerDeatail) {
    return <Loading />;
  }

  const detailsPressHandler = () => {
    setShowStats(!showStats);
  };
  console.log("playerDeatail[0]:", playerDeatail);

  return (
    <View style={styles.root}>
      <Text style={styles.playerName}>{playerDeatail[0].long_name}</Text>
      <View style={styles.imageWrapper}>
        <ImageBackground
          style={styles.backgroundImage}
          source={{
            uri: "https://cdn.futbin.com/content/fifa24/img/cards/hd/1_gold.png?v=144",
          }}
        >
          <View style={styles.playerPosition}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{playerDeatail[0].overall}</Text>
              <Text style={styles.text}>
                {playerDeatail[0].player_positions.split(",")[0].trim()}
              </Text>
            </View>
            <View style={styles.playerDeatailContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <PlayerStats playerDeatail={playerDeatail} />
            </View>
          </View>
        </ImageBackground>
        <PlayerPrice playerPrice={playerPrice} />
      </View>
      <View style={styles.button}>
        <Button children="details" onPress={detailsPressHandler} />
      </View>

      {showStats && <PlayerStatCard playerDeatail={playerDeatail} />}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#2f4f4f",
  },
  imageWrapper: {
    flexDirection: "row",
    height: 250,
  },
  backgroundImage: {
    width: 260,
    height: 350,
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
  },
  textContainer: {
    paddingTop: 8,
    marginLeft: 30,
  },
  image: {
    width: 160,
    height: 160,
    marginLeft: 20,
    marginBottom: 10,
  },
  playerPosition: {
    flexDirection: "column",
    paddingLeft: 22,
    fontSize: 22,
  },
  playerDeatailContainer: {
    marginLeft: 12,
    height: 265,
  },
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
  button: {
    marginTop: 90,
  },
  playerName: {
    justifyContent: "center",
    fontSize: 24,
    marginLeft: 12,
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { http } from "../http/http";
import SearchPlayer from "../components/SearchPlayer";
import Loading from "../components/Loading";

const PlayersScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return <Loading />;
  }

  const PlayerPressHandler = (id) => {
    navigation.navigate("PlayerDeatailsScreen", {
      player_id: id,
    });
  };

  const renderItem = ({ item }) => {
    const imageUrl = item.player_id
      ? `https://cdn.futbin.com/content/fifa24/img/players/${item.player_id}.png`
      : "https://cdn.sofifa.net/player_0.svg";

    return (
      <View style={styles.imageContainer}>
        <Pressable onPress={() => PlayerPressHandler(item.player_id)}>
          <Image
            key={item.player_id}
            style={styles.image}
            source={{ uri: imageUrl }}
            onError={() => {
              setData((prevData) =>
                prevData.filter(
                  (dataItem) => dataItem.player_id !== item.player_id
                )
              );
            }}
          />
        </Pressable>
      </View>
    );
  };

  const handleDataFetched = (newData) => {
    setData(newData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome! Please Search Your Player.</Text>
      <SearchPlayer
        onDataFetched={handleDataFetched}
        setIsFetching={setIsFetching}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.player_id.toString()}
        renderItem={renderItem}
        numColumns={5}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2f4f4f",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  image: {
    aspectRatio: 1,
    margin: 4,
    maxHeight: 70,
  },
  columnWrapper: {
    justifyContent: "center",
    flexDirection: "row",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faebd7",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default PlayersScreen;

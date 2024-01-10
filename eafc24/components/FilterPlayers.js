import { View, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import PlayersPositions from "./PlayersPositions";
import Button from "./Button";
import { filteredPlayers } from "../http/http";

const FilterPlayers = ({ onDataFetched }) => {
  const [playerPos, setPlayerPos] = useState("");

  useEffect(() => {
    if (playerPos.trim() !== "") {
      performSearch();
    }
  }, [playerPos]);

  const performSearch = async () => {
    try {
      const data = await filteredPlayers(playerPos);
      const filteredData = data.filter((item) => item.long_name);
      onDataFetched(filteredData);
    } catch (error) {
      console.error("Error in performSearch:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  return (
    <View style={styles.borderBox}>
      <View style={styles.rangeContainer}>
        <Text style={styles.text}>Please Choose Your Player's Position</Text>
        <PlayersPositions onPlayerPos={setPlayerPos} />
        <Button
          children="Find Player's Positions"
          onPress={performSearch} // Use performSearch directly
        />
      </View>
    </View>
  );
};

export default FilterPlayers;

const styles = StyleSheet.create({
  borderBox: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
  },
  rangeContainer: {
    marginVertical: 10,
  },
  text: {
    justifyContent: "center",
    fontSize: 15,
    marginLeft: 62,
    marginBottom: 12,
  },
});

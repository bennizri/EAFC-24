import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const PlayersPositions = ({ onPlayerPos }) => {
  const [selectedPos, setSelectedPos] = useState(null);

  const position = [
    "GK",
    "RB",
    "RWB",
    "LB",
    "LWB",
    "CB",
    "CDM",
    "CM",
    "CAM",
    "LM",
    "LW",
    "RM",
    "RW",
    "CF",
    "ST",
  ];

  const positionHandler = (pos) => {
    onPlayerPos(pos);
    console.log(pos);
    setSelectedPos(pos);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {position.map((pos, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => positionHandler(pos)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#e0e0e0" : "transparent",
              },
              styles.touchableOpacity,
            ]}
          >
            <Text
              style={[styles.text, selectedPos === pos && styles.selectedText]}
            >
              {pos}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    fontSize: 22,
    marginLeft: 11,
  },
  selectedText: {
    fontWeight: "bold",
    color: "blue",
  },
  touchableOpacity: {
    padding: 10,
    borderRadius: 8,
  },
});

export default PlayersPositions;

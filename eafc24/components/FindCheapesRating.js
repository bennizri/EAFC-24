import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { findCheapestPlayerByRating } from "../http/http";

const FindCheapestRating = ({ onDataFetched }) => {
  const [pressedRating, setPressedRating] = useState(null);

  const pressHandler = async (pressedText) => {
    try {
      const data = await findCheapestPlayerByRating(pressedText);
      console.log("API Response:", data);
      onDataFetched(data);
    } catch (error) {
      console.error("Error in pressHandler:", error);
    }
  };

  const createPressHandler = (value) => async () => {
    if (pressedRating === value) {
      setPressedRating(null);
    } else {
      setPressedRating(value);
      pressHandler(value);
    }
  };

  return (
    <View>
      <Text style={styles.findPlayerText}>Find Players By Rating</Text>
      <ScrollView>
        <View style={styles.root}>
          {[81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91].map((value) => (
            <TouchableOpacity
              key={value.toString()}
              onPress={createPressHandler(value)}
              style={[
                styles.touchableOpacity,
                {
                  backgroundColor:
                    pressedRating === value ? "#e0e0e0" : "transparent",
                },
              ]}
            >
              <Text style={styles.textSize}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSize: {
    fontSize: 16, // Set your desired font size here
  },
  findPlayerText: {
    fontSize: 20,
    textAlign: "center",
  },
  touchableOpacity: {
    padding: 10,
    borderRadius: 8,
  },
});

export default FindCheapestRating;

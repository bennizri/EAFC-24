import React, { useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import Button from "./Button";
import { findPlayerByName } from "../http/http";
import FindCheapesRating from "./FindCheapesRating";
import FilterPlayers from "./FilterPlayers";

const SearchPlayer = ({ onDataFetched, setIsFetching }) => {
  const [searchPlayer, setSearchPlayer] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const response = await findPlayerByName(searchPlayer);
      if (response.length === 0) {
        Alert.alert("PlayerSearch", "Can't find Player please search again.");
        setSearchPlayer("");
        return;
      }
      onDataFetched(response);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearchSubmit = () => {
    if (searchPlayer.length === 0) {
      Alert.alert("PlayerSerach", "You must enter a name");
      return;
    }
    console.log("Search submitted:", searchPlayer);
    fetchData();
  };

  return (
    <>
      <TextInput
        style={styles.textInput}
        value={searchPlayer}
        onChangeText={(newText) => setSearchPlayer(newText)}
      />
      {showSearch && <FilterPlayers onDataFetched={onDataFetched} />}

      <Button
        onPress={() => setShowSearch(!showSearch)}
        children="Press For More Filter Options"
      />
      <Button onPress={handleSearchSubmit} children="Search Players By Name" />

      <FindCheapesRating onDataFetched={onDataFetched} />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: "black",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default SearchPlayer;

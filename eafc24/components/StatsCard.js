import { View, Text, StyleSheet } from "react-native";

const StatsCard = ({ name, data }) => {
  const getColorByRange = (value) => {
    if (value >= 0 && value <= 50) {
      return styles.redText;
    } else if (value > 50 && value <= 69) {
      return styles.yellowText;
    } else if (value > 69 && value <= 99) {
      return styles.greenText;
    } else {
      return styles.defaultText; // Default color or any other style you want
    }
  };

  const renderObjectProperties = () => {
    return Object.entries(data).map(([key, value]) => (
      <View key={key}>
        <Text
          style={[styles.text, getColorByRange(value)]}
        >{`${key}: ${value}`}</Text>
      </View>
    ));
  };

  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      {data && renderObjectProperties()}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
  redText: {
    color: "#b22222",
  },
  yellowText: {
    color: "#ffa500",
  },
  greenText: {
    color: "green",
  },
  title: {
    fontSize: 22,
    color: "#fffaf0",
  },
});

export default StatsCard;

import { View, Text, StyleSheet } from "react-native";

const PlayerStats = ({ playerDeatail }) => {
  return (
    <View style={styles.playerDeatail}>
      <View style={styles.stats}>
        <Text style={styles.statsText}>pac</Text>
        <Text style={styles.playerStats}>{playerDeatail[0].pace}</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsText}>sho</Text>
        <Text style={styles.playerStats}>{playerDeatail[0].shooting}</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsText}>pas</Text>
        <Text style={styles.playerStats}>{playerDeatail[0].passing}</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsText}>dri</Text>
        <Text style={styles.playerStats}>{playerDeatail[0].dribbling}</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsText}>def</Text>
        <Text style={styles.playerStats}>{playerDeatail[0].defending}</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsText}>phy</Text>
        <Text style={styles.playerStats}>{playerDeatail[0].physic}</Text>
      </View>
    </View>
  );
};
export default PlayerStats;
const styles = StyleSheet.create({
  playerDeatail: {
    flexDirection: "row",
  },
  stats: {
    marginLeft: 2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsText: {
    marginRight: 8,
    fontSize: 15,
  },
  playerStats: {
    marginRight: 8,
    fontSize: 14,
  },
});

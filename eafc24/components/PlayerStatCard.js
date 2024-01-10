import { ScrollView, StyleSheet, View } from "react-native";
import StatsCard from "./StatsCard";
const PlayerStatCard = ({ playerDeatail }) => {
  const pac = {
    sprintSpeed: playerDeatail[0].movement_sprint_speed,
    acceleration: playerDeatail[0].movement_acceleration,
  };

  const sho = {
    positioning: playerDeatail[0].mentality_positioning,
    finishing: playerDeatail[0].attacking_finishing,
    shotPower: playerDeatail[0].power_shot_power,
    longShots: playerDeatail[0].power_long_shots,
    volleys: playerDeatail[0].attacking_volleys,
    penalties: playerDeatail[0].mentality_penalties,
  };

  const pas = {
    vision: playerDeatail[0].mentality_vision,
    crossing: playerDeatail[0].attacking_crossing,
    fkAccuracy: playerDeatail[0].skill_fk_accuracy,
    shortPassing: playerDeatail[0].attacking_short_passing,
    longPassing: playerDeatail[0].skill_long_passing,
    curve: playerDeatail[0].skill_curve,
  };
  const dri = {
    agility: playerDeatail[0].movement_agility,
    balance: playerDeatail[0].movement_balance,
    reactions: playerDeatail[0].movement_reactions,
    ballControl: playerDeatail[0].skill_ball_control,
    dribbling: playerDeatail[0].dribbling,
    composure: playerDeatail[0].mentality_composure,
  };
  const def = {
    interceptions: playerDeatail[0].mentality_interceptions,
    headingAccuracy: playerDeatail[0].attacking_heading_accuracy,
    defendingwareness: playerDeatail[0].defending_marking_awareness,
    standingTackle: playerDeatail[0].defending_standing_tackle,
    slidingTackle: playerDeatail[0].defending_sliding_tackle,
  };
  const phy = {
    jumping: playerDeatail[0].power_jumping,
    stamina: playerDeatail[0].power_stamina,
    strength: playerDeatail[0].power_strength,
    aggression: playerDeatail[0].mentality_aggression,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <StatsCard name="PACE" data={pac} />
        <StatsCard name="SHOOTING" data={sho} />
      </View>
      <View style={styles.innerContainer}>
        <StatsCard name="PASSING" data={pas} />
        <StatsCard name="DRIBBILING" data={dri} />
      </View>
      <View style={styles.innerContainer}>
        <StatsCard name="DEFENDING" data={def} />
        <StatsCard name="PHYSICALITY" data={phy} />
      </View>
    </ScrollView>
  );
};
export default PlayerStatCard;
const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
});

// 0-50 red, 50-69 yellow, 70-99 green

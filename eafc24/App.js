import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PlayersScreen from "./screens/PlayesScreen";
import PlayerDeatailsScreen from "./screens/PlayerDeatailsScreen";
import LoginScreen from "./screens/LoginScreen";
import { onAuthStateChanged } from "firebase/auth";
import ProfileScreen from "./screens/ProfileScreen";
import { FIREBASE_AUTH } from "../eafc24/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabNavigator = ({ isUserLogin }) => {
  console.log(isUserLogin);
  const navigation = useNavigation();
  const navigationHandler = (navigationScreen) => {
    navigation.navigate(navigationScreen);
  };

  const navigateToPlayersScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "PlayersScreen" }],
    });
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#123132",
        },
        tabBarLabelStyle: {
          color: "#696969",
        },
        tabBarStyle: {
          backgroundColor: "#123132",
        },
        headerRight: ({ color }) =>
          isUserLogin && (
            <Ionicons
              name="filter-outline"
              size={24}
              color={color}
              style={{ marginRight: 10 }}
              onPress={() => navigateToPlayersScreen()}
            />
          ),
        headerLeft: ({ color }) =>
          isUserLogin && (
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={color}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate("ProfileScreen")}
            />
          ),
      }}
    >
      <Tab.Screen
        name="EAFC24"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ color, size }) =>
            isUserLogin && (
              <Ionicons
                name="home"
                color="#696969"
                size={size}
                onPress={() => navigationHandler("HomeScreen")}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const [user, setUser] = useState(false);
  AsyncStorage.getItem("userId").then((storedUser) => {
    setUser(!!JSON.parse(storedUser));
  });
  return (
    <Stack.Navigator initialRouteName={user ? "HomeScreen" : "LoginScreen"}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlayersScreen"
        component={PlayersScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlayerDeatailsScreen"
        component={PlayerDeatailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log(user.uid);
        AsyncStorage.setItem("userId", JSON.stringify(user.uid));
        setIsLogedIn(true);
      } else {
        AsyncStorage.removeItem("userId");
        setIsLogedIn(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <TabNavigator isUserLogin={isLogedIn} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#123132",
    flex: 1,
  },
});

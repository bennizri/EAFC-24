import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import Button from "../components/Button";
import ImagePicker from "../components/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userId");
        const uid = storedUser
          ? JSON.parse(storedUser)
          : FIREBASE_AUTH.currentUser?.uid;

        const userDocRef = doc(FIREBASE_DB, "users", uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
          setImageUri(userDocSnapshot.data().profileImage);
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const takeImageHandler = async (imageUri) => {
    setImageUri(imageUri);
  };

  const updateProfile = async () => {
    try {
      const uid = FIREBASE_AUTH.currentUser?.uid || userData?.uid;
      const userDocRef = doc(FIREBASE_DB, "users", uid);

      await updateDoc(userDocRef, {
        name: newName,
        profileImage: imageUri,
      });

      const updatedUserDocSnapshot = await getDoc(userDocRef);
      setNewName("");
      alert("Profile Saved!");
      setUserData(updatedUserDocSnapshot.data());
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  const signOutHandler = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      await AsyncStorage.removeItem("userId");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <ImagePicker
              onTakeImage={takeImageHandler}
              initialProfileImage={imageUri}
            />
            {userData ? (
              <>
                <View style={styles.fields}>
                  <Text style={styles.text}>Name: {userData.name}</Text>
                  <Text style={styles.text}>Email: {userData.email}</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new name"
                  value={newName}
                  onChangeText={(text) => setNewName(text)}
                />
                <Button children="Update Profile" onPress={updateProfile} />
                <Button children="signOut" onPress={signOutHandler} />
              </>
            ) : (
              <Text style={styles.text}>No user data found.</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#2f4f4f",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  fields: {
    justifyContent: "space-between",
    marginTop: 13,
  },
});

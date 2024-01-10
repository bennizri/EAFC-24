import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import Button from "../components/Button";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoding] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoding(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("HomeScreen");
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("SignIn failed", error.message);
    } finally {
      setLoding(false);
    }
  };

  const signUp = async () => {
    setLoding(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = response.user.uid;
      const userDocRef = doc(FIREBASE_DB, "users", uid);
      await setDoc(userDocRef, {
        name: "ben",
        email: email,
        profileImage: "",
      });
      navigation.navigate("HomeScreen");
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("SignUp failed", error.message);
    } finally {
      setLoding(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#000ff" />
        ) : (
          <>
            <Button children="Login" onPress={() => signIn()} />
            <Button children="Register" onPress={() => signUp()} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});

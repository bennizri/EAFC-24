import React, { useEffect, useState } from "react";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Alert, View, Image, Text, StyleSheet } from "react-native";
import { Colors } from "./constants/colors";
import OutlinedButton from "./OutlinedButton.js";

const ImagePicker = ({ onTakeImage, initialProfileImage }) => {
  const [pickedImage, setPickedImage] = useState(initialProfileImage || "");
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use the app."
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets?.[0]?.uri || "");
    onTakeImage(image.assets?.[0]?.uri || "");
  };

  const pickImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets?.[0]?.uri || "");
    onTakeImage(image.assets?.[0]?.uri || "");
  };

  let imagePreview = (
    <Text style={styles.imagePreviewText}>No image taken yet.</Text>
  );

  if (pickedImage) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{
          uri: pickedImage,
        }}
      />
    );
  }

  return (
    <View>
      {imagePreview}
      <View style={styles.buttonContainer}>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>
          Take Image
        </OutlinedButton>
        <OutlinedButton icon="image" onPress={pickImageHandler}>
          Choose from Gallery
        </OutlinedButton>
      </View>
    </View>
  );
};

export default ImagePicker;
const styles = StyleSheet.create({
  imagePreviewText: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
});

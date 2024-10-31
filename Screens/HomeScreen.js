// screens/HomeScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

export default function HomeScreen({ navigation }) {
  const [city, setCity] = useState("");

  const handleNavigate = () => {
    if (city === "") {
      getCurrentLocationWeather();
    } else {
      navigation.navigate("Weather", { city });
    }
  };

  const getCurrentLocationWeather = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Location permission is required to get weather for your area."
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log(latitude, longitude);
    navigation.navigate("Weather", { latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={handleNavigate} />
      <Button
        title="Use Current Location"
        onPress={getCurrentLocationWeather}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    borderRadius: 5,
  },
});

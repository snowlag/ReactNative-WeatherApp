// screens/WeatherScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const API_KEY = "YOUR_KEY"; //replace with your key

export default function WeatherScreen({ route }) {
  const { city, latitude, longitude } = route.params || {};
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      console.log(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`
      );
      try {
        const endpoint = city
          ? `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
          : `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;

        const res = await axios.get(endpoint);
        setWeather(res.data.current);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, [city, latitude, longitude]);

  return (
    <View style={styles.container}>
      {weather ? (
        <>
          <Text>Temperature: {weather.temp_c}°C</Text>
          <Text>Condition: {weather.condition.text}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

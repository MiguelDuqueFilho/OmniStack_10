import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../../src/services/api";

function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrenRegion] = useState(null);
  // console.log(currentRegion);

  useEffect(() => {
    async function loadInitionPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;

        setCurrenRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        });
      }
    }
    loadInitionPosition();
  }, []);

  async function loadDevs() {
    //  const { latitude, longitude } = currentRegion

    const response = await api.get("/users/18");
    console.log(response.data);
    setDevs(response.data);
  }

  function handleRegionChange(region) {
    // console.log('Change Region: ' + region),
    setCurrenRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChange}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {devs.map(dev => (
          <Marker
            key={dev.id}
            coordinate={{
              latitude: -23.638457135032866,
              longitude: -45.421610368239094
            }}
          >
            <Image
              source={{
                uri:
                  "https://avatars1.githubusercontent.com/u/14915795?s=460&v=4"
              }}
              style={styles.avatar}
            />
            <Callout
              onPress={() => {
                navigation.navigate("Profile", {
                  github_username: "MiguelDuqueFilho"
                });
              }}
            >
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.UserName}</Text>
                <Text style={styles.devBio}>{dev.UserEmail}</Text>
                <Text style={styles.devTechs}>
                  JavaScript, ReactJS, React Native, Node.js
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Busca devs por Techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  callout: {
    width: 268
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: {
    color: "#666",
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#fff"
  },
  searchForm: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#8e4dff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  }
});
export default Main;

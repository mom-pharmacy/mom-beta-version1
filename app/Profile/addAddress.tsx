import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import MapView, { Marker, MapPressEvent, PoiClickEvent, Region } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

type LocationType = {
  latitude: number;
  longitude: number;
};

const AddAddress = () => {

  const [selectedLocation, setSelectedLocation] = useState<LocationType>({
    latitude: 17.385044,
    longitude: 78.486671,
  });
  const [streetName, setStreetName] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("Fetching current location...");
  const [region, setRegion] = useState<Region>({
    latitude: 17.385044,
    longitude: 78.486671,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setSelectedAddress("Permission to access location was denied.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const currentLocation = { latitude, longitude };
      setSelectedLocation(currentLocation);
      setRegion({ ...region, ...currentLocation });

      await updateAddress(latitude, longitude);
    })();
  }, []);

  const updateAddress = async (latitude: number, longitude: number) => {
    try {
      const res = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (res.length > 0) {
        const loc = res[0];
        const street = loc.street || loc.name || "";
        const addressText = `${loc.name || ""}, ${loc.street || ""}, ${loc.city || ""}, ${loc.region || ""}, ${loc.country || ""}`;
        setStreetName(street)
        setSelectedAddress(addressText);
      } else {
        setSelectedAddress("Address not found");
      }
    } catch (error) {
      console.error("Reverse geocode error:", error);
      setSelectedAddress("Error fetching address");
    }
  };

  const handleMapPress = async (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    await updateAddress(coordinate.latitude, coordinate.longitude);
  };

  const handlePoiClick = async (event: PoiClickEvent) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    await updateAddress(coordinate.latitude, coordinate.longitude);
  };

  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row',gap:15,padding:15,}}>
            <TouchableHighlight onPress={()=>router.back()}>
        <AntDesign name="arrowleft" size={26} color="black" />
        </TouchableHighlight>
            <Text style={{fontSize:15,fontWeight:'bold'}}>Select Address</Text>
        </View>
      <MapView
        style={styles.map}
        region={region}
        onPress={handleMapPress}
        onPoiClick={handlePoiClick}
        showsUserLocation
      >
        <Marker coordinate={selectedLocation} />
      </MapView>

      <View style={styles.addressContainer}>
        <Text style={styles.label}>{streetName}</Text>
        <Text style={styles.address}>{selectedAddress}</Text>
      </View>
      <View style={{alignItems:'center'}}>
      <TouchableHighlight style={{height:50,width:350, backgroundColor:"#00a99d",borderRadius:10,margin:10,alignItems:'center'}} onPress={()=>router.push('./confirmAddress')}>
        <Text style={{color:"white",fontSize:18,padding:10}}>Save Address</Text>
      </TouchableHighlight>
      </View>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  map: {
    flex: 1,
  },
  addressContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 22,
    
  },
  address: {
    fontSize: 15,
    color: "#333",
  },
});

// src/components/MapSelector.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapSelectorProps {
  initialLocation: { latitude: number; longitude: number };
  onLocationChange: (location: { latitude: number; longitude: number }) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ initialLocation, onLocationChange }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const handleDragEnd = (e: any) => {
    const newLoc = e.nativeEvent.coordinate;
    setSelectedLocation(newLoc);
    onLocationChange(newLoc);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...initialLocation,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={selectedLocation}
          draggable
          onDragEnd={handleDragEnd}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },
});

export default MapSelector;

import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function addAddress() {
  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill} 
      provider={PROVIDER_GOOGLE} showsUserLocation showsMyLocationButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

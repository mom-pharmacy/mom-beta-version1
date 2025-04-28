import React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router"; // Use this to get the params passed from the previous screen

export default function OpenScreen() {
  const { id, name, price, image,description,Expirydate } = useLocalSearchParams(); // Access the passed data

  return (
    <ScrollView style={{ margin: 20 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ fontSize: 18, color: "blue" }}>← Back</Text>
      </TouchableOpacity>


      <Image
        source={{ uri: `http://localhost:3000${image}` }} // Correct concatenation for the image URL
        style={{ width: "50%", height: 300, marginTop: 20 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>{name}</Text>
      
      <Text style={{ fontSize: 22, color: "green", marginTop: 20 }}>₹{price}</Text>
      <Text style={{ fontSize: 18, color: "gray", marginTop: 10 }}>{description}</Text>
      <Text style={{ fontSize: 18, color: "gray", marginTop: 10 }}>{Expirydate}</Text>
    </ScrollView>
  );
}

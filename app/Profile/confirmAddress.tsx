import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, TouchableHighlight } from 'react-native';
import * as Contacts from 'expo-contacts';
import { AntDesign } from '@expo/vector-icons';

export default function AddressForm() {
  const [contactName, setContactName] = useState("");
  const [contact, setContact] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [buildingBlockNumber, setBuildingBlockNumber] = useState("");

  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");

  // Pick contact from phone
  const pickContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const pickedContact = await Contacts.presentContactPickerAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (pickedContact) {
        setContactName(pickedContact.name || '');
        setContact(pickedContact.phoneNumbers?.[0]?.number || '');
      }
    } else {
      console.log('Permission denied');
    }
  };

  // Handle selected address text
  const handleSelectedAddress = (addressString) => {
    const parts = addressString.split(",").map(part => part.trim());

    if (parts.length >= 5) {
      setStreetName(parts[2] || ""); 
      setCity(parts[3] || "");
      setStateName(parts[4].split(" ")[0] || "");
      setPincode(parts[4].split(" ")[1] || "");
    }
  };

  // Save address to server
  const handleLocation = async () => {
    try {
      console.log("Starting API call...");
  
      const url = "http://192.168.1.8:3000/address/add-address"; ; // <-- Correct this!!
  
      const bodyData = {
        userid: 12345,
        state: stateName,
        city: city,
        street: streetName,
        pincode: parseInt(pincode),
        houseNo: houseNumber,
        buildingName: buildingBlockNumber,
        name: contactName,
        contact: contact,
      };
  
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
  
      console.log("Response received");
  
      const result = await response.json();
      console.log(result);
  
      if (result) {
        console.warn("Address Added Successfully!");
      }
    } catch (error) {
      console.error("Error in posting address:", error);
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
      
      {/* House Number */}
      <TextInput
        placeholder="House No."
        style={styles.input}
        value={houseNumber}
        onChangeText={setHouseNumber}
      />

      {/* Building & Block Number */}
      <TextInput
        placeholder="Building & Block No."
        style={styles.input}
        value={buildingBlockNumber}
        onChangeText={setBuildingBlockNumber}
      />

      {/* Receiver Name with Contact Picker */}
      <View style={{
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        flexDirection: 'row',
      }}>
        <TextInput
          placeholder="Receiver Name"
          value={contactName}
          editable={false}
          style={{ flex: 1 }}
        />
        <TouchableHighlight onPress={pickContact} style={{ padding: 10 }}>
          <AntDesign name="contacts" size={24} color="black" />
        </TouchableHighlight>
      </View>

      {/* Receiver Contact */}
      <TextInput
        placeholder="Receiver Number"
        value={contact}
        style={styles.input}
        editable={false}
      />

      {/* Street Name (auto-filled) */}
      <TextInput
        placeholder="Street Name"
        value={streetName}
        style={styles.input}
        editable={false}
      />

      {/* City (auto-filled) */}
      <TextInput
        placeholder="City"
        value={city}
        style={styles.input}
        editable={false}
      />

      {/* State (auto-filled) */}
      <TextInput
        placeholder="State"
        value={stateName}
        style={styles.input}
        editable={false}
      />

      {/* Pincode (auto-filled) */}
      <TextInput
        placeholder="Pincode"
        value={pincode}
        style={styles.input}
        editable={false}
      />

      {/* Save Address Button */}
      <TouchableOpacity style={styles.button} onPress={handleLocation}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>

      {/* TEST BUTTON TO FILL ADDRESS MANUALLY FOR NOW */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 10, backgroundColor: "#2196F3" }]}
        onPress={() => handleSelectedAddress("5th Floor, Block A, Gachibowli, Hyderabad, Telangana 500032, India")}
      >
        <Text style={styles.buttonText}>Auto-Fill Address (Demo)</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = {
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

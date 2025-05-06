import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TermsScreen() {
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = () => {
    if (!accepted) {
      Alert.alert('Please accept the terms and conditions.');
    } else {
      Alert.alert('Thank you for accepting the terms!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.description}>
        By using our service, you agree to comply with the following terms and conditions:
      </Text>
      <Text style={styles.description}>
        1. You must provide accurate information for delivery.
      </Text>
      <Text style={styles.description}>
        2. Payment must be completed before processing the delivery.
      </Text>
      <Text style={styles.description}>
        3. Delivery time is an estimate and may vary depending on factors.
      </Text>
      <Text style={styles.description}>
        4. You must notify us of any incorrect deliveries.
      </Text>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAccepted(!accepted)}
      >
        <Ionicons
          name={accepted ? 'checkbox' : 'square-outline'}
          size={26}
          color="#00856F"
        />
        <Text style={styles.checkboxLabel}>I accept the Terms and Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0FAF8',
    flexGrow: 1,
  },
  title: {
    fontFamily: "DM Sans",
    fontSize: 26,
    fontWeight: '700',
    color: '#00856F',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontFamily: "DM Sans",
    fontSize: 16,
    color: '#444',
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  checkboxLabel: {
    fontFamily: "DM Sans",
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
  button: {
    backgroundColor: '#00856F',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: "DM Sans",
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

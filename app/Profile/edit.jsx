import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const handleSave = () => {
    const emailRegex = /^[\w-.]+@gmail\.com$/;
    const mobileRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z]+$/;
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;

    const currentYear = new Date().getFullYear();

    if (
      !firstName ||
      !lastName ||
      !address ||
      !age ||
      !mobile ||
      !email ||
      !dob ||
      !bloodGroup
    ) {
      Alert.alert('Missing Details', 'Please fill out all fields before saving.');
      return;
    }

    if (!nameRegex.test(firstName)) {
      Alert.alert('Invalid First Name', 'First name should contain only alphabets.');
      return;
    }

    if (!nameRegex.test(lastName)) {
      Alert.alert('Invalid Last Name', 'Last name should contain only alphabets.');
      return;
    }

    if (!dobRegex.test(dob)) {
      Alert.alert('Invalid DOB Format', 'Date of Birth should be in DD/MM/YYYY format.');
      return;
    }

    const [day, month, year] = dob.split('/').map(Number);
    if (year > currentYear) {
      Alert.alert('Invalid Year', 'Year in DOB cannot be in the future.');
      return;
    }

    if (age < 0 || age > 100) {

      Alert.alert('Invalid Age', 'Age must be between 0 and 100.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Email must be a valid @gmail.com address.');
      return;
    }

    if (!mobileRegex.test(mobile)) {
      Alert.alert('Invalid Mobile', 'Mobile number must be exactly 10 digits.');
      return;
    }

    Alert.alert('Success', 'Your profile has been updated!');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Update Profile</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Your address"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Your age"
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={(text) => {
            if (text.length <= 10) setMobile(text);
          }}
          placeholder="10-digit mobile number"
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          placeholder="DD/MM/YYYY"
          keyboardType="numbers-and-punctuation"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Blood Group</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={bloodGroup}
            onValueChange={(itemValue) => setBloodGroup(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Blood Group" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F4F4',
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#222',
  },
  label: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 6,
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  button: {
    backgroundColor: '#00A99D',
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HomeScreen;
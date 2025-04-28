import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { AuthContext } from '@/context/authContext';

export default function RegistrationScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!name || !email || !mobileNumber || !gender || !dob) {
      Alert.alert('Error', 'All fields are required');
      return false;
    }

    if (!nameRegex.test(name)) {
      Alert.alert('Invalid Name', 'Name should contain only letters and spaces');
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Enter a valid email');
      return false;
    }

    if (!mobileRegex.test(mobileNumber)) {
      Alert.alert('Invalid Mobile Number', 'Enter a valid 10-digit mobile number');
      return false;
    }

    if (!dobRegex.test(dob)) {
      Alert.alert('Invalid DOB', 'Use format YYYY-MM-DD');
      return false;
    }

    return true;
  };

  const handleCreateAccount = async () => {
    if (!validateInputs()) return;

    const newUser = {
      name,
      email: email.trim().toLowerCase(),
      mobileNumber: mobileNumber.trim(),
      gender,
      dob,
    };

    try {
      const existingUsersJSON = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

      const alreadyExists = existingUsers.some(
        (user) =>
          user.email.toLowerCase() === newUser.email ||
          user.mobileNumber === newUser.mobileNumber
      );

      if (alreadyExists) {
        Alert.alert('User already exists', 'An account with this email or mobile already exists.');
        return;
      }

      existingUsers.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(existingUsers));

      Alert.alert('Success', 'Account created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pagetext}>Register Now!</Text>

      <Image
        source={require('../assets/images/momlogo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.welcomeText}>Welcome to MOM Pharmacy</Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

    

      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Gender</Text>
      <View style={styles.radioContainer}>
        {['Male', 'Female', 'Other'].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setGender(option)}
            style={styles.radioOption}
          >
            <View style={[styles.radioCircle, gender === option && styles.selectedRadio]} />
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() =>logout() } style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#ffffff',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00bfa6',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#00bfa6',
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 8,
  },
  selectedRadio: {
    backgroundColor: '#00bfa6',
  },
  pagetext:{

  }
});
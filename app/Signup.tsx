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
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { AuthContext } from '@/context/authContext';

export default function RegistrationScreen() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [LoadingReg , setLoadingReg] = useState(false)


  const navigation = useNavigation();
  const {logout , getUserDetails} = useContext(AuthContext);

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!name || !gender || !dob) {
      Alert.alert('Error', 'All fields are required');
      return false;
    }

    if (!nameRegex.test(name)) {
      Alert.alert('Invalid Name', 'Name should contain only letters and spaces');
      return false;
    }


    if (!dobRegex.test(dob)) {
      Alert.alert('Invalid DOB', 'Use format YYYY-MM-DD');
      return false;
    }

    return true;
  };

  const refreshUser = async () => {
    console.log("this is refreshing..")
    await getUserDetails();
  };

  const postData = async () => {
    try {
      const token = await AsyncStorage.getItem("user")
      const parsedToken = JSON.parse(token)
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",  // 🛠️ Important
          "Authorization": `Bearer ${parsedToken}`
        },
        body: JSON.stringify({
          name,
          dateOfBirth: dob,
          gender
        })
      };
      setLoadingReg(true);
      const response = await fetch("https://mom-beta-server.onrender.com/api/user/register", options);
      if (response.ok) {
        console.log("user successfully registered");
        await refreshUser(); 
        router.replace("/Home/home");
      } else {
        const errorData = await response.text();
        console.error("Server error response:", errorData);
        Alert.alert("Registration Error", "Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error("this is from fetch signup:", e);
      Alert.alert("Network Error", "Failed to register. Check your internet or server.");
    } finally {
      setLoadingReg(false);
    }
  };

  const handleCreateAccount = async () => {
    if (!validateInputs()) return;
    postData()

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

      <TouchableOpacity onPress={handleCreateAccount} style={styles.button} disabled={LoadingReg}>
       {LoadingReg?<ActivityIndicator/> : <Text style={styles.buttonText}>Create Account</Text>}
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
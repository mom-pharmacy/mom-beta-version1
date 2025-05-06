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
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { AuthContext } from '@/context/authContext';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegistrationScreen() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [LoadingReg, setLoadingReg] = useState(false)

  const { logout, postData } = useContext(AuthContext);

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

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      setDob(`${year}-${month}-${day}`);
    }
  };


  const handleCreateAccount = async () => {
    if (!validateInputs()) return;
    postData(name, dob, gender)
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

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>

        <Text style={{ color: dob ? '#000' : '#aaa' }}>

          {dob || 'Select Date of Birth (DD-MM-YYYY)'}

        </Text>

      </TouchableOpacity>



      {showDatePicker && (

        <DateTimePicker

          value={dob ? new Date(dob) : new Date()}

          mode="date"

          display={Platform.OS === 'ios' ? 'spinner' : 'default'}

          maximumDate={new Date()}

          onChange={onChangeDate}

        />

      )}

      <TouchableOpacity onPress={handleCreateAccount} style={styles.button} disabled={LoadingReg}>
        {LoadingReg ? <ActivityIndicator /> : <Text style={styles.buttonText}>Create Account</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => logout()} style={styles.backButton}>
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
    fontWeight:'bold',

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
  pagetext: {

  }
});
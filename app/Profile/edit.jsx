import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';



const HomeScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [gender, setGender] = useState('');
  const [profile , setProfile] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    const emailRegex = /^[\w-.]+@gmail\.com$/;
    const mobileRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z]+$/;
    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;

    const currentYear = new Date().getFullYear();

    // const getUserProfile = async()=>{
    //   const storedToken = await AsyncStorage.getItem("user");
    //   const parsedToken = JSON.parse(storedToken);
    //   try{
    //     const options = {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${parsedToken}`
    //       },
    //     }
    //     const reponse = await fetch("https://mom-beta-server.onrender.com/api/user/user-details", options)
    //     if(reponse.ok){
    //       const data =  reponse.json()
    //       setProfile(data.userDetails)
    //     }else{
    //       Alert.alert("Please check your Internet Connetion!!!")
    //     }
    //   }catch(err){
    //     console.log(err)
    //     Alert.alert("Try again later")
    //   }
    // }

    useEffect(()=>{
      
    } , [])

    if (
      !lastName ||
      !age
    ) {
      Alert.alert('Missing Details', 'Please fill out all fields before saving.');
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

  const updateUserData = async () => {
    const storedToken = await AsyncStorage.getItem("user");
    const parsedToken = JSON.parse(storedToken);
    if (!parsedToken) {
      router.push("../Login/Login")
      return;
    }
    try {
      const response = await fetch("https://mom-beta-server.onrender.com/api/user/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${parsedToken}`
        },
        body: JSON.stringify({
          name: lastName,
          dateOfBirth: dob,
          gender: gender
        })
      });
      if (response.ok) {
        Alert.alert("Succesfully updated details")
      } else {
        Alert.alert("Please check your Internet Connection!!!")
      }
    } catch (e) {
      console.log(e)
      Alert.alert("Somthing went wrong")
    }

  }

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      setDob(`${year}-${month}-${day}`);
    }
  };

  const handleUpdateDetails = () => {
    if (!lastName || !dob || !gender || !email) {
      Alert.alert("Could find the values")
    }
    updateUserData()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Update Profile</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
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

        <Text style={styles.label}>Gender</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleUpdateDetails}>
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
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00A99D',
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
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
});

export default HomeScreen;
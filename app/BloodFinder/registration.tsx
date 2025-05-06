import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  LayoutAnimation,
  UIManager,
  Pressable,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router } from 'expo-router';

const BASE_URL = 'https://mom-beta-server.onrender.com/api/donar';

const CustomCheckbox = ({ value, onValueChange, label }) => (
  <View style={styles.checkboxContainer}>
    <Checkbox value={value} onValueChange={onValueChange} color={value ? '#00A99D' : undefined} />
    <Text style={styles.checkboxText}>{label}</Text>
  </View>
);

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.faqQuestion}>{question}</Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.faqAnswer}>{answer}</Text>}
    </View>
  );
};

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [availability, setAvailability] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState({});

  const toggleDropdown = (key) => {
    setDropdownVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const countries = ['India'];
  const states = { India: ['Telangana', 'Andhra Pradesh'] };
  const districts = { Telangana: ['Ranga Reddy', 'Hyderabad'] };
  const cities = { 'Ranga Reddy': ['Kukatpally', 'Madhapur'], Hyderabad: ['Secunderabad', 'Gachibowli'] };

  const renderDropdown = (label = '', value = '', setValue, options = [], key) => (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown(key)}>
        <Text>{value ? value : `Select ${label}`}</Text>
      </TouchableOpacity>
      {dropdownVisible[key] && (
        <View style={styles.dropdownList}>
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setValue(item);
                toggleDropdown(key);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const handleSubmit = async () => {
    console.log('Register button pressed');

    const dataToSend = {
      name,
      bloodGroup,
      dob: dob.toISOString().split('T')[0],
      phone: mobileNumber,
      email,
      country,
      state,
      district,
      city,
      pincode,
      availability,
    };

    console.log('Data being sent:', dataToSend);

    try {
      const response = await axios.post(`${ BASE_URL } / register`, dataToSend);
      console.log('Response:', response);

      if (response.status === 201) {
        Alert.alert('Success', 'Registration successful!');
        router.push("/Home/home")
      } else {
        const data = response.data;
        console.error(data);
        Alert.alert('Error', data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Axios Error:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <StatusBar style="light" />
          <View style={styles.logoContainer}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.heading}>Register Now to Donate!</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput placeholder="Your Name" value={name} onChangeText={setName} style={styles.input} />

            {renderDropdown('Blood Group', bloodGroup, setBloodGroup, bloodGroups, 'bloodGroup')}

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dropdown}>
              <Text>{dob.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDob(selectedDate);
                }}
              />
            )}

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={(text) => setMobileNumber(text.replace(/[^0-9]/g, ''))}
              maxLength={10}
              style={styles.input}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />

            {renderDropdown('Country', country, setCountry, countries, 'country')}
            {country && renderDropdown('State', state, setState, states[country], 'state')}
            {state && renderDropdown('District', district, setDistrict, districts[state], 'district')}
            {district && renderDropdown('City', city, setCity, cities[district], 'city')}

            <Text style={styles.label}>Pincode</Text>
            <TextInput
              placeholder="Pincode"
              keyboardType="numeric"
              value={pincode}
              onChangeText={setPincode}
              maxLength={6}
              style={styles.input}
            />

            <Text style={styles.label}>Available to Donate?</Text>
            <View style={styles.availabilityContainer}>
              <TouchableOpacity style={styles.checkboxButton} onPress={() => setAvailability(true)}>
                <Checkbox value={availability === true} onValueChange={() => setAvailability(true)} color={availability ? '#00A99D' : undefined} />
                <Text style={styles.availabilityText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.checkboxButton, { marginLeft: 30 }]} onPress={() => setAvailability(false)}>
                <Checkbox value={availability === false} onValueChange={() => setAvailability(false)} color={availability === false ? '#00A99D' : undefined} />
                <Text style={styles.availabilityText}>No</Text>
              </TouchableOpacity>
            </View>

            <CustomCheckbox
              value={authorized}
              onValueChange={setAuthorized}
              label="I confirm I am above 18 and authorize the use of my data."
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <FAQItem question="Who can donate?" answer="Healthy individuals between 18-65 years and above 50kg." />
            <FAQItem question="How often can I donate?" answer="Once every 3 months if healthy." />
          </View>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:
  {
    padding: 20
  },
  logoContainer:
  {
    backgroundColor: '#00A99D',
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  heading: { color: 'white', fontSize: 24, marginLeft: 10 },
  formContainer: { marginTop: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderColor: '#ddd', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 15 },
  dropdown: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 15 },
  dropdownList: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 5 },
  dropdownItem: { padding: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  checkboxText: { marginLeft: 10 },
  faqItem: { marginBottom: 10 },
  faqQuestion: { fontSize: 16, fontWeight: 'bold' },
  faqAnswer: { fontSize: 14, marginTop: 5 },
  availabilityContainer: { flexDirection: 'row', marginBottom: 20 },
  checkboxButton: { flexDirection: 'row', alignItems: 'center' },
  availabilityText: { marginLeft: 5 },
  button: { backgroundColor: '#00A99D', paddingVertical: 15, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 18 },
  sectionTitle: { fontSize: 18, marginBottom: 10, marginTop: 20 },
});
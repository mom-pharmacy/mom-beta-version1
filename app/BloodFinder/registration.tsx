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
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const CustomCheckbox = ({ value, onValueChange, label }) => (
  <View style={styles.checkboxContainer}>
    <Checkbox value={value} onValueChange={onValueChange} />
    <Text style={styles.checkboxText}>{label}</Text>
  </View>
);

export default function Registration() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [emergency, setEmergency] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  const [dropdownVisible, setDropdownVisible] = useState({});

  const toggleDropdown = (key) => {
    setDropdownVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const countries = ['India'];
  const states = { India: ['Telangana'] };
  const districts = { Telangana: ['Ranga Reddy'] };
  const cities = { 'Ranga Reddy': ['Hyderabad'] };

  const renderDropdown = (label, value, setValue, options, key) => (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleDropdown(key)}
      >
        <Text>{value || `Select ${label}`}</Text>
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

  const handleSubmit = () => {
    const isValid =
      bloodGroup &&
      dobDay &&
      dobMonth &&
      dobYear &&
      mobileNumber.trim().match(/^\d{10}$/) &&
      email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
      country &&
      state &&
      district &&
      city &&
      pincode.trim().match(/^\d{6}$/) &&
      authorized;

    if (!isValid) {
      Alert.alert('Missing', 'Please fill all fields.');
      return;
    }

    Alert.alert('Success', 'You have successfully registered!');
    router.replace('./donarDetails')
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <StatusBar style="light" />

          <View style={styles.logoContainer}>
            <Text style={styles.heading}>Register Now to Donate!</Text>
          </View>

          <View style={styles.formContainer}>
            {renderDropdown('Blood Group', bloodGroup, setBloodGroup, bloodGroups, 'bloodGroup')}

            <Text style={styles.label}>Date of Birth</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput
                placeholder="Year"
                keyboardType="numeric"
                value={dobYear}
                onChangeText={setDobYear}
                style={[styles.input, { flex: 1, marginRight: 5 }]}
              />
              <TextInput
                placeholder="Month"
                keyboardType="numeric"
                value={dobMonth}
                onChangeText={setDobMonth}
                style={[styles.input, { flex: 1, marginHorizontal: 5 }]}
              />
              <TextInput
                placeholder="Day"
                keyboardType="numeric"
                value={dobDay}
                onChangeText={setDobDay}
                style={[styles.input, { flex: 1, marginLeft: 5 }]}
              />
            </View>

            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
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

            {country && renderDropdown('State', state, setState, states[country] || [], 'state')}

            {state && renderDropdown('District', district, setDistrict, districts[state] || [], 'district')}

            {district && renderDropdown('City', city, setCity, cities[district] || [], 'city')}

            <Text style={styles.label}>Pincode</Text>
            <TextInput
              placeholder="Pincode"
              keyboardType="numeric"
              value={pincode}
              onChangeText={setPincode}
              style={styles.input}
            />

            <CustomCheckbox
              value={emergency}
              onValueChange={setEmergency}
              label="Available in case of Emergency"
            />

            <CustomCheckbox
              value={availability}
              onValueChange={setAvailability}
              label="Please confirm your availability to donate"
            />

            <CustomCheckbox
              value={authorized}
              onValueChange={setAuthorized}
              label="I authorize this app and state that I am above 18 years old. I agree to display my details, so that nearby could contact me."
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#888', marginTop: 10 }]}
            >
              <Text style={styles.buttonText}>BACK TO HOME</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 200,
  },
  logoContainer: {
    backgroundColor: '#00A99D',
    height: 150,
    width: '100%',
    borderBottomEndRadius: 100,
    borderBottomLeftRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  heading: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: -50,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#00A99D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
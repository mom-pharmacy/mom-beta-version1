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
  LayoutAnimation,
  UIManager,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

export default function Index() {
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
  const districts = { Telangana: ['Ranga Reddy'] };
  const cities = { 'Ranga Reddy': ['Hyderabad'] };

  const renderDropdown = (label, value, setValue, options, key) => (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown(key)}>
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
    if (!name.trim()) {
      return Alert.alert('Missing', 'Please enter your name.');
    }
    if (!/^[A-Za-z ]+$/.test(name.trim())) {
      return Alert.alert('Invalid', 'Name can only contain alphabets and spaces.');
    }
    if (!bloodGroup) return Alert.alert('Missing', 'Please select your blood group.');
    if (!mobileNumber.trim() || mobileNumber.length < 10)
      return Alert.alert('Invalid', 'Please enter a valid 10-digit mobile number.');
    if (!email.trim() || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return Alert.alert('Invalid', 'Please enter a valid email.');
    if (!country) return Alert.alert('Missing', 'Please select your country.');
    if (!state) return Alert.alert('Missing', 'Please select your state.');
    if (!district) return Alert.alert('Missing', 'Please select your district.');
    if (!city) return Alert.alert('Missing', 'Please select your city.');
    if (!pincode.trim().match(/^\d{6}$/))
      return Alert.alert('Invalid', 'Please enter a valid 6-digit pincode.');
    if (availability === null) return Alert.alert('Missing', 'Please select your availability.');
    if (!authorized)
      return Alert.alert('Missing', 'Please authorize and confirm you are above 18.');

    Alert.alert('Success', 'You have successfully registered!');
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
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => navigation.navigate('../Home/home')}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.heading}>Register Now to Donate!</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

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
              maxLength={10}
              onChangeText={(text) => setMobileNumber(text.replace(/[^0-9]/g, ''))}
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
              maxLength={6}
              onChangeText={setPincode}
              style={styles.input}
            />

            <Text style={styles.label}>I am Available to donate?</Text>
            <View style={styles.availabilityContainer}>
              <TouchableOpacity style={styles.checkboxButton} onPress={() => setAvailability(true)}>
                <Checkbox
                  value={availability === true}
                  onValueChange={() => setAvailability(true)}
                  color={availability === true ? '#00A99D' : undefined}
                />
                <Text style={styles.availabilityText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.checkboxButton, { marginLeft: 30 }]} onPress={() => setAvailability(false)}>
                <Checkbox
                  value={availability === false}
                  onValueChange={() => setAvailability(false)}
                  color={availability === false ? '#00A99D' : undefined}
                />
                <Text style={styles.availabilityText}>No</Text>
              </TouchableOpacity>
            </View>

            <CustomCheckbox
              value={authorized}
              onValueChange={setAuthorized}
              label="I authorize this app and state that I am above 18 years old. I agree to display my details, so that nearby could contact me."
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Frequently Asked Questions ?</Text>
            <FAQItem question="Who Can Donate?" answer="Any healthy individual above 18 years old and below 65, weighing more than 50 kg." />
            <FAQItem question="When to donate?" answer="You can donate every 3 months if you're healthy." />
            <FAQItem question="Which food should eat after donating blood?" answer="Eat iron-rich foods like leafy greens, meat, and drink lots of fluids." />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  logoContainer: {
    backgroundColor: '#00A99D',
    height: 150,
    width: '100%',
    borderBottomEndRadius: 80,
    borderBottomLeftRadius: 80,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -50,
  },
  heading: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 37,
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
    marginBottom: 20,
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
    color: 'black',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 10,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
  },
  faqAnswer: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});
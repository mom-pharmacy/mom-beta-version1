import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const EditProfile: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleSubmit = () => {
    Alert.alert('Form Submitted', `
      Name: ${name}
      Phone: ${phone}
      Age: ${age}
      Blood Group: ${bloodGroup}
      Gender: ${gender}
      State: ${state}
      City: ${city}
      Address: ${address}
      Country: ${country}
      Email: ${email}
      Password: ${password}
      Checked: ${checked}
    `);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.hed}>Edit Profile</Text>
      <View style={styles.imgpro}>
        <Image source={require('../../assets/images/profile.avif')} style={styles.imagein}></Image>
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Enter name" value={name} onChangeText={setName} />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Blood Group</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter blood group (e.g. A+)"
        value={bloodGroup}
        onChangeText={setBloodGroup}
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select gender..." value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>State</Text>
      <TextInput style={styles.input} placeholder="Enter state" value={state} onChangeText={setState} />

      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} placeholder="Enter city" value={city} onChangeText={setCity} />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Country</Text>
      <TextInput style={styles.input} placeholder="Enter country" value={country} onChangeText={setCountry} />

      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.helpText}>We'll never share your email with anyone else.</Text>

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setChecked(prev => !prev)}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
        <Text style={styles.checkboxLabel}>Check me out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Edit</Text>
        
        
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  hed:
  {
    fontSize:15,
    padding:2

  },
  imgpro:
  {
   marginLeft:120,
  },
  imagein:
  {
    backgroundColor:'pink',
    height:90,
    width:90,
    borderRadius:50,
    

  },
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  label: {
    marginTop: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
  },
  helpText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#555',
    marginRight: 10,
    borderRadius: 3,
  },
  checkboxChecked: {
    backgroundColor: '#007bff',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
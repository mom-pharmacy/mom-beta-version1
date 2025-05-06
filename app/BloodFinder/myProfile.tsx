import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
// import Icon from 'react-native-vector-icons/Ionicons';

const myProfile = () => {
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedDistrict, setSelectedDistrict] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = React.useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
      
        <Text style={styles.headerTitle}>Blood Donor</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Be an Angel in someone{'\n'}Life donate now
        </Text>
        <TouchableOpacity>
          <Text style={styles.registerLink} onPress={()=>router.push('./registration')}>Register Here →</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeading}>Looking for blood donor? Search Here</Text>
      

      <View style={styles.pickerRow}>
        <Picker
          selectedValue={selectedState}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedState(itemValue)}
        >
          <Picker.Item label="Select State" value="" />
          <Picker.Item label="Telangana" value="Telangana" />

          
        </Picker>

        <Picker
          selectedValue={selectedDistrict}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
        >
          <Picker.Item label="Select District" value="" />
          <Picker.Item label="Hyderabad" value="Hyderabad" />
          <Picker.Item label="Rangareddy" value="Hyderabad" />
          <Picker.Item label="Hitech City" value="Hyderabad" />
          
        </Picker>
      </View>

      <Picker
        selectedValue={selectedCity}
        style={styles.pickerFull}
        onValueChange={(itemValue) => setSelectedCity(itemValue)}
      >
        <Picker.Item label="Select City" value="" />
        <Picker.Item label="Gachibowli" value="Gachibowli" />
        <Picker.Item label="Madhapur" value="Gachibowli" />
        <Picker.Item label="Ghatkesr" value="Gachibowli" />
        <Picker.Item label="Uppal" value="Gachibowli" />
        <Picker.Item label="Hitec City" value="Gachibowli" />
       
      </Picker>

      <Picker
        selectedValue={selectedBloodGroup}
        style={styles.pickerFull}
        onValueChange={(itemValue) => setSelectedBloodGroup(itemValue)}
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

      <TouchableOpacity style={styles.searchButton} onPress={()=>{
        router.replace("./donarDetails")
      }}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/medicine.png')}
        style={styles.bottomImage}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#e7f6ed',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  registerLink: {
    color: '#00a97f',
    fontWeight: '600',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  pickerFull: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginTop: 10,
  },
  searchButton: {
    backgroundColor: '#008060',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  searchText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomImage: {
    height: 240,
    width: '100%',
    marginTop: 20,
  },
});

export default myProfile;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const FilterComponent = ({ filterData, updateFilterData, onSearch }) => (
  <View>
    <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 24, marginTop: 20 }}>
      Select the Details
    </Text>

    <View style={styles.pickerContainer}>
      <Picker selectedValue={filterData.bloodGroup} onValueChange={(value) => updateFilterData('bloodGroup', value)}>
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

    <View style={styles.pickerContainer}>
      <Picker selectedValue={filterData.state} onValueChange={(value) => updateFilterData('state', value)}>
        <Picker.Item label="Select State" value="" />
        <Picker.Item label="Telangana" value="Telangana" />
        <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
        <Picker.Item label="Karnataka" value="Karnataka" />
      </Picker>
    </View>

    <View style={styles.pickerContainer}>
      <Picker selectedValue={filterData.city} onValueChange={(value) => updateFilterData('city', value)}>
        <Picker.Item label="Select City" value="" />
        <Picker.Item label="Hyderabad" value="Hyderabad" />
        <Picker.Item label="Madhapur" value="Madhapur" />
        <Picker.Item label="Bangalore" value="Bangalore" />
      </Picker>
    </View>

    <TouchableOpacity onPress={onSearch} style={styles.applyBtn}>
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Search</Text>
    </TouchableOpacity>
  </View>
);

const AvailableDonorsScreen = () => {
  const [donors, setDonors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState({
    bloodGroup: '',
    state: '',
    city: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [customReason, setCustomReason] = useState('');

  const fetchFilteredDonor = async () => {
    try {
      let url = 'http://localhost:3000/api/donar/donar';
      const params = [];

      if (filterData.state) params.push(`state=${encodeURIComponent(filterData.state)}`);
      if (filterData.city) params.push(`city=${encodeURIComponent(filterData.city)}`);
      if (filterData.bloodGroup) params.push(`bloodGroup=${encodeURIComponent(filterData.bloodGroup)}`);

      if (params.length > 0) {
        url += '?' + params.join('&');
      }

      const response = await axios.get(url);  
      const res = response.data;

      if (Array.isArray(res)) {
        setDonors(res);
      } else if (res.data) {
        setDonors([res.data]);
      } else {
        setDonors([]);
      }

      setShowFilter(false);
    } catch (error) {
      console.error('Error fetching filtered donor:', error);
      setDonors([]);
    }
  };

  useEffect(() => {
    fetchFilteredDonor();
  }, []);

  const handleSend = async () => {
    const finalReport = suggestion === 'Other' ? customReason : suggestion;
    const dataToSend = {
      report: finalReport,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/report/repotdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        const errorResponse = await response.text(); 
        console.error('Error Response:', errorResponse);
        throw new Error('Error sending report');
      }
  
      const responseData = await response.json();
      window.alert('Report sent successfully!');
      setSuggestion('');
      setCustomReason('');
      setShowModal(false);
    } catch (error) {
      console.error('Fetch Error:', error); 
      window.alert('Something went wrong. Check the console for more details.');
    }
  };
  

  

  const DonorCard = ({ donor }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{donor.name}</Text>
        <Text style={styles.phone}>{donor.phone}</Text>
        <Text style={styles.blood}>Blood Group: {donor.bloodGroup}</Text>
        <Text style={[styles.status, { color: donor.availability ? 'green' : 'red' }]}>
          {donor.availability ? 'Available' : 'Not Available'}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.reportBtn} onPress={() => setShowModal(true)}>
          <Text style={styles.btnText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callBtn}>
          <Ionicons name="call" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const updateFilterData = (key, value) => {
    setFilterData(prevState => ({ ...prevState, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Available Donors</Text>
        <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
          <Icon name="filter" size={24} color="#00796B" />
        </TouchableOpacity>
      </View>

      {showFilter ? (
        <FilterComponent
          filterData={filterData}
          updateFilterData={updateFilterData}
          onSearch={fetchFilteredDonor}
        />
      ) : donors.length > 0 ? (
        <FlatList
          data={donors}
          keyExtractor={(item) => item._id || item.id}
          renderItem={({ item }) => <DonorCard donor={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No donor found</Text>
      )}

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close-circle" size={30} color="#FF6F91" />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Report</Text>
            <Text style={styles.subtitle}>
              Didn’t find what you are looking for? Please report an issue or missing information
            </Text>

            <Picker
              selectedValue={suggestion}
              onValueChange={(itemValue) => setSuggestion(itemValue)}
              style={{ width: '100%', marginBottom: 20 }}
            >
              <Picker.Item label="Select a reason" value="" />
              <Picker.Item label="Not Available" value="Not Available" />
              <Picker.Item label="Not Answering the Call" value="Not Answering the Call" />
              <Picker.Item label="Not Interested" value="Not Interested" />
              <Picker.Item label="Wrong number" value="wrong number" />
              <Picker.Item label="Donated recently" value="donated recently" />
              <Picker.Item label="Can't donate anymore" value="Can't donate anymore" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            {suggestion === 'Other' && (
              <TextInput
                style={styles.input}
                placeholder="Enter your reason"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                value={customReason}
                onChangeText={setCustomReason}
              />
            )}

            <Button title="Send" onPress={handleSend} color="#FF6F91" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  info: {
    flex: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  phone: {
    color: '#333',
  },
  blood: {
    color: '#333',
  },
  status: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  actions: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  reportBtn: {
    backgroundColor: '#00A99D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 5,
  },
  callBtn: {
    backgroundColor: '#00A99D',
    borderRadius: 25,
    padding: 10,
  },
  btnText: {
    color: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
  },
  applyBtn: {
    backgroundColor: '#00A99D',
    margin: 15,
    padding: 10,
    borderRadius: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#333',
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
  },
});

export default AvailableDonorsScreen;
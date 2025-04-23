import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Linking,
  Share,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyAddressesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('Rohith, 13-55, beside HP petrol bunk, Yadav Nagar, Malkajgiri, Secunderabad');
  const [customAddress, setCustomAddress] = useState(selectedAddress);

  const handleEditAddress = () => {
    setSelectedAddress(customAddress);
    setModalVisible(false);
  };

  const handleDeleteAddress = () => {
    setSelectedAddress('');
    setModalVisible(false);
  };

  const handleLocation=() =>{
    router.replace('./addAddress');
  };
  const handleWhatsAppClick = () => {
    const message = "Please share your delivery location to ensure a hassle-free delivery by clicking on this link";
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.openURL(url)
      .catch(() => {
        alert('WhatsApp is not installed on this device');
      });
  };

  const handleShareAddress = async () => {
    try {
      const result = await Share.share({
        message: `Address: ${selectedAddress}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Address shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Sharing dismissed');
      }
    } catch (error) {
      console.error('Error sharing address:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Add Address */}
      <TouchableOpacity style={styles.button} onPress={handleLocation}>
        <Icon name="plus-circle" size={24} color="#5cb85c" style={styles.icon} />
        <Text style={styles.buttonText}>Add new address</Text>
        <Icon name="chevron-right" size={20} color="gray" style={styles.arrowIcon} />
      </TouchableOpacity>

      {/* Request Address */}
      <TouchableOpacity style={styles.button} onPress={handleWhatsAppClick}>
        <View style={styles.iconBackground}>
          <Icon name="whatsapp" size={24} color="white" />
        </View>
        <Text style={styles.buttonText}>Request address from someone else</Text>
        <Icon name="chevron-right" size={20} color="gray" style={styles.arrowIcon} />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Your saved addresses</Text>

      {/* Address Card */}
      <View style={styles.addressCard}>
        <View style={styles.addressHeader}>
          <View style={styles.homeIconBackground}>
            <Icon name="home" size={20} color="#f0ad4e" />
          </View>
          <Text style={styles.addressTitle}>Home</Text>
        </View>
        <Text style={styles.addressDetails}>{selectedAddress}</Text>
        <View style={styles.addressActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
            <Icon name="ellipsis-h" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShareAddress}>
            <Icon name="upload" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            value={customAddress}
            onChangeText={setCustomAddress}
            placeholder="Edit your address"
            multiline
          />
          <View style={styles.modalButtons}>
            <Button title="Save" onPress={handleEditAddress} />
            <Button title="Delete" color="red" onPress={handleDeleteAddress} />
            <Button title="Cancel" color="gray" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MyAddressesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    marginRight: 10,
  },
  iconBackground: {
    backgroundColor: '#25D366',
    padding: 8,
    borderRadius: 25,
    marginRight: 10,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  addressCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  homeIconBackground: {
    marginRight: 10,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressDetails: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 10,
  },
  modalView: {
    marginTop: 'auto',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'column',
    gap: 10,
  },
});

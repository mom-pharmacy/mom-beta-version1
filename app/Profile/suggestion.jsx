import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuggestProduct = () => {
  const [suggestion, setSuggestion] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation(); 

  const handleSend = () => {
    console.log(suggestion);

    setSuggestion('');
    setModalVisible(false);
    navigation.navigate('index'); 
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <View style={[styles.closeButtonContainer, { opacity: 0.5 }]}>
            <Button title="✕" onPress={() => navigation.navigate('index.jsx')} />
          </View>

          <Text style={styles.title}>Suggest Products</Text>
          <Text style={styles.subtitle}>
            Didn’t find what you are looking for? Please suggest the products
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter the name of the products you would like to see."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={suggestion}
            onChangeText={setSuggestion}
          />

          <Button title="Send" onPress={handleSend} color="#00A99D" />
        </View>
      </View>
    </Modal>
  );
};

export default SuggestProduct;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#4B4B4B',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
    color: '#000',
    width: '100%',
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});

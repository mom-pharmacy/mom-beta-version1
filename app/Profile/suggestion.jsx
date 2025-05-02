import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const SuggestProduct = () => {
  const [suggestion, setSuggestion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isThankYou, setIsThankYou] = useState(false);
  const navigation = useNavigation();
  const timerRef = useRef(null); // To clear any timer if left

  useFocusEffect(
    useCallback(() => {
      // When screen focuses, reset everything
      setSuggestion('');
      setModalVisible(true);
      setIsThankYou(false);

      return () => {
        // When leaving screen, always clear timer
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }, [])
  );

  const handleSend = () => {
    console.log('Suggestion submitted:', suggestion);
    setSuggestion('');
    setIsThankYou(true);

    // After 2 seconds, close modal and navigate
    timerRef.current = setTimeout(() => {
      setModalVisible(false);
      setIsThankYou(false);
      timerRef.current = null;
      navigation.replace('myProfile'); // <- IMPORTANT: replace instead of navigate
    }, 2000);
  };

  return (
    <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {!isThankYou ? (
            <>
              <Text style={styles.title}>Suggest Products</Text>
              <Text style={styles.subtitle}>
                Didn’t find what you are looking for? Please suggest the products.
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
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Thank You!</Text>
              <Text style={styles.subtitle}>
                Your suggestion has been submitted successfully.
              </Text>
            </>
          )}
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
  sendButton: {
    backgroundColor: '#00A99D',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
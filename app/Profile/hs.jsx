import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ExpoLinking from 'expo-linking';

const HelpAndSupportScreen = () => {
  const whatsappNumber = '+917702068334';
  const supportPhoneNumber = '+917702068334';
  const whatsappMessage =
    'Hello! I need help ordering medicine in your application.';

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
    ExpoLinking.openURL(url).catch(() => {
      Alert.alert('Error', 'Make sure WhatsApp is installed on your device');
    });
  };

  const callSupport = () => {
    const url = `tel:${supportPhoneNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to place a call from this device');
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Frequently Asked Questions</Text>

        <Text style={styles.question}>• What documents are required for ordering prescription medicines?</Text>
        <Text style={styles.answer}>You’ll need to upload a valid prescription during checkout for prescription medicines.</Text>

        <Text style={styles.question}>• How long does it take to deliver the medicines?</Text>
        <Text style={styles.answer}>Delivery usually takes between 10 to 15 minutes, depending on your location and availability.</Text>

        <Text style={styles.question}>• Can I return or cancel my order?</Text>
        <Text style={styles.answer}>Orders can be canceled within 15 minutes. Return is only available for damaged or incorrect products.</Text>

        <Text style={styles.question}>• What if I enter the wrong delivery address?</Text>
        <Text style={styles.answer}>Don’t worry! Contact us immediately — if the rider hasn't left, we can fix it for you.</Text>

        <Text style={styles.question}>• How do I know if my medicine is in stock?</Text>
        <Text style={styles.answer}>The app updates availability in real-time. If it’s listed, it’s probably on our shelf!</Text>
      </View>

      <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
        <Icon name="whatsapp" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.buttonText}>Chat on WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.callButton} onPress={callSupport}>
        <Icon name="phone" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.buttonText}>Call Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E1E1E',
  },
  section: {
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  question: {
    fontFamily: 'DMSans',
    fontWeight: 'bold',
    marginTop: 10,
    color: '#444',
  },
  answer: {
    fontFamily: 'DMSans',
    marginLeft: 10,
    marginBottom: 10,
    color: '#555',
  },
  whatsappButton: {
    flexDirection: 'row',
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HelpAndSupportScreen;

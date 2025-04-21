import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';

const generateReferralCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const ReferralScreen = () => {
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    const code = generateReferralCode();
    setReferralCode(code);

    const link = Linking.createURL(`signup?ref=${code}`);
    setReferralLink(link);
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralLink);
    Alert.alert('Copied', 'Referral link copied to clipboard!');
  };

  const shareReferral = async () => {
    try {
      await Share.share({
        message: `Join me on this awesome app! Use my referral link: ${referralLink}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share referral link');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Refer & Earn</Text>
      <Text style={styles.label}>Your Referral Code:</Text>
      <Text style={styles.code}>{referralCode}</Text>

      <Text style={styles.label}>Your Referral Link:</Text>
      <Text style={styles.link}>{referralLink}</Text>

      <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
        <Text style={styles.buttonText}>Copy Link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareButton} onPress={shareReferral}>
        <Text style={styles.buttonText}>Share with Friends</Text>
      </TouchableOpacity>

      <View style={styles.benefits}>
        <Text style={styles.benefitsTitle}>Why Refer?</Text>
        <Text style={styles.benefit}>🎁 Earn coupons for each friend who signs up</Text>
        <Text style={styles.benefit}>🚀 Friends get a initial coupons bonus too</Text>
        <Text style={styles.benefit}>💰 Rewards added to your cart instantly</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#f9fafa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
  },
  code: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  link: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  shareButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  benefits: {
    marginTop: 20,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  benefit: {
    fontSize: 15,
    marginBottom: 6,
  },
});

export default ReferralScreen;

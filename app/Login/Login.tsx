import React, { useContext, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Image, StyleSheet, Alert, KeyboardAvoidingView,
  Platform, ScrollView, TouchableWithoutFeedback, Keyboard,
  Dimensions,
  ActivityIndicator, 
} from 'react-native';
import { useRouter } from 'expo-router';
import { sendOtp, sendSmsOtp } from '../../lib/otp';
import { isEmail, isPhone } from '../../constants/regex';
import { AuthContext } from '@/context/authContext';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const [input, setInput] = useState('');
  const [loading , setLoading] = useState(false);
  const router = useRouter();

  const {loginWithOtp} = useContext(AuthContext);
 

  const handleSendOtp = async () => {
    console.log('Input:', input);
    setLoading(true);
    await loginWithOtp(input);
    setLoading(false)
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inner}>
            <View style={styles.topSection}>
              <Image
                source={require('@/assets/images/picimg.png')}
                style={styles.image}
              />
              <Text style={styles.tagline}>Instant medicine to your door step</Text>
            </View>


            <View style={styles.bottomCard}>
              <Text style={styles.heading}>
                Sign In /{' '}
                <Text style={styles.signupLink} onPress={() => router.push('./Signup')}>
                  Sign Up
                </Text>
              </Text>

              <Text style={styles.orText}> </Text>

              <View style={styles.phoneContainer}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your number"
                  value={input}
                  onChangeText={setInput}
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.otpText}>Send OTP</Text>
                )}
              </TouchableOpacity>

              <View style={{ height: 30 }} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A88D',
  },
  inner: {
    flex: 1,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#00A88D',
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  tagline: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  bottomCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    paddingTop: 40,
    paddingHorizontal: 25,
    paddingBottom: 200,
    marginTop: 0,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  signupLink: {
    color: 'black',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  orText: {
    marginVertical: 20,
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    marginBottom: 25,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  otpButton: {
    backgroundColor: '#00A88D',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
  },
  otpText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
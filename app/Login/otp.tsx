import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { sendSmsOtp, verifyOtp } from '../../lib/otp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/authContext';

export default function OtpScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const { user } = useLocalSearchParams();

  const { verifyOtp} = useContext(AuthContext);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  

  const handleVerifyOtp = async () => {
    const fullOtp = otp.join('');
    const isValid = await verifyOtp(fullOtp , user);

    if (isValid) {
      router.replace('../Home/Home');
    } else {
      Alert.alert('Invalid OTP');
    }

  };

  const handleResendOtp = async () => {
    if (canResend) {
      setOtp(['', '', '', '', '', '']);
      setTimer(30);
      setCanResend(false);
      await sendSmsOtp(typeof user === 'string' ? user : user[0]);
      Alert.alert('OTP Resend', 'A new Otp has been sent to your phone');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/momlogo.jpeg')} style={styles.logo} />

      <Text style={styles.heading}>Enter OTP</Text>
      <Text style={styles.subtext}>Please enter the OTP to access our Services</Text>
      <Text style={styles.otpSent}>OTP sent via SMS to {user}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <View style={styles.resendRow}>
        <TouchableOpacity onPress={handleResendOtp} disabled={!canResend}>
          <Text style={[styles.resendText, !canResend && { opacity: 0.5 }]}>
            Resend the OTP
          </Text>
        </TouchableOpacity>
        <Text style={styles.timerText}>
          {timer > 0 ? `00:${String(timer).padStart(2, '0')} secs` : ''}
        </Text>
      </View>

      <TouchableOpacity onPress={handleVerifyOtp} style={styles.verifyButton}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff', padding: 20, paddingTop: 60 },
  logo: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtext: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 5 },
  otpSent: { fontSize: 13, color: '#777', marginBottom: 20 },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  otpBox: {
    width: 40,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  resendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    color: '#007AFF',
  },
  timerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },

  verifyButton: {
    backgroundColor: '#00A99A',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 30,
    width: '50%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

});
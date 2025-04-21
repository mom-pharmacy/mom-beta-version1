import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // or 'react-native-vector-icons/MaterialIcons'
import { useRouter } from 'expo-router';

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/Home/home'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}>
      <MaterialIcons name="check-circle" size={100} color="white" />
      <Text style={styles.successText}>Your order is placed successfully</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default SuccessPage;
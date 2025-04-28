import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { AuthContext, AuthProvider } from '@/context/authContext';
import Home from './Home/home';
import LoginScreen from './Login/Login';

export default function index() {
  const {userDetails} = useContext(AuthContext);
  useEffect(() => { 
    const checkUser = async () => { 
      // await AsyncStorage.clear(); // Clear AsyncStorage for testing purposes
      const user = await AsyncStorage.getItem('user');
      console.log('User:', user);
      if (user) {
        router.replace('/Home/home');
      } else {
        router.replace('/Login/Login');
      }
    }
    checkUser();  
  } , []);

  return null
}
import { useEffect } from 'react';
import { router } from 'expo-router';
import { userAuth } from '@/context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const { isLoggedIn, userDetails } = userAuth();

  useEffect(() => {
    const checkLogin = async () => {
      const storedToken = await AsyncStorage.getItem('user');
      if (isLoggedIn && storedToken) {
        // Navigate to home screen
        router.replace('/Home/home');  // or whatever your home route is
      }else{
        router.replace("/Login/Login")
      }
    };

    checkLogin();
  }, [isLoggedIn]); // depend on isLoggedIn

  return null;
}

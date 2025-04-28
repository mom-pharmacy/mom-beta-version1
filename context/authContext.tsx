import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  // Fetch user details
  const getUserDetails = useCallback(async (authToken) => {
    try {
      if (!authToken) return;

      const response = await fetch('https://mom-beta-server.onrender.com/api/user/user-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.userDetails);
      } else {
        console.error('Failed to fetch user details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('user');
        if (storedToken) {
          const parsedToken = JSON.parse(storedToken);
          setToken(parsedToken);
          setIsLoggedIn(true);
          getUserDetails(parsedToken);
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [getUserDetails]);

  // Login with OTP
  const loginWithOtp = async (mobileNo) => {
    try {
      const response = await fetch('https://mom-beta-server.onrender.com/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNo }),
      });

      if (response.ok) {
        const data = await response.json();
        router.replace({ pathname: '/Login/otp', params: { user: mobileNo } });
        console.log('Login successful:', data);
      } else {
        Alert.alert('Login failed!');
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('An error occurred during login!');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async (otp, mobileNo) => {
    try {
      const response = await fetch('https://mom-beta-server.onrender.com/api/user/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, mobileNo }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('user', JSON.stringify(data.token));
        setToken(data.token);
        setIsLoggedIn(true);
        getUserDetails(data.token);
        console.log('OTP verified:', data);
        return true;
      } else {
        console.error('OTP verification failed:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setToken(null);
      setIsLoggedIn(false);
      setUserDetails(null);
      router.replace('/Login/Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ loginWithOtp, verifyOtp, logout, isLoggedIn, loading, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

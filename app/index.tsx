import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import AvailableDonorsScreen from './BloodFinder/donarDetails'
import MyProfile from './BloodFinder/myProfile';



export default function index() {
  
  return <MyProfile/>
}
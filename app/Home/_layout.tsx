import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { CartProvider } from '../cartContext';
import Entypo from '@expo/vector-icons/Entypo';


const TabLayout = () => {
  return (
   <CartProvider>
    <Tabs screenOptions={{headerShown:false}}>
        <Tabs.Screen name='home' options={{tabBarLabel:'Home',
          tabBarIcon:({color}) =><FontAwesome name="home" size={24} color="black" />
        }} />
        <Tabs.Screen name='categories' options={{tabBarLabel:'Categories',
          tabBarIcon:({color}) =><Entypo name="menu" size={24} color="black" />
        }} />
        <Tabs.Screen name='cart'  options={{tabBarLabel:'Cart',
          tabBarIcon:({color}) =><FontAwesome name="cart-plus" size={24} color="black"/>
        }} />
    </Tabs>
    </CartProvider>

  )
}

export default TabLayout
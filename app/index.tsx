// 


import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function index() {
  return (
    <View>
    <TouchableHighlight onPress={()=>{router.replace("./Home/home")}}>
      <Text>loding</Text>
    </TouchableHighlight>
    </View>
  )
}
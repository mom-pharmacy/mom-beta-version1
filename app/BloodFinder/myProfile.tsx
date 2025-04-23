import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

const MyProfile: React.FC = () => {


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.hed}>MyProfile </Text>
      <View style={styles.imgpro}>
          <Image source={require('../../assets/images/img1.jpeg')} style={styles.imagein}></Image>
      </View>
      <Text style={styles.proName}>Adarsh</Text>
      <View>
      <Button title="Edit" color="#841584" onPress={()=>router.push("./editProfile")}
 accessibilityLabel="Learn more about this purple button"
/>
      </View>
      
    </ScrollView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  hed:
  {
    fontSize:15,
    padding:2

  },
  imgpro:
  {
   marginLeft:120,
   marginBottom:20
  },
  imagein:
  {
    backgroundColor:'pink',
    height:90,
    width:90,
    borderRadius:50,
    

  },
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  proName:
  {
    textAlign:'center'
  }


 
 
  
});
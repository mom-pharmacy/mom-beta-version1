import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';


export default function Index() {
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor="#00bfa5" barStyle="light-content" />

    <View style={styles.logoContainer}>
      <Image
        source={require('../assets/images/momlogo.jpeg')} // Make sure the path is correct
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Mom Pharmacy</Text>
    </View>

    <Text style={styles.tagline}>Beyond pills - We deliver Life in Minutes</Text>

    <TouchableOpacity style={styles.button} onPress={()=>router.replace("/myProfile")}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
   
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfa5', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor:'white',
    top:0,
    marginTop:-280,
    height:500,
    width:'120%',
    borderBottomEndRadius:100,
    borderBottomLeftRadius:100
  },
  logo: {
    width: 180,
    height: 180,
    marginTop:200
  },
  title: {
    fontSize: 24,
    color: '#00bfa5',
    marginTop: 10,
    fontWeight: 'bold',
    borderTopLeftRadius: 300,
   
  },
  tagline: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    marginTop:100,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ffffff', 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5, 
  },
  buttonText: {
    color: '#00bfa5', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  entryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  entryText: {
    color: '#00bfa5',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  loginText: {
    color: '#00bfa5',
    fontWeight: 'bold',
  },
})

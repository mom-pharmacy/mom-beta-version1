import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

export default function About() {
  return (
    <ImageBackground
    source={require('../../assets/images/img1.jpeg')}
    style={styles.background}
    resizeMode="cover"
  >  
      <BlurView intensity={80} tint="light" style={styles.blurBox}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.content}>
          
We are a trusted medical delivery service committed to delivering essential
        medical products quickly and safely. We Deliver Medicines On Minutes. Our team ensures timely deliveries and
        customer satisfaction. Our service helps individuals and healthcare providers
        get the medications and supplies they need, when they need them.
        </Text>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurBox: {
    width: '90%',
    padding: 25,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  title: {
    fontFamily: "DM Sans",
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#00856F',
    textAlign: 'center',
  },
  content: {
    fontFamily: "DM Sans",
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    lineHeight: 22,
  },
});






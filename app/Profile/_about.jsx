import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';

export default function About() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>About Us</Text>

        <View style={styles.cardContainer}>
          <BlurView intensity={85} tint="light" style={styles.card}>
            <Text style={styles.title}>Who We Are</Text>
            <Text style={styles.text}>
              We are a healthcare delivery platform committed to bringing medical supplies and essential medications to your doorstep quickly, safely, and reliably.
            </Text>

            <Text style={styles.title}>Our Mission</Text>
            <Text style={styles.text}>
              We aim to simplify access to critical healthcare by ensuring medications are delivered within minutes. Fast service. Full trust. Always.
            </Text>

            <Text style={styles.title}>Our Services</Text>
            <Text style={styles.text}>
              • Real-time order tracking{'\n'}
              • 24/7 customer assistance{'\n'}
              • Delivery within 10 minutes
            </Text>
          </BlurView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00856F',
  },
  scrollContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 30,
    fontFamily: 'DM Sans',
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 380,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    overflow: 'hidden',    
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#00856F',
    fontFamily: 'DM Sans',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 18,
    fontFamily: 'DM Sans',
  },
});
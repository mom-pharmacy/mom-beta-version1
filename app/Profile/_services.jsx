import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0FAF8',
  },
  title: {
    fontFamily: "DM Sans",
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00856F',
    textAlign: 'center',
    marginBottom: 30,
  },
  serviceCard: {
    backgroundColor: '#00A99D',
    padding: 20,
    marginVertical: 15,
    borderRadius: 10,
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  serviceText: {
    fontFamily: "DM Sans",
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});

const ServiceItem = ({ children }) => (
  <View style={styles.serviceCard}>
    <Text style={styles.serviceText}>- {children}</Text>
  </View>
);

export default function ServicesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Our Services</Text>
      <ServiceItem>Prescription Based Deliveries</ServiceItem>
      <ServiceItem>Medical Equipment Deliveries</ServiceItem>
      <ServiceItem>Emergency Medical Supplies</ServiceItem>
      <ServiceItem>Reliable and Fast Delivery</ServiceItem>
      <ServiceItem>WhatsApp Orders Accepted</ServiceItem>
      <ServiceItem>Order Via Call</ServiceItem>
    </ScrollView>
  );
}
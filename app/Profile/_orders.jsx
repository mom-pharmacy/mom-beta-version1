
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function OrdersScreen() {
  const orders = [
    {
      id: '12345',
      status: 'Delivered',
      tracking: 'Delivered to the customer on 18th April 2025',
      date: '2025-04-18',
    },
    {
      id: '12346',
      status: 'On The WAY',
      tracking: 'On the way, expected delivery by 18th April 2025',
      date: '2025-04-18',
    },
    {
      id: '12347',
      status: 'Pending',
      tracking: 'Waiting for confirmation from the pharmacy',
      date: '2025-04-18',
    },
  ];
 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {orders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <Text style={styles.orderTitle}>Order: #{order.id}</Text>
          <Text style={styles.orderStatus}>Status: {order.status}</Text>
          <Text style={styles.orderDate}>Order Date: {order.date}</Text>
          <Text style={styles.trackingText}>Tracking Info: {order.tracking}</Text>
          {order.status !== 'Delivered' && (
            <TouchableOpacity style={styles.trackButton}>
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontFamily: "DM Sans",
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00856F',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  orderTitle: {
    fontFamily: "DM Sans",
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  orderStatus: {
    fontFamily: "DM Sans",
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  orderDate: {
    fontFamily: "DM Sans",
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  trackingText: {
    fontFamily: "DM Sans",
    fontSize: 14,
    color: '#000',
    marginBottom: 12,
  },
  trackButton: {
    backgroundColor: '#00856F',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    fontFamily: "DM Sans",
    fontSize: 16,
    color: '#00000',
    fontWeight: '600',
  },
});

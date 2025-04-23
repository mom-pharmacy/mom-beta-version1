import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCart } from './cartContext';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const BillSummary = () => {
  const { cartItem } = useCart();
  console.log('caart is' +cartItem)

  const cartItems = Object.entries(cartItem).map(([name, quantity]) => ({
    name,
    quantity,
    price: 30.0,
  }));

  const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handlingFee = 8;
  const deliveryFee = 1;
  const grandTotal = itemsTotal + handlingFee + deliveryFee;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bill details</Text>

      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <MaterialIcons name="currency-rupee" size={20} color="#000" />
          <Text style={styles.label}>Items total</Text>
        </View>
        <Text style={styles.value}>₹{itemsTotal.toFixed(0)}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <FontAwesome5 name="box" size={18} color="#000" />
          <Text style={styles.label}>Handling charges</Text>
        </View>
        <Text style={styles.value}>₹{handlingFee}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <MaterialCommunityIcons name="shopping-outline" size={20} color="#000" />
          <Text style={styles.label}>Delivery charge (Inc taxes)</Text>
        </View>
        <Text style={styles.value}>₹{deliveryFee}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Grand total</Text>
        <Text style={styles.totalValue}>₹{grandTotal.toFixed(0)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 20,
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 15,
    color: '#333',
  },
  value: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
});

export default BillSummary;
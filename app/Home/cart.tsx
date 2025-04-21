import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useCart } from '../cartContext'
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

export default function Card() {
  const { cart1, incrementItem, decrementItem, removeFromCart } = useCart();

  const cartItems = Object.entries(cart1).map(([name, quantity], index) => ({
    id: index + 1,
    name,
    quantity,
    price: 30.0, // Add logic here to fetch price from DB if needed
  }));
  console.log(cartItems);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const router = useRouter();
 

    const [showDialog, setShowDialog] = useState(false);
   
  
    const handleProceed = () => {
      setShowDialog(false);
      router.replace('../sucessPage')
    };
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/Home/home')} >
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          
          <View style={styles.cartItem}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.qtySection}>
              <TouchableOpacity onPress={() => decrementItem(item.name)} style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => incrementItem(item.name)} style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>₹ {(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />

        <Modal
              animationType="slide"
              transparent={true}
              visible={showDialog}
              onRequestClose={() => setShowDialog(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
      
                 
                  <Text style={styles.totalAmountLabel}>Total Amount</Text>
                  <Text style={styles.totalAmountValue}>₹{total}</Text>
      
                  
                  <Text style={styles.codTitle}>Cash on Delivery</Text>
                  <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                    <Text style={styles.proceedText}>Proceed</Text>
                  </TouchableOpacity>
      
                </View>
              </View>
            </Modal>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₹ {total}</Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={()=>setShowDialog(true)}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  qtySection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  qtyButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    flex: 2,
    fontSize: 16,
  },
  qty: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  price: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    color: '#007aff',
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  checkoutBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 2,
   
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  totalAmountLabel: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
    textAlign: 'center',
  },
  totalAmountValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  codTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  proceedButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  

})
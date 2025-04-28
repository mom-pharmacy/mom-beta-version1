import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import { useCart } from '../cartContext'
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Cart() {
  const { cartItems, incrementItem, decrementItem, removeFromCart } = useCart();
  const router = useRouter();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const [showDialog, setShowDialog] = useState(false);

  const handleProceed = () => {
    setShowDialog(false);
    router.replace('../sucessPage');
  };

  const quantity = (itemId) => {
    const findItem = cartItems.find(item => item._id === itemId);
    return findItem.quantity;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header1}>
        <TouchableOpacity onPress={() => router.replace('/Home/home')}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.imageBox}>
              <Image style={styles.image} source={{ uri: `http://localhost:3000${item.imageUrl}` }} />
            </View>
            <View style={{ flexDirection: 'column', gap: 4, flex: 2 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subText}>{item.sub}</Text>
            </View>
            <View style={styles.qtySection}>
              <TouchableOpacity
                onPress={() =>
                  quantity(item._id) > 1
                    ? decrementItem(item._id)
                    : removeFromCart(item._id)
                }
                style={styles.qtyButton}
              >
                <Text style={styles.qtyButtonText}>−</Text>
              </TouchableOpacity>
              <Text>{quantity(item._id)}</Text>
              <TouchableOpacity onPress={() => incrementItem(item._id)} style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>₹ {(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}</Text>
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
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => setShowDialog(true)}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  imageBox: {
    height: 55,
    width: 55,
    backgroundColor: '#fff',
    elevation: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    marginRight: 10,
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  qtySection: {
    flexDirection: 'row',
    alignItems: 'center',
    
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
  },
  qtyButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
    textAlign: 'right',
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
});

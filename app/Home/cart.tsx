import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useCart } from '../cartContext';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userAuth } from '@/context/authContext';

export default function Cart() {
  const { cartItems, incrementItem, decrementItem, removeFromCart  , clearCart} = useCart();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const BASE_URL = 'http://localhost:3000';

  const {ExtractParseToken} = userAuth()


  // Totals
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountOnMRP = 0.2 * cartTotal;
  const couponDiscount = 0.05 * cartTotal;
  const handlingFee = 6;
  const platformFee = 4;
  const finalAmount = (
    cartTotal -
    discountOnMRP -
    couponDiscount +
    handlingFee +
    platformFee
  ).toFixed(2);
  const totalSavings = (discountOnMRP + couponDiscount).toFixed(2);
  const [loading , setLoading] = useState(false)

  const quantity = (id) => {
    const found = cartItems.find((i) => i._id === id);
    return found ? found.quantity : 0;
  };



  async function postOrders(medicines){
    const tokenAuth = await ExtractParseToken()
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${tokenAuth}`
      },
      body: JSON.stringify({
        user_id: "664420f6932c5c9c702a40c3",
        address_id: "6644215c932c5c9c702a40d0",
        medicines, // make sure this is defined
        total_amount: finalAmount, // make sure this is defined
        deliveryFee: 12,
        handlingFee: handlingFee, // make sure this is defined
        isActive: true,
      }),
    };
    
    try {
      setLoading(true)
      const response = await fetch("https://mom-beta-server1.onrender.com/api/add-order", options);
      // const data = await response.json();
      console.log('this is ordering response' , response);
      setLoading(false)
      if (response.ok) {
        const data =  await response.json()
        console.log('success response' , data)
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    }
  }

  const handleProceed = async () => {
    const medicines = cartItems.map(item=>({
      medicine_id:item._id ,
      quantity:item.quantity,
      price:item.price
    }))
    const ordered = await postOrders(medicines)
    if(ordered){
      console.log('this is running')
      clearCart()
      router.replace('/OrderConfirmation');
    }else{
      console.log("error")
    }
    setShowDialog(false);
  };

  // Dummy address for footer
  const addressLabel = 'Home';
  const addressLine = '7-112, 6, KG Halli';

  if(loading){
    return <View style={{flex:1 , justifyContent:"center" , alignItems:"center"}}>
      <ActivityIndicator size={"large"}/>
    </View>
  }

  // If cart is empty, show only the empty screen
  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/Home/home')}>
            <FontAwesome name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>

        <View style={styles.empty}>
          <Text style={styles.emptyText}>No items in your cart.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Otherwise, show list + footer
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {/* Cart Items + Savings + Bill Summary */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image
              source={{
                uri: 'https://via.placeholder.com/80',
              }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.sub}</Text>
              <View style={styles.summary}>
                <Text>Qty: {item.quantity}</Text>
                <Text>Unit: ₹{item.price.toFixed(2)}</Text>
                <Text>
                  Total: ₹{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.qty}>
              <TouchableOpacity
                onPress={() =>
                  quantity(item._id) > 1
                    ? decrementItem(item._id)
                    : removeFromCart(item._id)
                }
                style={styles.qtyBtn}
              >
                <Text style={styles.qtySign}>−</Text>
              </TouchableOpacity>
              <Text>{quantity(item._id)}</Text>
              <TouchableOpacity
                onPress={() => incrementItem(item._id)}
                style={styles.qtyBtn}
              >
                <Text style={styles.qtySign}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 300 }}
        ListFooterComponent={() => (
          <>

            {/* Bill Summary */}
            <View style={styles.billContainer}>
              <Text style={styles.billTitle}>Bill Details</Text>
              <View style={styles.billRow}>
                <Text>Cart Total</Text>
                <Text>₹ {cartTotal.toFixed(2)}</Text>
              </View>
              <View style={styles.billRow}>
                <Text>Discount on MRP</Text>
                <Text style={{ color: 'green' }}>
                  - ₹ {discountOnMRP.toFixed(2)}
                </Text>
              </View>
              <View style={styles.billRow}>
                <Text>Coupon Discount</Text>
                <Text style={{ color: 'green' }}>
                  - ₹ {couponDiscount.toFixed(2)}
                </Text>
              </View>
              <View style={styles.billRow}>
                <Text>Handling & Packaging Fee</Text>
                <Text>₹ {handlingFee}</Text>
              </View>
              <View style={styles.billRow}>
                <Text>Platform Fee</Text>
                <Text>₹ {platformFee}</Text>
              </View>
              <View style={styles.billRow}>
                <Text>Delivery Charges</Text>
                <Text style={{ color: 'green' }}>FREE</Text>
              </View>
              <View style={styles.billRowTotal}>
                <Text style={{ fontWeight: 'bold' }}>To Pay</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  ₹ {finalAmount}
                </Text>
              </View>
            </View>
            {/* Savings Banner */}
            <View style={styles.savingsBanner}>
              <Text style={styles.savingsText}>
                You Saved ₹ {totalSavings}
              </Text>
            </View>
          </>
        )}
      />

      {/* Fixed Footer */}
      <View style={styles.footer}>
        {/* Delivering To */}
        <TouchableOpacity
          style={styles.addressRow}
          onPress={() => router.push('/addAddress')}
        >
          <FontAwesome name="map-marker" size={20} color="#FF3366" />
          <View style={styles.addrText}>
            <Text>
              Delivering to{' '}
              <Text style={{ fontWeight: 'bold' }}>{addressLabel}</Text>
            </Text>
            <Text style={styles.addrLine}>{addressLine}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/addAddress')}>
            <Text style={styles.change}>Change</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Total & Place Order */}
        <View style={styles.orderRow}>
          <Text style={styles.total}>TOTAL ₹ {finalAmount}</Text>
          <TouchableOpacity
            style={styles.placeOrder}
            onPress={() => setShowDialog(true)}
          >
            <Text style={styles.placeOrderText}>PLACE ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* COD Modal */}
      <Modal
        visible={showDialog}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDialog(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalLabel}>Total Amount</Text>
            <Text style={styles.modalAmount}>₹{finalAmount}</Text>
            <Text style={styles.cod}>Cash on Delivery</Text>
            <TouchableOpacity
              style={styles.proceedBtn}
              onPress={handleProceed}
            >
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 16 },

  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#888' },

  cartItem: {
    flexDirection: 'row',
    margin: 10,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { flex: 1, marginLeft: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  sub: { color: '#666' },
  summary: { marginTop: 1 },
  qty: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: "row",
    gap: 8
  },
  qtyBtn: {
    backgroundColor: '#ddd',
    borderRadius: 4,
    padding: 4,
    marginVertical: 1,
  },
  qtySign: { fontSize: 16 },

  savingsBanner: {
    backgroundColor: '#d0f0c0',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 20,
  },
  savingsText: { color: 'green', fontWeight: 'bold' },

  billContainer: {
    margin: 12,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  billTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    borderTopWidth: 1,
    paddingTop: 8,
    borderColor: '#ccc',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  addrText: { flex: 1, marginLeft: 8 },
  addrLine: { color: '#666', fontSize: 12, marginTop: 2 },
  change: { color: '#FF3366', fontWeight: 'bold' },

  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3366',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  total: { flex: 1, color: '#fff', fontSize: 16, fontWeight: 'bold' },
  placeOrder: {
    backgroundColor: '#e6004c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  placeOrderText: { color: '#fff', fontWeight: 'bold' },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '75%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalLabel: { fontSize: 16, color: '#555' },
  modalAmount: { fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
  cod: { marginBottom: 16 },
  proceedBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  proceedText: { color: '#fff', fontWeight: 'bold' },
});
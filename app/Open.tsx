import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useCart } from "./cartContext"; 

export default function OpenScreen() {
  const { id } = useLocalSearchParams();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, incrementItem, decrementItem, removeFromCart } = useCart();

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await fetch(`https://mom-beta-server.onrender.com/api/medicine/${id}`);
        const data = await res.json();
        setMedicine(data);
      } catch (err) {
        console.error("Failed to fetch medicine:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMedicine();
  }, [id]);

  const quantity = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    return item ? item.quantity : 0;
  };

  const goToCart = () => {
    router.push("/Home/cart");
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!medicine) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Medicine not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { name, price, description, Expirydate, manufacturingDate, batchNo, imageUrl } = medicine;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>

      {imageUrl && (
        <Image
          source={{ uri: `https://mom-beta-server.onrender.com${imageUrl}`}}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>₹{price}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.info}>Expiry Date: {Expirydate}</Text>
      <Text style={styles.info}>Manufacturing Date: {manufacturingDate}</Text>
      <Text style={styles.info}>Batch No: {batchNo}</Text>

      {quantity(medicine._id) === 0 ? (
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => {
            addToCart(medicine);
            Alert.alert("Added to Cart", `${medicine.name} has been added to your cart.`);
          }}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.counterContainer}>
          <TouchableOpacity
            onPress={() =>
              quantity(medicine._id) > 1
                ? decrementItem(medicine._id)
                : removeFromCart(medicine._id)
            }
            style={styles.counterBtn}
          >
        <Text style={styles.counterText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.counterNumber}>{quantity(medicine._id)}</Text>
          <TouchableOpacity
            onPress={() => incrementItem(medicine._id)}
            style={styles.counterBtn}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.goToCartBtn} onPress={goToCart}>
        <Text style={styles.goToCartText}>Go to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  price: {
    fontSize: 22,
    color: "green",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 22,
  },
  info: {
    fontSize: 16,
    marginTop: 10,
  },
  backButton: {
    fontSize: 18,
    color: "blue",
  },
  centered: {
    marginTop: 50,
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  addToCartBtn: {
    backgroundColor: "#00A99D",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  addToCartText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  goToCartBtn: {
    borderColor: "#00A99D",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  goToCartText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', 
    marginTop: 20,
  },
  counterBtn: {
    backgroundColor: '#00A99D',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  counterText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 5,
  },
});
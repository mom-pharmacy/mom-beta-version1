import EvilIcons from "@expo/vector-icons/EvilIcons";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  TextInput,
} from "react-native";
import { useCart } from "../cartContext";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const medicines = [
  [
    {
      id: '1',
      name: "Dolo 650 Tablet",
      sub: "Strip of 15 tab",
      price: "₹28.53",
      original: "₹50",
      image: require("../../assets/images/medicine.png"),
    },
    {
      id: '2',
      name: "Ayu",
      sub: "Strip of 15 tab",
      price: "₹28.53",
      image: require("../../assets/images/medicine.png"),
    },
    {
      id: '3',
      name: "Diabetics",
      sub: "Strip of 15 tab",
      price: "₹28.53",
      image: require("../../assets/images/medicine.png"),
    },
  ],
  [
    {
      id: '4',
      name: "Dolo 650",
      sub: "Strip of 15 tab",
      price: "₹28.53",
      image: require("../../assets/images/medicine.png"),
    },
    {
      id: '5',
      name: "Ayu",
      sub: "Strip of 15 tab",
      price: "₹39.53",
      image: require("../../assets/images/medicine.png"),
    },
    {
      id: '6',
      name: "Diabetics",
      sub: "Strip of 15 tab",
      price: "₹51.53",
      image: require("../../assets/images/medicine.png"),
    },
  ],
  [
    {
      id: '7',
      name: "Dolo 650",
      sub: "Strip of 15 tab",
      price: "₹48.00",
      image: require("../../assets/images/medicine.png"),
    },
    {
      id: '8',
      name: "Ayu",
      sub: "Strip of 15 tab",
      price: "₹73.53",
      image: require("../../assets/images/medicine.png"),
    },
    {
      id: '9',
      name: "Diabetics",
      sub: "Strip of 15 tab",
      price: "₹48.53",
      image: require("../../assets/images/medicine.png"),
    },
  ],
  [
    {
      id: '10',
      name: "Dolo 650",
      sub: "Strip of 15 tab",
      price: "₹48.00",
      image: require("../../assets/images/medicine.png"),
    },
    {
      id: '11',
      name: "Ayu",
      sub: "Strip of 15 tab",
      price: "₹73.53",
      image: require("../../assets/images/medicine.png"),
    },
    {
      id: '12',
      name: "Diabetics",
      sub: "Strip of 15 tab",
      price: "₹48.53",
      image: require("../../assets/images/medicine.png"),
    },
  ],
];

export default function Categories({ showSearch = true }) {
  const [cart, setCart] = useState({});
  const [showCartBar, setShowCartBar] = useState(false);
  const slideAnim = useState(new Animated.Value(100))[0];
  const { cart1, addToCart, incrementItem, decrementItem, removeFromCart, clearCart } = useCart();



  const toggleCartBar = (visible: boolean | ((prevState: boolean) => boolean)) => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 100,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setShowCartBar(visible));
  };

  const totalItems = Object.values(cart1).reduce((a, b) => a + b, 0);

  return (
    <>
      <ScrollView style={{ marginBottom: 80, backgroundColor: 'white' }}>

        {showSearch && (
          <View style={styles.search}>
            <EvilIcons name="search" size={24} color="black" style={styles.bar} />
            <TextInput placeholder="search medicines" />
          </View>
        )}

        {medicines.map((row, rowIndex) => (
          <View style={styles.container} key={rowIndex}>
            {row.map((item, index) => {
              const itemKey = `${rowIndex}-${index}`;
              console.log(itemKey)
              const count = cart1[itemKey] || 0;

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.card1}
                  onPress={() =>
                    router.push({
                      pathname: "/Open",
                      params: {
                        item: JSON.stringify(item),
                      },
                    })
                  }
                >
                <View style={styles.card1} key={index}>
                  <View style={styles.card}>
                    <View style={styles.imageContainer}>
                      <Image style={styles.image} source={item.image} />

                      {count === 0 ? (
                        <TouchableOpacity
                          onPress={() => addToCart(itemKey)}
                          style={styles.overlayAddBtn}
                        >
                          <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.overlayCounter}>
                          <TouchableOpacity onPress={() => decrementItem(itemKey)}>
                            <Text style={styles.counterBtn}>−</Text>
                          </TouchableOpacity>
                          <Text style={styles.counterText}>{count}</Text>
                          <TouchableOpacity onPress={() => incrementItem(itemKey)}>
                            <Text style={styles.counterBtn}>+</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>

                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.sub}>{item.sub}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>{item.price}</Text>
                    {item.original && (
                      <Text style={styles.originalPrice}>{item.original}</Text>
                    )}
                  </View>
                  
                </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <Animated.View
        style={[
          styles.cartBar,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.cartBarText}>{totalItems} items in cart</Text>
        <TouchableOpacity style={styles.viewCartBtn}>
          <Text style={styles.viewCartText}>View Cart</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 15,

  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    width: 100,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 7
  },
  card1: {
    flexDirection: "column",

  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 90,
    width: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  overlayAddBtn: {
    position: "absolute",
    top: -20,
    right: 20,
    backgroundColor: "#fff",
    borderColor: "#00a99d",
    borderWidth: 1.5,
    borderRadius: 18,
    paddingHorizontal: 7,
    paddingVertical: 0,
    zIndex: 10,
  },
  overlayCounter: {
    position: "absolute",
    top: -20,
    right: 23,
    backgroundColor: "#fff",
    borderColor: "#00a99d",
    borderWidth: 1.5,
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#222",
    textAlign: "left",
  },
  sub: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    textAlign: "left",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  price: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#888",
  },
  addButtonText: {
    color: "#00a99d",
    fontWeight: "bold",
    fontSize: 20,
    justifyContent: "flex-start",


  },
  counterBtn: {
    fontSize: 10,
    color: "#00a99d",
    paddingHorizontal: 8,
    fontWeight: "bold",
  },
  counterText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  cartBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cartBarText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  viewCartBtn: {
    backgroundColor: "#00A99E",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    margin: 16,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,


  },
  bar: {
    marginRight: 8,
  },
});
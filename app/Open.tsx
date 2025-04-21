import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Icon } from 'react-native-elements';

export default function OpenScreen() {
  const { item } = useLocalSearchParams();
  const product = typeof item === 'string' ? JSON.parse(item) : item;

  return (
    <ScrollView style={styles.container}>
      {/* Product Banner */}
      <Image
        source={require('../assets/images/medicine.png')}
        style={styles.mainImage}
      />

      {/* Price Section */}
      <View style={styles.priceSection}>
        <Text style={styles.name}>{product?.name || 'Sestil_AD Tablet'}</Text>
        <Text style={styles.subInfo}>Prescription Drug ✅</Text>
        <Text style={styles.priceRow}>
          <Text style={styles.price}>₹99 </Text>
          <Text style={styles.mrp}>₹149 </Text>
          <Text style={styles.discount}>21% off</Text>
        </Text>
        <Text style={styles.premiumRow}>
          ₹79 <Text style={styles.premiumDiscount}>30% off</Text> - 
          <Text style={styles.premiumText}> Get Premium</Text>
        </Text>
        <Text style={styles.delivery}>Deliver in 10 minutes • Kempapura 1st street</Text>

        <TouchableOpacity style={styles.addToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Gift prompt */}
      <TouchableOpacity style={styles.giftBox}>
        <Text style={styles.giftText}>🎁 Don’t you want a gift from mom pharmacy?</Text>
        <Text style={styles.giftLink}>Avail this Gift Here →</Text>
      </TouchableOpacity>

      {/* Details of medicine */}
      <View style={styles.details}>
        <Text style={styles.detailsHeader}>Details of medicine</Text>
        <Text style={styles.detailsText}>
          Sestil–AD Tablet (Aceclofenac 100 mg + Drotaverine 80 mg) relieves pain, inflammation,
          and muscle spasms in conditions like cramps and kidney stones. It works by reducing pain and relaxing muscles.
        </Text>
        <Text style={styles.detailsText}>
          Take one tablet twice daily after meals. Common side effects include nausea, dizziness, and stomach upset. 
          Avoid alcohol and use cautiously in liver, kidney, or heart conditions. Pregnant women should consult a doctor.
        </Text>
        <Text style={styles.detailsText}>Store in a cool, dry place.</Text>

        {/* Store Info */}
        <View style={styles.storeInfo}>
          <Text style={styles.boldText}>Manufacturer / Marketer:</Text>
          <Text> Random Health Limited</Text>
          <Text style={styles.boldText}>Consume Type:</Text>
          <Text> Oral</Text>
          <Text style={styles.boldText}>Return Policy:</Text>
          <Text> Returnable within X days</Text>
          <Text style={styles.boldText}>Expiry:</Text>
          <Text> xx/xx/xxxx</Text>
        </View>
      </View>

      {/* Recommended Section */}
      <Text style={styles.recommendedTitle}>Recommended</Text>
      <View style={styles.recommendedRow}>
        <View style={styles.recommendedCard}>
          <Image
            source={require('../assets/images/medicine.png')}
            style={styles.recommendedImage}
          />
          <Text>Nasoclear Saline</Text>
          <Text style={styles.priceRow}>
            <Text style={styles.price}>₹99 </Text>
            <Text style={styles.mrp}>₹149 </Text>
            <Text style={styles.discount}>21% off</Text>
          </Text>
          <TouchableOpacity style={styles.addToCartSmall}>
            <Text style={styles.addToCartTextSmall}>Add to cart</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recommendedCard}>
          <Image
            source={require('../assets/images/medicine.png')}
            style={styles.recommendedImage}
          />
          <Text>Strepsils Orange</Text>
          <Text style={styles.priceRow}>
            <Text style={styles.price}>₹99 </Text>
            <Text style={styles.mrp}>₹149 </Text>
            <Text style={styles.discount}>21% off</Text>
          </Text>
          <TouchableOpacity style={styles.addToCartSmall}>
            <Text style={styles.addToCartTextSmall}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mainImage: { width: '100%', height: 200, resizeMode: 'contain' },

  priceSection: { padding: 16 },
  name: { fontSize: 18, fontWeight: 'bold' },
  subInfo: { color: '#4caf50', marginTop: 2 },
  priceRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  price: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  mrp: { textDecorationLine: 'line-through', color: '#777', marginHorizontal: 4 },
  discount: { color: 'red', fontWeight: '600' },
  premiumRow: { marginTop: 6, color: '#333' },
  premiumDiscount: { color: 'green', fontWeight: 'bold' },
  premiumText: { color: '#007bff', fontWeight: '500' },
  delivery: { marginTop: 10, fontSize: 12, color: '#555' },
  addToCart: {
    backgroundColor: '#007bff',
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  addToCartText: { color: '#fff', fontWeight: 'bold' },

  giftBox: {
    backgroundColor: '#f2f2f2',
    marginHorizontal: 16,
    marginVertical: 14,
    padding: 10,
    borderRadius: 8,
  },
  giftText: { fontWeight: '500' },
  giftLink: { color: '#007bff', marginTop: 4 },

  details: { paddingHorizontal: 16 },
  detailsHeader: { fontWeight: 'bold', fontSize: 16, marginVertical: 10 },
  detailsText: { color: '#333', marginBottom: 8, lineHeight: 20 },
  storeInfo: { marginTop: 10 },
  boldText: { fontWeight: 'bold' },

  recommendedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  recommendedRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  recommendedCard: {
    width: '45%',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  recommendedImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  addToCartSmall: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  addToCartTextSmall: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
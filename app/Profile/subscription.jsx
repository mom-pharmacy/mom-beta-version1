import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MySubscriptionCard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Premium'); 

  const handleManageSubscription = () => {
    setModalVisible(true); 
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setModalVisible(false); 
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>

      <Text style={styles.title}>My Subscription</Text>


      <View style={styles.card}>

        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{selectedPlan} Subscription</Text>
          <Text style={styles.cardStatus}>Active</Text>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.cardDetail}>
            <Text style={styles.boldText}>Plan:</Text> {selectedPlan} Plan
          </Text>
          <Text style={styles.cardDetail}>
            <Text style={styles.boldText}>Price:</Text> 
            {selectedPlan === 'Basic' && '$4.99/month'}
            {selectedPlan === 'VIP' && '$14.99/month'}
            {selectedPlan === 'Premium' && '$9.99/month'}
          </Text>
          <Text style={styles.cardDetail}>
            <Text style={styles.boldText}>Expires:</Text> May 10, 2025
          </Text>
        </View>


        <TouchableOpacity style={styles.actionButton} onPress={handleManageSubscription}>
          <Icon name="cogs" size={18} color="white" style={styles.actionIcon} />
          <Text style={styles.actionText}>Manage Subscription</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Subscription Plan</Text>

            <TouchableOpacity style={styles.planButton} onPress={() => handleSelectPlan('Basic')}>
              <Text style={styles.planText}>Basic Plan - $4.99/month</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.planButton} onPress={() => handleSelectPlan('VIP')}>
              <Text style={styles.planText}>VIP Plan - $14.99/month</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.planButton} onPress={() => handleSelectPlan('Premium')}>
              <Text style={styles.planText}>Premium Plan - $9.99/month</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    padding:39,
    backgroundColor: '#f8f8f8', 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 20,
    margin: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardStatus: {
    fontSize: 16,
    color: '#4CAF50', 
    fontWeight: 'bold',
  },
  cardInfo: {
    marginBottom: 15,
  },
  cardDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#00A99D', 
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    marginRight: 10,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  planButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  planText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#f44336', 
    paddingVertical: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default MySubscriptionCard;
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

const HealthRecords = () => {
  const [labTests, setLabTests] = useState([
    { id: '1', name: 'Blood Test', date: '2025-04-15', result: 'Normal' },
    { id: '2', name: 'X-Ray', date: '2025-03-10', result: 'No Issues' },
  ]);
  const [medicalHistory, setMedicalHistory] = useState([
    { id: '1', condition: 'Hypertension', diagnosed: '2015-06-20' },
    { id: '2', condition: 'Type 2 Diabetes', diagnosed: '2018-09-15' },
  ]);

  const handleUpload = () => {
    Alert.alert('Upload functionality is not implemented yet.');
  };

  const renderLabTestItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {item.name} ({item.date}) - {item.result}
      </Text>
    </View>
  );

  const renderMedicalHistoryItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {item.condition} (Diagnosed: {item.diagnosed})
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Records</Text>

      <Text style={styles.sectionTitle}>Lab Test Results</Text>
      <FlatList
        data={labTests}
        renderItem={renderLabTestItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No lab tests available.</Text>}
      />

      <Text style={styles.sectionTitle}>Medical History</Text>
      <FlatList
        data={medicalHistory}
        renderItem={renderMedicalHistoryItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No medical history available.</Text>}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload Record</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginTop: 20,
  },
  item: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HealthRecords;

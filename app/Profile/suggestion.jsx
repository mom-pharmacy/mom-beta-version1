import React, { useState, useCallback } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  Pressable,
} from 'react-native';
import { Checkbox, Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Rating } from '@kolking/react-native-rating'; // This works in Expo if installed via npm

const App = () => {
  const [review1, setReview] = useState('');
  const [review2, setReview1] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [technical, setTechnical] = useState(false);
  const [nonTechnical, setNonTechnical] = useState(false);
  const [needMedicine, setNeedMedicine] = useState(false);

  const [rating, setRating] = useState(0);

  const handleChange = useCallback(
    (value) => setRating(value),
    []
  );

  const handleSubmit = () => {
    if (review1.trim() === '' || review2.trim() === '') {
      Alert.alert('Please fill in both fields before submitting.');
      return;
    }

    setSubmitted(true);
    Alert.alert('Submitted');
  };

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <ImageBackground
            source={require('../../assets/images/img1.jpeg')}
            style={styles.image}
          >
            <View style={styles.content}>
              <Text style={styles.title}>Any suggestions</Text>

              <View style={styles.checkboxContainer}>
                <View style={styles.checkboxRow}>
                  <Checkbox
                    status={technical ? 'checked' : 'unchecked'}
                    onPress={() => setTechnical(!technical)}
                    color="#fff"
                  />
                  <Text style={styles.checkboxLabel}>Technical</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox
                    status={nonTechnical ? 'checked' : 'unchecked'}
                    onPress={() => setNonTechnical(!nonTechnical)}
                    color="#fff"
                  />
                  <Text style={styles.checkboxLabel}>Non-Technical</Text>
                </View>
                <View style={styles.checkboxRow}>
                  <Checkbox
                    status={needMedicine ? 'checked' : 'unchecked'}
                    onPress={() => setNeedMedicine(!needMedicine)}
                    color="#fff"
                  />
                  <Text style={styles.checkboxLabel}>Need Medicine</Text>
                </View>
              </View>

              <TextInput
                style={styles.reviewBox1}
                placeholder="Suggestions"
                placeholderTextColor="#000"
                multiline
                numberOfLines={4}
                value={review1}
                onChangeText={setReview}
              />
              <TextInput
                style={styles.reviewBox2}
                placeholder="Write your review here..."
                placeholderTextColor="#000"
                multiline
                numberOfLines={4}
                value={review2}
                onChangeText={setReview1}
              />
              <View style={{ marginBottom: 20 }}>
               <Rating size={30} rating={rating} onChange={handleChange} />
              </View>

              <Pressable
  onPress={handleSubmit}
  disabled={submitted}
  style={({ pressed }) => [
    styles.button,
    submitted && styles.buttonDisabled,
    pressed && !submitted && styles.buttonPressed,
  ]}
>
  <Text style={styles.buttonText}>
    {submitted ? 'Submitted' : 'Submit'}
  </Text>
</Pressable>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    backgroundColor: '#00000070',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  reviewBox1: {
    backgroundColor: '#ffffffcc',
    color: '#000',
    padding: 20,
    margin: 15,
    width: 300,
    borderRadius: 8,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  reviewBox2: {
    backgroundColor: '#ffffffcc',
    color: '#000',
    padding: 20,
    margin: 15,
    width: 300,
    borderRadius: 8,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00A99D',
    /*gradientBegin:"#874f00",
          gradientEnd:"#f5ba57",
          gradientDirection:"diagonal",*/ 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonPressed: {
    backgroundColor: '#0056b3',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;

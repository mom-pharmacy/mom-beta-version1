import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Alert,
    Linking,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,

} from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import useLocation from '@/hooks/useLocation';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { AuthContext } from '@/context/authContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Home() {

    const { locationName } = useLocation();
    const {userDetails} = useContext(AuthContext);
    console.log('User Details from home page:', userDetails);

    return (
        <>
        <ProtectedRoute>
          <View style={styles.container}>
            <Text>Login Successfull</Text>
          </View>
            </ProtectedRoute>
        </>
    );
}

const styles = StyleSheet.create({
    total: {
        backgroundColor: '#00a99d'
    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#b2e0dc'
    }

});

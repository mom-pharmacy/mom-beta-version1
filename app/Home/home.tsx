import React, {useState } from 'react';
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

import Categories from './categories';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { useLocationContext } from '../locationContext';


export default function Home() {

    const { address } = useLocationContext();

    const handleUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
                multiple: false,
            });

            if (result.assets && result.assets.length > 0) {
                Alert.alert('File Selected', result.assets[0].name);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick document');
        }
    };

    const handleWhatsApp = () => {
        Linking.openURL('https://wa.me/+91 7702068334');
    };

    const handleCall = () => {
        Linking.openURL('tel:7702068334');
    };
    const [showHeader, setShowHeader] = useState(true);

    const handleScroll = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        setShowHeader(scrollY < 50);
    };

    const handleLocation = () => {
        router.push('../myaddress')
    }

    return (
        <>

            <SafeAreaView style={styles.total}>

                {showHeader && <View style={styles.main}>

                    <View style={styles.leftSection}>
                        <Text style={styles.head}>10 minutes</Text>
                        <TouchableOpacity onPress={handleLocation} >
                            <View style={styles.row}>
                                <FontAwesome6 name="location-dot" size={22} color="white" />
                                <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
                                    {address || "Fetching location..."} <Entypo style={{ marginTop: 7 }} name="chevron-down" size={24} color="white" />
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.cartContainer} >
                        <FontAwesome6 name="user-large" size={24} color="white" onPress={() => router.push('../myProfile')} />
                    </View>
                </View>

                }

                <View style={styles.search}>
                    <EvilIcons name="search" size={24} color="black" style={styles.bar} />
                    <TextInput placeholder="search medicines"
                        style={styles.input}

                    />

                </View>

                <ScrollView
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.doctor}>
                        <View style={[styles.each, styles.activeTab]}>
                            <MaterialIcons name="medication" size={24} color="white" />
                            <Text style={styles.iconText}>Pharmacy</Text>
                        </View>
                        <View style={styles.each}>
                            <TouchableHighlight onPress={() => router.push('../BloodFinder/myProfile')}>
                                <View>
                                    <MaterialCommunityIcons name="blood-bag" size={25} color="white" />
                                    <Text style={styles.iconText}>Bloodbank</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.each}>
                            <FontAwesome name="stethoscope" size={24} color="white" />
                            <Text style={styles.iconText}>Doctor</Text>
                        </View>
                        <View style={styles.each}>
                            <FontAwesome name="flask" size={24} color="white" />
                            <Text style={styles.iconText}>Lab Tests</Text>
                        </View>
                        <View style={styles.each}>
                            <FontAwesome5 name="hospital" size={25} color="white" />
                            <Text style={styles.iconText}>Hospitals</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <TouchableHighlight
                            activeOpacity={0.6}
                            style={styles.card}
                            underlayColor="#DDDDDD"
                            onPress={handleUpload}
                        >
                            <View style={styles.innerCard}>
                                <Image
                                    source={require('../../assets/images/upload.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.label}>Upload</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            activeOpacity={0.6}
                            style={styles.card}
                            underlayColor="#DDDDDD"
                            onPress={handleWhatsApp}
                        >
                            <View style={styles.innerCard}>
                                <Image
                                    source={require('../../assets/images/whatsapp.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.label}>WhatsApp</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            activeOpacity={0.6}
                            style={styles.card}
                            underlayColor="#DDDDDD"
                            onPress={handleCall}
                        >
                            <View style={styles.innerCard}>
                                <Image
                                    source={require('../../assets/images/phone.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.label}>Call</Text>
                            </View>
                        </TouchableHighlight>

                    </View>


                    <View style={styles.popular2} >

                        <View style={styles.popular}>
                            <Text style={styles.pop}>Popular Medicines</Text>
                            <Categories showSearch={false} />
                        </View>
                        <View>
                            <Text style={{ textAlign: 'center', color: 'gray', marginBottom: 40 }}>PROD - v 1.0.1(2)</Text>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'gray' }}>Live</Text>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: 'gray' }}>Healthy</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: 'gray' }}>Crafted with  <AntDesign name="heart" size={24} color="red" />  in India </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: 'gray' }}>Powered by </Text>



                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

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
    },
    card: {
        padding: 10,
        backgroundColor: 'white',
        height: 120,
        width: 110,
        borderRadius: 12,
        alignItems: 'center',

        elevation: 3,
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    innerCard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: 40,
        width: 40,
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold'
    },
    location: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    head: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 15,
        marginTop: 10,
        marginBottom: -5,
        color: '#fff'
    },
    header: {
        backgroundColor: "#00a99d"
    },
    input: {
        height: 45,
        width: 355,

        fontSize: 16,
        flex: 1,

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginLeft: 8,
        gap: 9
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 5,

    },

    leftSection: {
        flex: 1,
        marginRight: 10,
    },
    locationText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 2,
        flexShrink: 1,
        marginBottom:10
    },

    cartContainer: {
        width: 40,
        alignItems: 'flex-end',
        marginRight: 10
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
    popular2: {
        backgroundColor: "white",
        height: 'auto',

    },
    popular: {

        marginTop: 20,
        marginLeft: 15,


    },
    pop: {
        fontSize: 20,
        fontWeight: "bold",

    },
    doctor: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,

    },
    each: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        marginTop: 5,
        fontSize: 12,
        color: '#fff',
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#fff',
        paddingBottom: 5,
        marginBottom: -10,
        borderRadius: 3
    },
    searchWrapper: {
        backgroundColor: '#fff',
        zIndex: 999,
    },
    scrollContent: {
        paddingBottom: 100,
        marginTop: 10,
    },

    blood: {
        height: 65,
        marginHorizontal: 12,
        marginTop: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        flexDirection: 'row'

    }


});

import React, { useState } from 'react';
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

} from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Categories from './categories';
import useLocation from '@/hooks/useLocation';
import { router } from 'expo-router';

export default function Home() {
    const { locationName } = useLocation();
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
        setShowHeader(scrollY < 50); // Hide header when scrolled more than 50px
    };



    return (
        <>
            <SafeAreaView style={styles.total}>

                {showHeader && <View style={styles.main}>

                    <View style={styles.leftSection}>
                        <Text style={styles.head}>10 minutes</Text>
                        <View style={styles.row}>
                            <FontAwesome6 name="location-dot" size={24} color="white" />
                            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
                                {locationName || "Fetching location..."}
                            </Text>
                        </View>
                    </View>


                    <View style={styles.cartContainer} >
                        <FontAwesome6 name="user-large" size={24} color="white" onPress={()=>router.replace('../myProfile')} />
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
        padding: 20,
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
        marginLeft: 3,
        flexShrink: 1,
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
        flexDirection: 'row',       // Align items in a row
        justifyContent: 'space-around', // Space between items
        alignItems: 'center',       // Align items vertically
        padding: 10,
        // Optional: background color
    },
    each: {
        flex: 1,                    // Take equal space
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        marginTop: 5,
        fontSize: 14,
        color: '#fff',
    },
    activeTab: {
        borderBottomWidth: 4,
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
        marginTop: 10, // So content won't overlap search bar
    },




});

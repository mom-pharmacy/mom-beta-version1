import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    TextInput,
    Button,
    router,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const donors = [
    {
        id: '1',
        name: 'Lanka Srinivas',
        phone: '6715116151',
        bloodGroup: 'AB+',
        available: true,
        state: 'Andhra Pradesh',
        city: 'Vijayawada',
    },
    {
        id: '2',
        name: 'Yash',
        phone: '7897254067',
        bloodGroup: 'B+',
        available: false,
        state: 'Karnataka',
        city: 'Bangalore',
    },
    {
        id: '3',
        name: 'Nikshitha',
        phone: '8777002889',
        bloodGroup: 'A+',
        available: true,
        state: 'Telangana',
        city: 'Hyderabad',
    },
];

const States = [['Telangana']];
const Cities = [['Vijayawada', 'Bangalore', 'Hyderabad']];

export const FilterComponent = ({ bloodGroup, setBloodGroup, state, setState, city, setCity, setShowFilter }) => (
    <View >
        <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 24, marginTop: 20 }}>
            Select the Details
        </Text>

        <View>
            
            <View style={styles.pickerContainer} >
                <Picker selectedValue={bloodGroup} onValueChange={setBloodGroup}>
                    <Picker.Item label="Select Blood Group" value="" />
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="O-" value="O-" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="AB-" value="AB-" />
                </Picker>
            </View>
        </View>

        <View>
            
            <View style={styles.pickerContainer}>
                <Picker selectedValue={state} onValueChange={setState}>
                    <Picker.Item label="Select state" value="" />
                    {States[0].map((s) => (
                        <Picker.Item label={s} value={s} key={s} />
                    ))}
                </Picker>
            </View>
        </View>

        <View>
      
            <View style={styles.pickerContainer}>
                <Picker selectedValue={city} onValueChange={setCity}>
                    <Picker.Item label="Select city" value="" />
                    {Cities[0].map((c) => (
                        <Picker.Item label={c} value={c} key={c} />
                    ))}
                </Picker>
            </View>
        </View>

        <TouchableOpacity onPress={() => setShowFilter(false)} style={styles.applyBtn}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Search</Text>
        </TouchableOpacity>
    </View>
);





const AvailableDonorsScreen = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [bloodGroup, setBloodGroup] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [suggestion, setSuggestion] = useState('');
    const [customReason, setCustomReason] = useState('');

    const handleSend = () => {
        const finalReport = suggestion === 'Other' ? customReason : suggestion;
        console.log('Report:', finalReport);
        setSuggestion('');
        setCustomReason('');
        setShowModal(false);
    };

    const filteredDonors = donors.filter((donor) => {
        return (
            (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
            (state ? donor.state === state : true) &&
            (city ? donor.city === city : true)
        );
    });

    const DonorCard = ({ donor }) => (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{donor.name}</Text>
                <Text style={styles.phone}>{donor.phone}</Text>
                <Text style={styles.blood}>Blood Group: {donor.bloodGroup}</Text>
                <Text style={[styles.status, { color: donor.available ? 'green' : 'red' }]}>
                    {donor.available ? 'Available' : 'Not Available'}
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.reportBtn} onPress={() => setShowModal(true)}>
                    <Text style={styles.btnText}>Report</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callBtn}>
                    <Ionicons name="call" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Available Donors</Text>
                <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
                    <Icon name="filter" size={24} color="#00796B" />
                </TouchableOpacity>
            </View>

            {showFilter ? (
                <FilterComponent
                    bloodGroup={bloodGroup}
                    setBloodGroup={setBloodGroup}
                    state={state}
                    setState={setState}
                    city={city}
                    setCity={setCity}
                    setShowFilter={setShowFilter}
                />
            ) : (
                <FlatList
                    data={filteredDonors}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <DonorCard donor={item} />}
                />
            )}

            <Modal visible={showModal} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <View style={styles.closeButtonContainer}>
                            <Button title="✕" onPress={() => setShowModal(false)} />
                        </View>

                        <Text style={styles.title}>Report</Text>
                        <Text style={styles.subtitle}>
                            Didn’t find what you are looking for? Please report an issue or missing information
                        </Text>

                        <Picker
                            selectedValue={suggestion}
                            onValueChange={(itemValue) => setSuggestion(itemValue)}
                            style={{ width: '100%', marginBottom: 20 }}
                        >
                            <Picker.Item label="Select a reason" value="" />
                            <Picker.Item label="Not Available" value="Not Available" />
                            <Picker.Item label="Not Answering the Call" value="Not Answering the Call" />
                            <Picker.Item label="Not Interested" value="Not Interested" />
                            <Picker.Item label="wrong number" value="wrong number" />
                            <Picker.Item label="Donated recently" value="donated recently" />
                            <Picker.Item label="Can't donate anymore" value="Can't donate anymore" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>

                        {suggestion === 'Other' && (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your reason"
                                placeholderTextColor="#999"
                                multiline
                                numberOfLines={3}
                                value={customReason}
                                onChangeText={setCustomReason}
                            />
                        )}

                        <Button title="Send" onPress={handleSend} color="#FF6F91" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    info: {
        flex: 2,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    phone: {
        color: '#333',
    },
    blood: {
        color: '#333',
    },
    status: {
        fontWeight: 'bold',
        marginTop: 4,
    },
    actions: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    reportBtn: {
        backgroundColor: '#00A99D',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 50,
        marginBottom: 5,
    },
    callBtn: {
        backgroundColor: '#00A99D',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 50,
    },
    btnText: {
        color: '#fff',
    },
    filterLabel: {
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 20,
    },
    pickerContainer: {
        marginRight: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        margin:7
    },
    applyBtn: {
        backgroundColor: '#00a99d',
        padding: 10,
        borderRadius: 10,
        margin: 7,
    },
    overlay: {
        flex: 1,
        backgroundColor: '#00000040',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        elevation: 10,
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        opacity: 0.5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#4B4B4B',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 15,
        fontSize: 14,
        color: '#000',
        width: '100%',
        textAlignVertical: 'top',
        marginBottom: 20,
    },
});

export default AvailableDonorsScreen;
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const donarDetails = [
    {
        name: "John Doe",
        age: 30,
        bloodGroup: "A+",
        area: "Downtown",
        contact: 97887833432,
        state: "Andhra Pradesh",
        city: "Hyderabad",
        country: "India",
    },
    {
        name: "Harry Potter",
        age: 30,
        bloodGroup: "AB+",
        area: "Downtown",
        contact: 97887833432,
        state: "Andhra Pradesh",
        city: "Hyderabad",
        country: "India",
    },
    {
        name: "Albus Dumbledore",
        age: 30,
        bloodGroup: "B+",
        area: "Downtown",
        contact: 97887833432,
        state: "Andhra Pradesh",
        city: "Hyderabad",
        country: "India",
    },
    {
        name: "Emma Watson",
        age: 30,
        bloodGroup: "AB+",
        area: "Downtown",
        contact: 97887833432,
        state: "Andhra Pradesh",
        city: "Hyderabad",
        country: "India",
    },
    {
        name: "Fred Weasley",
        age: 30,
        bloodGroup: "B-",
        area: "Downtown",
        contact: 97887833432,
        state: "Andhra Pradesh",
        city: "Hyderabad",
        country: "India",
    },
    {
        name: "Katniss Everdeen",
        age: 30,
        bloodGroup: "AB",
        area: "Downtown",
        contact: 97887833432,
        state: "Andhra Pradesh",
        city: "Hyderabad",
        country: "India",
    },
]

const States = [["Andhra Pradesh", "Telangana", "Tamil Nadu", "Karnataka", "Kerala", "Maharashtra", "Gujarat", "Rajasthan", "Uttar Pradesh", "Bihar"]]
const Cities = [["Hyderabad", "Vijayawada", "Visakhapatnam", "Tirupati", "Warangal", "Guntur", "Nellore", "Kakinada", "Rajahmundry", "Anantapur"]]

function BloodDonarDetails() {

    const [DonarDetailsData, setDonorDetailsData] = useState(donarDetails);
    const [state, setState] = useState("Andhra Pradesh");
    const [city, setCity] = useState("Hyderabad");
    const [bloodGroup, setBloodGroup] = useState("B+");
    const [area, setArea] = useState("Downtown");

    const [showFilter, setShowFilter] = useState(false);


    useEffect(() => {
        const filteredData = donarDetails.filter((donar) => {
            return (
                (state ? donar.state === state : true) &&
                (city ? donar.city === city : true) &&
                (bloodGroup ? donar.bloodGroup === bloodGroup : true)
            );
        }
        );
        setDonorDetailsData(filteredData);
    }, [state, city, bloodGroup, area]);

    const FilterComponent = () => {
        return <View>
            <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 24, marginTop: 20 }}>Select the Details</Text>
            <View>
                <Text style={{ marginHorizontal: 20, fontWeight: "bold", fontSize: 22, marginTop: 20 }}>Blood Group</Text>
                <View style={{ borderWidth: 1, borderRadius: 10, margin: 10, padding: 1 }}>
                    <Picker
                        selectedValue={bloodGroup}
                        onValueChange={(itemValue) => setBloodGroup(itemValue)}
                    >
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
                <Text style={{ marginHorizontal: 20, fontWeight: "bold", fontSize: 22, marginTop: 20 }}>States</Text>
                <View style={{ borderWidth: 1, borderRadius: 10, margin: 10, padding: 1 }}>
                    <Picker
                        selectedValue={state}
                        onValueChange={(itemValue) => setState(itemValue)}
                    >
                        <Picker.Item label="Select state" value="" />
                        {States[0].map((state) => {
                            return <Picker.Item label={state} value={state} key={state} />
                        })}

                    </Picker>
                </View>
            </View>

            <View>
                <Text style={{ marginHorizontal: 20, fontWeight: "bold", fontSize: 22, marginTop: 20 }}>Cities</Text>
                <View style={{ borderWidth: 1, borderRadius: 10, margin: 10, padding: 1 }}>
                    <Picker
                        selectedValue={city}
                        onValueChange={(itemValue) => setCity(itemValue)}
                    >
                        <Picker.Item label="Select city" value="" />
                        {Cities[0].map((state) => {
                            return <Picker.Item label={state} value={state} key={state} />
                        })}

                    </Picker>
                </View>
            </View>
            <View >
                <TouchableOpacity onPress={() => { setShowFilter(false) }} style={{ backgroundColor: "red", padding: 10, borderRadius: 10, margin: 20 }}>
                    <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Apply Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    }


    const DonorDetailsComponents = () => {
        return <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 10 }}>
            <Text style={{ fontWeight: "bold", margin: 10, fontSize: 24 }}>Donor Details</Text>
            <TouchableOpacity onPress={() => { setShowFilter(true) }} style={{ backgroundColor: "red", padding: 10, borderRadius: 10, margin: 20 }}>
                <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Filter</Text>
            </TouchableOpacity>
            </View>
            <FlatList data={DonarDetailsData} renderItem={({ item }) => {
                return <View key={item.name} style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", padding: 20, margin: 5, flex: 1, backgroundColor: "white", elevation: 2 }}>
                    <View style={{ borderWidth: 1, borderRadius: 50, width: 60, height: 60, justifyContent: "center", alignItems: "center", backgroundColor: "red", marginRight: 12 }}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, textAlign: "center" }}> {item.bloodGroup}</Text>
                    </View>
                    <View>
                        <Text style={styles.donorDetails}>Name: {item.name}</Text>
                        <Text>Age: {item.age}</Text>
                        <Text>Phone:{item.contact}</Text>
                        <View>
                            <Text style={{color:"gray" , fontSize:12 , marginVertical:5}}><Ionicons name="location" /> {item.area}, {item.city}, {item.state}, {item.country}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 5 }}>
                            <TouchableOpacity onPress={() => { }} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Ionicons name="call-outline" size={24} color="black" style={{ margin: 5 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Ionicons name="mail-outline" size={24} color="black" style={{ margin: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            }} keyExtractor={(item, index) => index.toString()} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }}>
            </View>
        </View>
    }


    return (
        <View>
           {showFilter? <FilterComponent />:<DonorDetailsComponents />}
            {/* <DonorDetailsComponents /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    donorDetails: {
        marginVertical: 2,
        fontSize: 16
    }
})

export default BloodDonarDetails;
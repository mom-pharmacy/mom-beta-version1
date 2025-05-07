import { View, Text, StyleSheet, Image, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import MedicineCard from '@/components/MedicineCard'
import { userAuth } from '@/context/authContext'

const medicineData = [
    {
        _id: "kakhfajhdfjhjdfk1",
        name: 'Dolo 650',
        price: 120,
        quantity: 2
    },
    {
        _id: "kakhfajhdfjhjdfk2",
        name: 'Dolo 650',
        price: 120,
        quantity: 2
    },
    {
        _id: "kakhfajhdfjhjdfk3",
        name: 'Dolo 650',
        price: 120,
        quantity: 2
    },
    {
        _id: "kakhfajhdfjhjdfk4",
        name: 'Dolo 650',
        price: 120,
        quantity: 2
    },
]

export default function OrderConfirmation() {

    // const {ExtractParseToken} = userAuth()
    // const authToken = await ExtractParseToken()


    // useEffect(()=>{
    //     const ActiveOrderDetails = async ()=>{
    //         try{
    //             const options = {
    //                 headers:{
    //                     "Authorization":`Bearer ${authToken}`,
    //                     "Content-Type":"application/json"
    //                 }
    //             }
    //             const response = await fetch(`https://mom-beta-server1.onrender.com/api/orderbyid/${} `)
    //         }catch(e){
    //             console.log("Error in getting order details" , e)
    //         }
    //     }
    // } , [])


    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.ETAContainer}>
                    <View>
                        <Text style={styles.heading}>Arriving in</Text>
                        <Text style={styles.ETA}>5 MIN</Text>
                        <Text style={styles.ETAPara}>Your Medicine is getting ready</Text>
                    </View>
                    <View style={styles.ETAImageContainer}>
                        <Image source={require("@/assets/images/blood.gif")} style={styles.ETAImage} />
                    </View>
                </View>
                <View style={styles.deliverBoyContainer}>
                    <View style={styles.waitingDeliveryBoy}>
                        <Image style={styles.deliveryProfile} source={require('@/assets/images/deliveryProfile.png')} />
                        <Text style={styles.deliveryBoyHeading}>Waiting for Heal Potter...</Text>
                    </View>
                    <ActivityIndicator />
                </View>
                <View style={styles.addressContainer}>
                    <View style={styles.locationContainer}>
                    <Ionicons name='location' style={{fontSize:22 , color:"#00a99d"}} />
                    <Text style={styles.addressTitle}>Delivering to...</Text>
                    </View>
                    <View style={styles.location}>
                    <Text>GS Grand pg , 1st floor ,Madhapur,123 Housenumber, Telangana, 500001</Text>
                    </View>
                </View>
                <View style={styles.medicineContainer}>
                    <Text style={styles.yourMedicine}>Your Medicine</Text>
                    {medicineData.map(item=><MedicineCard key={item._id} name={item.name} quantity={item.quantity} price={item.price} imageUrl={require("@/assets/images/medicine.png")}/>)}
                </View>
               
               
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    ETAContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        padding: 20,
        borderRadius: 10,
        marginTop: 30
    },
    heading: {
        fontWeight: "bold",
        fontSize: 23
    },
    ETA: {
        fontWeight: "bold",
        color: "#00a99d",
        fontSize: 26,
        marginVertical: 1,

    },
    ETAPara: {
        fontWeight: "semibold",
        width: 150,
    },
    mainContainer: {
        padding: 20,
        backgroundColor: "white"

    },
    ETAImage: {
        width: 80,
        height: 80,
    },
    ETAImageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    deliverBoyContainer: {
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12
    },
    deliveryBoyHeading: {
        fontWeight: "bold",
        fontSize: 12

    },
    location:{
        marginHorizontal:12
    },
    deliveryProfile: {
        width: 30,
        height: 30,
        marginRight: 4
    },
    waitingDeliveryBoy: {
        flexDirection: 'row',
        alignItems: "center"
    },
    addressContainer:{
        padding:12, 
        backgroundColor:"#d5f2dd",
        marginVertical:12 ,
        borderRadius:12

    },
    addressTitle:{
        fontWeight:"bold",
        fontSize:16 ,

    },
    locationContainer:{
        flexDirection:"row",
        gap:2 , 
        alignItems:"center"
    },
    yourMedicine:{
        margin:12,
        fontWeight:"bold",
        fontSize:17 ,
        marginTop:24
    },
    medicineContainer:{
        borderRadius:12,
        borderColor:"#ccc",
        borderWidth:1
    }

    
})
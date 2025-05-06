import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function MedicineCard({name , quantity , price  , imageUrl}) {
  return (
    <View style={styles.cardContainer}>
        <View style={styles.medicineContainer}>
            <Image source={require("@/assets/images/medicine.png")} style={{width:30 , height:30}} />
        <View style={styles.card }>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.quantity}>quantity:{quantity}</Text>
        </View>
        </View>
        
        <View>
            <Text style={styles.price}>{price}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer:{
        padding:12,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"

    },
    medicineContainer:{
        flexDirection:"row",
        alignItems:"center",
        gap:4 ,
    },
    card:{
        marginLeft:10
    },
    title:{
        fontWeight:"bold"
    },
    quantity:{
        color:"#cccccc"
    },
    price:{
        fontWeight:"bold",
        fontSize:14 ,

    }
})
import { Stack } from "expo-router";
import { LocationProvider } from "./locationContext";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "./cartContext";


export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
    <LocationProvider>
        <Stack screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Home" />
        </Stack>
        </LocationProvider>
        </CartProvider>
        </AuthProvider>
     
   
  )

}

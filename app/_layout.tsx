import { Stack } from "expo-router";
import { CartProvider } from './cartContext';
import { AuthProvider } from "@/context/authContext";

export default function RootLayout() {
  return(
    <AuthProvider>
    <CartProvider>
    <Stack screenOptions={{headerShown:false}}>
      
      <Stack.Screen name="Home" />
    </Stack>
    </CartProvider>
    </AuthProvider>
  ) 
    
}

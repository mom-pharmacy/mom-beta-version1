import { Stack } from "expo-router";
import { CartProvider } from './cartContext';
import { AuthProvider } from "@/context/authContext";
import { LocationProvider } from "./locationContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RootLayout() {
  return (
    <AuthProvider>
       <LocationProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Home" />
        </Stack>

      </CartProvider>
      </LocationProvider>
    </AuthProvider>
  )

}




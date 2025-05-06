import { Stack } from "expo-router";
import { LocationProvider } from "./locationContext";
import { AuthProvider } from "@/context/authContext";


export default function RootLayout() {
  return (
    <AuthProvider>
    <LocationProvider>
        <Stack screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Home" />
        </Stack>
        </LocationProvider>
        </AuthProvider>
     
   
  )

}

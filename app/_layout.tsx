import { Stack } from "expo-router";
import { LocationProvider } from "./locationContext";


export default function RootLayout() {
  return (
    
    <LocationProvider>
        <Stack screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Home" />
        </Stack>
        </LocationProvider>

     
   
  )

}

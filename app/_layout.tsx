import { Stack } from "expo-router";
import { CartProvider } from './cartContext';

export default function RootLayout() {
  return(
    <CartProvider>
    <Stack screenOptions={{headerShown:false}}>
      
      <Stack.Screen name="Home" />
    </Stack>
    </CartProvider>
  ) 
    
}

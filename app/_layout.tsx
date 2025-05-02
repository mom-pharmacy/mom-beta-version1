import { Stack } from "expo-router";

import { AuthProvider } from "@/context/authContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" />
        </Stack>
    </AuthProvider>
  )

}

import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "../data/styling/colors";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AuthContext from "../utilites/AuthContext";
import { getToken } from "../api/storage";
export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      setIsAuthenticated(token ? true : false);
      setIsReady(true);
    };
    checkToken();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
         </AuthContext.Provider>
        </QueryClientProvider>
        <StatusBar barStyle={"light-content"} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

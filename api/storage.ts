import { getItemAsync, setItemAsync } from "expo-secure-store";

export const getToken = async () => {
    try {
        return await getItemAsync("token");
    } catch (error) {
        console.error("Error getting token:", error);
    }
};

export const storeToken = async (token: string) => {
    try {
        await setItemAsync("token", token);
    } catch (error) {
        console.error("Error storing token:", error);
    }
};
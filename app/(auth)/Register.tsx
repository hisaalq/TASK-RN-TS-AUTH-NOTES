import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import colors from "../../data/styling/colors";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import UserInfo from "@/types/UserInfo";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigation = useNavigation();
  
  const {mutate, isPending} = useMutation({
    mutationKey: ["register"],
    mutationFn: (userInfo: UserInfo) => register(userInfo, profileImage),
    onSuccess: () => {
      navigation.navigate("/(tabs)/(home)/index" as never);
    },
    onError: (error) => {
      console.log(error);
    },
  })

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", padding: 20 }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Register
          </Text>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Create your account
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Name"
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
          />

          <TouchableOpacity style={{ marginTop: 20 }} onPress={pickImage}>
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Upload Profile Image
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => mutate({ email, password, name, profileImage })}
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Already have an account?{" "}
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({});

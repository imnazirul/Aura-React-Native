import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Logo } from "@/Constant/images";
import { CreateUser } from "@/lib/AppWrite";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
    const [userData, setUserData] = useState({
      username:"",
      email: "",
      password: "",
    });
    console.log(userData);

    const handleSignUp = async()=>{
      if(userData.username || userData.email || userData.password){
         try{
          const results = await CreateUser(userData.email, userData.password, userData.username)
          console.log(results);
          router.push("/Home")
        }
        catch(err){
          console.log(err);
        }
      }else{
        return Alert.alert("Error", "Please Fill Up the Form First")
      }
    }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="h-[100vh] py-2 px-4 flex justify-center ">
          <View className="mb-8 ">
            <View className="flex-row flex  gap-1 w-[120px]  items-center">
              <Image
                className="w-8 h-12 mb-2"
                source={Logo}
                resizeMode="contain"
              />
              <Text className="text-white text-4xl font-psemibold">Aura</Text>
            </View>
            <Text className="text-xl font-psemibold text-white mt-8">
              Sign Up
            </Text>
          </View>
          <InputField value={userData.username}
            onChange={(e: any) => setUserData({ ...userData, username: e })} placeholder="Your Unique Username" labelText="Username" />
          <InputField    value={userData.email}
            onChange={(e: any) => setUserData({ ...userData, email: e })}
             placeholder="Your Email" keyboardType="email-address" labelText="Email" />
          <InputField value={userData.password}
            onChange={(e: any) => setUserData({ ...userData, password: e })} placeholder="Password" labelText="Password" inputType="password" />
          <CustomButton handlePress={handleSignUp} title="Sign Up"  />
          <Text className="text-center font-pregular text-gray-100 mt-4 text-lg">Don’t have an account? <Link href="/(auth)/SignIn" className="font-psemibold text-secondary">SignIn</Link></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

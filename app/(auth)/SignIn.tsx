import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Logo } from "@/Constant/images";
import useGlobalContext from "@/context/useContext";
import { getCurrentUser, signIn } from "@/lib/AppWrite";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {user,setUser, setIsLoggedIn} = useGlobalContext()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
   if(userData.email && userData.password){
    setIsLoading(true);
    try {
      const response = await signIn(userData.email, userData.password);
      const results = await getCurrentUser()
      setUser(results);
      setIsLoggedIn(true);
      router.replace("/Home");
    }catch(err:any){
      console.log(err);
      Alert.alert("Warning", err? err.message : "Something Went Wrong");
      router.replace("/Home");
    }finally{
      setIsLoading(false);
      router.replace("/Home");
    }
  }else{
    return Alert.alert("Error", "Please Fill Up the Form First");
  }
}

useEffect(()=>{
  if(user){
    router.replace("/Home")
  }
},[user]) 

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
              Sign In
            </Text>
          </View>
          <InputField
            value={userData.email}
            onChange={(e: any) => setUserData({ ...userData, email: e })}
            keyboardType="email-address"
            labelText="Email"
          />
          <InputField
            value={userData.password}
            onChange={(e: any) => setUserData({ ...userData, password: e })}
            labelText="Password"
            inputType="password"
          />
          <CustomButton isLoading={isLoading} handlePress={handleLogin} title="Sign In" />
          <Text className="text-center font-pregular text-gray-100 mt-4 text-lg">
            Don’t have an account?{" "}
            <Link
              href="/(auth)/SignUp"
              className="font-psemibold text-secondary"
            >
              Signup
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

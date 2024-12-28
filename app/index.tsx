import { Link, router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { CardImage, Logo, Path } from "@/Constant/images";

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="mt-8 flex justify-center items-center">
          <View className="flex-row gap-1 w-[120px] justify-center items-center">
            <Image
              className="w-8 h-12 mb-2"
              source={Logo}
              resizeMode="contain"
            />
            <Text className="text-white text-4xl font-psemibold">Aura</Text>
          </View>
          <Image
            className="h-[300px] mt-8"
            source={CardImage}
            resizeMode="contain"
          />
          <View className="relative">
            <Text className="font-psemibold text-3xl px-4 text-white text-center mt-5">
              Discover Endless Possibilities with
              <Text className="text-secondary-100"> Aura</Text>
            </Text>
            <Image
              source={Path}
              className="w-20 absolute right-4 -bottom-4"
              resizeMode="contain"
            />
          </View>
          <Text className="text-gray-100 mt-2 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aura
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className={`bg-secondary rounded-xl mt-8 min-h-[55px] mx-4 flex flex-row justify-center items-center`}
          onPress={() => router.push("/(auth)/SignIn")}
        >
          <Text className="font-psemibold text-lg text-primary text-center">
            Continue With Email
          </Text>
        </TouchableOpacity>
        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

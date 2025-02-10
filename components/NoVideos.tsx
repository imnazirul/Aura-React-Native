import { router } from "expo-router";
import { View, Text, Image } from "react-native";

// import { images } from "../constants";
import CustomButton from "./CustomButton";
import { Empty } from "@/Constant/images";

const EmptyState = ({ title, subtitle }:any) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={Empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/(tabs)/Create")}
        containerStyle="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
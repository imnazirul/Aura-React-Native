import icons from "@/Constant/icons";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

type propsType = {
  labelText: string;
  inputType?: "password" | "normal";
};

const InputField = ({ labelText, inputType = "normal",placeholder,value, onChange, ...props }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="mb-4">
      <Text className="text-gray-100 mb-1 font-pmedium">{labelText}</Text>
      <View className="h-16 relative px-4 w-full bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
        <TextInput value={value} onChangeText={onChange} placeholder={placeholder} secureTextEntry={(inputType == "password" && !showPassword)} className="flex-1 text-lg w-full placeholder:text-gray-100 focus:border-secondary text-white"  {...props} />
        {inputType == "password" && (
          <TouchableOpacity className="absolute w-8 h-8 top-[25%] right-4" onPress={()=> setShowPassword(!showPassword)} activeOpacity={0.5}>
            <Image
              className=" w-8 h-8 "
              resizeMode="contain"
              source={showPassword ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;

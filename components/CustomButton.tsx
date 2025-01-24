import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";

const CustomButton = ({
  title,
  isLoading,
  containerStyle,
  textStyle,
  handlePress,
}: {
  title: string;
  isLoading?: boolean;
  containerStyle?: string;
  textStyle?: string;
  handlePress?: any;
}) => {
  const osName = Platform.OS;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl mt-8 min-h-[55px]  flex flex-row justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={handlePress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size={osName === "ios" ? "small" : 30}
        />
      ) : (
        <Text
          className={`font-psemibold text-lg text-primary text-center ${textStyle}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

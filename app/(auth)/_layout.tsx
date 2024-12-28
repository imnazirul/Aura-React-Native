import { SplashScreen, Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    return (
        <Stack>
          <Stack.Screen name="SignIn" options={{headerShown:false}}  />    
          <Stack.Screen name="SignUp" options={{headerShown:false}}  />    
        </Stack>
    );
};

export default RootLayout;
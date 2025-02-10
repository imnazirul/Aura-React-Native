import { SplashScreen, Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

const AuthLayout = () => {
    return (
        <Stack>
          <Stack.Screen name="SignIn" options={{headerShown:false}}  />    
          <Stack.Screen name="SignUp" options={{headerShown:false}}  />    
        </Stack>
    );
};

export default AuthLayout;
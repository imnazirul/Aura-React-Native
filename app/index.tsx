import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from 'expo-router';
import splashAnimation from "../assets/splash.json";

const SplashScreen = () => {

    useEffect(() => {
      setTimeout(() => {
        router.replace("/App");
      }, 2500); // Adjust timing as needed
    }, [router]);


  return (
    <View className='h-full w-full bg-transparent'>
    <LottieView   style={{ flex: 1 }} 
     resizeMode='cover' 
      source={splashAnimation} // Path to your Lottie animation
      autoPlay
      loop={true} // Set to false if you want it to play only once
    />
  </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
      backgroundColor: "", // Adjust background color
    },
  });
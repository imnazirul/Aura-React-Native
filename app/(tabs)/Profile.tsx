import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Checkbox from 'expo-checkbox';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useGlobalContext from '@/context/useContext'
import icons from '@/Constant/icons'
import { signOut } from '@/lib/AppWrite'
import { router } from 'expo-router'

const Profile = () => {
  const {user, isLoading, setUser, setIsLoggedIn} = useGlobalContext()
  const isChecked = false
  console.log(user);
  const handleLogOut = async() => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace("/(auth)/SignIn")
  }
  return (
       <SafeAreaView className='h-full bg-primary px-4'>
         <View className='flex items-end justify-end mt-4'>
          <TouchableOpacity onPress={handleLogOut} className='w-8-h-8'>
            <Image className='w-6 h-6' source={icons.logout} />
          </TouchableOpacity>
         </View>
         <View className='flex items-center justify-center mt-8'>
          <Image source={{uri:user?.avatar}} className='w-16 h-16 rounded-md'/>
          <Text className='text-white font-psemibold text-lg mt-1'>{user?.username}</Text>
         </View>
         <Checkbox
          // style={styles.checkbox}
          // value={isChecked}
          // onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
         <View>
          <View><Text></Text></View>
         </View>
       </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})
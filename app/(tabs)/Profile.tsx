import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
       <SafeAreaView className='h-full bg-primary flex items-center justify-center'>
         <Text className='text-4xl text-center text-white'>Profile</Text>
       </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Trending = ({posts}:{posts:any}) => {
  return (
    <FlatList data={posts}
    keyExtractor={(item)=> item.id.toString()}
     renderItem={({item})=>(
        <Text className='text-3xl text-white'>{item.id}</Text>
    )} 
    horizontal
    />
  )
}

export default Trending

const styles = StyleSheet.create({})
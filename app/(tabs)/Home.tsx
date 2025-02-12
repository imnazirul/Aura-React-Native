import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Empty, Logo } from "@/Constant/images";
import EmptyState from "@/components/NoVideos";
import useGlobalContext from "@/context/useContext";
import { getAllPosts } from "@/lib/AppWrite";
import useAppwrite from "@/lib/UseAppWrite";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const {user} = useGlobalContext()
  const {data:posts , refetch, loading} = useAppwrite(getAllPosts)
  const onRefresh =async()=>{
    refetch()
  }


  return (
    <SafeAreaView className="bg-primary h-full" >
      <FlatList
        data={posts}
        keyExtractor={(item:any) => item.$id}
        renderItem={({ item }) => (
          <VideoCard videoData={item} />
        )}
        ListHeaderComponent={() => {
          return (
            <View className="flex my-6 px-4 space-y-6">
              <View className="flex justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white uppercase">
                    {user?.username}
                  </Text>
                </View>

                <View className="mt-1.5">
                  <Image
                    source={Logo}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-lg font-pregular text-gray-100 mb-3">
                  Latest Videos
                </Text>

              </View>
            </View>
          );
        }}
        ListEmptyComponent={()=>{ if(!loading) {return<EmptyState title="No Videos Found!" subtitle="Be the first one to upload a video " />}}
        }
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  );
};

export default Home;

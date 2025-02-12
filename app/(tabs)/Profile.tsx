import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useGlobalContext from "@/context/useContext";
import icons from "@/Constant/icons";
import { getUserPosts, signOut } from "@/lib/AppWrite";
import { router } from "expo-router";
import useAppwrite from "@/lib/UseAppWrite";
import EmptyState from "@/components/NoVideos";
import VideoCard from "@/components/VideoCard";

const Profile = () => {
  const { user, isLoading, setUser, setIsLoggedIn } = useGlobalContext();
  const {
    data: posts,
    loading,
    refetch,
  } = useAppwrite(() => getUserPosts(user?.$id));

  const handleLogOut = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/(auth)/SignIn");
  };

  const onRefresh = async () => {
    refetch();
  };

  return (
    <SafeAreaView className="h-full bg-primary px-4">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard videoData={item} />}
        ListHeaderComponent={() => (
          <View>
            <View className="flex items-end justify-end mt-4">
              <TouchableOpacity onPress={handleLogOut} className="w-8-h-8">
                <Image className="w-6 h-6" source={icons.logout} />
              </TouchableOpacity>
            </View>
            <View className="flex items-center justify-center mt-8">
              <Image
                source={{ uri: user?.avatar }}
                className="w-16 h-16 rounded-md"
              />
              <Text className="text-white font-psemibold text-lg mt-1">
                {user?.username}
              </Text>
            </View>
            <View className="flex justify-center flex-row gap-16 mb-4 text-center mt-8">
              <View>
                <Text className="text-xl text-center font-semibold text-white mt-4">
                  {posts?.length || 0}
                </Text>
                <Text className="text-lg text-center font-medium text-white">
                  Posts
                </Text>
              </View>
              <View>
                <Text className="text-xl text-center font-semibold text-white mt-4">
                  0
                </Text>
                <Text className="text-lg text-center font-medium text-white">
                  Views
                </Text>
              </View>
            </View>
            <Text className="text-xl font-semibold text-white text-center">Your Videos</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found!"
            subtitle="Be the first one to upload a video "
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});

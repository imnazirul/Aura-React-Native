import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import icons from "@/Constant/icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const UserVideoCard = ({ videoData }: { videoData: any }) => {
  const {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  } = videoData;
  const [play, setPlay] = useState(false);

  const player = useVideoPlayer(video, (player) => {
    player.loop = false;
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  useEffect(() => {
    if (!isPlaying) {
            setPlay(false);    
    }
  }, [isPlaying]);

  useEffect(()=>{
    if (play) {
        player.play();
      }
  },[play])

  return (
    <View className="mb-4 px-4">
      <View className="flex flex-row gap-2 justify-between">
        <View className="flex-row gap-2">
          {/* <Image
            source={{ uri: avatar }}
            className="border-yellow-500 border-2 rounded-sm size-12"
          /> */}
          <View className="flex ">
            <Text className="text-white font-psemibold text-pse">
              {title.slice(0, 30)}
            </Text>
            <Text className="text-white">{username}</Text>
          </View>
        </View>
        <Image source={icons.menu} className="size-6" resizeMode="contain" />
      </View>
      <View className="h-[200px] mt-1 rounded-md overflow-hidden">
        {play ? (
          <VideoView
            style={styles.video}
            player={player}
            nativeControls
            allowsFullscreen
            allowsPictureInPicture
            contentFit="cover"
          />
        ) : (
          <View className="relative">
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              onPress={() => setPlay(true)}
            >
              <Image source={icons.play} className=" size-16 " />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default UserVideoCard;

const styles = StyleSheet.create({
  video: {
    marginTop: 20,
    borderRadius: 10,
    zIndex: 1000,
    width: "100%",
    height: 200,
  },
});

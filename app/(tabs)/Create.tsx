import { Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video';
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '@/components/InputField'
import * as DocumentPicker from "expo-document-picker";
import icons from '@/Constant/icons';
import CustomButton from '@/components/CustomButton';

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<any>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const openPicker = async(Type:string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: Type == "video" ? "video/*" : "image/*",
    })
    if(!result.canceled){
      console.log(result.assets[0]);
      if(Type == "video"){
        setForm({...form, video: result.assets[0]})
      }
      if(Type == "image"){
        setForm({...form, thumbnail: result.assets[0]})
      }
    }else{
      Alert.alert("File", "Please Select a file")
    }
  }

  const player = useVideoPlayer(form?.video?.uri, player => {
    player.loop = true;
    player.play();
  });


  return (
    <SafeAreaView className=' bg-primary  '>
      <ScrollView className='px-6 h-full '>
       <View className='flex items-start my-8 justify-start'> 
          <Text className='text-white font-psemibold text-2xl '>Upload Video</Text>
          </View>
          <View className='mb-8'>
          <InputField InputClassName="flex-1 w-full placeholder:text-gray-500" ClassName="flex-1"  labelText="Video Title" placeholder="Give your video a catchy Title"/>
          <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={()=> openPicker("video")} className="bg-black-100 w-full  rounded-xl mt-2 flex justify-center items-center">
          { form.video ? <Text className='text-white py-4'>Change</Text>:<View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
            <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>}
          </TouchableOpacity>
          {
            form.video &&  <VideoView
             style={styles.video}
              player={player} nativeControls allowsFullscreen allowsPictureInPicture contentFit='cover'  /> 
 
          }
          </View>
          <View className="mt-2 space-y-2">
          <Text className="text-base mb-2 text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-48 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <InputField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video"
          handleChangeText={(e:any) => setForm({ ...form, prompt: e })}
          InputClassName="flex-1 w-full placeholder:text-gray-500"
        />

        <CustomButton
          title="Submit & Publish"
          // handlePress={submit}
          // containerStyles="mt-7"
          isLoading={true}
        />
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({
  video: {
    marginTop: 20,
    borderRadius: 10,
    zIndex: 1000,
    width: "100%",
    height: 200,
  },

});
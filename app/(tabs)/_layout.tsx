import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Tabs } from "expo-router";
import icons from "@/Constant/icons";

const TabIcon = ({icon, color, name, focused}:{icon: any, color: string, name: string, focused: any}) => {
  return (
    <View className="flex flex-col gap-2 mt-4  items-center ">
      <Image className="size-6" tintColor={color} source={icon} resizeMode="cover" />
      <Text className={`text-white ${focused ? "font-psemibold": "font-pregular"} text-xs w-full`}
      style={{color:color}}
      >{name}</Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs screenOptions={{  tabBarActiveTintColor: "#FFA001",
      tabBarInactiveTintColor: "#CDCDE0",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#161622",
        // borderTopWidth: 1,
        borderTopColor: "#232533",
        height: 60,
        paddingTop:5,
      },
    }}>
      <Tabs.Screen
       name="Home"
       options={{
         title: "Home",
         headerShown: false,
         tabBarIcon: ({ color, focused }) => (
           <TabIcon
             icon={icons.home}
             color={color}
             name="Home"
             focused={focused}
           />
         ),
         
        }}
      //  listeners={{
      //   tabPress: () => {
      //     if (router.canDismiss()) {
      //       router.dismissAll()
      //     }
      //   },}}
      />
        <Tabs.Screen
          name="Explore"
          options={{
            title: "Explore",
            headerShown: false,
            tabBarIcon: ({color,focused})=> <TabIcon color={color} focused={focused} icon={icons.explore} name="Explore" />
          }}
        />
      <Tabs.Screen
        name="Create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({color,focused})=> <TabIcon color={color} focused={focused} icon={icons.plus} name="Create" />
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({color,focused})=> <TabIcon color={color} focused={focused} icon={icons.profile} name="Profile" />
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

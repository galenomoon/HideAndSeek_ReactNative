import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'twrnc';


export default function Message({route, navigation}) {
  const [data, setData]  = useState(route.param);
  console.warn(data)
  return (
    <View style={tw`flex flex-1 items-center justify-center`}>
      <Image
      style={tw`w-50 h-50`}
      source={{uri: data?.url_image}}
      />
      <Text>{data?.message}</Text>
    </View>
  )
}
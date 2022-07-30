import { View, Text, Image, TouchableOpacity as TO } from 'react-native'
import React from 'react'

//styles
import tw from 'twrnc'

export default function Start({ navigation }) {
  return (
    <View style={tw`flex-1 items-center justify-center w-full bg-[#c971eb]`}>
      <Image style={tw`w-80 h-48`} source={require('../../assets/logo_app.png')} />
      <TO
        onPress={() => navigation.navigate('QRCode')}
        style={tw`bg-white py-3 px-5  rounded-2xl flex-row mt-5`}>
        <Text style={tw`text-[#c971eb] font-bold text-lg text-center`}>Vamos brincar de esconde-esconde?</Text>
      </TO>
    </View>
  )
}
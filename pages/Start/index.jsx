import { View, Text, TouchableOpacity as TO } from 'react-native'
import React from 'react'

//styles
import Ionicons from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

export default function Start({ navigation }) {
  return (
    <View style={tw`flex-1 items-center justify-center w-full bg-purple-800`}>
      <View style={tw`flex-row justify-around bg-purple-700 p-5 w-full items-center`}>
        <View style={tw`flex-col items-center`}>
          <View style={tw`flex flex-row justify-around w-[90%]`}>
            <Ionicons name="ios-rocket" size={30} color="#FFF" />
            <Text style={tw`text-white font-bold text-xl text-center`}>Vamos brincar de</Text>
            <Ionicons name="ios-moon" size={30} color="#FFF" />
          </View>
          <Text style={tw`text-white font-bold text-3xl text-center`}>Esconde-Esconde?</Text>
        </View>
      </View>
      <TO
        onPress={() => navigation.navigate('QRCode')}
        style={tw`bg-white py-3 px-5 rounded-2xl flex-row mt-8`}>
        <Text style={tw`text-purple-800 font-bold text-xl text-center`}>clique aqui para começar</Text>
      </TO>
    </View>
  )
}
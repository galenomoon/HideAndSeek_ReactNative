import { View, Text, Image, TouchableOpacity as TO } from 'react-native'
import React, { useState, useEffect } from 'react'

//styles
import tw from 'twrnc'

//lib
import { BarCodeScanner } from 'expo-barcode-scanner';


export default function Start({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner?.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (
    <View style={tw`flex-1 items-center justify-center w-full bg-[#c971eb]`}>
      <Image style={tw`w-80 h-48`} source={require('../../assets/logo_app.png')} />
      <TO
        onPress={() => navigation.navigate('QRCode', { hasPermission })}
        style={tw`bg-white py-3 px-5  rounded-2xl flex-row mt-5`}>
        <Text style={tw`text-[#c971eb] font-bold text-lg text-center`}>Vamos brincar de esconde-esconde?</Text>
      </TO>
    </View>
  )
}
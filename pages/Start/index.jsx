import { View, Text, Image, TouchableOpacity as TO } from 'react-native'
import React, { useState, useEffect } from 'react'

//styles
import tw from 'twrnc'
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient style={tw`flex flex-1 justify-center items-center pt-50`} colors={['#DD295B', '#E1306C', '#DD295B', '#b92f29']} >
      <Image style={tw`w-80 h-67 absolute top-40`} source={require('../../assets/love-location.png')} />
      <Image style={tw`w-80 h-45`} source={require('../../assets/logo_app.png')} />
      <TO
        onPress={() => navigation.navigate('QRCode', { hasPermission })}
        style={tw`px-5 bg-white py-3 px-5 shadow-lg rounded-2xl flex-row mt-10 relative`}>
        <Text style={tw`text-pink-600 font-semibold text-lg text-center`}>
          Vamos brincar de esconde-esconde?
        </Text>
      </TO>
      <View style={tw`flex flex-row items-center  absolute bottom-0 left-0`}>
        <Image style={tw`w-25 h-35 ml-5`} source={require('../../assets/astrunaut-credits.png')} />
        <View style={tw`flex items-start `}>
          <Text style={tw`flex flex-wrap font-light opacity-50 text-white text-sm text-center`}>
            Developed by:
          </Text>
          <Text style={tw`flex flex-wrap font-light opacity-50 text-white text-2xl text-center`}>
            Guilherme Galeno
          </Text>
        </View>
      </View>
    </LinearGradient>
  )
}
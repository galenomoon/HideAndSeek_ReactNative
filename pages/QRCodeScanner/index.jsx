import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity as TO, Alert } from 'react-native';

// BarCode
import { BarCodeScanner } from 'expo-barcode-scanner';

// Styles
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

export default function QRCodeScanner({ navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
  
      let qrCodeData = (JSON.parse(data))
      if (qrCodeData.id) navigation.navigate('Message', qrCodeData)
  };

  if (hasPermission === null) return <Text style={tw`font-bold text-white text-lg`}>Pedindo Permissão pra usar a câmera</Text>;

  if (hasPermission === false) return <Text style={tw`font-bold text-white text-lg`}>tem q permitir :( </Text>

  return (
    <View style={tw`flex-1 w-full items-center justify-center bg-black`}>
      <View style={tw`absolute flex-row justify-between p-2 items-center w-full mt-3 z-10 top-4`}>
        <TO onPress={() => navigation.navigate('Start')} style={tw`flex flex-row items-center p-2`}>
          <Icon name="arrow-left" size={50} color="#FFF" />
        </TO>
        <View style={tw`flex flex-row items-center`}>
          <Icon name="balloon" size={70} color="#FFF" />
          <Text style={tw`text-white text-[30px]`}>0/3</Text>
        </View>
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={tw`absolute w-[125%] h-[125%]`}
      />
      {scanned ?
        <TO
          style={tw`flex items-center justify-center bg-purple-600 rounded-full px-5 py-3`}
          onPress={() => setScanned(false)}
        >
          <Text style={tw`text-2xl font-bold text-white`}>Ativar Scanner</Text>
        </TO> :
        <Icon name="scan-helper" color='#FFF' size={300} />
      }
    </View>
  );
}


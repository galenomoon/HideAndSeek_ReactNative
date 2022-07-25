import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';

// BarCode
import { BarCodeScanner } from 'expo-barcode-scanner';

// Styles
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

export default function QRCodeScanner() {
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
    Alert.alert("By Astronauta:", data, [{ text: "OK" }]);
  };

  if (hasPermission === null) return <Text>Requesting for camera permission</Text>;

  if (hasPermission === false) return <Text>No access to camera</Text>

  return (
    <View style={tw`flex-1 w-full items-center justify-center bg-black`}>
      <View style={tw`absolute flex-row items-center mt-3 top-1 left-1`}>
        <Icon name="balloon" size={80} color="#FFF" />
        <Text style={tw`text-white text-[40px]`}>0/3</Text>
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned ?
        <Button title={'Ativar Scanner'} onPress={() => setScanned(false)} /> :
        <Icon name="scan-helper" color='#FFF' size={300} />
      }
    </View>
  );
}


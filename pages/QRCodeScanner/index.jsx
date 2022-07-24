import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
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

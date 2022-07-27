import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity as TO, Alert } from 'react-native';

// BarCode
import { BarCodeScanner } from 'expo-barcode-scanner';

//components
import MessageModal from '../../components/MessageModal';

// Styles
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

export default function QRCodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [qrCodeData, setQRCodeData] = useState(false);
  const [balloonList, setBalloonList] = useState([])

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    let list = balloonList
    let currentData = (data.indexOf("http") && -1 && data.indexOf('exp') && -1) && (JSON.parse(data))
    currentData?.id ? [setQRCodeData(currentData), setModalVisible(true), setScanned(true)] : [Alert.alert(
      "Essa mensagem não foi enviada pelo Seu Astronauta",
      `Mas ele diz: ${data}`,
      [{ text: "sair", onPress: () => setScanned(false) }]
    ), setScanned(true)]
  };

  if (hasPermission === null) return <Text style={tw`font-bold text-white text-lg`}>Pedindo Permissão pra usar a câmera</Text>;
  if (hasPermission === false) return <Text style={tw`font-bold text-white text-lg`}>tem q permitir :( </Text>

  return (
    <>
      <View style={tw`flex-1 w-full items-center justify-center bg-black`}>
        <View style={tw`absolute flex-row justify-between p-2 items-center w-full mt-3 z-10 top-4`}>
          <TO onPress={() => navigation.navigate('Start')} style={tw`flex flex-row items-center p-2`}>
            <Icon name="arrow-left" size={50} color="#FFF" />
          </TO>
          <TO onPress={() => setModalVisible(true)} style={tw`flex flex-row items-center`}>
            <Icon name="balloon" size={70} color="#FFF" />
            <Text style={tw`text-white text-[30px]`}>{balloonList.length}/3</Text>
          </TO>
        </View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={tw`absolute w-[125%] h-[125%]`}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
        {scanned && modalVisible ? <View style={tw`absolute z-50 bg-black opacity-70 w-full h-full`} /> : <Icon name="scan-helper" color='#FFF' size={300} />}
      </View>
      <MessageModal setBalloonList={setBalloonList} balloonList={balloonList} qrCodeData={qrCodeData} closeModal={() => [setScanned(false), setModalVisible(false)]} modalVisible={modalVisible} />
    </>
  );
}


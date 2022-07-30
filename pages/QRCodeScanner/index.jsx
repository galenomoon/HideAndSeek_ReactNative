import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity as TO, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// barCode
import { BarCodeScanner } from 'expo-barcode-scanner';

//components
import MessageModal from '../../components/MessageModal';
import BalloonListModal from '../../components/BalloonListModal';

// styles
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

export default function QRCodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [modalMessageVisible, setMessageModalVisible] = useState(false);
  const [modalBalloonListVisible, setBalloonListModalVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [qrCodeData, setQRCodeData] = useState(false);
  const [balloonList, setBalloonList] = useState([])
  const hasModalOpened = modalMessageVisible || modalBalloonListVisible

  useEffect(() => {
    AsyncStorage.getItem("balloonList").then(value => setBalloonList(JSON.parse(value)));
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const balloonFound = (data) => {
    let list = balloonList
    const isAlreadyFound = list.some(obj => obj.id === data.id)

    !isAlreadyFound && [list.push(data), setBalloonList(list), AsyncStorage.setItem("balloonList", JSON.stringify(list))]
    setScanned(true)
    Alert.alert(
      isAlreadyFound ? "Você já encontrou esse balão" : "Novo Balão Encontrado!",
      isAlreadyFound ? "Deseja ler novamente?" : "Seu Astronauta tem uma mensagem pra você:",
      [
        { text: "abrir", onPress: () => [setQRCodeData(data), setMessageModalVisible(true)] },
        isAlreadyFound && { text: "cancelar", onPress: () => [setScanned(false)] }
      ])

  }

  const handleBarCodeScanned = ({ data }) => {
    let currentData = (data.indexOf("http") && -1 && data.indexOf('exp') && -1) && (JSON.parse(data))
    currentData?.id ? balloonFound(currentData) : [Alert.alert(
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
          <TO
            onLongPress={() => balloonList.length > 0 &&
              [Alert.alert(
                "Eiei, cuidado meu bom 🤨", "Você quer zerar o histórico de balões encontrados?",
                [
                  { text: "sim", onPress: () => [setBalloonList([]), setScanned(false), AsyncStorage.setItem("balloonList", JSON.stringify([])), navigation.navigate('Start')] },
                  { text: "cancelar", onPress: () => setScanned(false) }
                ]
              ), setScanned(true)]
            }
            delayLongPress={1000}
            onPress={() => [setBalloonListModalVisible(true), setScanned(true)]}
            style={tw`flex flex-row items-center`}>
            <Icon name="balloon" size={70} color="#FFF" />
            <Text style={tw`text-white text-[30px]`}>{balloonList.length}/3</Text>
          </TO>
        </View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={tw`absolute w-[125%] h-[125%]`}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
        {(hasModalOpened && scanned) ? <View style={tw`absolute z-50 bg-black opacity-70 w-full h-full`} /> : <Icon name="scan-helper" color='#FFF' size={300} />}
      </View>
      <BalloonListModal setQRCodeData={setQRCodeData} setScannedTrue={() => setScanned(true)} setMessageModalVisible={setMessageModalVisible} balloonList={balloonList} closeModal={() => [setScanned(false), setBalloonListModalVisible(false)]} modalVisible={modalBalloonListVisible} />
      <MessageModal qrCodeData={qrCodeData} closeModal={() => [setScanned(false), setMessageModalVisible(false)]} modalVisible={modalMessageVisible} />
    </>
  );
}
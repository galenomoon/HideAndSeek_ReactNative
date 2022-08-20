import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity as TO, Alert, Image } from 'react-native';

//utils
import AsyncStorage from '@react-native-async-storage/async-storage';
import qrCodeModel from '../../utils/qrCodeModel'

// barCode
import { BarCodeScanner } from 'expo-barcode-scanner';

//components
import MessageModal from '../../components/MessageModal';
import BalloonListModal from '../../components/BalloonListModal';
import Tutorial from '../../components/Tutorial'

// styles
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

export default function QRCodeScanner({ navigation, route }) {
  const [hasPermission] = useState(route.params.hasPermission);
  const [modalMessageVisible, setMessageModalVisible] = useState(false);
  const [modalBalloonListVisible, setBalloonListModalVisible] = useState(false);
  const [balloonList, setBalloonList] = useState([])
  const [modalTutorial, setModalTutorial] = useState(false)
  const [scanned, setScanned] = useState(false);
  const [qrCodeData, setQRCodeData] = useState(false);
  const hasModalOpened = modalMessageVisible || modalBalloonListVisible || modalTutorial

  useEffect(() => {
    AsyncStorage.getItem("balloonList").then(value => value ? [setBalloonList(JSON.parse(value)), setModalTutorial(JSON.parse(value)?.length === 0)] : AsyncStorage.setItem("balloonList", JSON.stringify([]))).catch(() => AsyncStorage.setItem("balloonList", JSON.stringify([])));
  }, []);

  const balloonFound = (data) => {
    let list = balloonList
    const isAlreadyFound = balloonList.some(obj => obj.id === data.id)

    !isAlreadyFound && [list?.push(data), setBalloonList(list), AsyncStorage.setItem("balloonList", JSON.stringify(list))]
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
    let currentData = (data?.indexOf("http") && -1 && data?.indexOf('exp') && -1) && (JSON.parse(data))
    currentData?.id ?
      balloonFound(currentData) :
      [Alert.alert("Essa mensagem não foi enviada pelo Seu Astronauta", `Mas ele diz: ${data}`, [{ text: "sair", onPress: () => setScanned(false) }]),
      setScanned(true)]
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
            onLongPress={() => balloonList?.length > 0 &&
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
          >
            <View style={tw`flex flex-row items-center justify-center`}>
              <Icon name="balloon" size={70} color="#FFF" />
              <Text style={tw`text-white text-4xl`}>{balloonList ? balloonList.length : 0}/{qrCodeModel?.length}</Text>
            </View>
          </TO>
        </View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={tw`absolute w-[125%] h-[125%]`}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
        {(hasModalOpened && scanned) ? <View style={tw`absolute z-50 bg-black opacity-60 w-full h-full`} /> : <Icon name="scan-helper" color='#FFF' size={300} />}
      </View>
      <Tutorial modalVisible={modalTutorial} openBalloonList={() => [setBalloonListModalVisible(true), setScanned(true)]} closeModal={() => [setScanned(false), setModalTutorial(false)]} />
      <BalloonListModal setQRCodeData={setQRCodeData} setScannedTrue={() => setScanned(true)} setMessageModalVisible={setMessageModalVisible} balloonList={balloonList} closeModal={() => [setScanned(false), setBalloonListModalVisible(false)]} modalVisible={modalBalloonListVisible} />
      <MessageModal qrCodeId={qrCodeData} closeModal={() => [setScanned(false), setMessageModalVisible(false)]} modalVisible={modalMessageVisible} />
    </>
  );
}
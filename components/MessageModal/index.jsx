import { Modal, Text, Image, TouchableOpacity as TO, Linking, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

//utils
import QRCodes from "../../utils/qrCodeModel";

//styles
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import tw from "twrnc";

const MessageModal = ({ modalVisible, closeModal, qrCodeId }) => {
  const [qrCodeData, setQRCodeData] = useState({})

  useEffect(() => {
    QRCodes.map((qr) => qr?.id === qrCodeId?.id && setQRCodeData(qr))
  }, [modalVisible])

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`w-[100%] h-[100%] justify-center items-center rounded-2xl`}>
          <View style={tw`bg-white w-[95%] h-[95%] items-center rounded-2xl justify-center overflow-hidden pb-2`}>
            <View style={tw`flex-1 items-end justify-center w-full`}>
              <TO style={tw`z-53`} onPress={() => closeModal()}>
                <Icon name="close" style={tw`m-3`} color={'#333'} size={40} />
              </TO>
            </View>
            <View style={tw`flex-12 justify-center w-full`}>
              <View style={tw`flex-5 overflow-hidden`}>
                <Image style={tw`w-full h-full`} source={{ uri: qrCodeData?.img_url }} />
              </View>
              <Text style={tw`text-2xl font-bold m-2 text-center`}>{qrCodeData?.title}</Text>
              <ScrollView style={tw`flex-4 mx-2 bg-gray-100 rounded-lg px-3`}>
                <Text style={tw`text-xl`}>{qrCodeData?.message}</Text>
              </ScrollView>
              {qrCodeData?.btn_link &&
                <TO onPress={() => Linking.openURL(qrCodeData?.btn_link)} style={tw`${qrCodeData?.id === QRCodes?.length ? 'bg-red-600' : 'bg-black'} flex mx-2 py-3 px-5 rounded-lg items-center justify-evenly mt-5`}>
                  <Fontisto name={qrCodeData?.id === QRCodes?.length ? 'youtube-play' : 'uber'} color="#FFF" size={40} />
                  <Text style={tw`text-white font-bold text-xl`}>Clique Aqui</Text>
                </TO>
              }
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default MessageModal;
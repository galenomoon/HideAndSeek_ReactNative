import { Modal, Text, Image, TouchableOpacity as TO, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

//utils
import QRCodes from "../../utils/qrCodeModel";

//styles
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from "twrnc";

const BalloonListModal = ({ modalVisible, closeModal, balloonList, setMessageModalVisible, setQRCodeData, setScannedTrue }) => {

  const itemList = (item) =>
    QRCodes.map((qr) => qr?.id === item?.id &&
      <TO style={tw`flex-row items-center bg-gray-100 p-3 rounded-2xl mb-2`} onPress={() => [closeModal(), setMessageModalVisible(true), setQRCodeData(qr), setScannedTrue()]}>
        <Image style={tw`w-20 h-20 rounded-xl bg-purple-800`} source={{ uri: qr?.img_url }} />
        <Text style={tw`text-xl font-bold m-3 z-50`}>Balão #{qr?.id}</Text>
      </TO>
    )


  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`w-[100%] h-[100%] justify-center items-center rounded-2xl`}>
          {balloonList?.length > 0 ?
            <View style={tw`bg-white w-[90%] h-[73%] items-center justify-center rounded-lg overflow-hidden p-2`}>
              <View style={tw`flex-1 items-end justify-between w-full`}>
                <TO style={tw`z-53`} onPress={() => closeModal()}>
                  <Icon name="close" style={tw`m-1`} color={'#333'} size={40} />
                </TO>
              </View>
              <Text style={tw`text-3xl font-bold mx-2 mb-5 z-50`}>Balões Encontrados</Text>
              <View style={tw`flex-10 justify-center w-full`}>
                <FlatList
                  data={balloonList}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => itemList(item)}
                />
              </View>
            </View>
            :
            <View style={tw`bg-white w-[90%] h-[48%] items-center justify-center rounded-lg overflow-hidden p-2`}>
              <View style={tw`flex-2 items-end justify-center w-full`}>
                <TO style={tw`z-53`} onPress={() => closeModal()}>
                  <Icon name="close" style={tw`m-1`} color={'#333'} size={40} />
                </TO>
              </View>
              <Image style={tw`w-25 h-60`} source={require('../../assets/sad-astrunaut.png')} />

              <View style={tw`flex-5 justify-center items-center w-full`}>
                <Text style={tw`text-2xl font-light mx-2 mb-5 z-50 opacity-50 text-center`}>Você ainda não encontrou nenhum balão :(</Text>
              </View>
            </View>
          }
        </View>
      </View>
    </Modal>
  );
}

export default BalloonListModal;
import { Modal, Text, Image, TouchableOpacity as TO, View, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from "twrnc";

const MessageModal = ({ modalVisible, closeModal, qrCodeData }) => {

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`w-[100%] h-[100%] justify-center items-center rounded-2xl`}>
          <View style={tw`bg-white w-[98%] h-[80%] items-center justify-center rounded-lg overflow-hidden p-2`}>
            <View style={tw`flex-1 items-end justify-between w-full`}>
              <TO style={tw`z-53`} onPress={() => closeModal()}>
                <Icon name="close" style={tw`m-1`} color={'#333'} size={40} />
              </TO>
            </View>
            <View style={tw`flex-10 justify-center w-full`}>
              <View style={tw`flex-5 overflow-hidden`}>
                <Image style={tw`w-full h-full rounded-xl`} source={{ uri: qrCodeData?.img_url }} />
              </View>
              <Text style={tw`text-2xl font-bold m-2`}>{qrCodeData?.title}</Text>
              <ScrollView style={tw`flex-4 mx-2`}>
                <Text style={tw`text-xl`}>{qrCodeData?.message}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default MessageModal;
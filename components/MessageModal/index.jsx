import { Modal, Text, Image, TouchableOpacity as TO, View, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from "twrnc";

const MessageModal = ({ modalVisible, closeModal, qrCodeData }) => {

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`w-[100%] h-[100%] justify-center items-center rounded-2xl`}>
          <TO style={tw`z-53 absolute top-45 right-7`} onPress={() => closeModal()}>
            <Icon name="close" style={tw` z-53 m-1`} color={'#333'} size={40} />
          </TO>
          <View style={tw`bg-white w-[90%] h-[73%] rounded-lg overflow-hidden p-2`}>
            <View style={tw`flex-5 overflow-hidden`}>
              <Image style={tw`w-full h-full rounded-xl`} source={{ uri: qrCodeData?.img_url }} />
            </View>
            <Text style={tw`text-2xl font-bold m-2`}>{qrCodeData?.title}</Text>
            <ScrollView style={tw`flex-4 m-2`}>
              <Text style={tw`text-xl`}>{qrCodeData?.message}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default MessageModal;
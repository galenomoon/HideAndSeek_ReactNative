import { Modal, StyleSheet, Text, Image, TouchableOpacity as TO, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from "twrnc";

const MessageModal = ({ modalVisible, closeModal, qrCodeData }) => {


  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`w-[100%] h-[100%] justify-center items-center rounded-2xl`}>
          <TO style={tw`z-53 absolute top-45 right-7`} onPress={() => closeModal()}>
            <Icon name="close" style={tw` z-53 m-1`} color={'#333'} size={40}  />
          </TO>
          <View style={tw`bg-white w-[90%] h-[60%] rounded-lg overflow-hidden p-2`}>
            <View style={tw`flex-2 overflow-hidden`}>
              <Image style={tw`w-full h-full rounded-xl`} source={{ uri: qrCodeData?.img_url }} />
            </View>
            <View style={tw`flex-1 m-2`}>
              <Text style={tw`text-2xl font-bold`}>{qrCodeData?.title}</Text>
              <Text style={tw`text-xl`}>{qrCodeData?.message}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
{/* <Pressable onPress={() => newBalloon()}
style={tw`bg-purple-600 w-40 rounded-lg py-3`}
>
<Text style={tw`font-bold text-center text-white`}>Okay, Entendi</Text>
</Pressable> */}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default MessageModal;
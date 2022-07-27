import { Modal, StyleSheet, Text, Image, TouchableOpacity as TO, View, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from "twrnc";

const MessageModal = ({ modalVisible, closeModal, qrCodeData, setBalloonList, balloonList }) => {

  // Expected Obj
  // {
  //   "id":1,
  //   "message": "Test Message!!"
  // }

  const newBalloon = () => {
    let list = balloonList
    const isAlreadyFound = list.some(obj => obj.id === qrCodeData.id)
    isAlreadyFound ? Alert.alert("Balão já encontrado") : list.push(qrCodeData)
    setBalloonList(list)
    closeModal()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`w-[100%] h-[100%] justify-center items-center rounded-2xl`}>
            <Icon name="close" style={tw`absolute z-53 m-1 top-45 right-7`} color={'#333'} size={40} onPress={() => newBalloon()} />
          <View style={tw`bg-white w-[90%] h-[60%] rounded-lg overflow-hidden p-2`}>
            <View style={tw`flex-2 overflow-hidden`}>
              <Image style={tw`w-full h-full rounded-xl`} source={{ uri: qrCodeData?.img_url }} />
            </View>
            <View style={tw`flex-1 m-2`}>
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
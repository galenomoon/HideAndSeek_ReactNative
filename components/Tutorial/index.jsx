import { Modal, Text, TouchableOpacity as TO, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import tw from "twrnc";

const Tutorial = ({ modalVisible, closeModal, openBalloonList }) => {

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => closeModal()}>
      <TO style={tw`h-20 w-30 absolute right-1`} onPress={() => [closeModal(), openBalloonList()]}>
          <TO onPress={() => closeModal()} style={tw` absolute top-20 right-30 bg-white w-50 h-25 items-center justify-center rounded-lg overflow-hidden`}>
            <View style={tw`flex-2 flex-row items-center justify-between pl-3 w-full bg-gray-200`}>
              <Text style={tw`font-bold`}>Clique no balão</Text>
              <TO style={tw`z-53`} onPress={() => closeModal()}>
                <Icon name="arrow-up-right" color={'#333'} size={30} />
              </TO>
            </View>
            <View style={tw`flex-3 justify-center w-full p-2`}>
              <Text>Para ver a lista de balões encontrados</Text>
            </View>
          </TO>
      </TO>
    </Modal>
  );
}

export default Tutorial;
import { View} from 'react-native';
import tw from 'twrnc';
import Start from './pages/Start';
import QRCodeScanner from './pages/QRCodeScanner/index';

export default function App() {
  //to apply stack navigator
  return (
    <View style={tw`flex-1 items-center justify-center bg-purple-900`}>
      {/* <Start/> */}
      <QRCodeScanner/>
    </View>
  );
}


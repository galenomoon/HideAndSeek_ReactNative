import { View} from 'react-native';
import tw from 'twrnc';
import QRCodeScanner from './pages/QRCodeScanner';

export default function App() {
  
  return (
    <View style={tw`flex-1 items-center justify-center bg-black`}>
      <QRCodeScanner/>
    </View>
  );
}


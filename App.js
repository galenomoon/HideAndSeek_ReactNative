import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Start from './pages/Start';
import QRCodeScanner from './pages/QRCodeScanner/index';
import Message from './pages/Message';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="QRCode" component={QRCodeScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


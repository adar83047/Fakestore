import CartScreen from '../../screens/Cartscreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Page() {
  return (
    <SafeAreaProvider>
      <CartScreen />
    </SafeAreaProvider>
  );
}

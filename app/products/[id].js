import ProductDetailScreen from '../../screens/Detail';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Page() {
  return (
    <SafeAreaProvider>
      <ProductDetailScreen />
    </SafeAreaProvider>
  );
}

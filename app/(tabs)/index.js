import HomeScreen from '../../screens/Homescreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Page() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}

import ProfileScreen from '../../screens/Profilescreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Page() {
  return (
    <SafeAreaProvider>
      <ProfileScreen />
    </SafeAreaProvider>
  );
}

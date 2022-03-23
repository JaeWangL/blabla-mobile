import 'react-native-gesture-handler';
import 'text-encoding';
import { LogBox } from 'react-native';
import App from './src/main';

LogBox.ignoreLogs(['Setting a timer']);

export default App;

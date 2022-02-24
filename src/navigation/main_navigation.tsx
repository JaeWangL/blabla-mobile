import { enableScreens } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ArchivesScreen from '@/screens/archives';
import HomeScreen from '@/screens/home';
import SettingsScreen from '@/screens/settings';

enableScreens();

const Tab = createBottomTabNavigator();

export function MainNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Archives" component={ArchivesScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

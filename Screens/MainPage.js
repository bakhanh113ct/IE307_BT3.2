import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppContext} from '../contexts/AppContext';
import Colors from '../utils/Colors';
import AddNoteScreen from './AddNoteScreen';
import EditNoteScreen from './EditNoteScreen';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainPage = () => {
  const {isDarkMode} = useAppContext();
  return (
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#000',
          },
        }}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{
          headerStyle: {
            backgroundColor: isDarkMode
              ? Colors.dark.backgroundColor
              : Colors.light.backgroundColor,
          },
          headerTintColor:
            isDarkMode === true
              ? Colors.dark.textColor
              : Colors.light.textColor,
        }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNoteScreen}
        options={{
          headerStyle: {
            backgroundColor: isDarkMode
              ? Colors.dark.backgroundColor
              : Colors.light.backgroundColor,
          },
          headerTintColor:
            isDarkMode === true
              ? Colors.dark.textColor
              : Colors.light.textColor,
        }}
      />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  const {isDarkMode, sizeRatio} = useAppContext();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focus, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Note App':
              iconName = 'home';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'home';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#679dda',
        tabBarInactiveTintColor: isDarkMode
          ? Colors.dark.textColor
          : Colors.light.textColor,
        tabBarActiveBackgroundColor: isDarkMode
          ? Colors.dark.backgroundColor
          : Colors.light.backgroundColor,
        tabBarInactiveBackgroundColor: isDarkMode
          ? Colors.dark.backgroundColor
          : Colors.light.backgroundColor,
      })}>
      <Tab.Screen
        name="Note App"
        component={HomeScreen}
        options={{
          headerTitleStyle: {
            fontSize: 16 * sizeRatio,
          },
          headerTitleAlign: 'center',
          headerTintColor:
            isDarkMode === true
              ? Colors.dark.highlight
              : Colors.light.highlight,
          headerStyle: {
            backgroundColor:
              isDarkMode === true
                ? Colors.dark.backgroundColor
                : Colors.light.backgroundColor,
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerTitleAlign: 'center',
          headerTintColor:
            isDarkMode === true
              ? Colors.dark.highlight
              : Colors.light.highlight,
          headerStyle: {
            backgroundColor:
              isDarkMode === true
                ? Colors.dark.backgroundColor
                : Colors.light.backgroundColor,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainPage;

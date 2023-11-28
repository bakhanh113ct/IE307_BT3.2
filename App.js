import React, {useEffect} from 'react';
import MainPage from './Screens/MainPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddNoteScreen from './Screens/AddNoteScreen';
import SQLite from 'react-native-sqlite-storage';
import EditNoteScreen from './Screens/EditNoteScreen';
import AppProvider from './contexts/AppContext';
const Stack = createStackNavigator();

export const db = SQLite.openDatabase(
  {
    name: 'MainDb',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const App = () => {
  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Notes ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Description TEXT)',
        [],
        (sqlTxn, res) => {
          console.log('success full');
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  return (
    <AppProvider>
      <NavigationContainer>
        <MainPage />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;

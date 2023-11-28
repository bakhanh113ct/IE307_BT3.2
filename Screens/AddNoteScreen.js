import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {db} from '../App';
import {useAppContext} from '../contexts/AppContext';
import Colors from '../utils/Colors';

const AddNoteScreen = ({route, navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const {isDarkMode, sizeRatio} = useAppContext();
  const {refresh} = route.params;

  const styles = styling(isDarkMode, sizeRatio);

  const AddNote = async (title, desc) => {
    await db.transaction(async tx => {
      await tx.executeSql(
        'INSERT INTO Notes (Title, Description) VALUES (?, ?)',
        [title, desc],
        (sqlTxn, res) => {
          console.log('success full');
          console.log(res);
          console.log(sqlTxn);
        },
        error => {
          console.log(error);
        },
      );
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputTitle}
        placeholder="Enter your title"
        value={title}
        placeholderTextColor={
          isDarkMode === true ? Colors.dark.textColor : Colors.light.textColor
        }
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.inputNote}
        placeholder="Enter your note"
        placeholderTextColor={
          isDarkMode === true ? Colors.dark.textColor : Colors.light.textColor
        }
        multiline={true}
        value={desc}
        onChangeText={setDesc}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            navigation.pop();
          }}>
          <Icon name={'close'} size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={async () => {
            await AddNote(title, desc);
            refresh(true);
            navigation.pop();
          }}>
          <Icon name={'checkmark'} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styling = (theme, sizeRatio) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        theme === true
          ? Colors.dark.backgroundColor
          : Colors.light.backgroundColor,
    },
    inputTitle: {
      height: 55 * sizeRatio,
      fontSize: 16 * sizeRatio,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: '#ccc',
      color: theme === true ? Colors.dark.textColor : Colors.light.textColor,
    },
    inputNote: {
      height: 100 * sizeRatio,
      fontSize: 16 * sizeRatio,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: '#ccc',
      color: theme === true ? Colors.dark.textColor : Colors.light.textColor,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    cancelButton: {
      borderWidth: 1,
      borderColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40 * sizeRatio,
      height: 40 * sizeRatio,
      backgroundColor: 'red',
      borderRadius: 50 * sizeRatio,
      marginHorizontal: 8,
    },
    doneButton: {
      borderWidth: 1,
      borderColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40 * sizeRatio,
      height: 40 * sizeRatio,
      backgroundColor: 'green',
      borderRadius: 50,
    },
  });

export default AddNoteScreen;

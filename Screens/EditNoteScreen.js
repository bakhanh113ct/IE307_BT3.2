import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {db} from '../App';
import {useAppContext} from '../contexts/AppContext';
import Colors from '../utils/Colors';

const EditNoteScreen = ({route, navigation}) => {
  const {refresh, item} = route.params;
  const [title, setTitle] = useState(item.Title);
  const [desc, setDesc] = useState(item.Description);
  const {isDarkMode} = useAppContext();

  const styles = styling(isDarkMode);

  const EditNote = async (title, desc) => {
    await db.transaction(async tx => {
      await tx.executeSql(
        'UPDATE Notes SET Title = ?, Description = ? WHERE ID = ?',
        [title, desc, item.ID],
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
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.inputNote}
        placeholder="Enter your note"
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
            await EditNote(title, desc).then(() => {
              refresh(true);
            });
            navigation.pop();
          }}>
          <Icon name={'checkmark'} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        theme === true
          ? Colors.dark.backgroundColor
          : Colors.light.backgroundColor,
    },
    inputTitle: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: '#ccc',
      color: theme === true ? Colors.dark.textColor : Colors.light.textColor,
    },
    inputNote: {
      height: 100,
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
      width: 40,
      height: 40,
      backgroundColor: 'red',
      borderRadius: 50,
      marginHorizontal: 8,
    },
    doneButton: {
      borderWidth: 1,
      borderColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      backgroundColor: 'green',
      borderRadius: 50,
    },
  });

export default EditNoteScreen;

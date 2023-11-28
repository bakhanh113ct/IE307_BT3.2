import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {db} from '../App';
import {useAppContext} from '../contexts/AppContext';
import Colors from '../utils/Colors';

const NoteItem = ({item, refreshing, navigation}) => {
  const {isDarkMode, sizeRatio} = useAppContext();

  const styles = styling(isDarkMode, sizeRatio);
  // console.log(item);
  const deleteNote = async () => {
    await db.transaction(async tx => {
      await tx.executeSql(
        'DELETE FROM Notes WHERE ID = ?',
        [item.ID],
        (sqlTxn, res) => {
          console.log('Delete successful');
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('EditNote', {
          item: item,
          refresh: refreshing,
        });
      }}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.desc}>{item.Description}</Text>
        </View>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={async () => {
            await deleteNote();
            refreshing(true);
          }}>
          <Icon
            name={'delete'}
            size={25 * sizeRatio}
            color={
              isDarkMode === true
                ? Colors.dark.textColor
                : Colors.light.textColor
            }
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styling = (theme, sizeRatio) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 8,
      justifyContent: 'space-between',
      borderColor:
        theme === true ? Colors.dark.textColor : Colors.light.textColor,
      borderWidth: 1,
      marginHorizontal: 16,
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    contentContainer: {
      width: '80%',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16 * sizeRatio,
      paddingBottom: 8,
      color: theme === true ? Colors.dark.textColor : Colors.light.textColor,
    },
    desc: {
      color: theme === true ? Colors.dark.textColor : Colors.light.textColor,
      fontSize: 14 * sizeRatio,
    },
    circleButton: {
      borderWidth: 1,
      borderColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: 40 * sizeRatio,
      height: 40 * sizeRatio,
      borderRadius: 50 * sizeRatio,
      color: theme === true ? Colors.dark.textColor : Colors.light.textColor,
    },
  });

export default NoteItem;

import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import NoteItem from '../components/NoteItem';
import {db} from '../App';
import {useAppContext} from '../contexts/AppContext';
import Colors from '../utils/Colors';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const {isDarkMode, sizeRatio} = useAppContext();

  const styles = styling(isDarkMode, sizeRatio);

  const callback = value => {
    setIsRefreshing(value);
  };

  useEffect(() => {
    if (isRefreshing === true) {
      getDatas();
      console.log('object');
    }
  }, [isRefreshing, isDarkMode]);

  const getDatas = async () => {
    await db.transaction(async tx => {
      await tx.executeSql(
        'SELECT * FROM Notes',
        [],
        (txn, res) => {
          const temp = [];
          for (let i = 0; i < res.rows.length; i++) {
            let item = res.rows.item(i);
            temp.push(item);
          }
          setData(temp);
          setIsRefreshing(false);
        },
        error => {
          console.log(error);
        },
      );
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.allNoteContainer}>
        <Text style={styles.allNotesText}>All notes</Text>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => {
            navigation.push('AddNote', {
              refresh: callback,
              // otherParam: 'anything you want here',
            });
            setIsRefreshing(true);
          }}>
          <Icon name={'add-sharp'} size={20 * sizeRatio} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <NoteItem
                item={item}
                refreshing={setIsRefreshing}
                navigation={navigation}
              />
            );
          }}
          keyExtractor={item => item.ID}
          ItemSeparatorComponent={() => <View style={{height: 12}} />}
        />
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
    allNoteContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor:
        theme === true
          ? Colors.dark.backgroundColor
          : Colors.light.backgroundColor,
    },
    allNotesText: {
      fontSize: 18 * sizeRatio,
      fontWeight: 'bold',
      color: theme === true ? Colors.dark.textColor : Colors.light.textColor,
    },
    circleButton: {
      borderWidth: 1,
      borderColor:
        theme === true ? Colors.dark.highlight : Colors.light.highlight,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40 * (sizeRatio - 0.1),
      height: 40 * (sizeRatio - 0.1),
      backgroundColor:
        theme === true ? Colors.dark.highlight : Colors.light.highlight,
      borderRadius: 50 * sizeRatio,
    },
    flatlist: {
      flex: 1,
      backgroundColor:
        theme === true
          ? Colors.dark.backgroundColor
          : Colors.light.backgroundColor,
    },
  });

export default HomeScreen;

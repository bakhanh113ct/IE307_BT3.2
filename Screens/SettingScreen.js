import {View, Text, useColorScheme, Switch, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import {useAppContext} from '../contexts/AppContext';
import Colors from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const {isDarkMode, setIsDarkMode, sizeRatio, setSizeRatio} = useAppContext();

  const styles = styling(isDarkMode, sizeRatio);
  return (
    <View style={styles.container}>
      <View style={styles.containerThemeMode}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch
          value={isDarkMode === true}
          onChange={async () => {
            await AsyncStorage.setItem(
              '@isDarkMode',
              isDarkMode ? 'false' : 'true',
            );
            setIsDarkMode(isDarkMode ? false : true);
          }}
        />
      </View>
      <View style={styles.containerFontSize}>
        <Text style={styles.text}>Font Size</Text>
        <Text style={styles.text}>{Math.floor(16 * sizeRatio)}</Text>
      </View>
      <Slider
        value={sizeRatio}
        onValueChange={setSizeRatio}
        onTouchEnd={async value => {
          try {
            const jsonValue = sizeRatio.toString();
            await AsyncStorage.setItem('@sizeRatio', jsonValue);
          } catch (e) {
            console.log(e);
          }
        }}
        style={styles.slider}
        minimumValue={0.875}
        maximumValue={1.875}
        step={0.125}
        minimumTrackTintColor="#ccc"
        maximumTrackTintColor="green"
      />
    </View>
  );
};

const styling = (theme, sizeRatio) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 12,
      paddingTop: 20,
      justifyContent: 'center',
      backgroundColor:
        theme === true
          ? Colors.dark.backgroundColor
          : Colors.light.backgroundColor,
    },
    containerThemeMode: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    containerFontSize: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 16 * sizeRatio,
      color: theme === true ? Colors.dark.textColor : Colors.light.textColor,
    },
    slider: {width: 200, height: 40, alignSelf: 'center'},
  });

export default SettingScreen;

import {View, Text, useColorScheme, Switch, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import {useAppContext} from '../contexts/AppContext';
import Colors from '../utils/Colors';

const SettingScreen = () => {
  const {isDarkMode, setIsDarkMode, sizeRatio, setSizeRatio} = useAppContext();

  const styles = styling(isDarkMode);
  return (
    <View style={styles.container}>
      <View style={styles.containerThemeMode}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch
          value={isDarkMode === true}
          onChange={() => setIsDarkMode(isDarkMode ? false : true)}
        />
      </View>
      <View style={styles.containerFontSize}>
        <Text style={styles.text}>Font Size</Text>
        <Text style={styles.text}>3</Text>
      </View>
      <Slider
        value={sizeRatio}
        onValueChange={setSizeRatio}
        style={styles.slider}
        minimumValue={0.8}
        maximumValue={1.8}
        step={0.2}
        minimumTrackTintColor="#ccc"
        maximumTrackTintColor="green"
      />
    </View>
  );
};

const styling = theme =>
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
      color: theme === true ? Colors.dark.textColor : Colors.light.textColor,
    },
    slider: {width: 200, height: 40, alignSelf: 'center'},
  });

export default SettingScreen;

import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext(true);

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sizeRatio, setSizeRatio] = useState(1);

  useEffect(() => {
    const getSizeRatio = async () => {
      const tempSizeRatio = await AsyncStorage.getItem('@sizeRatio');
      const tempIsDarkMode = await AsyncStorage.getItem('@isDarkMode');
      console.log(tempSizeRatio);

      if (tempIsDarkMode != null) {
        setIsDarkMode(tempIsDarkMode === 'false' ? false : true);
      }
      if (tempSizeRatio) {
        setSizeRatio(Number(tempSizeRatio));
      }
    };
    getSizeRatio();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        sizeRatio,
        setSizeRatio,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

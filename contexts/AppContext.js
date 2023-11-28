import React, {createContext, useContext, useState, useEffect} from 'react';

const AppContext = createContext(true);

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sizeRatio, setSizeRatio] = useState(1);

  useEffect(() => {
    console.log('switch');
  }, [isDarkMode]);

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

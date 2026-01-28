import React, { createContext, useContext, useState, useEffect } from 'react';

export const BottomContext = createContext(null);

export default function BottomNavContext({ children }) {
  const [btmContext, setBtmContext] = useState('homePage');

  // useEffect(() => {
  //   if (btmContext) {
  //     console.log('BottomContext Changed from BottomNavContext line 10');
  //     console.log(btmContext);
  //   }
  // }, [btmContext]);

  return (
    <BottomContext.Provider value={{ btmContext, setBtmContext }}>
      {children}
    </BottomContext.Provider>
  );
}

export const useBottomContext = () => useContext(BottomContext);

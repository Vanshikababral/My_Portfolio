import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <MenuContext.Provider value={{ menuOpen, openMenu, closeMenu, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
};

import { createContext } from 'react';

export const NavbarContext = createContext({
  expanded: null,
  setExpanded: () => () => null,
});

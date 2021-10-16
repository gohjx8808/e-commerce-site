import { PaletteMode } from '@mui/material';
import {
  createContext,
} from 'react';

type modeType = PaletteMode | 'system';

interface DarkModeState{
  toggleTheme:(_selectedMode:modeType)=>void
  displayTheme:modeType
}

const DarkModeContext = createContext<DarkModeState>({
  toggleTheme: () => {},
  displayTheme: 'system',
});

export default DarkModeContext;

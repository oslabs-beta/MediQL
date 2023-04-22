import React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import './App.Styles.scss';
import './components/TreeDiagram/TreeDiagramStyles.scss';
import './components/LogoBar/LogoBarStyles.scss';
import './components/DisplayGraphiql/DisplayGraphiql.scss';

import LogoBar from './components/LogoBar/LogoBar';
import Visualizer from './components/Visualizer/Visualizer';
import DisplayGraphiql from './components/DisplayGraphiql/DisplayGraphiql';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div className='toggle-container'>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  React.useEffect(() => {
    document.body.style.backgroundColor =
      colorMode.mode === 'dark' ? 'hsl(219, 29%, 18%)' : 'hsl(219, 28%, 100%)';
  }, [colorMode.mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LogoBar />
        <MyApp />
        <div className="mainDiv">
          <DisplayGraphiql />
          <Visualizer />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

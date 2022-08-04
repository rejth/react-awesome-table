import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, FontsVTBGroup } from '@admiral-ds/react-ui';

import App from 'src/ts/App';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={LIGHT_THEME}>
      <>
        <FontsVTBGroup />
        <App />
      </>
    </ThemeProvider>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, FontsVTBGroup } from '@admiral-ds/react-ui';

import App from 'src/ts/components/App';
import TableDataService from 'src/ts/services/TableDataService';
import { TableDataServiceProvider } from 'src/ts/contexts';
import { endpoints } from 'src/ts/api';

import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

let apiService = new TableDataService();

async function bootstrap() {
  if (process.env.NODE_ENV === 'development') {
    if (window.location.pathname === '/react-custom-table') {
      window.location.pathname = '/react-custom-table/';
      return;
    }
    const { worker } = require('./mocks/browser');
    apiService = endpoints;
    await worker.start({
      serviceWorker: {
        url: '/react-custom-table/mockServiceWorker.js',
      },
    });
  }

  root.render(
    <React.StrictMode>
      <ThemeProvider theme={LIGHT_THEME}>
        <FontsVTBGroup />
        <TableDataServiceProvider value={apiService}>
          <App />
        </TableDataServiceProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
}

bootstrap();

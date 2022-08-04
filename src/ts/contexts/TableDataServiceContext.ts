import React from 'react';
import TableDataService from '../services/TableDataService';

const {
  Provider: TableDataServiceProvider,
  Consumer: TableDataServiceConsumer,
} = React.createContext<TableDataService | null>(null);

export { TableDataServiceProvider, TableDataServiceConsumer };

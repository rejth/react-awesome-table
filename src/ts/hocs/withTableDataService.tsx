import React from 'react';

import { TableDataServiceConsumer } from 'src/ts/contexts/TableDataServiceContext';
import TableDataService from 'src/ts/services/TableDataService';

function withTableServiceHoC<T extends {}>(Component: React.ComponentType<T>): React.FC<T> {
  return function consumerWrapper(props: T) {
    return (
      <TableDataServiceConsumer>
        {(dataService: TableDataService | null) => (
          <Component
            {...props}
            dataService={dataService}
          />
        )}
      </TableDataServiceConsumer>
    );
  };
}

export default withTableServiceHoC;

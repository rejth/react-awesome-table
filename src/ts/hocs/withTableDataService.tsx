import React from 'react';
import { TableDataServiceConsumer } from 'src/ts/contexts/TableDataServiceContext';
import TableDataService from 'src/ts/services/TableDataService';

function withTableServiceHoC<T extends {}>(Component: React.ComponentType<T>): React.FC<T> {
  return function consumerWrapper(props: T) {
    return (
      <TableDataServiceConsumer>
        {(tableDataService: TableDataService | null) => (
          <Component
            {...props}
            tableDataService={tableDataService}
          />
        )}
      </TableDataServiceConsumer>
    );
  };
}

export default withTableServiceHoC;

import React from 'react';

import { ColumnTypesEnum } from 'src/ts/components/Table/interfaces/Column';
import TableDataService from 'src/ts/services/TableDataService';
import Table from 'src/ts/components/Table';
import Column from 'src/ts/components/Table/components/Column';
import withTableDataServiceHoC from 'src/ts/hocs/withTableDataService';

import './index.scss';

export interface AppProps {
  dataService?: TableDataService | null;
}

function App(props: AppProps) {
  const { dataService } = props;
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    dataService?.getData()
      .then((response: any[]) => setData(response));
  }, [dataService]);

  const handleRowExpansion = () => (<></>);

  return (
    <div className="app">
      <h1 className="app__header">Table component</h1>
      <div className="app__container">
        <Table
          rows={data}
          onRowExpansionRender={handleRowExpansion}
        >
          <Column
            template={ColumnTypesEnum.CHECKBOX}
            properties={['']}
            width={40}
            isFixed
          />
          <Column
            template={ColumnTypesEnum.EXPAND}
            properties={['']}
            width={40}
            isFixed
          />
          <Column
            template={ColumnTypesEnum.STRING}
            properties={['id']}
            prefixes={['RA-']}
            title="Claim №"
            isSortable
            isResizable
            isDraggable
          />
          <Column
            template={ColumnTypesEnum.STRING}
            properties={['recipientFullName']}
            title="Recipient"
            isSortable
            isResizable
            isDraggable
          />
          <Column
            template={ColumnTypesEnum.STRING}
            properties={['authorFullName']}
            title="Author"
            isSortable
            isResizable
            isDraggable
          />
          <Column
            template={ColumnTypesEnum.STRING}
            properties={['formalName']}
            title="Template"
            isSortable
            isResizable
            isDraggable
          />
        </Table>
      </div>
    </div>
  );
}

export default withTableDataServiceHoC(App);

import React from 'react';

import { ColumnTypesEnum } from 'src/ts/components/Table/interfaces/Column';
import TableDataService from 'src/ts/services/TableDataService';
import Table from 'src/ts/components/Table';
import Column from 'src/ts/components/Table/components/Column';
import withTableDataServiceHoC from 'src/ts/hocs/withTableDataService';

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
    <div className="App">
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
          title="№ Заявки"
          isSortable
          isResizable
          isDraggable
        />
        <Column
          template={ColumnTypesEnum.STRING}
          properties={['recipientFullName']}
          title="Получатель доступа"
          isSortable
          isResizable
          isDraggable
        />
        <Column
          template={ColumnTypesEnum.STRING}
          properties={['authorFullName']}
          title="Инициатор"
          isSortable
          isResizable
          isDraggable
        />
        <Column
          template={ColumnTypesEnum.STRING}
          properties={['formalName']}
          title="Наименование шаблона"
          isSortable
          isResizable
          isDraggable
        />
      </Table>
    </div>
  );
}

export default withTableDataServiceHoC(App);

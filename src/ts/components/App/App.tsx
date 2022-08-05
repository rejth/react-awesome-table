import React from 'react';

import logo from 'src/assets/logo.svg';
import withTableDataServiceHoC from 'src/ts/hocs/withTableDataService';
import TableDataService from 'src/ts/services/TableDataService';
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

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <p>
          There gonna be an awesome table built on React and TypeScript here
        </p>
        {(data || []).map((item: any) => (
          <a
            key={item.id}
            className="App-link"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
        ))}
      </header>
    </div>
  );
}

export default withTableDataServiceHoC(App);

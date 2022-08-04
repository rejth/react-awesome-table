import React from 'react';

import logo from 'src/assets/logo.svg';
import withTableDataServiceHoC from 'src/ts/hocs/withTableDataService';
import TableDataService from 'src/ts/services/TableDataService';
import './index.scss';

export interface AppProps {
  tableDataService?: TableDataService | null;
}

function App(props: AppProps) {
  const { tableDataService } = props;
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    tableDataService?.getData()
      .then((response: any) => setData(response));
  });

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
        {data.map((item: any) => (
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

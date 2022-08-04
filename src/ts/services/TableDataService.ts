export default class TableDataService {
  data = [
    {
      id: 1,
      title: 'React',
      href: 'https://ru.reactjs.org/',
    },
    {
      id: 2,
      title: 'React TypeScript Cheatsheet',
      href: 'https://react-typescript-cheatsheet.netlify.app/',
    },
  ];

  getData() {
    return new Promise((resolve) => {
      function simulateRequest(data: any) {
        setTimeout(() => resolve(data), 700);
      }
      simulateRequest(this.data);
    });
  }
}

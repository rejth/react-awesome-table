import { rest } from 'msw';

// API interceptors
export const handlers = [
  rest.get('/react-awesome-table/api/data', (_req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
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
    ]),
  )),
];

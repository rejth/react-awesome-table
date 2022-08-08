export default class TableDataService {
  public getData(): Promise<any[]> {
    const data = [
      {
        id: 1,
        recipientFullName: 'Megan Fox',
        authorFullName: 'Peter Parker',
        formalName: 'Incrediable template',
      },
      {
        id: 2,
        recipientFullName: 'Megan Fox',
        authorFullName: 'Peter Parker',
        formalName: 'Incrediable template',
      },
      {
        id: 3,
        recipientFullName: 'Megan Fox',
        authorFullName: 'Peter Parker',
        formalName: 'Incrediable template',
      },
      {
        id: 4,
        recipientFullName: 'Megan Fox',
        authorFullName: 'Peter Parker',
        formalName: 'Incrediable template',
      },
      {
        id: 5,
        recipientFullName: 'Megan Fox',
        authorFullName: 'Peter Parker',
        formalName: 'Incrediable template',
      },
      {
        id: 6,
        recipientFullName: 'Megan Fox',
        authorFullName: 'Peter Parker',
        formalName: 'Incrediable template',
      },
      {
        id: 7,
        recipientFullName: 'Megan Fox',
        authorFullName: 'Peter Parker',
        formalName: 'Incrediable template',
      },
      {
        id: 8,
        recipientFullName: 'Megan Fox',
        authorFullName: 'Peter Parker',
        formalName: 'Incrediable template',
      },
      {
        id: 9,
        recipientFullName: 'Megan Fox',
        authorFullName: 'Peter Parker',
        formalName: 'Incrediable template',
      },
      {
        id: 10,
        recipientFullName: 'Megan Fox',
        authorFullName: 'Peter Parker',
        formalName: 'Incrediable template',
      },
    ];

    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 700);
    });
  }
}

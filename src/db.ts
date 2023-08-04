import Dexie, { Table } from 'dexie';

export interface Image {

  id?: number;

  filepath: string;

}

export class XMarkusDatabase extends Dexie {

  images!: Table<Image>; 

  constructor() {
    super('x-markus-db');

    this.version(1).stores({
      images: '++id, filepath'
    });
  }
}

export const db = new XMarkusDatabase();
import Dexie, { Table } from 'dexie';

export interface Image {

  id?: number;

  filepath: string;

  data: Blob;

}

export class XMarkusDatabase extends Dexie {

  images!: Table<Image, number>; 

  constructor() {
    super('x-markus-db');

    this.version(1).stores({
      images: '++id, filepath, data'
    });
  }
}

export const db = new XMarkusDatabase();
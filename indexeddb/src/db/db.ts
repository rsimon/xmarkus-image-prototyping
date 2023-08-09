import Dexie, { Table } from 'dexie';
import { Image } from '../Types';

const checkAndPersistStorage = () => 'storage' in navigator ?
    navigator.storage.persist().then(granted => {
      if (granted) {
        console.log('Storage set to persistent');
      } else {
        throw 'Storage persistence denied by user';
      }
    }) : Promise.reject();

export class XMarkusDatabase extends Dexie {

  images!: Table<Image, number>; 

  constructor() {
    super('x-markus-db');

    this.version(1).stores({
      images: '++id, filepath, data'
    });
  }
}

export const initDB = (): Promise<XMarkusDatabase> => 
  checkAndPersistStorage()
    .then(() => {
      console.log('Initializing database');
      return new XMarkusDatabase();
    });
import Dexie, { Table } from 'dexie';

async function checkAndPersistStorage() {
  if ('storage' in navigator) {
    try {
      const granted = await navigator.storage.persist();
      if (granted) {
        console.log('Set storage to persistent');
        // Initialize and use your Dexie instance
      } else {
        console.error('Storage persistence denied by user');
        // Handle the case where the user denied storage persistence
      }
    } catch (error) {
      console.error('Error while requesting storage persistence:', error);
    }
  }
}

await checkAndPersistStorage();

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
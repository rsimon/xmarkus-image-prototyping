import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { XMarkusDatabase, initDB } from './db';

const DatabaseContext = createContext<XMarkusDatabase | null>(null);

interface DatabaseContextProviderProps {

  children: ReactNode;

  onDBInitError?: () => void;

}

export const DatabaseProvider = (props: DatabaseContextProviderProps) => {

  const [database, setDatabase] = useState<XMarkusDatabase | null>(null);

  useEffect(() => {
    initDB()
      .then(setDatabase)
      .catch(() => props.onDBInitError && props.onDBInitError());
  }, []);

  return (
    <DatabaseContext.Provider value={database}>
      {database ? props.children : undefined }
    </DatabaseContext.Provider>
  )

}

export const useDB = () => useContext(DatabaseContext);



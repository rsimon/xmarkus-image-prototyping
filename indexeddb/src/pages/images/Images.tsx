import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import { db } from '@/db';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

// Don’t forget to keep the Uppy instance outside of your component.
const uppy = new Uppy();

uppy.on('complete', (result) => {
  console.log('uppy complete', result);

  const files = result.successful;
  files.forEach(async (file) => {
    const filepath = file.name;
    const data = new Blob([file.data], { type: file.type });

    await db.images.add({ filepath, data });

    console.log('Image uploaded and stored in the database.');
  });
});

interface ImagesProps {

}

export const Images = (props: ImagesProps) => {

  return (
    <main className="page-images">
      <Dashboard 
        uppy={uppy} />;
    </main>
  )

}  
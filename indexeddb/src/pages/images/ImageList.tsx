import { useState, useEffect } from 'react';
import { db } from '@/db';

export const ImageList = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {

    async function checkAndPersistStorage() {
      if ('storage' in navigator) {
        try {
          const granted = await navigator.storage.persist();
          if (granted) {
            console.log('Storage is now persistent.');
            // Initialize and use your Dexie instance
          } else {
            console.log('Storage persistence denied by user.');
            // Handle the case where the user denied storage persistence
          }
        } catch (error) {
          console.error('Error while requesting storage persistence:', error);
        }
      }
    }

    checkAndPersistStorage();

    async function fetchImages() {
      const imageList = await db.images.toArray();
      setImages(imageList);
    }

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image List</h2>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img
              src={URL.createObjectURL(image.data)}
              alt={image.filepath}
            />
            <p>{image.filepath}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

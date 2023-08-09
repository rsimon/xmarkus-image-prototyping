import { useState, useEffect } from 'react';
import { db } from '@/db';

export const ImageList = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
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

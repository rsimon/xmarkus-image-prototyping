import { useState, useEffect } from 'react';
import { db } from '@/db';

import './ImageList.css';

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
    <div className="image-list">
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <div className="overflow-hidden rounded-md border">
              <img
                src={URL.createObjectURL(image.data)}
                alt={image.filepath}
                className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square"
              />
            </div>

            <p>{image.filepath}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

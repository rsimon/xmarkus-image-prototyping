import { useState, useEffect } from 'react';
import { ChatText } from '@phosphor-icons/react';
import { useDB } from '@/db';
import { ImageActions } from './ImageActions';

import './ImageList.css';

export const ImageList = () => {

  const db = useDB();

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
      <div className="space-y-1 headline">
        <h1 className="text-2xl font-semibold tracking-tight">Your Collection</h1>
        <p className="text-sm text-muted-foreground">Stored in your browser. Make sure to back up regularly.</p>
      </div>

      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <div className="relative overflow-hidden rounded-md shadow">
              <img
                src={URL.createObjectURL(image.data)}
                alt={image.filepath}
                className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square"
              />

              <div className="absolute bottom-0 px-3 pt-6 pb-3 left-0 w-full bg-gradient-to-t from-black to-transparent">
                <div className="text-white text-sm">
                  <ChatText size={18} className="inline align-text-bottom mr-0.5" /> 0
                </div>

                <div className="absolute bottom-0 right-2 text-white text-sm">
                  <ImageActions image={image} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

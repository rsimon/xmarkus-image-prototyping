import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Annotorious } from '@annotorious/react';
import { useDB } from '@/db';
import { Image } from '@/Types';
import { ImageAnnotator } from '@/annotorious';

export const Annotate = () => {

  const db = useDB();

  const params = useParams();

  const [image, setImage] = useState<Image | undefined>(undefined);

  useEffect(() => {
    db.images.get(parseInt(params.id)).then(setImage);
  }, []);

  return (
    <main className="annotate">
      <nav className="breadcrumb">
        <ul>
          <li>
            <Link to="/images">Images</Link>
          </li>

          {image && (
            <li>
              {image.filepath}
            </li>
          )}
        </ul>
      </nav>

      {image && (
        <section>
          <Annotorious>
            <ImageAnnotator>
              <img 
                src={URL.createObjectURL(image.data)}
                alt={image.filepath} />
            </ImageAnnotator>
          </Annotorious>
        </section>
      )}
    </main>
  )

}
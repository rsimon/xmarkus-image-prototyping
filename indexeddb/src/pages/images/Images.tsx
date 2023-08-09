
import { ImageImport } from './ImageImport';
import { ImageList } from './ImageList';

import './Images.css';
 
export const Images = () => {

  return (
    <main className="page images">
      <section className="import-images">
        <ImageImport />
      </section>

      <section className="image-grid">
        <ImageList />
      </section>
    </main>
  )

}
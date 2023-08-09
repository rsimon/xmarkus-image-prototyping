import { Button } from '@/components/Button';
import { PlusCircle } from '@phosphor-icons/react';

import './Images.css';
 
export const Images = () => {

  return (
    <main className="page images">
      <section className="import-images">
        <Button>
          <PlusCircle size={20} className="mr-2"/> Import Images
        </Button>
      </section>

      <section className="image-grid">

      </section>
    </main>
  )

}
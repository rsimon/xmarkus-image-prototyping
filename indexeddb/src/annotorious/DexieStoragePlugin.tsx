import { useEffect } from 'react';
import { ImageAnnotation, ImageAnnotationStore } from '@annotorious/annotorious';
import { useAnnotationStore } from '@annotorious/react';
import { useDB } from '@/db';
import { Image } from '@/Types';
import { Origin } from '@annotorious/core';

interface DexieStoragePluginProps {

  image: Image;

}

export const DexieStoragePlugin = (props: DexieStoragePluginProps) => {

  const db = useDB();

  const store = useAnnotationStore<ImageAnnotationStore>();

  useEffect(() => {
    if (store) {
      db.annotations
        .where('image')
        .equals(props.image.filepath)
        .toArray()
        .then(results => {
          const annotations = results.map(r => r.data) as ImageAnnotation[];
          store.bulkAddAnnotation(annotations, true, Origin.REMOTE);
        });

      store.lifecycle.on('createAnnotation', annotation => {
        db.annotations
          .add({ 
            id: annotation.id, 
            image: 
            props.image.filepath, 
            data: annotation 
          });
      });

      store.lifecycle.on('updateAnnotation', (annotation, previous) => {
        db.annotations
          .update(previous.id, { 
            id: annotation.id, 
            image: props.image.filepath, 
            data: annotation 
          });
      });

      store.lifecycle.on('deleteAnnotation', annotation => {
        console.log('deleted', annotation);
      });
    }
  }, [store, props.image]);

  return null;

}
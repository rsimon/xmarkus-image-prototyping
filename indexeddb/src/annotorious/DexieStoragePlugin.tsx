import { useEffect } from 'react';
import { AnnotoriousImageAnnotator, ImageAnnotation, Origin } from '@annotorious/annotorious';
import { useAnnotator } from '@annotorious/react';
import { useDB } from '@/db';
import { Image } from '@/Types';

interface DexieStoragePluginProps {

  image: Image;

}

export const DexieStoragePlugin = (props: DexieStoragePluginProps) => {

  const db = useDB();

  const anno = useAnnotator<AnnotoriousImageAnnotator>();

  useEffect(() => {
    if (anno) {
      db.annotations
        .where('image')
        .equals(props.image.filepath)
        .toArray()
        .then(results => {
          const annotations = results.map(r => r.data) as ImageAnnotation[];
          anno.state.store.bulkAddAnnotation(annotations, true, Origin.REMOTE);
        });

      anno.on('createAnnotation', annotation => {
        db.annotations
          .add({ 
            id: annotation.id, 
            image: 
            props.image.filepath, 
            data: annotation 
          });
      });

      anno.on('updateAnnotation', (annotation, previous) => {
        db.annotations
          .update(previous.id, { 
            id: annotation.id, 
            image: props.image.filepath, 
            data: annotation 
          });
      });

      anno.on('deleteAnnotation', annotation => {
        console.log('deleted', annotation);
      });
    }
  }, [anno, props.image]);

  return null;

}
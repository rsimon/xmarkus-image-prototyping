import { AnnotoriousContext } from '@annotorious/react';
import { Annotorious } from '@annotorious/annotorious';
import { Children, ReactElement, cloneElement, useContext } from 'react';

import '@annotorious/annotorious/dist/annotorious.css';
import '@annotorious/annotorious/src/themes/light/index.css';

export interface ImageAnnotatorProps {

  children: ReactElement<HTMLImageElement>;

}

export const ImageAnnotator = (props: ImageAnnotatorProps) => {
  const child = Children.only(props.children);

  const { anno, setAnno } = useContext(AnnotoriousContext);

  console.log('anno', anno);

  const onLoad = (evt: Event) => {
    console.log('onload');

    const img = evt.target as HTMLImageElement;

    const anno = Annotorious(img);
    setAnno(anno); 
  }
 
  return cloneElement(child, { onLoad }  as Partial<HTMLImageElement>)

}
export interface Image {

  id?: number;

  filepath: string;

  data: Blob;

}

export interface Annotation {

  id: string;

  image: string;

  data: Object;


}
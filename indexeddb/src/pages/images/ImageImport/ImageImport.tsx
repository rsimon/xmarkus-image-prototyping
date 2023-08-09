import { useRef } from 'react';
import { PlusCircle } from '@phosphor-icons/react';
import { Button } from '@/components/Button';
import { db } from '@/db';

interface ImageUploadProps {

}

export const ImageImport = (props: ImageUploadProps) => {

  const ref = useRef(null);

  const onSelect = () => ref.current.click();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files);

    files.forEach(async file => {
      const filepath = file.name;
      const data = await readFileContent(file);

      await db.images.add({ filepath, data });

      // TODO proper lifecycle mgmt.
    });
  }

  const readFileContent = (file: File): Promise<Blob> => 
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const contentArrayBuffer = event.target?.result as ArrayBuffer;
        const data = new Blob([contentArrayBuffer], { type: file.type });
        resolve(data);
      };

      reader.onerror = (event) => {
        reject(event.target.error);
      };

      reader.readAsArrayBuffer(file);
    });

  return (
    <div>
      <input
        multiple
        type="file"
        ref={ref}
        style={{ display: 'none' }}
        accept=".png,.jpg,.jpeg"
        onChange={onChange} />

      <Button onClick={onSelect}>
        <PlusCircle size={20} className="mr-2"/> Add Images
      </Button>
    </div>
  )

}
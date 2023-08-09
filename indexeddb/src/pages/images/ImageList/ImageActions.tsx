import { Browser, Browsers, DotsThree, Export, Trash } from '@phosphor-icons/react';
import { Image } from '@/db/db';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { Button } from '@/components/Button';

interface ImageActionProps {

  className?: string;

  image: Image;

}

export const ImageActions = (props: ImageActionProps) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="image-actions-trigger absolute bottom-2 right-1">
          <DotsThree size={18} weight="bold" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Browser size={18} className="text-muted-foreground relative -top-px mr-2" /> Open image
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Browsers size={18} className="text-muted-foreground relative -top-px mr-2" /> Open in new tab
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Export size={18} className="text-muted-foreground relative -top-px mr-2" /> Download annotations
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Trash size={18} className="text-muted-foreground relative -top-px mr-2" />Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )


}
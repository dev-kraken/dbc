import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MdEdit, MdMoreVert, MdOutlineDeleteOutline } from 'react-icons/md'
import { RxExternalLink } from 'react-icons/rx'
import { ImageURL } from '@/data/images-url'

interface DbcCardHeaderProps {
  cardImage: string
}

export const DbcCardHeader = ({ cardImage }: DbcCardHeaderProps) => {
  return (
    <div className='flex w-full items-start justify-between'>
      <Image
        width='50'
        height='50'
        className='rounded-full shadow-lg'
        src={ImageURL.cardImage(cardImage)}
        alt='Bonnie image'
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MdMoreVert className='size-5' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem className='gap-2'>
            <MdEdit size={16} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className='gap-2'>
            <RxExternalLink size={16} />
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem className='gap-2 text-destructive hover:bg-destructive/10'>
            <MdOutlineDeleteOutline size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

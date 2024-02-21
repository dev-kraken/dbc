import Image from 'next/image'
import { ImageURL } from '@/data/images-url'
import { DbcCardHeaderDropdown } from '@/components/cards/all-cards/dbc-card-header-dropdown'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MdMoreVert } from 'react-icons/md'

interface DbcCardHeaderProps {
  cardImage: string
  cardName: string
  cardID: string
}

export const DbcCardHeader = ({ cardImage, cardName, cardID }: DbcCardHeaderProps) => {
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
        <DbcCardHeaderDropdown  cardID={cardID} cardName={cardName}/>
      </DropdownMenu>
    </div>
  )
}

'use client'
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { MdEdit, MdMoreVert, MdOutlineDeleteOutline } from 'react-icons/md'
import { RxExternalLink } from 'react-icons/rx'
import { useModal } from '@/hooks/use-dialog-store'
import { DeleteCard } from '@/types/dialog-types'

export const DbcCardHeaderDropdown = ({ cardID, cardName }: DeleteCard) => {
  const { onOpen } = useModal()
  return (
    <DropdownMenuContent align='end'>
      <DropdownMenuItem className='gap-2'>
        <MdEdit size={16} />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem className='gap-2'>
        <RxExternalLink size={16} />
        Copy Link
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() =>
          onOpen('DeleteCard', {
            deleteCard: {
              cardID: cardID,
              cardName: cardName
            }
          })
        }
        className='gap-2 text-destructive hover:bg-destructive/10'
      >
        <MdOutlineDeleteOutline size={16} />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}

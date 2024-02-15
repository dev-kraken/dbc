import { HeaderSearch } from '@/components/sidebar/header-search'
import { Button } from '@/components/ui/button'
import { FiBell } from 'react-icons/fi'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const SidebarHeader = () => {
  return (
    <div className='grid grid-cols-2 gap-4 border-b px-4 py-2'>
      <HeaderSearch />
      <div className='mr-4 flex items-center justify-end gap-3'>
        <Button variant='outline' size='icon' asChild>
          <FiBell className='size-4 p-2' />
        </Button>
        <Separator orientation='vertical' className='h-6' />
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

import { LuLayoutDashboard } from 'react-icons/lu'
import { TbCards } from 'react-icons/tb'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { IoQrCodeOutline, IoSettingsOutline } from 'react-icons/io5'
import { HomeSidebar } from '@/types/sidebar'

export const HomeSidebarRoutes: HomeSidebar[] = [
  {
    title: 'Dashboard',
    icon: LuLayoutDashboard,
    href: '/dashboard'
  },
  {
    title: 'Cards',
    icon: TbCards,
    href: '/dashboard/cards'
  },
  {
    title: 'Leads',
    icon: MdOutlineLeaderboard,
    href: '/conversation'
  },
  {
    title: 'QrCode',
    icon: IoQrCodeOutline,
    href: '/qrcode'
  },
  {
    title: 'Settings',
    icon: IoSettingsOutline,
    href: '/settings'
  }
]

import { LuLayoutDashboard } from 'react-icons/lu'
import { TbCards } from 'react-icons/tb'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { IoQrCodeOutline, IoSettingsOutline } from 'react-icons/io5'

export const HomeSidebarRoutes = [
  {
    label: 'Dashboard',
    icon: LuLayoutDashboard,
    href: '/dashboard',
    color: 'text-violet-500'
  },
  {
    label: 'Cards',
    icon: TbCards,
    href: '/dashboard/cards',
    color: 'text-sky-500'
  },
  {
    label: 'Leads',
    icon: MdOutlineLeaderboard,
    href: '/conversation',
    color: 'text-violet-500'
  },
  {
    label: 'QrCode',
    icon: IoQrCodeOutline,
    href: '/qrcode',
    color: 'text-orange-700'
  },
  {
    label: 'Settings',
    icon: IoSettingsOutline,
    href: '/settings'
  }
]

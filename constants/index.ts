import { LuLayoutDashboard } from 'react-icons/lu'
import { TbCards } from 'react-icons/tb'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { IoQrCodeOutline, IoSettingsOutline } from 'react-icons/io5'
import { IconType } from 'react-icons'

type SidebarRouteHome = {
  label: string
  icon: IconType
  route: string
}

export const HomeSidebarRoutes: SidebarRouteHome[] = [
  {
    label: 'Dashboard',
    icon: LuLayoutDashboard,
    route: '/dashboard'
  },
  {
    label: 'Cards',
    icon: TbCards,
    route: '/dashboard/cards'
  },
  {
    label: 'Leads',
    icon: MdOutlineLeaderboard,
    route: '/conversation'
  },
  {
    label: 'QrCode',
    icon: IoQrCodeOutline,
    route: '/qrcode'
  },
  {
    label: 'Settings',
    icon: IoSettingsOutline,
    route: '/settings'
  }
]

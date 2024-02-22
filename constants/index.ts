import { HomeSidebar } from '@/types/sidebar'
import { BiSolidDashboard, BiSolidMobileVibration } from 'react-icons/bi'
import { RiSettings3Fill } from 'react-icons/ri'
import { SiGoogleadsense } from 'react-icons/si'
import { PiQrCodeFill } from 'react-icons/pi'

export const HomeSidebarRoutes: HomeSidebar[] = [
  {
    title: 'Dashboard',
    icon: BiSolidDashboard,
    href: '/dashboard'
  },
  {
    title: 'Cards',
    icon: BiSolidMobileVibration,
    href: '/dashboard/cards'
  },
  {
    title: 'Leads',
    icon: SiGoogleadsense,
    href: '/conversation'
  },
  {
    title: 'QrCode',
    icon: PiQrCodeFill,
    href: '/qrcode'
  },
  {
    title: 'Settings',
    icon: RiSettings3Fill,
    href: '/settings'
  }
]

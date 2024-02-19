import { IconType } from 'react-icons'

export type HomeSidebarRoutes = {
  title: string
  icon: IconType
  href: string
  label?: string
  variant?: string
}

export type HomeSidebar = HomeSidebarRoutes

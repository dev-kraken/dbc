'use client'
import { useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import { NavKraken } from '@/components/ui/nav'
import { HomeSidebarRoutes } from '@/constants'

export const HomeMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const onlyWidth = useWindowWidth()
  const startWidth = 1024

  useEffect(() => {
    setIsCollapsed(onlyWidth <= startWidth)
  }, [onlyWidth, startWidth])

  return <NavKraken isCollapsed={isCollapsed} links={HomeSidebarRoutes} menuTitle={'General Menu'} />
}

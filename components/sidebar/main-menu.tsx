'use client'
import { Suspense, useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import { NavKraken } from '@/components/ui/nav'
import { useParams } from 'next/navigation'
import { MainSidebarRoutes } from '@/types/sidebar'
import { FaCircleChevronLeft } from 'react-icons/fa6'
import { FaListUl, FaStar } from 'react-icons/fa'
import { IoShareSocialSharp } from 'react-icons/io5'
import { RiProfileFill, RiSettings3Fill } from 'react-icons/ri'
import { PiQrCodeFill } from 'react-icons/pi'
import { MdDynamicForm, MdStyle } from 'react-icons/md'
import { BiSolidDashboard, BiSolidMobileVibration } from 'react-icons/bi'
import { SiGoogleadsense } from 'react-icons/si'
import { motion } from 'framer-motion'

export const MainMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const params = useParams()

  const onlyWidth = useWindowWidth()
  const startWidth = 1024

  useEffect(() => {
    setIsCollapsed(onlyWidth <= startWidth)
  }, [onlyWidth, startWidth])

  const HomeSidebarRoutes: MainSidebarRoutes[] = [
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

  const CardSidebarRoutes: MainSidebarRoutes[] = [
    {
      title: 'Go Back',
      icon: FaCircleChevronLeft,
      href: '/dashboard/cards'
    },
    {
      title: 'Card Styles',
      icon: MdStyle,
      href: `/dashboard/cards/${params?.cardID}/card-style`
    },
    {
      title: 'Profile',
      icon: RiProfileFill,
      href: `/dashboard/cards/${params?.cardID}/card-profile`
    },
    {
      title: 'Social Media',
      icon: IoShareSocialSharp,
      href: `/dashboard/cards/${params?.cardID}/social-media`
    },
    {
      title: 'Listings',
      icon: FaListUl,
      href: `/dashboard/cards/${params?.cardID}/listings`
    },
    {
      title: 'Reviews',
      icon: FaStar,
      href: `/dashboard/cards/${params?.cardID}/reviews`
    },
    {
      title: 'QrCode',
      icon: PiQrCodeFill,
      href: `/dashboard/cards/${params?.cardID}/qr-code`
    },
    {
      title: 'Contact Form',
      icon: MdDynamicForm,
      href: `/dashboard/cards/${params?.cardID}/contact-form`
    }
  ]
  const sidebarRoutes = params?.cardID ? CardSidebarRoutes : HomeSidebarRoutes

  return (
    <>
      {!!params?.cardID && (
          <motion.div
            className='grow'
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <NavKraken isCollapsed={isCollapsed} links={sidebarRoutes} menuTitle='Card Menu' />
          </motion.div>
      )}
      {!params?.cardID && (
          <motion.div
            className='grow'
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <NavKraken isCollapsed={isCollapsed} links={sidebarRoutes} menuTitle='General Menu' />
          </motion.div>
      )}
    </>
  )
}

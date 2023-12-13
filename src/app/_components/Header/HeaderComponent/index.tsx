'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Header } from '../../../../payload/payload-types'
import { Gutter } from '../../Gutter'
import classes from './index.module.scss'

import logoBlack from '../../../../../public/logo_black.png'
import { HeaderNav } from '../Nav'
import MobileNav from '../MobileNav'
import { noHeaderFooterUrls } from '../../../constants'
import { usePathname } from 'next/navigation'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()

  return (
    <nav
      className={[classes.header, noHeaderFooterUrls.includes(pathname) && classes.hide]
        .filter(Boolean)
        .join(' ')}
    >
      <Gutter className={classes.wrap}>
        {/* Logo */}
        <Link href="/">
          <Image width={180} src={logoBlack} alt="logo" />
        </Link>

        {/* Nav */}
        <HeaderNav header={header} />
        <MobileNav header={header} />
      </Gutter>
    </nav>
  )
}

export default HeaderComponent
